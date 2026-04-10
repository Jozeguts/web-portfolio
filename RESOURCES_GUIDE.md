# Resources Folder Guide

## Overview

The **resources/** folder in Cloud Storage is a centralized location for all portfolio media files. URLs are stored in Firestore documents, keeping your data organized and accessible.

## Features

✅ **Centralized Storage** - All files in one location  
✅ **Public URLs** - Files are publicly readable via Firestore URLs  
✅ **Organized Categories** - Files grouped by type (projects, documents, media)  
✅ **Admin Controlled** - Only admins can upload/delete files  
✅ **Automatic Timestamps** - Files named with upload timestamps for uniqueness  
✅ **Easy Integration** - Simple upload functions return URLs for Firestore

## Folder Structure

```
gs://joseph-oguti.firebasestorage.app/resources/
├── projects/
│   ├── 1712345678-portfolio-thumbnail.jpg
│   ├── 1712345679-project-screenshot.png
│   └── 1712345680-demo.mp4
├── documents/
│   ├── 1712345681-resume.pdf
│   ├── 1712345682-certificate.pdf
│   └── 1712345683-whitepaper.docx
├── media/
│   ├── 1712345684-avatar.jpg
│   ├── 1712345685-background.png
│   └── 1712345686-hero-image.jpg
└── general/
    ├── 1712345687-misc-file.zip
    └── 1712345688-other-asset.svg
```

## Upload File (with URL to Firestore)

### Basic Upload
```javascript
import { uploadFileToResources, updateProject } from "@/integrations/firebase/queries";

// Get file from input
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

try {
  // Upload and get URL
  const imageUrl = await uploadFileToResources(file, "projects");
  
  // Save URL in Firestore
  await updateProject("project-123", {
    image_url: imageUrl
  });
  
  console.log("File uploaded and URL saved:", imageUrl);
} catch (error) {
  console.error("Upload failed:", error);
}
```

### Upload in React Component
```javascript
import { useState } from "react";
import { uploadFileToResources, createProject } from "@/integrations/firebase/queries";
import { useMutation } from "@tanstack/react-query";

export function ProjectForm() {
  const [uploading, setUploading] = useState(false);
  
  const { mutate: createProjectWithImage } = useMutation({
    mutationFn: async (formData) => {
      setUploading(true);
      
      // Upload image
      let imageUrl = null;
      if (formData.imageFile) {
        imageUrl = await uploadFileToResources(formData.imageFile, "projects");
      }
      
      // Create project with image URL
      return createProject({
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
        // ... other fields
      });
    },
    onSuccess: () => {
      setUploading(false);
      console.log("Project created with image!");
    },
    onError: (error) => {
      setUploading(false);
      console.error("Failed to create project:", error);
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: "My Project",
      description: "A great project",
      imageFile: e.target.image.files[0],
    };
    createProjectWithImage(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Project title" />
      <input type="file" name="image" accept="image/*" />
      <button disabled={uploading}>{uploading ? "Uploading..." : "Create"}</button>
    </form>
  );
}
```

## Download URL Format

When you upload a file, the function returns a public download URL like:

```
https://firebasestorage.googleapis.com/v0/b/joseph-oguti.firebasestorage.app/o/resources%2Fprojects%2F1712345678-portfolio-thumbnail.jpg?alt=media&token=...
```

This URL:
- ✅ Doesn't require authentication
- ✅ Allows direct access to the file
- ✅ Works in `<img>`, `<a>`, `<video>` tags
- ✅ Can be shared publicly (unless rules change)

## Store URL in Firestore

### Example: Project with Image
```javascript
// In projects collection
{
  id: "proj-123",
  title: "E-commerce Platform",
  description: "Full-stack e-commerce solution",
  image_url: "https://firebasestorage.googleapis.com/v0/b/joseph-oguti.firebasestorage.app/o/resources%2Fprojects%2F1712345678-ecommerce.jpg?...",
  project_url: "https://example.com",
  github_url: "https://github.com/user/repo",
  // ... other fields
}
```

### Example: Testimonial with Avatar
```javascript
// In testimonials collection
{
  id: "test-001",
  client_name: "Sarah Johnson",
  client_title: "CEO",
  client_company: "Tech Startup",
  content: "Joseph is an excellent developer...",
  avatar_url: "https://firebasestorage.googleapis.com/v0/b/joseph-oguti.firebasestorage.app/o/resources%2Fmedia%2F1712345679-sarah-avatar.jpg?...",
  rating: 5
}
```

## Delete File

### Delete by URL
```javascript
import { deleteFileFromResources, updateProject } from "@/integrations/firebase/queries";

try {
  // Delete image from storage
  await deleteFileFromResources(project.image_url);
  
  // Update Firestore to remove URL
  await updateProject("project-123", {
    image_url: null
  });
  
  console.log("File deleted successfully");
} catch (error) {
  console.error("Delete failed:", error);
}
```

### Delete Multiple Files
```javascript
import { deleteFileFromResources } from "@/integrations/firebase/queries";

async function deleteProjectMedia(project) {
  const errors = [];
  
  try {
    if (project.image_url) {
      await deleteFileFromResources(project.image_url);
    }
  } catch (e) {
    errors.push(e);
  }
  
  if (errors.length > 0) {
    console.error("Some files failed to delete:", errors);
  }
}
```

## File Categories Best Practices

| Category | Use For | Max Size | Formats |
|----------|---------|----------|---------|
| **projects/** | Project screenshots, thumbnails, demos | 10 MB | JPG, PNG, GIF, MP4, WebM |
| **documents/** | Resume, PDFs, whitepapers, certificates | 50 MB | PDF, DOCX, TXT, ZIP |
| **media/** | avatars, backgrounds, hero images | 5 MB | JPG, PNG, SVG, WebP |
| **general/** | Miscellaneous assets | 20 MB | Any format |

## Firestore Collection Fields for URLs

Update your collections to include URL fields:

**projects collection:**
```javascript
{
  // ... existing fields
  image_url: "https://...", // Main project image
  thumbnail_url: "https://...", // Small thumbnail
  video_url: "https://...", // Demo video (optional)
}
```

**testimonials collection:**
```javascript
{
  // ... existing fields
  avatar_url: "https://...", // Client avatar
  company_logo_url: "https://...", // Company logo (optional)
}
```

**services collection:**
```javascript
{
  // ... existing fields
  icon_url: "https://...", // Service icon (optional)
}
```

## Security Rules

Only admins can upload/delete files in the **resources/** folder:

```javascript
// Allowed
✅ Admin user uploads to resources/projects/
✅ Admin user deletes from resources/
✅ Anyone reads resources/ files

// Not Allowed
❌ Regular user uploads to resources/
❌ Regular user deletes from resources/
❌ Anonymous user uploads/deletes
```

To set admin status, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md#custom-claims).

## Performance Tips

1. **Compress Images** - Reduce file size before upload
   ```bash
   # Using ImageMagick
   convert large.jpg -quality 80 -resize 1200x -strip compressed.jpg
   ```

2. **Use Appropriate Formats**
   - JPG for photos (smaller file size)
   - PNG for graphics (transparency)
   - WebP for modern browsers (better compression)

3. **Lazy Load Images** in components
   ```javascript
   <img loading="lazy" src={imageUrl} alt="Project" />
   ```

4. **Cache URLs** in React state to avoid re-fetching from Firestore

## Monitoring & Management

### View Files in Firebase Console
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: joseph-oguti
3. Go to Storage
4. Browse resources/ folder
5. View file details: size, creation date, download URL

### Delete Files in Console
1. Navigate to resources/ folder
2. Right-click file
3. Select "Delete"

## Environment Setup

No additional environment variables needed. File uploads work with existing Firebase configuration.

## Troubleshooting

### "Permission denied" when uploading
- ✅ Verify user is logged in as admin
- ✅ Check custom claims: `{"admin": true}`
- ✅ Verify storage rules are properly deployed

### File URL returns 404
- ✅ Check file still exists in Storage
- ✅ Verify URL wasn't modified or corrupted
- ✅ Ensure File is not in a different project/bucket

### Upload hangs or times out
- ✅ Check file size (shouldn't exceed limits)
- ✅ Verify internet connection
- ✅ Check browser console for errors
- ✅ Try uploading smaller test file

### Can't delete file
- ✅ Verify admin authentication
- ✅ Check Firestore URL field is exact match
- ✅ Ensure URL is properly decoded (spaces = %20)

## API Reference

### uploadFileToResources(file, category)

**Parameters:**
- `file` (File) - File object from `<input type="file" />`
- `category` (string, optional) - Subfolder name. Default: "general"
  - Recommended: "projects", "documents", "media", "general"

**Returns:**
- `Promise<string>` - Public download URL

**Throws:**
- Error if file is null
- Error if upload fails

**Example:**
```javascript
const url = await uploadFileToResources(e.target.files[0], "projects");
```

### deleteFileFromResources(downloadUrl)

**Parameters:**
- `downloadUrl` (string) - Full URL returned from uploadFileToResources

**Returns:**
- `Promise<void>`

**Throws:**
- Error if URL is invalid
- Error if file not found
- Error if deletion fails

**Example:**
```javascript
await deleteFileFromResources("https://firebasestorage.googleapis.com/...");
```

## Example: Complete Project CRUD

```javascript
import { 
  createProject, 
  updateProject, 
  deleteProject,
  uploadFileToResources,
  deleteFileFromResources 
} from "@/integrations/firebase/queries";

// CREATE with image
async function createProjectWithImage(form) {
  const imageUrl = await uploadFileToResources(form.image, "projects");
  return createProject({
    title: form.title,
    description: form.description,
    image_url: imageUrl,
    tech_stack: form.tech,
    is_featured: true
  });
}

// UPDATE with new image
async function updateProjectImage(projectId, newImageFile, oldImageUrl) {
  // Delete old image
  if (oldImageUrl) {
    await deleteFileFromResources(oldImageUrl);
  }
  
  // Upload new image
  const newImageUrl = await uploadFileToResources(newImageFile, "projects");
  
  // Update Firestore
  await updateProject(projectId, {
    image_url: newImageUrl
  });
}

// DELETE with cleanup
async function deleteProjectFully(projectId, project) {
  // Delete image from storage
  if (project.image_url) {
    await deleteFileFromResources(project.image_url);
  }
  
  // Delete project document
  await deleteProject(projectId);
}
```

---

For more information, see:
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- [FIRESTORE_INITIALIZATION.md](./FIRESTORE_INITIALIZATION.md)
