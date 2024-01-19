import React, { useEffect, useState } from "react";

// Components
import Form from "../../../components/Form";
import Avatar from "../../../components/Avatar";
import PageSize from "../../../components/PageSize";
import DateSelector from "../../../components/Date";
import UserSelect from "../../../components/UserSelect";
import RefreshButton from "../../../components/refreshButton";

// Endpoints
import { endpoints } from "../../../api/endPoints";

// Lib
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";

// API Client
import { apiClient } from "../../../apiClient";

// helpers
import { User } from "../../../helpers/User";

const AttendanceFilter = ({
  initialParam,
  history,
  handleChange,
  setPage,
  setPageSize,
  pageSize,
  props,
}) => {
  const [param, setParam] = useState({
    user: "",
    location: "",
    shift: "",
    type: "",
    startDate: "",
    endDate: "",
  });

  const currentDate = new Date(); // Get the current date
  const currentYear = currentDate.getFullYear(); // Get the current year
  const currentMonth = currentDate.getMonth(); // G

  const [users, setUser] = useState();
  const [usersList, setUsersList] = useState([]);
  const [selectedPageSize, setSelectedPageSize] = useState(25);
  const [endDateValue, setEndDateValue] = useState();
  const [userValue, setUserValue] = useState();
  const [startDateValue, setStartDateValue] = useState();
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [status, setStatus] = useState(Url.GetParam("status"));

  useEffect(() => {
    setPageSize(Url.GetParam("pageSize"));
    getUserList();
    setUser(Url.GetParam("user_id"));
  }, [initialParam]);

  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <Avatar
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
        <div className="m-2">
          {firstName} {lastName}
        </div>
      </div>
    );
  };

  const getUserList = async () => {
    let getUserList;
    await apiClient
      .get(
        `${endpoints().userAPI}/search?status=${User.STATUS_ACTIVE_VALUE
        }`
      )
      .then((response) => {
        const data = response.data.data;
        getUserList = data.sort((a, b) => (a.value > b.value ? -1 : 1));
        if (getUserList && getUserList.length > 0) {
          const userList = [];
          getUserList.forEach((list) => {
            userList.push({
              value: list.first_name,
              id: list.id,
              label: getUserName(
                list.avatarUrl,
                list.first_name,
                list.last_name
              ),
            });
          });
          // Set the User List Options in State
          setUsersList(userList);
        }
      });
    return getUserList;
  };

  const statusOption = [
    {
      value: User.STATUS_ACTIVE_VALUE,
      label: User.STATUS_ACTIVE_TEXT,
    },
    {
      value: User.STATUS_INACTIVE_VALUE,
      label: User.STATUS_INACTIVE_TEXT,
    },
  ];

  // // Handle User change
  const handleUserChange = async (user_id) => {
    const user = user_id?.id ? user_id?.id : "";
    setUser(user_id);
    setPage(1);

    let data = {
      user_id: user ? user : "",
      endDate: Url.GetParam("endDate"),
      startDate: Url.GetParam("startDate"),
    };
    Url.UpdateUrl(
      {
        user_id: user ? user : "",
        endDate: Url.GetParam("endDate"),
        startDate: Url.GetParam("startDate"),
        ...pageSize,
      },
      props
    );
    handleChange(data);
    setUserValue(user_id?.id);
  };

  // // Handle startdate
  const handleStartDate = async (startDate) => {
    const date = startDate ? DateTime.toISOStringDate(startDate) : "";

    let data = {
      user_id: Url.GetParam("user_id"),
      endDate: Url.GetParam("endDate"),
      startDate: date ? date : "",
    };
    Url.UpdateUrl(
      {
        user_id: Url.GetParam("user_id"),
        endDate: Url.GetParam("endDate"),
        startDate: date ? date : "",
        ...pageSize,
      },
      props
    );
    handleChange(data);
  };

  // Handle End date
  const handleEndDate = async (endDate) => {
    let date = endDate ? DateTime.toISOStringDate(endDate) : "";

    let data = {
      user_id: Url.GetParam("user_id"),
      endDate: date ? date : "",
      startDate: Url.GetParam("startDate"),
    };
    Url.UpdateUrl(
      {
        user_id: Url.GetParam("user_id"),
        endDate: date ? date : "",
        startDate: Url.GetParam("startDate"),
        ...pageSize,
      },
      props
    );
    handleChange(data);
  };

  // Handle Pagesize
  const handlePageSize = async (pageSize) => {
    setPageSize(pageSize);
    let params = { ...param };
    setParam(params);
    setPage(1);
    const user = params.user_id || Url.GetParam("user_id") && {
      user_id: params.user_id ? params.user_id : Url.GetParam("user_id"),
    };
    const startDates = params.startDate || Url.GetParam("startDate") && {
      startDate: params.startDate ? params.startDate : Url.GetParam("startDate"),
    };
    const endDates = params.endDate || Url.GetParam("endDate") && {
      endDate: params.endDate ? params.endDate : Url.GetParam("endDate"),
    };

    const status = params.status || Url.GetParam("status") && {
      status: params.status ? params.status : Url.GetParam("status"),
    };

    const pageSizes = pageSize && { pageSize: pageSize ? pageSize : "" }
    Url.UpdateUrl(
      {
        ...user,
        ...startDates,
        ...endDates,
        ...status,
        ...pageSizes,
      },
      props
    );
    handleChange(params);
  };

  const initialValues = {
    user: usersList
      ? usersList.find((data) => data.id == Url.GetParam("user_id"))
      : userValue,
    startDate: Url.GetParam("startDate") || "",
    endDate: Url.GetParam("endDate") || "",
  };

  const statusvalue = statusOption.find(
    (data) => data.value == Url.GetParam("status")
  );

  const handleRefreshButtonOnClick = () => {
    handleChange();
  }

  return (
    <div className="card pt-4 px-4">
      <div className="row">
        <div className="d-none d-md-block">
          <PageSize
            selectedPageSize={pageSize && pageSize}
            onChange={(e) => handlePageSize(e)}
          />
        </div>

        <div className="col-md-11">
          <Form enableReinitialize={true} initialValues={initialValues}>
            <div className="row">
              {/* User Filter */}
              <div className="col-sm-4">
                <UserSelect handleUserChange={handleUserChange} />
              </div>

              {/* Start date Filter */}
              <div className="col-sm-4">
                <DateSelector
                  selected={selectedDate.startDate}
                  name="startDate"
                  placeholder="Start Date"
                  isClearable
                  onChange={handleStartDate}
                />
              </div>

              {/* End Date Filter */}
              <div className="col-sm-4">
                <DateSelector
                  selected={selectedDate.endDate}
                  name="endDate"
                  placeholder="End Date"
                  isClearable={true}
                  onChange={handleEndDate}
                />
              </div>
            </div>

          </Form>
        </div>
        <RefreshButton onClick={handleRefreshButtonOnClick} />
      </div>
    </div>

  );
};
export default AttendanceFilter;
