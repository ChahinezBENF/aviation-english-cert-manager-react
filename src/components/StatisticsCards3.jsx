import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatisticsCards3({ certificationStats }) {
  if (!certificationStats) return <p>No data available</p>;

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
    <div className="statistics-cards-wrapper">
      <div className="statistics-cards-3">
        <div className="card-6">
          <h3>Average Certification Level</h3>
          <hr style={{ width: "50%", margin: "1rem auto" }} />
          <h2>{certificationStats.averageCertificationLevel || "N/A"}</h2>
        </div>
        <section className="card-7">
          <h3>Certification Levels</h3>
          <hr style={{ width: "50%", margin: "1rem auto" }} />
          <ul>
            {Object.entries(certificationStats.certificationLevels).map(([level, count]) => (
              <li key={level}>
                Level {level}: {count}
              </li>
            ))}
          </ul>
        </section>
        <section className="card-8">
          <h3>Certification Percentages</h3>
          <hr style={{ width: "50%", margin: "1rem auto" }} />
          <ul>
            {Object.entries(certificationStats.certificationLevelPercentages).map(([level, percentage]) => (
              <li key={level}>
                Level {level}: {parseFloat(percentage).toFixed(2)}%
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="card-9">
        <h3>Certification Level Distribution</h3>
        <Bar data={certLevelDistributionData} options={{ responsive: true }} />
      </div>
    </div>
  );
}
