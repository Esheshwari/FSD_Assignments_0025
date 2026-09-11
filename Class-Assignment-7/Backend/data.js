// backend/data.js
const products = [
  { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 99, stock: 5, description: 'High quality noise canceling headphones.' },
  { id: '2', name: 'Smartwatch', category: 'Electronics', price: 199, stock: 3, description: 'Track your steps and fitness metrics.' },
  { id: '3', name: 'Mechanical Keyboard', category: 'Electronics', price: 120, stock: 10, description: 'RGB backlit mechanical keyboard.' },
  { id: '4', name: 'Ergonomic Chair', category: 'Furniture', price: 250, stock: 2, description: 'Comfortable office chair with lumbar support.' },
  { id: '5', name: 'Stainless Steel Bottle', category: 'Lifestyle', price: 25, stock: 15, description: '1L insulated water bottle.' },
  { id: '6', name: 'Running Shoes', category: 'Footwear', price: 85, stock: 8, description: 'Lightweight breathable running shoes.' },
  { id: '7', name: 'Backpack', category: 'Accessories', price: 45, stock: 6, description: 'Durable water-resistant laptop backpack.' },
  { id: '8', name: 'Desk Lamp', category: 'Furniture', price: 30, stock: 0, description: 'LED desk lamp with brightness control.' }
];

const orders = [];

module.exports = { products, orders };