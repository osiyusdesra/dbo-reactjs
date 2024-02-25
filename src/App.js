import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Customer from './Pages/Customer'
import Supplier from './Pages/Supplier';
import Product from './Pages/Product';
import Order from './Pages/Order';
import Login from './Pages/Login';
import useToken from './UseToken';

function App() {

  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/supplier' element={<Supplier />} />
          <Route path='/product' element={<Product />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
