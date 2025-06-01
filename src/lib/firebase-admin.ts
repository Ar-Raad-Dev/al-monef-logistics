
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    // Parse the service account key JSON string
    const parsedServiceAccount = JSON.parse(serviceAccountKey);

    admin.initializeApp({
      credential: admin.credential.cert(parsedServiceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Get this from your Firebase console -> Storage
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
    // Optionally, throw the error or handle it as per your app's needs
    // For example, you might not want the app to start if Firebase Admin fails to initialize
    // throw new Error('Failed to initialize Firebase Admin SDK: ' + (error as Error).message);
  }
}

export const firestore = admin.firestore();
export const storage = admin.storage();
export default admin;
