
// This configuration is for client-side Firebase SDK initialization.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration from your "almaneef-logistics" project
// These should be set as NEXT_PUBLIC_ environment variables
export const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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
      'Please ensure NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, ' +
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID, and NEXT_PUBLIC_FIREBASE_APP_ID environment variables are set. ' +
      'These are typically configured in your Firebase App Hosting environment settings in the Firebase Console.'
    );
    return null;
  }

  try {
    // Cast config to a type that initializeApp expects, as process.env values are string | undefined
    const configForInit = {
        apiKey: firebaseClientConfig.apiKey as string,
        authDomain: firebaseClientConfig.authDomain as string,
        projectId: firebaseClientConfig.projectId as string,
        storageBucket: firebaseClientConfig.storageBucket as string | undefined, // storageBucket is optional
        messagingSenderId: firebaseClientConfig.messagingSenderId as string | undefined, // messagingSenderId is optional
        appId: firebaseClientConfig.appId as string,
        measurementId: firebaseClientConfig.measurementId as string | undefined, // measurementId is optional
    };
    const app = initializeApp(configForInit);

    // Initialize Firebase Analytics if measurementId is present and Analytics is supported
    if (firebaseClientConfig.measurementId) {
      isSupported().then(supported => {
        if (supported) {
          try {
            getAnalytics(app);
            // console.log("Firebase Analytics initialized successfully.");
          } catch (e) {
            console.error("Failed to initialize Firebase Analytics", e);
          }
        } else {
          // console.log("Firebase Analytics is not supported in this environment.");
        }
      });
    }
    return app;
  } catch (e) {
    console.error("Error initializing Firebase client app:", e);
    return null;
  }
}
