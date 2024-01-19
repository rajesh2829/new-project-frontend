import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "../../apiClient";
import AddButton from "../../components/AddButton";
import Button from "../../components/Button";
import DateSelector from "../../components/Date";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import { endpoints } from "../../api/endPoints";
import { UserActivity } from "../../helpers/UserActivity";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import AvatarCard from "../../components/AvatarCard";

import { DropdownItem } from "reactstrap";

// Components
import DeleteModal from "../../components/DeleteModal";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { Link } from "react-router-dom";

import BulkUpdateModal from "./components/bulkUpdateModal";
import Url from "../../lib/Url";
import UserSelect from "../../components/UserSelect";
import ActivityService from "../../services/ActivityService";
import ActivityTypeService from "../../services/ActivityTypeService";
import DateTime from "../../lib/DateTime";

export const Activity = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [arrays, setArray] = useState([]);
  const [activitiesList, setActivityList] = useState([]);
  const [activityTypeData, setActivityTypeData] = useState("");
  const [activityData, setActivityData] = useState("");
  const [isOpenDeleteModal, setIsDeleteModal] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [isOpenBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [selectedActvityIds, setSelectedActivityIds] = useState(false);

  // Get initial data
  useEffect(() => {
    getActivityList();
    getUserDetails();
  }, []);

  // Dispatch
  const dispatch = useDispatch();

  // Status Options
  const columnOptions = [
    {
      value: UserActivity.ENABLE_ACTIVITY_TYPE,
      label: UserActivity.ENABLE_ACTIVITY_TYPE,
    },
    {
      value: UserActivity.ENABLE_ESTIMATED_HOURS,
      label: UserActivity.ENABLE_ESTIMATED_HOURS,
    },
    {
      value: UserActivity.ENABLE_ACTUAL_HOURS,
      label: UserActivity.ENABLE_ACTUAL_HOURS,
    },
    {
      value: UserActivity.ENABLE_UPDATED_AT,
      label: UserActivity.ENABLE_UPDATED_AT,
    },
    {
      value: UserActivity.ENABLE_UPDATED_BY,
      label: UserActivity.ENABLE_UPDATED_BY,
    },
  ];

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    }
  ];

  // Handle Add Modal
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle Column Sort
  const handleColumnChange = async (e) => {
    const array = e;
    setArray(array);
  };

  // Get Column Selections
  function getKeyByValue(object, value) {
    let isSelected = false;
    for (const key in object) {
      if (key == value) {
        isSelected = object[key] == true ? true : false;
      }
    }
    return isSelected;
  }
  const enable_activity_type =
    arrays && getKeyByValue(arrays, UserActivity.ENABLE_ACTIVITY_TYPE)
      ? true
      : false;
  const enable_actual_hours =
    arrays && getKeyByValue(arrays, UserActivity.ENABLE_ACTUAL_HOURS)
      ? true
      : false;
  const enable_estimated_hours =
    arrays && getKeyByValue(arrays, UserActivity.ENABLE_ESTIMATED_HOURS)
      ? true
      : false;
  const enable_updated_at =
    arrays && getKeyByValue(arrays, UserActivity.ENABLE_UPDATED_AT)
      ? true
      : false;
  const enable_updated_by =
    arrays && getKeyByValue(arrays, UserActivity.ENABLE_UPDATED_BY)
      ? true
      : false;

  // Handle Activity Change
  const handleActivityChange = async (values) => {
    // Get the selected activity option Id
    const selectedOptionId =
      values && values.values.activity && values.values.activity.value;
    // Get activity permissions and data based on the selected option
    if (activityTypeData && activityTypeData.length > 0) {
      activityTypeData.forEach((activityData) => {
        if (activityData.id == selectedOptionId) {
          // Set Selected Option Data
          setActivityData(activityData);
        }
      });
    }
  };

  //Get Activity Details
  const getActivityList = async () => {
    let data;
    let response = await ActivityTypeService.search()
    data = response && response.data && response.data.data;
    // Split the activity options
    if (data && data.length > 0) {
      const activityList = [];
      data
        .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
        .forEach((activityData) => {
          activityList.push({
            value: activityData.id,
            label: activityData.name,
          });
        });
      // Set Activity Options List in state
      setActivityList(activityList);
    }
    // Set Activity Data in state
    setActivityTypeData(data);
    return data;
  };

  const getUserDetails = (userImage, first_fname, last_name) => {
    return (
      <AvatarCard
        firstName={first_fname}
        lastName={last_name}
        url={userImage}
      />
    );
  };


  //Handle Add Activity
  const handleAddActivity = (values) => {
    const data = new FormData();
    if (values && values.activity !== undefined) {
      data.append(
        "activity",
        values && values.activity && values.activity.label
          ? values.activity.label
          : ""
      );
    }
    data.append(
      "activity_type",
      activityData && activityData.type ? activityData.type : ""
    );

    if (values && values.activity !== undefined) {
      data.append(
        "activity_type_id",
        values && values.activity && values.activity.value
          ? values.activity.value
          : ""
      );
    }
    if (values && values.activity !== undefined) {
      data.append(
        "status",
        activityData && activityData.default_status
          ? activityData.default_status
          : ""
      );
    }
    if (values && values.user !== undefined) {
      data.append(
        "user_id",
        values && values.user && values.user.id ? values.user.id : ""
      );
    }

    if (values && values.notes !== undefined) {
      data.append("notes", values && values.notes ? values.notes : "");
    }
    if (values && values.date !== undefined) {
      data.append(
        "date",
        values && values.date ? values.date : ""
      );
    }
    dispatch(ActivityService.create(data, { sort: Url.GetParam("sort") ? Url.GetParam("sort") : "id", sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "DESC" }));
    toggle();
  };


  const deleteActivity = () => {
    if (selectedData && selectedData.id) {
      dispatch(ActivityService.delete(selectedData.id, setIsDeleteModal, {}));
    }
  }

  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!isOpenBulkUpdateModal)
  }

  const onBulkSelect = (value) => {
    setSelectedActivityIds(value);
  }

  // initial values while adding an activity
  const initialValues = {
    user: "",
    activity: "",
    date: "",
    notes: ""
  };

  const addActivityForm = (
    <div className="mt-2 mb-3">
      <div>
        <UserSelect label="User" required={true} />
        <Select
          name="activity"
          label="Activity"
          options={activitiesList}
          onInputChange={(e) => {
            handleActivityChange(e);
          }}
          required={true}
        />
        {activityData && activityData.allow_date_selection == true && (
          <DateSelector label="Date" name="date" format="dd-MMM-yyyy" />
        )}
        {activityData && activityData.show_notes == true && (
          <TextArea
            name="notes"
            label={activityData.question}
            placeholder="Notes"
          />
        )}
      </div>
    </div>
  );

  const activityFooter = (
    <div className="overflow-hidden">
      <div className="col-sm-10 text-center">
        <Button type="submit" label="Add" className="h6-5-important" />
      </div>
    </div>
  );

  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Activity"
        modalBody={addActivityForm}
        modalFooter={activityFooter}
        initialValues={initialValues}
        onSubmit={(values) => {
          handleAddActivity(values);
        }}
        hideDefaultButtons
      />

      <DeleteModal
        isOpen={isOpenDeleteModal}
        toggle={() => {
          setIsDeleteModal(false);
        }}
        title="Delete Activity"
        id={selectedData && selectedData.id}
        label={selectedData && selectedData.activity}
        deleteFunction={deleteActivity}
      />

      <div>
        <div className="row">
          <div class="col">
            <PageTitle label="Activity" />
          </div>

          <BulkUpdateModal
            isOpen={isOpenBulkUpdateModal}
            toggle={toggleBulkUpdateModal}
            selectedActvityIds={selectedActvityIds}
          />
          <div className="mr-4">
            <AddButton
              className="ml-2 mr-1"
              label="Add"
              onClick={(e) => {
                toggle();
              }}
            />

            {/* Column Sort Option */}
            <DropdownWithCheckbox
              buttonLabel=""
              dropdownLinks={columnOptions}
              handleChange={(e) => {
                handleColumnChange(e);
              }}
              color="gray"
              hideCaret
            />
          </div>
        </div>
        <div className="mt-4">
          <ReduxTable
            id="activity"
            searchPlaceholder="Search"
            apiURL={`${endpoints().activityAPI}/search`}
            newTableHeading
            sortByOptions={sortByOption}
            bulkSelect
            onBulkSelect={onBulkSelect}
            paramsToUrl={true}
            history={props.history}
          >
            <ReduxColumn
              width="90px"
              field="date"
              sortBy="date"
              className="text-center"
              renderField={(row) => (
                <>
                  <Link to={`/activity/detail/${row.id}`}>
                    {DateTime.getDate(row.date)}
                  </Link>
                </>
              )}>
              Date
            </ReduxColumn>
            <ReduxColumn
              width="90px"
              field="userName"
              className="text-center"
              sortBy="owner_id" >
              Owner
            </ReduxColumn>
            <ReduxColumn
              width="90px"
              field="activity"
              className="text-center"
              sortBy="activity" >
              Activity
            </ReduxColumn>

            {enable_activity_type && enable_activity_type == true && (
              <ReduxColumn
                width="90px"
                field="activity_type"
                sortBy="activity_type"
                className="text-center"
              >
                Activity Type
              </ReduxColumn>
            )}
            <ReduxColumn
              width="90px"
              className="text-center"
              field="start_date"
              sortBy="start_date"
              renderField={(row) => <span>{DateTime.getDate(row.start_date)}</span>}
            >
              Start Date
            </ReduxColumn>
            <ReduxColumn
              width="90px"
              className="text-center"
              field="end_date"
              sortBy="end_date"
              renderField={(row) => <span>{row.end_date ? DateTime.getDate(row.end_date) : ""}</span>}>
              End Date
            </ReduxColumn>
            {enable_estimated_hours && enable_estimated_hours == true && (
              <ReduxColumn
                width="90px"
                field="estimated_hours"
                sortBy="estimated_hours"
                className="text-center"
              >
                Estimated Hours
              </ReduxColumn>
            )}

            {enable_actual_hours && enable_actual_hours == true && (
              <ReduxColumn
                width="90px"
                field="actual_hours"
                sortBy="actual_hours"
                className="text-center"
              >
                Actual Hours
              </ReduxColumn>
            )}
            <ReduxColumn
              width="90px"
              className="text-center"
              field="cost"
              sortBy="cost">
              Cost
            </ReduxColumn>
            <ReduxColumn
              width="90px"
              className="text-center"
              field="status"
              sortBy="status">
              Status
            </ReduxColumn>

            <ReduxColumn
              width="90px"
              field="notes"
              sortBy="notes">
              Notes
            </ReduxColumn>

            <ReduxColumn
              width="110px"
              field="explanation">
              Explanation
            </ReduxColumn>
            <ReduxColumn
              width="90px"
              className="text-center"
              field="ipAddress"
              sortBy="ip_address">
              IP Address
            </ReduxColumn>
            {enable_updated_at && enable_updated_at == true && (
              <ReduxColumn
                width="90px"
                field="updatedAt"
                className="text-center"
                sortBy="updatedAt">
                Updated At
              </ReduxColumn>
            )}
            {enable_updated_by && enable_updated_by == true && (
              <ReduxColumn
                width="110px"
                className="text-center"
                field="updatedBy">
                Updated By
              </ReduxColumn>
            )}
            <ReduxColumn
              width="90px"
              className="text-center"
              field="createdAt"
              sortBy="createdAt">
              Created At
            </ReduxColumn>
            <ReduxColumn
              field="Action"
              width="90px"
              disableOnClick
              renderField={(row) => (
                <div className="text-center action-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      className="text-danger"
                      onClick={() => {
                        setSelectedData(row);
                        setIsDeleteModal(true);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </MoreDropdown>
                </div>
              )}
            >
              Action
            </ReduxColumn>
          </ReduxTable>
        </div>
      </div>
    </>
  );
};
