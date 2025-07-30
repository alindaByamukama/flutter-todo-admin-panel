import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin';

let serviceAccount: ServiceAccount;

if (process.env.VERCEL_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.VERCEL_SERVICE_ACCOUNT) as ServiceAccount;
} else {
  serviceAccount = require('../../serviceAccountKey.json') as ServiceAccount;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}

export const firestoreAdmin = admin.firestore();
export const authAdmin = admin.auth();
