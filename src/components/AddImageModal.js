import React, { useState } from "react";
import Button from "./Button";
import AddModal from "./Modal";
import Number from "./Number";
import Select from "./Select";
import Text from "./Text";
import * as Media from "../constants/Media";

const AddImageModal = (props) => {
  const { imageUpload } = props;
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [isFileExist, setIsFileExist] = useState(false);

  //Set Media
  const media = (e) => {
    const data = e.target.files ? e.target.files[0] : "";
    setFile(data);
    setFileName(data.name);
    setIsFileExist(false);
  };

  //Upload File
  const upload = () => {
    if (!file && !fileName) {
      setIsFileExist(true);
    } else {

      const data = new FormData();

      if (fileName) {
        data.append([Media.MEDIA_NAME], fileName ? fileName : "");
      }

      if (file) {
        data.append([Media.MEDIA_FILE], file ? file : "");
      }
      // data.object = MEDIA_APP_PHOTO;
      imageUpload && imageUpload(data);
      setFile("");
    }
  };

  const addImageForm = (
    <div className="mt-2 mb-3">
      <Text
        name="image_name"
        label="Name"
        placeholder="Enter Name..."
        error=""
        required={true}
      />
      <Number
        name="image_position"
        label="Position"
        placeholder="Enter Position..."
        error=""
        required={true}
      />
      <Select
        name="image_status"
        label="Status"
        placeholder="Status..."
        error=""
        options={props.statusOptions}
        required={true}
      />
      <input
        name="file"
        className="form-control d-none"
        type="file"
        id="photo"
        onChange={(e) => {
          media && media(e);
        }}
        accept="image/png, image/gif, image/jpeg"
      />
      <span className="profilePicOverlay d-block ">
        <label htmlFor="photo" className="profile-img-sm mb-0">
          <span className="text-decoration-none cursor-pointer text-primary">
            Add Product Image
          </span>
          <span className="text-danger ml-1">*</span>
        </label>

        {/* Show image Name */}
        {file && fileName && <span className="pl-3">{fileName}</span>}
      </span>
      {isFileExist && (
        <small className={`text-danger position-absolute `}>
          Product Image is required
        </small>
      )}
    </div>
  );

  const imageFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button
          label="Add"
          onClick={(e) => {
            upload(e);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <AddModal
        isOpen={props.isOpen}
        toggle={props.toggle}
        toggleModalClose={props.toggle}
        modalTitle="Add Image"
        modalBody={addImageForm}
        modalFooter={imageFooter}
        hideDefaultButtons
      />
    </div>
  );
};
export default AddImageModal;
