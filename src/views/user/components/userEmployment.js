import React, { useEffect, useRef, useState } from "react";
import { endpoints } from "../../../api/endPoints";
import { apiClient } from "../../../apiClient";
import CancelButton from "../../../components/CancelButton";
import DateSelector from "../../../components/Date";
import Form from "../../../components/Form";
import SaveButton from "../../../components/SaveButton";
import Toast from "../../../components/Toast";
import { isBadRequest } from "../../../lib/Http";
import CompanyUserService from "../../../services/CompanyUserService";
import Currency from "../../../components/Currency";
import { getStoresList } from "../../../services/StoreListService";
import ShiftService from "../../../services/ShiftService";
import Number from "../../../lib/Number";
import SelectStore from "../../../components/SelectStore";
import TagSelect from "../../../components/TagSelect";
import { TagTypeNames } from "../../../helpers/Tag";
import NumberComponent from "../../../components/Number";
import DateTime from "../../../lib/DateTime";
import ShiftSelect from "../../../components/ShiftSelect";

function Checkbox({ day, checked, onChange }) {
  return (
    <label>
      <input
        className="mr-2"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(day, e.target.checked)}
      />
      {day}
    </label>
  );
}

const UserEmployment = (props) => {
  const { initialValues, history, id } = props;
  const [userDetail, setUserDetail] = useState({});
  const [storeList, setStoreList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [shift, setShift] = useState("");
  const [minimumWorkingHours, setMinimumWorkingHours] = useState();
  const [loginTime, setLoginTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [leaveBalance, setLeaveBalance] = useState(null);

  const getUserDetail = async () => {
    const userDetail = await CompanyUserService.get(id);
    setUserDetail(userDetail);
    setDesignation({
      label: userDetail?.designation,
      value: userDetail?.designationId
    });
    setLocation({
      label: userDetail?.location_name,
      value: userDetail?.primary_location_id
    });
    setShift({
      label: userDetail?.shift_name,
      value: userDetail?.primary_shift_id
    });
    setSalary(userDetail?.salary);
    setSelectedDays(userDetail.workingDays.split(","));
  };

  useEffect(() => {
    getStore();
    getShift();
    getUserDetail();
    getMinimumWorkingHours();
  }, []);

  const getMinimumWorkingHours = () => {
    let minimumWorkinHours = new Array();

    for (let i = 1; i <= 12; i++) {
      minimumWorkinHours.push({
        label: `${i} ${i == 1 ? "Hour" : "Hours"}`,
        value: i
      });
    }
    setMinimumWorkingHours(minimumWorkinHours);
  };

  //  Get Store List
  const getStore = async () => {
    const list = await getStoresList();
    setStoreList(list);
  };

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.getShiftLists();
    setShiftList(list);
  };

  const handleDesignationChange = (selectedOption) => {
    setDesignation(selectedOption);
  };

  const createUserEmployment = async (value) => {
    try {
      const response = await apiClient.post(
        `${endpoints().userEmploymentAPI}/${id}`,
        value
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
        getUserDetail();
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };

  const updateUserEmployment = async (values) => {
    try {
      const response = await apiClient.put(
        `${endpoints().userEmploymentAPI}/update/${id}`,
        values
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        Toast.success(successMessage);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };

  const handleUserEmployment = async (value) => {
    const Values = props.initialValues;
    const values = new FormData();
    values.append("start_date", value.start_date ? value.start_date : "");
    values.append("end_date", value.end_date ? value.end_date : "");
    values.append(
      "designation",
      value?.designation?.value ? value?.designation?.value : ""
    );
    values.append("salary", Number.Get(value?.salary));
    values.append(
      "location",
      value?.location?.value ? value?.location?.value : ""
    );
    values.append(
      "primary_shift_id",
      value?.shift?.value ? value?.shift?.value : ""
    );
    values.append("working_days", selectedDays ? selectedDays : "");
    values.append(
      "login_time",
      value.login_time ? DateTime.getTime(value.login_time) : ""
    );
    values.append(
      "minimum_working_hours",
      value.minimumWorkingHours ? value.minimumWorkingHours.value : ""
    );
    values.append(
      "leave_balance",
      value ? value.leave_balance : ""
    );
    values.append(
      "primary_location_id",
      value.primary_location ? value.primary_location?.id : ""
    );
    values.append(
      "primary_shift_id",
      value.primary_shift ? value.primary_shift?.id : ""
    );
    values.append(
      "secondary_location_id",
      value.secondary_location ? value.secondary_location?.id : ""
    );
    values.append(
      "secondary_shift_id",
      value.secondary_shift ? value.secondary_shift?.id : ""
    );
    updateUserEmployment(values)
  };

  const handleCheckboxChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };

  const convertTimeStringToDate = (timeString) => {
    const [hours, minutes] = timeString && timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };

  const handleSalaryChange = (value) => {
    setSalary(value?.target?.value);
    setDesignation(designation ? designation : "");
    setLocation(location ? location : "");
    setShift(shift ? shift : "");
  };

  const handleStartDate = async (startDate) => {
    const date = startDate ? DateTime.toISOStringDate(startDate) : "";
    setStartDate(date);
  };

  const handleEndDate = async (endDate) => {
    const date = endDate ? DateTime.toISOStringDate(endDate) : "";
    setEndDate(date);
  };

  const handleLoginTimeChange = (selectedTime) => {
    let date = DateTime.getTime(selectedTime);
    const data = convertTimeStringToDate(date);
    setLoginTime(data);
  };

  const handleLeaveBalance = (e) => {
    let data = e && e?.values && e?.values?.leave_balance
    setLeaveBalance(data)
  };

  const loginTimes = userDetail.login_time
    ? convertTimeStringToDate(userDetail.login_time)
    : null;

  return (
    <Form
      enableReinitialize={true}
      initialValues={{
        ...initialValues,

        login_time: loginTime ? loginTime : loginTimes ? loginTimes : "",
        designation: designation ? designation : "",
        salary: salary === "" ? "" : salary ? salary : "",
        location: location ? location : "",
        shift: shift ? shift : "",
        start_date:
          startDate === ""
            ? ""
            : startDate
              ? startDate
              : initialValues.start_date || userDetail?.date_of_joining,
        end_date:
          endDate === ""
            ? ""
            : endDate
              ? endDate
              : initialValues.end_date || "",
        minimumWorkingHours: userDetail.minimum_working_hours
          ? minimumWorkingHours.find(
            (data) => data.value == userDetail.minimum_working_hours
          )
          : "",
        leave_balance: leaveBalance === "" ? "" : leaveBalance ? leaveBalance : userDetail?.leave_balance ? userDetail?.leave_balance : "",
        primary_location: storeList && storeList.find((data) => data?.id == userDetail?.primary_location_id),
        primary_shift: shiftList && shiftList.find((data) => data?.id == userDetail?.primary_shift_id),
        secondary_location: storeList && storeList.find((data) => data?.id == userDetail?.secondary_location_id),
        secondary_shift: shiftList && shiftList.find((data) => data?.id == userDetail?.secondary_shift_id)


      }}
      onSubmit={(values) => {
        handleUserEmployment(values);
      }}>
      <div className="card bg-white mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col">
                  <TagSelect
                    name="designation"
                    label="Designation"
                    placeholder="Select Designation"
                    params={{ type: TagTypeNames.Designation }}
                    handleTagChange={handleDesignationChange}
                  />
                </div>
                <div className="col">
                  <Currency
                    label="Salary"
                    name="salary"
                    onChange={handleSalaryChange}
                  />
                </div>
                <div className="col">
                  <NumberComponent name="leave_balance" label="Leave Balance" placeholder="Enter Leave Balance" onInputChange={handleLeaveBalance} />
                </div>
              </div>

              <div className="row">
              </div>
              <div className="row">
                <div className="col">
                  <DateSelector
                    name="start_date"
                    label="Start Date"
                    onChange={handleStartDate}
                    isClearable
                  />
                </div>
                <div className="col">
                  <DateSelector
                    name="end_date"
                    label="End Date"
                    onChange={handleEndDate}
                    isClearable
                  />
                </div>
              </div> <div className='row'>
                <div className='col'>
                  <SelectStore label="Primary Location" name="primary_location" StoreList={setStoreList} />
                </div>
                <div className='col'>
                  <ShiftSelect label="Primary Shift" name="primary_shift" />
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <SelectStore label="Secondary Location" name="secondary_location" />
                </div>
                <div className='col'>
                  <ShiftSelect label="Secondary Shift" name="secondary_shift" />
                </div>
              </div>
              <br />
              <div className="mb-4">
                <div>
                  <SaveButton />
                  <CancelButton onClick={() => history?.push("/users")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default UserEmployment;
