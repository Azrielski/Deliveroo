import React, { useState } from 'react';
import './Navbar.css';

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return(
            /* <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <img src="https://cdn.pixabay.com/photo/2017/07/08/10/44/parcels-2484036_1280.png" alt="logo"/>
                    
                    <a class="navbar-brand fw-bold" href="#">Deliveroo</a>

                    <div id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="btn btn-primary" href="#">Login</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav> */
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
                <li><a href="#login" id='btn' className="login-btn">Login</a></li>
                </ul>
            </nav>
    )
}

export default Navbar