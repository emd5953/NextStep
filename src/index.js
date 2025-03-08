// File: /src/index.js
<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css'; // Global styles
import { TokenProvider } from './components/TokenContext';
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; // Global styles
import { TokenProvider } from "./components/TokenContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<<<<<<< HEAD
  <TokenProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TokenProvider>
=======
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <TokenProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TokenProvider>
  </GoogleOAuthProvider>
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
);
