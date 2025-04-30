import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ParcelContext from '../context/ParcelContext';


function CreateParcel(){
  const { createParcel } = useContext(ParcelContext);
  const [formData, setFormData] = useState({
    pickup_address: '',
    destination_address: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isFormInvalid =
  !formData.pickup_address || !formData.destination_address || submitting;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      await createParcel(formData);
      setFormData({ pickup_address: '', destination_address: '' });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create parcel. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New Parcel</h2>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Pickup Address</label>
          <input
            type="text"
            value={formData.pickup_address}
            onChange={(e) => setFormData({...formData, pickup_address: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium">Destination Address</label>
          <input
            type="text"
            value={formData.destination_address}
            onChange={(e) => setFormData({...formData, destination_address: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isFormInvalid}
          className={`px-4 py-2 text-white rounded ${
            isFormInvalid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            
          }`}
        >
          {submitting ? 'Creating...' : 'Create Parcel'}
        </button>
      </form>
    </div>
  );
};

export default CreateParcel;

