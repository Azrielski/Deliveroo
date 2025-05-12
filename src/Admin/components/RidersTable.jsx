import React, { useState } from "react";
import { Eye, ExternalLink, Trash } from "lucide-react";
import RiderDetailsModal from "./RiderDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "./RidersTable.css";

const RidersTable = ({ riders, onDeleteRider }) => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewRider = (rider) => {
    setSelectedRider(rider);
    setIsViewModalOpen(true);
  };

  const handleOpenInNewTab = (rider) => {
    window.open(`/admin/riders/${rider.id}`, '_blank');
  };

  const handleDeleteClick = (rider) => {
    setSelectedRider(rider);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRider) {
      onDeleteRider(selectedRider.id);
      setIsDeleteModalOpen(false);
      setSelectedRider(null);
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedRider(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRider(null);
  };

  return (
    <div className="riders-table-container">
      <table className="riders-table">
        <thead>
          <tr>
            <th>Rider ID</th>
            <th>Name</th>
            <th>Vehicle</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Assigned Orders</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider.id}>
              <td className="rider-id">{rider.id}</td>
              <td>{rider.name}</td>
              <td>{rider.vehicle}</td>
              <td>{rider.phone}</td>
              <td>
                <span className={`status-badge ${rider.status === "available" ? "status-green" : "status-orange"}`}>
                  {rider.status === "available" ? "Available" : "Busy"}
                </span>
              </td>
              <td>{rider.assignedOrders}</td>
              <td>
                <div className="table-actions">
                  <button 
                    className="action-button" 
                    onClick={() => handleViewRider(rider)}
                    title="View Details"
                  >
                    <Eye className="action-icon" />
                  </button>
                  <button 
                    className="action-button"
                    onClick={() => handleOpenInNewTab(rider)}
                    title="Open in New Tab"
                  >
                    <ExternalLink className="action-icon" />
                  </button>
                  <button 
                    className="action-button delete-action"
                    onClick={() => handleDeleteClick(rider)}
                    title="Delete Rider"
                  >
                    <Trash className="action-icon" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Rider Modal */}
      <RiderDetailsModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        rider={selectedRider}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        riderName={selectedRider?.name}
      />
    </div>
  );
};

export default RidersTable;