import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function StatisticsCards3({ certificationStats }) {


  // Graph for Certification Level Distribution
  const certLevelDistributionData = {
    labels: Object.keys(certificationStats.certificationLevelPercentages),
    datasets: [
      {
        label: "Certification Levels",
        data: Object.values(certificationStats.certificationLevelPercentages).map((p) =>
          parseFloat(p)
        ),
        backgroundColor: ["#E74C3C", "#F1C40F", "#2ECC71", "#9B59B6"],
      },
    ],
  };

  return (
    <div className="statistics-cards-3">
      <div className="card-3">
        <h3>Average Certification Level</h3>
        <p>{certificationStats.averageCertificationLevel}</p>

        <h3>Certification Levels</h3>
        <ul>
          {Object.entries(certificationStats.certificationLevels).map(([level, count]) => (
            <li key={level}>
              Level {level}: {count}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-3">
        <h3>Certification Level Distribution</h3>
        <ul>
          {Object.entries(certificationStats.certificationLevelPercentages).map(([level, percentage]) => (
            <li key={level}>
              Level {level}: {percentage}
            </li>
          ))}
        </ul>
        <Bar data={certLevelDistributionData} />
      </div>


    </div>
  );
}