'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">AutoShop</Link>
      <div className="flex gap-4">
        {session ? (
          <>
            <span>{session.user?.email}</span>
            <Link href="/add-car">Добавить авто</Link>
            <button onClick={() => signOut()} className="text-red-400">Выйти</button>
          </>
        ) : (
          <>
            <Link href="/auth/login">Вход</Link>
            <Link href="/auth/register">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
}
