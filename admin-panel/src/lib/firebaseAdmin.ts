import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
// import serviceAccount from '../../serviceAccountKey.json';
import type { ServiceAccount } from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.VERCEL_SERVICE_ACCOUNT!) as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}

export const firestoreAdmin = admin.firestore();
export const authAdmin = admin.auth();
