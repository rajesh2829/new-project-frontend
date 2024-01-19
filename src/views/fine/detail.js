import React, { useEffect, useState } from "react";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";
import Numbers from "../../lib/Number";
import String from "../../lib/String";
import { useDispatch } from "react-redux";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";
import StatusComponent from "../../components/Status";
import UserCard from "../../components/UserCard";
import MediaUpload from "../../helpers/MediaUpload";
import ObjectName from "../../helpers/ObjectName";
import Urls from "../../helpers/Url";
import fineService from "../../services/FineService";
import MediaService from "../../services/MediaService";
import CompanyUserService from "../../services/UserService";
import FineForm from "./fineForm";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classNames from "classnames";
import ActivityList from "../../components/ActivityList";
import MediaCarousel from "../../components/MediaCarousel";
import TagService from "../../services/TagService";
import Permission from "../../helpers/Permission";
import { hasPermission } from "../../services/UserRolePermissionService";
import Comment from "../../components/comment";
import DateTime from "../../lib/DateTime";
import Action from "../../components/Action";
import Button from "../../components/Button";

export const Tab = {
  GENERAL: "General",
  HISTORY: "History",
  COMMENTS: "Comments"
};

const FineDetail = (props) => {
  const { history } = props;
  const [userData, setUserData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [fineData, setFineData] = useState();
  const [fineTypeData, setFineTypeData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setMediaDelete] = useState(false);
  const [activeTab, setActiveTab] = useState(Tab.GENERAL);
  const [tagList, setTagList] = useState();
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [imageCount, setImageCount] = useState(0);
  const [editable, setEditable] = useState(true);
  let showHistory = hasPermission(Permission.FINE_HISTORY_VIEW)
  let id = props?.match?.params?.id

  let showEditButton = hasPermission(Permission.FINE_EDIT);
  const getUser = (media_url, firstName, LastName) => {
    return (
      <>
        <UserCard lastName={LastName} firstName={firstName} url={media_url} />
      </>
    );
  };

  useEffect(() => {
    getUserList();
    getFineDetails();
  }, []);

  useEffect(() => {
    if (fineData && fineData.type) {
      getTagList();
    }
  }, [fineData]);

  const getTagList = async () => {
    let tagList = await TagService.getOption();
    setTagList(tagList);
  }

  const dispatch = useDispatch();
  const getUserList = async () => {
    const data = await CompanyUserService.list();
    let user = data.data;
    const userList = [];
    user &&
      user.forEach((list) => {
        userList.push({
          value: list.id,
          label: getUser(list?.media_url, list?.first_name, list?.last_name),
        });
      });
    setUserData(userList);
  };


  const getFineDetails = async () => {
    let Id = props?.match?.params?.id;
    const data = await fineService.get(Id);
    setFineData(data?.data?.data);
  };


  const handleSubmit = async (values) => {
    const data = new FormData();

    data.append("date", values?.date && DateTime.formatDate(values?.date));
    data.append("user", Numbers.Get(values?.user?.id));
    data.append("reviewer", Numbers.Get(values?.reviewer?.id));
    data.append("amount", Numbers.Get(values?.amount));
    data.append("type", Numbers.Get(values?.type?.value));
    data.append("notes", String.Get(values?.notes));
    data.append("due_date", values && values?.due_date ? values?.due_date : "");
    dispatch(await fineService.update(props?.match?.params?.id, data, (res) => {
      if (res) {

        setIsLoading(true)
        getFineDetails()
        setIsLoading(false)
        setEditable(true);
      }
    }));

  };

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Fines",
      link: Urls.FINE_LIST,
    },
    {
      label: "Fine Details",
      link: "",
    },
  ];

  const onStatusChange = async (value) => {
    const data = {};
    data.status = value;
    const id = props.match.params.id;
    dispatch(await fineService.updateStatus(id, data));
  };

  const deleteFine = async (id, params) => {
    dispatch(await fineService.delete(id, {}));
    history.push("/fine");
  };

  const onDrop = async (acceptedFiles) => {
    await MediaUpload.uploadFile(acceptedFiles && acceptedFiles[0], id, ObjectName.FINE, null, null, (response) => {
      if (response) {
        getFineDetails()
      }
    })
  };

  const deleteMedia = async (mediaId) => {
    if (mediaId) {
      MediaService.delete(mediaId, () => {
        getFineDetails();
      });
    }
  };

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const __toggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DeleteModal
        id={fineData?.id}
        label={fineData?.id}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Fine"
        deleteFunction={() => deleteFine(fineData?.id, {})}
      />
      <DeleteModal
        id={fineData?.id}
        label={fineData?.mediaName}
        isOpen={openDeleteModal}
        toggle={() => {
          setMediaDelete(false);
        }}
        title="Delete Media"
        deleteFunction={() => deleteMedia(fineData?.mediaId)}
      />
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Fine Details" />
        <div className="d-flex">
          {showEditButton && editable && activeTab !== Tab.HISTORY && (
            <Button
              label="Edit"
              loadingLabel="Editable"
              className="mr-1"
              disabled={editable == false ? true : false}
              onClick={() => {
                setEditable(false);
              }}
            />
          )}

          <div className="ml-2">
            <StatusComponent
              objectName={ObjectName.FINE}
              handleChange={(values) => onStatusChange(values)}
              buttonLabel={fineData?.statusName}
              currentStatusId={fineData?.statusValue}
            />
          </div>
          <div className="ml-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div></div>
      </div>
      <Nav tabs className="admin-tabs">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.GENERAL,
            })}
            onClick={() => {
              toggle(Tab.GENERAL);
            }}>
            General
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.COMMENTS,
            })}
            onClick={() => {
              toggle(Tab.COMMENTS);
            }}
          >
            {Tab.COMMENTS}
          </NavLink>
        </NavItem>
        {showHistory &&
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.HISTORY,
              })}
              onClick={() => {
                toggle(Tab.HISTORY);
              }}>
              {Tab.HISTORY}
            </NavLink>
          </NavItem>}
      </Nav>
      <TabContent activeTab={activeTab}>
        {activeTab == Tab.GENERAL &&
          <TabPane tabId={Tab.GENERAL} className="w-100">
            <div className="card-body card">
              <Form
                initialValues={{
                  date: fineData?.date,
                  user:
                    userData && userData.find((fine) => fine.value === fineData?.user),
                  reviewer:
                    userData &&
                    userData.find((fine) => fine.value === fineData?.reviewer),
                  type:
                    tagList &&
                    tagList.find((fine) => fine.value === fineData?.type),
                  amount: fineData?.amount,
                  notes: fineData?.notes,
                  due_date: fineData?.due_date,
                  reviewer: userData && userData.find((fine) => fine.value === fineData?.reviewer)
                }}
                enableReinitialize
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <div className="row">
                  <div className="col-sm-7">
                    <FineForm TagList={setTagList} finedata={fineData?.user} editable={editable} />
                    {!editable && (
                      <div className="mt-2">
                        <SaveButton type="submit" label="Save" />
                        <CancelButton
                          onClick={() => {
                            history.push("/fine");
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-sm-5">
                    <MediaCarousel
                      showCarasoul
                      title="Bill"
                      objectName={ObjectName.FINE}
                      objectId={id}
                      history={history}
                      billView={true}
                      attachmentsList={true}
                      modalOpen={isModelOpen}
                      toggle={__toggle}
                      setIsModelOpen={setIsModelOpen}
                      imageCount={setImageCount}
                      numberOfImage={imageCount}
                      Attachments={"Attachments"}
                      editable={editable}
                    />
                  </div>
                </div>

              </Form>
            </div>
          </TabPane>}
        {showHistory && activeTab == Tab.HISTORY &&
          <TabPane tabId={Tab.HISTORY} className="w-100">
            <ActivityList
              id={id}
              objectId={id}
              object_name={ObjectName.FINE}
              history={history}
            />
          </TabPane>}
        <TabPane tabId={Tab.COMMENTS} className='w-100'>
          <Comment
            objectId={id}
            objectName={ObjectName.FINE}
            maxHeight="100vh"
          />
        </TabPane>
      </TabContent>
    </>

  );
};

export default FineDetail;
