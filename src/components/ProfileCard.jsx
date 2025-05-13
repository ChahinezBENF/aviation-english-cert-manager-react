import React from 'react'
import CertValidity from './CertValidity';

export default function ProfileCard({ user}) {

  const formatUTCDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: "numeric", month: "long", day: "numeric" }; 
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-card">
      <h2>Profile Information</h2>
      
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Airport:</strong> {user.airportCode}</p>
      <p><strong>Certification Level:</strong> {user.certification?.level || "N/A"}</p>
      <p><strong>Issued Date:</strong> {formatUTCDate(user.certification?.dateIssued) || "N/A"}</p>
      <p><strong>Expiry Date:</strong> {formatUTCDate(user.certification?.expiresOn) || "N/A"}</p>
      <p><strong>Statut:</strong> <CertValidity expiresOn={user.certification?.expiresOn} /> </p>

      {user.certification?.certificateUrl && (
        <div >
          <a
            href={user.certification.certificateUrl}
            target="_blank" rel="noopener noreferrer" >
            View Certification
          </a>
        </div>
      )}
    </div>
  );
}


