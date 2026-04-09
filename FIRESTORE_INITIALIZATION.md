# Firestore Database Initialization Guide

## Quick Start: Adding Data to Firebase

### Option 1: Firebase Console (Recommended for First-Time Setup)

1. **Go to Firebase Console:**
   - Navigate to https://console.firebase.google.com/
   - Select "joseph-oguti" project
   - Go to Firestore Database

2. **Create Collections and Documents:**

#### Services Collection
Click "+ Create collection" → Name: `services`

Add documents:
```json
{
  "title": "Web Development",
  "description": "Building scalable, responsive web applications using modern React and TypeScript. From concept to deployment.",
  "display_order": 1,
  "is_active": true,
  "created_at": current_timestamp,
  "updated_at": current_timestamp
}
```

#### Skills Collection
Create `skills` collection

Example documents:
```json
{
  "name": "React/Next.js",
  "category": "Web Development",
  "proficiency": 90,
  "display_order": 1,
  "is_active": true,
  "created_at": current_timestamp,
  "updated_at": current_timestamp
}
```

#### Projects Collection
Create `projects` collection

Example:
```json
{
  "title": "E-Commerce Platform",
  "description": "Full-featured e-commerce application with payment processing",
  "category": "Web Development",
  "tech_stack": ["React", "Node.js", "PostgreSQL"],
  "image_url": null,
  "project_url": "https://example.com",
  "github_url": "https://github.com",
  "is_featured": true,
  "is_active": true,
  "display_order": 1,
  "created_at": current_timestamp,
  "updated_at": current_timestamp
}
```

#### Testimonials Collection
Create `testimonials` collection

Example:
```json
{
  "client_name": "Sarah M.",
  "client_title": "CEO",
  "client_company": "TechStart Uganda",
  "content": "Joseph delivered an exceptional solution that transformed our business processes. Highly recommended!",
  "rating": 5,
  "is_active": true,
  "display_order": 1,
  "created_at": current_timestamp,
  "updated_at": current_timestamp
}
```

### Option 2: Programmatic (Using Admin SDK)

Create a Node.js script with Firebase Admin SDK:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeData() {
  // Add services
  await db.collection('services').add({
    title: "Web Development",
    description: "Building scalable, responsive web applications",
    display_order: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  console.log("Data initialized!");
}

initializeData().catch(console.error);
```

### Option 3: Using Your Application

Add an admin panel function to initialize sample data:

```javascript
import { createService, createSkill } from "@/integrations/firebase/queries";

// In your admin component
const initializeSampleData = async () => {
  try {
    await createService({
      title: "Web Development",
      description: "Building scalable applications",
      display_order: 1,
      is_active: true
    });
    console.log("Sample data initialized!");
  } catch (error) {
    console.error("Failed to initialize data:", error);
  }
};
```

## Firestore Security Rules

Add these rules to your Firestore Database in Firebase Console under "Rules":

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to active portfolio data
    match /{document=**} {
      allow read: if request.auth != null || 
                      resource.data.is_active == true;
    }
    
    // Allow authenticated users to read contact requests
    match /contact_requests/{document=**} {
      allow read: if isAdmin();
      allow create: if validateContactForm();
    }
    
    // Allow admin to manage all data
    match /{document=**} {
      allow read, write: if isAdmin();
    }
    
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.admin == true;
    }
    
    function validateContactForm() {
      return request.resource.data.keys().hasAll([
        'name', 'email', 'subject', 'message'
      ]);
    }
  }
}
```

## Cloud Storage Setup

For storing project images and files:

1. Go to Storage tab in Firebase Console
2. Create a bucket (default location is fine)
3. Update security rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read
    match /{allPaths=**} {
      allow read;
    }
    
    // Allow authenticated users to upload
    match /projects/{userId}/{allPaths=**} {
      allow write: if request.auth != null && 
                      request.auth.uid == userId;
    }
    
    // Allow admin to manage
    match /{allPaths=**} {
      allow write: if isAdmin();
    }
    
    function isAdmin() {
      return request.auth.token.admin == true;
    }
  }
}
```

## Accessing Data from Your App

### In Components
```javascript
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/integrations/firebase/queries";

export function MyComponent() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices
  });

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
}
```

### In Admin Panel
```javascript
import { useMutation } from "@tanstack/react-query";
import { createProject } from "@/integrations/firebase/queries";

const { mutate: addProject } = useMutation({
  mutationFn: createProject,
  onSuccess: () => alert("Project added!")
});

// Use in form submission
const handleSubmit = (formData) => {
  addProject(formData);
};
```

## Data Backup

Regularly backup your Firestore data:
1. Go to Firestore Database in Firebase Console
2. Click the menu (three dots)
3. Select "Export/Import"
4. Export to Cloud Storage

## Monitoring

Monitor your usage in Firebase Console:
- Database: Firestore > Analytics
- Storage: Storage > Analytics
- Authentication: Authentication > Users
