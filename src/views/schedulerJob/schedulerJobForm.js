import React, { useEffect, useState } from "react";
import TimeSelector from "../../components/TimeSelector";
import MultiSelect from "../../components/MultiselectCreatable";
import Select from "../../components/Select";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import { RecurringTaskType, dateOption, monthOption, typeOptions } from "../../helpers/recurringTask";
import DateTime from "../../lib/DateTime";
import { SchedulerApiUrl, schedulerJob } from "./constants";
import SchedulerJobService from "../../services/SchedulerJobService";
import SlackService from "../../services/SlackService";

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

const SchedulerJobForm = (props) => {

  const { handleSchedulerChange,handleNameChange,handleEmailChange,handleNotesChange,handleSlackchange, handleTypeChange,row,type, selectedDays,handleIntervalOnchange, handleCheckboxChange, handleMonthChange, handleDate, handleStartTimeChange, handleEndTimeChange } = props;

  const [slackChannelList, setSlackChannelList] = useState()
  const [dateOptions, setDataOption] = useState([]);
  const [values,setValues] = useState([])

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


  useEffect(() => {
    getDateOptions()
  }, [])

  const getDateOptions = async () => {
    let dateOptions = dateOption();
    setDataOption(dateOptions);
  };

  useEffect(() => {
    getSlackChannelList()
  }, []);
  useEffect(() => {
    getList();
  }, []);

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
        setSlackChannelList(channel);
      }
    } catch (err) { }
  };
  const getList = async () => {
    try {
      let matchingValues = [];
      let list = await SchedulerJobService.search();
  
      SchedulerApiUrl.forEach(item => {
        let data = list.find(job =>  job.job_name === item.label);
        if (data) {
          let labelContent = (
            <div className = "w-100 d-flex justify-content-between">
            <div>{data.job_name}</div>
            <div className="text-danger">(Added)</div>
          </div>
          );
  
  
          matchingValues.push({
            value: data.api_url,
            label: labelContent,
            name : data.job_name,
          });
        } else {
          matchingValues.push({
            value: item.value,
            label: item.label,
            name : item.label,

          });
        }
      });  
       setValues(matchingValues)
    } catch (error) {
      console.error("Error occurred while fetching the job list:", error);
      return [];
    }
  };
  
  
  
  
  return (

    <div className=" field-wrapper row">
      <div className=" col-lg-12 col-sm-6">
        <Select
          name="job"
          placeholder="Select Scheduler Job"
          label="Scheduler Job"
          options={row?.id ? SchedulerApiUrl : values}
          onInputChange={handleSchedulerChange}
          required
        />
        <Text
          name="name"
          label="Name"
          placeholder="Name"
          onChange={handleNameChange}
          required
        />
        <Select
          name="status"
          placeholder="Select status"
          label="Status"
          options={statusOptions}
          required
        />
        <div className="row">

          <div className="col-4">
            <div style={{ width: "100%" }}>
              <TimeSelector
                label="Start Time"
                name="startTime"
                isClearable={true}
                onChange={handleStartTimeChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div style={{ width: "100%" }}>
              <TimeSelector
                label="End Time"
                name="endTime"
                isClearable={true}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
          <div className="col-4">
            <Select
              name="interval"
              placeholder="Select"
              onInputChange ={handleIntervalOnchange}
              label="Interval"
              options={DateTime.getSchedulerTime()}
            />
          </div>
        </div>

        <div className="mb-3" style={{ width: "100%" }}>
          <MultiSelect
            name="to_email"
            placeholder="Enter To Email"
            label="To Email"
            onInputChange = {handleEmailChange}
          />
        </div>
        <Select
          name="to_slack"
          label={"To Slack"}
          placeholder="Select Slack Channel"
          options={slackChannelList}
          onInputChange = {handleSlackchange}
        />


        <Select
        name="taskType"
        label="Recurring Type"
        placeholder="Select Task"
        options={typeOptions}
        handleChange={handleTypeChange}
      />

      {type ==RecurringTaskType.WEEKLLY  || row?.type == RecurringTaskType.WEEKLLY && !type ? (
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

      {type == RecurringTaskType.ANNUALLY || row?.type == RecurringTaskType.ANNUALLY && !type ? (
        <>
          <Select name="month" label="Month" options={monthOption} onInputChange={handleMonthChange} />
        </>
      ) : ("")}
      {(type == RecurringTaskType.MONTHLY || type == RecurringTaskType.ANNUALLY) || row?.type == RecurringTaskType.MONTHLY && !type || row?.type == RecurringTaskType.ANNUALLY && !type ? (
        <>
          <Select name="date" label="Date" options={dateOptions} onInputChange={handleDate} />
        </>
      ) : ("")}
              <TextArea label="Notes" name="notes" onChange = {handleNotesChange}/>

      </div>
    </div>

  );
};
export default SchedulerJobForm;