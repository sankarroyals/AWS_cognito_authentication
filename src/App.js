import logo from './logo.svg';
import './App.css';
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';
import { Account, AccountContext } from './components/ContextApi/Account';
import Navbar from './components/Navbar/Navbar';
import {Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import { useContext, useEffect, useState } from 'react';

function App() {
  const {status} = useContext(AccountContext)
  return (
    
      <>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {status?<Route path='/' element={<Home />} />:<Route path='/signup' element={<SignUp />} />}
          {status?<Route path='/' element={<Home />} />:<Route path='/login' element={<Login />} />}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </>
  );
}

export default App;
