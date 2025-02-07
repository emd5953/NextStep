// File: /src/pages/Login.js
import React, { useState, useEffect, useContext } from 'react';
import '../styles/Login.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../components/TokenContext';


const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  //const [authToken, setAuthToken] = useState('')
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      setToken(token)
      navigate('/profile'); //{ state: { token: token } }
    }
  }, [token, navigate, setToken]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { loginEmail, loginPassword });
    try {
      const signinData = {
        email: loginEmail,
        password: loginPassword
      };
      
      const response = await axios.post('http://localhost:4000/signin', signinData);
      setToken(response.data.token);
      //setAuthToken(response.data.token);
      // You can handle the response data as needed
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check the console for more details.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const signupData ={
      full_name: signupName,
      phone: signupPhone,
      email: signupEmail,
      password: signupPassword,
    };

    try{
      await axios.post('http://localhost:4000/signup', signupData);
      // You can handle the response data as needed
      navigate('/login');
  
    }catch(error){
      console.error('Signup error:', error);
      alert('Error. Please check the console for more details.');
    }

  };

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="container-fluid">
          <div className="row no-gutters full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="login-section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="login-checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="login-card-3d-wrap mx-auto">
                  <div className="login-card-3d-wrapper">
                    {/* Card Front – Login */}
                    <div className="login-card-front">
                      <div className="login-center-wrap">
                        <div className="login-section-content text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="login-form-group">
                              <input
                                type="email"
                                className="login-form-input"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                              />
                              <i className="login-form-icon uil uil-at"></i>
                            </div>
                            <div className="login-form-group mt-2">
                              <input
                                type="password"
                                className="login-form-input"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                              />
                              <i className="login-form-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="login-btn mt-4">Login</button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            <a href="https://www.web-leb.com/code" className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Card Back – Sign Up */}
                    <div className="login-card-back">
                      <div className="login-center-wrap">
                        <div className="login-section-content text-center">
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <form onSubmit={handleSignupSubmit}>
                            <div className="login-form-group">
                              <input
                                type="text"
                                className="login-form-input"
                                placeholder="Full Name"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                                required
                              />
                              <i className="login-form-icon uil uil-user"></i>
                            </div>
                            <div className="login-form-group mt-2">
                              <input
                                type="tel"
                                className="login-form-input"
                                placeholder="Phone Number"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                                required
                              />
                              <i className="login-form-icon uil uil-phone"></i>
                            </div>
                            <div className="login-form-group mt-2">
                              <input
                                type="email"
                                className="login-form-input"
                                placeholder="Email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                required
                              />
                              <i className="login-form-icon uil uil-at"></i>
                            </div>
                            <div className="login-form-group mt-2">
                              <input
                                type="password"
                                className="login-form-input"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                required
                              />
                              <i className="login-form-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="login-btn mt-4">Register</button>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* End of login-card-3d-wrapper */}
                  </div>
                </div>
                {/* End of login-card-3d-wrap */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
