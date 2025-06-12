
// This configuration is for client-side Firebase SDK initialization.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// Optionally import other services like getAnalytics, getAuth, getFirestore (client version)
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// The complete Firebase Web App configuration object provided by the user.
export const firebaseClientConfig = {
  apiKey: "AIzaSyCvB8NSn_B55ZqcgYgGaJ2OsIiT7SciRms",
  authDomain: "al-monef-logistics.firebaseapp.com",
  databaseURL: "https://al-monef-logistics-default-rtdb.firebaseio.com",
  projectId: "al-monef-logistics",
  storageBucket: "al-monef-logistics.appspot.com", // Corrected to .appspot.com as is typical
  messagingSenderId: "506676299367",
  appId: "1:506676299367:web:c1b7843f668ea2cb1f76c2"
  // measurementId is optional and not included in the provided config
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
    !firebaseClientConfig.projectId
  ) {
    console.error(
      'Firebase client config is missing required fields (apiKey, authDomain, projectId). ' +
      'Please ensure the provided firebaseClientConfig object is complete.'
    );
    // Return null as Firebase cannot initialize properly
    return null;
  }

  try {
    const app = initializeApp(firebaseClientConfig);

    // Initialize other Firebase services here if needed, e.g.:
    // if (firebaseClientConfig.measurementId) { // Check if measurementId exists if you add it
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
