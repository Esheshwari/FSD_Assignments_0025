import Header from './components/Header';
import Footer from './components/Footer';
import BookCard from './components/BookCard';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';
import { initialBooks } from './data/books';

function MainApp() {
  return (
    <div style={styles.appContainer}>
      <Header />
      <main style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Featured Books</h1>
        <div style={styles.grid}>
          {initialBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
      <CartModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw'
  },
  mainContent: {
    flex: 1,
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  pageTitle: {
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    color: '#1e293b'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem'
  }
};
