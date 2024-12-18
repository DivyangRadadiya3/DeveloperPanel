import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const TimeSelector = ({
  onClose,
  startDate,
  endDate,
  onTimeRangeChange,
  setConfirm,
}) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalDuration, setTotalDuration] = useState("");

  // Ensure that startDate and endDate are Day.js objects
  const startDayJs = dayjs(startDate);
  const endDayJs = dayjs(endDate);

  // Calculate Duration in minutes
  const calculateDuration = (start, end) => {
    if (!start || !end) {
      console.error("Start and End times are required for duration calculation.");
      setTotalDuration(""); // Reset if any time is missing
      return;
    }

    // Ensure the start time is not after the end time
    if (start.isAfter(end)) {
      console.error("Start time cannot be after End time");
      setTotalDuration("");
      return;
    }

    // Calculate duration in minutes
    const duration = end.diff(start, "minute");

    if (duration < 0) {
      console.error("Invalid duration: start time is after end time");
      setTotalDuration("");
      return;
    }

    // Calculate hours and minutes from duration
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const durationString = `${hours}h ${minutes}m`;
    setTotalDuration(durationString);
  };

  // Handle start time change
  const handleStartTimeChange = (newStartTime) => {
    if (!newStartTime || !startDayJs) return;

    const newStart = startDayJs.set("hour", newStartTime.hour()).set("minute", newStartTime.minute());

    setStartTime(newStart);
    // Only calculate duration when both start and end times are available
    if (endTime) {
      calculateDuration(newStart, endTime);
    }
  };

  // Handle end time change
  const handleEndTimeChange = (newEndTime) => {
    if (!newEndTime || !endDayJs) return;

    const newEnd = endDayJs.set("hour", newEndTime.hour()).set("minute", newEndTime.minute());

    setEndTime(newEnd);
    // Only calculate duration when both start and end times are available
    if (startTime) {
      calculateDuration(startTime, newEnd);
    }
  };

  // Handle Save Button
  const handleSave = () => {
    if (!startTime || !endTime) {
      console.error("Start and End times are required to save.");
      return;
    }

    setConfirm();
    onTimeRangeChange(totalDuration);
  };

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={onClose}
            ></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-4 p-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-xl md:max-w-3xl">
            <div className="relative space-y-4 w-full flex flex-col items-center rounded-xl p-4 overflow-hidden text-slate-700 bg-white bg-clip-border">
              <div className="w-full flex items-center text-nowrap">
                <p className="text-md w-full font-semibold text-slate-900 uppercase">
                  Start Time
                </p>
                <p className="text-md w-full font-semibold text-slate-900 uppercase">
                  End Time
                </p>
              </div>
              <div className="flex items-center justify-around border-t border-gray-600 w-full py-4">
                {/* Start Time */}
                <div className="border border-gray-400 rounded-lg p-2 space-y-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={startTime}
                      onChange={handleStartTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          className="border rounded p-2"
                          label="Start Time"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                {/* End Time */}
                <div className="border border-gray-400 rounded-lg space-y-4 p-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={endTime}
                      onChange={handleEndTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          className="border rounded p-2"
                          label="End Time"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              {totalDuration && (
                <div className="text-lg font-semibold">
                  Total Duration: {totalDuration}
                </div>
              )}
              <button
                onClick={handleSave}
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-24 max-w-md text-md font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimeSelector;
