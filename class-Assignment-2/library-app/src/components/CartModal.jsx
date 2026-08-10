import { useCart } from '../context/CartContext';

export default function CartModal() {
  const { cart, removeFromCart, clearCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    alert('🎉 Thank you for your purchase! Checkout completed.');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} style={styles.item}>
                <div>
                  <strong>{item.title}</strong>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <hr />
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button style={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
          </div>
        )}
        <button style={styles.closeBtn} onClick={() => setIsCartOpen(false)}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modal: { background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', maxWidth: '450px' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' },
  removeBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
  checkoutBtn: { width: '100%', padding: '0.75rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem', fontWeight: 'bold' },
  closeBtn: { width: '100%', padding: '0.5rem', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '0.5rem' }
};