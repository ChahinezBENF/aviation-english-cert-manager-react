import React from "react";

export default function StatisticsCards2({ airportStats }) {
  return (
    <div className="statistics-cards-2">
      <div className="card-4">
        <h3>Total Airports</h3>
        <hr style={{ width: "50%", margin: "1rem auto" }} />
        <h2>{airportStats.totalAirports}</h2>
        <p>Includes all the airports in our system.</p>
      </div>

      <div className="card-5">
        <h3>Airport with Most Employees</h3>
        <ul>
          {airportStats.mostEmployeesAirports.map((airport) => (
            <li key={airport.airportName}>
              {airport.airportName} : {airport.totalEmployees} Employees
            </li>
          ))}
        </ul>
        <hr style={{ border: "1px solid #3a8dc7", margin: "1rem auto" }} />
        <h3>Airports with Least Employees </h3>
        <ul>
          {airportStats.leastEmployeesAirports.map((airport) => (
            <li key={airport.airportName}>
              {airport.airportName} : {airport.totalEmployees} Employees
            </li>
          ))}
        </ul>
        <hr style={{ border: "1px solid #3a8dc7", margin: "1rem auto" }} />
        <h3>Airports with No Employees :   {airportStats.noEmployeeAirports.length} </h3>
      </div>
    </div>
  );
}