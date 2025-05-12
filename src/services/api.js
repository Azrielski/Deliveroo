import axios from 'axios';

// Set API base URL (Update if backend runs separately)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add JWT token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ensure token is stored
    if (!token) {
      console.error("JWT token is missing. User might not be authenticated.");
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User API calls
export const userAPI = {
  getProfile: () => API.get('/user'),
  updateProfile: (userData) => API.put('/user', userData),
  deleteAccount: () => API.delete('/user'),
};

// Parcel API calls
export const parcelAPI = {
  getUserParcels: () => API.get('/parcels'),
  createParcel: async (parcelData) => {
    try {
      const response = await API.post('/parcels', parcelData);
      return response.data;
    } catch (error) {
      console.error("Parcel creation failed:", error.response?.data || error.message);
      throw error;
    }
  },
  getParcel: (parcelId) => API.get(`/parcels/${parcelId}`),
  updateParcel: (parcelId, parcelData) => API.put(`/parcels/${parcelId}`, parcelData),
  deleteParcel: (parcelId) => API.delete(`/parcels/${parcelId}`),
  getTrackingUpdates: (parcelId) => API.get(`/parcels/${parcelId}/tracking`),
  rateParcel: (parcelId, ratingData) => API.post(`/parcels/${parcelId}/rating`, ratingData),
};

// Authentication API calls
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    return API.post('/auth/logout');
  },
};

// Export all APIs
export default { user: userAPI, parcel: parcelAPI, auth: authAPI };
