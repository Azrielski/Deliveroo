import React, { useState, useEffect, useRef } from "react";
import { Eye, ExternalLink, Pencil, Trash2, MoreHorizontal } from "lucide-react"; 
import "./UsersTable.css";

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(trimmedSearchTerm) ||
    user.email.toLowerCase().includes(trimmedSearchTerm) ||
    user.id.toLowerCase().includes(trimmedSearchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewUser = (user) => {
    // TODO: Implement view user functionality
    console.log('View user:', user);
    setOpenDropdownId(null);
  };

  const handleOpenInNewTab = (user) => {
    // TODO: Implement open in new tab functionality
    console.log('Open in new tab:', user);
    setOpenDropdownId(null);
  };

  const handleEditUser = (user) => {
    // TODO: Implement edit user functionality
    console.log('Edit user:', user);
    setOpenDropdownId(null);
  };

  const handleDeleteUser = (user) => {
    // TODO: Implement delete user functionality
    console.log('Delete user:', user);
    setOpenDropdownId(null);
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
                  <div className="action-dropdown" ref={dropdownRef}>
                    <button
                      className="action-button"
                      onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                      title="More Actions"
                    >
                      <MoreHorizontal className="action-icon" />
                    </button>
                    {openDropdownId === user.id && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => handleViewUser(user)}>
                          <Eye className="action-icon" /> View Details
                        </button>
                        <button className="dropdown-item" onClick={() => handleOpenInNewTab(user)}>
                          <ExternalLink className="action-icon" /> Open in New Tab
                        </button>
                        <button className="dropdown-item" onClick={() => handleEditUser(user)}>
                          <Pencil className="action-icon" /> Edit User
                        </button>
                        <button className="dropdown-item delete" onClick={() => handleDeleteUser(user)}>
                          <Trash2 className="action-icon" /> Delete User
                        </button>
                      </div>
                    )}
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
    </div>
  );
};

export default UsersTable;