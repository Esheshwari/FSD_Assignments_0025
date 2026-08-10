export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} City Library App. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: { textAlign: 'center', padding: '1rem', background: '#0f172a', color: '#94a3b8', marginTop: 'auto' }
};