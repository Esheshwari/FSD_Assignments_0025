// frontend/src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (!res.ok) throw new Error('Failed to fetch products from backend');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">{user ? `Logout (${user})` : 'Login'}</Link>
      </nav>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} onAddToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetails onAddToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
              user={user} 
              clearCart={() => setCart([])}
              refreshProducts={fetchProducts}
            />
          } 
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}