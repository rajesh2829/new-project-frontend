import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";

// Components
import AddButton from "../../components/AddButton";
import Avatar from "../../components/Avatar";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import BulkUpdateModal from "./bulkUpdateModal";
import AvatarCard from "../../components/AvatarCard";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import SaveButton from "../../components/SaveButton";
import DeleteModal from "../../components/DeleteModal";
import Drawer from "../../components/Drawer";
import Link from "../../components/Link";
import MoreDropdown from "../../components/authentication/moreDropdown";

// Actions
import { fetchList } from "../../actions/table";

// API
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

// Helpers
import * as Constants from "../../helpers/Attendance";
import { Attendance } from "../../helpers/Attendance";
import Cookie from "../../helpers/Cookie";
import {
  lateHoursStatusOptions,
  statusOptions
} from "../../helpers/Attendance";
import Permission from "../../helpers/Permission";

// Lib
import DateTime from "../../lib/DateTime";
import Cookies, { setCookie } from "../../lib/Helper";
import Number from "../../lib/Number";
import String from "../../lib/String";
import Url from "../../lib/Url";

// Services
import ShiftService from "../../services/ShiftService";
import AttendanceService from "../../services/AttendanceService";
import { getStoresList } from "../../services/StoreListService";
import { hasPermission } from "../../services/UserRolePermissionService";
import AttendanceForm from "./attendanceForm";

const AttendanceList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [arrays, setArray] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [row, setRow] = useState(null);
  const [param, setParam] = useState({});
  // Bulk Select const
  const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([0]);
  const [isSubmit, setIsSubmit] = useState(true);
  const [page, setPage] = useState(Url.GetParam("page"));

  const [isLeave, setIsLeave] = useState();
  const [companyUser, setUser] = useState();
  const [selectTypeValue, setSelectTypeValue] = useState();
  const [storeValue, setStoreValue] = useState();
  const [shiftValue, setShiftValue] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedLogin, setSelectedLogin] = useState();
  const [selectedLogOut, setSelectedLogOut] = useState();

  const [notesChange, setNotesChange] = useState();
  const [currentData, setCurrentData] = useState();
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [attendance, setAttendance] = useState();
  const [storeList, setStoreList] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [statusValue, setStatusValue] = useState()
  const [lateHoursStatusValue, setLateHoursStatusValue] = useState()
  const [ipAddressValue, setIpAddressValue] = useState()

  let showDelete = hasPermission(Permission.ATTENDANCE_DELETE);
  useEffect(() => {
    getShift();
    getStore();
  }, []);

  useEffect(() => {
    getUserList();
  }, [props]);

  //Select user tab
  const handleChangeUser = (e) => (e == null ? setUser("") : setUser(e));

  const handleTypeChange = (e) => {
    setSelectTypeValue(e.values.type.value);
  };

  const handleStoreChange = (x) => {
    let data = x ? x : "";
    setStoreValue(data);
  };

  const handleShiftChange = (x) => {
    let data = x?.values?.shift ? x?.values?.shift : "";
    setShiftValue(data);
  };

  const onDateChange = (x) => {
    setSelectedDate(x ? x : "");
  };

  const handleInTimeChange = (x) => {
    setSelectedLogin(x ? x : "");
  };

  const handleOutTimeChange = (x) => {
    setSelectedLogOut(x ? x : "");
  };

  const handleLateHoursChange = (e) => {
    let value = e && e?.values && e?.values?.late_hours_status
    setLateHoursStatusValue(value)
  }

  const onNotesChange = (x) => {
    let data = x?.target?.value ? x?.target?.value : "";
    setNotesChange(data);
  };

  // Toggling The Bulk Update Modal
  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!openBulkUpdateModal);
  };

  // Bulk update handler for Select
  const handleBulkSelect = (ids) => {
    setSelectedIds({ selectedIds: ids });
  };

  const handleIpAddress = (e) => {
    let value = e?.target?.value
    setIpAddressValue(value)
  }

  // Handle Reset
  const handleReset = () => {
    setParam("");
  };

  const handleStatusChange = (e) => {
    let value = e && e?.values && e?.values?.status
    setStatusValue(value)
  }

  //Get User Details and list Start
  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <Avatar
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
        <div className="edit-profile-name m-2">
          {firstName} {lastName}
        </div>
      </div>
    );
  };

  const getUserList = async () => {
    let data;
    await apiClient
      .get(`${endpoints().userAPI}/list`)
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          const userList = [];
          data.forEach((list) => {
            userList.push({
              value: list.first_name,
              id: list.id,
              label: getUserName(
                list.avatarUrl,
                list.first_name,
                list.last_name
              ),
            });
          });
          // Set the User List Options in State
          setUsersList(userList);
        }
      });
    return data;
  };

  //Sort By Option Values
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "date:ASC",
      label: "Date",
    },
  ];

  // Use Dispatch
  const dispatch = useDispatch();

  // Use Effect
  useEffect(() => {
    const checkedList = Cookies.get(Cookie.ATTENDANCE);
    const checkedLists = checkedList ? JSON.parse(checkedList) : checkedList;
    if (checkedLists) {
      setArrayList(checkedLists);
      setArray(checkedLists);
    }
  }, []);

  // Toggling for add modal popup
  const toggle = () => {
    setIsOpen(!isOpen);
    setSelectTypeValue("");
    setStoreValue("");
    setSelectedUser("");
    setShiftValue("");
    setSelectedDate("");
    setSelectedLogin("");
    setSelectedLogOut("");
    setNotesChange("");
    setLateHoursStatusValue("")
    setStatusValue("")
    setRow("")
    setIpAddressValue("")
    setIsSubmit(true);
  };

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };

  // Type options
  const typeOptions = [
    {
      value: "Absent",
      label: "Absent",
    },
    {
      value: "Additional Day",
      label: "Additional Day",
    },
    {
      value: "Additional Leave",
      label: "Additional Leave",
    },
    {
      value: "Compensation Day",
      label: "Compensation Day",
    },
    {
      value: "Leave",
      label: "Leave",
    },

    {
      value: "Non-Working Day",
      label: "Non-Working Day",
    },
    {
      value: "Working Day",
      label: "Working Day",
    },
  ];

  const handleUserChange = (values) => {
    setSelectedUser(values);
  };

  // Add Modal Body Section
  const addAttendance = (
    <>
      <AttendanceForm
        handleTypeChange={handleTypeChange}
        selectTypeValue={selectTypeValue}
        handleUserChange={handleUserChange}
        handleShiftChange={handleShiftChange}
        handleStoreChange={handleStoreChange}
        handleStatusChange={handleStatusChange}
        handleInTimeChange={handleInTimeChange}
        handleOutTimeChange={handleOutTimeChange}
        handleLateHoursChange={handleLateHoursChange}
        onNotesChange={onNotesChange}
        handleIpAddress={handleIpAddress}
      />
    </>
  );

  // Add Modal Footer section
  const addFooter = (
    <>
      <SaveButton type="submit" loading={isSubmit == false} label={row?.id ? "Save " : "Add"} />
    </>
  );

  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.ATTENDANCE, arrayList);
    setArray(array);
    setArrayList(array);
  };

  const FieldLabel = [
    {
      value: Constants.FieldLabel.LATE_HOURS,
      label: Constants.FieldLabel.LATE_HOURS,
    },

    {
      value: Constants.FieldLabel.IP_ADDRESS,
      label: Constants.FieldLabel.IP_ADDRESS,
    },
  ];

  function getKeyByValue(object, value) {
    let isSelected = false;
    for (const key in object) {
      if (key == value) {
        isSelected = object[key] == true ? true : false;
      }
    }
    return isSelected;
  }

  const enable_late_hours =
    arrays && getKeyByValue(arrays, Constants.FieldLabel.LATE_HOURS)
      ? true
      : false;
  const enable_ip_address =
    arrays && getKeyByValue(arrays, Constants.FieldLabel.IP_ADDRESS)
      ? true
      : false;

  // Form Initial Values
  const initialValues = {
    date: row ? DateTime.getDateTimeByUserProfileTimezone(row?.date) : DateTime.getDateTimeByUserProfileTimezone(new Date()),
    type: selectTypeValue ? typeOptions.find((option) => option.value == selectTypeValue) : typeOptions.find((option) => option.value == row?.type),
    user: selectedUser ? selectedUser :
      usersList &&
      usersList.find((option) => option?.id == row?.userId),
    status: statusValue ? statusValue :
      statusOptions.find((option) => option?.value === row?.status),
    late_hours: row?.lateHours,
    late_hours_status: lateHoursStatusValue ? lateHoursStatusValue :
      lateHoursStatusOptions &&
      lateHoursStatusOptions.find(
        (option) => option?.value === row?.lateHoursStatus
      ),
    ip_address: ipAddressValue ? ipAddressValue : row?.ipAddress ? row?.ipAddress : "",
    notes: notesChange ? notesChange : row?.notes ? row?.notes : "",
    location: storeValue ? storeValue : row ? {

      value: row?.location,
      label: row?.locationName
    } : "",
    shift: shiftValue ?
      shiftList &&
      shiftList.find((option) => option.value == shiftValue?.value) : shiftList &&
      shiftList.find((option) => option.value == row?.shift_id),
    login: selectedLogin ? selectedLogin : DateTime.getTimeZoneDateTime(row?.login),
    logout: selectedLogOut ? selectedLogOut : DateTime.getTimeZoneDateTime(row?.logout),
    additional_hours:
      row?.additionalHours,
    allow_early_checkout: row?.allow_early_checkout,
    days_count: row ? row?.days_count : ""
  };

  // Adding the attendance
  const handleAdd = async (values) => {
    try {
      setIsSubmit(true);
      // Form Data
      let data = new FormData();
      data.append("date", DateTime.toISOStringDate(values.date));
      data.append("user", values.user.id);
      data.append("type", String.Get(values && values.type ? values.type.value : ""));
      data.append("status", String.Get(values && values.status ? values.status.value : ""));
      data.append("late_hours", Number.Get(values.late_hours));
      data.append(
        "late_hours_status",
        values && values?.late_hours_status?.value
          ? values?.late_hours_status?.value
          : null
      );
      data.append(
        "ip_address",
        values.ip_address ? values.ip_address : ""
      );
      data.append("notes", String.Get(values.notes ? values.notes : ""));
      data.append("location", values && values.location && values.location.value ? values.location.value : "");
      data.append("shift", values && values.shift && values.shift.value ? values.shift.value : "");
      data.append("login", values.login ? values.login : "");
      data.append("logout", values.logout ? values.logout : "");
      data.append(
        "allow_early_checkout",
        values?.allow_early_checkout ? values?.allow_early_checkout : false
      );
      data.append("days_count", values && values?.days_count ? values?.days_count : "");
      if (row?.id) {
        dispatch(await AttendanceService.update(row?.id, data, {
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
          location: Url.GetParam("location"),
          user: Url.GetParam("user"),
          shift: Url.GetParam("shift"),
          type: Url.GetParam("type"),
          search: Url.GetParam("search"),
          page: Url.GetParam("page"),
          pageSize: Url.GetParam("pageSize"),
        }));
        toggle();
      }
      else {
        dispatch(
          await AttendanceService.create(
            data,
            {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir"),
              startDate: Url.GetParam("startDate"),
              endDate: Url.GetParam("endDate"),
              location: Url.GetParam("location"),
              user: Url.GetParam("user"),
              shift: Url.GetParam("shift"),
              type: Url.GetParam("type"),
              search: Url.GetParam("search"),
              page: Url.GetParam("page"),
              pageSize: Url.GetParam("pageSize"),
            },
            (res) => {
              if (res.id) {
                toggle();
              }
            },
            setIsSubmit
          )
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  //  Get Store List
  const getStore = async () => {
    setIsLoading(true);
    const list = await getStoresList();
    setIsLoading(false);
    setStoreList(list);
  };

  const deleteFunction = async () => {
    dispatch(
      await AttendanceService.bulkDeleteAttendance(selectedIds.selectedIds, ""),
      setSelectedIds({ selectedIds: [] })
    );
  };

  const attendanceDelete = async (id) => {
    dispatch(
      await AttendanceService.delete(id, null, {
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
        startDate: Url.GetParam("startDate"),
        endDate: Url.GetParam("endDate"),
        location: Url.GetParam("location"),
        user: Url.GetParam("user"),
        shift: Url.GetParam("shift"),
        type: Url.GetParam("type"),
        search: Url.GetParam("search"),
        page: Url.GetParam("page"),
        pageSize: Url.GetParam("pageSize"),

      })
    );
    setIsDeleteModel(false);
  };

  const attendanceEarlyCheckoutHandler = async (value) => {
    if (value) {
      await AttendanceService.EarlyCheckout({ attendanceId: value?.id, allowEarlyCheckout: true }, dispatch);
      dispatch(
        fetchList("attendance", `${endpoints().attendanceAPI}/list`, page ? page : 1, 25, {
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
          location: Url.GetParam("location"),
          user: Url.GetParam("user"),
          shift: Url.GetParam("shift"),
          type: Url.GetParam("type"),
          search: Url.GetParam("search"),
        })
      );
    }
  }

  const attendanceHandler = async (value) => {
    if (value && value?.login) {
      let response = await AttendanceService.CheckOutValidation(value?.id);
      if (response && response.data) {
        await AttendanceService.Checkout({ attendanceId: value?.id }, dispatch);
        dispatch(
          fetchList("attendance", `${endpoints().attendanceAPI}/list`, page ? page : 1, 25, {
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir"),
            startDate: Url.GetParam("startDate"),
            endDate: Url.GetParam("endDate"),
            location: Url.GetParam("location"),
            user: Url.GetParam("user"),
            shift: Url.GetParam("shift"),
            type: Url.GetParam("type"),
            search: Url.GetParam("search"),

          })
        );
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        {/* Page Title */}
        {!props.userView && <PageTitle label="Attendance" />}
        <div className="d-flex">
          {!props.userView && (
            <DeleteModal
              isOpen={isDeleteModel}
              toggle={() => {
                setIsDeleteModel(false);
              }}
              title="Attendance"
              id={currentData?.id}
              label={attendance}
              deleteFunction={() => {
                attendanceDelete(currentData?.id);
              }}
            />
          )}
          {/* Bulk Update Modal */}
          {!props.userView && (
            <div className="pl-1">
              <BulkUpdateModal
                isOpen={openBulkUpdateModal}
                toggle={toggleBulkUpdateModal}
                usersList={usersList}
                shiftList={shiftList}
                typeOptions={typeOptions}
                attendanceIds={selectedIds}
              />
            </div>
          )}
          {/* Add button for add modal */}
          {!props.userView && (
            <AddButton
              label="Add"
              onClick={() => {
                setRow("");
                toggle();
              }}
              className="mx-1 "
            />
          )}
          {!props.userView && (
            <div className="pl-1">
              <DropdownWithCheckbox
                className="overflow-visible d-flex justify-content-between"
                buttonLabel=""
                dropdownLinks={FieldLabel}
                handleChange={(e) => {
                  handleColumnChange(e);
                }}
                color="gray"
                hideCaret
                checkedItems={arrayList}
              />
            </div>
          )}
          <Drawer
            modelTitle={row?.id ? "Edit Attendance" : "Add Attendance"}
            DrawerBody={addAttendance}
            DrawerFooter={addFooter}
            onSubmit={(values) => {
              handleAdd(values);
            }}
            initialValues={initialValues}
            enableReinitialize
            handleOpenModal={toggle}
            handleCloseModal={toggle}
            handleDrawerClose={toggle}
            isModalOpen={isOpen}
          />
        </div>
      </div>

      {/* Redux Table */}
      <ReduxTable
        id="attendance"
        bulkSelect
        onBulkSelect={handleBulkSelect}
        paramsToUrl={true}
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        setPage={setPage}
        params={{
          user: props?.user ? props?.user : "",
        }}
        apiURL={`${endpoints().attendanceAPI}/list`}
        sortByOptions={sortByOption}
        customTypeOption={typeOptions}
        showUserFilter={props.userView ? false : true}
        // disableHeader={props.disableHeader}
        showSearch={props.showSearch}
        showPageSize={props.showPageSize}
        showStoreFilter
        showDateFilter
        showShiftFilter
        showTypeFilter
        sortByDropdown={props.sortByDropdown}
        refreshButton={props.refreshButton}
        history={props.history}
      >
        <ReduxColumn
          className="text-center"
          field="date"
          sortBy="date"
          type="link"
          width="110px"
          minWidth="110px"
          maxWidth="110px "
          renderField={(row) => (
            <>
              <Link
                url={`/attendance/${row.id}`}
                text={DateTime.getDate(row.date)}
              />
            </>
          )}
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="userName"
          width="110px"
          sortBy="name"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <div className="d-flex text-break">
              <Link
                url={`/user/${row.userId}`}
                text={
                  <AvatarCard
                    id="avatar"
                    firstName={row.userName}
                    lastName={row.lastName}
                    url={row.check_in_media_id}
                  />
                }
              />
            </div>
          )}
        >
          User
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          sortBy="login"
          renderField={(row) => (
            <span>{DateTime.getUserTimeZoneTime(row.login)}</span>
          )}
        >
          Check-In
        </ReduxColumn>

        <ReduxColumn
          className="text-center"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          sortBy="logout"
          renderField={(row) => (
            <span>{DateTime.getUserTimeZoneTime(row.logout)}</span>
          )}
        >
          Check-Out
        </ReduxColumn>
        <ReduxColumn
          field="type"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
        >
          Type
        </ReduxColumn>
        {enable_late_hours && enable_late_hours == true && (
          <ReduxColumn
            field="lateHours"
            width="110px"
            minWidth="110px"
            maxWidth="110px"
          >
            Late Hours
          </ReduxColumn>
        )}
        {enable_ip_address && enable_ip_address == true && (
          <ReduxColumn
            field="ipAddress"
            width="110px"
            minWidth="110px"
            maxWidth="110px"
          >
            Ip Address
          </ReduxColumn>
        )}
        <ReduxColumn
          className="text-left"
          field="locationName"
          width="110px"
          minWidth="110px"
          sortBy="location"
          maxWidth="110px"
          renderField={(row) => (
            <>
              <Link url={`/location/${row.location}`} text={row.locationName} />
            </>
          )}
        >
          Location
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="shiftName"
          width="110px"
          minWidth="110px"
          disableOnClick
          maxWidth="110px"
        >
          Shift
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          width={"70px"}
          disableOnClick
          renderField={(row) => (
            <div className="text-center action-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    setRow(row);
                    setIsOpen(!isOpen);
                    setSelectTypeValue(row && row?.type)
                  }}>
                  Quick View
                </DropdownItem>
                {!row.logout && row.type !== Attendance.TYPE_LEAVE && row.type !== Attendance.TYPE_ABSENT && (
                  <DropdownItem
                    onClick={() => {
                      attendanceHandler(row);
                    }}
                  >
                    Check-Out
                  </DropdownItem>
                )}
                {!row.allow_early_checkout && (
                  <DropdownItem
                    onClick={() => {
                      attendanceEarlyCheckoutHandler(row);
                    }}
                  >
                    Allow Early Checkout
                  </DropdownItem>
                )}
                {showDelete && (
                  <DropdownItem
                    className="text-danger cursor-pointer"
                    onClick={() => {
                      setCurrentData(row);
                      setAttendance(row?.userName);
                      setIsDeleteModel(true);
                    }}
                  >
                    Delete
                  </DropdownItem>)}
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default AttendanceList;