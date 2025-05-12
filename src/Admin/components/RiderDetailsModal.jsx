import React from "react";
import { X } from "lucide-react";
import "./RiderDetailsModal.css";

const RiderDetailsModal = ({ isOpen, onClose, rider }) => {
  if (!isOpen || !rider) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Rider Details</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="rider-details-grid">
            <div className="detail-group">
              <label>Rider ID</label>
              <span>{rider.id}</span>
            </div>
            
            <div className="detail-group">
              <label>Name</label>
              <span>{rider.name}</span>
            </div>
            
            <div className="detail-group">
              <label>Vehicle</label>
              <span>{rider.vehicle}</span>
            </div>
            
            <div className="detail-group">
              <label>Phone</label>
              <span>{rider.phone}</span>
            </div>
            
            <div className="detail-group">
              <label>Status</label>
              <span className={`status-badge ${rider.status === "available" ? "status-green" : "status-orange"}`}>
                {rider.status === "available" ? "Available" : "Busy"}
              </span>
            </div>
            
            <div className="detail-group">
              <label>Assigned Orders</label>
              <span>{rider.assignedOrders}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDetailsModal; 