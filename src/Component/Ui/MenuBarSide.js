
import React, { forwardRef, useCallback } from "react";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import WrapTextIcon from "@mui/icons-material/WrapText";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import ToolbarButton from "@mui/icons-material/ToolbarButton";
import { useTheme } from "@emotion/react";
import {
  ToggleButtonGroup,
  Stack,
  ToggleButton,
  ToggleButtonProps,
  Button
} from "@mui/material";

function StyledButton(props) {
  const theme = useTheme(); // Assuming you're using a hook to get the theme
  return (
    <ToggleButton
      {...props}
      style={{
        boxShadow: "none",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.divider,
        "--ToggleButton-radius": "none",
      }}
    />
  );
}

function MenuBarSide({ editor }) {
    if (!editor) {
      return null;
    }
  
    return (
      <>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        >
          h4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        >
          h5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        >
          h6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </button>
      </>
    );
  
}

export default MenuBarSide;

// const setUnsetLink = useCallback(() => {
  //   if (editor.isActive("link")) {
  //     editor.chain().focus().unsetLink().run();
  //     return;
  //   }
  //   const previousUrl = editor.getAttributes("link").href;
  //   const url = window.prompt("URL", previousUrl);

  //   // cancelled
  //   if (url === null) {
  //     return;
  //   }

  //   // empty
  //   if (url === "") {
  //     editor.chain().focus().extendMarkRange("link").unsetLink().run();
  //     return;
  //   }

  //   // update link
  //   editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  // }, [editor]);

  // const addImage = useCallback(() => {
  //   const url = window.prompt("URL");

  //   // cancelled
  //   if (url === null) {
  //     return;
  //   }

  //   // empty
  //   if (url === "") {
  //     editor.chain().focus().extendMarkRange("image").clearContent().run();
  //     return;
  //   }

  //   editor.chain().focus().setImage({ src: url }).run();
  // }, [editor]);

  // const addYoutubeVideo = useCallback(() => {
  //   const url = prompt("Enter YouTube URL");

  //   // cancelled
  //   if (url === null) {
  //     return;
  //   }

  //   // empty
  //   if (url === "") {
  //     editor.chain().focus().extendMarkRange("youtube").clearContent().run();
  //     return;
  //   }

  //   editor.commands.setYoutubeVideo({
  //     src: url,
  //     width: 320,
  //     height: 180,
  //   });
  // }, [editor]);

  // return (
  //   <Stack direction="row" spacing={1}>
  //     <ToggleButtonGroup aria-label="Text formatting">
  //       <Button
  //         value="bold"
  //         aria-label="Toggle Bold selection"
  //         onClick={() => editor.chain().focus().toggleBold().run()}
  //         selected={editor.isActive("bold")}
  //       >
  //         <FormatBoldIcon />
  //       </Button>
  //       <Button
  //         value="italic"
  //         aria-label="Toggle Italic selection"
  //         onClick={() => editor.chain().focus().toggleItalic().run()}
  //         selected={editor.isActive("italic")}
  //       >
  //         <FormatItalicIcon />
  //       </Button>
  //       <Button
  //         value="underline"
  //         aria-label="Toggle Italic selection"
  //         onClick={() => editor.chain().focus().toggleUnderline().run()}
  //         selected={editor.isActive("underline")}
  //       >
  //         <FormatUnderlinedIcon />
  //       </Button>
  //       <Button
  //         value="strike"
  //         aria-label="Toggle Strike through selection"
  //         onClick={() => editor.chain().focus().toggleStrike().run()}
  //         selected={editor.isActive("strike")}
  //       >
  //         <FormatStrikethroughIcon />
  //       </Button>
  //     </ToggleButtonGroup>
  //     <ToggleButtonGroup>
  //       <Button
  //         value="code"
  //         aria-label="Toggle Code block"
  //         onClick={() => editor.chain().focus().toggleCode().run()}
  //         selected={editor.isActive("code")}
  //       >
  //         <CodeIcon />
  //       </Button>
  //       <Button
  //         value="unsetAllMarks"
  //         aria-label="Clear all formats of selections"
  //         onClick={() => editor.chain().focus().unsetAllMarks().run()}
  //       >
  //         <FormatClearIcon />
  //       </Button>
  //       <Button
  //         value="link"
  //         aria-label="Add Link"
  //         onClick={setUnsetLink}
  //       >
  //         {editor.isActive("link") ? <LinkOffIcon /> : <InsertLinkIcon />}
  //       </Button>
  //       <Button
  //         value="image"
  //         aria-label="Insert an image"
  //         onClick={addImage}
  //       >
  //         <AddPhotoAlternateIcon />
  //       </Button>
  //       <Button
  //         value="youtube"
  //         aria-label="Insert a Youtube video"
  //         onClick={addYoutubeVideo}
  //       >
  //         <YouTubeIcon />
  //       </Button>
  //     </ToggleButtonGroup>
  //     <ToggleButtonGroup>
  //       <Button
  //         value="heading2"
  //         aria-label="Toggle Heading 2 selection"
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 2 }).run()
  //         }
  //         selected={editor.isActive("heading2")}
  //       >
  //         h2
  //       </Button>
  //       <Button
  //         value="toggleHeading-3"
  //         aria-label="Toggle Heading 3 selection"
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 3 }).run()
  //         }
  //         selected={editor.isActive("toggleHeading-3")}
  //       >
  //         h3
  //       </Button>
  //       <Button
  //         value="toggleHeading-4"
  //         aria-label="Toggle Heading 4 selection"
  //         onClick={() =>
  //           editor.chain().focus().toggleHeading({ level: 4 }).run()
  //         }
  //         selected={editor.isActive("toggleHeading-4")}
  //       >
  //         h4
  //       </Button>
  //     </ToggleButtonGroup>
  //     <ToggleButtonGroup>
  //       <Button
  //         value="toggleBulletList"
  //         aria-label="Toggle Bullet List selection"
  //         onClick={() => editor.chain().focus().toggleBulletList().run()}
  //         selected={editor.isActive("toggleBulletList")}
  //       >
  //         <FormatListBulletedIcon />
  //       </Button>
  //       <Button
  //         value="toggleOrderedList"
  //         aria-label="Toggle Ordered List selection"
  //         onClick={() => editor.chain().focus().toggleOrderedList().run()}
  //         selected={editor.isActive("toggleOrderedList")}
  //       >
  //         <FormatListNumberedIcon />
  //       </Button>
  //       <Button
  //         value="toggleBlockquote"
  //         aria-label="Toggle Blockquote selection"
  //         onClick={() => editor.chain().focus().toggleBlockquote().run()}
  //         selected={editor.isActive("toggleBlockquote")}
  //       >
  //         <FormatQuoteIcon />
  //       </Button>
  //       <Button
  //         value="setHardBreak"
  //         aria-label="Set hard break to current line"
  //         onClick={() => editor.chain().focus().setHardBreak().run()}
  //       >
  //         <WrapTextIcon />
  //       </Button>
  //       <Button
  //         value="setHorizontalRule"
  //         aria-label="Add Horizontal Rule to current line"
  //         onClick={() => editor.chain().focus().setHorizontalRule().run()}
  //       >
  //         <HorizontalRuleIcon />
  //       </Button>
  //     </ToggleButtonGroup>

  //     <ToggleButtonGroup>
  //       <Button
  //         value="setTextAlign-left"
  //         aria-label="Set text align left"
  //         onClick={() => editor.chain().focus().setTextAlign("left").run()}
  //         selected={editor.isActive("left")}
  //       >
  //         <FormatAlignLeftIcon />
  //       </Button>
  //       <Button
  //         value="setTextAlign-center"
  //         aria-label="Set text align right"
  //         onClick={() => editor.chain().focus().setTextAlign("center").run()}
  //         selected={editor.isActive("center")}
  //       >
  //         <FormatAlignCenterIcon />
  //       </Button>
  //       <Button
  //         value="setTextAlign-right"
  //         aria-label="Set text align right"
  //         onClick={() => editor.chain().focus().setTextAlign("right").run()}
  //         selected={editor.isActive("right")}
  //       >
  //         <FormatAlignRightIcon />
  //       </Button>
  //       <Button
  //         value="setTextAlign-justify"
  //         aria-label="Set text align right"
  //         onClick={() => editor.chain().focus().setTextAlign("justify").run()}
  //         selected={editor.isActive("justify")}
  //       >
  //         <FormatAlignJustifyIcon />
  //       </Button>
  //     </ToggleButtonGroup>
  //   </Stack>
  // );