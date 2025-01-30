// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Auth from './components/Auth';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>NextStep</h1>
          <p style={styles.subtitle}>Your next career move starts here.</p>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
          </nav>
        </header>
        <main style={styles.main}>
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
  <button style={styles.button}>Browse Jobs</button>
);

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.8,
  },
  nav: {
    marginTop: '10px',
  },
  navLink: {
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  navLinkHover: {
    color: '#ff7eb3',
  },
  main: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(255, 118, 136, 0.4)',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(255, 118, 136, 0.6)',
  },
};

export default App;
