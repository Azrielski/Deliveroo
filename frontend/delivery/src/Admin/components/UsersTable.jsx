import React, { useState } from "react";
import { Eye, ExternalLink, Edit, Trash2 } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";
import UserDeleteConfirmationModal from "./UserDeleteConfirmationModal";
import EditUserModal from "./EditUserModal";
import "./UsersTable.css";

const UsersTable = ({ users, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(trimmedSearchTerm) ||
    user.email.toLowerCase().includes(trimmedSearchTerm) ||
    user.id.toLowerCase().includes(trimmedSearchTerm)
  );

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleOpenInNewTab = (user) => {
    window.open(`/admin/users/${user.id}`, '_blank');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);

      // Call the API to delete the user
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Call the parent component's onDeleteUser callback
      onDeleteUser(selectedUser.id);
      
      // Close the modal and reset state
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      setDeleteError(error.message || 'An error occurred while deleting the user');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = (updatedUser) => {
    // TODO: Implement actual update functionality
    console.log('Updating user:', updatedUser);
    setIsEditModalOpen(false);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    setDeleteError(null);
  };

  return (
    <div className="users-table-container">
      <div className="users-table-actions">
        <div className="users-search">
          <input
            type="text"
            placeholder="Search users..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="export-button">
          Export
          <svg className="export-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>USER ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>ORDERS</th>
            <th>JOINED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="user-id">{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.orders}</td>
                <td>{user.joined}</td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="action-button" 
                      onClick={() => handleViewUser(user)}
                      title="View Details"
                    >
                      <Eye className="action-icon" />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleOpenInNewTab(user)}
                      title="Open in New Tab"
                    >
                      <ExternalLink className="action-icon" />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      <Edit className="action-icon" />
                    </button>
                    <button 
                      className="action-button delete-action"
                      onClick={() => handleDeleteClick(user)}
                      title="Delete User"
                      disabled={isDeleting}
                    >
                      <Trash2 className="action-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-pagination">
        <p className="pagination-info">
          Showing 1 to 3 of 586 users
        </p>
        <div className="pagination-buttons">
          <button className="pagination-button">Previous</button>
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button">Next</button>
        </div>
      </div>

      {/* View User Modal */}
      <UserDetailsModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        user={selectedUser}
      />

      {/* Delete Confirmation Modal */}
      <UserDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        userName={selectedUser?.name}
        isDeleting={isDeleting}
        error={deleteError}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default UsersTable;