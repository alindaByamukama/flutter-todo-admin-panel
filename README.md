# Flutter To-Do & Admin Panel

A simple Flutter to‑do app (mobile/web) with Firebase auth + Firestore, plus a React/Next.js admin panel to manage users and tasks.

## Tech Stack

- **Flutter** (Dart) for the To-Do app  
- **Firebase** (Auth, Firestore) as backend  
- **Next.js** (TypeScript, App Router) for the admin panel  
- **Tailwind CSS** for styling  

## Folder Structure
```
/
├── flutter_todo_app/ # Flutter application
├── admin-panel/ # Next.js admin panel
└── README.md
```

## Getting Started

### 1. Firebase Setup

1. Create a Firebase project and enable:
   - Authentication (Email/Password)
   - Firestore Database (in test mode)
2. Download a **Service Account** key and save it as `serviceAccountKey.json` in the admin-panel directory root (ignored by Git).

### 2. Flutter App

```bash
cd flutter_todo_app
flutter pub get
flutter run -d chrome   # or your device of choice
```
### 3. Admin Panel
```bash
cd admin-panel
yarn install
yarn dev
```

- **Home page**: http://localhost:3000/
- **Tasks page**: http://localhost:3000/tasks
- **Users page**: http://localhost:3000/users

## Demo Credentials
- **App**: Test user (Flutter), Admin (Firebase Console)
- **Email**: test@example.com
- **Password**: Password123!
