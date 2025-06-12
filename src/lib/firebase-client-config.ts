
// This configuration is for client-side Firebase SDK initialization.
// Firebase App Hosting often injects client-side Firebase configuration automatically.
// However, if you need to initialize Firebase manually on the client for features
// like Firebase Authentication, client-side Firestore/Realtime Database, or Analytics,
// you can use a config object structured like this.

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// Optionally import other services like getAnalytics, getAuth, getFirestore (client version)
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// The Web API Key provided by the user.
const apiKey = "AIzaSyCvB8NSn_B55ZqcgYgGaJ2OsIiT7SciRms";

// These other values would typically come from your Firebase project settings
// and should be set as environment variables for security and flexibility.
// Ensure these are prefixed with NEXT_PUBLIC_ if accessed on the client.
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const authDomain = projectId ? `${projectId}.firebaseapp.com` : undefined;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
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

export function getClientFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') {
    // Firebase client SDK should not be initialized on the server
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  // Ensure all required config values are present before initializing
  if (
    !firebaseClientConfig.apiKey ||
    !firebaseClientConfig.authDomain || // authDomain relies on projectId
    !firebaseClientConfig.projectId
  ) {
    console.error(
      'Firebase client config is missing required fields (apiKey, authDomain, projectId). ' +
      'Ensure NEXT_PUBLIC_FIREBASE_PROJECT_ID and your API key are correctly set.'
    );
    // Return null as Firebase cannot initialize properly
    return null;
  }

  try {
    const app = initializeApp(firebaseClientConfig);

    // Initialize other Firebase services here if needed, e.g.:
    // if (firebaseClientConfig.measurementId) {
    //   try {
    //     getAnalytics(app);
    //   } catch (e) {
    //     console.error("Failed to initialize Firebase Analytics", e);
    //   }
    // }
    // export const auth = getAuth(app);
    // export const db = getFirestore(app);

    return app;
  } catch (e) {
    console.error("Error initializing Firebase client app:", e);
    return null;
  }
}
