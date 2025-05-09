import React from 'react'
import '../styles/components.css';

export default function IntroContent() {
    return (
        <div className="intro-content">
          <h1>Welcome to ICAO Certification Management</h1>
          <p>
            Track and manage ICAO English certifications for air traffic controllers and pilots.
          </p>
          <ul>
            <li>HR dashboards, reminders, and test scheduling.</li>
            <li>Upload documents and track expiry.</li>
            <li>Detailed user and certification statistics.</li>
          </ul>
        </div>
      )
}
