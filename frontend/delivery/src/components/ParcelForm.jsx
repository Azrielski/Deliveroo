// ParcelForm.jsx
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
    <form onSubmit={handleSubmit} className="parcel-form max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Parcel Delivery</h2>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Create Parcel</button>
    </form>
  );
};

export default ParcelForm;
