import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { FiFilter } from "react-icons/fi";
// import Calander from "./Calander";

export default function FilterDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // const [filterType, setFilterType] = React.useState("day"); 
  // const [selectedDay, setSelectedDay] = React.useState("");
  // const [selectedWeek, setSelectedWeek] = React.useState("");
  // const [selectedMonth, setSelectedMonth] = React.useState("");

  // Handle opening the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  // Handle closing the menu
  const handleClose = () => {
    setOpen(false);
  };

  // Handle filter selection from the menu
  // const handleFilterSelection = (type) => {
  //   setFilterType(type);
  //   setOpen(false);
  // };

  // // Handlers for changing day, week, and month values
  // const handleDayChange = (event) => {
  //   setSelectedDay(event.target.value);
  // };

  // const handleWeekChange = (event) => {
  //   setSelectedWeek(event.target.value);
  // };

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(event.target.value);
  // };

  // const filterByDay = (data) => {
  //   const today = new Date();
  //   const startOfDay = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate()
  //   );
  //   const endOfDay = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + 1
  //   );

  //   return data.filter((item) => {
  //     const createdAt = new Date(item.createdAt);
  //     return createdAt >= startOfDay && createdAt < endOfDay;
  //   });
  // };
  // const filterByWeek = (data) => {
  //   const today = new Date();
  //   const weekStart = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() - today.getDay() + 1
  //   ); // Monday
  //   const weekEnd = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() - today.getDay() + 8
  //   ); // Next Monday

  //   return data.filter((item) => {
  //     const createdAt = new Date(item.createdAt);
  //     return createdAt >= weekStart && createdAt < weekEnd;
  //   });
  // };
  // const filterByMonth = (data) => {
  //   const today = new Date();
  //   const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  //   const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  //   return data.filter((item) => {
  //     const createdAt = new Date(item.createdAt);
  //     return createdAt >= monthStart && createdAt < monthEnd;
  //   });
  // };
  // const data = [
  //   // ...  data
  // ];

  // const dayWiseData = filterByDay(data);
  // console.log("Day-wise Data:", dayWiseData);

  // const weekWiseData = filterByWeek(data);
  // console.log("Week-wise Data:", weekWiseData);

  // const monthWiseData = filterByMonth(data);
  // console.log("Month-wise Data:", monthWiseData);

  return (
    // <div className="filter-container">
    //   <div className="flex ">
    //     <Button
    //       aria-controls={open ? "demo-positioned-menu" : undefined}
    //       aria-haspopup="true"
    //       aria-expanded={open ? "true" : undefined}
    //       onClick={handleClick}
    //       variant="contained"
    //       color="primary"
    //       startIcon={<FiFilter />}
    //       className="inline-flex items-center space-x-2 rounded-lg text-md"
    //     >
    //       <p className="font-semibold text-white">Filter</p>
    //     </Button>

    //     {/* Menu for selecting filter type */}
    //     <Menu
    //       id="demo-positioned-menu"
    //       anchorEl={anchorEl}
    //       open={open}
    //       onClose={handleClose}
    //       MenuListProps={{
    //         "aria-labelledby": "basic-button",
    //       }}
    //     >
    //       <MenuItem onClick={() => handleFilterSelection("day")}>
    //         Day wise
    //       </MenuItem>
    //       <MenuItem onClick={() => handleFilterSelection("week")}>
    //         Week wise
    //       </MenuItem>
    //       <MenuItem onClick={() => handleFilterSelection("month")}>
    //         Month wise
    //       </MenuItem>
    //     </Menu>

    //     {/* Conditional Rendering based on Filter Type */}
    //     <div className="filter-input">
    //       {filterType === "day" && (
    //         <div>
    //           <h3 className="text-xl font-medium">Choose Day</h3>
    //           <TextField
    //             type="date"
    //             value={selectedDay}
    //             onChange={handleDayChange}
    //             fullWidth
    //             variant="outlined"
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //           />
    //         </div>
    //       )}

    //       {filterType === "week" && (
    //         <div>
    //           <h3 className="text-xl font-medium">Choose Week</h3>
    //           <TextField
    //             type="week"
    //             value={selectedWeek}
    //             onChange={handleWeekChange}
    //             fullWidth
    //             variant="outlined"
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //           />
    //         </div>
    //       )}

    //       {filterType === "month" && (
    //         <div>
    //           <h3 className="text-xl font-medium">Choose Month</h3>
    //           <TextField
    //             type="month"
    //             value={selectedMonth}
    //             onChange={handleMonthChange}
    //             fullWidth
    //             variant="outlined"
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //           />
    //         </div>
    //       )}
    //     </div>

    //     {/* Display the selected filter */}
    //     <div className="mt-4">
    //       <h3 className="text-lg font-semibold">Selected Filter:</h3>
    //       {filterType === "day" && selectedDay && (
    //         <p>Selected Day: {selectedDay}</p>
    //       )}
    //       {filterType === "week" && selectedWeek && (
    //         <p>Selected Week: {selectedWeek}</p>
    //       )}
    //       {filterType === "month" && selectedMonth && (
    //         <p>Selected Month: {selectedMonth}</p>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="inline-flex items-center space-x-2 rounded-lg text-md text-center bg-orange-500 hover:bg-opacity-90 "
      >
        <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
          <FiFilter />
        </svg>
        <p className=" font-semibold text-white">Filter</p>
      </Button>
      <div className="flex">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Day wise</MenuItem>
          <MenuItem onClick={handleClose}>Week wise</MenuItem>
          <MenuItem onClick={handleClose}>Month wise</MenuItem>
        </Menu>
      </div>
    </>
  );
}
