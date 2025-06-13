
// This configuration is for client-side Firebase SDK initialization.
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";

// Hardcoded Firebase configuration
// IMPORTANT: This is generally not recommended for production for security and flexibility reasons.
// This is a fallback due to issues with environment variable injection in the current App Hosting setup.
const hardcodedFirebaseConfig = {
  apiKey: "AIzaSyCBHe167qClkDebeIgYb9NXIl2tRXkBWCk",
  authDomain: "almaneef-logistics.firebaseapp.com",
  projectId: "almaneef-logistics",
  storageBucket: "almaneef-logistics.firebasestorage.app",
  messagingSenderId: "517910068717",
  appId: "1:517910068717:web:bfd67f1faea6ebfe4a3be4",
  measurementId: "G-0GMSRGELN7"
};

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
let configSource: string = "unknown";

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
    configSource = "FIREBASE_WEBAPP_CONFIG";
    // console.log("Successfully parsed FIREBASE_WEBAPP_CONFIG for client setup.");
  } catch (error) {
    console.warn("Failed to parse FIREBASE_WEBAPP_CONFIG. Falling back to NEXT_PUBLIC_ variables or hardcoded config.", error);
    // Fallback logic continues below
  }
}

// If FIREBASE_WEBAPP_CONFIG wasn't successfully used, try individual NEXT_PUBLIC_ variables
if (!firebaseClientConfig.apiKey) { // Check if primary source failed
  const individualEnvConfig: ClientConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  if (individualEnvConfig.apiKey && individualEnvConfig.projectId && individualEnvConfig.appId) {
    firebaseClientConfig = individualEnvConfig;
    configSource = "NEXT_PUBLIC_ variables";
    // console.log("Using individual NEXT_PUBLIC_ environment variables for client setup.");
  }
}

// If both environment variable methods failed, use the hardcoded config as a last resort.
if (!firebaseClientConfig.apiKey) {
  firebaseClientConfig = hardcodedFirebaseConfig;
  configSource = "hardcoded fallback";
  console.warn("Firebase config: Using hardcoded fallback. This is not recommended for production.");
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
      `Firebase client config is missing required fields (Source attempted: ${configSource}). ` +
      'If using environment variables, ensure FIREBASE_WEBAPP_CONFIG is correctly set in your App Hosting build environment, ' +
      'or that NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, ' +
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID, and NEXT_PUBLIC_FIREBASE_APP_ID environment variables are set. ' +
      'Currently falling back to hardcoded config if available, but essential fields are still missing.'
    );
    return null;
  }

  try {
    // Cast config to a type that initializeApp expects
    const configForInit = {
        apiKey: firebaseClientConfig.apiKey as string,
        authDomain: firebaseClientConfig.authDomain as string,
        projectId: firebaseClientConfig.projectId as string,
        storageBucket: firebaseClientConfig.storageBucket,
        messagingSenderId: firebaseClientConfig.messagingSenderId,
        appId: firebaseClientConfig.appId as string,
        measurementId: firebaseClientConfig.measurementId,
    };

    // console.log(`Initializing Firebase with config from: ${configSource}`, configForInit);
    const app = initializeApp(configForInit);

    if (configForInit.measurementId) {
      isSupported().then(supported => {
        if (supported) {
          try {
            getAnalytics(app);
            // console.log("Firebase Analytics initialized successfully.");
          } catch (e) {
            // console.error("Failed to initialize Firebase Analytics", e);
          }
        } else {
          // console.log("Firebase Analytics is not supported in this environment.");
        }
      });
    }
    return app;
  } catch (e) {
    console.error(`Error initializing Firebase client app (Source: ${configSource}):`, e);
    return null;
  }
}
