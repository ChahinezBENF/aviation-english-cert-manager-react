import { useEffect, useState } from "react";
import { getAllUsers } from "../services/apiUsers"; // Import the API function to fetch users.
import { calculateUserStatistics } from "../utils/calculateStatistics"; // Import the utility to calculate statistics.
import StatisticCards from "../components/StatisticsCards"; // Import the StatisticsCards component.
import GraphStatistics from "../components/GraphStatistics";// Import the GraphStatistics component.

//CSS Styling
import '../styles/pages.css';

export default function Statistics() {
  // State to store the statistics
  const [stats, setStats] = useState(null);

  // State to manage loading and error statuses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users and calculate statistics
    const fetchStatistics = async () => {
      try {
        const users = await getAllUsers(); // Fetch the list of users
        const calculatedStats = calculateUserStatistics(users); // Calculate the statistics
        setStats(calculatedStats); // Set the calculated statistics in state
      } catch (err) {
        setError("Failed to load statistics."); // Handle errors
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchStatistics(); 
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <p>Loading statistics...</p>;
  }

  // Show an error message if data could not be fetched
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="statistics-page">
      <h1>Company Statistics</h1>
      {stats && (
        <>
          {/* Statistic Cards */}
          <StatisticCards stats={stats} />
          {/* Graphs */}
          <GraphStatistics stats={stats} />
        </>
      )}
    </div>
  );
}
