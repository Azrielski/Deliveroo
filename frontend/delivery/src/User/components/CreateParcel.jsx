import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ParcelContext from '../context/ParcelContext';
import { FiPackage, FiMapPin, FiTruck, FiEdit } from 'react-icons/fi';



function CreateParcel(){
  const { createParcel } = useContext(ParcelContext);
  const [formData, setFormData] = useState({
    description:'',
    weight:'',
    pickup_address: '',
    destination_address: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`,
        { headers: { 'User-Agent': 'Deliveroo-App/1.0' } }
      );
      const data = await response.json();
      return data[0] ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
    } catch (error) {
      setError(error.message)
      throw new Error('Geocoding failed');
    }
  };

  const isFormInvalid =
  !formData.description || !formData.weight ||!formData.pickup_address || !formData.destination_address || submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Geocode both addresses
      const pickupCoords = await geocodeAddress(formData.pickup_address);
      const destinationCoords = await geocodeAddress(formData.destination_address);

      if (!pickupCoords || !destinationCoords) {
        throw new Error('Could not find coordinates for one or both addresses');
      }

      // Create parcel with geocoded coordinates
      const newParcel = await createParcel({
        ...formData,
        weight: parseFloat(formData.weight),
        pickup_lat: pickupCoords[0],
        pickup_lon: pickupCoords[1],
        destination_lat: destinationCoords[0],
        destination_lon: destinationCoords[1]
      });

      // Reset form and navigate
      setFormData({
        description: '',
        weight: '',
        pickup_address: '',
        destination_address: ''
      });
      navigate(`/parcels/${newParcel.id}/simulation`);
    } catch (err) {
      setError(err.message || 'Failed to create parcel. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <FiPackage className="inline-block" /> New Shipment
      </h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <FiEdit className="text-blue-500" />
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
              <FiPackage className="text-blue-500" />
              <input
                type="number"
                className="w-full bg-transparent focus:outline-none"
                step="0.1"
                min="0.5"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                required
              />
            </div>
          </div>
  
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
              <FiMapPin className="text-blue-500" />
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none"
                value={formData.pickup_address}
                onChange={(e) => setFormData({...formData, pickup_address: e.target.value})}
                required
              />
            </div>
          </div>
        </div>
  
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Destination Address</label>
          <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <FiTruck className="text-blue-500" />
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none"
              value={formData.destination_address}
              onChange={(e) => setFormData({...formData, destination_address: e.target.value})}
              required
            />
          </div>
        </div>
  
        <button
          type="submit"
          disabled={isFormInvalid}
          className={`w-full py-3 text-white font-medium rounded-lg transition-all ${
            isFormInvalid 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Creating Shipment...' : 'Create Shipment'}
        </button>
      </form>
    </div>
  );
 
};

export default CreateParcel;




