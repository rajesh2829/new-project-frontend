import React, { useEffect, useState } from "react";

// Components
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import SaveButton from "../../components/SaveButton";

import { SchedulerApiUrl, schedulerJob } from "./constants";

import DateTime from "../../lib/DateTime";

import { useDispatch } from "react-redux";

import classnames from "classnames";
import { apiClient } from "../../apiClient";
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import { dateOption, monthOption, typeOptions } from "../../helpers/recurringTask";
import SchedulerJobService from "../../services/SchedulerJobService";
import SlackService from "../../services/SlackService";
import { hasPermission } from "../../services/UserRolePermissionService";
import SchedulerJobForm from "./schedulerJobForm";

const Tabs = {
  GENERAL: "General",
  HISTORY: "History",
};

const DetailSchedulerModal = (props) => {
  let id = props?.match?.params?.id;

  const [slackChannelList, setChannelList] = useState([]);
  const [schedulerJobDetail, setSchedulerJobDetail] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [schedulerName, setSchedulerName] = useState("");

  const [type, setType] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(null);
  const [dateOptions, setDataOption] = useState([]);
  const [startTimeValue,setStartTimeValue]=useState(null)
  const [endTimeValue,setEndTimeValue]=useState(null)


  useEffect(() => {
    getSlackChannelList();
    schedulerDetail();
    getDateOptions()
  }, [id]);

  useEffect(() => {
    if (schedulerJobDetail && schedulerJobDetail?.day) {
      setSelectedDays(schedulerJobDetail && schedulerJobDetail?.day)
    }
  }, [schedulerJobDetail]);
  const dispatch = useDispatch();

  const getDateOptions = async () => {
    let dateOptions = dateOption();
    setDataOption(dateOptions);
  };


  const statusOptions = [
    {
      label: schedulerJob.STATUS_ACTIVE_TEXT,
      value: schedulerJob.STATUS_ACTIVE,
    },
    {
      label: schedulerJob.STATUS_INACTIVE_TEXT,
      value: schedulerJob.STATUS_INACTIVE,
    },
  ];
  const param = new URLSearchParams(props.history.location.search);
  const selectedTab = param.get("tab");
  const [activeTab, setActiveTab] = useState(
    selectedTab ? selectedTab : Tabs.GENERAL
  );
  let showHistory = hasPermission(Permission.SCHEDULER_JOBS_HISTORY_VIEW)

  const [isOpen, setIsOpen] = useState(false);
  const [statusValue, setStatusValue] = useState();

  const getSlackChannelList = async () => {
    try {
      //set loader

      //create new array fro slack channel
      let response = await SlackService.getChannelList();

      if (response && response.channels) {
        let channel = [];

        let channelList = response.channels

        if (channelList && channelList.length > 0) {
          for (let i in channelList) {
            let { id, name } = channelList[i];
            channel.push({
              label: name,
              value: id,
              id: id,
            });
          }
        }
        //set channel list
        setChannelList(channel);
      }
    } catch (err) { }
  };

  const handleSchedulerChange = (e) => {
    let value = e.values.job;
    setSchedulerName(value);
  }

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };
  const schedulerDetail = async () => {
    setIsloading(true)
    let data = await SchedulerJobService.get(id);
    setSchedulerJobDetail(data);
    setIsloading(false)
  };

  // Handle Project Category form submit
  const handleSubmit = async (values) => {
    try {
      let data ={}
      let attendance_missing_report_email = [];

      let to_email = [];

      if (values && values.job) {
        data.job_name = values?.job?.label;
        data.api_url = values?.job?.value;
      }

      if (values && values.name) {
        data.name = values.name;
      }

      if (values && values.status) {
        data.label = values?.label;
        data.status = values.status.value;
      }
      if (startTimeValue || startTimeValue ==="") {
        data.startTime = startTimeValue;
      }

      if (endTimeValue || endTimeValue ==="") {
        data.endTime = endTimeValue;
      }

      if (values.interval) {
        data.interval = values.interval.value;
      }

      if (values.to_email !== undefined) {
        values.to_email.forEach((element) => {
          to_email.push(element.value);
        });

        data.to_email = to_email ? to_email : "";
      }
      if (values.attendance_missing_report_email !== undefined) {
        values.attendance_missing_report_email.forEach((element) => {
          attendance_missing_report_email.push(element.value);
        });
      }
      if (values.to_slack && values.to_slack.value !== undefined) {
        data.to_slack = values.to_slack.value ? values.to_slack.value : "";
      }

      data.attendance_missing_report_email = attendance_missing_report_email
        ? attendance_missing_report_email
        : "";

        if (values.taskType) {
          data.taskType = values.taskType.value;
        }
        values.day = selectedDays && selectedDays.length > 0 ? JSON.stringify(selectedDays) : [];
        if(values.day){
          data.day = values.day;
        }
  
        if (values.month||month) {
          data.month = month ? month :  values?.month?.value;
        }
        if (date || values.date) {
          data.date = date ? date : values?.date?.value;
        }
        if (values.notes) {
          data.notes = values?.notes;
        }


      await SchedulerJobService.update(schedulerJobDetail.id, data, schedulerDetail);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSchedulerJob = async (id) => {
    try {
      dispatch(await SchedulerJobService.deleteJob(id));
      props.history.push("/schedulerJobs");
    } catch (err) {

    }
  };

  // // Form initial values
  const initialValues = {
    job: schedulerName ?
      {
        label: schedulerName?.label,
        value: schedulerName?.value,
      } : SchedulerApiUrl.find(
        (data) => data.value == schedulerJobDetail?.api_url
      ),
    status:
      statusValue !== undefined
        ? {
          label: statusValue?.label,
          value: statusValue?.value
        }
        : statusOptions.find(
          (data) => data?.value == schedulerJobDetail?.status
        ),


    notes: schedulerJobDetail.notes,
    name: schedulerName.label ? schedulerName.label : schedulerJobDetail.name,
    interval: DateTime.getSchedulerTime().find(
      (data) => data.value == schedulerJobDetail.interval
    ),
    startTime: schedulerJobDetail.startTime ? schedulerJobDetail.startTime : "",
    to_email: schedulerJobDetail.to_email,
    to_slack: slackChannelList.find(
      (data) => data.value == schedulerJobDetail?.to_slack
    ),
    endTime: schedulerJobDetail.endTime ? schedulerJobDetail.endTime : "",
    taskType: type ? typeOptions.find((data) => data.label == type) : typeOptions.find((data) => data.label == schedulerJobDetail?.type),
    month: month ? monthOption.find((data) => data.value == month) : monthOption.find((data) => data.value == schedulerJobDetail?.monthValue?.value),
    date: date ? dateOptions.find((data)=>data?.value == date) : schedulerJobDetail?.date ? dateOptions.find((data)=>data?.value == schedulerJobDetail?.date) : "",
  };

  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setActiveTab(tab);
  };
  const breadcrumbList = [
    { label: "Home", link: "/dashboard" },
    {
      label: "Scheduler Jobs",
      link: "/schedulerJobs",
    },
    {
      label: activeTab,
      link: "",
    },
  ];



  const handleJobRun = async () => {
    try {
      let response = await apiClient.post(
        `${schedulerJobDetail?.api_url}/manualRun?id=${schedulerJobDetail?.id}`
      );
      if (response && response.data) {
        Toast.success(response.data.message);
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

  const handleTypeChange = async (e) => {
    setType(e.label);
  };

  const handleCheckboxChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };

  const handleMonthChange = async (e) => {
    let value = e && e?.values && e?.values?.month && e?.values?.month?.value
    setMonth(value);
  };

  const handleDate = async (e) => {
    let value = e && e?.values && e?.values?.date && e?.values?.date?.value
    setDate(value);
  };

  const handleStartTimeChange =(e)=>{
setStartTimeValue(e)
  }

  const handleEndTimeChange =(e)=>{
    setEndTimeValue(e)
      }

  if (isloading) {
    return <Spinner />;
  }
  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Scheduler Jobs"
        id={schedulerJobDetail?.id}
        label={schedulerJobDetail?.name}
        deleteFunction={(id) => deleteSchedulerJob(id)}
      />
      <BreadCrumb list={breadcrumbList} />
      <div className="page-heading d-flex justify-content-between align-items-start flex-md-row flex-column">
        <div>
          <PageTitle label={schedulerJobDetail?.job_name} />
        </div>
        <div className="mt-3 d-flex mt-md-0">
          <Button className="ml-1px mx-2" label="Run" onClick={handleJobRun} />

          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>





        </div>
      </div>
      {/* <h1>hhhh</h1> */}
      <Nav tabs className="admin-tabs">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tabs.GENERAL,
            })}
            onClick={() => {
              toggle(Tabs.GENERAL);
              _handleTabChange(Tabs.GENERAL);
            }}
          >
            {Tabs.GENERAL}
          </NavLink>
        </NavItem>
        <NavItem>
          {showHistory && <NavLink
            className={classnames({
              active: activeTab === Tabs.HISTORY,
            })}
            onClick={() => {
              toggle(Tabs.HISTORY);
              _handleTabChange(Tabs.HISTORY);
            }}
          >
            {Tabs.HISTORY}
          </NavLink>}
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tabs.GENERAL}>
          <Form
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <div className="card bg-white mt-3 col-lg-12">
              <div className="card-body">
                <SchedulerJobForm
                  handleSchedulerChange={handleSchedulerChange}
                  handleTypeChange={handleTypeChange}
                  type={type}
                  row={schedulerJobDetail}
                  selectedDays={selectedDays}
                  handleCheckboxChange={handleCheckboxChange}
                  handleMonthChange={handleMonthChange}
                  handleDate={handleDate}
                  handleStartTimeChange={handleStartTimeChange}
                  handleEndTimeChange={handleEndTimeChange}
                />
                <HorizontalSpace>
                  <SaveButton label="Save" />
                  <CancelButton
                    onClick={() => {
                      props.history.push("/schedulerJobs");
                    }}
                  />
                </HorizontalSpace>
              </div>
            </div>
          </Form>
        </TabPane>
        {showHistory && <TabPane tabId={Tabs.HISTORY}>
          <ActivityList
            id={id}
            objectId={id}
            object_name={ObjectName.SCHEDULER_JOB}
          />
        </TabPane>}
      </TabContent>
    </>
  );
};

export default DetailSchedulerModal;
