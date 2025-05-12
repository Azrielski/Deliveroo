import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="privacy-container">
        <div className="privacy-content">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-updated">Last Updated: May 1, 2025</p>
          
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile applications, and services (collectively, the "Services").</p>
            <p>Please read this Privacy Policy carefully. By using our Services, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.</p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Data</h3>
            <p>We may collect several types of personal data from and about users of our Services, including:</p>
            <ul className="privacy-list">
              <li><strong>Identity Data:</strong> First name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
              <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products and services you have purchased from us.</li>
              <li><strong>Technical Data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our Services.</li>
              <li><strong>Profile Data:</strong> Your username and password, purchases or orders made by you, your preferences, feedback, and survey responses.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
              <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
            </ul>
            
            {/* Additional privacy content would continue here */}
          </section>

          <div className="privacy-footer">
            <Link to="/terms" className="privacy-link">View our Terms of Service</Link>
            <Link to="/" className="privacy-link">Return to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
