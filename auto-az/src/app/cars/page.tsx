'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Car = {
  id: string;
  brand: string;
  model: string;
  price: number;
};

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch('/api/cars');
      const data = await res.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Cars</h1>
      <ul className="space-y-4">
        {cars.map((car) => (
          <li key={car.id} className="border p-4 rounded hover:bg-gray-100 transition">
            <Link href={`/cars/${car.id}`}>
              <div className="cursor-pointer">
                <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
                <p className="text-gray-600">${car.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
