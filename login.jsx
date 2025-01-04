import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // You need axios for API calls

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/login', {
        username: email,  // Replace with your field name from API
        password,
      });

      // On successful login, the server should return a JWT token
      const token = response.data.token;

      if (token) {
        // Store the JWT token in localStorage
        localStorage.setItem('jwt_token', token);

        // Optionally store user info for later use (like in the dashboard)
        const user = {
          email,
          role: response.data.role, // Assuming the response includes the user's role
        };
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to the dashboard or another protected route
        history.push('/dashboard');
      }
    } catch (err) {
      // If there is an error (e.g., invalid credentials), show an error message
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
