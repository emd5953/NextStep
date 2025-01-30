// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Auth from './components/Auth';
import About from './pages/About';
import './styles/App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1 className="title">NextStep</h1>
          <p className="subtitle">Your next career move starts here.</p>
          <nav className="nav">
            <Link to="/" className="navLink">Home</Link>
            <Link to="/about" className="navLink">About</Link>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Auth />
        </main>
      </div>
    </Router>
  );
};

const Home = () => (
  <button className="button">Browse Jobs</button>
);

export default App;
