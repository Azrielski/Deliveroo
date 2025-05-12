import React from "react";
import { X } from "lucide-react";
import "./UserDetailsModal.css";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">User Details</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="user-details-grid">
            <div className="detail-group">
              <label>User ID</label>
              <span>{user.id}</span>
            </div>
            
            <div className="detail-group">
              <label>Name</label>
              <span>{user.name}</span>
            </div>
            
            <div className="detail-group">
              <label>Email</label>
              <span>{user.email}</span>
            </div>
            
            <div className="detail-group">
              <label>Phone</label>
              <span>{user.phone}</span>
            </div>
            
            <div className="detail-group">
              <label>Total Orders</label>
              <span>{user.orders}</span>
            </div>
            
            <div className="detail-group">
              <label>Joined Date</label>
              <span>{user.joined}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal; 