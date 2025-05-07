import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      setMessage('If an account exists for this email, you will receive a password reset link.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="logo-container" onClick={() => navigate('/')}>
          <h3 className="logo">Deliveroo</h3>
        </div>
        <div className="form-card" id='form-container'>
          <h2 className="form-title">Reset Password</h2>
          <p className="form-description">Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit}>
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
                  required
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
            </div>
            <button type="submit" className="submit-button">Send Reset Link</button>
          </form>
          {message && <p className="message">{message}</p>}
          <p className="back-to-login">
            <Link to="/auth" className="link">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;