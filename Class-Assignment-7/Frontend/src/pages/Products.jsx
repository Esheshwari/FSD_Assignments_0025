import { Link } from 'react-router-dom';

export default function Products({ products, onAddToCart }) {
  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <Link to={`/products/${product.id}`}>View Details</Link> <br /><br />
            <button 
              disabled={product.stock === 0} 
              onClick={() => onAddToCart(product)}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}