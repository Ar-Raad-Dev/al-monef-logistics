
// This configuration is for client-side Firebase SDK initialization.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";

interface ClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

let firebaseClientConfig: ClientConfig = {};

// Attempt to parse FIREBASE_WEBAPP_CONFIG first (provided by App Hosting)
if (process.env.FIREBASE_WEBAPP_CONFIG) {
  try {
    const parsedConfig = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
    firebaseClientConfig = {
      apiKey: parsedConfig.apiKey,
      authDomain: parsedConfig.authDomain,
      projectId: parsedConfig.projectId,
      storageBucket: parsedConfig.storageBucket,
      messagingSenderId: parsedConfig.messagingSenderId,
      appId: parsedConfig.appId,
      measurementId: parsedConfig.measurementId,
    };
    // console.log("Successfully parsed FIREBASE_WEBAPP_CONFIG for client setup.");
  } catch (error) {
    console.error("Failed to parse FIREBASE_WEBAPP_CONFIG. Falling back to NEXT_PUBLIC_ variables if available.", error);
    // Fallback to individual NEXT_PUBLIC_ variables if parsing FIREBASE_WEBAPP_CONFIG fails
    firebaseClientConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
  }
} else {
  // Fallback to individual NEXT_PUBLIC_ variables if FIREBASE_WEBAPP_CONFIG is not set
  // This is common for local development using .env.local
  // console.log("FIREBASE_WEBAPP_CONFIG not found. Using NEXT_PUBLIC_ variables for client setup.");
  firebaseClientConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
}

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
      'Ensure FIREBASE_WEBAPP_CONFIG is correctly set in your App Hosting build environment, ' +
      'or that NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, ' +
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID, and NEXT_PUBLIC_FIREBASE_APP_ID environment variables are set (e.g., in .env.local for local development or App Hosting environment settings).'
    );
    return null;
  }

  try {
    // Cast config to a type that initializeApp expects, as process.env values are string | undefined
    // and parsedConfig values are also potentially undefined if not in the JSON.
    const configForInit = {
        apiKey: firebaseClientConfig.apiKey as string,
        authDomain: firebaseClientConfig.authDomain as string,
        projectId: firebaseClientConfig.projectId as string,
        storageBucket: firebaseClientConfig.storageBucket, // storageBucket is optional
        messagingSenderId: firebaseClientConfig.messagingSenderId, // messagingSenderId is optional
        appId: firebaseClientConfig.appId as string,
        measurementId: firebaseClientConfig.measurementId, // measurementId is optional
    };

    const app = initializeApp(configForInit);

    // Initialize Firebase Analytics if measurementId is present and Analytics is supported
    if (configForInit.measurementId) {
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
