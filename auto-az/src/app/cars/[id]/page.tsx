'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description?: string;
};

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`/api/cars/${id}`);
      const data = await res.json();
      setCar(data);
    };

    if (id) fetchCar();
  }, [id]);

  if (!car) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
      <p className="text-gray-600 mb-2">Year: {car.year}</p>
      <p className="text-gray-600 mb-2">Price: ${car.price}</p>
      {car.description && (
        <p className="text-gray-800 mt-4">{car.description}</p>
      )}
    </div>
  );
}
