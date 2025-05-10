import React from 'react'

export default function CertAlerts({ daysUntilExpiry }) {
  if (daysUntilExpiry > 30) {
    return null; // No alert if more than 30 days remain
  }

  return (
    <div className="certificate-alert">
      <p>
        <strong>Alert:</strong> Your certificate is expiring in {daysUntilExpiry} days.
      </p>
    </div>
  );
}
