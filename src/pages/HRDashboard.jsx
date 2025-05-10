import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HRDashboard() {
  const navigate = useNavigate();

  return (
    <div className="hr-dashboard">
      <div className="dashboard-overview">
        <h1>HR Dashboard</h1>
        <div className="statistics">
          <div className="card">Statistics Card 1</div>
          <div className="card">Statistics Card 2</div>
          <div className="card">Statistics Card 3</div>
          <div className="card">Statistics Card 4</div>
        </div>
      </div>

      <div className="user-table-section">
        <h2>Users</h2>
        <div className="card">Statistics Card 5</div>
        <p>Manage user details and certifications here.</p>
        <button onClick={() => navigate('/users')}>Go to User Table</button>
      </div>

      <div className="airport-table-section">
        <h2>Airports</h2>
        <div className="card">Statistics Card 6</div>
        <p>View and manage airport details here.</p>
        <button onClick={() => navigate('/airports')}>Go to Airport Table</button>
      </div>
    </div>
  );
}
