import { NextResponse } from 'next/server';
import { firestoreAdmin, authAdmin } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const snapshot = await firestoreAdmin.collection('tasks').get();
    const tasks = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data() as { title: string; isDone: boolean; uid: string };
      let email = data.uid;
      try {
        const userRecord = await authAdmin.getUser(data.uid);
        email = userRecord.email || data.uid;
      } catch {
        // fallback to uid if user lookup fails
      }
      return {
        id: doc.id,
        title: data.title,
        isDone: data.isDone,
        uid: data.uid,
        email,
      };
    }));
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
