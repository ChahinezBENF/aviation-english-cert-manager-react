import React from "react";

//Import Styling
import '../styles/components.css';

import {
  Bar,
  Line,
  Pie,
  Doughnut,
} from "react-chartjs-2"; // Import chart types from react-chartjs-2

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function GraphStatistics({ stats }) {
  // Data for certifications expiring in the next 30 days
  const expiringCertsData = {
    labels: ["Expired", "Expiring in 30 Days", "Valid"],
    datasets: [
      {
        label: "Certification Status",
        data: [
          stats.expiredCertifications,
          stats.expiringCertifications,
          stats.validCertifications - stats.expiringCertifications,
        ],
        backgroundColor: ["#E74C3C", "#F1C40F", "#2ECC71"],
      },
    ],
  };

  return (
    <div className="card-3">

        <h3>Certification Status</h3>
        <Doughnut data={expiringCertsData} />

    </div>
  );
}
