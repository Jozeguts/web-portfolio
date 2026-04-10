import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";

// Services queries
export const fetchServices = async () => {
  try {
    const q = query(
      collection(db, "services"),
      where("is_active", "==", true),
      orderBy("display_order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.() || new Date(),
      updated_at: doc.data().updated_at?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

// Skills queries
export const fetchSkills = async () => {
  try {
    const q = query(
      collection(db, "skills"),
      where("is_active", "==", true),
      orderBy("display_order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.() || new Date(),
      updated_at: doc.data().updated_at?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

// Projects queries
export const fetchProjects = async () => {
  try {
    const q = query(
      collection(db, "projects"),
      where("is_active", "==", true),
      orderBy("display_order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.() || new Date(),
      updated_at: doc.data().updated_at?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const fetchFeaturedProjects = async () => {
  try {
    const q = query(
      collection(db, "projects"),
      where("is_active", "==", true),
      where("is_featured", "==", true),
      orderBy("display_order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.() || new Date(),
      updated_at: doc.data().updated_at?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
};

// Testimonials queries
export const fetchTestimonials = async () => {
  try {
    const q = query(
      collection(db, "testimonials"),
      where("is_active", "==", true),
      orderBy("display_order", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.() || new Date(),
      updated_at: doc.data().updated_at?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

// Contact submission
export const submitContactRequest = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "contact_requests"), {
      ...formData,
      submitted_at: new Date(),
      is_read: false,
    });
    return { id: docRef.id, ...formData };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// Fetch contact requests (for admin)
export const fetchContactRequests = async () => {
  try {
    const q = query(
      collection(db, "contact_requests"),
      orderBy("submitted_at", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      submitted_at: doc.data().submitted_at?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching contact requests:", error);
    return [];
  }
};

// Update service
export const updateService = async (id, data) => {
  try {
    await updateDoc(doc(db, "services", id), {
      ...data,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// Create service
export const createService = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "services"), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    await deleteDoc(doc(db, "services", id));
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Similar functions for other collections (Skills, Projects, Testimonials)
// Following the same pattern as services...

export const updateSkill = async (id, data) => {
  try {
    await updateDoc(doc(db, "skills", id), {
      ...data,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

export const createSkill = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "skills"), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
};

export const deleteSkill = async (id) => {
  try {
    await deleteDoc(doc(db, "skills", id));
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};

export const updateProject = async (id, data) => {
  try {
    await updateDoc(doc(db, "projects", id), {
      ...data,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const createProject = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const updateTestimonial = async (id, data) => {
  try {
    await updateDoc(doc(db, "testimonials", id), {
      ...data,
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
};

export const createTestimonial = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "testimonials"), {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    await deleteDoc(doc(db, "testimonials", id));
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};

// File upload functions for resources folder
/**
 * Upload a file to the resources folder and get its public URL
 * @param {File} file - The file to upload
 * @param {string} category - Subfolder category (e.g., 'projects', 'documents', 'media')
 * @returns {Promise<string>} The public download URL of the uploaded file
 */
export const uploadFileToResources = async (file, category = "general") => {
  try {
    if (!file) throw new Error("No file provided");
    
    // Create path: resources/{category}/{timestamp}-{filename}
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const storagePath = `resources/${category}/${fileName}`;
    
    // Upload file
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    
    // Get public download URL
    const downloadUrl = await getDownloadURL(storageRef);
    
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file to resources:", error);
    throw error;
  }
};

/**
 * Delete a file from the resources folder by its URL
 * @param {string} downloadUrl - The full download URL of the file to delete
 */
export const deleteFileFromResources = async (downloadUrl) => {
  try {
    if (!downloadUrl) throw new Error("No URL provided");
    
    // Extract the path from the download URL
    const urlParts = downloadUrl.split("/o/")[1]?.split("?")[0];
    if (!urlParts) throw new Error("Invalid file URL format");
    
    // Decode URL encoded path
    const decodedPath = decodeURIComponent(urlParts);
    
    // Delete the file
    const fileRef = ref(storage, decodedPath);
    await deleteObject(fileRef);
    
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file from resources:", error);
    throw error;
  }
};
