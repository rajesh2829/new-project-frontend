import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { endpoints } from "../../../api/endPoints";
import ActivityList from "../../../components/ActivityList";
import Form from "../../../components/Form";
import NavTab from "../../../components/NavTab";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import TicketList from "../../../components/TicketList";
import UserSelect from "../../../components/UserSelect";
import CreateTicketModel from "../../../components/createTicketModel";
import ObjectName from "../../../helpers/ObjectName";
import { Status } from "../../../helpers/Product";
import {
  dateOption,
  monthOption,
  typeOptions,
} from "../../../helpers/recurringTask";
import Url from "../../../lib/Url";
import RecurringActivityService from "../../../services/RecurringActivityService";
import userService from "../../../services/UserService";
import Avatar from "../../order/components/avatar";
import ActivityTypeService from "../../../services/ActivityTypeService";

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

const General = (props) => {
  const { details, recurringActiviteTab, NavTabList, activeTab } = props;
  const [dateOptions, setDataOption] = useState([]);
  const [userList, setUserList] = useState([]);
  const [type, setType] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [rowValue, setRowValue] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activityTypeList, setActivityTypeList] = useState([]);
  const [name, setName] = useState();
  const [activityType, setActivityType] = useState(null);


  const dispatch = useDispatch();

  useEffect(() => {
    getDateOptions();
    getUserList();
    if (details && details?.day) {
      setSelectedDays(details && details?.day);
    }
    getActivityTypeList()
  }, []);


  const getActivityTypeList=async ()=>{
    let response = await ActivityTypeService.search();
    let data = response && response?.data && response?.data?.data;
    let list=[]
    if(data && data.length > 0){
      for (let i = 0; i < data.length; i++) {
        const value = data[i];
        list.push({
          label: value?.name,
          value: value?.id
        })
      }
    }
    setActivityTypeList(list)
      }

  const handleCloseModal = () => {
    setRowValue(null);
    setName("");
  };

  const getDateOptions = async () => {
    let dateOptions = dateOption();
    setDataOption(dateOptions);
  };
  let dayValue = [];
  if (details?.day) {
    details?.day.forEach((result) => {
      dayValue.push({
        value: result.id,
        label: result.name,
      });
    });
  }

  let weekValue = [];

  if (details?.week) {
    details?.week.forEach((result) => {
      weekValue.push({
        value: result.id,
        label: result.name,
      });
    });
  }

  const updateData = (data) => {
    if (data.taskType) {
      data.taskType = data.taskType.value;
    }

    data.day =
      selectedDays && selectedDays.length > 0
        ? JSON.stringify(selectedDays)
        : [];

    if (data.month) {
      data.month = data.month.value;
    }
    if (data.summary) {
      data.summary = data.summary;
    }
    if (data.date) {
      data.date = data.date.value;
    }
    if (data.assignee) {
      data.assignee = data.assignee.id;
    }

    if (data.week) {
      data.week = data.week;
    }
    if(data.activityType){
      data.activityType = data?.activityType?.value
    }
    dispatch(RecurringActivityService.update(details?.id, data));
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

  const handleUserChange = (values) => {
    setAssignee(values);
  };

  const handleCheckboxChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };
  // initialValues
  const initialValues = {
    summary: details?.summary || "",
    date: details?.date
      ? dateOptions.find((data) => data?.value == details?.date)
      : "",
    day: dayValue,
    month: monthOption.find((data) => data.value == details?.month) || null,
    taskType: typeOptions.find((data) => data.label == details?.type) || null,
    assignee:
      userList && userList.find((data) => data.id == details?.assignee_id),
      activityType: activityType ? activityTypeList && activityTypeList.find((data)=>data?.value == activityType) : activityTypeList.find((data)=>data?.value == details?.activityType)
  };

  const handleTypeChange = async (e) => {
    setType(e.label);
  };
  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleActivityTypeChange = async (e) => {
    setActivityType(e && e?.value);
  };
  return (
    <>
      <NavTab list={NavTabList} />
      <TabContent activeTab={activeTab}>
        {activeTab == recurringActiviteTab.GENERAL && (
          <TabPane tabId={recurringActiviteTab.GENERAL}>
            <div className="card p-3">
              <div className="field-wrapper mb-0 form-wrapper">
                <Form
                  initialValues={initialValues}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    updateData(values);
                  }}
                >
                  <UserSelect
                    label="Assignee"
                    name="assignee"
                    placeholder={"Select Assignee"}
                    handleUserChange={handleUserChange}
                  />
                  <TextArea
                    name="summary"
                    label="Summary"
                    placeholder="Summary"
                    required
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
                  {type == "Weekly" || (details?.type == "Weekly" && !type) ? (
                    <div>
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

                  {type == "Annually" ||
                  (details?.type == "Annually" && !type) ? (
                    <>
                      <Select
                        name="month"
                        label="Month"
                        options={monthOption}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {type == "Monthly" ||
                  type == "Annually" ||
                  (details?.type == "Monthly" && !type) ||
                  (details?.type == "Annually" && !type) ? (
                    <>
                      <Select name="date" label="Date" options={dateOptions} />
                    </>
                  ) : (
                    ""
                  )}

                  <SaveButton />
                </Form>
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == recurringActiviteTab.TICKET && (
          <TabPane tabId={recurringActiviteTab.TICKET} className="w-100">
            <div className=" d-flex">
              <div className="mx-2">
                <CreateTicketModel
                  buttonLabel="Add New"
                  rowValue={rowValue}
                  name={name}
                  isModalOpen={isModalOpen}
                  setModalOpen={setModalOpen}
                  handleCloseModal={handleCloseModal}
                  recurring_task_id={details.id}
                />
              </div>
            </div>

            <TicketList
              props={props}
              history={props.history}
              apiUrl={`${endpoints().ticketAPI}/search`}
              recurring_task_id={details.id}
              setRowValue={setRowValue}
              handleOpenModal={handleOpenModal}
              setName={setName}
              isModalOpen={isModalOpen}
              name={name}
              startDateFilter={Url.GetParam("startDate")}
              endDateFilter={Url.GetParam("endDate")}
            />
          </TabPane>
        )}

        {activeTab == recurringActiviteTab.HISTORY && (
          <TabPane tabId={recurringActiviteTab.HISTORY} className="w-100">
            <ActivityList
              id={details?.id}
              objectId={details?.id}
              object_name={ObjectName.RECURRING_ACTIVITE}
              history={props.history}
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default General;
