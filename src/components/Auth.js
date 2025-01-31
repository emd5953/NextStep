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
      <button className="authButton" onClick={handleSignInClick}>
        Sign In
      </button>
    </div>
  );
};

export default Auth;
