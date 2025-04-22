'use client';

import { useEffect, useState } from 'react';

type Car = {
  id: string;
  brand: string;
  model: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Car[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⭐ Favorite Cars</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((car) => (
            <li key={car.id}>{car.brand} {car.model}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
