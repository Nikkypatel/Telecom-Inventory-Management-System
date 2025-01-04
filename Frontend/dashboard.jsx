// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  // If no user is found, redirect to login page
  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h2>Welcome to the Dashboard, {user.email}</h2>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Dashboard;
