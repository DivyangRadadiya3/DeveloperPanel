import React, { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { editUser } from "../../ApiHandler/userListApi";

export default function EditUser() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const existData = useSelector((state) => state.userConfig.existClassesPanel);

  const [input, setInput] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    setInput({
      userId: existData._id,
      name: existData.name,
      email: existData.email,
      password: existData.password,
    });
  }, [existData]);

  // const editUser = async () => {
  //   try {
  //     if (!name) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       let data = JSON.stringify(input);

  //       let config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url: "https://api-bef.hkdigiverse.com/user/edit",
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };

  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log(JSON.stringify(response.data));
  //           navigate("/subject");
  //           toast.success("Subject Edited");
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
    setLoading(true);
    try {
      const result = await editUser(input, accessToken);
      setLoading(false);

      if (result.success) {
        console.log("User  edited successfully:", result.data);
        console.log("User  edited successfully!");
        navigate("/subject");
      } else {
        console.error("Failed to edit user:", result.message);
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred while editing the user:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          "An error occurred. Please try again.";
        console.error(`Server Error: ${errorMessage}`);
      } else if (error.request) {
        console.error("Network Error: Please check your internet connection.");
      } else {
        console.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <section className=" p-6  border border-slate-300 bg-white rounded-xl h-full">
        <div className="space-y-6">
          <div className="text-left space-y-2">
            <p className=" text-3xl font-semibold text-gray-900">Edit Classes</p>
            <p className=" text-md text-gray-600">
              Fill in the data for profile. It will take a couple of minutes.
            </p>
          </div>

          <div className="p-6 w-full h-fit border-2 border-[#216123] bg-white rounded-xl space-y-10">
            <div className="text-left space-y-2">
              <p className=" text-xl font-semibold text-gray-900">
                Personal data
              </p>
              <p className=" text-md text-gray-600">
                Specify exactly as in your passport
              </p>
            </div>
            <div className="space-y-4 text-gray-700">
              {/* Full Name */}
              <div className="text-left">
                <label
                  className="text-gray-800 font-medium dark:text-gray-200"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  name="name" // Ensure the name matches the state key
                  value={input.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                    focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>

              {/* Email */}
              <div className="text-left">
                <label
                  className="text-gray-800 font-medium dark:text-gray-200"
                  htmlFor="gmail"
                >
                  Gmail
                </label>
                <input
                  type="email" 
                  id="gmail"
                  placeholder="Enter your full address"
                  name="email" 
                  value={input.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                    focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {/* Password */}
                <div className="relative w-full">
                  <input
                    className="text-black text-md px-4 py-4 border border-gray-600 h-10 w-full rounded-lg focus:outline-none focus:border focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                    type={toggle ? "text" : "password"} 
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    // onClick={toggle}
                    className="absolute inset-y-0 right-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                  >
                    {toggle ? (
                      <VscEyeClosed title="Show Password" />
                    ) : (
                      <VscEye title="Hide Password" />
                    )}
                  </button>
                </div>
              </div>
            </div>
           
            {/* <div className=" space-y-2">
              <div className=" space-y-4 text-gray-700">
                <div className="text-left">
                  <label
                    className="text-gray-700 font-medium dark:text-gray-200"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Full Name"
                    name="username"
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                  />
                </div>
                <div className="text-left">
                  <label
                    className="text-gray-700 font-medium dark:text-gray-200"
                    htmlFor="gmail"
                  >
                    Gmail
                  </label>
                  <input
                    type="text"
                    id="gmail"
                    placeholder="Enter your full address"
                    name="gmail"
                    value={input.email || ""}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="relative w-full ">
                    <input
                      className="text-black text-md px-4 py-4 border border-gray-600 h-10 w-full rounded-lg focus:outline-none focus:border focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                      type="password"
                      name="password"
                      value={input.password || ""}
                      placeholder="Enter Your Password"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 bottom-[25px] end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 invalid:border-pink-500 invalid:text-pink-600 peer
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 16 16">
                        {toggle ? (
                          <VscEyeClosed title="Show Password" />
                        ) : (
                          <VscEye title="Hide Password" />
                        )}
                      </svg>
                    </button>
                    <p className="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
                      Enter a strong password.
                    </p>
                  </div>
                  <div className="h-full"><MultipleSelection /> </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* UploadData */}
          <div className="w-full flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center space-x-2 rounded-lg px-10 py-3 text-md text-center capitalize text-white bg-orange-500 hover:bg-opacity-90  "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className=" font-semibold">update profile</p>
            </button>
          </div>
        </div>
      </section>

      <ToastContainer
        draggable={false}
        autoClose={1000}
        position={"top-right"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}