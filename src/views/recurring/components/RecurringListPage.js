import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import AvatarCard from "../../../components/AvatarCard";
import DateSelector from "../../../components/Date";
import DeleteModal from "../../../components/DeleteModal";
import Drawer from "../../../components/Drawer";
import ProjectUserSelect from "../../../components/ProjectUserSelect";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import TicketType from "../../../components/TicketType";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ProjectSelect from "../../../components/projectSelect";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { Status } from "../../../helpers/Product";
import { Tab } from "../../../helpers/ProductTag";
import {
  dateOption,
  monthOption,
  typeOptions
} from "../../../helpers/recurringTask";
import Url from "../../../lib/Url";
import RecurringService from "../../../services/RecurringService";
import userService from "../../../services/UserService";
import Avatar from "../../order/components/avatar";
import AccountSelect from "../../../components/AccountSelect";
import ObjectName from "../../../helpers/ObjectName";
import AccountService from "../../../services/AccountService";
import AmountField from "../../../components/Currency";
import Currency from "../../../lib/Currency";

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

const RecurringListPage = (props) => {
  let { setRow, row, setIsOpen, isOpen, objectName, tab, id } = props;
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
  const [projectValue, setProjectValue] = useState("")
  const [isSubmit, setIsSubmit] = useState(true)
  const [selectedDays, setSelectedDays] = useState([]);
  const [ticketType, setTicketType] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [startDate, setStartDate] = useState(null)
  const [accountValue, setAccountValue] = useState(null)
  const [amountValue, setAmountValue] = useState(null)
  const [accountList, setAccountList] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    getDateOptions();
    getUserList();
    getAccountList()
  }, []);

  useEffect(() => {
    if (row && row?.day) {
      setSelectedDays(row && row?.day)
    }
  }, [row]);

  const CloseToggle = () => {
    setIsOpen(!isOpen);
    setMonth("");
    setAssignee("");
    setSummary("");
    setDate("");
    setType("");
    setTicketType("")
    setProjectValue("")
    setWeek([])
    setSelectedDays([])
    setRow(null)
    setIsSubmit(true)
    setStartDate(null)
    setAccountValue(null)
    setAmountValue(null)
  };

  const _toggle = () => {
    setIsOpen(!isOpen);
  }

  const getAccountList = async () => {
    const list = await AccountService.getOption({});
    setAccountList(list);
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
      status: Status.ACTIVE_VALUE
    }
    const response = await userService.list(params);
    const userList = response && response.data;
    const data = [];
    userList &&
      userList.length > 0 &&
      userList.forEach((list) => {
        data.push({
          label: getUserName(list.avatarUrl, list.first_name, list.last_name),
          value: list.first_name,
          id: list.id
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
    objectName: objectName
  };

  const addTask = (data, id) => {
    setIsSubmit(false)
    if (data.taskType) {
      data.taskType = data.taskType.value;
    }
    data.day = selectedDays && selectedDays.length > 0 ? JSON.stringify(selectedDays) : [];
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
    if (data.projectName) {
      data.project_id = data?.projectName?.value ? data?.projectName?.value : "";
    }
    if (data.ticketType) {
      data.ticketType = data?.ticketType?.value ? data?.ticketType?.value : "";
    }

    if (startDate) {
      data.start_date = startDate
    }

    if (accountValue) {
      data.account_id = accountValue
    }

    if (amountValue) {
      data.amount = amountValue
    }

    data.objectName = objectName

    if (row?.id) {
      dispatch(RecurringService.update(row?.id, data, (res) => {
        if (res) {

          dispatch(
            fetchList(props.id, `${endpoints().RecurringTaskAPI}/search`, 1, 25, params)
          );
          CloseToggle();
          setIsSubmit(true)
        }
      }));
    }
    else {
      dispatch(RecurringService.create(data, params, props.id));
      CloseToggle()
      setIsSubmit(true)
    }
  };

  const handleDelete = async (id) => {
    dispatch(RecurringService.delete(id, params, props?.id));
  };

  const getDateOptions = async () => {
    let dateOptions = dateOption();
    setDataOption(dateOptions);
  };

  // initialValues
  const initialValues = {
    summary: summary ? summary : row?.summary,
    date: date ? dateOptions.find((data) => data?.value == date) : row?.date ? dateOptions.find((data) => data?.value == row?.date) : "",
    month: month ? monthOption.find((data) => data.value == month) : monthOption.find((data) => data.value == row?.month?.value),
    taskType: type ? typeOptions.find((data) => data.label == type) : typeOptions.find((data) => data.label == row?.type),
    assignee: userList && userList.find((data) => data.id == assignee) || userList && userList.find((data) => data.id == row?.assignee_id),
    projectName: projectValue ? projectValue : row && {
      value: row?.project_id,
      label: row?.project_name
    },
    ticketType: ticketType ? ticketType : {
      value: row?.type_id,
      label: row?.type_name,
    },
    week: week,
    start_date: startDate ? startDate : row?.start_date,
    account: accountValue ? accountList && accountList.length > 0 && accountList.find((data) => data.value == accountValue) : row?.account_id ? accountList && accountList.length > 0 && accountList.find((data) => data.value == row?.account_id) : "",
    amount: amountValue ? amountValue : row?.amount ? row?.amount : ""
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
    let value = e && e?.values && e?.values?.month && e?.values?.month?.value
    setMonth(value);
  };

  // Handle date
  const handleDate = async (e) => {
    let value = e && e?.values && e?.values?.date && e?.values?.date?.value
    setDate(value);
  };

  const handleTicketTypeChange = async (e) => {
    setTicketType(e?.values?.ticketType)
  };

  const handleStartDate = (e) => {
    setStartDate(e)
  }

  const handleCheckboxChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };

  const handleAccountChange = (e) => {
    setAccountValue(e && e?.value)
  }

  const handleAmountChange = (e) => {
    setAmountValue(e && e?.values && e?.values?.amount)
  }

  // Add RecurringTickeaskm
  const addTaskForm = (
    <>
      <Text
        name="summary"
        label="Summary"
        placeholder="Summary"
        onChange={handleSummaryChange}
      />
      {objectName === ObjectName.RECURRING_TASK ?
        <>
          <ProjectSelect
            label="Project"
            oninputProjectChange={setProjectValue}
            projectList={setProjectList}
          />
          <TicketType projectId={projectValue && projectValue?.value || row?.project_id} handleTicketTypeChange={handleTicketTypeChange} />
        </>
        : ""
      }
      <ProjectUserSelect
        label="Assignee"
        name="assignee"
        placeholder={"Select Assignee"}
        handleUserChange={handleUserChange}
        projectId={
          (projectValue && projectValue.value || row?.project_id)
        }
      />
      {objectName === ObjectName.RECURRING_BILL || objectName === ObjectName.RECURRING_PAYMENT ?
        <>
          <AccountSelect name="account" label="Account" handleVendorChange={handleAccountChange} />
          <AmountField
            label="Amount"
            name="amount"
            onInputChange={handleAmountChange}
          />
        </>
        : ""}
      <Select
        name="taskType"
        label="Recurring Type"
        placeholder="Select Task"
        options={typeOptions}
        handleChange={handleTypeChange}
      />

      {type == "Weekly" || row?.type == "Weekly" && !type ? (
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
      ) : ("")}

      {type == "Annually" || row?.type == "Annually" && !type ? (
        <>
          <Select name="month" label="Month" options={monthOption} onInputChange={handleMonthChange} />
        </>
      ) : ("")}
      {(type == "Monthly" || type == "Annually") || row?.type == "Monthly" && !type || row?.type == "Annually" && !type ? (
        <>
          <Select name="date" label="Date" options={dateOptions} onInputChange={handleDate} />
        </>
      ) : ("")}
      <DateSelector
        name="start_date"
        label={"Start Date"}
        placeholder="Select Start Date"
        isClearable
        onChange={handleStartDate}
      />

    </>
  );

  // RecurringTicket askr
  const modelFooter = (
    <>
      <SaveButton type="submit" loading={isSubmit == false} label={row?.id ? "Save" : "Add"} />
    </>
  );

  return (
    <>
      <DeleteModal
        isOpen={openDeleteModal}
        toggle={() => {
          setOpenDeleteModal(false);
        }}
        title={`Delete ${Url.GetParam("tab")}`}
        deleteFunction={() => {
          handleDelete(deleteTag.id);
        }}
        label={deleteTag.item}
        id={deleteTag.id}
      />
      <Drawer
        modelTitle={
          row?.id ? `Edit ${Url.GetParam("tab")}` : `Add ${Url.GetParam("tab")}`
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
          id={id}
          apiURL={`${endpoints().RecurringTaskAPI}/search`}
          paramsToUrl={true}
          params={{
            objectName: objectName,
            tab: tab,
          }}
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
              <Link to={`/recurringTask/details/${row.id}`}>{row.item}</Link>
            )}
          >
            {Url.GetParam("tab")}#
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
            className="text-left display-flex"
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
          {objectName === ObjectName.RECURRING_BILL ||
            objectName === ObjectName.RECURRING_PAYMENT ? (
            <ReduxColumn
              field="accountName"
              sortBy="account"
              isClickable="true"
            >
              Account
            </ReduxColumn>
          ) : (
            ""
          )}
          {objectName === ObjectName.RECURRING_BILL ||
            objectName === ObjectName.RECURRING_PAYMENT ? (
            <ReduxColumn
              field="amount"
              className="text-center"
              renderField={(row) => (
                <span>{row.amount ? Currency.Format(row.amount) : ""}</span>
              )}
            >
              Amount
            </ReduxColumn>
          ) : (
            ""
          )}
          {objectName !== ObjectName.RECURRING_TASK ? <ReduxColumn
            className="text-center display-flex"
            field="project_name"
            sortBy="project_name"
          >
            Project
          </ReduxColumn> : ""}
          {objectName !== ObjectName.RECURRING_TASK ? <ReduxColumn
            className="text-center display-flex"
            field="type_name"
            sortBy="type_name"
          >
            Ticket Type
          </ReduxColumn> : ""}
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
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status && row.status === Status.ACTIVE
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
                          RecurringService.updateStatus(
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
                          RecurringService.updateStatus(
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
                  {/* )} */}
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

export default RecurringListPage;
