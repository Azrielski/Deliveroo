import React from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import "./UserDeleteConfirmationModal.css";

const UserDeleteConfirmationModal = ({ isOpen, onClose, onConfirm, userName, isDeleting, error }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container delete-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete User</h2>
          <button className="close-button" onClick={onClose} disabled={isDeleting}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="delete-warning">
            <AlertTriangle className="warning-icon" />
            <p>Are you sure you want to delete user <strong>{userName}</strong>?</p>
            <p className="warning-text">This action cannot be undone.</p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          <div className="modal-footer">
            <button 
              className="btn btn-cancel" 
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              className="btn btn-delete" 
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="loading-icon" />
                  Deleting...
                </>
              ) : (
                'Delete User'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteConfirmationModal; 