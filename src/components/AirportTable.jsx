import { useEffect, useState } from 'react';
import { getAllAirports, deleteAirport } from '../services/apiAirports';
import { useNavigate } from 'react-router-dom';
import HeaderHr from '../components/HeaderHr';

export default function AirportTable() {
  const nav = useNavigate();
  const [airports, setAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // State to hold filtered airports based on the search term
  const [filteredAirports, setFilteredAirports] = useState([]);

  // Fetch airports
  useEffect(() => {
    getAllAirports().then((res) => {
      setAirports(res); // Set all airports
      setFilteredAirports(res); // Initially, all airports are visible
    });
  }, []);

  // Delete airport
  const deleteTheAirport = (id) => {
    deleteAirport(id).then(() => {
      setAirports((prevAirports) => prevAirports.filter((airport) => airport._id !== id));
      setFilteredAirports((prevFiltered) => prevFiltered.filter((airport) => airport._id !== id));
    });
  };

  // Search airport
  const search = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredAirports(
      airports.filter((airport) =>
        airport.name.toLowerCase().includes(value) ||
        airport.code.toLowerCase().includes(value) ||
        airport.location.city.toLowerCase().includes(value) ||
        airport.location.country.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div><HeaderHr/>
    <div className="airport-table-container">
      <h1>Airports</h1>
      <div className="search">
        
        <input
          type="text"
          placeholder="Search airports..."
          value={searchTerm}
          onChange={search}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Controllers</th>
            <th>Pilots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredAirports) && filteredAirports.length > 0 ? (
            filteredAirports.map((airport) => (
              <tr key={airport._id}>
                <td>{airport.code}</td>
                <td>{airport.name}</td>
                <td>{airport.location.city}</td>
                <td>{airport.location.country}</td>
                <td>{airport.controllers.length}</td>
                <td>{airport.pilots.length}</td>
                <td>
                  <button onClick={() => nav(`/airports/edit/${airport._id}`)}>Modify</button>
                  <button onClick={() => deleteTheAirport(airport._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No airports available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="action-buttons">
      <button onClick={() => nav('/create-airport')}>Create Airport</button>
      <button onClick={() => nav('/hr-dashboard')}>Go Back</button>
    </div>
    </div>
    </div>
  );
}
