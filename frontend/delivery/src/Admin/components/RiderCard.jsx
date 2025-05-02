import React from "react";
import { Bike } from "lucide-react";
import "./RiderCard.css";

const RiderCard = ({ name, riderId, status, ordersCount = 0 }) => {
  const isAvailable = status === "available";
  
  return (
    <div className={`rider-card ${isAvailable ? "rider-available" : "rider-busy"}`}>
      <div className="rider-card-content">
        <div className={`rider-card-icon-container ${isAvailable ? "icon-available" : "icon-busy"}`}>
          <Bike className={`rider-card-icon ${isAvailable ? "icon-green" : "icon-red"}`} />
        </div>
        <div className="rider-card-info">
          <h3>{name}</h3>
          <p className="rider-card-id">{riderId}</p>
        </div>
      </div>
      
      <div className="rider-card-footer">
        <span className={`rider-card-status ${isAvailable ? "status-available" : "status-busy"}`}>
          {isAvailable ? "Available" : `Delivering ${ordersCount} ${ordersCount === 1 ? "order" : "orders"}`}
        </span>
        
        <button className={`rider-card-button ${!isAvailable ? "view-orders-button" : ""}`}>
          {isAvailable ? "Assign Order" : "View Orders"}
        </button>
      </div>
    </div>
  );
};

export default RiderCard;