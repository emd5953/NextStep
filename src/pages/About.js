// pages/About.js
import React from 'react';
import { FaBullseye, FaRocket, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>About NextStep</h1>
        <p style={styles.subtitle}>Your next career move, simplified.</p>
      </header>

      <section style={styles.section}>
        <div style={styles.iconContainer}>
          <FaBullseye style={styles.icon} />
        </div>
        <h2 style={styles.sectionTitle}>📌 Purpose</h2>
        <p style={styles.text}>
          NextStep is designed to make job searching easier and more interactive. With a <strong>swipe-based interface</strong>, users can browse jobs effortlessly and apply with just one click.
        </p>
      </section>

      <section style={styles.section}>
        <div style={styles.iconContainer}>
          <FaRocket style={styles.icon} />
        </div>
        <h2 style={styles.sectionTitle}>🚀 Key Features</h2>
        <ul style={styles.list}>
          <li>🔹 Swipe-based job browsing for an engaging experience.</li>
          <li>🔹 AI-powered <strong>personalized job recommendations</strong>.</li>
          <li>🔹 One-Click Apply for faster job applications.</li>
          <li>🔹 Application tracking to manage job searches efficiently.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <div style={styles.iconContainer}>
          <FaShieldAlt style={styles.icon} />
        </div>
        <h2 style={styles.sectionTitle}>🔒 Data Privacy & Security</h2>
        <p style={styles.text}>
          We take privacy seriously. Your data is <strong>securely stored and encrypted</strong> to ensure a safe job-hunting experience.
        </p>
      </section>

      <section style={styles.section}>
        <div style={styles.iconContainer}>
          <FaChartLine style={styles.icon} />
        </div>
        <h2 style={styles.sectionTitle}>📊 Optimized for Success</h2>
        <p style={styles.text}>
          NextStep helps users <strong>track and analyze</strong> job applications with built-in insights, so they can refine their job search strategy.
        </p>
      </section>

      <footer style={styles.footer}>
        <p>NextStep - Taking the next step in your career journey!</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    padding: '40px 20px',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '30px 20px',
    borderRadius: '10px',
    margin: '20px auto',
    maxWidth: '800px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  sectionHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  icon: {
    fontSize: '2rem',
    color: '#ff7eb3',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '0 auto',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
    maxWidth: '700px',
    margin: '0 auto',
  },
  listItem: {
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    marginTop: '50px',
    fontSize: '1rem',
    opacity: 0.8,
  },
};

export default About;
