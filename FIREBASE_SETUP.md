# Firebase Integration Guide

## Configuration

Your Firebase project has been configured with the following credentials:
- **Project ID:** joseph-oguti
- **Auth Domain:** joseph-oguti.firebaseapp.com
- **Database:** Firestore (joseph-oguti)
- **Storage:** Cloud Storage (joseph-oguti.firebasestorage.app)

## Firestore Collections Overview

### 1. **services** Collection
Stores all services offered on your portfolio.

**Schema:**
```javascript
{
  id: string,
  title: string,
  description: string,
  display_order: number,
  is_active: boolean,
  created_at: Date,
  updated_at: Date
}
```

### 2. **skills** Collection
Stores technical skills and proficiencies.

**Schema:**
```javascript
{
  id: string,
  name: string,
  category: string,
  proficiency: number (0-100),
  display_order: number,
  is_active: boolean,
  created_at: Date,
  updated_at: Date
}
```

### 3. **projects** Collection
Stores portfolio projects and case studies.

**Schema:**
```javascript
{
  id: string,
  title: string,
  description: string,
  category: string,
  tech_stack: string[],
  image_url: string | null,
  project_url: string | null,
  github_url: string | null,
  is_featured: boolean,
  is_active: boolean,
  display_order: number,
  created_at: Date,
  updated_at: Date
}
```

### 4. **testimonials** Collection
Stores client testimonials and reviews.

**Schema:**
```javascript
{
  id: string,
  client_name: string,
  client_title: string,
  client_company: string,
  content: string,
  rating: number (1-5),
  is_active: boolean,
  display_order: number,
  created_at: Date,
  updated_at: Date
}
```

### 5. **contact_requests** Collection
Stores contact form submissions.

**Schema:**
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  service_interest: string,
  is_read: boolean,
  submitted_at: Date
}
```

## Available Functions

### File Management (Resources Folder)
All files are uploaded to a centralized **`resources/`** folder in Cloud Storage and URLs are stored in Firestore.

- `uploadFileToResources(file, category)` - Upload file and return public URL
  - `file`: File object from input
  - `category`: Subfolder (e.g., "projects", "documents", "media", "general")
  - Returns: Public download URL to store in Firestore

- `deleteFileFromResources(downloadUrl)` - Delete file by its URL

**Example: Upload Project Image**
```javascript
import { uploadFileToResources, updateProject } from "@/integrations/firebase/queries";

// Upload image to resources/projects/
const imageUrl = await uploadFileToResources(fileFromInput, "projects");

// Store URL in Firestore
await updateProject("project-id", {
  image_url: imageUrl
});
```

**Storage Structure:**
```
resources/
├── projects/
│   └── [timestamp]-filename.jpg
├── documents/
│   └── [timestamp]-resume.pdf
├── media/
│   └── [timestamp]-video-thumbnail.png
└── general/
    └── [timestamp]-other-file.format
```

### Query Functions (Read-Only)
- `fetchServices()` - Get all active services
- `fetchSkills()` - Get all active skills grouped by category
- `fetchProjects()` - Get all active projects
- `fetchFeaturedProjects()` - Get featured projects only
- `fetchTestimonials()` - Get all active testimonials
- `fetchContactRequests()` - Get all contact form submissions (admin)

### Mutation Functions (Write/Update)
- `createService(data)` - Add new service
- `updateService(id, data)` - Update existing service
- `deleteService(id)` - Remove service

- `createSkill(data)` - Add new skill
- `updateSkill(id, data)` - Update existing skill
- `deleteSkill(id)` - Remove skill

- `createProject(data)` - Add new project
- `updateProject(id, data)` - Update existing project
- `deleteProject(id)` - Remove project

- `createTestimonial(data)` - Add new testimonial
- `updateTestimonial(id, data)` - Update existing testimonial
- `deleteTestimonial(id)` - Remove testimonial

- `submitContactRequest(formData)` - Save contact form submission

### File Upload Functions
- `uploadFileToResources(file, category)` - Upload file to resources/{category} and return public URL
- `deleteFileFromResources(downloadUrl)` - Delete file from Cloud Storage by URL

## Usage Examples

### Reading Data
```javascript
import { fetchServices } from "@/integrations/firebase/queries";

const { data: services } = useQuery({
  queryKey: ["services"],
  queryFn: fetchServices,
  staleTime: 1000 * 60 * 5, // Cache for 5 minutes
});
```

### Creating Data
```javascript
import { createProject } from "@/integrations/firebase/queries";
import { useMutation } from "@tanstack/react-query";

const { mutate: addProject } = useMutation({
  mutationFn: (projectData) => createProject(projectData),
  onSuccess: () => {
    console.log("Project added successfully");
  },
  onError: (error) => {
    console.error("Failed to add project:", error);
  }
});
```

### Updating Data
```javascript
import { updateSkill } from "@/integrations/firebase/queries";

await updateSkill("skill-id", {
  proficiency: 95,
  updated_at: new Date()
});
```

## Authentication Features

### Admin Login
- Located at `/admin/login`
- Uses Firebase Authentication with email/password
- Google Sign-In also available
- Custom claims check for admin privileges

### Custom Claims
To make a user admin:
1. Go to Firebase Console
2. Navigate to Authentication > Users
3. Click on the user
4. Set custom claims: `{"admin": true}`

## Storage Features

Firebase Cloud Storage is available for:
- Project screenshots/images
- Portfolio media files
- Profile images
- Resume PDF storage

## Analytics

Google Analytics is automatically initialized to track:
- Page views
- User interactions
- Conversion events

## Environment Variables (Optional)

For production security, you can use environment variables instead of hardcoding credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Console

Access your Firebase project at:
https://console.firebase.google.com/

## Firestore Rules (Security)

Default security rules allow:
- Read operations for displaying data
- Write operations only for authenticated users
- Contact form submissions are public

Update security rules in Firebase Console under Firestore > Rules

## Troubleshooting

### "Permission denied" errors
- Check Firestore security rules
- Verify user authentication status
- Check custom claims for admin operations

### "Collection not found" errors
- Verify collection names match exactly (case-sensitive)
- Create collections manually in Firebase Console if needed
- Ensure Firestore database is enabled

### Data not updating
- Check React Query cache invalidation
- Verify async/await usage in mutations
- Check browser console for errors
