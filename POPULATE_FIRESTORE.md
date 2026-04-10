# Populate Firestore with Sample Data

This guide shows how to populate your Firestore database with sample data using the terminal.

## Quick Start (3 Steps)

### Step 1: Download Firebase Service Account Key

1. Go to: https://console.firebase.google.com/
2. Select project: **joseph-oguti**
3. Click: **⚙️ Project Settings** (top right)
4. Go to: **Service Accounts** tab
5. Click: **Generate New Private Key**
6. Save the file as **`serviceAccountKey.json`** in your project root

### Step 2: Install Dependencies

```bash
npm install
```

This installs `firebase-admin` which is needed for the script.

### Step 3: Run the Populate Script

```bash
FIREBASE_CREDENTIALS=./serviceAccountKey.json node scripts/populate-firestore.js
```

**Expected Output:**
```
📝 Populating Firestore with sample data...

📦 Adding services...
   ✓ Added services: abc123...
   ✓ Added services: def456...
   ✓ Added services: ghi789...
   ✅ Completed: 3 documents added

📦 Adding skills...
   ✓ Added skills: jkl012...
   ...
   ✅ Completed: 6 documents added

📦 Adding projects...
   ✅ Completed: 3 documents added

📦 Adding testimonials...
   ✅ Completed: 3 documents added

✅ Firestore population complete!

Data added to collections:
   - services (3 documents)
   - skills (6 documents)
   - projects (3 documents)
   - testimonials (3 documents)
```

## What Gets Added

### Services (3 documents)
- Web Development
- API Development
- Database Design

### Skills (6 documents)
- React (95%)
- TypeScript (90%)
- Node.js (92%)
- Firebase (88%)
- Tailwind CSS (93%)
- PostgreSQL (85%)

### Projects (3 documents)
- E-commerce Platform (Featured)
- Task Management App (Featured)
- Analytics Dashboard

### Testimonials (3 documents)
- Sarah Johnson (Tech Startup)
- David Chen (Digital Solutions)
- Grace Lee (Creative Agency)

## Verify Data in Firebase Console

1. Go to: https://console.firebase.google.com/
2. Select: joseph-oguti → **Firestore Database**
3. You should see all 4 collections with documents

## Security Note

⚠️ **Important:**
- Keep `serviceAccountKey.json` **secret** - never commit to Git
- Add to `.gitignore`:
  ```
  serviceAccountKey.json
  ```

## Troubleshooting

### "Module not found: firebase-admin"
- Run: `npm install`

### "Permission denied" error
- Check you're using the correct `serviceAccountKey.json`
- Verify the key has Firestore permissions

### "Credentials file not found"
- Make sure `serviceAccountKey.json` is in project root
- Check the file path is correct

### Already have data but want to clear it
You can manually delete collections in Firebase Console:
1. Go to Firestore Database
2. Right-click collection name
3. Select "Delete collection"
4. Then run the populate script again

## Manual Approach (Alternative)

If you prefer not to use a script, use Firebase Console:
1. Go to Firestore Database
2. Click **+ Create Collection** for each: services, skills, projects, testimonials
3. Manually add documents with the sample data (see Sample Data section below)

## Sample Data Structure

### Service Document
```json
{
  "title": "Web Development",
  "description": "Building scalable, responsive web applications...",
  "display_order": 1,
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Skill Document
```json
{
  "name": "React",
  "category": "Frontend",
  "proficiency": 95,
  "display_order": 1,
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Project Document
```json
{
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce solution...",
  "category": "Full Stack",
  "tech_stack": ["React", "Node.js", "PostgreSQL", "Stripe"],
  "image_url": null,
  "project_url": "https://example.com",
  "github_url": "https://github.com/user/repo",
  "is_featured": true,
  "is_active": true,
  "display_order": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Testimonial Document
```json
{
  "client_name": "Sarah Johnson",
  "client_title": "Product Manager",
  "client_company": "Tech Startup Inc",
  "content": "Joseph is an exceptional developer...",
  "rating": 5,
  "is_active": true,
  "display_order": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## Next Steps

After populating Firestore:

1. **Reload your portfolio** - Visit https://joseph-oguti.web.app
2. **You should see all content** displayed on the home page
3. **Edit the data** - Use admin panel at `/admin/login` or Firebase Console
4. **Upload images** - Use the resources folder feature (see RESOURCES_GUIDE.md)

---

For more information, see:
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- [RESOURCES_GUIDE.md](./RESOURCES_GUIDE.md)
- [ADMIN_SETUP.md](./ADMIN_SETUP.md)
