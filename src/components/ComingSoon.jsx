import React from 'react';
import { useNavigate } from "react-router-dom";
import HeaderLogout from '../components/HeaderLogout';

export default function ComingSoon() {
  const nav = useNavigate();

  return (
    <div><HeaderLogout/>
    <div className="coming-soon">
      
      <div className="coming-soon-container">
        <h2>Coming Soon</h2>
        <p>This feature is currently under development. Stay tuned for updates!</p>
        <button onClick={() => nav(-1)} className="go-back-button">
          Go Back
        </button>
      </div>
    </div>
  </div>
  );
}
