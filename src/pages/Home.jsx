import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Hero />
      <Services />
      <About />
      <Features />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default Home;