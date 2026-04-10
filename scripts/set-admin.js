#!/usr/bin/env node

/**
 * Firebase Admin Setup Script
 * Sets custom claims to grant admin privileges to users
 * 
 * Usage: node scripts/set-admin.js <email>
 */

import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const email = process.argv[2];

if (!email) {
  console.error("Error: Please provide an email address");
  console.error("Usage: node scripts/set-admin.js <email>");
  process.exit(1);
}

console.log(`Setting admin privileges for: ${email}`);

// Initialize Firebase Admin SDK
// Note: You need to set GOOGLE_APPLICATION_CREDENTIALS environment variable
// pointing to your Firebase service account JSON file
//
// Download from: Firebase Console > Project Settings > Service Accounts > Generate Key

try {
  // Check if credentials are provided via environment variable
  const credentialsPath = process.env.FIREBASE_CREDENTIALS;
  
  if (!credentialsPath) {
    console.error("\nError: FIREBASE_CREDENTIALS environment variable not set");
    console.error("\nTo set admin privileges, you have two options:\n");
    
    console.log("OPTION 1: Firebase Console (Easiest)");
    console.log("-".repeat(50));
    console.log("1. Go to: https://console.firebase.google.com/");
    console.log("2. Select project: joseph-oguti");
    console.log("3. Go to: Authentication > Users");
    console.log(`4. Find user: ${email}`);
    console.log("5. Click the three dots (⋮) > Edit custom claims");
    console.log('6. Paste this JSON: {"admin": true}');
    console.log("7. Click: Update\n");
    
    console.log("OPTION 2: Using This Script");
    console.log("-".repeat(50));
    console.log("1. Download Firebase service account:");
    console.log("   - Go to Firebase Console > Project Settings");
    console.log("   - Go to 'Service Accounts' tab");
    console.log("   - Click 'Generate New Private Key'");
    console.log("   - Save as: serviceAccountKey.json\n");
    
    console.log("2. Run this command:");
    console.log(`   FIREBASE_CREDENTIALS=./serviceAccountKey.json node scripts/set-admin.js ${email}`);
    
    process.exit(1);
  }
  
  if (!fs.existsSync(credentialsPath)) {
    console.error(`Error: Credentials file not found: ${credentialsPath}`);
    process.exit(1);
  }
  
  const serviceAccount = JSON.parse(
    fs.readFileSync(credentialsPath, "utf8")
  );
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  const auth = admin.auth();
  
  // Set custom claims
  auth
    .getUserByEmail(email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      console.log(`✅ Success! ${email} is now an admin`);
      console.log("\nNote: The user needs to sign out and sign in again");
      console.log("for the changes to take effect.\n");
      process.exit(0);
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        console.error(`❌ Error: User ${email} not found in Firebase`);
        console.error("\nMake sure the user has signed in at least once.");
        console.error("Visit https://joseph-oguti.web.app/admin/login and sign in with this email.\n");
      } else {
        console.error("❌ Error:", error.message);
      }
      process.exit(1);
    });
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
