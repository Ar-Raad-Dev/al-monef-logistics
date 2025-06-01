
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('CRITICAL: FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY environment variable is not set. Firebase Admin SDK cannot initialize.');
    }

    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!storageBucket) {
      console.warn('WARNING: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET environment variable is not set. Firebase Storage operations will likely fail if attempted.');
    }

    // Parse the service account key JSON string
    const parsedServiceAccount = JSON.parse(serviceAccountKey);

    admin.initializeApp({
      credential: admin.credential.cert(parsedServiceAccount),
      storageBucket: storageBucket, // Allow initialization even if storageBucket is undefined, but warn above
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('CRITICAL: Firebase Admin SDK initialization error. Backend Firebase operations will fail:', error);
    // Not re-throwing, to allow the app to potentially start for non-Firebase related parts,
    // but backend Firebase features will be broken. Error is logged critically.
  }
}

export const firestore = admin.firestore();
export const storage = admin.storage();
export default admin;
