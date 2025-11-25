#!/bin/bash

echo "🚀 Deploying EdTech AI Hub to Firebase"

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Firebase App Hosting
echo "🔥 Deploying to Firebase..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🌐 Your app is live at: https://last-35eb7.web.app"