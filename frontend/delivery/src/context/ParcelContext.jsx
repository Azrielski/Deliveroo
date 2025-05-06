import { createContext, useState, useEffect,useCallback } from 'react';

const ParcelContext = createContext();

export function ParcelProvider({children}){
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchParcels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/parcels');
      const data = await response.json();
      setParcels(data);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);


  const createParcel = async (parcelData) => {
    try {
      const response = await fetch('http://localhost:5000/parcels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parcelData),
      });
      await fetchParcels();
      return await response.json();
    } catch (error) {
      console.error('Error creating parcel:', error);
    }
  };

  const updateParcel = async (id, updates) => {
    try {
      await fetch(`http://localhost:5000/parcels/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      await fetchParcels();
    } catch (error) {
      console.error('Error updating parcel:', error);
    }
  };



  const cancelParcel = async (id) => {
    try {
      await fetch(`http://localhost:5000/parcels/${id}`, {
        method: 'DELETE',
      });
      await fetchParcels();
    } catch (error) {
      console.error('Error cancelling parcel:', error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, [fetchParcels]);

  return (
    <ParcelContext.Provider
      value={{
        parcels,
        loading,
        error,
        createParcel,
        updateParcel,
        cancelParcel,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export default ParcelContext;


