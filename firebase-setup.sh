#!/bin/bash

echo "🔥 Firebase Production Setup"
echo "=========================="

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login to Firebase
echo "Logging into Firebase..."
firebase login

# Initialize Firebase project
echo "Initializing Firebase project..."
firebase init firestore
firebase init hosting
firebase init functions

# Set up Firestore security rules
cat > firestore.rules << EOF
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
EOF

echo "✅ Firebase setup complete!"
echo "Next steps:"
echo "1. Update .env with your Firebase config"
echo "2. Get Google AI API key from https://aistudio.google.com/app/apikey"
echo "3. Run: npm run dev"