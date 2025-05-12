import React from 'react';
import { FaTrophy, FaTruck, FaUsers } from 'react-icons/fa';
import './About.css';

function About() {
  const stats = [
    {
      icon: <FaTruck />,
      value: "15,000+",
      label: "Deliveries Monthly"
    },
    {
      icon: <FaUsers />,
      value: "5,000+",
      label: "Happy Customers"
    },
    {
      icon: <FaTrophy />,
      value: "99.8%",
      label: "On-Time Delivery"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img src="/images.jpeg" alt="About Deliveroo" />
          </div>
          
          <div className="about-text">
            <div className="section-header">
              <h2>About Deliveroo</h2>
              <p>Transforming package delivery across Kenya</p>
            </div>
            
            <p>
              Founded in 2018, Deliveroo has rapidly established itself as Kenya's most reliable delivery 
              service provider. We combine technology with exceptional customer service to ensure your 
              packages arrive safely and on time, every time.
            </p>
            
            <p>
              Our mission is to revolutionize the delivery industry in Kenya by providing accessible, 
              affordable, and efficient logistics solutions for businesses and individuals alike. With a 
              fleet of over 200 vehicles and 500 delivery professionals, we cover the entire country with 
              a special focus on same-day delivery services in major urban centers.
            </p>
            
            <div className="stats-container">
              {stats.map((stat, index) => (
                <div key={index} className="stat-box">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;