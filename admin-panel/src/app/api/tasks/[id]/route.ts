import { NextResponse } from 'next/server';
import { firestoreAdmin } from '@/lib/firebaseAdmin';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await firestoreAdmin
      .collection('tasks')
      .doc(params.id)
      .update({ isDone: body.isDone });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await firestoreAdmin.collection('tasks').doc(params.id).delete();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
