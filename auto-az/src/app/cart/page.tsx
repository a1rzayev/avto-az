'use client';

import { useEffect, useState } from 'react';

type CartItem = {
  id: string;
  brand: string;
  model: string;
  price: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setItems(data);
    };

    fetchCart();
  }, []);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                {item.brand} {item.model} — ${item.price}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ${total}</p>
        </>
      )}
    </div>
  );
}
