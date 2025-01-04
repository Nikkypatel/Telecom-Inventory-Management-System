// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          {/* Routes for the pages */}
          <Route exact path="/" render={() => (user ? <Dashboard /> : <Login />)} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" render={() => (user ? <Dashboard /> : <Login />)} />
          <Route path="/products" render={() => (user ? <ProductList /> : <Login />)} />
          <Route path="/add-product" render={() => (user ? <ProductForm /> : <Login />)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
