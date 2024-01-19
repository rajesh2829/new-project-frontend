import React, { useState, useEffect } from "react";

// Components
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import DeleteModal from "../../components/DeleteModal";
import FileUpload from "../../components/fileUpload";
// Api
import { endpoints } from "../../api/endPoints";
import { useDispatch } from "react-redux";
import { Lightbox } from "react-modal-image";
import { createMedia, deleteMediaById } from "../../actions/media";
import { SALE } from "../../helpers/SaleSettlement";
import ObjectName from "../../helpers/ObjectName";
// Action

const MediaTab = (props) => {
  const id = props;
  let saleId = id.id;
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const [data, setData] = useState();
  const [fileName, setFileName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [isRemoveImage, setIsRemoveimage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");
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
      object_id: saleId,
      object_name : "ATTENDANCE",
      pagination : true 
    };
    dispatch(
      deleteMediaById(isRemoveImage,params)
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

  // Handle add media form submission
  const handleSubmit = () => {
    try {
      let value = new Object();
      if (saleId) {
        let data = new FormData();
        if (file) {
          data.append("media_file", file ? file : "");
        }
        if (fileName) {
          data.append("media_name", fileName);
        }
        if (saleId) {
          data.append("object_id", saleId);
          data.append("object", "ATTENDANCE");
        }

        let params = {
          object_id: saleId,
          object_name : "ATTE",
          pagination : true
        };
        if (file && fileName) {
          dispatch(createMedia(data, params, (status) => {}));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-2">
      {imageModal && (
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
      </div>

      <>
        {/* Table */}
        <ReduxTable
          id="media"
          showHeader={false}
          apiURL={`${endpoints().mediaAPI}/search`}
          params={{
            object_id: saleId,
            objectName :ObjectName.ATTENDANCE,
            pagination : true
          }}
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
    </div>
  );
};

export default MediaTab;
