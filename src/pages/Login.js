// File: /src/pages/Login.js
<<<<<<< HEAD
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

  const navigate = useNavigate();
  const { token, setToken, employerFlag, setEmployerFlag } = useContext(TokenContext);

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
      setEmployerFlag(response.data.isEmployer);

    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check the console for more details.');
=======
import React, { useState, useEffect, useContext } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../components/TokenContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  // Sign up form state
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupVerificationCode, setSignupVerificationCode] = useState("");
  const [showSignupVerification, setShowSignupVerification] = useState(false);

  const navigate = useNavigate();
  const { token, setToken, employerFlag, setEmployerFlag } =
    useContext(TokenContext);

  useEffect(() => {
    if (token) {
      setToken(token);
      navigate("/profile");
    }
  }, [token, navigate, setToken]);

  const handleSendVerificationCode = async (phone, isSignup = false) => {
    try {
      await axios.post("http://localhost:4000/send-verification", {
        phoneNumber: phone,
      });
      if (isSignup) {
        setShowSignupVerification(true);
      } else {
        setShowVerification(true);
      }
      alert("You will receive a phone call with your verification code!");
    } catch (error) {
      console.error("Error initiating verification call:", error);
      alert("Failed to initiate verification call. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData =
        loginMethod === "email"
          ? { email: loginEmail, password: loginPassword }
          : { phone: loginPhone, verificationCode };

      const response = await axios.post(
        "http://localhost:4000/signin",
        loginData
      );
      setToken(response.data.token);
      setEmployerFlag(response.data.isEmployer);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check the console for more details.");
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const signupData = {
      full_name: signupName,
      phone: signupPhone,
      email: signupEmail,
      password: signupPassword,
<<<<<<< HEAD
      employerFlag: employerFlag,
    };

    try {
      await axios.post('http://localhost:4000/signup', signupData);
      // You can handle the response data as needed
      navigate('/login');
      alert('Sign up successful!');

    } catch (error) {
      console.error('Signup error:', error);
      alert('Error. Please check the console for more details.');
    }

=======
      employerFlag,
      verificationCode: signupVerificationCode,
    };

    try {
      await axios.post("http://localhost:4000/signup", signupData);
      navigate("/login");
      alert("Sign up successful!");
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error.response?.data?.error ||
          "Error. Please check the console for more details."
      );
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/google", {
        token: credentialResponse.credential,
      });
      setToken(response.data.token);
      setEmployerFlag(response.data.isEmployer);
      navigate("/profile");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    alert("Google login failed. Please try again.");
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <div className="container-fluid">
          <div className="row no-gutters full-height justify-content-center">
            <div className="col-12 text-center align-self-center">
              <div className="login-section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
<<<<<<< HEAD
                <input className="login-checkbox" type="checkbox" id="reg-log" name="reg-log" />
=======
                <input
                  className="login-checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
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
<<<<<<< HEAD
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
=======
                              <label>
                                <input
                                  type="radio"
                                  value="email"
                                  checked={loginMethod === "email"}
                                  onChange={(e) =>
                                    setLoginMethod(e.target.value)
                                  }
                                />{" "}
                                Email Login
                              </label>
                              <label className="ml-3">
                                <input
                                  type="radio"
                                  value="phone"
                                  checked={loginMethod === "phone"}
                                  onChange={(e) =>
                                    setLoginMethod(e.target.value)
                                  }
                                />{" "}
                                Phone Login
                              </label>
                            </div>

                            {loginMethod === "email" ? (
                              <>
                                <div className="login-form-group">
                                  <input
                                    type="email"
                                    className="login-form-input"
                                    placeholder="Email"
                                    value={loginEmail}
                                    onChange={(e) =>
                                      setLoginEmail(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setLoginPassword(e.target.value)
                                    }
                                    required
                                  />
                                  <i className="login-form-icon uil uil-lock-alt"></i>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="login-form-group">
                                  <input
                                    type="tel"
                                    className="login-form-input"
                                    placeholder="Phone Number"
                                    value={loginPhone}
                                    onChange={(e) =>
                                      setLoginPhone(e.target.value)
                                    }
                                    required
                                  />
                                  <i className="login-form-icon uil uil-phone"></i>
                                </div>
                                {!showVerification ? (
                                  <button
                                    type="button"
                                    className="login-btn mt-4"
                                    onClick={() =>
                                      handleSendVerificationCode(loginPhone)
                                    }
                                  >
                                    Get Code via Call
                                  </button>
                                ) : (
                                  <div className="login-form-group mt-2">
                                    <input
                                      type="text"
                                      className="login-form-input"
                                      placeholder="Verification Code"
                                      value={verificationCode}
                                      onChange={(e) =>
                                        setVerificationCode(e.target.value)
                                      }
                                      required
                                    />
                                    <i className="login-form-icon uil uil-key-skeleton"></i>
                                  </div>
                                )}
                              </>
                            )}
                            <button type="submit" className="login-btn mt-4">
                              Login
                            </button>
                            <div className="mt-4">
                              <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
                    {/* Card Back – Sign Up */}
                    <div className="login-card-back">
                      <div className="login-center-wrap">
                        <div className="login-section-content text-center">
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <form onSubmit={handleSignupSubmit}>
                            <div className="login-form-group">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={employerFlag}
<<<<<<< HEAD
                                  onChange={(e) => setEmployerFlag(e.target.checked)}
                                /> Signup as an Employer
=======
                                  onChange={(e) =>
                                    setEmployerFlag(e.target.checked)
                                  }
                                />{" "}
                                Signup as an Employer
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
                              </label>
                            </div>
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
<<<<<<< HEAD
=======
                            {!showSignupVerification ? (
                              <button
                                type="button"
                                className="login-btn mt-2"
                                onClick={() =>
                                  handleSendVerificationCode(signupPhone, true)
                                }
                              >
                                Verify via Call
                              </button>
                            ) : (
                              <div className="login-form-group mt-2">
                                <input
                                  type="text"
                                  className="login-form-input"
                                  placeholder="Verification Code"
                                  value={signupVerificationCode}
                                  onChange={(e) =>
                                    setSignupVerificationCode(e.target.value)
                                  }
                                  required
                                />
                                <i className="login-form-icon uil uil-key-skeleton"></i>
                              </div>
                            )}
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
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
<<<<<<< HEAD
                                onChange={(e) => setSignupPassword(e.target.value)}
=======
                                onChange={(e) =>
                                  setSignupPassword(e.target.value)
                                }
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
                                required
                              />
                              <i className="login-form-icon uil uil-lock-alt"></i>
                            </div>
<<<<<<< HEAD
                            <button type="submit" className="login-btn mt-4">Register</button>
=======
                            <button type="submit" className="login-btn mt-4">
                              Register
                            </button>
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
                          </form>
                        </div>
                      </div>
                    </div>
<<<<<<< HEAD
                    {/* End of login-card-3d-wrapper */}
                  </div>
                </div>
                {/* End of login-card-3d-wrap */}
=======
                  </div>
                </div>
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
