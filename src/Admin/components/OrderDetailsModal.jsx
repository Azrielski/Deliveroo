import React from "react";
import { X } from "lucide-react";
import "./OrderDetailsModal.css";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Order Details</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="order-details-grid">
            <div className="detail-group">
              <label>Order ID</label>
              <span>{order.id}</span>
            </div>
            
            <div className="detail-group">
              <label>Customer</label>
              <span>{order.customer}</span>
            </div>
            
            <div className="detail-group">
              <label>Pickup Location</label>
              <span>{order.pickup}</span>
            </div>
            
            <div className="detail-group">
              <label>Destination</label>
              <span>{order.destination}</span>
            </div>
            
            <div className="detail-group">
              <label>Status</label>
              <span className={`status-badge status-${order.status}`}>
                {order.status === "transit" ? "In Transit" :
                 order.status === "delivered" ? "Delivered" : "Pending"}
              </span>
            </div>
            
            <div className="detail-group">
              <label>Assigned Rider</label>
              <span>{order.rider}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 