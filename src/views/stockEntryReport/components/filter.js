import React, { useEffect, useState } from "react";
import Filter from "../../../components/Filter";
import Number from "../../../lib/Number";
import String from "../../../lib/String";
import Url from "../../../lib/Url";
import DateTime from "../../../lib/DateTime";
import StoreService from "../../../services/StoreService";
import CompanyUserService from "../../../services/UserService";
import { typeOptions } from "../../../helpers/StockEntryProduct";

const stockFilter = (props) => {
  const { initialparams, setPage, getDetails, setParams } = props;
  const [locationValue, setLocation] = useState(Url.GetParam("location"));
  const [userValue, setUser] = useState(Url.GetParam("user"));
  const [spinValue, setSpin] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: ""
  });

  const [locationList, setLocationList] = useState([]);

  const [userList, setUserList] = useState([]);
  const [typeValue, setType] = useState(Url.GetParam("type"));

  useEffect(() => {
    getLocation();
    getUserList();
  }, []);

  if (locationValue) {
    initialparams.location = locationValue;
  }

  if (!locationValue) {
    initialparams.location = "";
  }
  if (userValue) {
    initialparams.user = userValue;
  }

  if (!userValue) {
    initialparams.user = "";
  }

  if (typeValue) {
    initialparams.type = typeValue;
  }

  if (!typeValue) {
    initialparams.type = "";
  }

  const getLocation = async () => {
    await StoreService.list((locationList) => {
      setLocationList(locationList);
    });
  };

  const getUserList = async () => {
    const list = await CompanyUserService.list();

    const data = [];
    list.data &&
      list.data.length > 0 &&
      list.data.forEach((list) => {
        data.push({
          label: list.first_name + " " + list.last_name,
          value: list.id
        });
      });
    setUserList(data);
  };

  const handleParams = async (updatedParams) => {
    const params = {
      location: Url.GetParam("location"),
      user: Url.GetParam("user"),
      startDate: Url.GetParam("startDate"),
      endDate: Url.GetParam("endDate"),
      type: Url.GetParam("type"),
      ...updatedParams
    };

    setParams(params);
    await getDetails(params);
    Url.UpdateUrl(params, props);
  };

  const handleDeleteFilter = async (values) => {
    handleParams(values);
    setPage(1);
  };

  // Handle Tag change
  const handleStoreChange = async (values) => {
    const value = Number.Get(values?.id);

    setLocation(value);
    setPage(1);

    handleParams({ location: value });
  };

  // Handle Tag change
  const handleUserChange = async (values) => {
    const value = Number.Get(values?.id);
    setUser(value);
    setPage(1);
    handleParams({ user: value });
  };

  const initialValues = {
    location: locationList.find(
      (data) => data?.value == Url.GetParam("location")
    ),
    user: userList.find((data) => data.value == userValue),
    startDate:
      DateTime.getDateTimeByUserProfileTimezone(
        Url.GetParam("startDate"),
        "DD-MMM-YYYY"
      ) || "",
    endDate:
      DateTime.getDateTimeByUserProfileTimezone(
        Url.GetParam("endDate"),
        "DD-MMM-YYYY"
      ) || "",
    type: typeOptions.find((data) => data.value == Url.GetParam("type"))
  };

  const handleStartDate = async (startDate) => {
    const value = startDate ? DateTime.toISOStringDate(startDate) : "";
    setSelectedDate((prevState) => ({ ...prevState, startDate: value }));

    handleParams({ startDate: value });
    setPage(1);
  };

  const handleEndDate = async (endDate) => {
    const value = endDate ? DateTime.toISOStringDate(endDate) : "";

    setSelectedDate((prevState) => ({ ...prevState, endDate: value }));
    handleParams({ endDate: value });
    setPage(1);
  };

  const handleTypeChange = async (e) => {
    setType(e?.value ? e.value : "");
    setPage(1);
    handleParams({ type: e?.value ? e.value : "" });
  };

  const refreshButtonOnClick = async () => {
    setSpin(true);
    await getDetails(initialparams);
    setSpin(false);
  };

  return (
    <Filter
      showHeader
      newTableHeading
      showSearch
      sortByDropdown
      initialValues={initialValues}
      showStoreFilter
      handleStoreChange={handleStoreChange}
      showUserFilter
      handleUserChange={handleUserChange}
      showDateFilter
      handleStartDateChange={handleStartDate}
      handleEndDateChange={handleEndDate}
      refreshButtonOnClick={refreshButtonOnClick}
      refreshValue={spinValue}
      handleDeleteFilter={handleDeleteFilter}
      customTypeOption={typeOptions}
      showTypeFilter
      handleTypeChange={handleTypeChange}
    />
  );
};
export default stockFilter;
