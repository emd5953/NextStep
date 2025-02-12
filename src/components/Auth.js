  // File: /src/components/Auth.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Redirect to /login
    navigate('/login');
  };

  return (
    <div>
      <button className="auth__button" onClick={handleSignInClick}>
        Sign In
      </button>
    </div>
  );
};

export default Auth;
