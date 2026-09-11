import { useState } from 'react';

export default function Login({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Required form field is empty.');
      return;
    }
    setUser(email);
    setError('');
  };

  if (user) {
    return (
      <div>
        <h2>User Account</h2>
        <p>Logged in as: <strong>{user}</strong></p>
        <button onClick={() => setUser(null)}>Log Out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Enter email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}