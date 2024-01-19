import classnames from "classnames";
import { EditorState, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { endpoints } from "../../../api/endPoints";
import { apiClient } from "../../../apiClient";
import ActivityList from "../../../components/ActivityList";
import AddButton from "../../../components/AddButton";
import DateSelector from "../../../components/Date";
import DraftEditor from "../../../components/Draft";
import DropdownField from "../../../components/DropdownField";
import EditableField from "../../../components/EditableField";
import Form from "../../../components/Form";
import OutsideAlerter from "../../../components/OutSideClickAlerter";
import Spinner from "../../../components/Spinner";
import Toast from "../../../components/Toast";
import ObjectName from "../../../helpers/ObjectName";
import DateTime from "../../../lib/DateTime";
import { isBadRequest } from "../../../lib/Http";
import ProjectService from "../../../services/ProjectService";
import ProjectTicketTypeService from "../../../services/ProjectTicketTypeService";
import SprintService from "../../../services/SprintService";
import StatusService from "../../../services/StatusService";

import MediaCarousel from "../../../components/MediaCarousel";
import { Local } from "../../../helpers/LocalStorage";
import Permission from "../../../helpers/Permission";
import TagService from "../../../services/TagService";
import { hasPermission } from "../../../services/UserRolePermissionService";
import Comment from "../../../components/comment";
import TicketTestTable from "./TicketTestTable";
import StoryPointSelect from "../../../components/StoryPointSelect";
import { Link } from "react-router-dom";
import AddModal from "../../../components/Modal";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import TicketService from "../../../services/TicketService";
import { useDispatch } from "react-redux";
import UserSelect from "../../../components/UserSelect";
import UserCard from "../../../components/UserCard";
import TextArea from "../../../components/TextArea";

// Constants
const Tab = {
  ATTACHMENTS: "Attachments",
  COMMENTS: "Comments",
  HISTORY: "History",
  TEST_CASE: "Tests",
};

const TicketDetailsForm = (props) => {
  const { details, edit, ticketId, editorStates, setEditorState, setLoading } = props;
  const [projectList, setProjectList] = useState();
  const [activeTab, setActiveTab] = useState(Tab.COMMENTS);
  const [statusOption, setStatusOption] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [status, setImageStatus] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();
  const [sprintList, setSprintlist] = useState();
  const [ticketType, setTicketType] = useState([]);
  const [severityList, setSeverityList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [rowValue, setRowValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const [isEtaModelOpen, setIsEtaModelOpen] = useState(false);


  let showHistory = hasPermission(Permission.TICKET_HISTORY_VIEW);

  useEffect(() => {
    getStatus();
    getSprintlist();
    getTicketType();
    getSeverityList();
    getPriorityList();
    getProjectdetails();
  }, [details]);

  const Toggle = () => {
    setIsOpen(!isOpen);
    setRowValue("");
    setSelectedImage();
    setIsSubmit(true);
  };

  let dispatch = useDispatch();

  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <UserCard
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
      </div>
    );
  }

  const getStatus = async () => {
    const statusList = await StatusService.nextStatusSearch(
      ObjectName.TICKET,
      details.status
    );
    setStatusOption(statusList);
  };

  const getSprintlist = async () => {
    const response = await SprintService.search();
    let data = response && response?.data && response?.data?.data;
    let list = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "Active") {
        list.push({
          label: data[i].name,
          value: data[i].id,
        });
      }
    }
    setSprintlist(list);
    const arrayAsString = JSON.stringify(list);
    localStorage.setItem(Local.SPRINT_LIST, arrayAsString);
  };

  const getTicketType = async () => {
    let param = {
      projectId: details && details?.project,
    };
    let response = await ProjectTicketTypeService.search(param);
    let data = response && response?.data && response?.data?.data;
    let list = [];
    for (let i = 0; i < data.length; i++) {
      const { id, name } = data[i];
      list.push({
        label: name,
        value: id,
      });
    }
    setTicketType(list);
    const arrayAsString = JSON.stringify(list);
    localStorage.setItem(Local.TICKET_TYPE_LIST, arrayAsString);
  };

  const getSeverityList = async () => {
    let param = {
      type: "Severity",
    };
    const response = await TagService.search(param);
    let data = response && response?.data && response?.data?.data;
    let list = [];
    for (let i = 0; i < data.length; i++) {
      const { id, name } = data[i];
      list.push({
        label: name,
        value: id,
      });
    }
    setSeverityList(list);
    const arrayAsString = JSON.stringify(list);
    localStorage.setItem(Local.SEVERITY_LIST, arrayAsString);
  };

  const getPriorityList = async () => {
    let param = {
      type: "Priority",
    };
    const response = await TagService.search(param);
    let data = response && response?.data && response?.data?.data;
    let list = [];
    for (let i = 0; i < data.length; i++) {
      const { id, name } = data[i];
      list.push({
        label: name,
        value: id,
      });
    }
    setPriorityList(list);
    const arrayAsString = JSON.stringify(list);
    localStorage.setItem(Local.PRIORITY_LIST, arrayAsString);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Update Ticket
  const updateTicket = async (id, data) => {
    await apiClient
      .put(`${endpoints().ticketAPI}/${id}`, data)
      .then((response) => {
        if (response.data) {
          setLoading(true);
          Toast.success(response.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleDescriptionUpdate = () => {
    let rawComment;
    if (editorStates) {
      rawComment = convertToRaw(editorStates.getCurrentContent());
    }
    let data = {
      id: ticketId,
    };
    data.description = JSON.stringify(rawComment);
    updateTicket(ticketId, data);
  };

  const handleAssigeeChange = async (values, fieldName) => {
    let data = {
      id: ticketId,
      assignee: values && values.id,
    };
    updateTicket(ticketId, data);
  };

  const handleSprintChange = async (values, fieldName) => {
    let data = {
      id: ticketId,
      sprint: values && values.label,
    };
    updateTicket(ticketId, data);
  };

  const handleEtaField = (values) => {
    let data = {};
    if (values) {
      data.eta = values;
    } else {
      const [date, time] = details?.eta.split("T");
      data.eta = date;
    }
    (data.id = ticketId), updateTicket(ticketId, data);
  };

  const handleDelivery_dateField = (values) => {
    let data = {};
    if (values) {
      data.delivery_date = values;
    } else {
      const [date, time] = details?.delivery_date.split("T");
      data.delivery_date = date;
    }

    (data.id = ticketId), updateTicket(ticketId, data);
  };

  const handleProjectChange = async (values, fieldName) => {
    let data = {
      id: ticketId,
      project: values && values.value,
    };
    updateTicket(ticketId, data);
  };

  // Handle Save for Text Input Fields
  const handleSummaryChange = async (values) => {
    let data = {
      summary: values.name,
      id: ticketId,
    };
    updateTicket(ticketId, data);
  };

  const getProjectdetails = async () => {
    const response = await ProjectService.getProjectList();
    const arrayAsString = JSON.stringify(response);
    localStorage.setItem(Local.PROJECT_LIST, arrayAsString);
    setProjectList(response);
  };

  const handleAcceptanceCriteriaChange = (value) => {
    let data = {
      id: ticketId,
      acceptance_criteria: value && value?.name,
    };
    updateTicket(ticketId, data);
  };

  const handleEnvironmentChange = (value) => {
    let data = {
      id: ticketId,
      environment: value && value?.name,
    };
    updateTicket(ticketId, data);
  };

  const handleTestStepChange = (value) => {
    let data = {
      id: ticketId,
      test_step: value && value?.name,
    };
    updateTicket(ticketId, data);
  };

  const handleActualResultChange = (value) => {
    let data = {
      id: ticketId,
      actual_results: value && value?.name,
    };
    updateTicket(ticketId, data);
  };

  const handleExpectedResultChange = (value) => {
    let data = {
      id: ticketId,
      expected_results: value && value?.name,
    };
    updateTicket(ticketId, data);
  };

  const handleTypeChange = (values) => {
    let value = values && values?.values?.type_id?.value;
    let data = {
      id: ticketId,
      type_id: value,
    };
    updateTicket(ticketId, data);
  };

  const handleSeverityChange = (values) => {
    let value = values && values?.values?.severity_id?.value;
    let data = {
      id: ticketId,
      severity_id: value,
    };
    updateTicket(ticketId, data);
  };

  const handlePriorityChange = (values) => {
    let value = values && values?.values?.priority?.value;
    let data = {
      id: ticketId,
      priority: value,
    };
    updateTicket(ticketId, data);
  };

  const handleStoryPointChange = (values) => {
    let value = values && values?.values?.story_points?.value ? values?.values?.story_points?.value : "";
    let data = {
      id: ticketId,
      story_points: value,
    };
    updateTicket(ticketId, data);
  };

  const handleReviewerChange = (values) => {
    let value = values && values?.id;
    let data = {
      id: ticketId,
      reviewer: value,
    };
    updateTicket(ticketId, data);
  };

  const imagetoggle = (id) => {
    if (id) {
      setModalOpen(!modalOpen);
    } else {
      setModalOpen(!modalOpen);
      setCurrentData("");
      setImageStatus("");
      setSelectedFile("");
      setErrorMessage("");
      setSelectedFile("");
      setFile("");
    }
  };

  const openEtaToggle = () => {
    setIsEtaModelOpen(!isEtaModelOpen)
  }

  let etaBody = (
    <>
      <UserSelect name="reviewer" label="Reviewer" selectedUserId={details?.reviewer_id ? details?.reviewer_id : null} required />
      <TextArea
        name="reason"
        label="Reason"
        placeholder="Enter Reason"
        required
      />
    </>
  );

  let etaFooter = (
    <Button type="submit" label={"Submit"} />
  );

  const handleEtaRequest = async (values) => {
    let data = new FormData();
    data.append("id", ticketId);
    data.append("objectName", ObjectName.TICKET);
    data.append("message", values && values?.reason);
    data.append("reviewer", values && values?.reviewer ? values?.reviewer?.id : "");
    dispatch(await TicketService.sendEta(data, (res) => {
      if (res) {
        openEtaToggle()
      }
    }))
  }

  const initialValues = {
    summary: details?.summary ? details?.summary : "",
    sprint: details?.sprint ? details?.sprint : "",
    status:
      statusOption &&
      details &&
      statusOption.find((data) => data.value == details.status),
    eta: DateTime.getDateTimeByUserProfileTimezone(details?.eta),
    etaTime: DateTime.getDateTimeByUserProfileTimezone(details?.etaTime),
    delivery_date: DateTime.getDateTimeByUserProfileTimezone(details?.delivery_date),
    delivery_dateTime: DateTime.getDateTimeByUserProfileTimezone(details?.delivery_date),
    description: editorStates ? editorStates : "",
    story_points: details?.story_points ? {
      label: details?.story_points,
      value: details?.story_points
    } : ""
  };

  let ticketValue = ticketType.find((data) => data?.value == details?.type_id);

  let severityValue = severityList.find(
    (data) => data?.value == details?.severity_id
  );

  let priorityValue = priorityList.find(
    (data) => data?.value == details?.priority
  );

  return (
    <>
      <AddModal
        toggle={openEtaToggle}
        toggleModalClose={openEtaToggle}
        isOpen={isEtaModelOpen}
        modalTitle="ETA Change Request"
        modalBody={etaBody}
        modalFooter={etaFooter}
        hideDefaultButtons
        onSubmit={handleEtaRequest}
        initialValues={{
          reason: "",
          reviewer: details?.reviewer_id ? {
            label: getUserName(details?.reviewer_url, details?.reviewer, null),
            id: details?.reviewer_id,
          } : ""
        }}
        enableReinitialize
      />
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          let id = props.details.assignee_id;
          updateTicket(id, values);
        }}
      >
        <div className="field-wrapper mt-3">
          <div className="form-wrapper">
            <OutsideAlerter>
              <EditableField
                name={details?.summary}
                EditHandler={(e) => {
                  handleSummaryChange(e, details?.summary, "summary");
                }}
              />
            </OutsideAlerter>
            <div className="row mb-5">
              <div className="col-sm-6">
                <div className="text-center landing-group-dropdown"></div>
              </div>
              <div className="col-sm-6 "></div>
            </div>
            <div className="row">
              <div className="col-sm-8 mb-3">
                <hr />
                <OutsideAlerter>
                  <DropdownField
                    isDropdown
                    singleSelect
                    showEditButton
                    titleClassName="text-primary"
                    fieldTitle="Project:"
                    field="project"
                    options={projectList}
                    fieldName={details?.projectName}
                    onInputChange={(e) => {
                      handleProjectChange(
                        e && e.values && e.values.project,
                        details?.project,
                        "project"
                      );
                    }}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    titleClassName="text-primary"
                    isDropdown
                    singleSelect
                    showEditButton
                    fieldTitle="Type:"
                    field="type_id"
                    options={ticketType}
                    fieldName={ticketValue?.label}
                    onInputChange={(e) => handleTypeChange(e)}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isDropdown
                    singleSelect
                    showEditButton
                    titleClassName="text-primary"
                    fieldTitle="Severity:"
                    field="severity_id"
                    options={severityList}
                    fieldName={severityValue?.label}
                    onInputChange={(e) => handleSeverityChange(e)}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isDropdown
                    showEditButton
                    singleSelect
                    titleClassName="text-primary"
                    fieldTitle="Priority:"
                    field="priority"
                    options={priorityList}
                    fieldName={priorityValue?.label}
                    onInputChange={(e) => handlePriorityChange(e)}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isDropdown
                    showEditButton
                    singleSelect
                    fieldTitle="Sprint:"
                    field="sprint"
                    titleClassName="text-primary"
                    options={sprintList}
                    fieldName={details?.sprint}
                    onInputChange={(e) => {
                      handleSprintChange(
                        e && e.values && e.values.sprint,
                        details?.sprint,
                        "sprint"
                      );
                    }}
                  />
                </OutsideAlerter>

                <div className="row">
                  <div className="col-lg-12">
                    <OutsideAlerter>
                      <DraftEditor
                        showEditButton
                        label={"Description:"}
                        name="description"
                        editorState={editorStates ? editorStates : ""}
                        onChange={handleEditorChange}
                        onBlur={() => handleDescriptionUpdate()}
                        height={"30vh"}
                        overflowY={"auto"}
                      />
                    </OutsideAlerter>
                  </div>
                  <div className="col-lg-6"></div>
                  <div className="pl-3 col-lg-12"></div>
                </div>
                <div className="p-0 col-12 col-sm-7 col-lg-6 col-xl-7">
                  <MediaCarousel
                    showRemoveTop
                    Attachments={"Attachments"}
                    objectId={props.ticketId}
                    objectName={ObjectName.TICKET}
                    attachmentsList
                    showFeature={false}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    selectedFile={selectedFile}
                    setSelectedFile={selectedFile}
                    file={file}
                    currentData={currentData}
                    setCurrentData={setCurrentData}
                    status={status}
                    setImageStatus={setImageStatus}
                    setFile={setFile}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    toggle={imagetoggle}
                    showCarasoul
                  />
                </div>
                <OutsideAlerter>
                  <DropdownField
                    isTextField
                    fieldTitle="Acceptance Criteria:"
                    textFieldName="acceptance_criteria"
                    titleClassName="text-primary"
                    className="null"
                    editableFieldName={details?.acceptance_criteria}
                    EditHandler={handleAcceptanceCriteriaChange}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isTextField
                    fieldTitle="Environment:"
                    textFieldName="environment"
                    titleClassName="text-primary"
                    className="null"
                    editableFieldName={details?.environment}
                    EditHandler={handleEnvironmentChange}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isTextField
                    fieldTitle="Test Step:"
                    textFieldName="test_step"
                    titleClassName="text-primary"
                    className="null"
                    editableFieldName={details?.test_step}
                    EditHandler={handleTestStepChange}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isTextField
                    fieldTitle="Actual Result:"
                    textFieldName="actual_results"
                    titleClassName="text-primary"
                    className="null"
                    editableFieldName={details?.actual_results}
                    EditHandler={handleActualResultChange}
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isTextField
                    fieldTitle="Expected Result:"
                    textFieldName="expected_results"
                    titleClassName="text-primary"
                    className="null"
                    editableFieldName={details?.expected_results}
                    EditHandler={handleExpectedResultChange}
                  />
                </OutsideAlerter>
              </div>
              <div className="col-sm-4">
                <hr />
                <h6 className="text-primary">People:</h6>
                <>
                  <OutsideAlerter>
                    <DropdownField
                      isDropdown
                      userField
                      userSelect
                      disabled
                      fieldTitle="Reporter:"
                      field="reporter"
                      fieldName={details?.reporter}
                      avatarUrl={details?.reporter_url}
                    />
                  </OutsideAlerter>
                </>

                <>
                  <OutsideAlerter>
                    <DropdownField
                      isDropdown
                      userField
                      userSelect
                      fieldTitle="Assignee:"
                      field="assignee"
                      showAssignToMeOption
                      disabled={
                        details?.allow_for_assignee_change_permission === false
                          ? true
                          : false
                      }
                      handleUserChange={(value) => {
                        handleAssigeeChange(
                          value,
                          details?.assignee,
                          "assigneeId"
                        );
                      }}
                      avatarUrl={details?.assignee_url}
                      fieldName={
                        details?.assignee ? details?.assignee : "Select"
                      }
                      hideAvatar={details?.assignee ? false : true}
                    />
                  </OutsideAlerter>
                  <OutsideAlerter>
                    <DropdownField
                      isDropdown
                      userField
                      userSelect
                      fieldTitle="Reviewer:"
                      field="reviewer"
                      showAssignToMeOption
                      handleUserChange={handleReviewerChange}
                      fieldName={details?.reviewer ? details?.reviewer : "None"}
                      avatarUrl={details?.reviewer_url}
                      hideAvatar={details?.reviewer ? false : true}
                    />
                  </OutsideAlerter>
                </>
                <hr />
                <div className="row">
                  <h6 className="col text-primary d-flex align-items-center">ETA:</h6>
                  <div className="col-6">
                    <DateSelector
                      name="eta"
                      placeholder="Select ETA"
                      disabled={details && details.etaPermission === false ? true : false}
                      onChange={(e) => {
                        handleEtaField(
                          DateTime.getDateByUserProfileTimezone(e),
                          details?.eta,
                          "eta",
                          "currentEta"
                        );
                      }}
                    />
                  </div>
                </div>
                <hr />
                <h6 className="text-primary">Dates:</h6>
                <OutsideAlerter>
                  <DropdownField
                    isDateField
                    disabled
                    fieldName={DateTime.getDateTimeByUserProfileTimezone(
                      details?.createdAt
                    )}
                    fieldTitle="Created:"
                    dateFieldName="created"
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isDateField
                    disabled
                    fieldName={DateTime.getDateTimeByUserProfileTimezone(
                      details?.updatedAt
                    )}
                    fieldTitle="Updated:"
                    dateFieldName="updated"
                  />
                </OutsideAlerter>
                <OutsideAlerter>
                  <DropdownField
                    isDateField
                    disabled
                    fieldName={DateTime.getDateTimeByUserProfileTimezone(
                      details?.completed_at
                    )}
                    fieldTitle="Completed:"
                    dateFieldName="completed"
                  />
                </OutsideAlerter>
                <hr />
                <h6 className="text-primary">Story Points:</h6>
                <OutsideAlerter>
                  <StoryPointSelect
                    name="story_points"
                    onChange={(e) => handleStoryPointChange(e)}
                    value={details?.story_points}
                  />
                </OutsideAlerter>
                <hr />
                <h6 className="text-primary">Delivery Date:</h6>
                <div className="row">
                  <div className="col-6">
                    <DateSelector
                      name="delivery_date"
                      placeholder="Delivery Date"
                      disabled={details && details.UserRolePermission === false ? true : false}
                      onChange={(e) => {
                        handleDelivery_dateField(
                          DateTime.getDateByUserProfileTimezone(e),
                          details?.delivery_date,
                          "delivery_date",
                          "currentDelivery_date"
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      {activeTab == Tab.TEST_CASE && (
        <AddButton
          className="mt-3 pull-right"
          label="Add Test"
          onClick={(e) => {
            Toggle();
          }}
        />
      )}
      <Nav tabs className="admin-tabs">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.COMMENTS,
            })}
            onClick={() => {
              toggle(Tab.COMMENTS);
            }}
          >
            Comments
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.TEST_CASE,
            })}
            onClick={() => {
              toggle(Tab.TEST_CASE);
            }}
          >
            Tests
          </NavLink>
        </NavItem>
        <NavItem>
          {showHistory && (
            <NavLink
              className={classnames({
                active: activeTab === Tab.HISTORY,
              })}
              onClick={() => {
                toggle(Tab.HISTORY);
              }}
            >
              History
            </NavLink>
          )}
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* Detail Tab Start*/}
        {activeTab == Tab.COMMENTS && (
          <TabPane tabId={Tab.COMMENTS} className="w-100">
            <Comment objectId={props.ticketId} objectName={ObjectName.TICKET} assignee_id={details?.assignee_id} reviewer_id={details?.reviewer_id} ticketDetails />
          </TabPane>
        )}
        {/* History Tab Start*/}
        {showHistory && activeTab == Tab.HISTORY && (
          <TabPane tabId={Tab.HISTORY} className="w-100">
            <ActivityList
              id={ticketId}
              objectId={ticketId}
              object_name={ObjectName.TICKET}
              history={props.history}
            />
          </TabPane>
        )}
        {activeTab == Tab.TEST_CASE && (
          <TabPane tabId={Tab.TEST_CASE} className="w-100">
            <TicketTestTable
              history={props.history}
              ticketId={props.ticketId}
              isOpen={isOpen}
              toggle={Toggle}
              setRowValue={setRowValue}
              rowValue={rowValue}
              setSelectedFile={setSelectedImage}
              selectedFile={selectedImage}
              setIsSubmit={setIsSubmit}
              isSubmit={isSubmit}
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default TicketDetailsForm;
