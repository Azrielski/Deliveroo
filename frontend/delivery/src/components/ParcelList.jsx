import React from 'react';

const ParcelList = ({ parcels, onCancelParcel, onChangeDestination, userEmail }) => {
  return (
    <div className="parcel-list">
      <h2>Your Parcels</h2>
      <ul>
        {parcels.map((parcel) => (
          <li key={parcel.id}>
            <p><strong>ID:</strong> {parcel.id}</p>
            <p><strong>Status:</strong> {parcel.status}</p>
            <p><strong>Pickup:</strong> {parcel.pickup}</p>
            <p><strong>Destination:</strong> {parcel.destination}</p>
            <p><strong>Current Location:</strong> {parcel.currentLocation}</p>
            <p><strong>Weight:</strong> {parcel.weight} kg</p>
            {parcel.email === userEmail && parcel.status !== 'Delivered' && (
              <>
                <button onClick={() => onCancelParcel(parcel.id)}>Cancel</button>
                <button onClick={() => {
                  const newDestination = prompt('Enter new destination:');
                  if (newDestination) {
                    onChangeDestination(parcel.id, newDestination);
                  }
                }}>Change Destination</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParcelList;