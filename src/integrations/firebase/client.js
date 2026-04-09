import { auth, db } from "./config";

// Export auth and db for use in other modules
export { auth, db };

// User profile type validation
export const validateUserProfile = (data) => {
  return {
    uid: data.uid || "",
    email: data.email || "",
    displayName: data.displayName || "",
    photoURL: data.photoURL || "",
    createdAt: data.createdAt || new Date(),
  };
};

// Admin check utility
export const checkAdminClaims = async (user) => {
  if (!user) return false;
  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims.admin || false;
};
