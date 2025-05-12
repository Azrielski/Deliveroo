import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import ServiceModal from './ServiceModal';
import './Footer.css';

const Footer = () => {
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Services data with details
  const services = [
    { 
      icon: <FaTruck />, 
      name: "Same Day Delivery", 
      path: "/services/same-day-delivery",
      description: "Get your packages delivered on the same day with our premium same-day delivery service.",
      image: "/images/same-day-delivery.jpg",
      features: [
        'Delivery within 6 hours',
        'Real-time tracking',
        'SMS notifications',
        'Signature confirmation',
        'Insurance coverage'
      ],
      faqs: [
        {
          question: "What time do I need to book for same-day delivery?",
          answer: "Orders must be placed before 10:00 AM for same-day delivery service."
        },
        {
          question: "What is the maximum package weight for same-day delivery?",
          answer: "Packages up to 10kg can be delivered through our same-day service."
        }
      ]
    },
    { 
      icon: <FaTruck />, 
      name: "Next Day Delivery", 
      path: "/services/next-day-delivery",
      description: "Have your packages delivered by the next business day with our reliable next-day delivery service.",
      image: "/images/next-day-delivery.jpg",
      features: [
        'Guaranteed delivery by next business day',
        'Lower cost than same-day delivery',
        'Real-time tracking',
        'SMS notifications',
        'Signature confirmation option'
      ],
      faqs: [
        {
          question: "What is the cut-off time for next-day delivery?",
          answer: "Orders must be placed before 5:00 PM for next-day delivery service."
        },
        {
          question: "Does next-day delivery work on weekends?",
          answer: "Next-day delivery is available Monday through Friday. Orders placed on Friday will be delivered on Monday."
        }
      ]
    },
    { 
      icon: <FaTruck />, 
      name: "International Shipping", 
      path: "/services/international-shipping",
      description: "Send your packages worldwide with our comprehensive international shipping solutions.",
      image: "/images/international-shipping.jpg",
      features: [
        'Delivery to over 200 countries',
        'Customs documentation assistance',
        'Package insurance',
        'Express and standard options',
        'Competitive international rates'
      ],
      faqs: [
        {
          question: "How long does international shipping take?",
          answer: "Delivery times vary depending on the destination country, typically ranging from 3-14 business days."
        },
        {
          question: "Do I need to handle customs paperwork?",
          answer: "We provide customs documentation assistance, but you will need to provide accurate item descriptions and values."
        }
      ]
    },
    { 
      icon: <FaTruck />, 
      name: "Bulk Deliveries", 
      path: "/services/bulk-deliveries",
      description: "Efficient handling and delivery of large volume shipments for businesses and organizations.",
      image: "/images/bulk-deliveries.jpg",
      features: [
        'Volume discounts',
        'Dedicated account manager',
        'Customized delivery schedules',
        'Warehousing solutions',
        'Integration with your business systems'
      ],
      faqs: [
        {
          question: "What qualifies as a bulk delivery?",
          answer: "Our bulk delivery service is designed for shipments of 50+ packages or palletized goods."
        },
        {
          question: "Can I schedule regular bulk deliveries?",
          answer: "Yes, we offer scheduled delivery options daily, weekly, or monthly based on your business needs."
        }
      ]
    },
    { 
      icon: <FaTruck />, 
      name: "Temperature Controlled", 
      path: "/services/temperature-controlled",
      description: "Specialized delivery services for items requiring specific temperature conditions during transit.",
      image: "/images/temperature-controlled.jpg",
      features: [
        'Refrigerated vehicles',
        'Temperature monitoring during transit',
        'Suitable for food, pharmaceuticals, and sensitive goods',
        'Temperature validation reports',
        'Specialized handling protocols'
      ],
      faqs: [
        {
          question: "What temperature ranges can you maintain?",
          answer: "We offer frozen (-18°C to -25°C), chilled (2°C to 8°C), and ambient (15°C to 25°C) temperature control options."
        },
        {
          question: "How do you ensure temperature compliance?",
          answer: "Our vehicles are equipped with temperature monitoring systems that record conditions throughout the journey."
        }
      ]
    }
  ];

  // Newsletter form handling
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail('');
      // Here you would typically make an API call to your backend
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Handle service click
  const handleServiceClick = (service, e) => {
    e.preventDefault();
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="logo">Deliveroo</h3>
            <p className="footer-text">
              Fast, reliable parcel delivery services with real-time tracking and instant quotes.
              Delivering your packages with care and precision.
            </p>
            <div className="contact">
              <a href="tel:+254712345678" className="contact-item">
                <FaPhone className="footer-icon" /> +254 712 345 678
              </a>
              <a href="mailto:info@Deliveroo.com" className="contact-item">
                <FaEnvelope className="footer-icon" /> info@Deliveroo.com
              </a>
              <span className="contact-item">
                <FaClock className="footer-icon" /> Mon-Fri: 8AM - 6PM
              </span>
            </div>
            <div className="socials">
              <a href="https://facebook.com/deliveroo_delivery" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="social-icon" />
              </a>
              <a href="https://x.com/Deliveroo_Deliv" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://www.instagram.com/deliveroo_devliv/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/deliveroo-delivers-853127363/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create-delivery">Create Delivery</Link></li>
              <li><Link to="/track-parcel">Track Parcel</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-section services">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-list service-links">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.path} 
                    className="service-link"
                    onClick={(e) => handleServiceClick(service, e)}
                  >
                    {service.icon} {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section newsletter">
            <h3 className="footer-title">Newsletter</h3>
            <p className="footer-text">
              Subscribe to our newsletter for updates on our services and promotions.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  <FaArrowRight />
                </button>
              </div>
              {subscribed && (
                <p className="success-message">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p className="copyright">
                &copy; {new Date().getFullYear()} Deliveroo. All rights reserved.
              </p>
              <div className="footer-links">
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Service Modal */}
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        service={selectedService}
      />
    </>
  );
};

export default Footer;