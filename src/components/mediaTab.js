import React, { useState, useRef, useEffect } from "react";
import { DropdownItem, Modal } from "reactstrap";
import { Lightbox } from "react-modal-image";
import { useDispatch } from "react-redux";

// Components
import PageTitle from "./PageTitle";
import ReduxTable, { ReduxColumn } from "./reduxTable";
import MoreDropdown from "./authentication/moreDropdown";
import DeleteModal from "./DeleteModal";
import FileUpload from "./fileUpload";

// Api
import { endpoints } from "../api/endPoints";

// Action
import { addPurchaseMedia, deleteMedia } from "../actions/purchase";
import { deleteMediaById } from "../actions/media";

const MediaTab = (props) => {

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [isRemoveImage, setIsRemoveimage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");


  const id = props.Id;
  const ObjectName = props.ObjectName;

  let dispatch = useDispatch();

  useEffect(() => {
    setBase64Image();
  }, [file]);

  useEffect(() => {
    handleSubmit();
  }, [imageUrl]);

  const _toggle = () => {
    setDeleteModal(!deleteModal);
  };

  const onMediaChange = (e) => {
    handleMedia(e);
  };

  const handleMedia = (e) => {
    const file = e.target.files ? e.target.files[0] : "";
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const removeImage = async () => {
    let params = {
      object_id: id,
      object_name: ObjectName,
      pagination: true
    };
    dispatch(
      deleteMediaById(isRemoveImage, params)
    );
    setDeleteModal(false);
  };

  // Set image preview in state
  const setBase64Image = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    }
  };

  const isVideoURL = (url) => {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    const fileExtension = url.slice(url.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(fileExtension);
  };

  const handleSubmit = () => {
    try {
      let value = new Object();
      if (id) {
        let data = new FormData();
        if (file) {
          data.append("media_file", file ? file : "");
        }
        if (fileName) {
          data.append("media_name", fileName);
        }
        if (id) {
          data.append("object_id", id);
          data.append("object", ObjectName);
        }
        let params = {
          object_id: id,
          object_name: ObjectName,
          objectName: ObjectName,
          pagination: true,
        };
        if (file && fileName) {
          dispatch(addPurchaseMedia(data, params, id, (status) => { }));
        }
      } else {
        const data = [];
        value.file = file ? file : "";
        value.imageUrl = imageUrl ? imageUrl : "";
        if (file && imageUrl) {
          data.push(value);
        }
        const data1 = props.imageList ? props.imageList.concat(data) : data;
        props.setImageList(data1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {imageModal && isVideoURL(url) && (

        <Modal
          isOpen={imageModal}
          onRequestClose={() => {
            setImageModal(false);
          }}
          contentLabel="Video Modal"
        >
          <div>
            <button onClick={() => {
              setImageModal(false);
            }}>Close</button>
            <video controls width="100%" height="100%">
              <source src={image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Modal>
      )}
      {imageModal && !isVideoURL(url) && (

        <Lightbox
          medium={image}
          large={image}
          onClose={() => {
            setImageModal(false);
          }}
        />
      )}

      <DeleteModal
        isOpen={deleteModal}
        toggle={_toggle}
        title="Delete image "
        id={isRemoveImage}
        label={isRemoveImage}
        deleteFunction={removeImage}
      />

      <div className="d-flex justify-content-between">
        <PageTitle label="Attachments" />
        <FileUpload
          onChange={onMediaChange}
          label="Upload"
          className="file-upload"
          accept="image/png,image/gif,image/jpeg"
        />
      </div>

      {!id ? (
        <>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col" className="table-name text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {props.imageList &&
                props.imageList.length > 0 &&
                props.imageList.map((image, index) => (
                  <tr>
                    <td>
                      <img
                        src={image.imageUrl}
                        alt={image.file.name}
                        width="50"
                        height="50"
                        className="border-0"
                        onClick={() => {
                          setImageModal(true);
                          setImage(image.imageUrl);
                        }}
                      />
                    </td>
                    <td className="d-flex justify-content-end">
                      <div className="text-center action-group-dropdown">
                        <MoreDropdown>
                          <DropdownItem
                            className="text-danger"
                            onClick={() => {
                              _toggle();
                              setIsRemoveimage(image.file.name);
                            }}
                          >
                            Remove
                          </DropdownItem>
                        </MoreDropdown>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          {/* Table */}
          <ReduxTable
            id="media"
            showHeader={false}
            apiURL={`${endpoints().mediaAPI}/search`}
            params={{
              object_id: props && props.Id,
              objectName: props && props.ObjectName
            }}
            paramsToUrl={true}
          >
            <ReduxColumn
              width="150px"
              renderField={(row) => (
                <card className="img-fluid">
                  <img
                    width="50"
                    height="50"
                    src={row.url}
                    alt={row.name}
                    className="img-fluid img-thumbnail"
                    onClick={() => {
                      setImageModal(true);
                      setImage(row.url);
                      setUrl(row.file_name)
                    }}
                  />
                </card>
              )}
            >
              Image
            </ReduxColumn>
            <ReduxColumn field="name">Name</ReduxColumn>
            <ReduxColumn
              field="Action"
              disableOnClick
              width="120px"
              renderField={(row) => (
                <div className="text-center action-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      className="text-danger"
                      onClick={() => {
                        setIsRemoveimage(row.id);
                        setDeleteModal(true);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </MoreDropdown>
                </div>
              )}
            >
              Action
            </ReduxColumn>
          </ReduxTable>
        </>
      )}
    </>
  );
};

export default MediaTab;
