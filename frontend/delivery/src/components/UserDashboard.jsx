import React from 'react';
import ParcelForm from './ParcelForm';
import ParcelList from './ParcelList';

const UserDashboard = ({ parcels, onCreateParcel, onCancelParcel, onChangeDestination, userEmail }) => {
  return (
    <div className="user-dashboard">
      <h1>Welcome, {userEmail}</h1>
      <ParcelForm onCreateParcel={onCreateParcel} />
      <ParcelList
        parcels={parcels}
        onCancelParcel={onCancelParcel}
        onChangeDestination={onChangeDestination}
        userEmail={userEmail}
      />
    </div>
  );
};

export default UserDashboard;
