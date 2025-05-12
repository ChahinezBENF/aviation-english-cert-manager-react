import React from "react";


export default function StatisticCards({ stats }) {
  return (
    <div className="statistics-cards">
      <div className="card">
        <h3>Total Users</h3>
        <p>{stats.totalUsers}</p>
      </div>

      <div className="card">
        <h3>Controllers</h3>
        <p>{stats.roles.controllers}</p>
      </div>

      <div className="card">
        <h3>Pilots</h3>
        <p>{stats.roles.pilots}</p>
      </div>

    </div>
  );
}
