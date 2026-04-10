# Setting Admin Privileges

## Quick Setup: josephoguti02@gmail.com

You have two options to set admin privileges:

### ✅ Option 1: Firebase Console (Easiest - No Setup Required)

1. Go to **Firebase Console**: https://console.firebase.google.com/
2. Select project: **joseph-oguti**
3. Navigate to: **Authentication** → **Users**
4. Find and click the user: **josephoguti02@gmail.com**
5. Click the three dots **(⋮)** on the right
6. Select **Edit custom claims**
7. Paste this JSON:
   ```json
   {"admin": true}
   ```
8. Click **Update**
9. Done! ✅

**Note:** The user must sign out and sign back in for changes to take effect.

---

### Option 2: Using the Setup Script

If you prefer to automate this:

1. **Download Service Account Key**
   - Go to Firebase Console → **Project Settings**
   - Go to **Service Accounts** tab
   - Click **Generate New Private Key**
   - Save the file as `serviceAccountKey.json` in the project root

2. **Run the Setup Script**
   ```bash
   FIREBASE_CREDENTIALS=./serviceAccountKey.json node scripts/set-admin.js josephoguti02@gmail.com
   ```

3. **Success!** You should see:
   ```
   ✅ Success! josephoguti02@gmail.com is now an admin
   ```

---

## Verify Admin Access

After setting admin privileges:

1. Go to: https://joseph-oguti.web.app/admin/login
2. Click **Sign In with Google**
3. Choose **josephoguti02@gmail.com**
4. You should be redirected to the admin dashboard at `/admin`

If you see an error "You don't have admin privileges", make sure:
- ✅ The custom claims were set correctly
- ✅ You signed out completely and signed back in
- ✅ Check that the email matches exactly

---

## Add More Admins

To add other admin users, repeat the Firebase Console steps or run:

```bash
FIREBASE_CREDENTIALS=./serviceAccountKey.json node scripts/set-admin.js another-email@example.com
```

---

## Security Note

⚠️ **Important:** 
- Keep `serviceAccountKey.json` **secret** - don't commit to Git
- If you downloaded it, add to `.gitignore`:
  ```
  serviceAccountKey.json
  ```
- The script file (`scripts/set-admin.js`) can be safely shared

---

## Troubleshooting

### User not found error
The user must have signed in at least once. Have them:
1. Visit: https://joseph-oguti.web.app/admin/login
2. Click "Sign In with Google"
3. Complete the login process
4. Then set admin privileges

### Changes not taking effect
1. Sign out completely from Google
2. Close the browser
3. Open a new incognito/private window
4. Sign in again

### Permission denied when running script
Make sure the service account key has the correct permissions in Firebase Console.
