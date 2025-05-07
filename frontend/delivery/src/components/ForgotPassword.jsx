import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.fp-form-card').classList.add('fp-form-card-enter');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSubmitting(true);
      setTimeout(() => {
        setMessage('If an account exists for this email, you will receive a password reset link.');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="fp-auth-container">
      <div className="fp-form-wrapper">
        <div className="fp-logo-container" onClick={() => navigate('/')}>
          <h3 className="fp-logo">Deliveroo</h3>
        </div>
        <div className="fp-form-card">
          <h2 className="fp-form-title">Reset Password</h2>
          <p className="fp-form-description">Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="fp-input-container">
              <label htmlFor="email" className="fp-label">Email</label>
              <div className="fp-input-field-wrapper">
                <svg className="fp-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`fp-input-field with-icon ${errors.email ? 'fp-input-error' : ''}`}
                  required
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && <p id="email-error" className="fp-error-message">{errors.email}</p>}
            </div>
            <button type="submit" className="fp-submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          {message && (
            <div className="fp-message">
              <svg className="fp-message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {message}
            </div>
          )}
          <p className="fp-back-to-login">
            <Link to="/auth" className="fp-link">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

