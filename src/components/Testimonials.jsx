import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is loaded
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Kimani",
    position: "Online Store Owner",
    image: "/sarah.jpeg",
    text: "Deliveroo has transformed my online business. Their same-day delivery option has increased my customer satisfaction rates by 40%. I can't imagine working with any other delivery service.",
  },
  {
    name: "John Mwangi",
    position: "Restaurant Manager",
    image: "/mwangi.jpeg",
    text: "The temperature-controlled delivery service from Deliveroo ensures our food arrives hot and fresh. Their professional drivers and real-time tracking give us peace of mind with every delivery.",
  },
  {
    name: "Esther Odhiambo",
    position: "Fashion Designer",
    image: "/ester.jpeg",
    text: "My customers love knowing exactly when their purchases will arrive. Deliveroo's tracking system and reliable delivery times have helped me build trust with my clientele across Kenya.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="container py-5">
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary display-4">What Our Clients Say</h2>
        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "700px" }}>
          Hear from businesses and individuals who trust us with their deliveries
        </p>
      </div>

      {/* Bootstrap Carousel */}
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="card text-center shadow-lg p-5 border-0">
                <div className="mx-auto">
                  <FaQuoteLeft className="text-primary fs-1 mb-3" />
                </div>
                <p className="fs-4 text-muted">{testimonial.text}</p>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <img src={testimonial.image} alt={testimonial.name} className="rounded-circle" style={{ width: "80px", height: "80px" }} />
                  <div className="ms-3 text-start">
                    <h5 className="fw-bold">{testimonial.name}</h5>
                    <p className="text-muted small">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
