import React, { useState } from 'react';

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleAuth = () => {
    setIsSignedIn(!isSignedIn); // Toggle sign-in state
  };

  return (
    <div style={styles.container}>
      {isSignedIn ? (
        <p style={styles.message}>Welcome back! 🎉</p>
      ) : (
        <button style={styles.button} onClick={handleAuth}>Sign In</button>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '30px',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff9966, #ff5e62)',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(255, 94, 98, 0.4)',
  },
  message: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default Auth;
