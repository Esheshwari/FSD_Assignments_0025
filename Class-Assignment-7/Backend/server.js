// backend/server.js
const express = require('express');
const cors = require('cors');
const { products, orders } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// GET all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// POST place an order
app.post('/api/orders', (req, res) => {
  const { items, userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: 'User must be logged in to place an order.' });
  }
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Cart cannot be empty.' });
  }

  // Validate stock for each item
  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(404).json({ message: `Product ${item.name} no longer exists.` });
    }
    if (item.quantity > product.stock) {
      return res.status(400).json({ 
        message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
      });
    }
  }

  // Deduct stock
  items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    product.stock -= item.quantity;
  });

  // Calculate total dynamically
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    id: 'ORD-' + Date.now(),
    userEmail,
    items,
    totalAmount,
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));