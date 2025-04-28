import React from 'react';
import ParcelForm from './ParcelForm';
import ParcelList from './ParcelList';
import './userdashboard.css'; // Import the CSS file

const UserDashboard = ({ parcels, onCreateParcel, onCancelParcel, onChangeDestination, userEmail }) => {
  return (
    <div className="user-dashboard">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <h1>Welcome back, {userEmail.split('@')[0]}</h1>
        <p>Manage all your deliveries under one roof</p>
      </div>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Create Parcel Card */}
        <div className="dashboard-card">
          <h2>Create New Delivery</h2>
          <ParcelForm onCreateParcel={onCreateParcel} />
        </div>

        {/* Your Deliveries Section */}
        <div className="dashboard-card">
          <h2>Your Active Deliveries</h2>
          {parcels.length > 0 ? (
            <ParcelList
              parcels={parcels}
              onCancelParcel={onCancelParcel}
              onChangeDestination={onChangeDestination}
              userEmail={userEmail}
            />
          ) : (
            <div className="empty-deliveries">
              <p>You don't have any active deliveries yet.</p>
              <p>Create your first delivery above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;