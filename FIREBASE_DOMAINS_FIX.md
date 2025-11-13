# Firebase Authorized Domains Fix

## Quick Fix (2 minutes):

1. **Open Firebase Console**: https://console.firebase.google.com/project/last-35eb7/authentication/settings

2. **Scroll to "Authorized domains" section**

3. **Click "Add domain" and add these domains**:
   - `localhost`
   - `127.0.0.1` 
   - `*.githubpreview.dev`
   - `*.gitpod.io`
   - `*.codespaces.githubusercontent.com`

4. **Click "Save"**

5. **Refresh your app and try Google sign-in again**

## Alternative: Run Script
```bash
./fix-firebase-domains.sh
```

## Enable Google Authentication:
1. Go to Authentication > Sign-in method
2. Enable "Google" provider
3. Add your email as test user if needed

That's it! Google sign-in should work after adding these domains.