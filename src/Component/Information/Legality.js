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
  addOrEditLegality,
  fetchLegality,
} from "../../ApiHandler/InformationApi";

function Legality() {
  const [editorContent, setEditorContent] = useState("");
  const [existingLegality, setExistingLegality] = useState(null);
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
    const getLegality = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchLegality(accessToken);
        if (result.success) {
          setExistingLegality(result.data.illegality);
          setEditorContent(result.data.illegality || "");
          setSuccess(true);
          // console.log("Terms and Conditions fetched successfully.");
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error("Error fetching existing Terms and Conditions:", err);
        setError(
          err.message ||
            "An error occurred while fetching the Terms and Conditions."
        );
      } finally {
        setLoading(false);
      }
    };

    getLegality();
  }, [accessToken]);

  const handleSaveIllegality = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await addOrEditLegality(
        editorContent,
        accessToken
      );
      if (result.success) {
        setSuccess(true);
        toast.success("Terms and Conditions saved successfully.");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Error saving Terms and Conditions:", err);
      setError(
        err.message ||
          "An error occurred while saving the Terms and Conditions."
      );
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
              legality
            </h3>

            <div className="flex items-center justify-center">
              <button
                onClick={handleSaveIllegality}
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

export default Legality;
