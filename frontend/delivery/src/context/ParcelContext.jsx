import { createContext, useState, useEffect, useCallback } from "react";

const ParcelContext = createContext();

export function ParcelProvider({ children }) {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiError = (error) => {
    setError(error.message);
    throw error;
  };

  const fetchParcels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/user/parcels");
      const data = await response.json();
      setParcels(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const apiRequest = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      handleApiError(error);
    }
  };

  const createParcel = async (parcelData) => {
    try {
      setLoading(true);
      const newParcel = await apiRequest(
        "http://localhost:5000/user/parcels",
        "POST",
        parcelData
      );
      await fetchParcels();
      return newParcel;
    } finally {
      setLoading(false);
    }
  };

  const updateParcel = async (id, updates) => {
    try {
      setLoading(true);
      await apiRequest(`http://localhost:5000/parcels/${id}`, "PATCH", updates);
      await fetchParcels();
    } finally {
      setLoading(false);
    }
  };

  const cancelParcel = async (id) => {
    await updateParcel(id, { status: "cancelled" });
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
}

export default ParcelContext;
