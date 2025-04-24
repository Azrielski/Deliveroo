import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Search from './Search';
import Footer from './Footer';
import ServiceCategories from './ServiceCategories'; // Added this import
import PartnerSection from './PartnerSection'; // Added this import

const FrontPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <ServiceCategories />
        <PartnerSection />
      </div>
      <Footer />
    </div>
  );
};

export default FrontPage;