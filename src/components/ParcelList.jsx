// ParcelList.jsx
import React from 'react';

const ParcelList = ({ parcels, onCancelParcel, onChangeDestination, userEmail }) => {
  return (
    <div className="parcel-list max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Parcels</h2>
      <ul className="space-y-6">
        {parcels.map((parcel) => (
          <li key={parcel.id} className="border p-4 rounded-lg shadow-sm">
            <p><strong>ID:</strong> {parcel.id}</p>
            <p><strong>Status:</strong> {parcel.status}</p>
            <p><strong>Pickup:</strong> {parcel.pickup}</p>
            <p><strong>Destination:</strong> {parcel.destination}</p>
            <p><strong>Current Location:</strong> {parcel.currentLocation}</p>
            <p><strong>Weight:</strong> {parcel.weight} kg</p>
            {parcel.email === userEmail && parcel.status !== 'Delivered' && (
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => onCancelParcel(parcel.id)}
                >
                  Cancel
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  onClick={() => {
                    const newDestination = prompt('Enter new destination:');
                    if (newDestination) {
                      onChangeDestination(parcel.id, newDestination);
                    }
                  }}
                >
                  Change Destination
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParcelList;