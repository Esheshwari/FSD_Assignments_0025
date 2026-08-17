import { Link } from 'react-router-dom';

const items = [
  { id: '101', name: 'Wireless Headphones' },
  { id: '102', name: 'Mechanical Keyboard' },
  { id: '103', name: 'Gaming Mouse' },
];

export default function Products() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 Products List Page</h2>
      <p>Path: <code>/products</code></p>
      <p>Click an item below to see <strong>Dynamic Route Parameters</strong> in action:</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ margin: '8px 0' }}>
            <Link to={`/products/${item.id}`}>{item.name} (ID: {item.id})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
