import React from 'react';
import './Hero.css'
function Hero(){
    return(
        <>
            {/* <section id="hero">
                    <h4>Manage All Your Deliveries Under One Roof</h4>
                    <h5>Grow your Online Business all over Kenya with our<br />Affordable Delivery Services</h5>
            </section> */}
            <section className="hero">
            <div className="hero-content">
                <h1>Manage All Your Deliveries Under One Roof</h1>
                <p>Deliver smart across Kenya using our reliable delivery services</p>
                <div className="location-input">
                <input type="text" placeholder="Enter your current location" />
                <button>Find Services</button>
                </div>
            </div>
            </section>
        </>
    )
}

export default Hero