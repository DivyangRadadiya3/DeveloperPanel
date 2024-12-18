import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bannerDataList, updateImageData } from "../../Context/Action/index"; // Adjust the import based on your file structure
import Pagination from "../Pagination/Pagination"; // Ensure you have a Pagination component
import ImgUpdatePage from "./ImgUpdatePage"; // Ensure you have this component
import AddImagePage from "./AddImagePage"; // Ensure you have this component
import { FaPlus } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BannerData({ home }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const DataList = useSelector((state) => state.userConfig.bannerDataList);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
  const totalPages = Math.ceil(home.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  useEffect(() => {
    setDataToDisplay(home.slice(start, end));
  }, [currentPage, end, home, start]);

  const handleToggleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const handleDataUpdate = (value) => {
    dispatch(updateImageData(value));
    handleToggleUpdate();
  };

  return (
    <>
      <div className="mx-auto space-y-6">
        {/* Home Banner */}
        <div className="relative w-full flex flex-col items-center rounded-t-xl overflow-hidden text-slate-700 bg-white bg-clip-border">
          <div className="flex items-center justify-between gap-2 px-4 py-2 w-full">
            <h3 className="text-2xl text-left font-semibold text-slate-800">
              Home Banner
            </h3>
            <button
              onClick={handleToggleAdd}
              className="h-10 inline-flex items-center space-x-2 text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
            >
              <FaPlus className="font-bold text-white w-4 h-4" />
              <p className="font-semibold">Create New Contest</p>
            </button>
          </div>
          <div className="w-full overflow-auto px-0 rounded-md">
            <table className="w-full min-w-max table-auto text-left bg-white">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      S/N
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Image
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((value, index) => (
                  <tr key={value._id}>
                    <td className="p-4 w-[50px]">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </p>
                    </td>
                    <td className="p-4 overflow-hidden text-wrap max-w -xs">
                      <img
                        src={value.image}
                        alt={`${index + 1}`}
                        className="w-42 mx-auto h-30"
                      />
                    </td>
                    <td className="p-4 w-[40px] text-center">
                      <button
                        className="relative h-10 w-10 select-none rounded-lg text-md align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleDataUpdate(value)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <LuPencilLine className="w-6 h-6" />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {toggleUpdate && (
        <ImgUpdatePage confirm={toggleUpdate} onClose={handleToggleUpdate} />
      )}
      {toggleAdd && (
        <AddImagePage confirm={toggleAdd} onClose={handleToggleAdd} />
      )}
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

export default BannerData;
