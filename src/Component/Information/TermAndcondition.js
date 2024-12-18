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
  addOrEditTearmAndCondition,
  fetchTermsCondition,
} from "../../ApiHandler/InformationApi";

export default function TermAndcondition() {
  const dispatch = useDispatch();
  // const { privacyPolicy } = useSelector(
  //   (state) => state.userConfig.privacyPolicy
  // );
  const [editorContent, setEditorContent] = useState("");
  const [existingTermsCondition, setExistingTermsCondition] = useState(null);
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
        const result = await fetchTermsCondition(accessToken);
        if (result.success) {
          
          setExistingTermsCondition(result.data.termsCondition);
          setEditorContent(result.data.termsCondition || "");
          setSuccess(true);
          // console.log("Terms and Conditions fetched successfully.");
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error("Error fetching existing Terms and Conditions:", err);
        setError(err.message || "An error occurred while fetching the Terms and Conditions.");
      } finally {
        setLoading(false);
      }
    };

    getTermsCondition();
  }, [accessToken]);

  const handleSaveTearmAndCondition = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await addOrEditTearmAndCondition(editorContent, accessToken);
      if (result.success) {
        setSuccess(true);
        toast.success("Terms and Conditions saved successfully.");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Error saving Terms and Conditions:", err);
      setError(err.message || "An error occurred while saving the Terms and Conditions.");
      toast.error(`Failed to save Terms and Conditions: ${err.message}`);
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
              terms and condition
            </h3>
            <div className="flex items-center justify-center">
              <button
                onClick={handleSaveTearmAndCondition}
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
          {/* <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
            <div className="flex flex-row items-center justify-between">
              <button
                //   onClick={() => handleNavigate()}
                className="inline-flex items-center justify-end space-x-2 rounded-full px-3 py-2 text-md text-center capitalize border border-slate-200 text-sky-500 bg-sky-100 hover:bg-opacity-90"
              >
                <svg className="font-bold w-4 h-4" viewBox="0 0 16 16">
                  <FaRegImage />
                </svg>
                <p className=" font-normal "> Add Media</p>
              </button>
              <div className="flex items-center text-center space-x-4 text-md font-medium text-gray-900">
                <h3 className="">Visual</h3>
                <p className="">Text</p>
              </div>
            </div>
          </div> */}
        </div>

        <Suspense fallback={<Loading />}>
          {/* <TextEditor
            content={editorContent}
            onTextChange={handleGetPlainText}
          /> */}
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
