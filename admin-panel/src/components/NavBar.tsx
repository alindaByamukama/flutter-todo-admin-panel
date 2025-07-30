import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-black text-white p-4 flex space-x-6">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/tasks" className="hover:underline">Tasks</Link>
      <Link href="/users" className="hover:underline">Users</Link>
    </header>
  );
}
