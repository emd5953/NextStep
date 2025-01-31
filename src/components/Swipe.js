import React, { useState } from 'react';
import '../styles/Swipe.css';

// Array of sample jobs. You can fetch from an API or store more data here.
const jobs = [
  {
    title: 'Software Developer',
    company: 'Cool Company Inc.',
    location: 'San Francisco, CA',
    desc: 'Swipe left to pass, or swipe right to apply!',
  },
  {
    title: 'Frontend Engineer',
    company: 'Awesome Startup',
    location: 'New York, NY',
    desc: 'Build amazing UIs with React & Redux!',
  },
  {
    title: 'Backend Engineer',
    company: 'Tech Giants LLC',
    location: 'Austin, TX',
    desc: 'Work with Node.js, Express, and scalable infrastructure.',
  },
  {
    title: 'Mobile Developer',
    company: 'App Creators',
    location: 'Remote',
    desc: 'Join our team to develop cutting-edge mobile apps.',
  },
  {
    title: 'Data Scientist',
    company: 'Data Wizards',
    location: 'Boston, MA',
    desc: 'Analyze data, build models, and discover insights!',
  },
];

// A simple single-card “infinite” swiping component
const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Which job we’re on
  const [isSwiping, setIsSwiping] = useState(false); 
  const [startX, setStartX] = useState(0); 
  const [currentX, setCurrentX] = useState(0);

  // The currently visible job object
  const job = jobs[currentIndex];

  // Touch handlers (mobile)
  const handleTouchStart = (e) => {
    setIsSwiping(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const touchX = e.touches[0].clientX;
    setCurrentX(touchX - startX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse handlers (desktop)
  const handleMouseDown = (e) => {
    setIsSwiping(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isSwiping) return;
    setCurrentX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleEnd = () => {
    setIsSwiping(false);

    // If swiped far enough left or right, load next job
    if (Math.abs(currentX) > 100) {
      // Reset the position
      setCurrentX(0);
      // Move to next job in an infinite loop
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
    } else {
      // Snap back if not far enough
      setCurrentX(0);
    }
  };

  return (
    <div
      className="swipeContainer"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} /* if they drag off the card area */
    >
      {/* The main job card */}
      <div
        className="jobCard"
        style={{
          transform: `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <h2>{job.title}</h2>
        <p>{job.company}</p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>{job.desc}</p>
      </div>
    </div>
  );
};

export default Swipe;
