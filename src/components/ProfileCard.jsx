import React from 'react'

export default function ProfileCard({ user}) {
  return (
    <div className="profile-card">
      <h2>Profile Information</h2>
      
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Airport:</strong> {user.airportCode}</p>
      <p><strong>Certification Level:</strong> {user.certification?.level || "N/A"}</p>
      <p><strong>Expiry Date:</strong> {user.certification?.expiresOn || "N/A"}</p>

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
