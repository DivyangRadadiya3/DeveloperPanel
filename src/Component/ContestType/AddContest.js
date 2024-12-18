import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import MultipleSelect from "../Ui/MultiSelection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AddContest({ onClose }) {
  // const navigate = useNavigate();
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const [input, setInput] = useState({
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const isEmpty = () => {
    if (input.name === "") {
      return true;
    }
    return false;
  };

  const AddNewContestType = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Fill up empty space");
      } else {
        let userData = JSON.stringify(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/contest-type/add",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: userData,
        };
        const response = await axios.request(config);

        const { status, data, message, error } = response.data;

        if (response.data.status === 200) {
          console.log("Backend response", data);
          toast.success("Contest type added successfully");
          onClose();
        } else {
          console.warn("contest add failed:", error);
        }
      }
    } catch (err) {
      console.error("Error add contest:", err.message);
    }
  };

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out ">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          <div className="inline-block mx-auto w-full  bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-5xl md:max-w-2xl">
            <div className="text-left">
              <h3 className="text-2xl text-left w-full font-semibold text-slate-800">
                Add Content Type
              </h3>
            </div>
            <div className="grid grid-cols-1 space-y-2 w-full">
              <label
                htmlFor="content"
                className="capitalize text-base font-medium text-gray-700 dark:text-white"
              >
                content name
              </label>
              <input
                className="w-full text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
                type="text"
                id="content"
                placeholder="Enter content name"
                onChange={(e) => handleChange(e)}
                name="name"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
                onClick={AddNewContestType}
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <VscSaveAs />
                </svg>
                <p className="font-semibold">save details</p>
              </button>
            </div>
          </div>
        </div>
      </section>

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
