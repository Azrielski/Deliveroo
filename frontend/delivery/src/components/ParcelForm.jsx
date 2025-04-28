// File: ParcelForm.jsx
import React, { useState } from 'react';

const ParcelForm = ({ onCreateParcel }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParcel = { pickup, destination, weight, status: 'Pending', currentLocation: pickup };
    onCreateParcel(newParcel);
    setPickup('');
    setDestination('');
    setWeight('');
  };

  return (
    <form onSubmit={handleSubmit} className="parcel-form">
      <h2>Create Parcel Delivery</h2>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <button type="submit">Create Parcel</button>
    </form>
  );
};

export default ParcelForm;