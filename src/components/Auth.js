<<<<<<< HEAD
  // File: /src/components/Auth.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from './TokenContext';

const Auth = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);

  const handleSignInClick = () => {
    // Redirect to /login
    navigate('/login');
=======
// File: /src/components/Auth.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "./TokenContext";

const Auth = () => {
  const navigate = useNavigate();
  const { token, setToken, setEmployerFlag } = useContext(TokenContext);

  const handleSignInClick = () => {
    // Redirect to /login
    navigate("/login");
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
  };

  const handleSignOutClick = () => {
    // Redirect to /login
    setToken(null);
<<<<<<< HEAD
    navigate('/login');
=======
    setEmployerFlag(false);
    localStorage.removeItem("token");
    localStorage.removeItem("employerFlag");
    navigate("/login");
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
  };

  return (
    <div>
<<<<<<< HEAD
      {
        !token &&
        <button className="auth__button" onClick={handleSignInClick}>
          Sign In
        </button>
      }
      {
        token &&
        <button className="auth__button" onClick={handleSignOutClick}>
          Sign Out
        </button>
      }
=======
      {!token && (
        <button className="auth__button" onClick={handleSignInClick}>
          Sign In
        </button>
      )}
      {token && (
        <button className="auth__button" onClick={handleSignOutClick}>
          Sign Out
        </button>
      )}
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
    </div>
  );
};

export default Auth;
