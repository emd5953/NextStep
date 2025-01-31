import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Auth from './components/Auth';
import Swipe from './components/Swipe'; 
import Profile from './pages/Profile'; 
import Login from './pages/Login';
import './styles/App.css';

function App() {
  return (
    <Router>
      {/* Use a custom class name ("app-container") to avoid Bootstrap’s container defaults */}
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
          <div className="brandingCenter">
            <h1 className="title">NextStep</h1>
            <p className="subtitle">Your next career move, simplified.</p>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <div className="content">
                  <Swipe />
                </div>
              }
            />
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
