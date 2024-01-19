import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DateSelector from "../../../components/Date";
import Form from "../../../components/Form";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import TicketType from "../../../components/TicketType";
import ProjectSelect from "../../../components/projectSelect";
import { Status } from "../../../helpers/Product";
import {
  dateOption,
  monthOption,
  typeOptions
} from "../../../helpers/recurringTask";
import RecurringService from "../../../services/RecurringService";
import userService from "../../../services/UserService";
import Avatar from "../../order/components/avatar";
import ProjectUserSelect from "../../../components/ProjectUserSelect";
import { TabContent, TabPane } from "reactstrap";
import NavTab from "../../../components/NavTab";
import classNames from "classnames";
import TicketList from "../../../components/TicketList";
import ActivityList from "../../../components/ActivityList";
import ObjectName from "../../../helpers/ObjectName";
import { endpoints } from "../../../api/endPoints";
import CreateTicketModel from "../../../components/createTicketModel";
import Url from "../../../lib/Url";
import AccountSelect from "../../../components/AccountSelect";
import Currency from "../../../components/Currency";


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
  const { details ,recurringTaskTab,NavTabList,activeTab} = props;
  const [dateOptions, setDataOption] = useState([]);
  const [userList, setUserList] = useState("");
  const [type, setType] = useState(null);
  const [projectList, setProjectList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [selectedDays, setSelectedDays] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [projectValue, setProjectValue] = useState("");
  const [rowValue, setRowValue] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [name, setName] = useState();
  const [etaPermission, setEtaPermission]=useState(true)
  const [startDate, setStartDate]=useState(null)
  const [amountValue, setAmountValue]=useState(null)
  const [accountValue, setAccountValue]=useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    getDateOptions();
    getUserList();
    if (details && details?.day) {
      setSelectedDays(details && details?.day)
    }
  }, []);

  const handleCloseModal = () => {
    setRowValue(null);
    setEtaPermission(true)
    setName("")
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
        label: result.name
      });
    });
  }

  let weekValue = [];

  if (details?.week) {
    details?.week.forEach((result) => {
      weekValue.push({
        value: result.id,
        label: result.name
      });
    });
  }

  const updateData = (data) => {
    if (data.taskType) {
      data.taskType = data.taskType.value;
    }

    data.day = selectedDays && selectedDays.length > 0 ? JSON.stringify(selectedDays) : [];

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
    data.project_id = data && data?.projectName ? data?.projectName?.value : "";
    data.ticketType = data && data?.ticketType ? data?.ticketType?.value : "";
    if (data.week) {
      data.week = data.week;
    }

    if(startDate){
      data.start_date = startDate
    }

    if(accountValue){
     data.account_id = accountValue && accountValue?.value
    }

    if(amountValue){
      data.amount = amountValue
     } 

    dispatch(RecurringService.update(details?.id, data));
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
    const response = await userService.get(params);
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

  const oninputProjectChange = (value) => {
    setProjectValue(value);
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

  const handleStartDate=(e)=>{
      setStartDate(e)
  }

  const handleAccountChange=(e)=>{
    setAccountValue(e && e)
  }

  const handleAmountChange =(e)=>{
    setAmountValue(e && e?.values && e?.values?.amount)
  }
  // initialValues
  const initialValues = {
    summary: details?.summary || "",
    date: details?.date ?  dateOptions.find((data)=>data?.value == details?.date ) : "",
    day: dayValue,
    month: monthOption.find((data) => data.value == details?.month) || null,
    taskType: typeOptions.find((data) => data.label == details?.type) || null,
    assignee:
      (userList && userList.find((data) => data.id == details?.assignee_id)) ||
      null,
    projectName: projectList && projectList.find((data) => data?.value == details?.project_id),
    ticketType: typeList && typeList.find((data) => data?.value == details?.ticket_type_id),
    start_date: startDate ? startDate : details && details?.start_date ? details?.start_date :"",
    account: accountValue ? accountValue : details?.accountName ? { label: details?.accountName , value: details?.account_id}  :"",
    amount: amountValue ? amountValue : details?.amount ? details?.amount :""
  };

  const handleTypeChange = async (e) => {
    setType(e.label);
  };
  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
    setIsSubmit(true);
  };
  return (
    
       <><NavTab list={NavTabList} />
       <TabContent activeTab={activeTab}>

        {activeTab == recurringTaskTab.GENERAL && (
          <TabPane tabId={recurringTaskTab.GENERAL}>
           <div className="card p-3">

            <div className="field-wrapper mb-0 form-wrapper">
              <Form
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  updateData(values);
                } }
              >
                 <TextArea
                  name="summary"
                  label="Summary"
                  placeholder="Summary"
                  required />
               {details?.object_name === ObjectName.RECURRING_TASK ? 
               <>
               <ProjectSelect
                  label="Project"
                  projectList={setProjectList}
                  oninputProjectChange={oninputProjectChange} />
                <TicketType typeList={setTypeList} projectId={(projectValue && projectValue.value || details?.project_id)} />
                </>
                :""}
                <ProjectUserSelect
                  label="Assignee"
                  name="assignee"
                  placeholder={"Select Assignee"}
                  handleUserChange={handleUserChange}
                  projectId={(projectValue && projectValue.value || details?.project_id)} />
                   {details?.object_name == ObjectName.RECURRING_BILL ||  details?.object_name == ObjectName.RECURRING_PAYMENT ?
                   <>
                   <AccountSelect
                    name="account"
                    label="Account"
                    handleVendorChange={handleAccountChange}
                  />
                  <Currency
                    label="Amount"
                    name="amount"
                    onInputChange={handleAmountChange}
                  />
                  </>
                  :""}
                <Select
                  name="taskType"
                  label="Recurring Type"
                  placeholder="Select Task"
                  options={typeOptions}
                  handleChange={handleTypeChange} />
                {type == "Weekly" || details?.type == "Weekly" && !type ? (
                  <div>
                    <Checkbox
                      day="Monday"
                      checked={selectedDays.includes("Monday")}
                      onChange={handleCheckboxChange} />
                    <Checkbox
                      day="Tuesday"
                      checked={selectedDays.includes("Tuesday")}
                      onChange={handleCheckboxChange} />
                    <Checkbox
                      day="Wednesday"
                      checked={selectedDays.includes("Wednesday")}
                      onChange={handleCheckboxChange} />
                    <Checkbox
                      day="Thursday"
                      checked={selectedDays.includes("Thursday")}
                      onChange={handleCheckboxChange} />
                    <Checkbox
                      day="Friday"
                      checked={selectedDays.includes("Friday")}
                      onChange={handleCheckboxChange} />
                    <Checkbox
                      day="Saturday"
                      checked={selectedDays.includes("Saturday")}
                      onChange={handleCheckboxChange} />
                    <Checkbox
                      day="Sunday"
                      checked={selectedDays.includes("Sunday")}
                      onChange={handleCheckboxChange} />
                  </div>
                ) : ("")}

                {type == "Annually" || details?.type == "Annually" && !type ? (
                  <>
                    <Select name="month" label="Month" options={monthOption} />
                  </>
                ) : ("")}
                {(type == "Monthly" || type == "Annually") || details?.type == "Monthly" && !type || details?.type == "Annually" && !type ? (
                  <>
                    <Select name="date" label="Date" options={dateOptions} />
                  </>
                ) : ("")}
                <DateSelector
                    name="start_date"
                    label={"Start Date"}
                    placeholder="Select Start Date"
                    isClearable
                    onChange={handleStartDate}
                  />

                <SaveButton />
              </Form>
            </div>
            </div>

          </TabPane>
        )}
        {activeTab == recurringTaskTab.TICKET && (
          <TabPane tabId={recurringTaskTab.TICKET} className="w-100">
            <div className=" d-flex">
            <div className="mx-2">
              <CreateTicketModel
                buttonLabel="Add New"
                rowValue={rowValue}
                name={name}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                handleCloseModal={handleCloseModal}
                recurring_task_id = {details.id}

              />
            </div>
            </div>

            <TicketList
              props={props}
              history={props.history}
              apiUrl={`${endpoints().ticketAPI}/search`}
              recurring_task_id = {details.id}
              setRowValue={setRowValue}
              handleOpenModal={handleOpenModal}
              setName={setName}
              isModalOpen={isModalOpen}
              name={name}
              setEtaPermission={setEtaPermission}
              startDateFilter={Url.GetParam("startDate")}
              endDateFilter={Url.GetParam("endDate")}



               />
          </TabPane>
        )}

        {activeTab == recurringTaskTab.HISTORY &&
          <TabPane tabId={recurringTaskTab.HISTORY} className="w-100">
            <ActivityList
              id={details?.id}
              objectId={details?.id}
              object_name={ObjectName.RECURRING_TASK}
              history={props.history} />
          </TabPane>}

    </TabContent></>
  );
};

export default General;
