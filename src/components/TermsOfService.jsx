import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './TermsOfService.css';

function TermsOfService() {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="terms-container">
        <div className="terms-content">
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-updated">Last Updated: May 1, 2025</p>
          
          <section className="terms-section">
            <h2>1. Introduction</h2>
            <p>Welcome to our delivery service platform. These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services") operated by our company ("we," "us," or "our"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.</p>
          </section>

          <section className="terms-section">
            <h2>2. Definitions</h2>
            <ul className="terms-list">
              <li><strong>"Account"</strong> refers to the account created by you to access and use our Services.</li>
              <li><strong>"Content"</strong> means any information, text, graphics, photos, or other materials uploaded, downloaded, or appearing on our Services.</li>
              <li><strong>"User"</strong> refers to any individual who accesses or uses our Services.</li>
              <li><strong>"Delivery"</strong> refers to the transportation of packages, documents, or other items from one location to another.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Account Registration</h2>
            <h3>3.1 Account Creation</h3>
            <p>To use certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            
            <h3>3.2 Account Responsibility</h3>
            <p>You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            
            <h3>3.3 Age Restriction</h3>
            <p>You must be at least 18 years old to create an account. By creating an account, you represent and warrant that you are at least 18 years old.</p>
          </section>

          {/* Additional sections would continue here */}
          
          <section className="terms-section">
            <h2>15. Contact Information</h2>
            <p>Questions about the Terms should be sent to:</p>
            <p><strong>Email:</strong> support@yourdeliveryservice.com<br />
            <strong>Address:</strong> [Your Company Address]<br />
            <strong>Phone:</strong> [Your Company Phone Number]</p>
          </section>
          
          <div className="terms-footer">
            <Link to="/privacy-policy" className="terms-link">View our Privacy Policy</Link>
            <Link to="/" className="terms-link">Return to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsOfService;
