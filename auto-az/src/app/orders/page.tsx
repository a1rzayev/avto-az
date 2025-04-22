'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  date: string;
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="border p-3 rounded">
                <p>Order ID: {order.id}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ${order.total}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
