import React from 'react';
import './Footer.css';
import { FaTruck, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="logo">Deliveroo</h3>
          <p className="footer-text">
            Fast, reliable parcel delivery services with real-time tracking and instant quotes.
            Delivering your packages with care and precision.
          </p>
          <div className="contact">
            <span className="contact-item">
              <FaPhone className="footer-icon" /> +254 712 345 678
            </span>
            <span className="contact-item">
              <FaEnvelope className="footer-icon" /> info@Deliveroo.com
            </span>
            <span className="contact-item">
              <FaClock className="footer-icon" /> Mon-Fri: 8AM - 6PM
            </span>
          </div>
          <div className="socials">
            <a href="#"><FaFacebook className="social-icon" /></a>
            <a href="#"><FaTwitter className="social-icon" /></a>
            <a href="#"><FaInstagram className="social-icon" /></a>
            <a href="#"><FaLinkedin className="social-icon" /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Create Delivery</a></li>
            <li><a href="#">Track Parcel</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section services">
          <h3 className="footer-title">Our Services</h3>
          <ul className="footer-list">
            <li><FaTruck className="service-icon" /> Same Day Delivery</li>
            <li><FaTruck className="service-icon" /> Next Day Delivery</li>
            <li><FaTruck className="service-icon" /> International Shipping</li>
            <li><FaTruck className="service-icon" /> Bulk Deliveries</li>
            <li><FaTruck className="service-icon" /> Temperature Controlled</li>
          </ul>
        </div>

        <div className="footer-section location">
          <h3 className="footer-title">Our Location</h3>
          <div className="map-container">
            <FaMapMarkerAlt className="map-icon" />
            <p>123 Delivery Street, Nairobi, Kenya</p>
          </div>
          <div className="newsletter">
            <h4>Subscribe to Newsletter</h4>
            <form>
              <input type="email" placeholder="Your Email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SendIT. All Rights Reserved. | <a href="#">Terms</a> | <a href="#">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;