class Task {
  final String id;
  final String title;
  final bool isDone;

  Task({required this.id, required this.title, this.isDone = false});

  // Convert a Task to a Map for Firestore
  Map<String, dynamic> toMap() {
    return {'title': title, 'isDone': isDone};
  }

  // Create a Task from a Firestore document
  factory Task.fromMap(String id, Map<String, dynamic> map) {
    return Task(
      id: id,
      title: map['title'] as String? ?? '',
      isDone: map['isDone'] as bool? ?? false,
    );
  }
}
