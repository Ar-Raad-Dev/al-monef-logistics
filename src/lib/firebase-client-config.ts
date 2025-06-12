
// This configuration is for client-side Firebase SDK initialization.
// Firebase App Hosting often injects client-side Firebase configuration automatically.
// However, if you need to initialize Firebase manually on the client for features
// like Firebase Authentication, client-side Firestore/Realtime Database, or Analytics,
// you can use a config object structured like this.

// The Web API Key provided by the user.
const apiKey = "AIzaSyCvB8NSn_B55ZqcgYgGaJ2OsIiT7SciRms";

// These other values would typically come from your Firebase project settings
// and should be set as environment variables for security and flexibility.
// Ensure these are prefixed with NEXT_PUBLIC_ if accessed on the client.
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const authDomain = projectId ? `${projectId}.firebaseapp.com` : undefined;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET; // This is already used in firebase-admin.ts
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID; // Optional, for Google Analytics for Firebase

export const firebaseClientConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId, // Only include if you use Firebase Analytics
};

// HOW TO USE THIS FOR CLIENT-SIDE FIREBASE INITIALIZATION:
//
// 1. Ensure all necessary environment variables (NEXT_PUBLIC_FIREBASE_PROJECT_ID, etc.) are set.
// 2. In a client-side entry point of your application (e.g., a custom _app.tsx if using Pages Router,
//    or a client component in the root layout for App Router, or a dedicated client-side Firebase setup file),
//    you would import this config and initialize Firebase:
//
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { firebaseClientConfig } from './firebase-client-config';
// // Optionally import other services like getAnalytics, getAuth, getFirestore (client version)
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";

// export function getClientFirebaseApp() {
//   if (getApps().length > 0) {
//     return getApp();
//   }
//
//   // Ensure all required config values are present before initializing
//   if (
//     !firebaseClientConfig.apiKey ||
//     !firebaseClientConfig.authDomain ||
//     !firebaseClientConfig.projectId
//   ) {
//     console.error(
//       'Firebase client config is missing required fields (apiKey, authDomain, projectId). ' +
//       'Ensure NEXT_PUBLIC_FIREBASE_PROJECT_ID and other related env vars are set.'
//     );
//     // Return a dummy or throw an error, as Firebase cannot initialize
//     return null; 
//   }
//
//   const app = initializeApp(firebaseClientConfig);
//
//   // Initialize other Firebase services here if needed, e.g.:
//   // if (typeof window !== 'undefined' && firebaseClientConfig.measurementId) {
//   //   try {
//   //     getAnalytics(app);
//   //   } catch (e) {
//   //     console.error("Failed to initialize Firebase Analytics", e);
//   //   }
//   // }
//   // export const auth = getAuth(app);
//   // export const db = getFirestore(app);
//
//   return app;
// }
//
// // Then, you might call getClientFirebaseApp() in a useEffect hook in a top-level client component.
// // Example (in a client component):
// // useEffect(() => {
// //   getClientFirebaseApp();
// // }, []);
//
// // Note: Your current application does not explicitly use client-side Firebase SDK features
// // that require this manual initialization. Form submissions are handled via API routes
// // which use the server-side Admin SDK.
