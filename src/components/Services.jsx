import React from "react";
import { FaTruck, FaShip, FaTemperatureHigh, FaBoxOpen, FaGlobeAfrica } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

const services = [
  {
    icon: <FaTruck className="text-primary fs-1 mb-3" />,
    name: "Same Day Delivery",
    description: "Get your packages delivered on the same day with our premium same-day service.",
    image: "/download.jpeg",
  },
  {
    icon: <FaBoxOpen className="text-warning fs-1 mb-3" />,
    name: "Next Day Delivery",
    description: "Reliable next-day delivery for urgent shipments at competitive prices.",
    image: "/next.jpeg",
  },
  {
    icon: <FaGlobeAfrica className="text-success fs-1 mb-3" />,
    name: "International Shipping",
    description: "Global package shipping with customs assistance and full tracking.",
    image: "/inter.jpeg",
  },
  {
    icon: <FaShip className="text-info fs-1 mb-3" />,
    name: "Bulk Deliveries",
    description: "Efficient handling and delivery of large-volume shipments for businesses.",
    image: "/bulk.jpeg",
  },
  {
    icon: <FaTemperatureHigh className="text-danger fs-1 mb-3" />,
    name: "Temperature Controlled",
    description: "Specialized transport for food, pharmaceuticals, and temperature-sensitive items.",
    image: "/Cold.jpeg",
  },
  {
    icon: <MdSecurity className="text-dark fs-1 mb-3" />,
    name: "Secure Deliveries",
    description: "High-security transportation for valuable or sensitive shipments.",
    image: "/security.jpeg",
  },
];

function Services() {
  return (
    <section id="services" className="container py-5">
      {/* Section Header (Centered & Styled) */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-4 position-relative d-inline-block pb-2">
          Our Services
          <div className="position-absolute w-100 bg-primary opacity-25" style={{ height: "4px", bottom: "0", left: "0" }}></div>
        </h2>
        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "700px" }}>
          Comprehensive delivery solutions tailored to your needs
        </p>
      </div>

      {/* Services Grid */}
      <div className="row g-4">
        {services.map((service, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0 p-4 text-center rounded-lg hover-animate">
              {service.icon}
              <h3 className="fw-bold">{service.name}</h3>
              <p className="text-muted">{service.description}</p>
              <img src={service.image} alt={service.name} className="img-fluid rounded mt-3 shadow-sm" />
              <button className="btn btn-primary mt-4">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
