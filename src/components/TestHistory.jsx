import React from 'react'

export default function TestHistory({ history }) {
   return (
     <div className="test-history">
      <h2>Test History</h2>

      {history.length > 0 ? (
        <ul>
          {history.map((test, index) => (
            <li key={test._id || index} className="mb-1">
              <span>{new Date(test.testDate).toLocaleDateString()}</span> - Level {test.resultLevel}
            </li>
          ))}
        </ul>
      ) : (
        <p>No test history available.</p>
      )}
    </div>

  );
}
