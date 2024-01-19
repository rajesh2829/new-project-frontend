import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { bindActionCreators } from "redux";
import { EditorState, convertFromRaw } from "draft-js";

// Actions
import { fetchList } from "../actions/table";

// Components
import ReduxTable, { ReduxColumn } from "../components/reduxTable";
import Spinner from "./Spinner";
import SaveButton from "./SaveButton";
import ProjectUserSelect from "./ProjectUserSelect";
import AddModal from "./Modal";
import StatusText from "./StatusText";
import MoreDropdown from "./authentication/moreDropdown";
import UserCard from "./UserCard";
import DateSelector from "./Date";

// Lib
import ArrayList from "../lib/ArrayList";
import DateTime from "../lib/DateTime";
import Cookies from "../lib/Helper";
import Url from "../lib/Url";

// Services
import StatusService from "../services/StatusService";
import TicketService from "../services/TicketService";
import CompanyUserService from "../services/UserService";

// API
import { endpoints } from "../api/endPoints";

// Helpers
import Cookie from "../helpers/Cookie";
import ObjectName from "../helpers/ObjectName";
import { deleteTicket } from "../actions/ticket";
import DeleteModal from "./DeleteModal";
import { hasPermission } from "../services/UserRolePermissionService";
import Permission from "../helpers/Permission";

const TicketList = (props) => {
  let {
    newTableHeading,
    showDateFilter,
    showSprintFilter,
    showStatusFilter,
    showUserFilter,
    showReporterFilter,
    showProjectFilter,
    history,
    array,
    startDate,
    endDate,
    refreshButton,
    showSearch,
    showStatusGroupFilter,
    isMultiSelect,
    allCurrentPage,
    allCurrentPageSize,
    projectId,
    setRowValue,
    handleOpenModal,
    setName,
    group_id,
    apiUrl,
    recurring_task_id,
  } = props;

  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [trueValue, setTrueValue] = useState(false);
  const [isOpen, setIsOpen] = useState();
  const [row, setRow] = useState();
  const [modalType, setModalType] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  let dispatch = useDispatch();

  useEffect(() => {
    getUserList();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (type, row) => {
    setModalType(type); // Set the modal type here
    setRow(row);
    toggle();
  };

  useEffect(() => {
    if (trueValue == true) {
      getStatusList();
    }
  }, [trueValue]);

  let showTicketDelete = hasPermission(Permission.TICKET_DELETE);

  const enable_reporter =
    array && ArrayList.getKeyByValue(array, "Reporter") ? true : false;
  const enable_project =
    array && ArrayList.getKeyByValue(array, "Project") ? true : false;
  const enable_sprint =
    array && ArrayList.getKeyByValue(array, "Sprint") ? true : false;
  const enable_createdAt =
    array && ArrayList.getKeyByValue(array, "CreatedAt") ? true : false;

  //   Get Status List
  const getStatusList = async (statusId) => {
    setIsLoading(true);
    const data = await StatusService.nextStatusSearch(
      ObjectName.TICKET,
      statusId,
      Url.GetParam("projectId")
    );
    if (data && data.length > 0) {
      setList(data);
    }
    setIsLoading(false);
  };

  const getUserList = async () => {
    if (Url.GetParam("objectName") == ObjectName.TICKET) {
      if (userList && ArrayList.isEmpty(userList)) {
        let userLists = await CompanyUserService.getOption();
        setUserList(userLists);
      }
    }
  };

  let param = {
    pagination: true,
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
    user: Url.GetParam("user"),
    reporter: Url.GetParam("reporter"),
    sprint: Url.GetParam("sprint"),
    status: Url.GetParam("status"),
    group: Url.GetParam("group"),
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
    search: Url.GetParam("search"),
    recurring_task_id: recurring_task_id,
    projectId: Url.GetParam("projectId") !== undefined
      ? Url.GetParam("projectId")
      : Cookies.get(Cookie.PROJECT_ID)
  }

  const handleStatusChange = async (id, statusId) => {
    dispatch(
      await TicketService.updateStatus(
        id,
        {
          status: statusId,
          allCurrentPage,
          allCurrentPageSize,
          param
        },
        (res) => {
          if (res) {
            setList("");
            getStatusList();
          }
        },
        apiUrl
      )
    );
  };

  const sortByOption = [
    {
      value: "ticket_id:DESC",
      label: "Most Recent"
    },
    {
      value: "name:ASC",
      label: "Name"
    }
  ];

  const handleUserChange = async (value) => {
    let data = {
      assignee: value?.assignee?.id ? value?.assignee?.id :  value?.assignee?.value
    };

    dispatch(
      await TicketService.update(row && row?.id, data, {}, (res) => {
        if (res) {
          dispatch(
            fetchList("ticket", `${endpoints().ticketAPI}/search`, allCurrentPage ? allCurrentPage : 1, allCurrentPageSize ? allCurrentPageSize : 25, {
              ...param

            })
          );
          toggle();
        }
      })
    );
  };

  const handleDeleteTicket = async (id) => {
    dispatch(deleteTicket(id, param));
  };

  const handleDeleteChange = (row) => {
    setRow(row);
    // Open the delete modal
    setDeleteModal(true);
  };

  if (isLoading) {
    <Spinner />;
  }

  const modalBody =
    modalType === "eta" ? (
      <div className="row">
        <div className="col-12">
          <DateSelector
            name="eta"
            label={"ETA"}
            placeholder="Select ETA"
            isClearable
          />
        </div>
      </div>
    ) : (
      <div className="col-12">
        <ProjectUserSelect
          label="Assignee"
          name="assignee"
          placeholder={"Select Assignee"}
          projectId={row?.projectId}
        />
      </div>
    );

  const modalFooter = (
    <>
      <SaveButton type="submit" label="Save" />
    </>
  );

  const handleEtaChange = async (values) => {
    let data = {
      eta: values && values?.eta
    };

    dispatch(
      await TicketService.update(row && row?.id, data, {}, (res) => {
        if (res) {
          dispatch(
            fetchList("ticket", `${endpoints().ticketAPI}/search`, allCurrentPage ? allCurrentPage : 1, allCurrentPageSize ? allCurrentPageSize : 25, {
              ...param
            })
          );
          toggle();
        }
      })
    );
  };

  let params = {
    startDate: startDate ? startDate : "",
    endDate: endDate ? endDate : "",
    objectName: ObjectName.TICKET,
    group: group_id ? group_id : Url.GetParam("group"),
  };

  if (projectId) {
    params.projectId = projectId;
  }

  if (recurring_task_id) {
    params.recurring_task_id = recurring_task_id;
  }

  return (
    <>
      <AddModal
        modalTitle={modalType === "eta" ? "Change ETA" : "Change Assignee"}
        modalBody={modalBody}
        isOpen={isOpen}
        showOverFlow={false}
        initialValues={
          modalType === "eta"
            ? {
              eta: DateTime.getDateTimeByUserProfileTimezone(row?.eta) || ""
            }
            : {
              assignee: row?.assignee_id
                ? {
                  label: row?.assignee_name,
                  value: row?.assignee_id
                }
                : ""
            }
        }
        toggle={toggle}
        modalFooter={modalFooter}
        toggleModalClose={toggle}
        hideDefaultButtons
        onSubmit={(values) => {
          if (modalType === "eta") {
            handleEtaChange(values);
          } else {
            handleUserChange(values);
          }
        }}
      />

      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Ticket"
        id={row?.id}
        label={row?.ticket_number}
        deleteFunction={handleDeleteTicket}
      />

      <div className="mt-4">
        <ReduxTable
          newTableHeading={newTableHeading}
          showSearch={showSearch}
          searchPlaceholder="Search"
          id="ticket"
          apiURL={apiUrl ? apiUrl : `${endpoints().ticketAPI}/search`}
          paramsToUrl={true}
          showStatusFilter={showStatusFilter}
          sortByOptions={sortByOption}
          showUserFilter={showUserFilter}
          showReporterFilter={showReporterFilter}
          showSprintFilter={showSprintFilter}
          refreshButton={refreshButton}
          showDateFilter={showDateFilter}
          isMultiSelect={isMultiSelect}
          showStatusGroupFilter={showStatusGroupFilter}
          showProjectFilter={showProjectFilter}
          assigneePlaceholder="Select Assignee"
          projectId={projectId}
          history={history}
          params={params}
          message="You can start by clicking on Add New"
          icon={<FontAwesomeIcon icon={faTasks} />}>
          <ReduxColumn
            className="text-center text-decoration-none"
            field="id"
            sortBy="id"
            isClickable="true"
            type="link"
            renderField={(row) => (
              <Link to={`/ticket/${row.slug}/${row.ticket_number}`}>
                {row.ticket_number}
              </Link>
            )}>
            Ticket#
          </ReduxColumn>
          <ReduxColumn
            className="text-wrap text-decoration-none text-truncate text-break"
            field="summary"
            sortBy="summary"
            isClickable="true"
            width="250px"
            minWidth="250px"
            maxWidth="250px">
            Summary
          </ReduxColumn>
          <ReduxColumn
            className="text-center display-flex"
            field="assignee_name"
            sortBy="name"
            width="150px"
            minWidth="250px"
            maxWidth="250px"
            renderField={(row) => (
              <UserCard
                customSize={parseInt(40, 10)}
                firstName={row?.firstName}
                url={row?.avatarUrl}
                lastName={row?.lastName}
              />
            )}>
            Assignee
          </ReduxColumn>
          <ReduxColumn field="ticketType" sortBy="ticketType">
            Type
          </ReduxColumn>
          <ReduxColumn
            field="statusName"
            sortBy="status"
            width="150px"
            className="text-center"
            renderField={(row) => (
              <StatusText
                backgroundColor={row.statusColor}
                status={row.statusName}
              />
            )}>
            Status
          </ReduxColumn>
          <ReduxColumn
            field="eta"
            sortBy="eta"
            width="100px"
            className="text-center"
            renderField={(row) => (
              <span>
                {DateTime.getDateByUserProfileTimeZoneFrontEndFormat(row.eta)}
              </span>
            )}>
            ETA
          </ReduxColumn>
          {enable_reporter && enable_reporter == true && (
            <ReduxColumn
              className="text-left"
              minWidth="130px"
              field="reporter"
              sortBy="reporter">
              Reporter
            </ReduxColumn>
          )}

          {enable_project && enable_project == true && (
            <ReduxColumn
              className="text-left"
              minWidth="130px"
              field="project"
              sortBy="project">
              Project
            </ReduxColumn>
          )}
          {enable_sprint && enable_sprint == true && (
            <ReduxColumn
              className="text-left"
              minWidth="130px"
              field="sprint"
              sortBy="sprint">
              Sprint
            </ReduxColumn>
          )}

          {enable_createdAt && enable_createdAt == true && (
            <ReduxColumn
              field="createdAt"
              sortBy="createdAt"
              className="text-center"
              width="150px"
              renderField={(row) => (
                <span>
                  {DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}
                </span>
              )}>
              Created At
            </ReduxColumn>
          )}
          <ReduxColumn
            field="story_points"
            sortBy="story_points"
            className="text-center"
            width="150px">
            Story Points
          </ReduxColumn>
          <ReduxColumn
            field="Action"
            width="90px"
            disableOnClick
            renderField={(row) => (
              <div className="text-center action-group-dropdown">
                <MoreDropdown
                  onClick={(e) => {
                    getStatusList(row && row?.statusId);
                    setTrueValue(true);
                  }}>
                  <DropdownItem
                    onClick={() => {
                      setRowValue(row);
                      props.setEtaPermission &&
                        props.setEtaPermission(row.etaPermission);
                      handleOpenModal();
                      try {
                        setName(
                          row.descriptionData &&
                          EditorState.createWithContent(
                            convertFromRaw(JSON.parse(row.descriptionData))
                          )
                        );
                      } catch (error) {
                        console.error("Error parsing JSON data:", error);
                      }
                    }}>
                    Quick View
                  </DropdownItem>
                  {list &&
                    list.map((value) => (
                      <DropdownItem
                        onClick={async () => {
                          handleStatusChange(row?.id, value && value?.value);
                        }}>
                        {value?.label}
                      </DropdownItem>
                    ))}
                  {row.etaPermission && (
                    <DropdownItem
                      onClick={async () => {
                        openModal("eta", row);
                      }}>
                      Change ETA
                    </DropdownItem>
                  )}

                  {row.allow_for_assignee_change_permission && (
                    <DropdownItem
                      onClick={async () => {
                        openModal("assignee", row);
                      }}>
                      Change Assignee
                    </DropdownItem>
                  )}
                  {showTicketDelete ? (
                    <DropdownItem
                      onClick={() => {
                        handleDeleteChange(row);
                      }}
                      className="text-danger"
                    >
                      Delete
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </MoreDropdown>
              </div>
            )}
          >
            Actions
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;
  const CurrentPage =
    reduxTable["ticket"] && !reduxTable["ticket"].isFetching
      ? reduxTable["ticket"].currentPage
      : 1;

  const CurrentPageSize =
    reduxTable["ticket"] && !reduxTable["ticket"].isFetching
      ? reduxTable["ticket"].pageSize
      : 25;
  const allCurrentPage =
    reduxTable["ticket"] && reduxTable["ticket"].isFetching == false
      ? reduxTable["ticket"].currentPage
      : 1;
  const allCurrentPageSize =
    reduxTable["ticket"] && reduxTable["ticket"].isFetching == false
      ? reduxTable["ticket"].pageSize
      : 25;

  return {
    CurrentPage,
    CurrentPageSize,
    allCurrentPage,
    allCurrentPageSize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
