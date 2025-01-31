// pages/Home.js
import React from 'react';
import Swipe from '../components/Swipe';
import '../styles/Home.css'; // Import Home-specific styles

const Home = () => {
  return (
    <div className="content">
      <div className="brandingCenter">
        <h1 className="title">NextStep</h1>
        <p className="subtitle">Your next career move, simplified.</p>
      </div>
      <Swipe />
    </div>
  );
};

export default Home;
