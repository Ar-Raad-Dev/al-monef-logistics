
// This configuration is for client-side Firebase SDK initialization.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// Optionally import other services like getAnalytics, getAuth, getFirestore (client version)
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// !!! IMPORTANT !!!
// Replace the values below with the Firebase Web App configuration
// from your *NEW* Firebase project.
// You can find this in your new Firebase project's settings:
// Project Settings (gear icon) > General tab > Your apps > Web app > SDK setup and configuration (select "Config").
export const firebaseClientConfig = {
  apiKey: "YOUR_NEW_WEB_API_KEY", // Replace with your new API key
  authDomain: "YOUR_NEW_PROJECT_ID.firebaseapp.com", // Replace YOUR_NEW_PROJECT_ID
  databaseURL: "https://YOUR_NEW_PROJECT_ID-default-rtdb.firebaseio.com", // Replace YOUR_NEW_PROJECT_ID (if using RTDB)
  projectId: "YOUR_NEW_PROJECT_ID", // Replace with your new Project ID
  storageBucket: "YOUR_NEW_PROJECT_ID.appspot.com", // Replace YOUR_NEW_PROJECT_ID
  messagingSenderId: "YOUR_NEW_MESSAGING_SENDER_ID", // Replace with your new Sender ID
  appId: "YOUR_NEW_APP_ID", // Replace with your new App ID
  // measurementId: "YOUR_NEW_MEASUREMENT_ID" // Optional, for Google Analytics
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
  // (Basic check, you should ensure all your new config values are present)
  if (
    !firebaseClientConfig.apiKey ||
    !firebaseClientConfig.authDomain ||
    !firebaseClientConfig.projectId ||
    firebaseClientConfig.apiKey === "YOUR_NEW_WEB_API_KEY" // Check if it's still a placeholder
  ) {
    console.error(
      'Firebase client config is missing required fields or contains placeholder values. ' +
      'Please update src/lib/firebase-client-config.ts with your new Firebase project configuration.'
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
    // export const db = getFirestore(app); // client-side Firestore

    return app;
  } catch (e) {
    console.error("Error initializing Firebase client app:", e);
    return null;
  }
}
