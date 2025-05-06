import React, { useState, useEffect, useRef } from 'react';
import './services.css';
import deliveryIllustration from '../assets/undraw_deliveries_2m9t.png';

function Services({ id }) {
  const [animatedStats, setAnimatedStats] = useState({
    businesses: 0,
    shoppers: 0,
    packages: 0,
    merchandise: 0
  });
  
  const servicesRef = useRef(null);
  const animationStarted = useRef(false);

  // Target values for the counters (now in actual units before adding suffixes)
  const targetStats = {
    businesses: 25000,    // Will display as 25K+
    shoppers: 100000,     // Will display as 100K+
    packages: 1000000,    // Will display as 1M+
    merchandise: 500000000 // Will display as 500M+
  };

  // Format numbers with appropriate suffixes
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}M+`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K+`;
    }
    return `${num}+`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted.current) {
            const intersectionRatio = entry.intersectionRatio;
            if (intersectionRatio >= 0.7) {
              animationStarted.current = true;
              animateCounters();
            }
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimatedStats({
        businesses: Math.floor(progress * targetStats.businesses),
        shoppers: Math.floor(progress * targetStats.shoppers),
        packages: Math.floor(progress * targetStats.packages),
        merchandise: Math.floor(progress * targetStats.merchandise)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="services-container" id={id} ref={servicesRef}>
      <div className="image-column">
        <img
          src={deliveryIllustration}
          alt="Delivery illustration"
          className="service-image"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/EFEFEF/AAAAAA?text=Image+Not+Found'; }}
        />
      </div>

      <div className="content-column">
        <h2 className="headline">
          Discover why thousands of small businesses choose Deliveroo to grow their online business.
        </h2>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{formatNumber(animatedStats.businesses)}</div>
            <div className="stat-label">Small Businesses Reserved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{formatNumber(animatedStats.shoppers)}</div>
            <div className="stat-label">Online Shoppers Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{formatNumber(animatedStats.packages)}</div>
            <div className="stat-label">Packages</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{formatNumber(animatedStats.merchandise)}</div>
            <div className="stat-label">Gross Merchandise Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;