import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function DraftEditor(props) {
  let {
    onChange,
    editorState,
    showEditButton,
    onBlur,
    mentionList = [],
    readOnly,
    placeholder,
    hideOutLine,
    height,
    disabled,
  } = props;

  const [editable, setEditable] = useState(false);

  return (
    <>
      {props?.label && <h6>{props?.label}</h6>}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName={!hideOutLine ? "wrapperClassName" : ""}
        toolbarHidden={!editable || disabled}
        editorClassName="editorClassName"
        onEditorStateChange={onChange}
        editorStyle={{
          border: !hideOutLine ? "1px solid var(--page-create-ticket-description-border-color)" : "",
          minHeight: height ? height : "200px",
          padding: "10px",
          backgroundColor: "var(--page-create-ticket-description-bg-color)",
          borderRadius: "0px 0px 1px 1px",
          overflowY: "scroll",
          height: height ? height : "200px",
        }}
        customStyleMap={{
          HIGHLIGHT: {
            backgroundColor: "var(--page-create-ticket-description-text-bg-color)",
          },
        }}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: mentionList,
        }}
        onFocus={() => {
          if (!disabled) {
            setEditable(true);
          }
        }}
        readOnly={readOnly || disabled}
        placeholder={placeholder}
      />
      {showEditButton && (
        <div className="section-title inline-edit-section">
          <div
            className={`test-suite-page-edit ${editable ? "d-block float-right" : "d-none"
              }`}
          >
            <i className="fas fa-check mr-2" onClick={()=>{
              onBlur && onBlur()
              setEditable(false);
            }}></i>
            <i
              className="fas fa-times"
              onClick={() => {
                setEditable(false);
              }}
            ></i>
          </div>
        </div>
      )}
    </>
  );
}

export default DraftEditor;
