import axios from 'axios'

const URL = 'http://localhost:5050'


// Login service
export const login = async (email, password) => {
    const response = await axios.post(`${URL}/auth/login`, { email, password });
    return response.data;
  };


//Get all users
export const getAllUsers = async () => {
  const response = await axios.get(`${URL}/users`);
  return response.data;
};

//Get user by ID
export const getUserById = async (id) => {
  const response = await axios.get(`${URL}/users/${id}`);
  return response.data;
};


//Create user 
export const createUser = async (userData) => {
  const response = await axios.post(`${URL}/users`, userData);
  return response.data;
};


//Edit user 
export const editUser = async (id, updatedData) => {
  const response = await axios.put(`${URL}/users/${id}`, updatedData);
  return response.data;
};


//Delete User
export const deleteUser = async (id) => {
  const response = await axios.delete(`${URL}/users/${id}`);
  return response.data;
};