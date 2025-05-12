import { createContext, useState, useEffect, useCallback } from "react";
import authService from '../components/authService';

const ParcelContext = createContext();
const API_URL = "http://localhost:5000/user/parcels"; // Base API URL

export function ParcelProvider({ children }) {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleApiError = (error) => {
    console.error("API Error:", error);
    // Detect token expiration error
    if (error.message && error.message.includes("401") && error.message.includes("Token has expired")) {
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setError("Session expired. Please log in again.");
      // Redirect to login page
      window.location.href = "/auth";
      return;
    }
    setError(error.message || "An error occurred.");
  };

const fetchParcels = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    
    const currentUser = authService.getCurrentUser();
    const token = authService.getToken();

    // Debugging authentication issues
    console.debug("Fetching parcels - currentUser:", currentUser);
    console.debug("Fetching parcels - token:", token);

    if (!currentUser) throw new Error("User not authenticated");
    if (!token) throw new Error("No authentication token found");

    const userId = currentUser.id || currentUser._id || currentUser.userId;
    if (!userId) throw new Error("User ID not found");

    const requestUrl = `${API_URL}?user_id=${userId}`;
    const response = await fetch(requestUrl, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }

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
      setLoading(true);
      setError(null);
      
      // Get the JWT token for all API requests
      const token = authService.getToken() || localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const currentUser = authService.getCurrentUser();
      
      // If this is a POST request, ensure user_id is included in the body
      if (method === "POST" && body && !body.user_id && currentUser) {
        body.user_id = currentUser.id;
      }
      
      console.debug(`Making ${method} request to:`, url);
      console.debug("With body:", body);
      console.debug("Auth token:", token);
      
      // Check token format to ensure it looks valid
      if (token && !token.includes('.')) {
        console.warn("Warning: Token does not appear to be in JWT format");
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include", // Include cookies if your server uses them
        body: body ? JSON.stringify(body) : null,
      });

      // Log the response status
      console.debug(`${method} response status:`, response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      handleApiError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createParcel = async (parcelData) => {
    // Ensure the current user ID is included
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      parcelData.user_id = currentUser.id;
    }
    
    const newParcel = await apiRequest(API_URL, "POST", parcelData);
    if (newParcel) fetchParcels();
    return newParcel;
  };

  const updateParcel = async (id, updates) => {
    await apiRequest(`http://localhost:5000/parcel/${id}`, "PATCH", updates);
    fetchParcels();
  };

  const cancelParcel = async (id) => {
    await updateParcel(id, { status: "cancelled" });
  };

  useEffect(() => {
    // Only fetch parcels if user is authenticated
    if (authService.getCurrentUser()) {
      fetchParcels();
    } else {
      console.warn("Not fetching parcels - user not authenticated");
      setParcels([]);
    }
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
        refreshParcels: fetchParcels 
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
}

export default ParcelContext;



// import { createContext, useState, useEffect, useCallback } from "react";

// const ParcelContext = createContext();

// export function ParcelProvider({ children }) {
//   const [parcels, setParcels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleApiError = (error) => {
//     setError(error.message);
//     throw error;
//   };

//   // const fetchParcels = useCallback(async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await fetch("http://localhost:5000/user/parcels");
//   //     const data = await response.json();
//   //     setParcels(data);
//   //   } catch (error) {
//   //     handleApiError(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }, []);


//   const fetchParcels = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/user/parcels", {
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token
//           "Content-Type": "application/json"
//         }
//       });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       setParcels(data);
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
  

//   const apiRequest = async (url, method, body) => {
//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       handleApiError(error);
//     }
//   };

//   const createParcel = async (parcelData) => {
//     try {
//       setLoading(true);
//       const newParcel = await apiRequest(
//         "http://localhost:5000/user/parcels",
//         "POST",
//         parcelData
//       );
//       await fetchParcels();
//       return newParcel;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateParcel = async (id, updates) => {
//     try {
//       setLoading(true);
//       await apiRequest(`http://localhost:5000/parcels/${id}`, "PATCH", updates);
//       await fetchParcels();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelParcel = async (id) => {
//     await updateParcel(id, { status: "cancelled" });
//   };

//   useEffect(() => {
//     fetchParcels();
//   }, [fetchParcels]);

//   return (
//     <ParcelContext.Provider
//       value={{
//         parcels,
//         loading,
//         error,
//         createParcel,
//         updateParcel,
//         cancelParcel,
//       }}
//     >
//       {children}
//     </ParcelContext.Provider>
//   );
// }

// export default ParcelContext;
