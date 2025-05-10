import React from 'react';

export default function TestSchedule({ tests, onReschedule }) {
  return (
    <div className="upcoming-tests">
      <h2>Upcoming Test Dates</h2>
      {tests.length > 0 ? (
        <ul>
          {tests.map((test) => (
            <li key={test._id}>
              <span>{new Date(test.testDate).toLocaleDateString()}</span>
              <button onClick={() => onReschedule(test._id)}>Reschedule</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming tests scheduled.</p>
      )}
    </div>
  );
}