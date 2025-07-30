import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import serviceAccount from '../../serviceAccountKey.json';
import type { ServiceAccount } from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

export const firestoreAdmin = admin.firestore();
export const authAdmin = admin.auth();
