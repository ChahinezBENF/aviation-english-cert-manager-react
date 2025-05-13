import React from "react";

export default function StatisticsCards2({ airportStats }) {
  return (
    <div className="statistics-cards-2">
      <div className="card-4">
        <h3>Total Airports</h3>
        <p>{airportStats.totalAirports}</p>
      </div>

      <div className="card-5">
        <h3>Top Airports (Most Employees)</h3>
        <ul>
          {airportStats.mostEmployeesAirports.map((airport) => (
            <li key={airport.airportName}>
              {airport.airportName}: {airport.totalEmployees} Employees
            </li>
          ))}
        </ul>
        <hr />
        <h3>Top Airports (Least Employees)</h3>
        <ul>
          {airportStats.leastEmployeesAirports.map((airport) => (
            <li key={airport.airportName}>
              {airport.airportName}: {airport.totalEmployees} Employees
            </li>
          ))}
        </ul>
        <hr />
        <h3>Airports with No Employees</h3>
        <ul>
          {airportStats.noEmployeeAirports.length}
        </ul>
      </div>
    </div>
  );
}