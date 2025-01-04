// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {user.role === 'admin' || user.role === 'manager' ? (
              <li>
                <Link to="/products">Products</Link>
              </li>
            ) : null}
            {user.role === 'admin' && (
              <li>
                <Link to="/add-product">Add Product</Link>
              </li>
            )}
          </>
        )}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
