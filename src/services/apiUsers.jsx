import axios from 'axios';

// const URL = 'http://localhost:5050';
const URL = 'https://aviation-english-cert-manager-backend.onrender.com';


// Create an Axios instance to fixe the Authentication
const axiosInstance = axios.create({
  baseURL: URL,
});

// Add an interceptor to include the token in all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Login service
export const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users'); 
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};


// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user by ID");
  }
};

// Create user
export const createUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};

// Edit user
export const editUser = async (id, updatedData) => {
  const response = await axiosInstance.put(`/users/${id}`, updatedData);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};


