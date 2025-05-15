import axios from 'axios';

const URL = 'http://localhost:5050'; 
// const URL = 'https://aviation-english-cert-manager-backend.onrender.com';

const axiosInstance = axios.create({
  baseURL: URL,
});

// Add an interceptor to include the token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all airports
export const getAllAirports = async () => {
  try {
    const response = await axiosInstance.get('/airports');
    return response.data;
  } catch (error) {
    console.error('Error fetching airports:', error.response || error.message);
    throw error; 
  }
};

// Get airport by ID
export const getAirportById = async (id) => {
  try {
    const response = await axiosInstance.get(`/airports/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching airport with ID ${id}:`, error.response || error.message);
    throw error;
  }
};

// Create airport
export const createAirport = async (airportData) => {
  try {
    const response = await axiosInstance.post('/airports', airportData);
    return response.data;
  } catch (error) {
    console.error('Error creating airport:', error.response || error.message);
    throw error;
  }
};

// Edit airport
export const editAirport = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/airports/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error editing airport with ID ${id}:`, error.response || error.message);
    throw error;
  }
};

// Delete an airport
export const deleteAirport = async (id) => {
  try {
    await axiosInstance.delete(`/airports/${id}`);
  } catch (error) {
    console.error(`Error deleting airport with ID ${id}:`, error.response || error.message);
    throw error;
  }
};
