import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { imgUpload } from "../../ApiHandler/updateImage";
import { AddNewQuestion } from "../../ApiHandler/InformationApi";
import Loading from "../Loader/Loading";

export default function AddIntroduction({ setConfirm }) {
  const navigate = useNavigate();

  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);
  const [addNewData, setAddNewData] = useState({
    title: "",
    link: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      handleUpload(files[0]);
    } else {
      setAddNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpload = (value) => {
    handleFileChange(value);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true); // Set loading to true when starting the upload
      setError(null); // Reset any previous error

      try {
        await imgUpload(file, accessToken);
      } catch (err) {
        setError(err.message); // Capture any error message
      } finally {
        setLoading(false); // Set loading to false after the upload is complete
      }
    } else {
      toast.warning("No file selected");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", addNewData);
  };

  // const isEmpty = () => {
  //   if (!addNewData.title && !addNewData.link && !addNewData.image) return true;
  //   return false;
  // };

  const handleAddNewQuestion = async () => {
    try {
      const result = await AddNewQuestion(addNewData, accessToken);
      if (result.success) {
        setStatus("Question added successfully");
        navigate("/information");
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("An error occurred while adding the question.");
    }
  };

  if (loading) return <Loading />;


  return (
    <section className="bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border border-slate-300 font-sans">
      <div className="py-8 px-4 space-y-2 sm:py-16 lg:px-6">
        <div className="space-y-3">
          <p className="text-2xl text-left w-full font-semibold text-slate-800 uppercase">
            add introduction
          </p>
          <p className="text-lg text-left font-normal text-slate-600">
            Enter the introduction to create a new section for the class
            curriculum.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 p-4">
          <div className="grid grid-cols-1 space-y-2 max-w-xs text-start">
            <label
              htmlFor="title"
              className="capitalize text-base font-medium text-gray-700 dark:text-white"
            >
              Title
            </label>
            <input
              className="text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={addNewData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 space-y-2 max-w-xs text-start">
            <label
              htmlFor="link"
              className="capitalize text-base font-medium text-gray-700 dark:text-white"
            >
              Youtube Link
            </label>
            <input
              className="text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
              type="text"
              id="link"
              name="link"
              placeholder="Youtube Link"
              value={addNewData.link}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-4 w-full h-fit border border-slate-300 bg-white shadow-sm rounded-xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <p
                  className="text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                  htmlFor="file_input"
                >
                  Image Upload
                </p>
                <p className="text-sm font-medium text-left text-slate-600 dark:text-white">
                  Type: jpg/jpeg/png
                </p>
              </div>

              <input
                type="file"
                name="file"
                id="file"
                className="sr-only"
                accept="image/*"
                onChange={handleUpload}
              />
              <label
                htmlFor="file"
                className="relative flex items-center justify-start gap-x-4 text-center cursor-pointer"
              >
                <span className="rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                  choose file
                </span>
                <span className="text-md capitalize text-[#318973]">
                  {addNewData.image ? "File chosen" : "no file chosen"}
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={handleAddNewQuestion}
              className="inline-flex items-center space-x-2 rounded-lg px-10 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className="font-semibold">save</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
