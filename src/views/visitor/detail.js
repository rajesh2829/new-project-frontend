import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import DragAndDropField from "../../components/FileUpload";
import Form from "../../components/Form";
import FeatureImage from "../../components/Image";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Media from "../../helpers/Media";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import Url from "../../lib/Url";
import MediaService from "../../services/MediaService";
import { hasPermission } from "../../services/UserRolePermissionService";
import visitorService from "../../services/VisitorService";
import VisitorForm from "./visitorForm";
import Numbers from "../../lib/Number";
import Action from "../../components/Action";
import Button from "../../components/Button";

export const VisitorDetailDetailTab = {
  GENERAL: "General",
  HISTORY: "History",
};

const VisitorDetail = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [visitorDetail, setvisitorDetail] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [openDeleteModal, setMediaDelete] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [editable, setEditable] = useState(true);

  let id = props.match.params.id;
  const param = new URLSearchParams(props.history.location.search);
  const role = param.get("section");
  let showHistory = hasPermission(Permission.VISITOR_HISTORY_VIEW);
  let showEditButton = hasPermission(Permission.VISITOR_EDIT);
  const [activeTab, setActiveTab] = useState(
    role ? role : VisitorDetailDetailTab.GENERAL
  );
  const dispatch = useDispatch();
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    { label: "Visitor", link: "/visitor" },
    { label: "Visitor Detail", link: "" },
  ];

  const toggle = (tab) => {
    setIsOpen(!isOpen);

    setActiveTab(tab || role);
  };

  useEffect(() => {
    getVisitordetail();
  }, []);

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  const delteVisitor = async (id, params) => {
    dispatch(
      await visitorService.delete(id, params, {
        pagination: true,
        sort: "id",
        sortDir: "DESC",
        page: Url.GetParam("page") || "",
        pageSize: Url.GetParam("pageSize") || "",
      })
    );
    props.history.push("/visitor");
  };

  const getVisitordetail = async () => {
    let id = props.match.params.id;
    let response = await visitorService.get(id);
    setvisitorDetail(response);
  };

  const initialValues = {
    visitor: visitorDetail?.name ? visitorDetail?.name : "",
    mobileNumber: visitorDetail?.phone ? visitorDetail?.phone : "",
    purpose: visitorDetail?.purpose ? visitorDetail?.purpose : "",
    notes: visitorDetail?.notes ? visitorDetail?.notes : "",
    type:
      tagList && tagList.length > 0
        ? tagList.find((tag) => tag.id === visitorDetail?.type)
        : {
          label: visitorDetail?.typeName,
          value: visitorDetail?.type,
        },
  };

  const handleUpdate = async (id, values) => {
    const data = new FormData();
    setEditable(true);
    data.append("name", values?.visitor);
    data.append("phone", values?.mobileNumber);
    data.append("purpose", values?.purpose);
    data.append("notes", values?.notes);
    data.append("type", Numbers.Get(values?.type?.value));
    dispatch(await visitorService.update(id, data, uploadFile));
    setEditable(false);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles);
  };

  const deleteMedia = async (mediaId) => {
    if (mediaId) {
      MediaService.delete(mediaId, () => {
        getVisitordetail();
      });
    }
  };

  const uploadFile = async (objectId) => {
    try {
      if (selectedFile && objectId) {
        const mediaFile = selectedFile ? selectedFile : "";

        const media = selectedFile?.name;

        const data = new FormData();

        if (mediaFile) {
          data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
        }
        if (media !== undefined) {
          data.append([Media.MEDIA_NAME], media ? media : "");
        }
        data.append("object", ObjectName.VISITOR);

        data.append("object_id", objectId);

        data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

        const response = await MediaService.saveImage(data);
        let media_file = {
          media_id: response.id,
        };
        dispatch(
          await visitorService.updateMedia(
            visitorDetail?.id,
            media_file,
            getVisitordetail
          )
        );
        setSelectedFile("");
      }
    } catch (err) {
      console.log(err);
    }
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
    <div>
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        <PageTitle label={visitorDetail?.name} />

        <div className="pl-2 d-flex">
          {showEditButton && editable && (
            <Button
              label="Edit"
              className="mr-1"
              onClick={() => {
                setEditable(false);
              }}
            />
          )}
          <Action
            dropdownLinks={actionsMenuList}
            handleChange={handleActionChange}
          />
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Visitor"
        id={props.match.params.id}
        label={visitorDetail?.name}
        deleteFunction={delteVisitor}
      />
      <DeleteModal
        id={visitorDetail?.id}
        label={`${visitorDetail?.name} image`}
        isOpen={openDeleteModal}
        toggle={() => {
          setMediaDelete(false);
        }}
        title="Delete Media"
        deleteFunction={() => deleteMedia(visitorDetail?.media_id)}
      />
      <Nav tabs className="admin-tabs mt-2">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === VisitorDetailDetailTab.GENERAL,
            })}
            onClick={() => {
              toggle(VisitorDetailDetailTab.GENERAL);
              _handleTabChange(VisitorDetailDetailTab.GENERAL);
            }}
          >
            {VisitorDetailDetailTab.GENERAL}
          </NavLink>
        </NavItem>
        {showHistory && (
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === VisitorDetailDetailTab.HISTORY,
              })}
              onClick={() => {
                toggle(VisitorDetailDetailTab.HISTORY);
                _handleTabChange(VisitorDetailDetailTab.HISTORY);
              }}
            >
              {VisitorDetailDetailTab.HISTORY}
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <TabContent>
        {activeTab === VisitorDetailDetailTab.GENERAL && (
          <TabPane>
            <div className="row card-body">
              <div className="col-lg-8 col-sm-8 col-md-8 card card-body">
                <Form
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    let id = props.match.params.id;
                    handleUpdate(id, values);
                  }}
                >
                  <VisitorForm
                    TagList={setTagList}
                    name={visitorDetail?.name}
                    editable={editable}
                  />
                  {!editable && (
                    <>
                      <SaveButton label="Save" />
                      <CancelButton
                        onClick={() => {
                          props.history.push("/visitor");
                        }}
                      />
                    </>
                  )}
                </Form>
              </div>
              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  {visitorDetail?.media_id && visitorDetail?.media_url ? (
                    <>
                      <FeatureImage
                        src={visitorDetail?.media_url}
                        alt="Visitor image"
                        size={"large"}
                      />
                      <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <DeleteButton
                          label="Remove"
                          onClick={() => {
                            setMediaDelete(true);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <DragAndDropField
                        onDropFile={onDrop}
                        width="350px"
                        height="300px"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabPane>
        )}
        {showHistory && activeTab === VisitorDetailDetailTab.HISTORY && (
          <TabPane>
            <ActivityList
              id={id}
              objectId={id}
              object_name={ObjectName.VISITOR}
            />
          </TabPane>
        )}
      </TabContent>
    </div>
  );
};

export default VisitorDetail;
