import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from './authService';
import './ResetPassword.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await authService.resetPassword({ token, password, confirm_password });

      setMessage(response.data.message);
      setIsSuccess(response.success);

      if (response.success) {
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage("An unexpected error occurred. Please try again later.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        {/* 🚀 Deliveroo Logo */}
        <div className="logo-container" onClick={() => navigate('/')}>
          <h3 className="logo">Deliveroo</h3>
        </div>

        <div className="form-card">
          <div className="form-content">
            <h2 className="form-title">Reset Your Password</h2>

            {message && (
              <div className={`message ${isSuccess ? "success-message" : "error-message"}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="password" className="label">New Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter new password"
                  required 
                  className="input-field"
                />
              </div>

              <div className="input-container">
                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm_password" 
                  value={confirm_password} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm new password"
                  required 
                  className="input-field"
                />
              </div>

              <button type="submit" className="submit-button">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
