
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ScheduleTestCalendar() {
  const [selectedDate, setSelectedDate] = useState(""); // Default empty string for input compatibility
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

 const handleDateSelection = () => {
  if (selectedDate) {
    navigate(`/controller-dashboard/${userId}`, { state: { testDate: selectedDate } });
  } else {
    alert("Please select a date.");
  }
};

  return (
    <div className="schedule-test-calendar">
      <h2>Select a Test Date</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleDateSelection}>Confirm Date</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
