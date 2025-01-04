// src/components/Login.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication (Replace with your actual API logic)
    if (email === 'admin@example.com' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      history.push('/dashboard');
    } else if (email === 'manager@example.com' && password === 'manager') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'manager' }));
      history.push('/dashboard');
    } else if (email === 'staff@example.com' && password === 'staff') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'staff' }));
      history.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
