import React from "react";
import { BsShieldCheck, BsGeoAlt, BsPhone } from "react-icons/bs";
import { FaClock, FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const features = [
  { icon: <BsShieldCheck className="text-primary fs-1" />, title: "Safe & Secure", description: "Your packages are fully insured and handled with the utmost care from pickup to delivery." },
  { icon: <BsGeoAlt className="text-warning fs-1" />, title: "Real-Time Tracking", description: "Track your delivery in real-time through our mobile app or website." },
  { icon: <BsPhone className="text-success fs-1" />, title: "Mobile Notifications", description: "Get SMS and email updates at every stage of the delivery process." },
  { icon: <FaClock className="text-info fs-1" />, title: "Scheduled Deliveries", description: "Choose your preferred delivery time that fits your schedule." },
  { icon: <FaMoneyBillWave className="text-danger fs-1" />, title: "Competitive Pricing", description: "Affordable rates with no hidden charges for all delivery services." },
  { icon: <FaUserTie className="text-dark fs-1" />, title: "Dedicated Support", description: "Our customer support team is available 7 days a week to assist you." },
];

function Features() {
  return (
    <section id="features" className="container py-5">
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-4">Why Choose Us</h2>
        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "700px" }}>
          Features that set us apart from the competition
        </p>
      </div>

      {/* Features Grid */}
      <div className="row g-4">
        {features.map((feature, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100 shadow-lg border-0 p-4 text-center rounded-lg hover-scale">
              {feature.icon}
              <h3 className="fw-bold mt-3">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
