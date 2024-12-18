import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextExample = ({ content, onTextChange = () => {} }) => {
  const [theme] = useState("snow");
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState(content);
  const quillRef = useRef(null);

  useEffect(() => {
    if (content && content !== value) {
      setValue(content);
    }
  }, [content]);

  // Handle changes in the editor
  const onEditorChange = (value, delta, source, editor) => {
    setValue(editor.getContents()); // Update local state
    onTextChange(value); // Callback to parent
  };

  return (
    <>
      {enabled && value && (
        <ReactQuill
          ref={quillRef}
          theme={theme}
          value={value}
          onChange={onEditorChange}
        />
      )}
    </>
  );
};

export default RichTextExample;
