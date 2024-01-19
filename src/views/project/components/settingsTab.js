import React, { useEffect, useState } from "react";
import Form from "../../../components/Form";
import MultiSelect from "../../../components/Multiselect";
import SaveButton from "../../../components/SaveButton";

import Number from "../../../components/Number";
import UserSelect from "../../../components/UserSelect";
import {
  MINIMUM_TEST_CASE_COUNT,
  PROJECT_SETTING_ALLOWED_ROLES_FOR_ASSIGNEE_CHANGE,
  PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE,
  PROJECT_SETTING_ALLOWED_USER
} from "../../../helpers/ProjectSetting";
import { getKeyValueByObject } from "../../../lib/Helper";
import number from "../../../lib/Number";
import ProjectSettingService from "../../../services/ProjectSettingService";
import UserRoleService from "../../../services/UserRoleService";



const SettingsTab = (props) => {
  const [userRoleList, setUserRole] = useState([]);
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState()
  const [defaultReviewer, setDefaultReviewer] = useState();
  const [allowAssigneeChange, setAllowAssigneeChange] = useState()
  const [storyPointRoleData, setStoryPointRoleData] = useState([]);
  const [testCaseCount, setTestCaseCount] = useState(null)
  const [assigneeChange, setAssigneeChange] = useState([])
  useEffect(() => {
    getUserRoleList(PROJECT_SETTING_ALLOWED_USER);
    getTicketTypeSettingDetail();
  }, []);

  const getUserRoleList = async () => {
    const roleData = await UserRoleService.list();
    setUserRole(roleData);
  };

  const getTicketTypeSettingDetail = async () => {
    let projectId = props.projectId;


    const data = await ProjectSettingService.getProjectSettingData(projectId);
    const allowForAssigneechange = data && getKeyValueByObject(data, PROJECT_SETTING_ALLOWED_ROLES_FOR_ASSIGNEE_CHANGE)
    const defaultreviewer = data && getKeyValueByObject(data, "default_reviewer")
    let etaRoleValue = data && getKeyValueByObject(data, PROJECT_SETTING_ALLOWED_USER);
    let storyPointRoleValue = data && getKeyValueByObject(data, PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE);
    let testCaseCount = data && getKeyValueByObject(data, MINIMUM_TEST_CASE_COUNT);
    setData((prevData) => [...prevData, etaRoleValue]);
    setStoryPointRoleData((prevData) => [...prevData, storyPointRoleValue]);
    setTestCaseCount(testCaseCount)
    setDefaultReviewer(defaultreviewer);

    setAssigneeChange((prevData) => [...prevData, allowForAssigneechange])
  };

  const handleUserEmployment = async (values) => {

    const data = new FormData();
    let etaRoleArray = [];
    const storyPointRoleArray = []
    let assigneeRoleArray = []
    for (let i = 0; i < values.project_setting_allowed_user.length; i++) {
      etaRoleArray.push(values.project_setting_allowed_user[i].value);
    }

    for (let i = 0; i < values?.project_setting_allowed_roles_for_assignee_change.length; i++) {
      assigneeRoleArray.push(values.project_setting_allowed_roles_for_assignee_change
      [i].value);
    }
    for (let i = 0; i < values.PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE.length; i++) {
      storyPointRoleArray.push(values.PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE[i].value);
    }

    data.append(PROJECT_SETTING_ALLOWED_USER, etaRoleArray.join(","));
    data.append(PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE, storyPointRoleArray.join(","));
    data.append(MINIMUM_TEST_CASE_COUNT, values && values?.minimum_test_cases_count);
    data.append(PROJECT_SETTING_ALLOWED_ROLES_FOR_ASSIGNEE_CHANGE, assigneeRoleArray.join(","))
    data.append("default_reviewer", values?.default_reviewer?.id);
    let projectId = props.projectId;

    ProjectSettingService.create(data, projectId);
    props?.setEditable(true)
  };

  const getRoleList = (data) => {
    let dataValue = data.length > 0 ? data[0].split(",") : [];

    const numericValuesToFilter = dataValue.map((value) => {
      return parseInt(value, 10);
    });

    const filteredData = userRoleList.filter((item) =>
      numericValuesToFilter.includes(item.value)
    );

    const userRoleArray = filteredData.map((item) => ({
      label: item.label,
      value: item.value,
    }))
    return userRoleArray && userRoleArray
  }

  let allowedEtaUserRoleList = getRoleList(data);
  let allowedStoryPointUserRoleList = getRoleList(storyPointRoleData);
  let assigneeUserRoleList = getRoleList(assigneeChange)
  return (
    <Form
      enableReinitialize={true}
      initialValues={{
        project_setting_allowed_user: allowedEtaUserRoleList,
        PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE: allowedStoryPointUserRoleList,
        default_reviewer: userList ? userList.find((data) => data.id === number.Get(defaultReviewer)) : "",
        minimum_test_cases_count: testCaseCount,
        project_setting_allowed_roles_for_assignee_change: assigneeUserRoleList

      }}
      onSubmit={(values) => {
        handleUserEmployment(values);
      }}
    >
      <div className="card bg-white mb-3">
        <div className="card-body">
          <div>
            <MultiSelect
              label="Allowed Roles For ETA Change"
              name={PROJECT_SETTING_ALLOWED_USER}
              options={userRoleList}
              isDisabled={props?.editable}
            />
          </div>
          <div>
            <UserSelect
              label="Default Reviewer"
              name="default_reviewer"
              userList={setUserList}
              selectedUserId={defaultReviewer && (defaultReviewer)}
              isDisabled={props?.editable}
            />
          </div>
          <MultiSelect
            label="Allowed Roles For Story Point Change"
            name={PROJECT_SETTING_ALLOWED_ROLES_FOR_STORY_POINT_CHANGE}
            options={userRoleList}
            isDisabled={props?.editable}
          />
          <Number
            name={MINIMUM_TEST_CASE_COUNT}
            label="Minimum test cases count"
            disabled={props?.editable}
          />
          <MultiSelect
            label="Allowed Roles For Assignee Change"
            name={PROJECT_SETTING_ALLOWED_ROLES_FOR_ASSIGNEE_CHANGE}
            options={userRoleList}
            isDisabled={props?.editable}
          />
          <div className="mb-4">
            {!props?.editable && <div>
              <SaveButton />
            </div>}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SettingsTab;