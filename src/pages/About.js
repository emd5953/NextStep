import React from 'react';
import { FaBullseye, FaRocket, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="header">
        <h1 className="title">About NextStep</h1>
        <p className="subtitle">Your next career move, simplified.</p>
      </header>

      <section className="section">
        <div className="iconContainer">
          <FaBullseye className="icon" />
        </div>
        <h2 className="sectionTitle">📌 Purpose</h2>
        <p className="text">
          NextStep is designed to make job searching easier and more interactive. With a <strong>swipe-based interface</strong>, users can browse jobs effortlessly and apply with just one click.
        </p>
      </section>

      <section className="section">
        <div className="iconContainer">
          <FaRocket className="icon" />
        </div>
        <h2 className="sectionTitle">🚀 Key Features</h2>
        <ul className="list">
          <li>🔹 Swipe-based job browsing for an engaging experience.</li>
          <li>🔹 AI-powered <strong>personalized job recommendations</strong>.</li>
          <li>🔹 One-Click Apply for faster job applications.</li>
          <li>🔹 Application tracking to manage job searches efficiently.</li>
        </ul>
      </section>

      <section className="section">
        <div className="iconContainer">
          <FaShieldAlt className="icon" />
        </div>
        <h2 className="sectionTitle">🔒 Data Privacy & Security</h2>
        <p className="text">
          We take privacy seriously. Your data is <strong>securely stored and encrypted</strong> to ensure a safe job-hunting experience.
        </p>
      </section>

      <section className="section">
        <div className="iconContainer">
          <FaChartLine className="icon" />
        </div>
        <h2 className="sectionTitle">📊 Optimized for Success</h2>
        <p className="text">
          NextStep helps users <strong>track and analyze</strong> job applications with built-in insights, so they can refine their job search strategy.
        </p>
      </section>

      <footer className="footer">
        <p>NextStep - Taking the next step in your career journey!</p>
      </footer>
    </div>
  );
};

export default About;
