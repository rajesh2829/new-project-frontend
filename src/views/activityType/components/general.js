import React, { useEffect, useState } from "react";
import DeleteModal from "../../../components/DeleteModal";
import Form from "../../../components/Form";
import PageTitle from "../../../components/PageTitle";
import { useDispatch } from "react-redux";
import SaveButton from "../../../components/SaveButton";
import ActivityTypeService from "../../../services/ActivityTypeService";
import RoleService from "../../../services/RoleService";
import StatusService from "../../../services/StatusService";
import ObjectName from "../../../helpers/ObjectName";
import CompanyUserService from "../../../services/UserService";
import BreadCrumb from "../../../components/Breadcrumb";

import ActivityTypeGroup from "../../../helpers/ActivityTypeGroup";
import Action from "../../../components/Action";
import ActivityTypeForm from "./activityTypeForm";

const General = (props) => {

  const [activityTypeData, setActivityTypeData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [roles, setRoles] = useState();
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState();

  useEffect(() => {
    UserList();
    getData(props.match.params.id);
    getRoleDetail();
    getStatusList();
  }, []);

  const activityTypeGroup = [
    {
      label: ActivityTypeGroup.CHECK_IN_TEXT,
      value: ActivityTypeGroup.CHECK_IN
    },
    {
      label: ActivityTypeGroup.CHECK_OUT_TEXT,
      value: ActivityTypeGroup.CHECK_OUT
    }
  ]

  const dispatch = useDispatch()
  const updateData = (values) => {
    const id = props.match.params.id
    if (values && values.activityTypeGroup != undefined) {
      values.activityTypeGroup = values.activityTypeGroup ? values.activityTypeGroup.value : ""
    }
    ActivityTypeService.update(id, values);
  }

  const getData = async (id) => {
    const response = await ActivityTypeService.get(id);
    setActivityTypeData(response);
  }

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
    setRoles(response)
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

  const selectedRole = getValue(selectedRoleArray, roles)

  const getStatusList = async () => {
    const data = await StatusService.search(ObjectName.ACTIVITY, null);
    const value = [];
    data.forEach((statusValue) => {
      value.push({
        value: statusValue.id,
        label: statusValue.name,
        id: statusValue.id,
      });
      setList(value);
    });
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

    setUserList(usersList)
  }

  const handleStatusChange = (status) => {
    const id = props.match.params.id
    const data = new FormData();

    data.append("status", status ? status : "");

    dispatch(
      ActivityTypeService.updateStatus(id, data, {})
    );
  };

  const activitydelete = (id) => {
    dispatch(ActivityTypeService.delete(id))
    props.history.push("/setting/ActivityType")
  }

  const breadcrumbList = [
    { label: "Settings", link: "/setting/ActivityTypes" },
    {
      label: "Activity Types",
      link: "/setting/ActivityTypes",
    },
    {
      label: "General",
      link: "",
    },

  ];

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };

  return (
    <div>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Activity Type"

        label={activityTypeData?.name}
        deleteFunction={() =>
          activitydelete(activityTypeData?.id)
        }
      />
      <div className="card p-3">
        <BreadCrumb list={breadcrumbList} />
        <div className="d-flex justify-content-between">
          <PageTitle label="General" />

          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>
        <div className="field-wrapper mb-0 form-wrapper">
          <Form
            initialValues={{
              ...selectedRole,
              name: activityTypeData?.name,
              type: activityTypeData?.type,
              question: activityTypeData?.question,
              sort: activityTypeData?.sort,
              is_screenshot_required: activityTypeData?.is_screenshot_required,
              is_ticket_required: activityTypeData?.is_ticket_required,
              max_hours: maxHourOptions.find((option) =>
                option.key == activityTypeData?.max_hours ? option.label : null),
              max_entries_per_day: activityTypeData?.max_entries_per_day,
              auto_add: activityTypeData?.auto_add,
              show_executed_test_case_count: activityTypeData?.show_executed_test_case_count,
              show_reported_tickets_count: activityTypeData?.show_reported_tickets_count,
              approvers: userList && userList.find((option) =>
                option.label === activityTypeData?.approvers ? option.label : ""
              ),
              show_hour_selection: activityTypeData?.show_hour_selection,
              update_logout: activityTypeData?.update_logout,
              update_login: activityTypeData?.update_login,
              validation_pending_activities: activityTypeData?.validate_pending_activities,
              requiredactivity: activityTypeData?.required,
              user_ids: activityTypeData?.user_ids,
              validate_working_hours: activityTypeData?.validate_working_hours,
              validation_productive_hours: activityTypeData?.validate_productive_hours,
              need_explanation: activityTypeData?.need_explanation,
              ticket_types: activityTypeData?.ticket_types,
              allow_manual_entry: activityTypeData?.allow_manual_entry,
              validation_eta: activityTypeData?.validate_eta,
              validation_productivity_cost: activityTypeData?.validate_productivity_cost,
              validation_reported_tickets: activityTypeData?.validate_reported_tickets,
              validation_completed_ticket: activityTypeData?.validate_completed_tickets,
              default_status: list && list.find((option) =>
                option.value === activityTypeData?.default_status ? option.value : ""
              ),
              model_name: activityTypeData?.model_name,
              show_notes: activityTypeData?.show_notes,
              slack_id: activityTypeData?.slack_id,
              validation_need_explanation_activity: activityTypeData?.validate_needexplanation_activities,
              validation_next_working_day_story_points: activityTypeData?.validate_next_working_day_story_points,
              validation_reported_tickets_storypoints: activityTypeData?.validate_reported_tickets_story_points,
              is_code_commit_required: activityTypeData?.is_code_commit_required,
              show_in_user_status: activityTypeData?.show_in_user_status,
              allow_date_selection: activityTypeData?.allow_date_selection,
              validation_required_activity: activityTypeData?.validate_required_activities,
              notify_user: activityTypeData?.notify_user,
              is_ticket_activity: activityTypeData?.is_ticket_activity,
              max_entries_per_day: activityTypeData?.max_entries_per_day,
              validation_pending_review_tickets: activityTypeData?.validate_pending_review_tickets,
              activityTypeGroup: activityTypeGroup.find((option) =>
                option.value === activityTypeData?.activityTypeGroup
              )
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              updateData(values);
            }}
          >
            <ActivityTypeForm />
            <SaveButton />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default General;
