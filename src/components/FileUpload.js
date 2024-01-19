import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Label from "./Label";

const activeStyle = {
  borderColor: "var(--file-upload-for-active-border-color)",
};

const acceptStyle = {
  borderColor: "var(--file-upload-for-accept-border-color)",
};

const rejectStyle = {
  borderColor: "var(--file-upload-for-reject-border-color)",
};

function DragAndDropField(props) {
  let {
    label,
    fontBolded,
    onDrop,
    width,
    height,
    initialValue,
    handleDelete,
    selectedFile,
    errorMessage,
    fileNames,
    required,
  } = props;
  const [previewUrl, setPreviewUrl] = useState(initialValue);
  const fileName = fileNames ? fileNames : initialValue?.split("-").pop();

  useEffect(() => {
    if (selectedFile) {
      if (URL.createObjectURL) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(previewUrl);
      } else {
        setPreviewUrl("");
      }
    }
  }, [selectedFile]);

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 2,
    width: width ? width : "430px",
    height: height ? height : "100px",
    borderColor: "var(--attachments-border-color)",
    borderStyle: "dashed",
    backgroundColor: "var(--attachments-bg-color)",
    color: "var(--attachments-color)",
    transition: "border .3s ease-in-out",
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );


  return (
    <>
      <div className="d-flex column">
        <Label
          className={`${fontBolded ? "font-weight-bold" : ""}`}
          required={required ? true : false}
        >
          {label}
        </Label>
        {errorMessage && (
          <small className={`text-danger position-absolute mt-3`}>
            Image is required
          </small>
        )}
      </div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {selectedFile || fileName ? (
          <div className="position-relative">
            <div className="position-relative">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "90px",
                  }}
                />
              )}
            </div>
            {!fileNames && (
              <div className="text-center position-absolute" style={{ top: 0, right: 0 }}>
                <span
                  className="ml-2 cursor-pointer text-dark"
                  onClick={(e) => handleDelete(e)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">Drag and drop your File here.</div>
        )}
      </div>
    </>
  );
}

export default DragAndDropField;
