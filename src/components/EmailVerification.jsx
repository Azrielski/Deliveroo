import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from './authService';
import './AuthForm.css'; // Reusing existing styles

function EmailVerification() {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const verifyEmail = async () => {
    try {
      // Extract token from URL query parameters
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (!token) {
        setVerificationStatus('failed');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      console.log("Attempting to verify email with token:", token);
      
      // Call the verifyEmail method from authService
      const response = await authService.verifyEmail(token);
      
      // Check if verification was successful
      if (response.success) {
        setVerificationStatus('success');
        setMessage(response.data.message || 'Email successfully verified! You can now log in.');
      } else {
        setVerificationStatus('failed');
        setMessage(response.data.message || 'Email verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('failed');
      setMessage('An unexpected error occurred during verification. Please try again later.');
    }
  };

  verifyEmail();
}, [location.search]);

  const goToHome = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/auth');
  };

  const requestNewVerification = () => {
    navigate('/resend-verification');
  };

  const queryParams = new URLSearchParams(location.search);
const token = queryParams.get('token');

console.log("Verification Token:", token);  

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="logo-container" onClick={goToHome}>
          <h3 className="logo">Deliveroo</h3>
        </div>
        <div className="form-card">
          <div className="form-content">
            <div className="verification-status">
              {verificationStatus === 'verifying' && (
                <>
                  <div className="spinner"></div>
                  <h2>Verifying your email...</h2>
                  <p>Please wait while we verify your email address.</p>
                </>
              )}
              
              {verificationStatus === 'success' && (
                <>
                  <div className="success-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h2>Email Verified!</h2>
                  <p>{message}</p>
                  <button onClick={goToLogin} className="submit-button">
                    Log in to your account
                  </button>
                </>
              )}
              
              {verificationStatus === 'failed' && (
                <>
                  <div className="error-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h2>Verification Failed</h2>
                  <p>{message}</p>
                  <button onClick={requestNewVerification} className="submit-button">
                    Request new verification link
                  </button>
                  <button onClick={goToLogin} className="secondary-button">
                    Back to login
                  </button>
                </>
              )}
            </div>
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

export default EmailVerification;