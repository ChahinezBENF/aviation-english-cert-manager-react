import React from 'react'
import { Link } from 'react-router-dom';

//Import Styling
import '../styles/components.css';

export default function Header() {
    return (
        <header className="header">
          <nav >
            <div >
              <Link to="/">ICAO Certification System</Link>
            </div>
            <div >
              <Link to="/login">Login</Link>
              <Link to="/hr-dashboard" >HR Dashboard</Link>
              <Link to="/controller-dashboard" >Controller Dashboard</Link>
              <Link to="/statistics" >Statistics</Link>
              <Link to="/test-scheduling" >Test Scheduling</Link>
              <Link to="/profile" >Profile</Link>
            </div>
          </nav>
        </header>
      )
}
