import React, { useEffect, useState } from "react";
// Components
import { SchedulerApiUrl, schedulerJob } from "./constants";

import { useDispatch } from "react-redux";

//action
import { addSchedulerJob } from "../../actions/schedulerJob";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";
import { dateOption, monthOption, typeOptions } from "../../helpers/recurringTask";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import SchedulerJobService from "../../services/SchedulerJobService";
import SlackService from "../../services/SlackService";
import SchedulerJobForm from "./schedulerJobForm";


const AddSchedulerModal = ({ toggle, onModalClose, isOpen, row }) => {

  const [slackChannelList, setSlackChannelList] = useState();
  const [isSubmit, setIsSubmit] = useState();
  const [schedulerName, setSchedulerName] = useState("");
  const [scheduler, setScheduler] = useState("");
  const [type, setType] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(null);
  const [dateOptions, setDataOption] = useState([]);
  const [endTimeValue, setEndTimeValue]=useState(null)
  const [startTimeValue, setStartTimeValue]=useState(null)
  const [intervalValue,setIntervalValue] = useState()
  const [email,setEmail] = useState(null)
  const [slack,setSlack] = useState()
  const [notes,setNotes] = useState(null)
  const dispatch = useDispatch();
  const ModalClose=()=>{
    onModalClose()
    setSelectedDays([])
    setMonth("");
    setDate("");
    setType("");
    setIntervalValue("")
    setSchedulerName("")
    setScheduler("")
    setStartTimeValue(null)
    setEndTimeValue(null)
    setEmail("")
    setSlack("")
    setNotes("")
  }
  useEffect(() => {
    if (row && row?.day) {
      setSelectedDays(row && row?.day)
    }
  }, [row]);

  useEffect(() => {
    getDateOptions()
  }, []);

  const getDateOptions = async () => {
    let dateOptions = dateOption();
    setDataOption(dateOptions);
  };

  // Handle Project Category form submit
  const handleSubmit = async (values) => {
    setIsSubmit(false);
    try {

      let data = {}
      let attendance_missing_report_email = [];

      let to_email = [];

      if (values && values?.name) {
        data.name = scheduler ? scheduler :  schedulerName.label ? schedulerName.label : schedulerName.name ? schedulerName.name : values.name;
      }

      if (values && values.job) {
        data.job_name = values?.job?.label;
        data.api_url = values?.job?.value;
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
        values && values?.to_email && values?.to_email?.forEach((element) => {
          to_email.push(element.value);
        });
      
        data.to_email = to_email ? to_email : "";
    }
    
      if (values.attendance_missing_report_email !== undefined) {
        values && values.attendance_missing_report_email && values.attendance_missing_report_email.forEach((element) => {
          attendance_missing_report_email.push(element.value);
        });
      }
      if (values.to_slack && values.to_slack.value !== undefined) {
        data.to_slack = values.to_slack.value ? values.to_slack.value : "";
      }
      if (values.taskType) {
        data.taskType = values.taskType.value;
      }
      values.day = selectedDays && selectedDays.length > 0 ? JSON.stringify(selectedDays) : [];
      if(values.day){
        data.day = values.day;
      }
      if(values.notes){
        data.notes = notes ? notes : values.notes;
      }

      if (values.month||month) {
        data.month = month ? month :  values?.month?.value;
      }
      if (date || values.date) {
        data.date = date ? date : values?.date?.value;
      }

      data.attendance_missing_report_email = attendance_missing_report_email
        ? attendance_missing_report_email
        : "";
      if (row?.id) {
        await SchedulerJobService.update(row?.id, data,null ,(res)=>{
          if(res){
            dispatch(
              fetchList(
                "schedulerJob",
                `${endpoints().schedulerJobAPI}/list`,
                Url.GetParam("page") ? Url.GetParam("page") : 1,
                Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
                {
                  status: Url.GetParam("status"),
                  search: Url.GetParam("search"),
                }
              )
            );
            toggle();
            ModalClose()
            setIsSubmit(true)
          }
        });
       
      }
      else {
        dispatch(await addSchedulerJob(data, { pagination: true, status: Url.GetParam("status"), search: Url.GetParam("search") }));
        setIsSubmit(true)
        toggle();
        ModalClose()
      }
    } catch (err) {
      setIsSubmit(true)
      console.log(err);
    }
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


  useEffect(() => {
    getSlackChannelList()
  }, []);

  const handleSchedulerChange = (e) => {
    let value = e.values.job;
    setSchedulerName(value ? value : "");
  }
  const handleNameChange =(e)=>{
    setScheduler(e.target.value);
  }

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
  let emailValue=[]
  if(row && row?.to_email && row?.to_email.length > 0){
    row?.to_email.forEach((value)=>{
      emailValue.push(value)
    })
  }
  const initialValues = {
    job: schedulerName ?
      {
        label: schedulerName.name ? schedulerName.name : schedulerName?.label, 
        value: schedulerName?.value,
      } :
      SchedulerApiUrl && SchedulerApiUrl.find(
        (data) => data.value == row?.api_url
      ),
    status:
      row?.status ? statusOptions && statusOptions.find(
        (data) => data?.value == row?.status
      ) : {
        value: schedulerJob.STATUS_ACTIVE,
        label: schedulerJob.STATUS_ACTIVE_TEXT
      },


    notes: notes ? notes : row.notes,
    name: scheduler ? scheduler : row?.name ? row?.name : schedulerName.name ? schedulerName.name : schedulerName.label ? schedulerName.label  : "",
    interval: intervalValue ? intervalValue : DateTime.getSchedulerTime().find(
      (data) => data.value == (row?.interval ? row?.interval : "")
    ),
    startTime: startTimeValue ? startTimeValue : row?.startTime ? row?.startTime : "",
    
    
    to_email: email ? email : row?.to_email ? emailValue  : "",  
    
    to_slack: slack ? slack : slackChannelList && slackChannelList.find(
      (data) => data.value == (row?.to_slack ? row?.to_slack : "")
    ),
    endTime: endTimeValue ? endTimeValue : row?.endTime ? row?.endTime : "",
    taskType: type ? typeOptions.find((data) => data.label == type) : typeOptions.find((data) => data.label == row?.type),
    month: month ? monthOption.find((data) => data.value == month) : monthOption.find((data) => data.value == row?.monthValue?.value),
    date: date ? dateOptions.find((data)=>data?.value == date) : row?.date ? dateOptions.find((data)=>data?.value == row?.date) : "",
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
  const handleNotesChange = (e) => {
    const value = e.target.value ? e.target.value : "";

    setNotes(value);
  };

  const handleEndTimeChange =(e)=>{
    setEndTimeValue(e)
  }
  const handleStartTimeChange =(e)=>{
    setStartTimeValue(e)
  }
  const handleIntervalOnchange=(e)=>{
    let value = e && e?.values && e?.values?.interval && e.values.interval

    setIntervalValue(value)
  }

  const handleEmailChange=(e)=>{
    setEmail(e.values ? e.values.to_email : "")
  }
  const handleSlackchange=(e)=>{
    setSlack(e.values ? e.values.to_slack : "")
  }

  // Modal Body for Add Product Category Form
  const addSchedulerJobForm = (
    <>
      <SchedulerJobForm
       handleSchedulerChange={handleSchedulerChange}
       handleNameChange = {handleNameChange}
       handleTypeChange={handleTypeChange}
       type={type}
       row={row}
       selectedDays={selectedDays}
       handleIntervalOnchange={handleIntervalOnchange}
       handleEmailChange ={handleEmailChange}
       handleSlackchange={handleSlackchange}
       handleCheckboxChange={handleCheckboxChange}
       handleMonthChange={handleMonthChange}
       handleNotesChange={handleNotesChange}
       handleDate={handleDate}
       handleEndTimeChange={handleEndTimeChange}
       handleStartTimeChange={handleStartTimeChange}
       />
    </>
  );

  // Modal Footer For Add Button
  const schdulerJobFootet = <SaveButton
    type="submit"
    loading={isSubmit == false}
    label={row?.id ? "Save" : "Add"}
  />

  return (
    <>
      <Drawer
        modelTitle={row?.id ? "Edit Scheduler Job" : "Add Scheduler Job"}
        DrawerBody={addSchedulerJobForm}
        DrawerFooter={schdulerJobFootet}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        handleOpenModal={toggle}
        handleCloseModal={ModalClose}
        handleDrawerClose={ModalClose}
        isModalOpen={isOpen}
        enableReinitialize
      />
    </>
  );
};

export default AddSchedulerModal;
