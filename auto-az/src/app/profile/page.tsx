'use client';

import { useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/auth/profile', {
        credentials: 'include',
      });
      const data = await res.json();
      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👤 Profile</h1>
      <p className="mt-2">Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
