// File: /src/App.js
import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './styles/App.css';
import { TokenContext } from './components/TokenContext';

function App() {
  const { token } = useContext(TokenContext);
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <nav className="app-nav">          
            <Link className="app-nav__link" to="/">Home</Link>
            <Link className="app-nav__link" to="/about">About</Link>
            {token && <Link className="app-nav__link" to="/profile">Profile</Link>}
          </nav>
          <Auth />
        </header>

        <main className="app-main">
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
