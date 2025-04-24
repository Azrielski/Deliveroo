import React from 'react';
import './services.css'; // Import the CSS file
import deliveryIllustration from '../assets/undraw_deliveries_2m9t.png'; // Adjust the path as needed

// Functional component for the Services section
function Services() {
  return (
    // Main container for the services section
    <div className="services-container">
      {/* Left column for the image */}
      <div className="image-column">
        {/* Placeholder image - replace with your actual image path or component */}
        <img
          src= {deliveryIllustration} // Placeholder image URL
          alt="Delivery illustration"
          className="service-image"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/EFEFEF/AAAAAA?text=Image+Not+Found'; }} // Fallback placeholder
        />
      </div>

      {/* Right column for the text content and stats */}
      <div className="content-column">
        {/* Headline text */}
        <h2 className="headline">
          Discover why thousands of small businesses choose Pickup Mtaani to grow their online business.
        </h2>

        {/* Grid container for the statistics */}
        <div className="stats-grid">
          {/* Individual statistic item */}
          <div className="stat-item">
            <div className="stat-number">25K+</div>
            <div className="stat-label">Small Businesses Reserved</div>
          </div>
          {/* Individual statistic item */}
          <div className="stat-item">
            <div className="stat-number">100K+</div>
            <div className="stat-label">Online Shoppers Served</div>
          </div>
          {/* Individual statistic item */}
          <div className="stat-item">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Packages</div>
          </div>
          {/* Individual statistic item */}
          <div className="stat-item">
            <div className="stat-number">500M+</div>
            <div className="stat-label">Gross Merchandise Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services; // Export the component for use in other parts of the app
