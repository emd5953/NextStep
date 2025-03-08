// File: /src/App.js
<<<<<<< HEAD
import React, { useContext } from 'react';
=======
import React, { useContext, useState, useEffect } from 'react';
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
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
<<<<<<< HEAD

function App() {
  const { token, employerFlag } = useContext(TokenContext);
=======

function App() {
  const { token, employerFlag } = useContext(TokenContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Listen for window resize and update mobile flag.
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavOpen]);

>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
<<<<<<< HEAD
          <nav className="app-nav">
            <Link className="app-nav__link" to="/">Home</Link>
            <Link className="app-nav__link" to="/about">About</Link>
            <Link className="app-nav__link" to="/jobs">Jobs</Link>
            {token && <Link className="app-nav__link" to="/profile">Profile</Link>}
            {(token && employerFlag) && <Link className="app-nav__link" to="/employer-dashboard">Employer Dashboard</Link>}
          </nav>
          <div className="auth-container">
            {(token && !employerFlag)  && <Link className="app-nav__link" to="/your-jobs">Your Jobs</Link> }
            <Auth />
          </div>
        </header>

=======
          <div className="nav-container">
            {isMobile && (
              <button className="hamburger" onClick={toggleNav}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            )}
            {!isMobile && (
              <nav className="app-nav">
                <Link className="app-nav__link" to="/">Home</Link>
                <Link className="app-nav__link" to="/about">About</Link>
                <Link className="app-nav__link" to="/jobs">Jobs</Link>
                {token && <Link className="app-nav__link" to="/profile">Profile</Link>}
                {(token && employerFlag) && <Link className="app-nav__link" to="/employer-dashboard">Employer Dashboard</Link>}
              </nav>
            )}
          </div>
          {!isMobile && (
            <div className="auth-container">
              {(token && !employerFlag) && (
                <Link className="app-nav__link" to="/your-jobs">Your Jobs</Link>
              )}
              <Auth />
            </div>
          )}
        </header>

        {/* Mobile modal overlay */}
        {isMobile && isNavOpen && (
          <div className="nav-overlay">
            <div className="nav-overlay-content">
              <button className="close-btn" onClick={toggleNav}>×</button>
              <Link className="app-nav__link" to="/" onClick={toggleNav}>Home</Link>
              <Link className="app-nav__link" to="/about" onClick={toggleNav}>About</Link>
              <Link className="app-nav__link" to="/jobs" onClick={toggleNav}>Jobs</Link>
              {token && (
                <Link className="app-nav__link" to="/profile" onClick={toggleNav}>
                  Profile
                </Link>
              )}
              {(token && employerFlag) && (
                <Link className="app-nav__link" to="/employer-dashboard" onClick={toggleNav}>
                  Employer Dashboard
                </Link>
              )}
              {(token && !employerFlag) && (
                <Link className="app-nav__link" to="/your-jobs" onClick={toggleNav}>
                  Your Jobs
                </Link>
              )}
              <Auth onClick={toggleNav} />
            </div>
          </div>
        )}

>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
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
