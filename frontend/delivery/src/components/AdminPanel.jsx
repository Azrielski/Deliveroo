// AdminPanel.jsx
import React from 'react';

const AdminPanel = ({ parcels, onUpdateStatus, onUpdateLocation }) => {
  return (
    <div className="admin-panel p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Panel</h2>
      <ul className="space-y-6">
        {parcels.map((parcel) => (
          <li key={parcel.id} className="border p-4 rounded-lg shadow-sm">
            <p><strong>Parcel ID:</strong> {parcel.id}</p>
            <label className="block mt-2">
              <span className="block text-sm font-medium text-gray-700">Status</span>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={parcel.status}
                onChange={(e) => onUpdateStatus(parcel.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </label>
            <label className="block mt-4">
              <span className="block text-sm font-medium text-gray-700">Current Location</span>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                type="text"
                value={parcel.currentLocation}
                onChange={(e) => onUpdateLocation(parcel.id, e.target.value)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
