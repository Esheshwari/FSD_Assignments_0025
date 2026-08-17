
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🔍 Product Details</h2>
      <p>Extracted <code>useParams()</code> Value: <strong>{productId}</strong></p>
      <p>Current URL Path: <code>/products/{productId}</code></p>
      <button onClick={() => navigate('/products')} style={{ padding: '8px 12px', cursor: 'pointer' }}>
        ← Back to Products (Programmatic Navigation)
      </button>
    </div>
  );
}