import axios from "axios";
import React, { useEffect, useState } from "react";
import { VscSaveAs, VscEye, VscEyeClosed } from "react-icons/vsc";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchClassData,
  handleAddClassData,
} from "../../ApiHandler/getAllClassApi";
import { imgUpload, uploadFile } from "../../ApiHandler/updateImage";
import Loading from "../Loader/Loading";

export default function AddClasses({ confirm, setConfirm, onClose }) {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const [input, setInput] = useState({
    name: "",
    referralCode: "",
    image: "",
    termsAndConditions: "",
    privacyPolicy: "",
    email: "",
    password: "",
    ownerName: "",
    contact: {
      countryCode: "+91",
      mobile: "",
    },
  });

  const isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          if (isEmpty(obj[key])) return true;
        } else if (!obj[key]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleImageUpload = async (file, field) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!file) {
        toast.warning("Please select a file to upload.");
        return;
      }
      console.log("file", file);

      const fileType = file.type;
      let pdfType;

      if (fileType === "application/pdf") {
        if (field === "privacyPolicy") {
          pdfType = "privacy-policy";
        } else if (field === "termsAndConditions") {
          pdfType = "terms-condition";
        } else {
          toast.warning("Unsupported field type for PDF");
          return;
        }
      }
      // console.log("formdata",formData);

      // Call the generic upload function with the file and field name
      const result = await imgUpload(file, accessToken, pdfType);
      console.log(result);

      if (result.success) {
        // If upload is successful, update the form state with the uploaded file data
        setInput((prevData) => ({
          ...prevData,
          [field]: result.data,
        }));
        toast.success(result.message || `${field} uploaded successfully!`);
      } else {
        // Handle failure: Show error message
        toast.error(result.message || `Error uploading ${field}`);
      }
    } catch (error) {
      // Handle unexpected errors
      setError("Network error while uploading file. Please try again.");
      toast.error("Failed to upload file. Please check your network.");
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleUpload = (value, field) => {
    handleImageUpload(value, field);
  };

  function handleChange(e) {
    const { name, value, files } = e.target;

    const validNames = ["image", "termsAndConditions", "privacyPolicy"];
    if (validNames.includes(name) && files) {
      handleUpload(files[0], name);
    } else if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      setInput((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [contactField]: value,
        },
      }));
    } else {
      setInput({ ...input, [name]: value });
    }
  }

  useEffect(() => {
    console.log(input);
  }, [input]);

  const getClassData = async () => {
    setIsLoading(true); // Set loading state before fetching data
    try {
      const classesData = await fetchClassData(accessToken);
      // console.log("classesData", classesData);
      return classesData;
    } catch (err) {
      setError(err.message); // Handle error if occurs during fetch
      toast.error("Failed to fetch classes data");
    } finally {
      setIsLoading(false); // Turn off loader once data fetching is complete
    }
  };

  // Handle Add Class
  const handleAdd = async ({ onClose }) => {
    setIsLoading(true); // Show loader when adding class
    try {
      if (isEmpty(input)) {
        toast.warning("Please fill up the empty space");
      } else {
        const result = await handleAddClassData(input, accessToken);
        if (result.success) {
          onClose();
          getClassData(); // Refresh the class data
          console.log("success", result);
          toast.success("Class added successfully");
        } else {
          toast.error(result.message || "Failed to add class");
        }
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "An error occurred while adding class");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClassData();
  }, [accessToken]);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="fixed inset-0 z-50 overflow-hidden duration-300 ease-in-out">
        {/* Background Overlay */}
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={onClose}
              aria-label="Close Modal"
            ></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Modal Content */}
          <div className="inline-block w-full max-w-xl md:max-w-3xl bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle">
            <p className="text-3xl  font-medium text-center text-gray-900">
              Add Classes
            </p>

            <div className="space-y-4">
              {/* Owner Name & Contact */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="w-full">
                  <label
                    htmlFor="ownerName"
                    className="text-gray-700 font-semibold"
                  >
                    Owner Name
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    className="w-full px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={handleChange}
                    placeholder="Enter Owner Name"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="contact"
                    className="text-gray-700 font-semibold"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact.mobile"
                    className="w-full px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={handleChange}
                    placeholder="Enter Contact"
                  />
                </div>
              </div>

              {/* Gmail & Password */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="text-gray-700 font-semibold"
                  >
                    Gmail
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={handleChange}
                    placeholder="Enter Gmail"
                  />
                </div>

                <div className="w-full relative">
                  <label
                    htmlFor="password"
                    className="text-gray-700 font-semibold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      onChange={handleChange}
                      placeholder="Enter Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 py-2"
                      aria-label="Toggle Password Visibility"
                    >
                      {show ? (
                        <VscEyeClosed className="w-5 h-5 text-gray-600" />
                      ) : (
                        <VscEye className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Class Name & Referral Code */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="w-full">
                  <label
                    htmlFor="class"
                    className="text-gray-700 font-semibold"
                  >
                    Classes Name
                  </label>
                  <input
                    type="text"
                    id="class"
                    name="name"
                    className="w-full px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={handleChange}
                    placeholder="Enter Classes Name"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="code" className="text-gray-700 font-semibold">
                    Referral Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="referralCode"
                    className="w-full px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={handleChange}
                    placeholder="Enter Referral Code"
                  />
                </div>
              </div>

              {/* Upload Class Logo */}
              <div className="p-3 border border-gray-300 rounded-xl">
                <p className="text-start text-gray-700 font-semibold">
                  Upload Class Logo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  className="block w-full border border-gray-400 shadow-sm rounded-lg text-md focus:z-10 focus:ring-1 focus:ring-indigo-500  file:bg-gray-300  file:border-0  file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>

              {/* Upload Terms and Conditions & Privacy Policy PDF */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="p-3 border border-gray-300 rounded-xl">
                  <p className="text-start text-gray-700 font-semibold">
                    Upload Terms & Conditions PDF
                  </p>
                  <input
                    type="file"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="termsAndConditions"
                    className="flex items-center justify-between cursor-pointer text-center text-gray-600"
                  >
                    <span className="rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                      Choose File
                    </span>
                    <span className="text-md text-[#318973]">
                      No file chosen
                    </span>
                  </label>
                </div>

                <div className="p-3 border border-gray-300 rounded-xl">
                  <p className="text-start text-gray-700 font-semibold">
                    Upload Privacy Policy PDF
                  </p>
                  <input
                    type="file"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="privacyPolicy"
                    className="flex items-center justify-between cursor-pointer text-center text-gray-600"
                  >
                    <span className="rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                      Choose File
                    </span>
                    <span className="text-md text-[#318973]">
                      No file chosen
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  onClick={handleAdd}
                  className="inline-flex items-center space-x-2 px-6 py-2 text-md text-white bg-orange-600 rounded-lg hover:bg-opacity-90 focus:outline-none"
                >
                  <VscSaveAs className="w-5 h-5" />
                  <span className="font-semibold">Save Details</span>
                </button>
              </div>
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
