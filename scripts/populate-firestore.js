#!/usr/bin/env node

/**
 * Populate Firestore with sample data
 * Usage: node scripts/populate-firestore.js
 */

import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const credentialsPath = process.env.FIREBASE_CREDENTIALS;

if (!credentialsPath) {
  console.error("\n❌ Error: FIREBASE_CREDENTIALS environment variable not set");
  console.error("\nTo populate Firestore from terminal:\n");
  console.error("1. Download service account key:");
  console.error("   - Go to Firebase Console > Project Settings");
  console.error("   - Service Accounts tab > Generate New Private Key");
  console.error("   - Save as: serviceAccountKey.json\n");
  console.error("2. Run this command:");
  console.error("   FIREBASE_CREDENTIALS=./serviceAccountKey.json node scripts/populate-firestore.js\n");
  process.exit(1);
}

if (!fs.existsSync(credentialsPath)) {
  console.error(`❌ Error: Credentials file not found: ${credentialsPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const sampleData = {
  services: [
    {
      title: "Web Development",
      description:
        "Building scalable, responsive web applications using modern React and TypeScript. From concept to deployment.",
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "API Development",
      description:
        "RESTful and GraphQL APIs with Node.js, Express, and database design. Secure, efficient, and well-documented.",
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Database Design",
      description:
        "Schema design, optimization, and management. PostgreSQL, MongoDB, and Firebase expertise.",
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  skills: [
    {
      name: "React",
      category: "Frontend",
      proficiency: 95,
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "TypeScript",
      category: "Frontend",
      proficiency: 90,
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Node.js",
      category: "Backend",
      proficiency: 92,
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Firebase",
      category: "Backend",
      proficiency: 88,
      display_order: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      proficiency: 93,
      display_order: 5,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "PostgreSQL",
      category: "Database",
      proficiency: 85,
      display_order: 6,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Features include product catalog, shopping cart, and payment integration.",
      category: "Full Stack",
      tech_stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image_url: null,
      project_url: "https://example-ecommerce.com",
      github_url: "https://github.com/user/ecommerce",
      is_featured: true,
      is_active: true,
      display_order: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Task Management App",
      description:
        "Real-time task management application with collaborative features. Built with React and Firebase for instant updates and cloud storage.",
      category: "Frontend",
      tech_stack: ["React", "Firebase", "Tailwind CSS"],
      image_url: null,
      project_url: "https://example-tasks.com",
      github_url: "https://github.com/user/tasks-app",
      is_featured: true,
      is_active: true,
      display_order: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Analytics Dashboard",
      description:
        "Data visualization dashboard with interactive charts and real-time metrics. Fetches data from multiple APIs and displays comprehensive analytics.",
      category: "Full Stack",
      tech_stack: ["React", "Node.js", "D3.js", "MongoDB"],
      image_url: null,
      project_url: "https://example-analytics.com",
      github_url: "https://github.com/user/analytics-dashboard",
      is_featured: false,
      is_active: true,
      display_order: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  testimonials: [
    {
      client_name: "Sarah Johnson",
      client_title: "Product Manager",
      client_company: "Tech Startup Inc",
      content:
        "Joseph is an exceptional developer. He delivered our project on time with excellent code quality. Highly recommended!",
      rating: 5,
      is_active: true,
      display_order: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      client_name: "David Chen",
      client_title: "CTO",
      client_company: "Digital Solutions Ltd",
      content:
        "Working with Joseph was a great experience. He has strong technical skills and great communication.",
      rating: 5,
      is_active: true,
      display_order: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      client_name: "Grace Lee",
      client_title: "Founder",
      client_company: "Creative Agency",
      content:
        "Joseph turned our vision into reality. His attention to detail and problem-solving skills are remarkable.",
      rating: 5,
      is_active: true,
      display_order: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};

async function populateFirestore() {
  try {
    console.log("📝 Populating Firestore with sample data...\n");

    for (const [collection, documents] of Object.entries(sampleData)) {
      console.log(`\n📦 Adding ${collection}...`);

      for (const doc of documents) {
        const docRef = await db.collection(collection).add(doc);
        console.log(`   ✓ Added ${collection}: ${docRef.id}`);
      }

      console.log(`   ✅ Completed: ${documents.length} documents added`);
    }

    console.log("\n✅ Firestore population complete!\n");
    console.log("Data added to collections:");
    console.log("   - services (3 documents)");
    console.log("   - skills (6 documents)");
    console.log("   - projects (3 documents)");
    console.log("   - testimonials (3 documents)");
    console.log("\nYour portfolio should now display content.\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error populating Firestore:", error.message);
    process.exit(1);
  }
}

populateFirestore();
