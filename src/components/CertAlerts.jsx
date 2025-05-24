import React from "react";

export default function CertAlerts({ daysUntilExpiry }) {
  if (daysUntilExpiry === null || daysUntilExpiry > 30) {
    return (
      <div className="certificate-alert">
        <p>No alerts at this time.</p>
      </div>
    ); // Display a fallback message
  }

  return (
    <div className="certificate-alert">
      {daysUntilExpiry > 0 ? (
        <p>
          <strong>Alert:</strong> Your certificate is expiring in{" "}
          {daysUntilExpiry} days.
        </p>
      ) : (
        <p>
          <strong>Alert:</strong> Your certificate expired{" "}
          {Math.abs(daysUntilExpiry)} days ago.
        </p>
      )}
    </div>
  );
}
