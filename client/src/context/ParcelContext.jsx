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
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create parcel');
      }
      
      await fetchParcels();
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error; 
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
        createParcel
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export default ParcelContext;


