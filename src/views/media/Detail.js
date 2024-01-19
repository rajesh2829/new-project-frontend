import { Field } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Label, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";

// Constants
import mediaConstant from "../../helpers/Media";

// components
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import Hint from "../../components/Hint";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Text from "../../components/Text";
import ToggleSwitch from "../../components/ToggleSwitch";
import DeleteModal from "../../components/DeleteModal";
import BreadCrumb from "../../components/Breadcrumb";

// Services Import
import MediaService from "../../services/MediaService";
import classNames from "classnames";
import ActivityList from "../../components/ActivityList";
import ObjectName from "../../helpers/ObjectName";
import Action from "../../components/Action";
export const Tab = {
  GENERAL: "General",
  PRODUCTS: "Products",
  HISTORY: "History",
};

const MediaDetail = (props) => {
  const { history } = props;
  const [file, setFile] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [mediaDetail, setMediaDetail] = useState("");
  const [fileName, setFileName] = useState("");
  const [mediaUrl, setMediaUrl] = useState(mediaDetail && mediaDetail.file_url);
  const [mediaFileTypeError, setMediaFileTypeError] = useState(false);
  const [isFileExist, setIsFileExist] = useState(false);
  const [activeTab, setActiveTab] = useState(Tab.GENERAL);

  const userImageRef = useRef();
  const dispatch = useDispatch();
  // Current Id
  let id = props.match.params.id;

  useEffect(() => {
    getMediaDetails();
  }, []);

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard" },
    { label: "Media", link: "/media" },
    { label: "MediaDetails", link: "" },
  ];

  // Media Visibility Initial values
  const mediaVisibilityInitialValues = {
    make_as_a_private: mediaDetail.visibility === "private" ? true : false,
  };

  //Get Media Details
  const getMediaDetails = () => {
    MediaService.get(id, (err, data) => {
      setMediaDetail(data);
    });
  };

  // Handle media visibility
  const handleEnableSalesRouting = (value) => {
    const data = new FormData();
    if (value !== undefined) {
      data.append("make_as_private", value === true ? "true" : "false");
    }
    updateImage(data);
  };

  // Update Media
  const updateImage = async (data) => {
    await MediaService.update(id, data);
  };

  // Delete Media
  const deleteImage = async (id) => {
    await MediaService.delete(id);
  };

  //Set Media
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
    if (values.name) {
      data.append("name", values.name ? values.name : "");
    }
    if (values.image_description) {
      data.append(
        "image_description",
        values.image_description ? values.image_description : ""
      );
    }
    if (values.image_status) {
      data.append(
        "image_status",
        values.image_status ? values.image_status.label : ""
      );
    }
    if (!isFileExist) {
      updateImage(data);
      setFile("");
      setName("");
      setDescription("");
      setImageStatus("");
      setMediaUrl("");
      setFileName("");
    }
  };

  // Media Url
  const mediaLogoWithBaseUrl = mediaUrl
    ? mediaUrl
    : mediaDetail && mediaDetail.url;
  const initialValues = {
    image_name: mediaDetail ? mediaDetail.name : "",
  };

  // Handle Delete
  const handleDeleteMedia = (id) => {
    deleteImage(mediaDetail.id);
  };

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Status"
        id={mediaDetail.id}
        label={mediaDetail.file_name}
        deleteFunction={handleDeleteMedia}
      />
      {/* Breadd Crumb Section */}
      <BreadCrumb list={breadcrumbList} />

      <div className="row d-flex">
        <div className="col-6">
          <PageTitle label="Media Details" />
        </div>
        <div className="col">
          <div className="float-right">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>
      </div>

      <Nav tabs className="admin-tabs">
        {/* Detail Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.GENERAL,
            })}
            onClick={() => {
              toggle(Tab.GENERAL);
              // _handleTabChange(Tab.SUMMARY);
            }}
          >
            {Tab.GENERAL}
          </NavLink>
        </NavItem>

        {/* History Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.HISTORY,
            })}
            onClick={() => {
              toggle(Tab.HISTORY);
              // _handleTabChange(Tab.HISTORY);
            }}
          >
            {Tab.HISTORY}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.GENERAL}>

          <Form
            enableReinitialize={true}
            initialValues={{
              ...mediaVisibilityInitialValues,
              name: mediaDetail?.file_name,
            }}
            onSubmit={(e) => {
              update(e);
            }}
          >
            <div className="card bg-white mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <div className="row">
                      <div className="field-wrapper d-flex mt-1 ml-1 mb-3 col-lg-12 col-sm-12">
                        <div>
                          <div>
                            <Label className="ml-1">File</Label>
                          </div>
                          <div className="upload-field d-inline-block">
                            <input
                              name="file"
                              className="form-control d-none"
                              type="file"
                              id="portalLogo"
                              placeholder="Banner Image"
                              accept="image/png,image/gif,image/jpeg"
                              onChange={(e) => {
                                onMediaChange(e);
                              }}
                              ref={userImageRef}
                            />
                            <span className="profilePicOverlay d-block ">
                              <label
                                htmlFor="portalLogo"
                                className="profile-img-sm mb-0"
                              >
                                {mediaLogoWithBaseUrl ? (
                                  <span className="text-decoration-none cursor-pointer text-primary">
                                    Select Other Image
                                  </span>
                                ) : (
                                  <span className="text-decoration-none cursor-pointer text-primary">
                                    Select Image
                                  </span>
                                )}
                              </label>
                            </span>
                          </div>
                          <div className="field-wrapper">
                            <small className={`text-danger mt-3 ${"d-none"}`}>
                              Please select a image file
                            </small>
                            <Hint
                              id="bannerRequirements"
                              hintText="We recommended using 400 x 400 image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-sm-12">
                        <Text
                          name="name"
                          label="Name"
                          placeholder="Enter Name"
                          required={true}
                          error=""
                        />
                      </div>
                      <Field
                        name={mediaConstant.MAKE_AS_A_PRIVATE}
                        render={({ field, form }) => {
                          return (
                            <ToggleSwitch
                              name={mediaConstant.MAKE_AS_A_PRIVATE}
                              label1={"Make as a private"}
                              label2={"Make as a private"}
                              value={field.value}
                              handleChange={() => {
                                handleEnableSalesRouting(!field.value);
                                form.setFieldValue(
                                  mediaConstant.MAKE_AS_A_PRIVATE,
                                  !field.value
                                );
                              }}
                              outlined
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <div className="w-100 pl-5 pull-right">
                      <div className="ml-3">
                        <LazyLoad height={200}>
                          <img
                            src={mediaDetail?.url}
                            alt={mediaDetail?.file_name}
                          />
                        </LazyLoad>
                      </div>
                    </div>
                  </div>
                </div>

                <SaveButton />
                <CancelButton onClick={() => history.push("/media")} />
              </div>
            </div>
          </Form>

        </TabPane>
        {activeTab == Tab.HISTORY && (
          <TabPane tabId={Tab.HISTORY} className="w-100">
            <ActivityList
              id={id}
              objectId={id}
              object_name={ObjectName.MEDIA}
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default MediaDetail;
