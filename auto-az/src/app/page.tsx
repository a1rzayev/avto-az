'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function fetchCars() {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    }

    fetchCars();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Список машин</h1>
      <Link href="/add-car" className="text-blue-500 mb-4 inline-block">Добавить машину</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
            <p className="text-gray-500">Год: {car.year}</p>
            <p className="text-gray-500">Цена: {car.price}₽</p>
            <div className="mt-4 flex justify-between">
              <Link href={`/edit-car/${car.id}`} className="text-yellow-500">Редактировать</Link>
              <button className="text-red-500">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
