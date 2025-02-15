// File: /src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import Login from './pages/Login';
import BrowseJobs from './pages/BrowseJobs';
import YourJobs from './pages/YourJobs';
import EmployerDashboard from './pages/EmployerDashboard';
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
            <Link className="app-nav__link" to="/jobs">Jobs</Link>
            {token && <Link className="app-nav__link" to="/profile">Profile</Link>}
            {token && <Link className="app-nav__link" to="/employer-dashboard">Employer Dashboard</Link>}
          </nav>
          <div className="auth-container">
            <Link className="app-nav__link" to="/your-jobs">Your Jobs</Link>
            <Auth />
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/jobs" element={<BrowseJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/your-jobs" element={<YourJobs />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
