
import admin from 'firebase-admin';

let appInstance: admin.app.App | null = null;
let firestoreInstance: admin.firestore.Firestore | null = null;
let storageInstance: admin.storage.Storage | null = null;
let adminSDKInitialized = false;

const serviceAccountKeyJSON = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

if (!admin.apps.length) {
  if (!serviceAccountKeyJSON) {
    console.error(
      'CRITICAL: FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot initialize. Backend Firebase operations will fail.'
    );
  } else {
    try {
      const serviceAccount = JSON.parse(serviceAccountKeyJSON);
      appInstance = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: storageBucket || undefined,
      });
      firestoreInstance = admin.firestore(appInstance);
      storageInstance = admin.storage(appInstance);
      adminSDKInitialized = true;
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
      console.error(
        'CRITICAL: Firebase Admin SDK initialization error. Backend Firebase operations will fail:',
        error.message
      );
      // Attempt to log more details if available
      if (error.code) console.error(`Error Code: ${error.code}`);
      if (process.env.NODE_ENV === 'development' && serviceAccountKeyJSON) {
        console.error('Service Account Key (first 50 chars):', serviceAccountKeyJSON.substring(0, 50));
      }
    }
  }
} else {
  appInstance = admin.app(); // Get the default app
  firestoreInstance = admin.firestore(appInstance);
  storageInstance = admin.storage(appInstance);
  adminSDKInitialized = true;
  // console.log('Firebase Admin SDK: Using existing initialized app.');
}

// Throw a more specific error if services are accessed without proper initialization
function ensureInitialized<T>(serviceInstance: T | null, serviceName: string): T {
  if (!adminSDKInitialized || !serviceInstance) {
    // This log helps identify if the SDK was expected to be initialized
    // console.error(`Attempted to access ${serviceName} before Firebase Admin SDK was successfully initialized or ${serviceName} is null.`);
    throw new Error(
      `Firebase Admin SDK not initialized or ${serviceName} service is unavailable. Ensure FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY is correctly set and valid.`
    );
  }
  return serviceInstance;
}

// Using a getter to ensure initialization check on every access.
// This is safer than exporting potentially null instances.
export const firestore = new Proxy({}, {
  get: (_, prop) => {
    const service = ensureInitialized(firestoreInstance, 'Firestore');
    const value = (service as any)[prop];
    return typeof value === 'function' ? value.bind(service) : value;
  }
}) as admin.firestore.Firestore;

export const storage = new Proxy({}, {
  get: (_, prop) => {
    const service = ensureInitialized(storageInstance, 'Storage');
    const value = (service as any)[prop];
    return typeof value === 'function' ? value.bind(service) : value;
  }
}) as admin.storage.Storage;


export function isAdminInitialized(): boolean {
  return adminSDKInitialized;
}

// Export the app instance if needed, also through a getter for safety
export const adminApp = new Proxy({}, {
  get: (_, prop) => {
    const app = ensureInitialized(appInstance, 'Admin App');
    const value = (app as any)[prop];
    return typeof value === 'function' ? value.bind(app) : value;
  }
}) as admin.app.App;

export default admin; // Export the default admin namespace
