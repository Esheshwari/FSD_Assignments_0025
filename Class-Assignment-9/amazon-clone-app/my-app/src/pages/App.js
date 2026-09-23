import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './App.css';
import { Routes, Route} from 'react-router';
import Home from './Home';
import Card from './Card';
import Products from './Products';
import Account from './Account';
import Orders from './Orders';
import Profile from './Profile';
import NotFound from './Error404';
function App() {
  return (
     <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Card />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;