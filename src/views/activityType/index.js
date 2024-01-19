import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import DeleteModal from "../../components/DeleteModal";
import Link from "../../components/Link";
import SaveButton from "../../components/SaveButton";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ActivityTypeForm from "./components/activityTypeForm";
import Drawer from "../../components/Drawer";
import ActivityTypeDetail from "./activityTypeDetail";

//Config
import { endpoints } from "../../api/endPoints";

// Services
import ActivityTypeService from "../../services/ActivityTypeService";
import RoleService from "../../services/RoleService";
import CompanyUserService from "../../services/UserService";
import StatusService from "../../services/StatusService";

// Helpers
import ActivityTypeGroup from "../../helpers/ActivityTypeGroup";
import ObjectName from "../../helpers/ObjectName";

// Action
import { fetchList } from "../../actions/table";
import Url from "../../lib/Url";

const ActivityType = (props) => {
  const { history, activeTab, match } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [rowValue, setRowValue] = useState("");
  const selectedId = match && match.params && match.params.id;
  const [userList, setUserList] = useState()
  const [list, setList] = useState([])
  const [roles, setRoles] = useState()
  const [row, setRow] = useState();
  const [isDeleteModel, setIsDeleteModel] = useState(false)
  const [isSubmit, setIsSubmit] = useState(true)

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  // Toggling the tabs and modals in respective ta
  useEffect(() => {
    getUserList();
    getStatusList();
    getRoleDetail();
  }, []);

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

  let selectedRoleIds = rowValue?.user_roles || "";

  let selectedRoleArray = selectedRoleIds.split(",");


  const selectedRole = getValue(selectedRoleArray, roles)

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

  const getRoleDetail = async () => {
    const response = await RoleService.getRoleDetail();
    setRoles(response)
  };

  const getUserList = async () => {
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

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
    setCurrentData("");
  };

  /**
   * Create Creation
   *
   * @param data
   */
  const projectCreate = (data) => {
    setIsSubmit(false)
    data.name = data?.name;
    dispatch(
      ActivityTypeService.add(data, {
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
      })
    );
    setIsSubmit(true);
    toggle();
  };

  const updateData = (values) => {
    setIsSubmit(false);

    const id = rowValue?.id

    if (values && values.activityTypeGroup != undefined) {
      values.activityTypeGroup = values.activityTypeGroup ? values.activityTypeGroup.value : ""
    }

    ActivityTypeService.update(id, values, (res) => {
      if (res) {
        dispatch(
          fetchList(
            "activityType",
            `${endpoints().activityTypeApi}/search`,
            1,
            25,
            {}
          )
        );
        toggle();
      }
    })
    setIsSubmit(true)

  }

  const addActivityTypeForm = (
    <>
      <ActivityTypeForm />
    </>
  );

  const projectFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label={rowValue?.id ? "Save" : "Add"} />
  );

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

  const activitydelete = (id) => {
    dispatch(ActivityTypeService.delete(id))
  }

  return (
    <>
      {!selectedId ? (
        <>
          <>
            <DeleteModal
              isOpen={isDeleteModel}
              toggle={() => {
                setIsDeleteModel(false);
              }}
              title="Delete Activity"
              id={row?.id}
              label={row?.name}
              deleteFunction={async () => activitydelete(row?.id)}
            />
            <Drawer
              modelTitle={
                rowValue?.id
                  ? "Edit Activity" :
                  "Add Activity"
              }
              DrawerBody={addActivityTypeForm}
              DrawerFooter={projectFooter}
              onSubmit={(values) => {
                if (rowValue?.id) {
                  updateData(values);
                }
                else {
                  projectCreate(values);
                }
              }}
              initialValues={{
                ...selectedRole,
                name: rowValue?.name,
                type: rowValue?.type,
                question: rowValue?.question,
                sort: rowValue?.sort,
                is_screenshot_required: rowValue?.is_screenshot_required,
                is_ticket_required: rowValue?.is_ticket_required,
                max_hours: maxHourOptions.find((option) =>
                  option.key == rowValue?.max_hours ? option.label : null),
                max_entries_per_day: rowValue?.max_entries_per_day,
                auto_add: rowValue?.auto_add,
                show_executed_test_case_count: rowValue?.show_executed_test_case_count,
                show_reported_tickets_count: rowValue?.show_reported_tickets_count,
                approvers: userList && userList.find((option) =>
                  option.label === rowValue?.approvers ? option.label : ""
                ),
                show_hour_selection: rowValue?.show_hour_selection,
                update_logout: rowValue?.update_logout,
                update_login: rowValue?.update_login,
                validation_pending_activities: rowValue?.validate_pending_activities,
                requiredactivity: rowValue?.required,
                user_ids: rowValue?.user_ids,
                validate_working_hours: rowValue?.validate_working_hours,
                validation_productive_hours: rowValue?.validate_productive_hours,
                need_explanation: rowValue?.need_explanation,
                ticket_types: rowValue?.ticket_types,
                allow_manual_entry: rowValue?.allow_manual_entry,
                validation_eta: rowValue?.validate_eta,
                validation_productivity_cost: rowValue?.validate_productivity_cost,
                validation_reported_tickets: rowValue?.validate_reported_tickets,
                validation_completed_ticket: rowValue?.validate_completed_tickets,
                default_status: list && list.find((option) =>
                  option.value === rowValue?.default_status ? option.value : ""
                ),
                model_name: rowValue?.model,
                show_notes: rowValue?.show_notes,
                slack_id: rowValue?.slack_id,
                validation_need_explanation_activity: rowValue?.validate_needexplanation_activities,
                validation_next_working_day_story_points: rowValue?.validate_next_working_day_story_points,
                validation_reported_tickets_storypoints: rowValue?.validate_reported_tickets_story_points,
                is_code_commit_required: rowValue?.is_code_commit_required,
                show_in_user_status: rowValue?.show_in_user_status,
                allow_date_selection: rowValue?.allow_date_selection,
                validation_required_activity: rowValue?.validate_required_activities,
                notify_user: rowValue?.notify_user,
                is_ticket_activity: rowValue?.is_ticket_activity,
                max_entries_per_day: rowValue?.max_entries_per_day,
                validation_pending_review_tickets: rowValue?.validate_pending_review_tickets,
                activityTypeGroup: activityTypeGroup.find((option) =>
                  option.label === rowValue?.activityTypeGroupText
                )
              }}
              handleOpenModal={toggle}
              handleCloseModal={toggle}
              handleDrawerClose={toggle}
              isModalOpen={isOpen}
              enableReinitialize
            />
          </>

          <PageTitle
            label="Activity types"
            buttonHandler={(e) => {
              setRowValue("");
              toggle();
            }}
            buttonLabel="Add New"
            className={"pt-3"}
          />
          <div className="mt-4">
            <ReduxTable
              id="activityType"
              showHeader
              searchPlaceholder="Search"
              apiURL={`${endpoints().activityTypeApi}/search`}
              newTableHeading
              history={props.history}
              paramsToUrl={true}
              sortByOptions={sortByOption}
            >
              <ReduxColumn
                type="link"
                isClickable="true"
                field="name"
                sortBy="name"
                width="140px"
                minWidth="140px"
                maxWidth="140px"
                renderField={(row) => (
                  <Link
                    text={row.name}
                    url={`/setting/ActivityTypes/${row.id}`}
                  />
                )}
              >
                Name
              </ReduxColumn>
              <ReduxColumn isClickable="true" field="type" sortBy="type">
                Type
              </ReduxColumn>
              <ReduxColumn disableOnClick field="activityTypeGroupText">
                Activity Type Group
              </ReduxColumn>
              <ReduxColumn field="sort" sortBy="sort">
                Sort
              </ReduxColumn>
              <ReduxColumn
                field="Action"
                disableOnClick
                width="70px"
                renderField={(row) => (
                  <>
                    <div className="d-flex justify-content-center align-items-center row">
                      <div className="text-dark landing-group-dropdown">
                        <MoreDropdown>
                          <DropdownItem
                            onClick={() => {
                              toggle()
                              setRowValue(row);
                            }}
                          >
                            Quick View
                          </DropdownItem>
                          <DropdownItem
                            className="text-danger cursor-pointer"
                            onClick={() => {
                              setIsDeleteModel(true);
                              setRow(row);
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </MoreDropdown>
                      </div>
                    </div>
                  </>
                )}
              >
                Action
              </ReduxColumn>
            </ReduxTable>
          </div>
        </>
      ) : (
        <div>
          {/* Detail tab */}
          <ActivityTypeDetail
            history={history}
            // data={currentData}
            match={match}
          // activeTab={activeTab}
          />
        </div>
      )}
    </>
  );
};

export default ActivityType;
