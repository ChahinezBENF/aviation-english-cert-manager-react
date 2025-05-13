import React from "react";


export default function StatisticCards({ stats }) {
  return (
    <div className="statistics-cards-1">
      <div className="card-1">
        <h3>Total Employee</h3>
        <p>{stats.totalUsers}</p>
      </div>

      <div className="card-2">
        <h3>Controllers</h3>
        <p>{stats.roles.controllers}</p>
     <hr />
        <h3>Pilots</h3>
        <p>{stats.roles.pilots}</p>
      </div>

    </div>
  );
}
