import React, { useState } from 'react';

function DemoFilter() {
  // State to manage the selected filter type
  const [filterType, setFilterType] = useState('day');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Handler for filter type change
  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  // Handler for day selection
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // Handler for week selection
  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  // Handler for month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="App">
      <h2>Choose Filter Type</h2>
      
      {/* Filter Type Dropdown */}
      <select value={filterType} onChange={handleFilterTypeChange}>
        <option value="day">Day Wise</option>
        <option value="week">Week Wise</option>
        <option value="month">Month Wise</option>
      </select>

      {/* Day Wise Filter */}
      {filterType === 'day' && (
        <div>
          <h3>Choose Day</h3>
          <input
            type="date"
            value={selectedDay}
            onChange={handleDayChange}
          />
        </div>
      )}

      {/* Week Wise Filter */}
      {filterType === 'week' && (
        <div>
          <h3>Choose Week</h3>
          <input
            type="week"
            value={selectedWeek}
            onChange={handleWeekChange}
          />
        </div>
      )}

      {/* Month Wise Filter */}
      {filterType === 'month' && (
        <div>
          <h3>Choose Month</h3>
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
        </div>
      )}

      {/* Display Selected Filter */}
      <div>
        <h3>Selected Filter:</h3>
        {filterType === 'day' && selectedDay && (
          <p>Selected Day: {selectedDay}</p>
        )}
        {filterType === 'week' && selectedWeek && (
          <p>Selected Week: {selectedWeek}</p>
        )}
        {filterType === 'month' && selectedMonth && (
          <p>Selected Month: {selectedMonth}</p>
        )}
      </div>
    </div>
  );
}

export default DemoFilter;
