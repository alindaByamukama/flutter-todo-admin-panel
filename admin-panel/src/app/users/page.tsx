'use client';

import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';

interface User {
  uid: string;
  email: string | null;
  disabled: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading users…</div>;
  if (users.length === 0) return <div className="p-4">No users found.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation */}
      <NavBar />

      {/* Main content area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">All Users</h1>

        {/* Table view, scrollable on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-collapse shadow rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  UID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Disabled
                </th>
                <th className="px-6 py-3 text-sm font-medium text-white uppercase text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.uid} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                  <td className="px-6 py-4 text-sm text-gray-200">{u.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-400 break-all">{u.uid}</td>
                  <td className="px-6 py-4 text-sm text-gray-200">{u.disabled ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-sm text-center space-x-4">
                    <button
                      className="text-blue-400 hover:text-blue-200"
                      onClick={async () => {
                        await fetch(`/api/users/${u.uid}`, {
                          method: 'PATCH',
                          body: JSON.stringify({ disabled: !u.disabled }),
                        });
                        window.location.reload();
                      }}
                    >
                      {u.disabled ? 'Enable' : 'Disable'}
                    </button>
                    <button
                      className="text-red-400 hover:text-red-200"
                      onClick={async () => {
                        await fetch(`/api/users/${u.uid}`, {
                          method: 'DELETE',
                        });
                        window.location.reload();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional: Card view for small screens */}
        <div className="mt-6 space-y-4 md:hidden">
          {users.map(u => (
            <div key={u.uid} className="p-4 bg-gray-800 rounded shadow">
              <div>
                <strong>Email:</strong> {u.email}
              </div>
              <div>
                <strong>UID:</strong> {u.uid}
              </div>
              <div>
                <strong>Disabled:</strong> {u.disabled ? 'Yes' : 'No'}
              </div>
              <div className="mt-2 flex space-x-4">
                <button
                  className="text-blue-400 hover:text-blue-200"
                  onClick={async () => {
                    await fetch(`/api/users/${u.uid}`, {
                      method: 'PATCH',
                      body: JSON.stringify({ disabled: !u.disabled }),
                    });
                    window.location.reload();
                  }}
                >
                  {u.disabled ? 'Enable' : 'Disable'}
                </button>
                <button
                  className="text-red-400 hover:text-red-200"
                  onClick={async () => {
                    await fetch(`/api/users/${u.uid}`, {
                      method: 'DELETE',
                    });
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
