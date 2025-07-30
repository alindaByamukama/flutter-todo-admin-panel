import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl mb-6">Admin Dashboard</h1>
        <nav className="space-x-4">
        <Link href="/tasks" className="underline">Manage Tasks</Link>
        <Link href="/users" className="underline">Manage Users</Link>
        </nav>
      </main>
    </div>
  );
}
