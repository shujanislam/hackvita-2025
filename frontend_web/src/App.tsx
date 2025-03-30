import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={isAuthenticated ? <Home /> : <Join />} /> */}
        <Route path="/" element={<div>Welcome to Hackvita</div>} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
