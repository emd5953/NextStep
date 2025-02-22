// File: /src/TokenContext.js
import React, { createContext, useState } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  console.log("Token init!!");
  const [token, setToken] = useState(null);
  const [employerFlag, setEmployerFlag] = useState(false); 

  return (
    <TokenContext.Provider value={{ token, setToken, employerFlag, setEmployerFlag }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
