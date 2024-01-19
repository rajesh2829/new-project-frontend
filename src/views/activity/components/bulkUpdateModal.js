import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import Avatar from "../../../components/Avatar";

import DeleteButton from "../../../components/DeleteButton";
import CancelButton from "../../../components/CancelButton";
import SaveButton from "../../../components/SaveButton";
import OutlineButton from "../../../components/OutlineButton";
import Modal from "../../../components/Modal";

import UpdateForm from "../components/UpdateForm";
import StatusService from "../../../services/StatusService";
import UserService from "../../../services/UserService";
import ActivityTypeService from "../../../services/ActivityTypeService";
import ObjectName from "../../../helpers/ObjectName";
import ActivityService from "../../../services/ActivityService";

const BulkUpdateModal = (props) => {
  const [usersList, setUsersList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [statusList, setStatusList] = useState([]);

  const { isOpen, toggle, selectedActvityIds } = props;

  // Use Dispatch
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    getUsersList();
    getStatusList();
    getActivityList();
  }, []);

  //   Get Status List
  const getStatusList = async () => {
    const data = await StatusService.search(ObjectName.ACTIVITY);

    if (data && data.length > 0) {
      const statusList = [];
      data
        .sort((a, b) => parseFloat(a.sort_order) - parseFloat(b.sort_order))
        .forEach((list) => {
          statusList.push({
            value: list.id,
            label: list.name,
          });
        });
      setStatusList(data);
    }
  };

  //Get Activity Details
  const getActivityList = async () => {
    let response = await ActivityTypeService.search();
    let data = response && response.data && response.data.data;
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

    return data;
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
        <div className="m-2">
          {firstName} {lastName}
        </div>
      </div>
    );
  };

  // Getting Users list for user dropdown
  const getUsersList = async () => {
    const response = await UserService.get();
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
    setUsersList(data);
  };

  // Bulk Update modal Body
  const bulkUpdateBody = (
    <>
      <UpdateForm
        usersList={usersList}
        activityList={activityList}
        statusList={statusList}
      />
    </>
  );

  // Bulk Update modal footer
  const bulkUpdateFooter = (
    <>
      <div className="d-flex justify-content-between">
        <DeleteButton
          className="mt-1"
          onClick={() => {
            dispatch(ActivityService.bulkDelete(selectedActvityIds, toggle));
          }}
        />
        <div>
          <CancelButton
            onClick={() => {
              toggle();
            }}
          />
          <SaveButton />
        </div>
      </div>
    </>
  );

  const handleBulkUpdate = (values) => {
    let data = new FormData();
    data.append(
      "activity_type",
      values.activity_type && values.activity_type.value
    );
    data.append("actual_hours", values.actual_hours);
    data.append("cost", String.Get(values.cost));
    data.append("date", values.date);
    data.append("start_date", values.start_date);
    data.append("end_date", values && values?.end_date);
    data.append("estimated_hours", values.estimated_hours);
    data.append("explanation", String.Get(values.explanation));
    data.append("notes", values.notes ? values.notes : "");
    data.append("status", values.status ? values.status.value : "");
    data.append(
      "owner",
      values.owner ? values.owner.id : "",
      data.append("bulk_update_ids", selectedActvityIds)
    );
  };

  // Initial Values
  const initialValues = {
    date: "",
    owner: "",
    activity_type: "",
    status: "",
    start_date: "",
    end_date: "",
    cost: "",
    estimated_hours: "",
    actual_hours: "",
    explanation: "",
    notes: "",
  };

  return (
    <div>
      {/* Bulk Update Modal Button */}
      <OutlineButton
        label="Bulk Update"
        onClick={() => {
          toggle();
        }}
        backgroundColor="var(--bulkUpdate-button-bg-color)"
        borderColor="var(--bulkUpdate-button-border-color)"
        color="var(--bulkUpdate-button-text-color)"
        disabled={
          selectedActvityIds && selectedActvityIds.length > 0 ? false : true
        }
      />

      {/* Bulk Update Modal */}
      <Modal
        modalTitle="Bulk Update"
        modalBody={bulkUpdateBody}
        modalFooter={bulkUpdateFooter}
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        initialValues={initialValues}
        hideDefaultButtons
        onSubmit={(values) => {
          // handleBulkUpdate(values);
        }}
      />
    </div>
  );
};
export default BulkUpdateModal;
