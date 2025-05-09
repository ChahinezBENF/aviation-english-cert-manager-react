import React from 'react';

export default function CertValidity({ expiresOn }) {


  if (!expiresOn) {
    return <span>No Certification</span>;
  }


 // Checks validity
  const isValid = new Date(expiresOn) > new Date(); 
  return (
    <span style={{ color: isValid ? 'green' : 'red' }}>
      {isValid ? 'Valid' : 'Expired'}
    </span>
  );
}
