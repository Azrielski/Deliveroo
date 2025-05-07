import { createContext, useState, useEffect, useCallback } from 'react';

const ParcelContext = createContext();

export function ParcelProvider({ children }) {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000';

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
  };

  const fetchParcels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/parcels`, {
        credentials: 'include', // Important for cookies/sessions
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await handleResponse(response);
      setParcels(data);
    } catch (error) {
      setError(error.message);
      console.error('Fetch parcels error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createParcel = async (parcelData) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/parcels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parcelData),
      });
      const data = await handleResponse(response);
      await fetchParcels();
      return data;
    } catch (error) {
      setError(error.message);
      console.error('Error creating parcel:', error);
      throw error;
    }
  };

  const updateParcel = async (id, updates) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/parcels/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      await handleResponse(response);
      await fetchParcels();
    } catch (error) {
      setError(error.message);
      console.error('Error updating parcel:', error);
      throw error;
    }
  };

  const cancelParcel = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/parcels/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      await handleResponse(response);
      await fetchParcels();
    } catch (error) {
      setError(error.message);
      console.error('Error cancelling parcel:', error);
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
        createParcel,
        updateParcel,
        cancelParcel,
        fetchParcels, // Expose fetchParcels if needed by consumers
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
}

export default ParcelContext;