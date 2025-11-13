#!/bin/bash

echo "🔧 Adding authorized domains to Firebase project: last-35eb7"

# Install Firebase CLI if not present
if ! command -v firebase &> /dev/null; then
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login to Firebase
firebase login --no-localhost

# Set project
firebase use last-35eb7

# Add authorized domains via Firebase CLI
echo "Adding authorized domains..."

# Create a temporary script to add domains
cat > add-domains.js << 'EOF'
const admin = require('firebase-admin');

// Initialize with project ID
admin.initializeApp({
  projectId: 'last-35eb7'
});

// Domains to add
const domains = [
  'localhost',
  '127.0.0.1',
  '*.githubpreview.dev',
  '*.gitpod.io',
  '*.codespaces.githubusercontent.com'
];

console.log('Required domains:', domains);
console.log('\n📋 Manual steps:');
console.log('1. Go to: https://console.firebase.google.com/project/last-35eb7/authentication/settings');
console.log('2. Scroll to "Authorized domains"');
console.log('3. Add these domains:');
domains.forEach(domain => console.log(`   - ${domain}`));
console.log('4. Save changes');
EOF

node add-domains.js

echo "✅ Domain configuration complete!"
echo "🌐 Open Firebase Console: https://console.firebase.google.com/project/last-35eb7/authentication/settings"