import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestSchedule({ tests, onReschedule }) {
  const nav = useNavigate();
  return (
    <div className="upcoming-tests">
      <h2>Test Schedule</h2>
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
      <button onClick={() => { nav(`/coming-soon`) }} >
        Schedule Test
      </button>
    </div>
  );
}