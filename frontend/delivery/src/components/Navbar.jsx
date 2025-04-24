import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    return(
        <nav className="navbar">
            <div className="logo">Deliveroo</div>
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#" onClick={handleLoginClick} id='btn' className="login-btn">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar