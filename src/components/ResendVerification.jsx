import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authService';
import './AuthForm.css'; // Reusing existing styles

function ResendVerification() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await authService.resendVerification(email);
      
      if (response.success) {
        setIsSuccess(true);
        setMessage(response.data.message || 'Verification email has been sent. Please check your inbox.');
      } else {
        setError(response.data.message || 'Failed to send verification email. Please try again.');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="logo-container" onClick={goToHome}>
          <h3 className="logo">Deliveroo</h3>
        </div>
        <div className="form-card">
          <div className="form-content">
            <h2 className="form-title">Resend Verification Email</h2>
            
            {isSuccess ? (
              <div className="success-message">
                <div className="success-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p>{message}</p>
                <button onClick={goToLogin} className="submit-button">
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="form-description">
                  Enter your email address and we'll send you a new verification link.
                </p>
                
                {error && <div className="api-error-message">{error}</div>}
                
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
                      className="input-field with-icon"
                      required
                    />
                  </div>
                </div>
                
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Verification Link'}
                </button>
                
                <p className="form-links">
                  <span className="link" onClick={goToLogin}>Back to login</span>
                </p>
              </form>
            )}
          </div>
        </div>
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

export default ResendVerification;