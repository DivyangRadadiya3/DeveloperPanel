import React, { Suspense, useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import TextEditor from "../Ui/TextEditor";
import Loading from "../Loader/Loading";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTearmAndConditionData } from "../../Context/Action/index";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { VscSaveAs } from "react-icons/vsc";
import RichTextExample from "../Ui/RichTextExample";
import {
  addOrEditAboutUs,
  fetchAboutUs,
} from "../../ApiHandler/InformationApi";

function AboutUs() {
  const [editorContent, setEditorContent] = useState("");
  const [existingAboutUs, setExistingAboutUs] = useState(null);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getTermsCondition = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchAboutUs(accessToken);
        if (result.success) {
          setExistingAboutUs(result.data.aboutUs);
          setEditorContent(result.data.aboutUs || "");
          setSuccess(true);
          // console.log("AboutUs fetched successfully.");
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error("Error fetching existing AboutUs:", err);
        setError(
          err.message || "An error occurred while fetching the AboutUs."
        );
      } finally {
        setLoading(false);
      }
    };

    getTermsCondition();
  }, [accessToken]);

  const handleSaveAboutUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await addOrEditAboutUs(editorContent, accessToken);
      if (result.success) {
        setSuccess(true);
        toast.success("AboutUs saved successfully.");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Error saving AboutUs:", err);
      setError(err.message || "An error occurred while saving the AboutUs.");
      toast.error(`Failed to save AboutUs: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;


  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-2xl border">
        <div className="space-y-4 p-4">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl capitalize text-left leading-10 font-semibold text-slate-800">
              about us
            </h3>

            <div className="flex items-center justify-center">
              <button
                onClick={handleSaveAboutUs}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <VscSaveAs />
                </svg>
                <p className=" font-medium">save</p>
              </button>
            </div>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <RichTextExample
            content={editorContent}
            onTextChange={handleEditorChange}
          />
        </Suspense>
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

export default AboutUs;
