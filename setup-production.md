# Production Setup Guide

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication with Email/Password and Google providers
4. Create Firestore database in production mode
5. Get your Firebase config from Project Settings > General > Your apps

## 2. Update Environment Variables

Replace the placeholder values in `.env` with your actual Firebase config:

```bash
# Get these from Firebase Console > Project Settings > General
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Get from Google AI Studio: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY=AIza...
```

## 3. Firebase Security Rules

Update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## 4. Authorized Domains

Add your domain to Firebase Console > Authentication > Settings > Authorized domains:
- `localhost` (for development)
- Your production domain

## 5. Start Production Server

```bash
npm run dev
npm run genkit:watch
```

The system will automatically detect the Firebase configuration and switch to production mode.