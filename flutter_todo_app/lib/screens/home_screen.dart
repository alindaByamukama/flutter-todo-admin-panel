import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/task.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _addTask(String value) async {
    final text = value.trim();
    if (text.isEmpty) return;
    await FirebaseFirestore.instance.collection('tasks').add({
      'title': text,
      'isDone': false,
      'uid': FirebaseAuth.instance.currentUser!.uid,
    });
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;

    return Scaffold(
      appBar: AppBar(
        title: const Text('To-Do Home'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              FirebaseAuth.instance.signOut();
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // ─── New “Add task” row ─────────────────────────
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(hintText: 'New task'),
                    onSubmitted: _addTask,
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () => _addTask(_controller.text),
                  child: const Text('Add'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            // ─── Your existing task list ─────────────────────
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: FirebaseFirestore.instance
                    .collection('tasks')
                    .where(
                      'uid',
                      isEqualTo: FirebaseAuth.instance.currentUser!.uid,
                    )
                    .snapshots(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                    return const Center(child: Text('No tasks yet.'));
                  }
                  final tasks = snapshot.data!.docs
                      .map(
                        (doc) => Task.fromMap(
                          doc.id,
                          doc.data()! as Map<String, dynamic>,
                        ),
                      )
                      .toList();
                  return ListView.builder(
                    itemCount: tasks.length,
                    itemBuilder: (context, index) {
                      final task = tasks[index];
                      return ListTile(
                        title: Text(task.title),
                        leading: Checkbox(
                          value: task.isDone,
                          onChanged: (val) async {
                            await FirebaseFirestore.instance
                                .collection('tasks')
                                .doc(task.id)
                                .update({'isDone': val});
                          },
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () async {
                            await FirebaseFirestore.instance
                                .collection('tasks')
                                .doc(task.id)
                                .delete();
                          },
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
