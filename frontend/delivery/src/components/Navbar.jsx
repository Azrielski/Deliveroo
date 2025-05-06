import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/auth');
    };

    const handleAboutUsClick = (e) => {
        e.preventDefault();
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close the mobile menu after clicking
        }
    };

    const handleContactUsClick = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close the mobile menu after clicking
        }
    };

    const handleLogoClick=(e)=>{
        e.preventDefault();
        console.log("Logo clicked - navigating to /");
        navigate('/')
        window.scrollTo(0, 0);
    }
    
    return(
        <nav className="navbar">
            <div className="logo" onClick={handleLogoClick}>Deliveroo</div>
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="#about" onClick={handleAboutUsClick}>About Us</a></li>
                <li><a href="#contact" onClick={handleContactUsClick}>Contact Us</a></li>
                <li><a href="#" onClick={handleLoginClick} id='btn' className="login-btn">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar