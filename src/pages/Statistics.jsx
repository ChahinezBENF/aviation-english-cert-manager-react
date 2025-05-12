import { useEffect, useState } from "react";
import { getAllUsers } from "../services/apiUsers"; // Import the API function to fetch users.
import { calculateUserStatistics } from "../utils/calculateStatistics"; // Import the utility to calculate statistics.
import {
  Bar,
  Line,
} from "react-chartjs-2"; // Import chart types from react-chartjs-2

import "../styles/pages.css";

export default function Statistics() {
  const [stats, setStats] = useState(null); // State for statistics
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch users and calculate statistics
    const fetchStatistics = async () => {
      try {
        const users = await getAllUsers(); // Fetch users
        const calculatedStats = calculateUserStatistics(users); // Calculate statistics
        setStats(calculatedStats); // Set statistics
      } catch (err) {
        setError("Failed to load statistics."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <p>Loading statistics...</p>; // Show loading
  }

  if (error) {
    return <p>{error}</p>; // Show error
  }
  
  

  // Data for roles chart
  const rolesData = {
    labels: ["Controllers", "Pilots"],
    datasets: [
      {
        label: "Role Distribution",
        data: [stats.roles.controllers, stats.roles.pilots],
        backgroundColor: ["#3498DB", "#9B59B6"],
      },
    ],
  };

  // Data for trends chart
  const trendData = {
    labels: stats.dates.map((date) => date.month), 
    datasets: [
      {
        label: "Expired Certifications",
        data: stats.dates.map((date) => date.expired),
        borderColor: "#E74C3C",
        fill: false,
      },
      {
        label: "Expiring Certifications",
        data: stats.dates.map((date) => date.expiring),
        borderColor: "#F39C12",
        fill: false,
      },
      {
        label: "Valid Certifications",
        data: stats.dates.map((date) => date.valid),
        borderColor: "#2ECC71",
        fill: false,
      },
    ],
  };

return (
  <div className="statistics-page">
    <h1>Detailed Statistics</h1>

    {/* Roles Distribution */}
    <div className="chart-table-container">
      <div className="chart-container">
        <h2>Role Distribution</h2>
        <Bar data={rolesData} />
      </div>
      <div className="table-container">
        <h2>Role Distribution (Table)</h2>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Controllers</td>
              <td>{stats.roles.controllers}</td>
            </tr>
            <tr>
              <td>Pilots</td>
              <td>{stats.roles.pilots}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Certification Trends */}
    <div className="chart-table-container">
      <div className="chart-container">
        <h2>Certification Trends</h2>
        <Line data={trendData} />
      </div>
      <div className="table-container">
        <h2>Certification Trends (Table)</h2>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Expired</th>
              <th>Expiring</th>
              <th>Valid</th>
            </tr>
          </thead>
          <tbody>
            {stats.dates.map((trend, index) => (
              <tr key={index}>
                <td>{trend.month}</td>
                <td>{trend.expired}</td>
                <td>{trend.expiring}</td>
                <td>{trend.valid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
