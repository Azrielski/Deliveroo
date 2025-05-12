import React, { useState } from 'react';
import { FaTruck, FaCheck, FaQuestionCircle, FaTimes } from 'react-icons/fa';
import './ServicePage.css';

const ServicePage = ({ serviceData }) => {
  const [selectedFaq, setSelectedFaq] = useState(null);
  
  if (!serviceData) return (
    <div className="service-not-found">
      <h1>Service not found</h1>
      <p>The requested service information could not be located.</p>
    </div>
  );
  
  // Handle FAQ toggle
  const toggleFaq = (index) => {
    if (selectedFaq === index) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(index);
    }
  };

  return (
    <div className="service-page">
      <div className="service-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${serviceData.image})` }}>
        <div className="container">
          <div className="service-hero-content">
            <div className="service-icon">
              <FaTruck />
            </div>
            <h1>{serviceData.title}</h1>
            <p className="service-description">{serviceData.description}</p>
          </div>
        </div>
      </div>

      <div className="container service-content">
        <div className="row">
          <div className="col-lg-8">
            <section className="service-section">
              <h2>What to expect</h2>
              <p>Our {serviceData.title} service is designed to meet your specific delivery needs with reliability and efficiency. We prioritize your satisfaction and the safety of your items throughout the entire delivery process.</p>
              
              <div className="service-features">
                <h3>Key Features</h3>
                <div className="feature-grid">
                  {serviceData.features.map((feature, index) => (
                    <div className="feature-item" key={index}>
                      <div className="feature-icon">
                        <FaCheck />
                      </div>
                      <div className="feature-text">{feature}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="service-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {serviceData.faqs.map((faq, index) => (
                  <div className={`faq-item ${selectedFaq === index ? 'active' : ''}`} key={index}>
                    <div className="faq-question" onClick={() => toggleFaq(index)}>
                      <div className="faq-question-text">
                        <FaQuestionCircle className="faq-icon" />
                        {faq.question}
                      </div>
                      <div className="faq-toggle">
                        {selectedFaq === index ? <FaTimes /> : '+'}
                      </div>
                    </div>
                    {selectedFaq === index && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="col-lg-4">
            <div className="service-sidebar">
              <div className="cta-box">
                <h3>Ready to ship?</h3>
                <p>Book your {serviceData.title.toLowerCase()} now and enjoy our premium service.</p>
                <button className="cta-button">Book Now</button>
              </div>
              
              <div className="info-box">
                <h4>Contact Us</h4>
                <p>Have questions about our {serviceData.title.toLowerCase()} service?</p>
                <a href="tel:+254712345678" className="contact-link">+254 712 345 678</a>
                <a href="mailto:info@Deliveroo.com" className="contact-link">info@Deliveroo.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;