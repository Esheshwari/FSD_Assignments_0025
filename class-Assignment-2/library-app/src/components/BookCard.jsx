import { useCart } from '../context/CartContext';

export default function BookCard({ book }) {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <img src={book.cover} alt={book.title} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.author}>by {book.author}</p>
        <p style={styles.price}>${book.price.toFixed(2)}</p>
        <button style={styles.button} onClick={() => addToCart(book)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  image: {
    width: '100%',
    height: '220px',
    objectFit: 'cover'
  },
  content: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    flex: 1
  },
  title: {
    fontSize: '1.1rem',
    color: '#0f172a'
  },
  author: {
    color: '#64748b',
    fontSize: '0.875rem'
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '0.5rem 0'
  },
  button: {
    marginTop: 'auto',
    padding: '0.6rem',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};