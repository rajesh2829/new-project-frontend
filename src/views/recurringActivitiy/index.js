import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import AvatarCard from "../../components/AvatarCard";
import DeleteModal from "../../components/DeleteModal";
import Drawer from "../../components/Drawer";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Text from "../../components/Text";
import UserSelect from "../../components/UserSelect";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { Status } from "../../helpers/Product";
import { Tab } from "../../helpers/ProductTag";
import {
  dateOption,
  monthOption,
  typeOptions,
} from "../../helpers/recurringTask";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import RecurringActiviteService from "../../services/RecurringActivityService";
import userService from "../../services/UserService";
import Avatar from "../order/components/avatar";
import ActivityTypeService from "../../services/ActivityTypeService";

function Checkbox({ day, checked, onChange }) {
  return (
    <label>
      <input
        className="mr-2 ml-2"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(day, e.target.checked)}
      />
      {day}
    </label>
  );
}

const RecurringActivity = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [month, setMonth] = useState(null);
  const [assignee, setAssignee] = useState("");

  const [userList, setUserList] = useState("");
  const [summary, setSummary] = useState();
  const [date, setDate] = useState(null);
  const [dateOptions, setDataOption] = useState([]);
  const [deleteTag, setDeleteTag] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [week, setWeek] = useState([]);
  const [projectValue, setProjectValue] = useState("");
  const [row, setRow] = useState(null);
  const [isSubmit, setIsSubmit] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [activityType, setActivityType] = useState(null);
  const [activityTypeList, setActivityTypeList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getDateOptions();
    getUserList();
    getActivityTypeList()
  }, []);
  useEffect(() => {
    if (row && row?.day) {
      setSelectedDays(row && row?.day);
    }
  }, [row]);

  const CloseToggle = () => {
    setIsOpen(!isOpen);
    setMonth("");
    setAssignee("");
    setSummary("");
    setDate("");
    setType("");
    setProjectValue("");
    setWeek([]);
    setSelectedDays([]);
    setRow(null);
    setIsSubmit(true);
  };
  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const getActivityTypeList = async () => {
    let response = await ActivityTypeService.search();
    let data = response && response?.data && response?.data?.data;
    let list = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const value = data[i];
        list.push({
          label: value?.name,
          value: value?.id,
        });
      }
    }
    setActivityTypeList(list);
  };

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
  // Getting Users list for user dropdown
  const getUserList = async () => {
    let params = {
      status: Status.ACTIVE_VALUE,
    };
    const response = await userService.get(params);
    const userList = response && response.data;
    const data = [];
    userList &&
      userList.length > 0 &&
      userList.forEach((list) => {
        data.push({
          label: getUserName(list.avatarUrl, list.first_name, list.last_name),
          value: list.first_name,
          id: list.id,
        });
      });
    setUserList(data);
  };
  const params = {
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
    page: Url.GetParam("page"),
    search: Url.GetParam("search"),
  };
  const addTask = (data, id) => {
    setIsSubmit(false);
    if (data.taskType) {
      data.taskType = data.taskType.value;
    }
    data.day =
      selectedDays && selectedDays.length > 0
        ? JSON.stringify(selectedDays)
        : [];
    if (data.month || month) {
      data.month = month ? month : data?.month?.value;
    }
    if (data.summary) {
      data.summary = data.summary;
    }
    if (date || data.date) {
      data.date = date ? date : data?.date?.value;
    }
    if (data.assignee) {
      data.assignee = data.assignee.id;
    }
    if(data.activityType){
      data.activityType = data?.activityType?.value
    }
    if (row?.id) {
      dispatch(
        RecurringActiviteService.update(row?.id, data, (res) => {
          if (res) {
            dispatch(
              fetchList(
                "recurringActivity",
                `${endpoints().RecurringActivityAPI}/search`,
                1,
                25,
                params
              )
            );
            CloseToggle();
            setIsSubmit(true);
          }
        })
      );
    } else {
      dispatch(
        RecurringActiviteService.create(data, params, (res) => {
          if (res) {
            dispatch(
              fetchList(
                "recurringActivity",
                `${endpoints().RecurringActivityAPI}/search`,
                1,
                25,
                params
              )
            );
            CloseToggle();
          }
        })
      );
      setIsSubmit(true);
    }
  };

  const handleDelete = async (id) => {
    dispatch(RecurringActiviteService.delete(id, params));
  };

  const getDateOptions = async () => {
    let dateOptions = dateOption();
    setDataOption(dateOptions);
  };

  // initialValues
  const initialValues = {
    summary: summary ? summary : row?.summary,
    date: date
      ? dateOptions.find((data) => data?.value == date)
      : row?.date
      ? dateOptions.find((data) => data?.value == row?.date)
      : "",
    month: month
      ? monthOption.find((data) => data.value == month)
      : monthOption.find((data) => data.value == row?.month?.value),
    taskType: type
      ? typeOptions.find((data) => data.label == type)
      : typeOptions.find((data) => data.label == row?.type),
    assignee:
      (userList && userList.find((data) => data.id == assignee)) ||
      (userList && userList.find((data) => data.id == row?.assignee_id)),
    week: week,
    activityType: activityType ? activityTypeList && activityTypeList.find((data)=>data?.value == activityType) : activityTypeList.find((data)=>data?.value == row?.activityType)
  };

  const handleTypeChange = async (e) => {
    setType(e.label);
  };
  const handleUserChange = async (e) => {
    setAssignee(e.id);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleMonthChange = async (e) => {
    let value = e && e?.values && e?.values?.month && e?.values?.month?.value;
    setMonth(value);
  };

  // Handle date
  const handleDate = async (e) => {
    let value = e && e?.values && e?.values?.date && e?.values?.date?.value;
    setDate(value);
  };

  const handleActivityTypeChange = async (e) => {
    setActivityType(e && e?.value);
  };

  const handleCheckboxChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };
  // Add RecurringTickeaskm
  const addTaskForm = (
    <>
      <UserSelect
        label="Assignee"
        name="assignee"
        placeholder={"Select Assignee"}
        handleUserChange={handleUserChange}
      />
      <Text
        name="summary"
        label="Summary"
        placeholder="Summary"
        required
        onChange={handleSummaryChange}
      />
       <Select
        name="activityType"
        label="Activity Type"
        placeholder="Select Activity Type"
        options={activityTypeList}
        handleChange={handleActivityTypeChange}
      />
      <Select
        name="taskType"
        label="Recurring Type"
        placeholder="Select Task"
        options={typeOptions}
        handleChange={handleTypeChange}
      />

      {type == "Weekly" || (row?.type == "Weekly" && !type) ? (
        <div className="d-flex justify-content-between">
          <Checkbox
            day="Monday"
            checked={selectedDays.includes("Monday")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            day="Tuesday"
            checked={selectedDays.includes("Tuesday")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            day="Wednesday"
            checked={selectedDays.includes("Wednesday")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            day="Thursday"
            checked={selectedDays.includes("Thursday")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            day="Friday"
            checked={selectedDays.includes("Friday")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            day="Saturday"
            checked={selectedDays.includes("Saturday")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            day="Sunday"
            checked={selectedDays.includes("Sunday")}
            onChange={handleCheckboxChange}
          />
        </div>
      ) : (
        ""
      )}

      {type == "Annually" || (row?.type == "Annually" && !type) ? (
        <>
          <Select
            name="month"
            label="Month"
            options={monthOption}
            onInputChange={handleMonthChange}
          />
        </>
      ) : (
        ""
      )}
      {type == "Monthly" ||
      type == "Annually" ||
      (row?.type == "Monthly" && !type) ||
      (row?.type == "Annually" && !type) ? (
        <>
          <Select
            name="date"
            label="Date"
            options={dateOptions}
            onInputChange={handleDate}
          />
        </>
      ) : (
        ""
      )}
    </>
  );

  // RecurringTicket askr
  const modelFooter = (
    <>
      <SaveButton
        type="submit"
        loading={isSubmit == false}
        label={row?.id ? "Save" : "Add"}
      />
    </>
  );

  return (
    <>
      <PageTitle
        label="Recurring Activity"
        buttonLabel="Add New"
        buttonHandler={() => {
          setRow("");
          _toggle();
        }}
      />
      <DeleteModal
        isOpen={openDeleteModal}
        toggle={() => {
          setOpenDeleteModal(false);
        }}
        title="Delete Recurring Activity"
        deleteFunction={() => {
          handleDelete(deleteTag.id);
        }}
        label={deleteTag.item}
        id={deleteTag.id}
      />
      <Drawer
        modelTitle={
          row?.id ? "Edit Recurring Activity" : "Add Recurring Activity"
        }
        DrawerBody={addTaskForm}
        DrawerFooter={modelFooter}
        onSubmit={(values) => {
          addTask(values);
        }}
        initialValues={initialValues}
        handleOpenModal={_toggle}
        handleCloseModal={CloseToggle}
        handleDrawerClose={CloseToggle}
        isModalOpen={isOpen}
        enableReinitialize
      />
      <div className="mt-4">
        <ReduxTable
          searchPlaceholder="Search"
          showUserFilter
          sortByDropdown
          newTableHeading
          id="recurringActivity"
          apiURL={`${endpoints().RecurringActivityAPI}/search`}
          paramsToUrl={true}
          history={props.history}
          showDateFilter
          message="You can start by clicking on Add New"
          icon={<FontAwesomeIcon icon={faTasks} />}
        >
          <ReduxColumn
            className="text-center text-decoration-none"
            field="id"
            sortBy="id"
            isClickable="true"
            width="100px"
            minWidth="100px"
            type="link"
            maxWidth="150px"
            renderField={(row) => (
              <Link to={`/recurringActivity/details/${row.id}`}>
                {row.item}
              </Link>
            )}
          >
            Recurring Activity#
          </ReduxColumn>
          <ReduxColumn
            field="summary"
            sortBy="summary"
            isClickable="true"
            width="250px"
            minWidth="250px"
            maxWidth="250px"
          >
            Summary
          </ReduxColumn>
          <ReduxColumn
            className="text-center display-flex"
            field="assignee_name"
            sortBy="name"
            width="200px"
            maxWidth="150px"
            minWidth="150px"
            renderField={(row) => (
              <AvatarCard
                id="avatar"
                firstName={row.firstName}
                lastName={row.lastName}
              />
            )}
          >
            Assignee
          </ReduxColumn>
          <ReduxColumn
            field="activityTypeName"
            sortBy="activityTypeName"
            width="100px"
            minWidth="100px"
            maxWidth="100px"
            className="text-center"
          >
            Activity Type
          </ReduxColumn>
          <ReduxColumn
            field="type"
            sortBy="type"
            width="100px"
            minWidth="100px"
            maxWidth="100px"
            className="text-center"
          >
            Type
          </ReduxColumn>
          <ReduxColumn
            field="date"
            sortBy="date"
            width="100px"
            minWidth="100px"
            maxWidth="100px"
            className="text-center"
          >
            Date
          </ReduxColumn>
          <ReduxColumn
            field="day"
            sortBy="day"
            width="100px"
            minWidth="100px"
            maxWidth="100px"
            className="text-center"
            renderField={(row) =>
              row.day &&
              row.day.map((role, index) => (
                <span key={index}>
                  {index > 0 && <br />}
                  {role}
                </span>
              ))
            }
          >
            Day
          </ReduxColumn>
          <ReduxColumn
            field="month"
            sortBy="month"
            width="100px"
            minWidth="100px"
            maxWidth="100px"
            className="text-center"
            renderField={(row) => <span>{row?.month?.label}</span>}
          >
            Month
          </ReduxColumn>
          <ReduxColumn
            field="status"
            sortBy="status"
            width={"120px"}
            minWidth="120px"
            maxWidth="120px"
            className="column-status"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${
                  row.status && row.status === Status.ACTIVE
                    ? "bg-success"
                    : row.status === Status.INACTIVE
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
          <ReduxColumn
            field="createdAt"
            sortBy="createdAt"
            className="text-center"
            width="150px"
            minWidth="100px"
            maxWidth="150px"
            renderField={(row) => (
              <span>
                {DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}
              </span>
            )}
          >
            Created At
          </ReduxColumn>
          <ReduxColumn
            minWidth={"100px"}
            width={"100px"}
            maxWidth={"100px"}
            field="status"
            disableOnClick
            className="action-column"
            renderField={(row) => (
              <div className="text-center landing-group-dropdown">
                <MoreDropdown>
                  {row.status !== Tab.STATUS_ACTIVE_TEXT ? (
                    <DropdownItem
                      onClick={async () => {
                        const status = Status.ACTIVE_VALUE;
                        dispatch(
                          RecurringActiviteService.updateStatus(
                            row.id,
                            { status },
                            params
                          )
                        );
                      }}
                    >
                      Make as Active
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={async () => {
                        const status = Status.INACTIVE_VALUE;
                        dispatch(
                          RecurringActiviteService.updateStatus(
                            row.id,
                            { status },
                            params
                          )
                        );
                      }}
                    >
                      Make as InActive
                    </DropdownItem>
                  )}
                  <DropdownItem
                    onClick={() => {
                      setRow(row);
                      _toggle();
                    }}
                  >
                    Quick View
                  </DropdownItem>
                  <DropdownItem
                    className={"text-danger"}
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setDeleteTag(row);
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
      </div>
    </>
  );
};

export default RecurringActivity;
