import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from './authService';
import './AuthForm.css';
import deliverooLogo from "../assets/deliveroo_logo.png"; 

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added for success messages
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (isLogin) {
      if (!email) newErrors.email = 'Email is required';
      if (!password) newErrors.password = 'Password is required';
    } else {
      if (!firstName) newErrors.firstName = 'First name is required';
      if (!lastName) newErrors.lastName = 'Last name is required';
      if (!username) newErrors.username = 'Username is required';
      if (!email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setApiError('');
    setSuccessMessage(''); // Clear any previous success messages
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Login request
        const loginData = { email, password };
        const response = await authService.login(loginData);
        
        if (response.success) {
          // Redirect to dashboard or home page after successful login
          navigate('/Dashboard');
        } else {
          setApiError(response.data.message || 'Login failed. Please try again.');
        }
      } else {
        // Registration request
        const registerData = {
          first_name: firstName,
          second_name: lastName,
          username,
          email,
          password,
          confirm_password: confirmPassword
        };
        
        const response = await authService.register(registerData);
        
        if (response.success) {
          // Show success message and switch to login form
          setSuccessMessage(response.data.message || 'Registration successful! Please verify your email to complete your account setup.');
          
          // Clear the form fields
          setFirstName('');
          setLastName('');
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          
          // Switch to login form after a delay
          setTimeout(() => {
            setIsLogin(true);
          }, 3000); // Switch to login after 3 seconds
        } else {
          setApiError(response.data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setApiError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="logo-container" onClick={goToHome}>
          <img src={deliverooLogo} alt="Deliveroo Logo" className="logo-image" />
        </div>
        <div className="form-card">
          <div className="tabs">
            <button
              className={`tab-button ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setSuccessMessage(''); // Clear any success message when switching tabs
                setApiError(''); // Clear any error message when switching tabs
              }}
            >
              Log in
            </button>
            <button
              className={`tab-button ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setSuccessMessage(''); // Clear any success message when switching tabs
                setApiError(''); // Clear any error message when switching tabs
              }}
            >
              Sign up
            </button>
          </div>
          <div className="form-content">
            {apiError && (
              <div className="error-notification">
                <svg className="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{apiError}</span>
              </div>
            )}
            
            {successMessage && (
              <div className="success-notification">
                <svg className="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{successMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <h2 className="form-title">
                  {isLogin ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="form-description">
                  {isLogin
                    ? 'Log in to manage all your deliveries'
                    : 'Sign up to order deliveries from the best vendors'}
                </p>
                {!isLogin && (
                  <>
                    <div className="name-row">
                      <div className="input-container half-width">
                        <label htmlFor="firstName" className="label">
                          First Name
                        </label>
                        <div className="input-field-wrapper">
                          <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className={`input-field with-icon ${errors.firstName ? 'input-error' : ''}`}
                            required
                            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                          />
                        </div>
                        {errors.firstName && <p id="firstName-error" className="error-message">{errors.firstName}</p>}
                      </div>
                      <div className="input-container half-width">
                        <label htmlFor="lastName" className="label">
                          Last Name
                        </label>
                        <div className="input-field-wrapper">
                          <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className={`input-field with-icon ${errors.lastName ? 'input-error' : ''}`}
                            required
                            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                          />
                        </div>
                        {errors.lastName && <p id="lastName-error" className="error-message">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div className="input-container">
                      <label htmlFor="username" className="label">
                        Username
                      </label>
                      <div className="input-field-wrapper">
                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Choose a username"
                          className={`input-field with-icon ${errors.username ? 'input-error' : ''}`}
                          required
                          aria-describedby={errors.username ? 'username-error' : undefined}
                        />
                      </div>
                      {errors.username && <p id="username-error" className="error-message">{errors.username}</p>}
                    </div>
                  </>
                )}
                <div className="input-container">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="input-field-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`input-field with-icon ${errors.email ? 'input-error' : ''}`}
                      required
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
                </div>
                <div className="input-container">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="input-field-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? "Your password" : "Create a password"}
                      className={`input-field with-icon ${errors.password ? 'input-error' : ''}`}
                      required
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                        </svg>
                      ) : (
                        <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p id="password-error" className="error-message">{errors.password}</p>}
                </div>
                {!isLogin && (
                  <div className="input-container">
                    <label htmlFor="confirmPassword" className="label">
                      Confirm Password
                    </label>
                    <div className="input-field-wrapper">
                      <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className={`input-field with-icon ${errors.confirmPassword ? 'input-error' : ''}`}
                        required
                        aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                      />
                      <button 
                        type="button" 
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                          </svg>
                        ) : (
                          <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p id="confirmPassword-error" className="error-message">{errors.confirmPassword}</p>}
                  </div>
                )}
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    isLogin ? 'Log in' : 'Create account'
                  )}
                </button>
                {isLogin && (
                  <p className="forgot-password">
                    <Link to="/forgot-password" className="link">
                      Forgot your password?
                    </Link>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        <p className="terms">
          By {isLogin ? 'logging in' : 'signing up'}, you agree to our{' '}
          <Link to="/terms" className="link">Terms of Service</Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="link">Privacy Policy</Link>.
        </p>

        <div className="home-link">
          <button onClick={goToHome} className="back-to-home">
            <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;