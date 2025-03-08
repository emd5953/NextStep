// File: /src/TokenContext.js
<<<<<<< HEAD
import React, { createContext, useState } from 'react';
=======
import React, { createContext, useState, useEffect } from "react";
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  console.log("Token init!!");
<<<<<<< HEAD
  const [token, setToken] = useState(null);
  const [employerFlag, setEmployerFlag] = useState(false); 

  return (
    <TokenContext.Provider value={{ token, setToken, employerFlag, setEmployerFlag }}>
=======
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [employerFlag, setEmployerFlag] = useState(
    () => localStorage.getItem("employerFlag") === "true"
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("employerFlag", employerFlag);
  }, [employerFlag]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, employerFlag, setEmployerFlag }}
    >
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
