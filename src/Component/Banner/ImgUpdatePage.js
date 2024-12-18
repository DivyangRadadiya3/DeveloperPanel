import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editBanner, updateImageData } from "../../Context/Action";
import { imgUpload } from "../../ApiHandler/updateImage";
import { EditBanner } from "../../ApiHandler/bannerApi";

export default function ImgUpdatePage({ confirm, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const bannerData = useSelector((state) => state.userConfig.imageData);
  const [imgEdit, setImgEdit] = useState({
    bannerId: "",
    image: "",
    type: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);

  // const isEmpty = () => {
  //   if (imgEdit.bannerId === "" || imgEdit.image === "") {
  //     return true;
  //   }
  //   return false;
  // };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      handleUpload(files[0]);
    } else {
      setImgEdit((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleUpload = (value) => {
    handleFileChange(value);
  };
  const handleNavigate = (e) => {
    dispatch(updateImageData());
    onClose();
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

  // const EditBanner = async () => {
  //   try {
  //     if (isEmpty()) {
  //       toast.warning("Please fill up empty fields.");
  //     }
  //     let data = JSON.stringify(imgEdit);
  //     console.log(imgEdit);

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: `https://api-bef.hkdigiverse.com/banner/edit/${imgEdit.bannerId}`,
  //       headers: {
  //         Authorization: accessToken,
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };

  //     const response = await axios.request(config);
  //     console.log(response.data);

  //     if (response.status === 200) {
  //       toast.success(response.data.data.message);
  //       dispatch(editBanner(imgEdit), updateImageData(null));
  //       onClose();
  //     } else if (response.status === 500) {
  //       toast.error(response.data.data.message);
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //     console.error("An error occurred while adding the question.");
  //   }
  // };

  const handleEditBanner = async () => {
    try {
      const result = await EditBanner(bannerData, accessToken);
      if (result.success) {
        setStatus("Banner edited successfully");
        dispatch(editBanner(imgEdit), updateImageData(null));
        onClose();
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error(err.message);
      console.error("An error occurred while editing the image.");
    }
  };

  useEffect(() => {
    if (bannerData) {
      // console.log(bannerData);
      setImgEdit({
        bannerId: bannerData._id,
        image: bannerData.image,
        type: bannerData.type,
        link: "",
      });
    }
  }, [bannerData]);

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={handleNavigate}
            ></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-2xl">
            <p className="text-3xl text-left w-full font-semibold text-slate-800">
              Edit Image
            </p>
            <div className="space-y-3 border border-[#808836] rounded-lg p-4">
              <img
                src={imgEdit.image}
                width="300px"
                className="border-b  block px-5 py-2 shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#34bfb1] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                alt="Generated"
              />

              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="capitalize text-base font-medium text-gray-800 dark:text-white"
                >
                  Navigation Link
                </label>
                <input
                  className="border-b w-full block px-5 py-2 shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#34bfb1] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  id="editimg"
                  name="image"
                  placeholder="Image"
                  value={imgEdit.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-4 w-full h-fit border border-[#65B741] bg-white shadow-sm rounded-xl">
                <div className="space-y-2 overflow-hidden">
                  <p className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                    Edit Banner Image
                  </p>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="file"
                    className="relative flex items-center justify-start gap-x-4 text-center cursor-pointer"
                  >
                    <span className="rounded-md border border-[#5F8670] py-2 px-8 text-base capitalize text-slate-700">
                      choose file
                    </span>
                    <span className="text-md text-ellipsis text-[#5F8670]">
                      {imgEdit.image === "string"
                        ? "no file chosen"
                        : imgEdit.image}
                    </span>
                  </label>
                </div>
              </div>
              <p className="text-base text-gray-600">
                <span>File type: jpg/jpeg/png</span>
              </p>
              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="capitalize text-base font-medium text-gray-800 dark:text-white"
                >
                  Navigational Link
                </label>
                <input
                  className="border-b w-full block px-5 py-2 shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#34bfb1] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  id="editimg"
                  name="image"
                  placeholder="Image"
                  value={imgEdit.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                onClick={handleEditBanner}
                className="bg-orange-500 text-gray-100 px-20 py-2 rounded-full tracking-wide
              font-semibold focus:outline-none focus:shadow-outline hover:bg-orange-600 cursor-pointer transition ease-in duration-300"
              >
                Upload
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
