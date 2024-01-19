import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
import { endpoints } from "../api/endPoints";
import MoreDropdown from "./authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "./reduxTable";

// Action
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as API from "../actions/media";
import { fetchList } from "../actions/table";
import Media from "../helpers/Media";
import MediaUpload from "../helpers/MediaUpload";
import ObjectName from "../helpers/ObjectName";
import { Feature } from "../helpers/Product";
import MediaService from "../services/MediaService";
import DocumentForm from "../views/media/components/documentForm";
import Button from "./Button";
import DeleteModal from "./DeleteModal";
import ImageCarousel from "./static/imageCarousel";
import DragAndDropField from "./FileUpload";
import Drawer from "./Drawer";

const MediaCarousel = (props) => {
  const {
    objectName,
    objectId,
    attachmentsList,
    billView,
    Attachments,
    handleImageUpload,
    selectedFileValue,
    imageUrl,
    editable,
    hideAttachments
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [status, setImageStatus] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    getMediaDetails();
  }, []);

  const getMediaDetails = async () => {
    const response = await MediaService.search(
      props?.objectName,
      props?.objectId
    );
    setSelectedImages(response);
    setImageCount(response && response?.length ? response?.length : "");
  };

  const params = {
    object_id: objectId,
    objectName: objectName,
    status: status,
    pagination: true,
  };

  const handleDeleteMedia = async (id) => {
    if (id) {
      setIsLoading(true)
      await MediaService.delete(id);
      await getMediaDetails();
      dispatch(
        fetchList(
          objectName ? objectName : "image",
          `${endpoints().mediaAPI}/search`,
          1,
          25,
          {
            object_id: objectId,
            objectName: objectName,
          }
        )
      );
      setIsLoading(false)
    }
  };

  const ProductMediaStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  };

  const statusOptions = [
    {
      value: ProductMediaStatus.ACTIVE,
      label: ProductMediaStatus.ACTIVE,
    },
    {
      value: ProductMediaStatus.INACTIVE,
      label: ProductMediaStatus.INACTIVE,
    },
  ];

  const openLightbox = () => {
    setIsOpen(true);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles && acceptedFiles[0]);
    selectedFileValue(acceptedFiles && acceptedFiles[0])
    setErrorMessage("");
  };

  const onDropImage = async (acceptedFiles) => {
    if (!props.onDropImage) {
      setSelectedFile(acceptedFiles && acceptedFiles[0]);
      await MediaUpload.uploadFile(
        acceptedFiles && acceptedFiles[0],
        objectId,
        objectName,
        "",
        Media.VISIBILITY_PRIVATE
      );
      getMediaDetails();
      dispatch(
        fetchList(
          objectName ? objectName : "image",
          `${endpoints().mediaAPI}/search`,
          1, 25,
          {
            object_id: objectId,
            objectName: objectName,
          }
        )
      );
    }
    props.onDropImage(acceptedFiles)
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setSelectedFile("");
  };

  const documentForm = (
    <DocumentForm
      onDrop={onDrop}
      selectedFile={selectedFile}
      handleDelete={handleDelete}
      errorMessage={errorMessage}
      file={props?.file}
      billView={billView}
    />
  );

  const documentFooter = (
    <div className="overflow-hidden">
      <div className="col-sm-10 text-center">
        <Button type="submit" className="h6-5-important" label="Upload" />
      </div>
    </div>
  );

  const handleSubmit = async (values) => {
    await MediaUpload.uploadFile(
      selectedFile,
      objectId,
      objectName,
      values,
      Media.VISIBILITY_PRIVATE,
      isModelOpen ? _toggle : props?.toggle()
    );
    getMediaDetails();
    dispatch(
      fetchList(
        objectName ? objectName : "image",
        `${endpoints().mediaAPI}/search`,
        1,
        25,
        {
          object_id: objectId,
          objectName: objectName,
        }
      )
    );
    setSelectedFile("");
    if (!selectedFile) {
      setErrorMessage("erroe message");
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      if (!file) {
        setErrorMessage("erroe message");
      }
      if (selectedFile || (file && objectId)) {
        const mediaFile = selectedFile ? selectedFile : "";

        const media = selectedFile?.name;
        const name = values?.name;
        const data = new FormData();

        if (mediaFile) {
          data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
        }
        if (media !== undefined) {
          data.append([Media.MEDIA_NAME], media ? media : "");
        }
        data.append("object", ObjectName);

        data.append("object_id", objectId);
        data.append("name", name ? name : "");

        data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);
        // if(
        await MediaService.update(id, data, props?.toggle(), (response) => {
          if (response) {
            dispatch(
              fetchList(
                objectName ? objectName : "image",
                `${endpoints().mediaAPI}/search`,
                1,
                25,
                {
                  object_id: objectId,
                  objectName: objectName,
                }
              )
            );
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _toggle = (e) => {
    setIsModelOpen(!isModelOpen);
  };

  return (
    <div>
      <Drawer
        modelTitle={
          props?.currentData?.name
            ? "Edit Document"
            : props.modalTitle
              ? props.modalTitle
              : "Add Document"
        }
        DrawerBody={documentForm}
        DrawerFooter={documentFooter}
        onSubmit={(values) => {
          if (props?.currentData?.id) {
            handleUpdate(props?.currentData?.id, values);
          } else {
            handleSubmit(values);
            handleImageUpload(values)
          }
        }}
        initialValues={{
          name: props?.currentData?.name ? props?.currentData?.name : "",
        }}
        handleOpenModal={isModelOpen ? _toggle : props.toggle}
        handleCloseModal={isModelOpen ? _toggle : props.toggle}
        handleDrawerClose={isModelOpen ? _toggle : props.toggle}
        isModalOpen={props?.modalOpen ? props?.modalOpen : isModelOpen}
        enableReinitialize={true}
      />
      <div className="my-0 py-3">
        <DeleteModal
          isOpen={deleteModal}
          toggle={() => {
            setDeleteModal(false);
          }}
          title="Delete Image"
          label={deleteRow.name}
          deleteFunction={() => {
            handleDeleteMedia(deleteRow.id);
            setModalOpen(false);
          }}
        />
        {/* Image List Table */}
        {isOpen && (
          <Lightbox
            mainSrc={currentData?.url}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
        {!props.showCarasoul && (
          <ReduxTable
            id={objectName ? objectName : "image"}
            disableHeader={props?.userView || billView ? true : false}
            newTableHeading
            noRecordFoundHeight={"7vh"}
            apiURL={`${endpoints().mediaAPI}/search`}
            searchPlaceholder="Search"
            paramsToUrl={true}
            params={params}
            history={props.history}
            statusOptions={statusOptions}
            sortByDropdown
            onRowClick={(row) => {
              props?.setCurrentData(row);
              props?.setFile(row.file_name);
              props?.toggle(row.id);
              props?.setImageStatus(row.status);
              props?.setImageFeature(row.feature);
            }}
          >
            <ReduxColumn
              width="150px"
              renderField={(row) => {
                if (row.url) {
                  return (
                    <card
                      className="img-fluid"
                      onClick={() => {
                        openLightbox();
                        setCurrentData(row);
                      }}
                    >
                      <div className="d-flex justify-content-around">
                        <img
                          width="50"
                          height="50"
                          src={row.url}
                          alt={row.file_name}
                          className="img-fluid img-thumbnail"
                        />
                      </div>
                    </card>
                  );
                } else
                  return (
                    <a href={row.pdf} download>
                      <button>Download PDF</button>
                    </a>
                  );
              }}
              disableOnClick
            >
              Image
            </ReduxColumn>
            {!billView && (
              <ReduxColumn
                width="150px"
                field="name"
                sortBy="name"
                type="link"
                isClickable="true"
              >
                Name
              </ReduxColumn>
            )}
            {!billView && (
              <ReduxColumn
                className="align-center"
                width="150px"
                field="feature"
                renderField={(row) => (
                  <div className="d-flex justify-content-around">
                    <div
                      className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.feature && row.feature == 1 ? "bg-success" : ""
                        }`}
                    >
                      {row.feature && row.feature == 1 ? (
                        <sapn>Feature</sapn>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
                disableOnClick
              >
                Type
              </ReduxColumn>
            )}
            {!billView && (
              <ReduxColumn
                width="150px"
                field="status"
                sortBy="status"
                renderField={(row) => (
                  <div
                    className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status && row.status === ProductMediaStatus.ACTIVE
                      ? "bg-success"
                      : row.status === ProductMediaStatus.INACTIVE
                        ? "bg-secondary"
                        : ""
                      }`}
                  >
                    <p>{row.status}</p>
                  </div>
                )}
              >
                Status
              </ReduxColumn>
            )}
            <ReduxColumn
              field="Action"
              className="action-column"
              disableOnClick
              renderField={(row) => (
                <div className="text-center action-group-dropdown">
                  <MoreDropdown>
                    {!attachmentsList ? (
                      <>
                        {row.status !== ProductMediaStatus.ACTIVE ? (
                          <DropdownItem
                            onClick={() => {
                              dispatch(
                                API.updateImageStatus(
                                  row.id,
                                  {
                                    status: Media.MEDIA_STATUS_ACTIVE,
                                    objectId: objectId,
                                    objectName: objectName,
                                  },
                                  objectName,
                                  params
                                )
                              );
                            }}
                          >
                            Make As Active
                          </DropdownItem>
                        ) : (
                          <DropdownItem
                            onClick={() => {
                              dispatch(
                                API.updateImageStatus(
                                  row.id,
                                  {
                                    status: Media.MEDIA_STATUS_INACTIVE,
                                    objectId: objectId,
                                    objectName: objectName,
                                  },
                                  objectName,
                                  params
                                )
                              );
                            }}
                          >
                            Make As InActive
                          </DropdownItem>
                        )}
                        <DropdownItem
                          onClick={async () => {
                            dispatch(
                              await API.updateImageStatus(
                                row.id,
                                {
                                  feature: Feature.FEATURE_ENABLED,
                                  objectId: objectId,
                                  objectName: objectName,
                                },
                                objectName,
                                params,
                                props.getDetails
                              )
                            );
                          }}
                        >
                          Set as a featured image
                        </DropdownItem>
                      </>
                    ) : (
                      ""
                    )}
                    <DropdownItem
                      className=" text-danger cursor-pointer"
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteRow(row);
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
        )}
        <div className="cursor-pointer">
          {!hideAttachments && (<h5>Attachments</h5>)}
          {Attachments && !editable && (
            <DragAndDropField onDrop={onDropImage} width={"100%"} />
          )}
        </div>
        {props.showCarasoul && selectedImages && selectedImages.length > 0 || props.showCarasoul && imageUrl && imageUrl.length > 0 ? (
          <>
            <div>
              <ImageCarousel
                photos={imageUrl ? imageUrl : selectedImages}
                showRemove={true}
                isLoading={props.isLoading || isLoading}
                showRemoveTop={props.showRemoveTop}
                handlePhotoDelete={(photo) => {
                  handleDeleteMedia(photo.id);
                  props.handleImageRemove(photo)
                }}
                editable={editable}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;
