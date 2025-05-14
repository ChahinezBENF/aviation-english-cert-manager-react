import React from "react";


export default function StatisticCards({ stats }) {
  return (
    <div className="statistics-cards-1">
      <div className="card-1">
        <h3>Total Employee</h3>
        <hr style={{ width: "50%", margin: "1rem auto" }} />
        <h2>{stats.totalUsers} </h2>
        <p>Includes all active employees in the system</p>

      </div>

      <div className="card-2">
        <div className="inline-content">
          <h3>Controllers : </h3>
          <h2>{stats.roles.controllers}</h2>
        </div>
<p>Manage system operations and ensure compliance with
          organizational standards.</p>
        <hr style={{ border: "1px solid #3a8dc7", margin: "1rem auto" }} />

        <div className="inline-content">
          <h3>Pilots : </h3>
          <h2>{stats.roles.pilots}</h2>
        </div>
        <p>  Represent the operational workforce, handling primary field
          activities.</p>
      </div>

    </div>
  );
}
