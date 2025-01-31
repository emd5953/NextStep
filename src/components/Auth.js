import React, { useState } from 'react';

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleAuth = () => {
    setIsSignedIn(!isSignedIn); // Toggle sign-in state
  };

  return (
    <div style={styles.container}>
      {isSignedIn ? (
        <p>Welcome back! 🎉</p>
      ) : (
        <button style={styles.button} onClick={handleAuth}>Sign In</button>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Auth;
