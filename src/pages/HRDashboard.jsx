import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/apiUsers'; // Import API function to fetch users
import { calculateUserStatistics } from '../utils/calculateStatistics'; // Import statistics calculation utility
import GraphStatistics from "../components/GraphStatistics";// Import the GraphStatistics component.
import StatisticCards from '../components/StatisticsCards';
import StatisticsCards2 from '../components/StatisticsCards2';
import { getAllAirports } from '../services/apiAirports';
import StatisticsCards3 from '../components/StatisticsCards3';

//CSS Styling
import '../styles/pages.css';



export default function HRDashboard() {
  const navigate = useNavigate();

  // State for statistics
  const [stats, setStats] = useState(null);

  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [users, airports] = await Promise.all([getAllUsers(), getAllAirports()]);
        const calculatedStats = calculateUserStatistics(users, airports);
        setStats(calculatedStats);
      } catch (err) {
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <p>Loading HR Dashboard...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message
  }

  return (
    <div className="statistics-page hr-dashboard">
      <h1>HR Dashboard</h1>
      {/* Overviews and Graphs Section */}
      <div className="chart-table-container">
        <div className="dashboard-overview">
          
          <StatisticCards stats={stats} />
        </div>

        <div className="chart-container">
          <GraphStatistics stats={stats} />
        </div>

        <div className="dashboard-overview">
          <StatisticsCards2 airportStats={stats.airportStats} />
        </div>

      </div>

      <div className="chart-table-container">

        <StatisticsCards3 certificationStats={stats.certificationStats} />

      </div>


      {/* User Table and Airport Table Section */}
      <div className="chart-table-container">
        <div className="table-container">
          <h2>Users</h2>
          <p>Manage user statistics and certifications.</p>
          <button onClick={() => navigate("/users")}>Go to User Table</button>
        </div>
        <div className="table-container">
          <h2>Airports</h2>
          <p>View and manage airport details here.</p>
          <button onClick={() => navigate("/airports")}>Go to Airport Table</button>
        </div>
      </div>
    </div>
  );
}
