import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from './authService';
import './AuthForm.css';
import deliverooLogo from "../assets/deliveroo_logo.png"; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
    setIsLoading(true);
    setMessage('');

    try {
      const response = await authService.requestPasswordReset({ email });

      setIsSuccess(response.success);
      setMessage(response.data.message);

      // Clear email field on success
      if (response.success) {
        setEmail('');
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      setIsSuccess(false);
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="logo-container" onClick={() => navigate('/')}>
           <img src={deliverooLogo} alt="Deliveroo Logo" className="logo-image" />
        </div>
        <div className="form-card">
          <div className="form-content">
            {message && (
              <div className={`message ${isSuccess ? 'success-message' : 'error-message'}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <h2 className="form-title">Forgot Password</h2>
                <p className="form-description">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="input-container">
                  <label htmlFor="email" className="label">Email</label>
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
                    />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
            <div className="form-footer">
              <p>
                <Link to="/auth" className="link">Back to Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
