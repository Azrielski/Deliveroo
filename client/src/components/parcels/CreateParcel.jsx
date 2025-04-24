import React from 'react';
import './CreateParcel.css'; // External CSS

function CreateParcel() {
  const weightOptions = [
    { label: '0-5 kg', value: '5' },
    { label: '5-10 kg', value: '10' },
    { label: '10+ kg', value: '15' }
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      description: event.target.description.value,
      weight: event.target.weight.value,
      pickup: event.target.pickup.value,
      destination: event.target.destination.value
    };
    alert('Order Created!\n' + JSON.stringify(formData, null, 2));
    event.target.reset();
  }

  function renderOptions(options) {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }

  return (
    <div className="container">
      <h2>Create New Delivery Order</h2>
      <form className="parcel-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Package Description</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight Category</label>
          <select id="weight" name="weight" required>
            {renderOptions(weightOptions)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pickup">Pickup Location</label>
          <input 
            type="text" 
            id="pickup" 
            name="pickup" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input 
            type="text" 
            id="destination" 
            name="destination" 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Order
        </button>
      </form>

      <div className="map-placeholder">
        <p>Map preview (static placeholder)</p>
      </div>
    </div>
  );
}

export default CreateParcel;