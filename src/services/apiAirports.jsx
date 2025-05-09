import axios from 'axios'

const URL = 'http://localhost:5050'


// Get all airports
export const getAllAirports = async () => {
      const response = await axios.get(URL);
      return response.data;
  };
  


//Get airport by ID  
export const getAirportById = async (id) => {
      const response = await axios.get(`${URL}/${id}`);
      return response.data;
  };


//Create airport
export const createAirport = async (airportData) => {
      const response = await axios.post(URL, airportData);
      return response.data;
  };


//Edit airport
export const editAirport = async (id, updatedData) => {
      const response = await axios.put(`${URL}/${id}`, updatedData);
      return response.data;
  };


// Delete an airport
export const deleteAirport = async (id) => {
      await axios.delete(`${URL}/${id}`);
  };