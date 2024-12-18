import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscSaveAs, VscEye, VscEyeClosed } from "react-icons/vsc";
import MultipleSelection from "../Ui/MultiSelection";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../../ApiHandler/userListApi";

export default function Adduser() {
  const [toggle, setToggle] = useState(false);
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
    email: "",
    password: "",
  });
  const { name } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  // const addNewUser = async () => {
  //   try {
  //     if (!name) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       let data = JSON.stringify(input);

  //       let config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url: "https://api-bef.hkdigiverse.com/user/add",
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };

  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log("addUser",JSON.stringify(response.data));
  //           navigate("/userDetails");
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

    const result = await addNewUser(input, accessToken);
    setLoading(false);

    if (result.success) {
      console.log("User  added:", result.data);
      navigate("/userDetails");
    } else {
      console.error("Failed to add user:", result.message);
    }
  };

  return (
    <>
      <section className=" p-6 space-y-6 border border-slate-300 bg-white rounded-xl h-full">
        <div className="text-left">
          <p className="text-2xl font-semibold text-slate-800">Add Classes</p>
          <p className="text-lg text-left font-normal text-slate-600 ">
            Fill in the data for profile. It will take a couple of minutes.
          </p>
        </div>
        <div className="p-6 w-full h-fit border-2 border-[#216123] bg-white rounded-xl space-y-10">
          <div className="text-left">
            <p className="text-xl font-semibold text-slate-800">
              Personal data
            </p>
            <p className="text-md text-left font-normal text-slate-600 ">
              Specify exactly as in your passport
            </p>
          </div>

          <div className=" space-y-2">
            <div className=" space-y-4 text-gray-700">
              {/* name */}
              <div className="text-left">
                <label
                  className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  name="name"
                  defaultValue=""
                  // value={username || ""}
                  onChange={(e) => handleChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>
              {/* gmail */}
              <div className="text-left">
                <label
                  className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  htmlFor="gmail"
                >
                  Gmail
                </label>
                <input
                  type="text"
                  id="gmail"
                  placeholder="Enter your full address"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {/* password */}
                <div className="relative w-full ">
                  <input
                    className="text-black text-md px-4 py-4 border border-gray-600 h-10 w-full rounded-lg focus:outline-none focus:border focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                    type={toggle ? "text" : "password"}
                    name="password"
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Your Password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setToggle(!toggle)}
                    className="absolute inset-y-0 bottom-[25px] end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 invalid:border-pink-500 invalid:text-pink-600 peer
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  >
                    {toggle ? (
                      <VscEyeClosed title="Show Password" />
                    ) : (
                      <VscEye title="Hide Password" />
                    )}
                  </button>
                  <p className="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
                    Enter a strong password.
                  </p>
                </div>
                <div className="h-full">{/* <MultipleSelection /> */}</div>
              </div>
            </div>
          </div>
        </div>

        {/* UploadData */}
        <div className="w-full flex items-end justify-center">
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