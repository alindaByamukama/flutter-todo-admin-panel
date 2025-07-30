'use client';

import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
  uid?: string;
  email: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading…</div>;
  if (tasks.length === 0) return <div className="p-4">No tasks found.</div>;

  return (
    <div className="p-4">
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4">All Tasks</h1>
        {tasks.map(t => (
          <li key={t.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={async e => {
                  await fetch(`/api/tasks/${t.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ isDone: e.target.checked }),
                  });
                  window.location.reload();
                }}
              />
              <div>
                <div className={t.isDone ? 'line-through text-gray-500' : ''}>
                  {t.title}
                </div>
                <div className="text-xs text-gray-400">
                  Created by: {t.email} ({t.uid})
                </div>
              </div>
            </div>
            <button
              className="text-red-500 hover:underline mt-2 sm:mt-0"
              onClick={async () => {
                await fetch(`/api/tasks/${t.id}`, { method: 'DELETE' });
                window.location.reload();
              }}
            >
              Delete
            </button>
          </li>
        ))}
    </div>
  );
}
