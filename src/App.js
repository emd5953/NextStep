// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <nav className="nav">
            <a className="navLink" href="/">Home</a>
            <a className="navLink" href="/about">About</a>
            <a className="navLink" href="/profile">Profile</a>
          </nav>
          <Auth />
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
