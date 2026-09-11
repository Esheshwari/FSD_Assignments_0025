import { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setError('Failed to load orders.'));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((ord) => (
          <div key={ord.id} style={{ border: '1px solid #aaa', padding: '10px', marginBottom: '10px' }}>
            <h4>Order ID: {ord.id}</h4>
            <p>User: {ord.userEmail}</p>
            <p>Total: ${ord.totalAmount}</p>
            <ul>
              {ord.items.map((item) => (
                <li key={item.id}>{item.name} x {item.quantity} (${item.price * item.quantity})</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}