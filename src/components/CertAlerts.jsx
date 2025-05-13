import React from 'react'

export default function CertAlerts({ daysUntilExpiry }) {
  if (daysUntilExpiry > 30 || daysUntilExpiry === null) {
    return null; // No alert if more than 30 days remain
  }

  return (
    <div className="certificate-alert">
      {daysUntilExpiry > 0 ? (
        <p><strong>Alert:</strong> Your certificate is expiring in {daysUntilExpiry} days.</p>
      ) : (
        <p><strong>Alert:</strong> Your certificate expired {Math.abs(daysUntilExpiry)} days ago.</p>
      )}
    </div>

  );
}
