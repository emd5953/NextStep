import React, { useState } from 'react';

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleAuth = () => {
    setIsSignedIn(!isSignedIn); // Toggle sign-in state
  };

  return (
    <div>
      {isSignedIn ? (
        <p>Welcome back! 🎉</p>
      ) : (
        <button className="authButton" onClick={handleAuth}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Auth;
