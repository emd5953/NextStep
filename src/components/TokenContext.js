// File: /src/TokenContext.js
import React, { createContext, useState } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  console.log("Token init!!");
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
