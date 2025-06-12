
"use client";

import { useEffect } from 'react';
import { getClientFirebaseApp } from '@/lib/firebase-client-config';

export default function FirebaseClientInitializer() {
  useEffect(() => {
    // Initialize Firebase client app when this component mounts on the client-side
    const app = getClientFirebaseApp();
    if (app) {
      // You can log or perform other actions once Firebase is initialized
      // console.log("Firebase client app initialized successfully.");
    } else {
      // console.error("Firebase client app failed to initialize or is not configured for client-side use.");
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return null; // This component does not render any visible UI
}
