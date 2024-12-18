import React, { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNewSubTopic } from "../../ApiHandler/subjectServiceApi";

export default function AddSubTopic({ onClose }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [input, setInput] = useState({
    name: "",
  });
  const { name } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  // const addSubtopic = async () => {
  //   try {
  //     if (!name) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       let data = JSON.stringify(input);

  //       let config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url: "https://api-bef.hkdigiverse.com/sub-topic/add",
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };

  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log(response.data);
  //           toast.success("Subtopic add");
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (!name) {
        toast.warning("Fill up empty space");
      } else {
        const result = await addNewSubTopic(input, accessToken);
        if (result.success) {
          console.log("success", result.data);
          navigate("/subject");
        } else {
          console.error("Failed to add subject:", result.message);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    handleSubmit();
    if (onClose) {
      if (!name) {
        toast.warning("Fill up empty space");
      } else {
        onClose();
      }
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
            <h3 className="text-2xl text-center w-full font-semibold text-slate-800">
              Add New Sub-topic
            </h3>

            <div className="grid grid-cols-1 space-y-2 ">
              <label
                htmlFor="subject"
                className="text-gray-700 font-medium dark:text-gray-200"
              >
                Subtopic
              </label>
              <input
                className="text-base p-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                type="text"
                id="subject"
                placeholder="Enter subtopic name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
                onClick={handleClick}
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <VscSaveAs />
                </svg>
                <p className="font-semibold">save</p>
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
