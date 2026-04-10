# Firebase Deployment Guide

## Prerequisites
- Firebase project: **joseph-oguti**
- Node.js installed
- Git repository initialized

## Quick Deployment Instructions

### Step 1: Build Your Portfolio
```bash
npm run build
```
This creates a `dist` folder with optimized production code.

### Step 2: Login to Firebase (First time only)
```bash
npx firebase-tools login
```
This opens your browser to authenticate with Firebase. Select the "joseph-oguti" project.

### Step 3: Deploy to Firebase Hosting
```bash
npx firebase-tools deploy
```

This will:
- Upload your `dist` folder to Firebase Hosting
- Deploy Firestore security rules from `firestore.rules`
- Deploy Cloud Storage rules from `storage.rules`
- Make your site live at: `https://joseph-oguti.web.app`

## Detailed Commands

### Full Deployment Pipeline
```bash
# 1. Build the React app
npm run build

# 2. Deploy everything (hosting, Firestore, Storage)
npx firebase-tools deploy

# Or deploy specific services:
npx firebase-tools deploy --only hosting
npx firebase-tools deploy --only firestore:rules
npx firebase-tools deploy --only storage
```

### View Logs
```bash
# See deployment logs
npx firebase-tools deploy --debug

# View hosted site logs
npx firebase-tools functions:log
```

### List Projects
```bash
npx firebase-tools projects:list
```

### Test Locally Before Deploying
```bash
# Build the app
npm run build

# Start Firebase local emulator
npx firebase-tools emulators:start

# This allows you to test on localhost:5000
```

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Check `dist` folder was created
- [ ] Verify Firestore rules in `firestore.rules`
- [ ] Verify Storage rules in `storage.rules`
- [ ] Run `npx firebase-tools deploy`
- [ ] Check Firebase Console for deployment status
- [ ] Visit your live site: https://joseph-oguti.web.app

## Your Firebase Hosting URLs

**Primary URL:**
```
https://joseph-oguti.web.app
```

**Alternative URL:**
```
https://joseph-oguti.firebaseapp.com
```

## Environment Variables for Production

The Firebase credentials in `src/integrations/firebase/config.js` are already set to production values.

## Firebase Console Access

Manage your deployment at:
https://console.firebase.google.com/project/joseph-oguti

### Key Sections:
- **Hosting** - View deployments, traffic, analytics
- **Firestore** - Manage database, view data
- **Storage** - View uploaded files
- **Authentication** - Manage users
- **Analytics** - Track user behavior

## Monitoring Your Deployment

In Firebase Console:
1. Go to **Hosting** tab
2. View traffic graph
3. Check build status
4. Monitor real-time metrics

## Rollback a Deployment

If something goes wrong:
```bash
npx firebase-tools hosting:channel:deploy <channel-name>

# Or rollback to previous version in Firebase Console:
# Hosting > Deployments > Click deployment > Promote
```

## Custom Domain Setup

To use your own domain (e.g., joseph-oguti.com):
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Update A and AAAA records at your domain registrar

## Continuous Deployment (Optional)

### Using GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: joseph-oguti
```

Then add Firebase Service Account JSON as GitHub secret `FIREBASE_SERVICE_ACCOUNT`.

## Troubleshooting

### "No Firebase project selected"
```bash
# Make sure .firebaserc exists and has:
npx firebase-tools use joseph-oguti
```

### "Dist folder not found"
```bash
# Build the project first
npm run build
```

### "Permission denied" on deploy
```bash
# Login again
npx firebase-tools logout
npx firebase-tools login
```

### Rules deployment failed
- Check `firestore.rules` syntax
- Validate using Firebase Console > Firestore > Rules > Publish

## After Deployment

1. Test your live site: https://joseph-oguti.web.app
2. Verify all pages load correctly
3. Check admin login works: https://joseph-oguti.web.app/admin/login
4. Test contact form submission
5. Monitor Firebase Console for errors

## Performance Optimization

Your Vite build is already optimized:
- Code splitting enabled
- Assets minified
- CSS tree-shaken
- Images optimized

Firebase Hosting provides:
- Global CDN (fast globally)
- Automatic HTTPS
- Gzip compression
- Cache optimization

## Cost Monitoring

Check your Firebase usage at:
https://console.firebase.google.com/project/joseph-oguti/usage

Free tier includes:
- 1GB storage (Firestore)
- 5GB bandwidth (Hosting)
- 100 concurrent users

## Support

- Firebase Docs: https://firebase.google.com/docs
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
