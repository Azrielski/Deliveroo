import React from "react";
import { X, AlertTriangle } from "lucide-react";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, riderName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container delete-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete Rider</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="delete-warning">
            <AlertTriangle className="warning-icon" />
            <p>Are you sure you want to delete rider <strong>{riderName}</strong>?</p>
            <p className="warning-text">This action cannot be undone.</p>
          </div>
          
          <div className="modal-footer">
            <button className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-delete" onClick={onConfirm}>
              Delete Rider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 