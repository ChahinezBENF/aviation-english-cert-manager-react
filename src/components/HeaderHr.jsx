import React from 'react'
import  { useState } from 'react';
import { Link } from 'react-router-dom';

//Import Styling
import '../styles/components.css';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

return (
    <header className="header">
      <nav>
        <div>
          <Link to="/">ICAO Certification System</Link>
        </div>
        <div>
          <Link to="/hr-dashboard">Dashboard</Link>
          <Link to="/statistics">Statistics</Link>

          <div className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <Link to="#">Lists</Link>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/users">Employees</Link>
                <Link to="/airports">Airports</Link>
              </div>
            )}
          </div>

          <Link to="/login">Log out</Link>
        </div>
      </nav>
    </header>
  );

}
