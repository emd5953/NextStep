import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { loginEmail, loginPassword });
    alert('Login button clicked! (Check console)');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Registering with:', {
      signupName,
      signupPhone,
      signupEmail,
      signupPassword,
    });
    alert('Register button clicked! (Check console)');
  };

  return (
    <div className="login-page">
      <div className="section">
        <div className="container-fluid">
          <div className="row no-gutters full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* Card Front – Login */}
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-style"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">Login</button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            <a href="https://www.web-leb.com/code" className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Card Back – Sign Up */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <form onSubmit={handleSignupSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-style"
                                placeholder="Full Name"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="tel"
                                className="form-style"
                                placeholder="Phone Number"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-phone"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                className="form-style"
                                placeholder="Email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">Register</button>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* End card-3d-wrapper */}
                  </div>
                </div>
                {/* End card-3d-wrap */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
