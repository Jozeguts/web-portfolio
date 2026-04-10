// Firebase Types (JSDoc definitions for plain JavaScript)

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} display_order
 * @property {boolean} is_active
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} Skill
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} proficiency
 * @property {number} display_order
 * @property {boolean} is_active
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string[]} tech_stack
 * @property {string | null} image_url
 * @property {string | null} project_url
 * @property {string | null} github_url
 * @property {boolean} is_featured
 * @property {boolean} is_active
 * @property {number} display_order
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} id
 * @property {string} client_name
 * @property {string} client_title
 * @property {string} client_company
 * @property {string} content
 * @property {number} rating
 * @property {boolean} is_active
 * @property {number} display_order
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} ContactRequest
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} subject
 * @property {string} message
 * @property {string} service_interest
 * @property {boolean} is_read
 * @property {Date} submitted_at
 */

/**
 * @typedef {Object} FileUploadResult
 * @property {string} url - The public download URL of the uploaded file
 * @property {string} path - The storage path (resources/{category}/{timestamp}-{filename})
 * @property {string} category - The resource category folder
 */

// File Upload Functions:
// - uploadFileToResources(file, category) - Upload file to resources/{category}/ and return public URL
// - deleteFileFromResources(downloadUrl) - Delete file from resources folder by URL

export {};
