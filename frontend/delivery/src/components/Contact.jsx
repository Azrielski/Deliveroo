import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            placeholder="First name" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            placeholder="Last name" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="you@company.com" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="+254 712 345678" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5" 
            placeholder="Your message here..."
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;