import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  TabContent,
  TabPane,
} from "reactstrap";
//Assets
import DeleteModal from "../../components/DeleteModal";
//Components
import DeleteButton from "../../components/DeleteButton";
import Hint from "../../components/Hint";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
//Config
// Action
import * as API from "../../actions/media";
import Media from "../../helpers/Media";
import AddModal from "../../components/Modal";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import { connect } from "react-redux";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import ImageList from "./components/mediaList";
import BulkUpdateModal from "./components/bulkUpdateModal";
import OutlineButton from "../../components/OutlineButton";
import AddButton from "../../components/AddButton";
import NavTab from "../../components/NavTab";
import classNames from "classnames";

const privateMedia = "mediaPrivate";
const publicMedia = "mediaPublic";
const archivedMedia = "mediaArchive";

const MediaList = (props) => {
  const {
    PublicMedia,
    PrivateMedia,
    ArchiveMedia,
    history,
    privateMediaCurrentPage,
    publicMediaCurrentPage,
    PrivateMediaPageSize,
    PublicMediaPageSize,
    ArchiveMediaCurrentPage,
    ArchiveMediaPageSize,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState();
  const [media, setMedia] = useState();
  const [mediaFile, setMediaFile] = useState({});
  const [mediaFileTypeError, setMediaFileTypeError] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [visibility, setVisibility] = useState("");
  const [currentData, setCurrentData] = useState();
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || Media.TAB_PRIVATE
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentParams, setCurrentParams] = useState();

  const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([0]);
  const [selectedObjectName, setSelectedObjectName] = useState(
    Url.GetParam("object_name")
  );

  // Use Effect
  useEffect(() => {
    isLoggedIn();
  }, []);

  // Toggle Tab
  const tabChange = (tab) => {
    setActiveTab(tab);
  };

  const mediaRef = useRef();
  const dispatch = useDispatch();

  // Media image upload
  const onMediaChange = (e) => {
    validateFile(e, Media.MEDIA_URL);
    if (!mediaFileTypeError) {
      mediaUpload(e);
    }
  };

  // Toggling the Bulk Update Modal
  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!openBulkUpdateModal);
  };

  // Selected Ids
  const handleBulkSelect = (ids) => {
    setSelectedIds({ selectedIds: ids });
  };

  // Media Upload
  const mediaUpload = (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    if (files) {
      const fileUrl = URL.createObjectURL(files);
      setMediaUrl(fileUrl);
      setMedia(files.name);
      setMediaFile(files);
    }
  };

  // Portal logo image remove
  const onMediaRemove = () => {
    setMediaFileTypeError(false);
    mediaRef.current.value = "";
    setMediaUrl("");
    setMedia("");
    setMediaFile("");
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
          File === Media.MEDIA_URL && setMediaFileTypeError(false);
          break;
        default:
          File === Media.MEDIA_URL && setMediaFileTypeError(true);
          break;
      }
    }
  };

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const toggle = () => {
    setIsOpen(!isOpen);
    setMediaUrl("");
    setMedia("");
    setCurrentId("");
    setMediaFile("");
    setVisibility("");
    setCurrentData("");
  };

  const handleSave = (values) => {
    const data = new FormData();

    if (mediaFile) {
      data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
    }
    if (media !== undefined) {
      data.append([Media.MEDIA_NAME], media ? media : "");
    }
    if (mediaUrl !== undefined) {
      data.append([Media.MEDIA_URL], mediaUrl ? mediaUrl : "");
    }
    data.append(
      [Media.MEDIA_VISIBILITY],
      values && values.visibility ? values.visibility.value : ""
    );
    data.append("medialist", "medialist");

    handleSaveImage(data);
    setVisibility("");
  };

  /**
   * Create API
   *
   * @param data
   */
  const handleSaveImage = (data) => {
    dispatch(API.saveImage(data, { sort: Url.GetParam("sort") }, "", toggle));
  };

  /**
   * Delete API
   *
   * @param data
   */
  const handleDeleteMedia = (id) => {
    dispatch(API.deleteMedia(currentId, {}));
    toggle();
  };

  // Media Url
  const mediaLogoWithBaseUrl = mediaUrl ? mediaUrl : "";

  const mediaVisibility = [
    {
      value: Media.VISIBILITY_PUBLIC,
      label: Media.VISIBILITY_PUBLIC_TEXT,
    },
    {
      value: Media.VISIBILITY_PRIVATE,
      label: Media.VISIBILITY_PRIVATE_TEXT,
    },
  ];

  const handleVisibilityChange = (value) => {
    setVisibility(
      value &&
      value.values &&
      value.values.visibility &&
      value.values.visibility.value
    );
  };

  const addImageForm = (
    <div className="mt-2 mb-3">
      {!currentId && (
        <Select
          name="visibility"
          label="Visibility"
          options={mediaVisibility}
          error=""
          required={true}
        />
      )}
      <h5 className="font-weight-bold">Image</h5>
      <div className="field-wrapper d-flex">
        <div>
          <div className="upload-field d-inline-block">
            <input
              name="file"
              className="form-control d-none"
              type="file"
              id="image"
              placeholder="Banner Image"
              accept="image/png,image/gif,image/jpeg"
              onChange={(e) => {
                onMediaChange(e);
              }}
              ref={mediaRef}
            />
            <span className="profilePicOverlay d-block ">
              <label htmlFor="image" className="profile-img-sm mb-0">
                <span className="text-decoration-none cursor-pointer text-primary">Upload Image</span>
              </label>
            </span>
          </div>
          {/* Remove image */}
          {mediaUrl && (
            <span
              className="text-decoration-none cursor-pointer text-primary text-danger ml-md-1"
              onClick={onMediaRemove}
            >
              (Remove)
            </span>
          )}
          <div className="field-wrapper">
            <small className={`text-danger mt-3 ${"d-none"}`}>
              Please select a image file
            </small>
            <Hint
              id="bannerRequirements"
              hintText="We recommended using 400 x 600 image"
            />
          </div>
        </div>
        <div className="w-25 ml-auto">
          <img src={mediaLogoWithBaseUrl} />
        </div>
      </div>
    </div>
  );

  const imageFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        {currentId && (
          <DeleteButton
            className="mr-2"
            label="Delete"
            onClick={() => {
              toggle;
              setDeleteModal(true);
            }}
          />
        )}
        {!currentId && <SaveButton type="submit" label={"Upload Image"} />}
      </div>
    </div>
  );

  const openDeleteModal = (id, currentData, params) => {
    setCurrentData(currentData);
    setCurrentParams(params);
    setCurrentId(id);
    setDeleteModal(!deleteModal);
  };
  const handleStatusChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };
  const _handleStatusChange = (e) => {
    if (e == Media.TAB_PRIVATE) {
      tabChange(Media.TAB_PRIVATE);
      handleStatusChange(Media.TAB_PRIVATE);
    }

    if (e == Media.TAB_PUBLIC) {
      tabChange(Media.TAB_PUBLIC);
      handleStatusChange(Media.TAB_PUBLIC);
    }

    if (e == Media.TAB_ARCHIVE) {
      tabChange(Media.TAB_ARCHIVE);
      handleStatusChange(Media.TAB_ARCHIVE);
    }
  };
  const privateMediaTabChange = () => {
    tabChange(Media.TAB_PRIVATE);
    _handleStatusChange(Media.TAB_PRIVATE);
  };

  const publicMediaTabChange = () => {
    tabChange(Media.TAB_PUBLIC);
    _handleStatusChange(Media.TAB_PUBLIC);
  };

  const archiveMediaTabChange = () => {
    tabChange(Media.TAB_ARCHIVE);
    _handleStatusChange(Media.TAB_ARCHIVE);
  };
  const NavTabList = [
    {
      label: Media.TAB_PRIVATE,
      onClick: privateMediaTabChange,
      count: PrivateMedia,
      className: classNames({ active: activeTab === Media.TAB_PRIVATE }),
    },
    {
      label: Media.TAB_PUBLIC,
      onClick: publicMediaTabChange,
      count: PublicMedia,
      className: classNames({ active: activeTab === Media.TAB_PUBLIC }),
    },
    {
      label: Media.TAB_ARCHIVE,
      onClick: archiveMediaTabChange,
      count: ArchiveMedia,
      className: classNames({ active: activeTab === Media.TAB_ARCHIVE }),
    },
  ];

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        label={currentData?.name}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Image"
      />

      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle={`${currentId ? "Delete" : "Add"} Image`}
        modalBody={addImageForm}
        modalFooter={imageFooter}
        initialValues={{ visibility: "" }}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleSave(values);
        }}
        hideDefaultButtons
      />
      <BulkUpdateModal
        isOpen={openBulkUpdateModal}
        toggle={toggleBulkUpdateModal}
        MediaParam={selectedIds}
      />

      <div className="d-flex justify-content-between">
        {/* /.page-heading */}
        <PageTitle
          label="Media"
          className="addNewModal justify-content-between"
        />
        <div className="justify-content-between">
          <OutlineButton
            label="Bulk Update"
            onClick={() => {
              toggleBulkUpdateModal();
            }}
            backgroundColor="var(--bulkUpdate-button-bg-color)"
            borderColor="var(--bulkUpdate-button-border-color)"
            color="var(--bulkUpdate-button-text-color)"
            disabled={
              selectedIds &&
                selectedIds.selectedIds &&
                selectedIds.selectedIds.length > 0
                ? false
                : true
            }
          />
          <AddButton
            className="ml-2"
            onClick={(e) => {
              toggle();
            }}
            label="Add New"
          />
        </div>
      </div>

      <div className="bg-white mt-3 card-body">
        <NavTab list={NavTabList} />

        <TabContent activeTab={activeTab}>
          {activeTab == Media.TAB_PRIVATE && (
            <TabPane tabId={Media.TAB_PRIVATE}>
              <ImageList
                id={"mediaPrivate"}
                tab={Media.TAB_PRIVATE}
                object_name={selectedObjectName ? selectedObjectName : ""}
                sortByOption={sortByOption}
                visibilityTab={Media.VISIBILITY_PRIVATE}
                openDeleteModal={openDeleteModal}
                history={history}
                handleBulkSelect={handleBulkSelect}
                privateMediaCurrentPage={privateMediaCurrentPage}
                PrivateMediaPageSize={PrivateMediaPageSize}
                ShowObjectNameFilter
              />
            </TabPane>
          )}

          {activeTab == Media.TAB_PUBLIC && (
            <TabPane tabId={Media.TAB_PUBLIC}>
              <ImageList
                id={"mediaPublic"}
                tab={Media.TAB_PUBLIC}
                sortByOption={sortByOption}
                object_name={selectedObjectName ? selectedObjectName : ""}
                visibilityTab={Media.VISIBILITY_PUBLIC}
                history={history}
                openDeleteModal={openDeleteModal}
                handleBulkSelect={handleBulkSelect}
                publicMediaCurrentPage={publicMediaCurrentPage}
                PublicMediaPageSize={PublicMediaPageSize}
                ShowObjectNameFilter
              />
            </TabPane>
          )}

          {/* Archive Image List */}
          {activeTab == Media.TAB_ARCHIVE && (
            <TabPane tabId={Media.TAB_ARCHIVE}>
              <ImageList
                id={"mediaArchive"}
                tab={Media.TAB_ARCHIVE}
                sortByOption={sortByOption}
                object_name={selectedObjectName ? selectedObjectName : ""}
                visibilityTab={Media.VISIBILITY_ARCHIVE}
                history={history}
                openDeleteModal={openDeleteModal}
                handleBulkSelect={handleBulkSelect}
                ArchiveMediaCurrentPage={ArchiveMediaCurrentPage}
                ArchiveMediaPageSize={ArchiveMediaPageSize}
                ShowObjectNameFilter
              />
            </TabPane>
          )}
        </TabContent>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get InactiveStore count
  const PublicMedia =
    reduxTable[publicMedia] && reduxTable[publicMedia].isFetching == false
      ? reduxTable[publicMedia].totalCount
      : 0;
  const publicMediaCurrentPage =
    reduxTable[publicMedia] && !reduxTable[publicMedia].isFetching
      ? reduxTable[publicMedia].currentPage
      : 1;
  // Get ActiveStore count
  const PrivateMedia =
    reduxTable[privateMedia] && reduxTable[privateMedia].isFetching == false
      ? reduxTable[privateMedia].totalCount
      : 0;

  const privateMediaCurrentPage =
    reduxTable[privateMedia] && !reduxTable[privateMedia].isFetching
      ? reduxTable[privateMedia].currentPage
      : 1;

  const ArchiveMedia =
    reduxTable[archivedMedia] && reduxTable[archivedMedia].isFetching == false
      ? reduxTable[archivedMedia].totalCount
      : 0;

  const ArchiveMediaCurrentPage =
    reduxTable[archivedMedia] && !reduxTable[archivedMedia].isFetching
      ? reduxTable[archivedMedia].currentPage
      : 1;

  const PrivateMediaPageSize =
    reduxTable[privateMedia] && !reduxTable[privateMedia].isFetching
      ? reduxTable[privateMedia].pageSize
      : 25;

  const PublicMediaPageSize =
    reduxTable[publicMedia] && !reduxTable[publicMedia].isFetching
      ? reduxTable[publicMedia].pageSize
      : 25;

  const ArchiveMediaPageSize =
    reduxTable[archivedMedia] && !reduxTable[archivedMedia].isFetching
      ? reduxTable[archivedMedia].pageSize
      : 25;

  return {
    PublicMedia,
    PrivateMedia,
    ArchiveMedia,
    privateMediaCurrentPage,
    publicMediaCurrentPage,
    PublicMediaPageSize,
    ArchiveMediaCurrentPage,
    PrivateMediaPageSize,
    ArchiveMediaPageSize,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MediaList);
