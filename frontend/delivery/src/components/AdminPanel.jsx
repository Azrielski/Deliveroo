// AdminPanel.jsx (after removing Tailwind classes)
import React from 'react';
import './adminpanel.css'; // Import the CSS

const AdminPanel = ({ parcels, onUpdateStatus, onUpdateLocation }) => {
  return (
    // Keep only the main class for CSS targeting
    <div className="admin-panel">
      <h2>Admin Panel</h2> {/* Remove text-2xl etc. */}
      <ul> {/* Remove space-y-6 */}
        {parcels.map((parcel) => (
          <li key={parcel.id}> {/* Remove border, p-4 etc. */}
            <p><strong>Parcel ID:</strong> {parcel.id}</p>
            <label> {/* Remove block, mt-2 */}
              <span>Status</span> {/* Remove block, text-sm etc. */}
              <select
                value={parcel.status}
                onChange={(e) => onUpdateStatus(parcel.id, e.target.value)}
                // Remove Tailwind classes from select
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </label>
            <label> {/* Remove block, mt-4 */}
              <span>Current Location</span> {/* Remove block, text-sm etc. */}
              <input
                type="text"
                value={parcel.currentLocation}
                onChange={(e) => onUpdateLocation(parcel.id, e.target.value)}
                // Remove Tailwind classes from input
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;