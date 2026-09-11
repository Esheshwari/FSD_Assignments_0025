import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product does not exist.');
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <div>
        <label>Qty: </label>
        <input 
          type="number" 
          min="1" 
          max={product.stock} 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))} 
        />
        <button 
          disabled={product.stock === 0 || quantity > product.stock}
          onClick={() => onAddToCart(product, quantity)}
          style={{ marginLeft: '10px' }}
        >
          Add to Cart
        </button>
      </div>
      {quantity > product.stock && <p style={{ color: 'red' }}>Stock is insufficient.</p>}
    </div>
  );
}