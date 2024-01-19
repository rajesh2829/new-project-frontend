import classnames from "classnames";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Components
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from '../../components/Breadcrumb';
import CancelButton from '../../components/CancelButton';
import DateSelector from '../../components/Date';
import DeleteModal from '../../components/DeleteModal';
import Form from '../../components/Form';
import PageTitle from '../../components/PageTitle';
import SaveButton from '../../components/SaveButton';
import Select from '../../components/Select';
import Text from '../../components/Text';
import TextArea from '../../components/TextArea';
import Action from '../../components/Action';
import Button from "../../components/Button";
import MediaCarousel from '../../components/MediaCarousel';
import NumberField from "../../components/Number";
import SelectStore from '../../components/SelectStore';
import SingleCheckbox from "../../components/SingleCheckbox";
import Spinner from '../../components/Spinner';
import UserCard from '../../components/UserCard';
import UserSelect from '../../components/UserSelect';

// API
import { endpoints } from '../../api/endPoints';
import { apiClient } from '../../apiClient';

// Services
import AttendanceService from '../../services/AttendanceService';
import ShiftService from '../../services/ShiftService';
import { getStoresList } from '../../services/StoreListService';
import { hasPermission } from '../../services/UserRolePermissionService';
import UserService from "../../services/UserService";


// Helpers
import { lateHoursStatusOptions, statusOptions, typeOptions } from '../../helpers/Attendance';
import Permission from '../../helpers/Permission';
import ObjectName from "../../helpers/ObjectName";

// Lib
import DateTime from "../../lib/DateTime";
import String from '../../lib/String';
import Number from "../../lib/Number";
import Url from '../../lib/Url';

export const tab = {
  ACTIVE: "Active",
  ARCHIVED: "Archived",
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ALL: "All",
};

export const AttendanceDetailTab = {
  GENERAL: "General",
  HISTORY: "History"
};

const AttendanceDetail = (props) => {
  const [editable, setEditable] = useState(true);
  const id = props.match.params.id;
  // Use States
  const [deleteModal, setDeleteModal] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [attendanceDetail, setAttendanceDetail] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [shiftList, setShiftList] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const ATTENDANCE = "ATTENDANCE";
  const HISTORY_TAB = "History ";
  const { history } = props;
  // Defining the param based on url search values
  const param = new URLSearchParams(props.history.location.search);
  // Defining the clicked tab value from section in url
  const role = param.get("section");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    role ? role : AttendanceDetailTab.GENERAL
  );
  let showHistory = hasPermission(Permission.ATTENDANCE_HISTORY_VIEW)
  let showDeleteButton = hasPermission(Permission.ATTENDANCE_DELETE)
  let showEditButton = hasPermission(Permission.ATTENDANCE_EDIT);

  // Use Dispatch
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    getUsersList();
    getAttendanceDetail();
    getStore();
    getShift();
  }, []);

  const getUserName = (media_url, firstName, lastName) => {
    return (<div className="d-flex">
      <UserCard
        firstName={firstName}
        lastName={lastName}
        url={media_url}
      />
    </div>)
  }

  // Getting Users list for user dropdown
  const getUsersList = async () => {
    setIsLoading(true);
    const response = await apiClient.get(
      `${endpoints().userAPI}/list`
    );
    const userData = response.data.data;
    const data = [];
    userData &&
      userData.length > 0 &&
      userData.forEach((list) => {
        data.push({
          label: getUserName(list?.media_url, list.first_name, list.last_name),
          value: list.first_name,
          id: list.id,
        });
      });
    setIsLoading(false);
    setUsersList(data);
  };

  //  Get Store List
  const getStore = async () => {
    setIsLoading(true);
    const list = await getStoresList();
    setIsLoading(false);
    setStoreList(list);
  };

  if (isLoading) {
    return <Spinner />
  }

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.search();
    setShiftList(list);
  };

  // Breadcrumb list
  const breadcrumbList = [
    { label: "Home", link: "/people/dashboard" },
    { label: "Attendance", link: "/attendance" },
    { label: "Attendance Detail", link: "" },
  ];

  // Initial Values
  const initialValues = {
    date: DateTime.getDateTimeByUserProfileTimezone(attendanceDetail?.date),
    type:
      typeOptions &&
      typeOptions.find((option) => option.value === attendanceDetail?.type),
    user:
      usersList &&
      usersList.find((option) => option.id === attendanceDetail?.user_id),
    status:
      statusOptions &&
      statusOptions.find((option) => option.value === attendanceDetail?.status),
    late_hours: DateTime.HoursAndMinutes(attendanceDetail?.late_hours),
    late_hours_status:
      lateHoursStatusOptions &&
      lateHoursStatusOptions.find(
        (option) => option.value === attendanceDetail?.late_hours_status
      ),
    ip_address: attendanceDetail?.ip_address,
    notes: attendanceDetail?.notes,
    location:
      storeList &&
      storeList.find((option) => option.value === attendanceDetail?.store_id),
    shift:
      shiftList &&
      shiftList.find((option) => option.value === attendanceDetail?.shift_id),
    login: DateTime.getTimeZoneDateTime(attendanceDetail?.login),
    logout: DateTime.getTimeZoneDateTime(attendanceDetail?.logout),
    additional_hours: DateTime.HoursAndMinutes(attendanceDetail?.additional_hours),
    allow_early_checkout: attendanceDetail?.allow_early_checkout,
    days_count: attendanceDetail?.days_count

  };

  // Handle on update
  const handleUpdate = async (id, values) => {
    let data = new FormData();
    data.append("date", DateTime.toISOStringDate(values?.date));
    data.append("user", values?.user.id);
    data.append("type", String.Get(values?.type?.value));
    data.append("status", String.Get(values?.status?.value));
    data.append("late_hours", Number.Get(values?.late_hours));
    data.append("late_hours_status", values && values?.late_hours_status?.value ? values?.late_hours_status?.value : null);
    data.append("ip_address", values?.ip_address?.value ? values?.ip_address?.value : "");
    data.append("notes", String.Get(values?.notes));
    data.append("location", values?.location?.value ? values?.location?.value : "");
    data.append("shift", values?.shift?.value ? values?.shift?.value : "");
    data.append("login", values?.login ? values?.login : "");
    data.append("logout", values?.logout ? values?.logout : "");
    data.append("allow_early_checkout", values?.allow_early_checkout ? values?.allow_early_checkout : "");
    data.append("days_count", values?.days_count ? values?.days_count : "");
    dispatch(await AttendanceService.update(id, data, {}));
    setEditable(true);
  };

  const getAttendanceDetail = async () => {
    let id = props.match.params.id
    let response = await AttendanceService.get(id);
    setAttendanceDetail(response);
  };

  // Toggling the tabs and modals in respective tab
  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setActiveTab(tab || role);
  };

  const delAttendance = async (id, params) => {
    dispatch(await AttendanceService.delete(id, params, {
      pagination: true,
      sort: "id",
      sortDir: "DESC",
      search: String.Get(Url.GetParam("search")),
      page: Url.GetParam("page") || "",
      pageSize: Url.GetParam("pageSize") || "",
    })
    );
    history.push("/attendance");
  }

  const handleActionChange = async (e) => {
    if (e == "delete") {
      setDeleteModal(true)
    }
    if (e == "Force Logout") {
      if (attendanceDetail) {
        let bodyData = { userIds: [attendanceDetail.user_id], forceLogout: true };

        dispatch(
          await UserService.bulkUpdate(bodyData, {})
        );
      }
    }
  };

  const actionsMenuList = [
    {
      value: "Force Logout",
      label: "Force Logout",
    },
    {
      value: "delete",
      label: "Delete",
    },

  ];

  return (
    <div>
      <BreadCrumb list={breadcrumbList} />
      <div className='d-flex justify-content-between'>
        <PageTitle label="Attendance Detail" />

        <div className="pl-2 d-flex">
          {showEditButton && editable && (
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
        title="Delete Attendance"
        id={props.match.params.id}
        label="Attendance"
        deleteFunction={delAttendance}
      />
      <Nav tabs className="admin-tabs mt-2">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === AttendanceDetailTab.GENERAL,
            })}
            onClick={() => {
              toggle(AttendanceDetailTab.GENERAL);
            }}
          >
            {AttendanceDetailTab.GENERAL}
          </NavLink>
        </NavItem>
        {showHistory && (
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === AttendanceDetailTab.HISTORY,
              })}
              onClick={() => {
                toggle(AttendanceDetailTab.HISTORY);
                _handleTabChange(AttendanceDetailTab.HISTORY);
              }}
            >
              {AttendanceDetailTab.HISTORY}
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* General Tab */}
        {activeTab == AttendanceDetailTab.GENERAL &&
          <TabPane tabId={AttendanceDetailTab.GENERAL}>
            <div className='card p-3'>
              <div className="row ">
                <div className="col-lg-8 col-sm-8 col-md-8">
                  <Form
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={(values) => { let id = props.match.params.id; handleUpdate(id, values) }}
                  >
                    <UserSelect
                      label="User"
                      required={true}
                      isDisabled={editable}
                    />
                    <Select
                      label="Type"
                      name="type"
                      options={typeOptions}
                      required
                      isDisabled={editable}
                    />
                    <div className="row">
                      <div className="col">
                        <SelectStore
                          label="Location"
                          required
                          isDisabled={editable}
                        />
                      </div>
                      <div className="col">
                        <Select
                          name="shift"
                          label="Shift"
                          placeholder="Select Shift"
                          options={shiftList}
                          required
                          isDisabled={editable}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <DateSelector
                          label="Date"
                          name="date"
                          format="dd-MMM-yyyy"
                          disabled={editable}
                        />
                      </div>
                      <div className="col">
                        <DateSelector
                          label="In Time"
                          name="login"
                          showTimeSelect
                          showTimeSelectOnly
                          format="h:mm aa"
                          isClearable
                          disabled={editable}
                        />
                      </div>
                      <div className="col">
                        <DateSelector
                          label="Out Time"
                          name="logout"
                          showTimeSelect
                          showTimeSelectOnly
                          format="h:mm aa"
                          isClearable
                          disabled={editable}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <Select
                          label="Status"
                          name="status"
                          options={statusOptions}
                          isDisabled={editable}
                        />
                      </div>
                      <div className='col'>
                        <Text
                          label="Late Hours"
                          name="late_hours"
                          disabled={editable}
                        />
                      </div>
                      <div className='col'>
                        <Text
                          name="additional_hours"
                          label="Additional Hours"
                          disabled={editable}
                        />
                      </div>
                    </div>
                    <Select
                      label="Late Hours Status"
                      name="late_hours_status"
                      options={lateHoursStatusOptions}
                      isDisabled={editable}
                    />
                    <Text
                      label="IP Address"
                      name="ip_address"
                      disabled={editable}
                    />
                    <TextArea
                      label="Notes"
                      name="notes"
                      disabled={editable}
                    />
                    <NumberField
                      name="days_count"
                      label="Days Count"
                      placeholder="Enter Days Count"
                      disabled={editable} />
                    <div className="d-inline-block">
                      <div>
                        <SingleCheckbox
                          name="allow_early_checkout"
                          label={"Allow Early CheckOut"}
                          enabled={editable}
                        />
                      </div>
                      {!editable && (
                        <div>
                          <SaveButton
                            label="Save"
                          />
                          <CancelButton
                            onClick={() => {
                              props.history.push("/attendance");
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Form>
                </div>
                <div className="col-lg-4 col-sm-4 col-md-4">
                  <MediaCarousel
                    showCarasoul
                    modalTitle="Upload File"
                    title="Attendance"
                    objectName={ObjectName.ATTENDANCE}
                    objectId={id}
                    history={history}
                    billView={true}
                    attachmentsList={true}
                    editable={editable}
                  />
                </div>
              </div>
            </div>
          </TabPane>}
        {/* History Tab*/}
        {showHistory && activeTab == AttendanceDetailTab.HISTORY &&
          <TabPane tabId={AttendanceDetailTab.HISTORY}>
            <ActivityList
              id={id}
              objectId={id}
              object_name={ObjectName.ATTENDANCE}
              history={props.history}
            />
          </TabPane>}
      </TabContent>
    </div>
  )
};
export default AttendanceDetail;