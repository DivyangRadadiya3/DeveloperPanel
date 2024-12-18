import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

export default function Calendar({
  onDateRangeChange,
  selectedStartDate,
  selectedEndDate,
  onClose,
}) {
  const today = dayjs();

  const [startDate, setStartDate] = useState(
    selectedStartDate || today || null
  );
  const [endDate, setEndDate] = useState(selectedEndDate || today || null);
  const handleSave = () => {
    if (startDate && endDate) {
      const DateRang = `${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(
        endDate
      ).format("DD/MM/YYYY")}`;

      onDateRangeChange(startDate, endDate, DateRang);
      onClose();
    }
  };

  return (
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
            <div className="flex items-center justify-around border-t border-gray-600 w-full py-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex flex-col items-center">
                  <label className="mb-2">Start Date</label>
                  <DateCalendar
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    minDate={today}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="mb-2">End Date</label>
                  <DateCalendar
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    minDate={today}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <button
              onClick={handleSave}
              disabled={!startDate || !endDate}
              type="button"
              className="py-2 px-24 max-w-md text-md font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// export default function Calander({ onDateRangeChange }) {
//   const [value, setValue] = useState(dayjs("2022-04-17"));
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleSave = () => {
//     onDateRangeChange({ value });
//   };

//   return (
//     <>
//       <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
//         <div className="flex items-center justify-center min-h-screen text-center sm:block">
//           <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//           </div>
//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>

//           <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-4 p-4  text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-xl md:max-w-3xl">
//             <div className="relative space-y-4 w-full flex flex-col items-center rounded-xl p-4 overflow-hidden text-slate-700 bg-white  bg-clip-border">
//               <div className="flex items-center  justify-around border-t border-gray-600 w-full py-4">
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DemoItem label="Start Date">
//                     <DateCalendar
//                       value={startDate}
//                       onChange={(newValue) => setValue(newValue)}
//                       renderDay={(date, selectedDates, pickersDayProps) => {
//                         const isStart =
//                           startDate &&
//                           date.toDateString() === startDate.toDateString();
//                         const isInRange =
//                           startDate &&
//                           endDate &&
//                           date > startDate &&
//                           date < endDate;
//                       }}
//                     />
//                   </DemoItem>
//                 </LocalizationProvider>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DemoItem label="End Date">
//                     <DateCalendar
//                       value={endDate}
//                       onChange={(newValue) => setValue(newValue)}
//                     />
//                   </DemoItem>
//                 </LocalizationProvider>
//               </div>
//               <button
//                 onClick={handleSave}
//                 // disabled={!startDate || !endDate}
//                 data-modal-toggle="deleteModal"
//                 type="button"
//                 className="py-2 px-24 max-w-md text-md font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// slotProps={{ calendarHeader: { format: "DD/MM/YYYY" } }}
// onChange={handleDateClick}
// value={startDate || endDate}
// renderDay={(date, selectedDates, pickersDayProps) => {
//   const isStart =
//     startDate &&
//     date.toDateString() === startDate.toDateString();
//   const isInRange =
//     startDate &&
//     endDate &&
//     date > startDate &&
//     date < endDate;

//   return (
//     <div
//       style={{
//         backgroundColor: isStart
//           ? "lightblue"
//           : isInRange
//           ? "lightyellow"
//           : "transparent",
//         borderRadius: "50%",
//       }}
//     >
//       <Button {...pickersDayProps}>
//         {date.getDate()}
//       </Button>
//     </div>
//   );
// }}
