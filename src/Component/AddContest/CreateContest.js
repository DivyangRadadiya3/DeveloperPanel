import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import InputField from "../Ui/InputField";
import Calander from "../Ui/Calander";
import TimeSelector from "../Ui/TimeSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { addClassesData } from "../../Context/Action";
import {
  addNewContest,
  fetchClassData,
  fetchContestData,
} from "../../ApiHandler/contestService";
import ContestTypeDropDown from "../Ui/ContestTypeDropDow";
import { fetchContestTypes } from "../../ApiHandler/GetContestType";

export default function CreateContest() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [contestTypeData, setContesTypeData] = useState([]);
  const [date, setDate] = useState(false);
  const [dateRang, setDateRange] = useState("");
  const [time, setTime] = useState(false);
  const [timeRang, setTimeRange] = useState("");
  function handleDateshow() {
    setDate(!date);
  }
  function handleTimeshow() {
    setTime(!time);
  }

  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState([]);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const [contestData, setContestData] = useState({
    name: "",
    contestTypeId: "",
    startDate: "",
    endDate: "",
    classesFees: 0,
    totalSpots: 0,
    fees: 0,
    winningAmountPerFee: 0,
    winnerPercentage: 0,
    ranks: [
      {
        startPlace: "",
        price: 0,
      },
    ],
    totalQuestions: 0,
    totalTime: "",
    totalMarks: 0,
    classesId: "",
  });

  const isEmpty = () => {
    const {
      name,
      contestTypeId,
      startDate,
      endDate,
      classesFees,
      totalSpots,
      fees,
      winningAmountPerFee,
      winnerPercentage,
      totalQuestions,
      classesId,
      ranks,
    } = contestData;

    const isRanksEmpty = ranks.every(
      (rank) => rank.startPlace === "" && rank.price === 0
    );

    if (
      (name === "" &&
        contestTypeId === "" &&
        startDate === "" &&
        endDate === "" &&
        !/^\d+$/.test(classesFees.toString())) ||
      classesFees === 0 ||
      (classesFees === "" && !/^\d+$/.test(totalSpots.toString())) ||
      totalSpots === 0 ||
      fees === 0 ||
      (fees === "" && !/^\d+$/.test(winningAmountPerFee.toString())) ||
      winningAmountPerFee === 0 ||
      winnerPercentage === 0 ||
      (winnerPercentage === "" && !/^\d+$/.test(totalQuestions.toString())) ||
      (classesId === "" && isRanksEmpty)
    ) {
      return true;
    }

    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRankChange = (index, field, value) => {
    const updatedRanks = [...contestData.ranks];
    updatedRanks[index][field] = value;
    setContestData((prevData) => ({ ...prevData, ranks: updatedRanks }));
  };

  const handleAddRank = () => {
    setContestData((prevData) => ({
      ...prevData,
      ranks: [...prevData.ranks, { startPlace: "", price: 0 }],
    }));
  };

  const [selectedContestType, setSelectedContestType] = useState("");
  const handleContestType = (event) => {
    const { _id } = event.target.value;
    setSelectedContestType(event.target.value);
    setContestData((prevData) => ({
      ...prevData,
      contestTypeId: _id,
    }));
  };

  const className = classData.map((classItem) => ({
    id: classItem._id,
    label: classItem.name,
  }));

  const [selectedValues, setSelectedValues] = useState([]);
  const handleCheckboxChange = (event) => {
    const value = event.target.id;

    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((v) => v !== value);
      } else {
        return [...prevSelectedValues, value];
      }
    });
    setContestData((prevData) => ({
      ...prevData,
      classesId: value,
    }));
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleDateRangeChange = (start, end, dateRang) => {
    setStartDate(start);
    setEndDate(end);
    setDateRange(dateRang);

    setContestData((prevData) => ({
      ...prevData,
      startDate: start,
      endDate: end,
    }));
  };
  const handleTimeRangeChange = (timerange) => {
    setTimeRange(timerange);
    setContestData((prevData) => ({
      ...prevData,
      totalTime: timerange,
    }));
  };

  useEffect(() => {
    console.log(contestData);
  }, [contestData]);

  const handleAddContest = async () => {
    try {
      setLoading(true);
      if (isEmpty()) {
        toast.warning("Fill up empty space");
        setLoading(false);
      } else {
        const result = await addNewContest(contestData, accessToken);
        setLoading(false);
        if (result.success) {
          navigate("/addContest");
          toast.success("Contest added successfully");
          loadClassData();
          dispatch(addClassesData(result.data));
        } else {
          toast.error("Failed to add contest: " + result.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      console.error("An error occurred: " + error.message);
      toast.error("An error occurred: " + error.message);
    }
  };

  // const handleAddContest = async () => {
  //   try {
  //     if (isEmpty()) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       const response = await addNewContest(contestData, accessToken);
  //       if (response.status === 200) {
  //         navigate("/addContest");
  //         toast.success("Contest added successfully");
  //         loadClassData();
  //         dispatch(addClassesData(response.data));
  //         toast.error("Failed to add contest: " + response.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     console.error("An error occurred: " + error.message);
  //   }
  // };

  const loadClassData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchClassData(accessToken);
      if (result.success) {
        console.log(result.data);

        setClassData(result.data);
        setLoading(false);
      } else {
        console.error("Error loading class data:", result.message);
      }
    } catch (error) {
      console.error("Error loading class data:", error);
      setError(error.message || "An error occurred while loading class data");
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const getContestData = async () => {
      try {
        const result = await fetchContestTypes(accessToken);

        if (result && result.success) {
          setContesTypeData(result.data);
          setLoading(false); // Stop loading
        } else {
          setError("No data available or invalid response structure.");
        }
      } catch (err) {
        console.error("Error fetching contest data:", err);
        setError(
          err.message || "An error occurred while fetching contest data"
        );
        setLoading(false); // Stop loading
      }
    };

    getContestData();
  }, [accessToken]);

  useEffect(() => {
    loadClassData();
  }, [accessToken]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900  p-4 space-y-6 rounded-lg border border-slate-300 font-sans">
        <div className="space-y-6 ">
          <div className="space-y-2">
            <p className="text-3xl tracking-tight font-medium text-left text-gray-900 dark:text-white capitalize">
              Contest Creation
            </p>
            <p className="text-lg font-normal text-left text-slate-700 dark:text-white">
              Manage your contests easily from here.
            </p>
          </div>
          <div className="space-y-6 px-2">
            <div className="space-y-2 w-full">
              <p className="flex items-center capitalize text-xl font-medium text-slate-800 dark:text-white">
                Classes Name
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 2xl:grid-cols-4 2xl:gap-4 text-sm font-medium text-gray-900 text-start dark:text-white">
                {className.map((option) => (
                  <div
                    key={option.id}
                    className="space-x-2 inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      value={option._id}
                      checked={selectedValues.includes(option.id)}
                      onChange={handleCheckboxChange}
                      id={option.id}
                    />
                    <label
                      htmlFor={option.id}
                      className="gap-2 py-3 text-base text-nowrap font-normal capitalize text-slate-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-4 2xl:grid-cols-4 2xl:gap-6">
                <li className="space-y-1">
                  <label
                    htmlFor="name"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Contest Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter contest name"
                    value={contestData.name}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="type"
                    className="capitalize text-base font-medium text-slate-800 dark:text-white"
                  >
                    Contest Type
                  </label>

                  <ContestTypeDropDown
                    contestTypeData={contestTypeData}
                    onHandleChange={handleContestType}
                    value={selectedContestType}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="dateRange"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Contest Starting/Ending Date
                  </label>
                  <input
                    type="text"
                    id="dateRange"
                    name="dateRange"
                    value={dateRang}
                    onChange={(e) => setDateRange(e.target.value)}
                    onClick={() => setDate(!date)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending date"
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="timeRange"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Contest Starting/Ending Time
                  </label>
                  <input
                    type="text"
                    id="timeRange"
                    name="timeRange"
                    value={timeRang}
                    onChange={(e) => setTimeRange(e.target.value)}
                    onClick={() => setTime(!time)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending time"
                  />
                </li>
              </ul>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="classesFees"
                className="capitalize text-base font-medium text-gray-700 dark:text-white"
              >
                classesFees
              </label>
              <input
                type="number"
                id="classesFees"
                name="classesFees"
                className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder="Enter classes fee "
                value={contestData.classesFees}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3">
              <p className="text-xl tracking-tight font-medium text-left text-gray-700 dark:text-white capitalize">
                Participation and Rewards
              </p>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 2xl:grid-cols-4 2xl:gap-6">
                <li className="space-y-1">
                  <label
                    htmlFor="totalSpots"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Total Spots
                  </label>
                  <input
                    type="number"
                    id="totalSpots"
                    name="totalSpots"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Total Spots"
                    value={contestData.totalSpots}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="fees"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Fees
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Fees"
                    value={contestData.fees}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="winningAmountPerFee"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Winning Amount Per Fee
                  </label>
                  <input
                    type="number"
                    id="winningAmountPer Fee"
                    name="winningAmountPerFee"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winning amount per fee"
                    value={contestData.winningAmountPerFee}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="winnerPercentage"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Winner Percentage
                  </label>
                  <input
                    type="number"
                    id="winnerPercentage"
                    name="winnerPercentage"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winner percentage"
                    value={contestData.winnerPercentage}
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xl font-medium text-left text-gray-800 dark:text-white capitalize">
              Rank Section
            </p>
            <div className="flex items-center justify-between">
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2">
                {contestData.ranks.map((rank, index) => (
                  <React.Fragment key={index}>
                    <li className="space-y-1">
                      <InputField
                        value={rank.startPlace} // Pass the current startPlace value
                        onChange={
                          (e) =>
                            handleRankChange(
                              index,
                              "startPlace",
                              e.target.value
                            ) // Pass the change handler
                        }
                        placeholder="Rank"
                        name={`startPlace-${index}`} // Optional: Unique name for accessibility
                      />
                    </li>
                    <li className="space-y-1">
                      <InputField
                        value={rank.price} // Pass the current price value
                        onChange={
                          (e) =>
                            handleRankChange(
                              index,
                              "price",
                              Number(e.target.value)
                            ) // Pass the change handler
                        }
                        placeholder="Prize"
                        type="number" // Assuming price is a number
                        name={`price-${index}`} // Optional: Unique name for accessibility
                      />
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              <button
                onClick={handleAddRank}
                className="h-10 inline-flex items-center space-x-2 text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FaPlus />
                </svg>
                <p className="font-semibold">Add More Rank</p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-t border-gray-400 py-2">
          <button
            onClick={handleAddContest}
            className="inline-flex items-center space-x-2 rounded-lg px-10 py-2 text-lg text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
          >
            <FaSave className="mr-2" />
            Save
          </button>
        </div>
      </section>

      <div className={`${date === true ? "block" : "hidden"}`}>
        <Calander
          onChange={handleChange}
          confirm={date}
          onClose={handleDateshow}
          selected={startDate}
          onChangeStartdate={(date) => {
            setStartDate(date);
            setContestData((prevData) => ({
              ...prevData,
              startDate: date,
            }));
          }}
          onChangeEnddate={(date) => {
            setEndDate(date);
            setContestData((prevData) => ({
              ...prevData,
              endDate: date,
            }));
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      <div className={`${time === true ? "block" : "hidden"}`}>
        <TimeSelector
          onChange={handleDateRangeChange} // Your function for handling date range change
          confirm={date} // The selected date range for confirmation
          onClose={handleTimeshow} // Your function to close the time selector
          selected={startDate} // The selected start date
          startDate={startDate} // The start date prop
          endDate={endDate} // The end date prop
          onChangeTimeRange={handleTimeRangeChange} // The function to handle time range change
          onTimeRangeChange={handleTimeRangeChange} // The function to handle time range change
          setConfirm={() => handleTimeshow()} // Function to confirm time selection
        />
      </div>
      <ToastContainer
        draggable={false}
        autoClose={2000}
        position={"top-right"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}
