import React, { useState } from "react";
import { Eye, ExternalLink } from "lucide-react";
import "./UsersTable.css";

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(trimmedSearchTerm) ||
    user.email.toLowerCase().includes(trimmedSearchTerm) ||
    user.id.toLowerCase().includes(trimmedSearchTerm)
  );

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
                    <button className="action-button">
                      <Eye className="action-icon" />
                    </button>
                    <button className="action-button">
                      <ExternalLink className="action-icon" />
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
    </div>
  );
};

export default UsersTable;