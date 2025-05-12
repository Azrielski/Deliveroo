import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './ServiceModal.css';

const ServiceModal = ({ isOpen, onClose, service }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="service-modal-header">
          <h2>{service.title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="service-modal-body">
          <div className="service-modal-image">
            <img src={service.image} alt={service.title} />
          </div>
          
          <div className="service-modal-description">
            <p>{service.description}</p>
          </div>
          
          <div className="service-modal-features">
            <h3>Service Features</h3>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}><FaCheckCircle className="feature-check" /> {feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="service-modal-faqs">
            <h3>Frequently Asked Questions</h3>
            <div className="accordion">
              {service.faqs.map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <h4 className="accordion-header">{faq.question}</h4>
                  <div className="accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="service-modal-footer">
          <button className="btn-primary" onClick={() => window.location.href = `/book-service/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
            Book This Service
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;