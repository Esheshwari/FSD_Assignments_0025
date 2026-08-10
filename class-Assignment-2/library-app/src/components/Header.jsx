import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <span style={{ fontSize: '24px' }}>📖</span>
        <h2>City Library</h2>
      </div>
      <button style={styles.cartButton} onClick={() => setIsCartOpen(true)}>
        <span style={{ fontSize: '22px' }}>🛒</span>
        {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
      </button>
    </header>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#1e293b', color: '#fff' },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  cartButton: { position: 'relative', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' },
  badge: { position: 'absolute', top: '-8px', right: '-10px', background: '#ef4444', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold' }
};