'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCarPage() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/cars', {
      method: 'POST',
      body: JSON.stringify({ brand, model, year, price }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data?.error) {
      setError(data.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Добавить машину</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium">Марка</label>
          <input
            type="text"
            id="brand"
            className="w-full p-2 border rounded-md"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium">Модель</label>
          <input
            type="text"
            id="model"
            className="w-full p-2 border rounded-md"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium">Год выпуска</label>
          <input
            type="number"
            id="year"
            className="w-full p-2 border rounded-md"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">Цена</label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Добавить</button>
      </form>
    </div>
  );
}
