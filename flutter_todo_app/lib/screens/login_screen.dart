import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLogin = true;
  String _error = '';

  Future<void> _submit() async {
    setState(() => _error = '');
    try {
      if (_isLogin) {
        await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text.trim(),
        );
      } else {
        await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text.trim(),
        );
      }
    } catch (e) {
      setState(() => _error = e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(_isLogin ? 'Login' : 'Register')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: const InputDecoration(labelText: 'Password'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submit,
              child: Text(_isLogin ? 'Login' : 'Register'),
            ),
            TextButton(
              onPressed: () {
                setState(() => _isLogin = !_isLogin);
              },
              child: Text(
                _isLogin
                    ? 'Create an account'
                    : 'Already have an account? Login',
              ),
            ),
            if (_error.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 12.0),
                child: Text(_error, style: TextStyle(color: Colors.red)),
              ),
          ],
        ),
      ),
    );
  }
}
// This code defines a simple login and registration screen using Flutter and Firebase Authentication.
// It allows users to log in or register with an email and password, and handles errors gracefully.
// The screen toggles between login and registration modes, displaying appropriate buttons and messages.