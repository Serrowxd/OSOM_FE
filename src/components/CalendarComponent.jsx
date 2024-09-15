import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarComponent({ tasks }) {
  const [value, onChange] = useState(new Date());

  // Create a list of dates with tasks
  const dueDates = tasks
    .filter((task) => task.dueDate)
    .map((task) => new Date(task.dueDate).toDateString());

  // Function to add custom class to dates with tasks
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (dueDates.includes(date.toDateString())) {
        return "highlight";
      }
    }
  };

  return (
    <div className="h-full flex flex-col text-white">
      <h2 className="text-xl font-semibold p-2">Calendar</h2>
      <div className="flex-1">
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
