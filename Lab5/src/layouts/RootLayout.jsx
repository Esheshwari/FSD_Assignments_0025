
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function RootLayout() {
  const location = useLocation();

  const navStyle = ({ isActive }) => ({
    padding: '8px 16px',
    marginRight: '8px',
    borderRadius: '4px',
    textDecoration: 'none',
    background: isActive ? '#0070f3' : '#e0e0e0',
    color: isActive ? '#fff' : '#000',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '20px auto' }}>
      {/* Navbar */}
      <header style={{ borderBottom: '2px solid #ccc', paddingBottom: '12px' }}>
        <h1>React Router Showcase</h1>
        <nav>
          <NavLink to="/" end style={navStyle}>Home</NavLink>
          <NavLink to="/products" style={navStyle}>Products List</NavLink>
          <NavLink to="/invalid-page-test" style={navStyle}>Test 404 Page</NavLink>
        </nav>
      </header>

      {/* Live Active Route Tracker */}
      <div style={{ background: '#f5f5f5', padding: '12px', margin: '16px 0', borderRadius: '6px' }}>
        <strong>🌐 Live Router State:</strong>
        <p style={{ margin: '4px 0 0 0' }}>
          Active Pathname: <code style={{ color: '#0070f3', fontSize: '1.1em' }}>{location.pathname}</code>
        </p>
      </div>

      {/* Child Route Content */}
      <main style={{ minHeight: '200px' }}>
        <Outlet />
      </main>
    </div>
  );
}