import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import Calander from "../Ui/Calander";
import TimeSelector from "../Ui/TimeSelector";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addClassesData } from "../../Context/Action";
import ContestTypeDropDown from "../Ui/ContestTypeDropDow";
import InputField from "../Ui/InputField";
import {
  editContest,
  fetchClassData,
  fetchContestData,
  fetchContestDataById,
} from "../../ApiHandler/contestService";
import { fetchContestTypes } from "../../ApiHandler/GetContestType";
import { convertIstToUtc, convertUtcToIst } from '../../Utils/timeUtils';


export default function EditContest() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [contestTypeData, setContesTypeData] = useState([]);
  const [classData, setClassData] = useState([]);
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
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const contestFromRedux = useSelector(
    (state) => state.userConfig.editContestData
  );

  const [contestData, setContestData] = useState({
    contestId: "",
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
        endPlace: "1",
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
      totalSpots,
      fees,
      winningAmountPerFee,
      winnerPercentage,
      totalQuestions,
      totalTime,
      totalMarks,
      classesId,
      ranks,
    } = contestData;

    const isRanksEmpty = ranks.every(
      (rank) =>
        rank.startPlace === "" && rank.endPlace === 0 && rank.price === 0
    );

    return (
      name === "" &&
      contestTypeId === "" &&
      startDate === "" &&
      endDate === "" &&
      totalSpots === 0 &&
      fees === 0 &&
      winningAmountPerFee === 0 &&
      winnerPercentage === 0 &&
      totalQuestions === 0 &&
      totalTime === "" &&
      totalMarks === 0 &&
      classesId === "" &&
      isRanksEmpty
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(contestData);
  };

  const handleRankChange = (index, field, value) => {
    const updatedRanks = [...contestData.ranks];
    updatedRanks[index][field] = value;
    setContestData((prevData) => ({ ...prevData, ranks: updatedRanks }));
  };

  const handleAddRank = () => {
    setContestData((prevData) => ({
      ...prevData,
      ranks: [...prevData.ranks, { startPlace: "", price: 0}],
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
    const value = event.target.value;
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((id) => id !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const [startDate, setStartDate] = useState(contestData.startDate);
  const [endDate, setEndDate] = useState(contestData.endDate);
  const formatDate = (
    dateString,
    options = { year: "numeric", month: "2-digit", day: "2-digit" },
    locale = "en"
  ) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
    return date.toLocaleDateString(locale, options);
  };

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

  useEffect(() => {
    console.log(contestData);
  }, [contestData]);

  const getCombinedDate = (value) => {
    try {
      
      if (!value || !value.startDate || !value.endDate) {
        console.error("Invalid date values");
      }

      const startDateFormatted = formatDate(new Date(value.startDate));
      const endDateFormatted = formatDate(new Date(value.endDate));

      return `${startDateFormatted} - ${endDateFormatted}`;
    } catch (error) {
      console.error("Error formatting dates:", error.message);
      return null;
    }
  };

  const handleTimeRangeChange = (timerange) => {
    setTimeRange(timerange);
    setContestData((prevData) => ({
      ...prevData,
      totalTime: timerange,
    }));
  };

  const loadClassData = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset previous error

    try {
      const result = await fetchClassData(accessToken);
      if (result.success) {
        setClassData(result.data);
        console.log(result.data);

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

  const handleEditContest = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Fill up empty space");
      } else {
        const response = await editContest(contestData, accessToken);
        console.log(response);

        if (response.status === 200) {
          toast.success("Contest edited successfully");
          dispatch(addClassesData(response.data));
          loadClassData();
          navigate("/addContest");
        } else {
          console.error("Failed to edit contest: " + response);
        }
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred: " + error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getContesTypeData = async () => {
      try {
        const result = await fetchContestTypes(accessToken);

        if (result.success) {
          setContesTypeData(result.data);
        } else {
          setError(result.message || "Failed to fetch contest data");
        }
      } catch (err) {
        console.error("Error fetching contest data:", err);
        setError(
          err.message || "An error occurred while fetching contest data"
        );
      } finally {
        setLoading(false);
      }
    };
    // const getContesData = async () => {
    //   try {
    //     const result = await fetchContestDataById(
    //       accessToken,
    //       contestFromRedux?._id
    //     );

    //     if (result.success) {
    //       console.log(result.data);
    //     } else {
    //       setError(result.message || "Failed to fetch contest data");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching contest data:", err);
    //     setError(
    //       err.message || "An error occurred while fetching contest data"
    //     );
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    getContesTypeData();
    // getContesData();
  }, [accessToken]);

  useEffect(() => {
    if (contestFromRedux) {
      const getContesData = async () => {
        try {
          const result = await fetchContestDataById(
            accessToken,
            contestFromRedux?._id
          );

          setContestData({
            contestId: result._id || "",
            name: result.name || "",
            contestTypeId: result.contestTypeId || "",
            classesFees: result.classesFees || 0,
            startDate: result.startDate || "",
            endDate: result.endDate || "",
            totalSpots: result.totalSpots || 0,
            fees: result.fees || 0,
            winningAmountPerFee: result.winningAmountPerFee || 0,
            winnerPercentage: result.winnerPercentage || 0,
            ranks: result.ranks
              ? result.ranks.map((rank) => ({
                  startPlace: rank.startPlace || "",
                  endPlace: rank.endPlace || "1",
                  price: rank.price || 0,
                }))
              : [],
            totalQuestions: result.totalQuestions || 0,
            totalTime: result.totalTime || 0,
            totalMarks: result.totalMarks || 0,
            classesId: result.classesId || "",
          });

          setSelectedValues([result.classesId || ""]);

          if (result.startDate && result.endDate) {
            const combinedDate = getCombinedDate(result);
            setDateRange(combinedDate);
          } else {
            setDateRange("");
          }

          const matchedContestType = contestTypeData.find(
            (type) => type._id === result.contestTypeId
          );

          setSelectedContestType(matchedContestType || null);
        } catch (err) {
          console.error("Error fetching contest data:", err);
          setError(
            err.message || "An error occurred while fetching contest data"
          );
        } finally {
          setLoading(false);
        }
      };
      getContesData();
      // const {
      //   _id,
      //   name,
      //   contestTypeId,
      //   startDate,
      //   endDate,
      //   totalSpots,
      //   fees,
      //   winningAmountPerFee,
      //   winnerPercentage,
      //   ranks,
      //   totalQuestions,
      //   totalTime,
      //   totalMarks,
      //   classesId,
      // } = contestFromRedux;

      // setContestData({
      //   contestId: _id,
      //   name,
      //   contestTypeId,
      //   startDate,
      //   endDate,
      //   totalSpots,
      //   fees,
      //   winningAmountPerFee,
      //   winnerPercentage,
      //   ranks: ranks.map((rank) => ({
      //     startPlace: rank.startPlace || "",
      //     endPlace: rank.endPlace || "1",
      //     price: rank.price || 0,
      //   })),
      //   totalQuestions,
      //   totalTime,
      //   totalMarks,
      //   classesId,
      // });

      // setSelectedValues([classesId]);
      // if (startDate && endDate) {
      //   const combinedDate = getCombinedDate(contestFromRedux);
      //   setDateRange(combinedDate);
      // }
      // const matchedContestType = contestTypeData.find(
      //   (type) => type._id === contestTypeId
      // );

      // setSelectedContestType(matchedContestType || null);
    }
  }, [accessToken, contestFromRedux, contestTypeData]);

  useEffect(() => {
    loadClassData();
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-full overflow-y-auto p-4 space-y-6 rounded-lg border border-slate-300 font-sans">
        <div className="space-y-6 ">
          <div className="space-y-2">
            <p className="text-3xl tracking-tight font-medium text-left text-gray-900 dark:text-white capitalize">
              Contest Edit
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
                {className.map((option, index) => (
                  <div
                    key={index}
                    className="space-x-2 inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      value={option.id} // Use option.id, which corresponds to _id
                      checked={selectedValues.includes(option.id)} // Check if the current id is in selectedValues
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
                    maxLength="19"
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
                    placeholder="Choose starting/ending time"
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
                    value={contestData.totalTime}
                    onChange={(e) => setTimeRange(e.target.value)}
                    onClick={() => setTime(!time)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending time"
                    maxLength="19"
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
                        value={rank.startPlace}
                        onChange={(e) =>
                          handleRankChange(index, "startPlace", e.target.value)
                        }
                        placeholder="Rank"
                      />
                    </li>

                    <li className="space-y-1">
                      <InputField
                        value={rank.price}
                        onChange={(e) =>
                          handleRankChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Prize"
                        type="number"
                      />
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              <button
                onClick={handleAddRank}
                className="h-10 inline-flex items-center space-x-2 text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
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
            onClick={handleEditContest}
            className="inline-flex items-center space-x-2 rounded-lg px-8 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            <FaSave className="w-5 h-5" />
            <span>Save</span>
          </button>
        </div>
      </section>

      <div className={`${date === true ? "block" : "hidden"}`}>
        <Calander
          onChange={handleChange}
          confirm={date}
          onClose={handleDateshow}
          selected={dateRang}
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
          onChange={handleChange}
          confirm={date}
          onClose={handleTimeshow}
          selected={contestData.startDate}
          startDate={contestData.startDate}
          endDate={contestData.endDate}
          onChangeTimeRange={handleTimeRangeChange}
          onTimeRangeChange={handleTimeRangeChange}
          setConfirm={() => handleTimeshow()}
        />
      </div>
      <ToastContainer
        draggable={false}
        autoClose={2000}
        position={"top-center"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}
