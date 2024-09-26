"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect } from 'react';

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.id) {
        window.location.href = '/login';
    }
  }, [user]);

  if (!user || !user.id) {
    return null; // Render nothing while redirecting
  }

  return (
    <main className="relative min-h-screen p-6">
      <div className="absolute top-0 left-0 m-6 w-full max-w-lg h-auto p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-left">Profile</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username:</label>
          <p className="w-full px-3 py-2 border border-gray-300 bg-gray-200 text-gray-600 rounded-md">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email:</label>
          <p className="w-full px-3 py-2 border border-gray-300 bg-gray-200 text-gray-600 rounded-md">{user.email}</p>
        </div>
      </div>
    </main>
  );
}