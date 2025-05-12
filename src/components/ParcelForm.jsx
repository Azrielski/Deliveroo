import React, { useState } from "react";
import { parcelAPI } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const ParcelForm = () => {
  const [parcelData, setParcelData] = useState({
    description: "",
    weight: "",
    destination: "",
    pickup_address: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setParcelData({ ...parcelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button while submitting
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await parcelAPI.createParcel({
        ...parcelData,
        weight: parseFloat(parcelData.weight), // Ensure weight is a number
      });

      console.log("Parcel Created:", response.data);
      setParcelData({ description: "", weight: "", destination: "", pickup_address: "" });
      setSuccessMessage("Parcel created successfully!");
    } catch (error) {
      console.error("Error creating parcel:", error.response?.data || error.message);
      setErrorMessage("Failed to create parcel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-5 shadow-lg">
        <h2 className="text-center text-primary fw-bold mb-4">Create Parcel Delivery</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Parcel Description</label>
            <input 
              type="text" 
              name="description" 
              className="form-control" 
              onChange={handleChange} 
              value={parcelData.description} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Weight (kg)</label>
            <input 
              type="number" 
              name="weight" 
              className="form-control" 
              onChange={handleChange} 
              value={parcelData.weight} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Pickup Address</label>
            <input 
              type="text" 
              name="pickup_address" 
              className="form-control" 
              onChange={handleChange} 
              value={parcelData.pickup_address} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Destination</label>
            <input 
              type="text" 
              name="destination" 
              className="form-control" 
              onChange={handleChange} 
              value={parcelData.destination} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Processing..." : "Create Parcel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParcelForm;
