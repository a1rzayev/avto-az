'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
}

export default function EditCarPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCar() {
      const res = await fetch(`/api/cars/${params.id}`);
      const data = await res.json();
      setCar(data);
    }

    fetchCar();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car) return;

    const res = await fetch(`/api/cars/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
      }),
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

  if (!car) return <div>Загрузка...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Редактировать машину</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium">Марка</label>
          <input
            type="text"
            id="brand"
            className="w-full p-2 border rounded-md"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium">Модель</label>
          <input
            type="text"
            id="model"
            className="w-full p-2 border rounded-md"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium">Год выпуска</label>
          <input
            type="number"
            id="year"
            className="w-full p-2 border rounded-md"
            value={car.year}
            onChange={(e) => setCar({ ...car, year: Number(e.target.value) })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">Цена</label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border rounded-md"
            value={car.price}
            onChange={(e) => setCar({ ...car, price: Number(e.target.value) })}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Обновить</button>
      </form>
    </div>
  );
}
