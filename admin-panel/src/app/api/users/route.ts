import { NextResponse } from 'next/server';
import { authAdmin } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    // List up to 1000 users; for more, use pagination
    const list = await authAdmin.listUsers(1000);
    const users = list.users.map(u => ({
      uid: u.uid,
      email: u.email,
      disabled: u.disabled,
    }));
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
