import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
//Components
import Button from "../../../components/Button";
import CancelButton from "../../../components/CancelButton";
import DeleteButton from "../../../components/DeleteButton";
import Form from "../../../components/Form";
import Text from "../../../components/Text";
import mediaConstant from "../../../helpers/Media";
import DeleteModal from "../../../components/DeleteModal";

// Helpers
import { Feature, Media } from "../../../helpers/Product";

//Add Modal
const AddImageModal = (props) => {
  const {
    imageUpload,
    imageUpdate,
    imageDelete,
    mediaRemove,
    fileUrl,
    title,
    toggle,
    isOpen,
    objectName,
    objectId,
    currentData,
    status,
    setImageStatus,
    feature,
    setImageFeature,
    setModalOpen,
    showFeature
  } = props;
  
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isFileExist, setIsFileExist] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const [mediaFileTypeError, setMediaFileTypeError] = useState(false);

  const mediaRef = useRef();

  useEffect(() => {
    setMediaUrl(currentData && currentData.url);
  }, [currentData]);

  //Set Mediae
  const media = (e) => {
    const data = e.target.files ? e.target.files[0] : "";
    setFile(data);
    const fileUrl = URL.createObjectURL(data);
    setMediaUrl(fileUrl);
    setFileName(data.name);
    setIsFileExist(false);
  };

  //Media Remove
  const onMediaRemove = () => {
    setMediaFileTypeError(false);
    setIsFileExist(true);
    mediaRef.current.value = "";
    setMediaUrl("");
    setFile("");
    setFileName("");
    mediaRemove();
  };

  // Validate Filetype
  const validateFile = (e, File) => {
    const targetFile = e.target;
    if (targetFile.files && targetFile.files.length > 0) {
      const fileType = targetFile.files.item(0).type;
      switch (fileType) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          File === mediaConstant.MEDIA_URL && setMediaFileTypeError(false);
          break;
        default:
          File === mediaConstant.MEDIA_URL && setMediaFileTypeError(true);
          break;
      }
    }
  };

  // Media image upload
  const onMediaChange = (e) => {
    validateFile(e, mediaConstant.MEDIA_URL);
    if (!mediaFileTypeError) {
      media(e);
    }
  };

  //Upload File
  const upload = () => {
    const data = new FormData();
    if (
      !currentData &&
      !name &&
      !description &&
      !status &&
      !file &&
      !fileName
    ) {
      setIsFileExist(true);
    } else {
      if (file) {
        data.append("media_file", file ? file : "");
      }
      if (currentData) {
        data.append("mediaId", currentData ? currentData.id : "");
      }

      if (name) {
        data.append("image_name", name ? name : "");
      }

      data.append("name", name ? name : "");
      data.append("description", description ? description : "");
      data.append("media_name", fileName ? fileName : "");
      data.append("object", objectName ? objectName : "");
      data.append("object_id", objectId ? objectId : "");
      data.append("media_url", mediaUrl ? mediaUrl : "");
      data.append("media_visibility", Media.VISIBILITY_ENABLED);

      if (!isFileExist) {
        imageUpload(data, currentData.id);
        setFile("");
        setName(name);
        setDescription(description);
        setMediaUrl("");
        setFileName("");
      }
    }
  };

  //Update File
  const update = (values) => {
    const data = new FormData();
    if (file) {
      data.append("media_file", file ? file : "");
      data.append("media_name", fileName ? fileName : "");
      data.append("media_url", mediaUrl ? mediaUrl : "");
    }
    if (values.image_name) {
      data.append("image_name", values.image_name ? values.image_name : "");
    }
    if (values.image_description) {
      data.append(
        "image_description",
        values.image_description ? values.image_description : ""
      );
    }
    data.append("objectName", objectName ? objectName : "");
    data.append("objectId", objectId ? objectId : "");
    data.append(
      "feature",
      feature
        ? Feature.FEATURE_ENABLED
        : Feature.FEATURE_DISABLED
    );
    if (!isFileExist) {
      imageUpdate(data, currentData.id);
      setFile("");
      setName("");
      setDescription("");
      setImageStatus("");
      setMediaUrl("");
      setFileName("");
    }
  };

  const handleToggle = () => {
    setMediaUrl("");
    setFileName("");
    setFile("");
    toggle();
  };

  // Media Url
  const mediaLogoWithBaseUrl = mediaUrl ? mediaUrl : fileUrl ? fileUrl : "";
  const initialValues = {
    image_name: currentData ? currentData.name : "",
    image_description: currentData ? currentData.description : "",
  };

  const handleEnableStatus = (value) => {
    const status = value === true ? "Active" : "InActive";
    setImageStatus(status);
  };

  const handleEnableFeature = (value) => {
    const feature =
      value === true
        ? Feature.FEATURE_ENABLED
        : Feature.FEATURE_DISABLED;
    setImageFeature(feature);
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Image"
        label={currentData ? currentData.name : ""}
        deleteFunction={() => {
          imageDelete(currentData.id)
          setModalOpen(false);
        }}
      />
      <Modal
        isOpen={isOpen}
        toggle={handleToggle}
        className="add-create-popup w-90"
        backdrop="static"
      >
        <ModalHeader>
          <div className="content-wrapper">
            <div className="icon-wrapper">
              <p className="text-right font-weight-bold mb-3">
                {`${currentData ? "Edit" : "Add"} ${title} Image`}
                <button className="close" onClick={handleToggle}>
                  ×
                </button>
              </p>
            </div>
          </div>
        </ModalHeader>
        <Form
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(e) => {
            if (currentData) {
              update(e);
            } else upload(e);
          }}
        >
          <ModalBody className="custom-modal-body">
            <div className="mt-2 mb-3">
              <div>
                <Text
                  name="image_name"
                  label="Name"
                  placeholder="Enter Name..."
                  error=""
                  onChange={(e) => {
                    setName(e && e.target && e.target.value);
                  }}
                />
                <>
                  <div className="field-wrapper d-flex">
                    <div>
                      <div className="upload-field d-inline-block">
                        <input
                          name="file"
                          className="form-control d-none"
                          type="file"
                          id="image"
                          placeholder="Banner Image"
                          accept="image/png,image/gif,image/jpeg,application/pdf"
                          onChange={(e) => {
                            onMediaChange(e);
                          }}
                          ref={mediaRef}
                        />
                        <span className="profilePicOverlay d-block ">
                          <label
                            htmlFor="image"
                            className="profile-img-sm mb-0"
                          >
                            <span className="text-decoration-none cursor-pointer text-primary">
                              Upload Image
                            </span>
                            <span className="text-danger ml-1">*</span>
                          </label>
                          {file && fileName && (
                            <span className="pl-3">{fileName}</span>
                          )}
                        </span>
                        {isFileExist && (
                          <small className={`text-danger position-absolute `}>
                            {title} Image is required
                          </small>
                        )}
                      </div>
                      {/* Remove image */}
                      {mediaLogoWithBaseUrl && (
                        <span
                          className="text-decoration-none cursor-pointer text-primary text-danger ml-md-1"
                          onClick={onMediaRemove}
                        >
                          (Remove)
                        </span>
                      )}
                    </div>
                    <div className="ml-auto">
                      <img
                        src={mediaLogoWithBaseUrl}
                        style={{ width: "100px" }}
                      />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="container-fluid">
              <div className="col-sm-12 text-center">
                {currentData && (
                  <DeleteButton
                    className="mr-2"
                    label="Delete"
                    onClick={() => {
                      setModalOpen(false);
                      setDeleteModal(true);
                    }}
                  />
                )}
                {!currentData && <CancelButton onClick={handleToggle} />}
                <Button
                  type="submit"
                  label={`${currentData ? "Update" : "Add"}`}
                />
              </div>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};
export default AddImageModal;
