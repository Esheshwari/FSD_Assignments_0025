
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h2>⚠️ 404 - Page Not Found</h2>
      <p>The path you entered does not match any defined route.</p>
      <Link to="/">Return to Home Page</Link>
    </div>
  );
}