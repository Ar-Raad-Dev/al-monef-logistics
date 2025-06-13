
import admin from 'firebase-admin';

let firestoreInstance: admin.firestore.Firestore;
let storageInstance: admin.storage.Storage;

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET; // Used for client and can be used by admin

  if (!serviceAccountKey) {
    console.error(
      'CRITICAL: FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot initialize. Backend Firebase operations will fail.'
    );
    // To prevent crashes when firestore or storage is accessed before proper init,
    // we can assign a non-functional placeholder or throw immediately upon access.
    // For now, accessing firestore or storage will result in an error if not initialized.
  } else {
    try {
      // Parse the service account key JSON string
      const parsedServiceAccount = JSON.parse(serviceAccountKey);

      admin.initializeApp({
        credential: admin.credential.cert(parsedServiceAccount),
        storageBucket: storageBucket || undefined, // Use if available, otherwise undefined
      });
      console.log('Firebase Admin SDK initialized successfully.');
      firestoreInstance = admin.firestore();
      storageInstance = admin.storage();
    } catch (error) {
      console.error('CRITICAL: Firebase Admin SDK initialization error. Backend Firebase operations will fail:', error);
      // Log the error but don't re-throw, to allow the app to potentially start for non-Firebase related parts.
      // Firebase Admin features will be broken.
    }
  }
} else {
  // If apps are already initialized, get the default app's services
  const defaultApp = admin.app();
  firestoreInstance = defaultApp.firestore();
  storageInstance = defaultApp.storage();
  // console.log('Firebase Admin SDK: Using existing initialized app.');
}

// Export instances that might be undefined if initialization failed
// Consumers should check if they are defined before using, or handle errors.
// Alternatively, throw an error here if not initialized.
export const firestore = firestoreInstance!; // Add '!' to assert it will be defined, or handle undefined case
export const storage = storageInstance!;   // Add '!' to assert it will be defined, or handle undefined case

// A helper to check if admin is initialized, useful for graceful degradation
export function isAdminInitialized(): boolean {
  return admin.apps.length > 0 && !!firestoreInstance && !!storageInstance;
}

export default admin;
