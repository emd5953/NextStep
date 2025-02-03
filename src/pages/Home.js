// File: /src/pages/Home.js
import React from 'react';
import Swipe from '../components/Swipe';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-branding">
        <h1 className="home-branding__title">NextStep</h1>
        <p className="home-branding__subtitle">Your next career move, simplified.</p>
      </div>
      <Swipe />
    </div>
  );
};

export default Home;
