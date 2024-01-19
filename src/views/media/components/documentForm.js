import React from "react";
import Text from "../../../components/Text";
import DragAndDropField from "../../../components/FileUpload";

const DocumentForm = (props) => {
  let { selectedFile, onDrop, handleDelete, errorMessage, file, billView } = props;

  return (
    <div>
      {!billView &&
        <Text
          name="name"
          label="Name"
          placeholder="Enter Name..."
        />
      }
      <DragAndDropField
        onDrop={onDrop}
        label="Upload File"
        selectedFile={selectedFile}
        handleDelete={handleDelete}
        required={true}
        errorMessage={errorMessage}
        fileNames={file}
      />
    </div>
  );
};

export default DocumentForm;
