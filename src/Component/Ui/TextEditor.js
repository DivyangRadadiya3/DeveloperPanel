// import React, { useEffect, useRef, useState } from "react";
// import { useQuill } from "react-quilljs";
// import hljs from "highlight.js";
// import "highlight.js/styles/github.css";
// import "quill/dist/quill.snow.css";
// import "tailwindcss/tailwind.css";
// import {
//   FaPalette,
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaStrikethrough,
//   FaQuoteRight,
//   FaListOl,
//   FaListUl,
//   FaLink,
//   FaImage,
//   FaVideo,
//   FaEraser,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaAlignJustify,
//   FaIndent,
//   FaOutdent,
//   FaMinus,
//   FaTable,
//   FaSubscript,
//   FaSuperscript,
//   FaUndo,
//   FaRedo,
// } from "react-icons/fa";

// const toolbarItems = [
//   {
//     type: "select",
//     command: "fontFamily",
//     options: ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"],
//     tooltip: "Font Family",
//   },
//   {
//     type: "select",
//     command: "fontSize",
//     options: ["1", "3", "5", "7"],
//     labels: ["Small", "Normal", "Large", "Huge"],
//     tooltip: "Font Size",
//   },
//   { type: "button", command: "bold", icon: <FaBold />, tooltip: "Bold" },
//   { type: "button", command: "italic", icon: <FaItalic />, tooltip: "Italic" },
//   {
//     type: "button",
//     command: "underline",
//     icon: <FaUnderline />,
//     tooltip: "Underline",
//   },
//   {
//     type: "button",
//     command: "strikeThrough",
//     icon: <FaStrikethrough />,
//     tooltip: "Strikethrough",
//   },
//   {
//     type: "button",
//     command: "blockquote",
//     icon: <FaQuoteRight />,
//     tooltip: "Blockquote",
//   },
//   {
//     type: "button",
//     command: "insertOrderedList",
//     icon: <FaListOl />,
//     tooltip: "Ordered List",
//   },
//   {
//     type: "button",
//     command: "insertUnorderedList",
//     icon: <FaListUl />,
//     tooltip: "Unordered List",
//   },
//   {
//     type: "button",
//     command: "createLink",
//     icon: <FaLink />,
//     tooltip: "Insert Link",
//   },
//   {
//     type: "button",
//     command: "insertImage",
//     icon: <FaImage />,
//     tooltip: "Insert Image",
//   },
//   {
//     type: "button",
//     command: "removeFormat",
//     icon: <FaEraser />,
//     tooltip: "Remove Formatting",
//   },
//   {
//     type: "button",
//     command: "justifyLeft",
//     icon: <FaAlignLeft />,
//     tooltip: "Align Left",
//   },
//   {
//     type: "button",
//     command: "justifyCenter",
//     icon: <FaAlignCenter />,
//     tooltip: "Align Center",
//   },
//   {
//     type: "button",
//     command: "justifyRight",
//     icon: <FaAlignRight />,
//     tooltip: "Align Right",
//   },
//   {
//     type: "button",
//     command: "justifyFull",
//     icon: <FaAlignJustify />,
//     tooltip: "Justify",
//   },
//   { type: "button", command: "indent", icon: <FaIndent />, tooltip: "Indent" },
//   {
//     type: "button",
//     command: "outdent",
//     icon: <FaOutdent />,
//     tooltip: "Outdent",
//   },
//   {
//     type: "button",
//     command: "insertHorizontalRule",
//     icon: <FaMinus />,
//     tooltip: "Horizontal Line",
//   },
//   {
//     type: "button",
//     command: "insertTable",
//     icon: <FaTable />,
//     tooltip: "Insert Table",
//   },
//   {
//     type: "color",
//     command: "textColor",
//     icon: <FaPalette />,
//     tooltip: "Text Color",
//   },
//   {
//     type: "color",
//     command: "backgroundColor",
//     icon: <FaPalette />,
//     tooltip: "Background Color",
//   },
//   {
//     type: "button",
//     command: "undo",
//     icon: <FaUndo />, // Use an appropriate icon for undo
//     tooltip: "Undo",
//   },
//   {
//     type: "button",
//     command: "redo",
//     icon: <FaRedo />, // Use an appropriate icon for redo
//     tooltip: "Redo",
//   },
// ];

// const TextEditor = ({ content, onTextChange = () => {} }) => {
//   const [text, setText] = useState(content || "");
//   const editorRef = useRef(null);
//   const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

//   // const handleCommand = (command, value = null) => {
//   //   const selection = window.getSelection();
//   //   if (selection.rangeCount > 0) {
//   //     const range = selection.getRangeAt(0);

//   //     switch (command) {
//   //       case "bold":
//   //         toggleStyle(range, "bold");
//   //         break;
//   //       case "italic":
//   //         toggleStyle(range, "italic");
//   //         break;
//   //       case "underline":
//   //         toggleStyle(range, "underline");
//   //         break;
//   //       case "strikeThrough":
//   //         toggleStyle(range, "line-through");
//   //         break;
//   //       case "blockquote":
//   //         const blockquote = document.createElement("blockquote");
//   //         range.surroundContents(blockquote);
//   //         break;
//   //       case "insertOrderedList":
//   //         insertList(range, true);
//   //         break;
//   //       case "insertUnorderedList":
//   //         insertList(range, false);
//   //         break;
//   //       case "createLink":
//   //         const linkValue = prompt("Enter the URL");
//   //         if (linkValue) {
//   //           const link = document.createElement("a");
//   //           link.href = linkValue;
//   //           link.target = "_blank";
//   //           link.textContent = range.toString();
//   //           range.deleteContents();
//   //           range.insertNode(link);
//   //         }
//   //         break;
//   //       case "insertImage":
//   //         const imageUrl = prompt("Enter the image URL");
//   //         if (imageUrl) {
//   //           const img = document.createElement("img");
//   //           img.src = imageUrl;
//   //           img.alt = "Image";
//   //           range.insertNode(img);
//   //         }
//   //         break;
//   //       case "insertTable":
//   //         const tableHtml = prompt("Enter table HTML");
//   //         if (tableHtml) {
//   //           const div = document.createElement("div");
//   //           div.innerHTML = tableHtml;
//   //           range.insertNode(div.firstChild);
//   //         }
//   //         break;
//   //       case "removeFormat":
//   //         const selectedText = range.extractContents();
//   //         const span = document.createElement("span");
//   //         span.style.fontWeight = "";
//   //         span.style.fontStyle = "";
//   //         span.style.textDecoration = "";
//   //         span.appendChild(selectedText);
//   //         range.insertNode(span);
//   //         break;
//   //       case "justifyLeft":
//   //         setAlignment(range, "left");
//   //         break;
//   //       case "justifyCenter":
//   //         setAlignment(range, "center");
//   //         break;
//   //       case "justifyRight":
//   //         setAlignment(range, "right");
//   //         break;
//   //       case "justifyFull":
//   //         setAlignment(range, "justify");
//   //         break;
//   //       case "indent":
//   //         applyIndent(range, true);
//   //         break;
//   //       case "outdent":
//   //         applyIndent(range, false);
//   //         break;
//   //       case "insertHorizontalRule":
//   //         const hr = document.createElement("hr");
//   //         range.insertNode(hr);
//   //         break;
//   //       case "fontFamily":
//   //         const fontFamily = value;
//   //         applyStyle(range, "fontFamily", fontFamily);
//   //         break;
//   //       case "fontSize":
//   //         const fontSize = value;
//   //         applyStyle(range, "fontSize", `${fontSize}em`);
//   //         break;
//   //       case "textColor":
//   //         if (value) {
//   //           applyStyle(range, "textColor", value);
//   //         }
//   //         break;
//   //       case "backgroundColor":
//   //         if (value) {
//   //           applyStyle(range, "backgroundColor", value);
//   //         }
//   //         break;

//   //       default:
//   //         console.warn(`Command "${command}" not implemented.`);
//   //         break;
//   //     }

//   //     if (editorRef.current) {
//   //       onTextChange(editorRef.current.innerHTML);
//   //     }
//   //   }
//   // };

//   const toggleStyle = (range, tag) => {
//     const selectedContents = range.cloneContents();
//     const parent = range.startContainer.parentNode;

//     const isWrapped = selectedContents.querySelector(tag);

//     if (isWrapped) {
//       const unwrappedContents = document.createDocumentFragment();
//       selectedContents.childNodes.forEach((node) => {
//         if (node.nodeName.toLowerCase() === tag) {
//           unwrappedContents.append(...node.childNodes);
//         } else {
//           unwrappedContents.appendChild(node.cloneNode(true));
//         }
//       });

//       range.deleteContents();
//       range.insertNode(unwrappedContents);
//     } else {
//       const wrapper = document.createElement(tag);
//       wrapper.appendChild(selectedContents);
//       range.deleteContents();
//       range.insertNode(wrapper);
//     }
//   };

//   const handleCommand = (command, value = null) => {
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);

//       switch (command) {
//         case "bold":
//           toggleStyle(range, "strong");
//           break;
//         case "italic":
//           toggleStyle(range, "em");
//           break;
//         case "underline":
//           toggleStyle(range, "u");
//           break;
//         case "strikeThrough":
//           toggleStyle(range, "s");
//           break;
//         case "blockquote":
//           const blockquote = document.createElement("blockquote");
//           range.surroundContents(blockquote);
//           break;
//         case "insertOrderedList":
//           insertList(range, true);
//           break;
//         case "insertUnorderedList":
//           insertList(range, false);
//           break;
//         case "createLink":
//           const linkValue = prompt("Enter the URL");
//           if (linkValue) {
//             const link = document.createElement("a");
//             link.href = linkValue;
//             link.target = "_blank";
//             link.textContent = range.toString();
//             range.deleteContents();
//             range.insertNode(link);
//           }
//           break;
//         case "insertImage":
//           const imageUrl = prompt("Enter the image URL");
//           if (imageUrl) {
//             const img = document.createElement("img");
//             img.src = imageUrl;
//             img.alt = "Image";
//             range.insertNode(img);
//           }
//           break;
//         case "insertTable":
//           const tableHtml = prompt("Enter table HTML");
//           if (tableHtml) {
//             const div = document.createElement("div");
//             div.innerHTML = tableHtml;
//             range.insertNode(div.firstChild);
//           }
//           break;
//         case "removeFormat":
//           const selectedText = range.extractContents();
//           const span = document.createElement("span");
//           span.appendChild(selectedText);
//           range.insertNode(span);
//           break;
//         case "justifyLeft":
//           setAlignment(range, "left");
//           break;
//         case "justifyCenter":
//           setAlignment(range, "center");
//           break;
//         case "justifyRight":
//           setAlignment(range, "right");
//           break;
//         case "justifyFull":
//           setAlignment(range, "justify");
//           break;
//         case "indent":
//           applyIndent(range, true);
//           break;
//         case "outdent":
//           applyIndent(range, false);
//           break;
//         case "insertHorizontalRule":
//           const hr = document.createElement("hr");
//           range.insertNode(hr);
//           break;
//         case "fontFamily":
//           const fontFamily = value;
//           applyStyle(range, "fontFamily", fontFamily);
//           break;
//         case "fontSize":
//           const fontSize = value;
//           applyStyle(range, "fontSize", `${fontSize}em`);
//           break;
//         case "textColor":
//           if (value) {
//             applyStyle(range, "color", ` ${value}`);
//           }
//           break;
//         case "backgroundColor":
//           if (value) {
//             applyStyle(range, "background Color", value);
//           }
//           break;
//         default:
//           console.warn(`Command "${command}" not implemented.`);
//           break;
//       }

//       if (editorRef.current) {
//         const outputData = editorRef.current.innerHTML;
//         onTextChange(outputData);
//         setIsPlaceholderVisible(outputData === "");
//       }
//     }
//   };

//   const handleChange = (e) => {
//     if (editorRef.current) {
//       const outputData = editorRef.current.innerHTML;
//       // onTextChange(outputData);
//       setIsPlaceholderVisible(outputData === "");
//     }
//   };

//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.innerHTML = text;
//       setIsPlaceholderVisible(editorRef.current.innerHTML === "");
//     }
//   }, [text]);

//   const applyStyle = (range, command, value) => {
//     const styles = {
//       bold: { fontWeight: "bold" },
//       italic: { fontStyle: "italic" },
//       underline: { textDecoration: "underline" },
//       strikeThrough: { textDecoration: "line-through" },
//       fontFamily: { fontFamily: value },
//       fontSize: { fontSize: value },
//       textColor: { color: value },
//       backgroundColor: { backgroundColor: value },
//     };

//     // Check if the command is valid
//     if (!styles[command]) {
//       console.warn(`Style command "${command}" is not recognized.`);
//       return;
//     }

//     // Extract the selected contents
//     const selectedContents = range.extractContents();
//     const span = document.createElement("span");

//     // Apply the styles to the span
//     Object.assign(span.style, styles[command]);

//     // If the command is textColor or backgroundColor, we need to set the color directly
//     if (command === "textColor" || command === "backgroundColor") {
//       span.style[command === "textColor" ? "color" : "backgroundColor"] = value;
//     }

//     // Append the selected contents to the span
//     span.appendChild(selectedContents);

//     // Insert the styled span back into the document
//     range.insertNode(span);

//     // Move the cursor after the newly inserted span
//     const newRange = document.createRange();
//     newRange.setStartAfter(span);
//     newRange.collapse(true);
//     const selection = window.getSelection();
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//   };

//   const applyIndent = (range, isIndent) => {
//     const block = document.createElement("div");
//     block.style.marginLeft = isIndent ? "20px" : "0";
//     const contents = range.extractContents();
//     block.appendChild(contents);
//     range.insertNode(block);
//   };

//   const setAlignment = (range, alignment) => {
//     const block = document.createElement("div");
//     block.style.textAlign = alignment;
//     const contents = range.extractContents();
//     block.appendChild(contents);
//     range.insertNode(block);
//   };

//   const insertList = (range, ordered) => {
//     const list = document.createElement(ordered ? "ol" : "ul");
//     const listItem = document.createElement("li");
//     listItem.textContent = range.toString();
//     list.appendChild(listItem);
//     range.deleteContents();
//     range.insertNode(list);
//   };

//   // const updateButtonStates = () => {
//   //   const selection = window.getSelection();
//   //   const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

//   //   // Reset all buttons
//   //   document.querySelectorAll("#toolbar button").forEach((button) => {
//   //     button.classList.remove("bg-blue-500", "text-white", "shadow");
//   //   });

//   //   if (range) {
//   //     const selectedContents = range.cloneContents();

//   //     // Check for bold
//   //     const hasBold = Array.from(selectedContents.childNodes).some((node) => {
//   //       return (
//   //         node.nodeType === Node.ELEMENT_NODE &&
//   //         node.style.fontWeight === "bold"
//   //       );
//   //     });
//   //     if (hasBold) {
//   //       document
//   //         .getElementById("boldBtn")
//   //         .classList.add("bg-blue-500", "text-white", "shadow");
//   //     }

//   //     // Check for italic
//   //     const hasItalic = Array.from(selectedContents.childNodes).some((node) => {
//   //       return (
//   //         node.nodeType === Node.ELEMENT_NODE &&
//   //         node.style.fontStyle === "italic"
//   //       );
//   //     });
//   //     if (hasItalic) {
//   //       document
//   //         .getElementById("italicBtn")
//   //         .classList.add("bg-blue-500", "text-white", "shadow");
//   //     }

//   //     // Check for underline
//   //     const hasUnderline = Array.from(selectedContents.childNodes).some(
//   //       (node) => {
//   //         return (
//   //           node.nodeType === Node.ELEMENT_NODE &&
//   //           node.style.textDecoration === "underline"
//   //         );
//   //       }
//   //     );
//   //     if (hasUnderline) {
//   //       document
//   //         .getElementById("underlineBtn")
//   //         .classList.add("bg-blue-500", "text-white", "shadow");
//   //     }

//   //     // Check for strike-through
//   //     const hasStrikeThrough = Array.from(selectedContents.childNodes).some(
//   //       (node) => {
//   //         return (
//   //           node.nodeType === Node.ELEMENT_NODE &&
//   //           node.style.textDecoration === "line-through"
//   //         );
//   //       }
//   //     );
//   //     if (hasStrikeThrough) {
//   //       document
//   //         .getElementById("strikeThroughBtn")
//   //         .classList.add("bg-blue-500", "text-white", "shadow");
//   //     }
//   //   }
//   // };

//   //   const handlePaste = (e) => {
//   //     e.preventDefault(); // Prevent the default paste behavior

//   //     // Get the pasted text
//   //     const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');

//   //     // Create a temporary div to manipulate the pasted content
//   //     const tempDiv = document.createElement('div');
//   //     tempDiv.innerHTML = text;

//   //     // Create a wrapper element based on the content type
//   //     let wrapper;

//   //     // Check for specific tags or content patterns
//   //     if (tempDiv.querySelector('h1')) {
//   //         // If it contains an <h1> tag, wrap it in a <div>
//   //         wrapper = document.createElement('div');
//   //     } else if (tempDiv.querySelector('h2')) {
//   //         // If it contains an <h2> tag, wrap it in a <div>
//   //         wrapper = document.createElement('div');
//   //     } else if (tempDiv.querySelector('ul') || tempDiv.querySelector('ol')) {
//   //         // If it contains a list, wrap it in a <div>
//   //         wrapper = document.createElement('div');
//   //     } else if (tempDiv.childNodes.length === 1 && tempDiv.firstChild.nodeType === Node.TEXT_NODE) {
//   //         // If it's just plain text, wrap it in a <p> tag
//   //         wrapper = document.createElement('p');
//   //     } else {
//   //         // For any other content, wrap it in a <div>
//   //         wrapper = document.createElement('div');
//   //     }

//   //     // Append the temporary content to the wrapper
//   //     while (tempDiv.firstChild) {
//   //         wrapper.appendChild(tempDiv.firstChild);
//   //     }

//   //     // Insert the wrapped content into the editor
//   //     const selection = window.getSelection();
//   //     if (selection.rangeCount > 0) {
//   //         const range = selection.getRangeAt(0);
//   //         range.deleteContents(); // Clear the current selection
//   //         range.insertNode(wrapper); // Insert the wrapped content
//   //         range.collapse(false); // Move the cursor to the end of the inserted content
//   //     }

//   //     // Update the output data and placeholder visibility
//   //     if (editorRef.current) {
//   //         const outputData = editorRef.current.innerHTML;
//   //         onTextChange(outputData);
//   //         setIsPlaceholderVisible(outputData === "");
//   //     }
//   // };

//   const handlePaste = (e) => {
//     // Get the pasted text
//     const text =
//       e.clipboardData.getData("text/html") ||
//       e.clipboardData.getData("text/plain");
//     onTextChange(text);

//     // Create a temporary div to manipulate the pasted content
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = text;

//     // Insert the content into the editor
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       range.deleteContents(); // Clear the current selection
//       range.insertNode(tempDiv.firstChild); // Insert the pasted content
//       range.collapse(false); // Move the cursor to the end of the inserted content
//     }

//     // Update the placeholder visibility
//     if (editorRef.current) {
//       const outputData = editorRef.current.innerHTML;
//       onTextChange(outputData);
//       setIsPlaceholderVisible(outputData === "");
//     }
//   };

//   useEffect(() => {
//     setText(content || "");
//   }, [content]);

//   return (
//     <div>
//       <div className="toolbar flex flex-wrap space-x-2 p-2 bg-gray-100 rounded-md shadow-md">
//         {toolbarItems.map((item, index) => {
//           if (item.type === "select") {
//             return (
//               <div className="relative" key={index}>
//                 <select
//                   onChange={(e) => handleCommand(item.command, e.target.value)}
//                   className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                   title={item.tooltip}
//                 >
//                   {item.options.map((option, idx) => (
//                     <option key={idx} value={option}>
//                       {item.labels ? item.labels[idx] : option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             );
//           } else if (item.type === "button") {
//             return (
//               <button
//                 key={index}
//                 onClick={(e) => {
//                   handleCommand(item.command, e.target.value);
//                 }}
//                 title={item.tooltip}
//                 className="px-2 py-1 text-[#219B9D] bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 {item.icon}
//               </button>
//             );
//           } else if (item.type === "color") {
//             return (
//               <div className="relative   cursor-pointer" key={index}>
//                 <input
//                   key={index}
//                   type="color"
//                   onChange={(e) => handleCommand(item.command, e.target.value)}
//                   title={item.tooltip}
//                   className="w-5 h-6 p-0 border-none rounded cursor-pointer"
//                 />
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//       {/* <div
//         ref={editorRef}
//         contentEditable="true"
//         onInput={handleChange}
//         onPaste={handlePaste} // Handle paste event
//         suppressContentEditableWarning
//         dangerouslySetInnerHTML={{ __html: text }}
//         className={`editor min-h-[200px] border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
//           isPlaceholderVisible ? "placeholder" : ""
//         }`}
//       /> */}
//       <div
//         ref={editorRef}
//         contentEditable
//         onPaste={handlePaste}
//         className={`editor min-h-[200px] border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
//           isPlaceholderVisible ? "placeholder" : ""
//         }`}
//       />
//     </div>
//   );
// };

// export default TextEditor;

import React, { useEffect, useRef, useState } from "react";

const TextEditor = ({ content, onTextChange = () => {} }) => {
  const editorRef = useRef(null);
  const [text, setText] = useState(""); // State to hold the content

  const handleChange = (e) => {
    const content = e.target.innerHTML;
    setText(content);
    onTextChange(content);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior

    // Get the pasted HTML or plain text
    const pastedData =
      e.clipboardData.getData("text/html") ||
      e.clipboardData.getData("text/plain");

    // Insert the pasted content at the cursor position
    document.execCommand("insertHTML", false, pastedData);
  };

  useEffect(() => {
    const editor = editorRef.current;

    // Focus the editor when it mounts
    if (editor) {
      editor.focus();
      setText(content);
    }
  }, []);

  return (
    <div>
      <h2>Text Editor</h2>
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleChange}
        onPaste={handlePaste} // Handle paste event
        // on={handleKeyDown} // Handle keyboard shortcuts
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: text }}
        className="editor min-h-[200px] border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <h3>Output:</h3>
      <div className="output" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default TextEditor;
