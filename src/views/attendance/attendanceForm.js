import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import DateSelector from "../../components/Date";
import Select from "../../components/Select";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import NumberField from "../../components/Number";
import SelectStore from "../../components/SelectStore";
import SingleCheckbox from "../../components/SingleCheckbox";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";
import UserSelect from "../../components/UserSelect";

// API
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

// Helpers
import {
  lateHoursStatusOptions,
  statusOptions,
  typeOptions,
} from "../../helpers/Attendance";

// Services
import ShiftService from "../../services/ShiftService";
import { getStoresList } from "../../services/StoreListService";

export const tab = {
  ACTIVE: "Active",
  ARCHIVED: "Archived",
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ALL: "All",
};

export const AttendanceDetailTab = {
  GENERAL: "General",
  HISTORY: "History",
};

const AttendanceForm = (props) => {
  const [usersList, setUsersList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [shiftList, setShiftList] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const { handleTypeChange,
    selectTypeValue,
    handleUserChange,
    handleShiftChange,
    handleStoreChange,
    handleStatusChange,
    handleInTimeChange,
    handleOutTimeChange,
    handleLateHoursChange,
    onNotesChange,
    handleIpAddress } = props;
  // Use Dispatch
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    getUsersList();
    getStore();
    getShift();
  }, []);

  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <UserCard firstName={firstName} lastName={lastName} url={media_url} />
      </div>
    );
  };

  // Getting Users list for user dropdown
  const getUsersList = async () => {
    setIsLoading(true);
    const response = await apiClient.get(`${endpoints().userAPI}/list`);
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
    return <Spinner />;
  }

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.search();
    setShiftList(list);
  };

  return (
    <div>
      <UserSelect label="User" required handleUserChange={handleUserChange} />
      <Select
        label="Type"
        name="type"
        options={typeOptions}
        required
        onInputChange={handleTypeChange}
      />
      {selectTypeValue !== "Absent" && selectTypeValue !== "Leave" && (
        <div className="row">
          <div className="col">
            <SelectStore label="Location" required handleStoreChange={handleStoreChange} />
          </div>
          <div className="col">
            <Select
              name="shift"
              label="Shift"
              placeholder="Select Shift"
              options={shiftList}
              required
              onInputChange={handleShiftChange}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col">
          <DateSelector
            label="Date"
            name="date"
            format="dd-MMM-yyyy"
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
            onChange={handleInTimeChange}
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
            onChange={handleOutTimeChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Select
            label="Status"
            name="status"
            options={statusOptions}
            onInputChange={handleStatusChange}
          />
        </div>
        <div className="col">
          <Text label="Late Hours" name="late_hours" />
        </div>
        <div className="col">
          <Text
            name="additional_hours"
            label="Additional Hours"
          />
        </div>
      </div>
      <Select
        label="Late Hours Status"
        name="late_hours_status"
        options={lateHoursStatusOptions}
        onInputChange={handleLateHoursChange}
      />
      <Text label="IP Address" name="ip_address" onChange={handleIpAddress} />
      <TextArea label="Notes" name="notes" onChange={onNotesChange} />
      {selectTypeValue === "Leave" || selectTypeValue === "Additional Leave" ? (<NumberField name="days_count" label="Days Count" placeholder="Enter Days Count" />) : ("")}
      <div className="d-inline-block">
        <div>
          <SingleCheckbox
            name="allow_early_checkout"
            label={"Allow Early CheckOut"}
          />
        </div>
      </div>
    </div>
  );
};
export default AttendanceForm;