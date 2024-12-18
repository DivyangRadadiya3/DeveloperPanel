import * as React from "react";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  ImportExport,
} from "@syncfusion/ej2-react-richtexteditor";

function TextEditor() {
  const toolbarSettings = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "LowerCase",
      "UpperCase",
      "|",
      "Formats",
      "Alignments",
      "OrderedList",
      "UnorderedList",
      "Outdent",
      "Indent",
      "|",
      "ImportWord",
      "|",
      "|",
      "CreateLink",
      "Image",
      "|",
      "ClearFormat",
      "Print",
      "SourceCode",
      "FullScreen",
      "|",
      "Undo",
      "Redo",
    ],
    type: "Expand",
  };
  const quickToolbarSettings = {
    image: [
      "Replace",
      "Align",
      "Caption",
      "Remove",
      "InsertLink",
      "OpenImageLink",
      "-",
      "EditImageLink",
      "RemoveImageLink",
      "Display",
      "AltText",
      "Dimension",
    ],
  };

  return (
    <RichTextEditorComponent
      height={450}
      className="text-left"
      toolbarSettings={toolbarSettings}
      quickToolbarSettings={quickToolbarSettings}
    >
      <Inject
        services={[
          Toolbar,
          Image,
          Link,
          HtmlEditor,
          QuickToolbar,
          ImportExport,
        ]}
      />
    </RichTextEditorComponent>
  );
}

export default TextEditor;