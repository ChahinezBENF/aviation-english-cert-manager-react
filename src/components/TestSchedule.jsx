import React from "react";
import { useNavigate } from "react-router-dom";

export default function TestSchedule({ tests, userId, onCancel }) {
  const navigate = useNavigate();

  return (
    <div className="upcoming-tests">
      <h2>Test Schedule</h2>
      {tests.length > 0 ? (
        <ul>
          {tests.map((test) => (
            <li key={test._id}>
              <span>{new Date(test.testDate).toLocaleDateString()}</span>
              <button onClick={() => onCancel(test._id)}>Cancel</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming tests scheduled.</p>
      )}
      <button onClick={() => navigate("/schedule-test", { state: { userId } })}>
        Schedule Test
      </button>
    </div>
  );
}
