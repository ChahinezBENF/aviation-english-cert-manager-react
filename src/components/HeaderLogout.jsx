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
              <Link to="/login">Log out</Link>
            </div>
          </nav>
        </header>
      )
}
