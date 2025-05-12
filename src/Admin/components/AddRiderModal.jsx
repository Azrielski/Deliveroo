import React, { useEffect } from "react";
import "./AddRiderModal.css";

const AddRiderModal = ({ isOpen, onClose, onSubmit }) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscapeKey);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      firstName: formData.get("firstName"),
      lastName:  formData.get("lastName"),
      email:     formData.get("email"),
      phone:     formData.get("phone"),
      vehicleType:  formData.get("vehicleType"),
      licensePlate: formData.get("licensePlate"),
      address:      formData.get("address"),
    });
  };

  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleModalClick}>
        <div className="modal-content">
          <h2 className="modal-title">Add New Rider</h2>

          {/* form now wraps both content *and* footer */}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  className="form-control"
                  required
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Car">Car</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="licensePlate">License Plate</label>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                rows="2"
              ></textarea>
            </div>

            {/* move footer inside the form so nesting stays correct */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Rider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRiderModal;
