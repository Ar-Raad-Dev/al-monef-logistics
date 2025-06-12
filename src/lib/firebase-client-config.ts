
// This configuration is for client-side Firebase SDK initialization.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics"; // Added for Firebase Analytics
// Optionally import other services like getAuth, getFirestore (client version)
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from your new "almaneef-logistics" project
export const firebaseClientConfig = {
  apiKey: "AIzaSyCBHe167qClkDebeIgYb9NXIl2tRXkBWCk",
  authDomain: "almaneef-logistics.firebaseapp.com",
  projectId: "almaneef-logistics",
  storageBucket: "almaneef-logistics.firebasestorage.app",
  messagingSenderId: "517910068717",
  appId: "1:517910068717:web:bfd67f1faea6ebfe4a3be4",
  measurementId: "G-0GMSRGELN7"
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
    !firebaseClientConfig.authDomain ||
    !firebaseClientConfig.projectId ||
    !firebaseClientConfig.appId
  ) {
    console.error(
      'Firebase client config is missing required fields. ' +
      'Please check src/lib/firebase-client-config.ts.'
    );
    // Return null as Firebase cannot initialize properly
    return null;
  }

  try {
    const app = initializeApp(firebaseClientConfig);

    // Initialize Firebase Analytics if measurementId is present
    if (firebaseClientConfig.measurementId) {
      try {
        getAnalytics(app);
        // console.log("Firebase Analytics initialized successfully.");
      } catch (e) {
        console.error("Failed to initialize Firebase Analytics", e);
      }
    }

    // Initialize other Firebase services here if needed, e.g.:
    // export const auth = getAuth(app);
    // export const db = getFirestore(app); // client-side Firestore

    return app;
  } catch (e) {
    console.error("Error initializing Firebase client app:", e);
    return null;
  }
}
