import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, updateQuantity, removeFromCart, user, clearCart, refreshProducts }) {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  // Calculate dynamic total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      setMsg('Validation Error: You must be logged in to place an order.');
      return;
    }
    if (cart.length === 0) {
      setMsg('Validation Error: Your cart is empty.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, userEmail: user })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMsg('Order placed successfully!');
      clearCart();
      refreshProducts(); // refresh products state in app
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {msg && <p style={{ color: msg.includes('successfully') ? 'green' : 'red' }}>{msg}</p>}
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '10px' }}>
              <h4>{item.name}</h4>
              <p>${item.price} each</p>
              <input 
                type="number" 
                value={item.quantity} 
                min="1" 
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))} 
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      )}
    </div>
  );
}