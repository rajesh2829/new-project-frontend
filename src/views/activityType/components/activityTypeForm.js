import React, { useEffect, useState } from "react";
import Number from "../../../components/Number";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import { useDispatch } from "react-redux";
import MultiSelect from "../../../components/Multiselect";
import SingleCheckbox from "../../../components/SingleCheckbox";
import SubTitle from "../../../components/SubTitle";
import ActivityTypeService from "../../../services/ActivityTypeService";
import RoleService from "../../../services/RoleService";
import StatusService from "../../../services/StatusService";
import ObjectName from "../../../helpers/ObjectName";
import CompanyUserService from "../../../services/UserService";
import ActivityTypeGroup from "../../../helpers/ActivityTypeGroup";

const ActivityTypeForm = (props) => {
  const [activityTypeData, setActivityTypeData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [roles, setRoles] = useState();
  const [list, setList] = useState();
  const [userList, setUserList] = useState();

  useEffect(() => {
    UserList();

    getRoleDetail();
    getStatusList();
  }, []);

  const activityTypeGroup = [
    {
      label: ActivityTypeGroup.CHECK_IN_TEXT,
      value: ActivityTypeGroup.CHECK_IN,
    },
    {
      label: ActivityTypeGroup.CHECK_OUT_TEXT,
      value: ActivityTypeGroup.CHECK_OUT,
    },
  ];

  const dispatch = useDispatch();
  const maxHourOptions = [
    {
      key: 1,
      value: 5,
      label: "5 Minutes",
    },
    {
      key: 2,
      value: 10,
      label: "10 Minutes",
    },
    {
      key: 3,
      value: 15,
      label: "15 Minutes",
    },
    {
      key: 4,
      value: 30,
      label: "30 Minutes",
    },
    {
      key: 5,
      value: 45,
      label: "45 Minutes",
    },
    {
      key: 6,
      value: 1,
      label: "1 Hours",
    },
    {
      key: 7,
      value: 1.5,
      label: "1.5 Hours",
    },
    {
      key: 8,
      value: 2,
      label: "2 Hours",
    },
    {
      key: 9,
      value: 2.5,
      label: "2.5 Hours",
    },
  ];

  //get role deatails
  const getRoleDetail = async () => {
    const response = await RoleService.getRoleDetail();
    setRoles(response);
  };

  const getValue = (array, array1) => {
    const selectedRoles = [];
    const roleInitialValues = {};

    if (array && array.length > 0) {
      console.log();
      array.forEach((data) => {
        if (array1 && array1.length > 0)
          array1.forEach((tag) => {
            if (tag.value == data) selectedRoles.push(tag);
          });
      });
      roleInitialValues["user_roles"] = selectedRoles;
    }
    return roleInitialValues;
  };

  let selectedRoleIds = activityTypeData?.user_roles || "";

  let selectedRoleArray = selectedRoleIds.split(",");

  const selectedRole = getValue(selectedRoleArray, roles);

  const getStatusList = async () => {
    const response = await StatusService.getOption(ObjectName.ACTIVITY);
    const actvityList = []
    response.forEach((data) => {
      actvityList.push({
        value: data?.value,
        label: data?.label
      })

    })

    setList(actvityList);
  };

  const UserList = async () => {
    const response = await CompanyUserService.get();
    const data = response.data;
    const usersList = [];
    data
      .sort((a, b) => parseFloat(a.sort_order) - parseFloat(b.sort_order))
      .forEach((list) => {
        usersList.push({
          value: list.id,
          label: list.first_name,
        });
      });

    setUserList(usersList);
  };

  return (
    <div>
      <Text
        name="name"
        label="Activity Type Name"
        placeholder="Enter Name"
        required

      />
      <Text
        name="type"
        label="Activity Type"
        placeholder="Activity type"

      />
      <Select
        name="activityTypeGroup"
        label="Activity Type Group"
        placeholder="Activity type Group"
        options={activityTypeGroup}

      />
      <Number label="Sort" name="sort" placeholder="0" />
      <Text
        name="question"
        label="Question"
        placeholder="Question"

      />
      <Text
        name="slack_id"
        label="slack ID"
        placeholder="slack ID"

      />
      <Select
        name="max_hours"
        label="Maximum Hour"
        options={maxHourOptions}
      />
      <MultiSelect
        name={"user_roles"}
        label="User Roles"
        options={roles}
      />
      <Select
        name="approvers"
        label="Approver"
        options={userList}
      />
      <Number
        name="max_entries_per_day"
        label="Maximum Entry Per Day"
        placeholder="Enter Maximum Entry Per Day"
      />
      <Select
        name="default_status"
        label="Default Status"
        placeholder="Default Status"
        options={list}
      />
      <Text
        name="model_name"
        label="Model Name"
        placeholder="slack ID"
      />
      <Text
        name="ticket_types"
        label="Ticket Type Ids"
        placeholder="Enter Ticket Type ids"
      />
      <SubTitle label={"User Login and Logout"} />
      <div className="form-wrapper">
        <div className="form-wrapper">
          {/* company view */}
          <div className="field-wrapper">
            <SingleCheckbox
              name={"update_login"}
              label={"Update login"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>{" "}
          <div className="field-wrapper">
            <SingleCheckbox
              name={"update_logout"}
              label={"Update Logout"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />{" "}
          </div>{" "}
          <div className="field-wrapper">
            <SingleCheckbox
              name={"allow_manual_entry"}
              label={"Allow Manual Entry"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>{" "}
          <div className="field-wrapper">
            <SingleCheckbox
              name={"auto_add"}
              label={"Auto add"}
            />
          </div>
          <SubTitle label={"Ticket Validation"} />
          <div className="field-wrapper">
            <SingleCheckbox
              name={"is_screenshot_required"}
              label={"isScreenshotrequired"}
            />
          </div>{" "}
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_completed_ticket"}
              label={"Validation Completed Ticket"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_eta"}
              label={"Validation ETA"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_reported_tickets"}
              label={"Validation Reported Tickets"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_reported_tickets_storypoints"}
              label={"Validation Reported Tickets Storypoints"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_next_working_day_story_points"}
              label={"Validation Next Working Day story points"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_pending_activities"}
              label={"Validation Pending Activities"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"show_executed_test_case_count"}
              label={"Show Executed Test Case Count"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"show_reported_tickets_count"}
              label={"Show Reported Tickets Count"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_pending_review_tickets"}
              label={"Validate Pending Review Tickets"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <SubTitle label={"Validation Hours"} />
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_productive_hours"}
              label={"Validation Productive Hours"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validate_working_hours"}
              label={"Validation Working Hours"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_productivity_cost"}
              label={"Validation Productivity Cost"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"show_hour_selection"}
              label={"Show Hour Seletion"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <SubTitle label="Validation Explanation" />
          <div className="field-wrapper">
            <SingleCheckbox
              name={"need_explanation"}
              label={"Need Explanation"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"show_notes"}
              label={"Show Notes"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_need_explanation_activity"}
              label={"Validation Need Explanation Activity"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <SubTitle label="Task Validation" />
          <div className="field-wrapper">
            <SingleCheckbox
              name={"is_code_commit_required"}
              label={"Is Code Commit Required"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <SubTitle label="Others" />
          <div className="field-wrapper">
            <SingleCheckbox
              name={"allow_date_selection"}
              label={"Allow Date Selection"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"is_ticket_required"}
              label={"Is Ticket Required"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"notify_user"}
              label={"Notify User"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"show_in_user_status"}
              label={"Show In User Status"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"is_ticket_activity"}
              label={"Is Ticket Activity"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"requiredactivity"}
              label={" Required Activity"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
          <div className="field-wrapper">
            <SingleCheckbox
              name={"validation_required_activity"}
              label={" Validate Required Activity"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ActivityTypeForm;
