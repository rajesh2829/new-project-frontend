import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../components/Breadcrumb";
import DeleteModal from "../../../components/DeleteModal";
import Form from "../../../components/Form";
import Number from "../../../components/Number";
import PageTitle from "../../../components/PageTitle";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import SingleCheckbox from "../../../components/SingleCheckbox";
import Tab from "../../../components/Tab";
import Text from "../../../components/Text";
import UserSelect from "../../../components/UserSelect";
import { Projects } from "../../../helpers/Project";
import ProjectTicketTypeService from "../../../services/ProjectTicketTypeService";
import Spinner from "../../../components/Spinner";
import Url from "../../../lib/Url";
import StoryPointSelect from "../../../components/StoryPointSelect";

const Tabs = {
  GENERAL: "General",
  PERMISSION: "Permission",
};

const TicketTypeDetail = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.GENERAL);
  const [projectTicketTypeData, setProjectTicketTypeData] = useState();
  const [userList, setUserList] = useState();
  const [statusValue, setStatusValue] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [defaultUser, setdefaultUser] = useState(false)
  const [defaultStoryPoint, setDefauleStory] = useState("")
  let dispatch = useDispatch();

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { projectData } = props;
  const statusOptions = [
    {
      label: Projects.STATUS_ACTIVE,
      value: Projects.STATUS_ACTIVE_VALUE,
    },
    {
      label: Projects.STATUS_INACTIVE,
      value: Projects.STATUS_INACTIVE_VALUE,
    },
  ];

  const getData = async () => {
    const id = props?.match?.params?.typeid;
    const response = await ProjectTicketTypeService.getProjectTicketType(id);
    setProjectTicketTypeData(response);
  };

  const updateData = (values) => {
    const id = props.match.params.typeid;
    (values.status = statusValue?.value),
      (values.user = defaultUser === null ? null : values?.user?.id ? values?.user?.id : projectTicketTypeData?.userId ? projectTicketTypeData?.userId : null),
      (values.default_story_point = values?.story_points?.value ? values?.story_points?.value : null)
    ProjectTicketTypeService.updateProjectTicketType(id, values, (res) => {
      if (res) {
        setIsLoading(true)
        getData()
        setIsLoading(false)

      }
    });
  };

  const deleteTicketType = () => {
    const id = props.match.params.typeid;
    dispatch(
      ProjectTicketTypeService.deleteProjectTicketType(id, {
        project_id: props.match.params.id,
      })
    );

    props.history.push(`/project/${props.match.params.id}?projectId=${Url.GetParam("projectId")}`);
  };

  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard" },
    {
      label: "Project",
      link: `/project`,
    },
    {
      label: "Project Details",
      link: `/project/${props.match.params.id}?projectId=${Url.GetParam("projectId")}`,
    },
    {
      label: "TicketType Details",
      link: "",
    },
  ];


  const handleStatusChange = (values) => {
    setStatusValue(values?.values?.status)
  }
  const initialValues = {
    ...projectTicketTypeData,

    status: statusValue ? {
      value: statusValue?.value,
      label: statusValue?.label
    } : statusOptions && statusOptions.find((status) => status.value == projectTicketTypeData?.status),
    user:
      defaultUser == null ? "" :
        defaultUser ? defaultUser :
          userList && userList.length > 0
            ? userList.find(
              (user) => user.id === projectTicketTypeData?.userId
            )
            : projectTicketTypeData ? {
              label: projectTicketTypeData?.userName,
              value: projectTicketTypeData?.userId,
            } : "",
    story_points:
      defaultStoryPoint ? defaultStoryPoint :
        projectTicketTypeData ?
          {
            value: projectTicketTypeData?.default_story_point,
            label: projectTicketTypeData?.default_story_point
          } : ""
  }

  const handleUserChange = (e) => {
    setdefaultUser(e)
  }

  const handleStoryChange = (e) => {
    setDefauleStory(e.values.story_points)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <PageTitle
        label="Ticket Type details "
        DeleteButtonLabel="Delete"
        deletebuttonHandler={() => {
          setDeleteModal(true);
        }}
      />
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Ticket Type"
        label={projectTicketTypeData?.name}
        deleteFunction={() => {
          deleteTicketType();
        }}
      />
      <Nav tabs className="admin-tabs">
        <Tab
          name={Tabs.GENERAL}
          active={activeTab}
          handleChange={(e) => toggle(e)}
          toggle={toggle}
        />
        <Tab
          name={Tabs.PERMISSION}
          active={activeTab}
          handleChange={(e) => toggle(e)}
          toggle={toggle}
        />
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* General Tab */}
        <TabPane tabId={Tabs.GENERAL}>
          <div className="card">
            <div className="col-6 p-3">
              <div className="field-wrapper mb-0 form-wrapper">
                <Form
                  initialValues={
                    initialValues

                  }
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    updateData(values);
                  }}
                >
                  <Text name="name" label="Name" placeholder="Enter Name" />

                  <Select
                    name="status"
                    label="Status"
                    options={statusOptions}
                    onInputChange={handleStatusChange}
                  />
                  <Number label="Sort" name="sort" fontBolded />

                  <UserSelect
                    label="Default Assignee"
                    name="user"
                    userList={setUserList}
                    handleUserChange={handleUserChange}
                  />
                  <StoryPointSelect
                    name="story_points"
                    label="Story Points"
                    placeholder="Select Story Points"
                    onChange={handleStoryChange}
                  />
                  <br />

                  <div className="mt-2">
                    <SaveButton />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
      <TabContent activeTab={activeTab}>
        {/* General Tab */}
        <TabPane tabId={Tabs.PERMISSION}>
          <Form
            initialValues={{
              ...projectTicketTypeData,
            }}
          >
            <h5 className="my-3">Ticket Details Tabs Settings</h5>
            <SingleCheckbox
              name={"show_test_cases"}
              label={"Show Tests"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_tasks"}
              label={"Show Tasks"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_poa"}
              label={"Show POA"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_test_case_creation_time"}
              label={"Show Test Case Creation TIme"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_test_case_execution_time"}
              label={"Show Test Case EXecution time"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">Ticket Detqails Settings</h5>
            <SingleCheckbox
              name={"show_project"}
              label={"Show Project"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_type"}
              label={"Show Type"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_status"}
              label={"Show Status"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_severity"}
              label={"Show Severity"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_component"}
              label={"Show Component"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_label"}
              label={"Show Label"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_affected_version"}
              label={"Show Affected Version"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />{" "}
            <br />
            <SingleCheckbox
              name={"show_priority"}
              label={"Show Priority"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_release_version"}
              label={"Show Release Version"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_sprint"}
              label={"Show Sprint"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">Ticket Detail Fields</h5>
            <SingleCheckbox
              name={"show_description"}
              label={"Show Description"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_user_impact"}
              label={"Show User Impact"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_production_status"}
              label={"Show Production Status"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_acceptance_criteria"}
              label={"Show Acceptence Criteria"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />{" "}
            <SingleCheckbox
              name={"show_applicable_devices"}
              label={"Show Applicable Devices"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />{" "}
            <SingleCheckbox
              name={"show_environment"}
              label={"Show Environment"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />{" "}
            <SingleCheckbox
              name={"show_build"}
              label={"Show Build"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_test_steps"}
              label={"Show Test steps"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_actual_results"}
              label={"Show Actual results"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_expected_results"}
              label={"Show Expected Results"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_reference_screenshots"}
              label={"Show Reference Screenshots"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_sub_tasks"}
              label={"Show Sub Tasks"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">TIcket Details People Settings</h5>
            <SingleCheckbox
              name={"show_reporter"}
              label={"Show Reporter"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_assignee"}
              label={"Show Assignee"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_reviewer"}
              label={"Show Reviewer"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">TIcket Details ETA settings</h5>
            <SingleCheckbox
              name={"show_eta_date"}
              label={"Show Eta Date"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_eta_time"}
              label={"Show Eta Time"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_initial_eta"}
              label={"Show Initial Eta"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">Ticket Details Dates settings</h5>
            <SingleCheckbox
              name={"show_created_at"}
              label={"Show Created At"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_updated_at"}
              label={"Show Updated At"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_jira_created_at"}
              label={"show Jira Created At"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_completed_at"}
              label={"Show Completed At"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">Ticket details Hours Settings</h5>
            <SingleCheckbox
              name={"show_estimated_hours"}
              label={"Show Estimated Hours"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_story_points"}
              label={"Show Story Points"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">TIcket Details Delivery Date Settings</h5>
            <SingleCheckbox
              name={"show_delivery_date"}
              label={"Show Delivery Date"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_customer_delivery_date"}
              label={"Show Customer Delivery Date"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">Ticket Details TIcket Ids Settings</h5>
            <SingleCheckbox
              name={"show_ticket_id"}
              label={"Show Ticket Id"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_parent_ticket_id"}
              label={"Show Parent Ticket Id"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_jira_ticket_id"}
              label={"Show Jira Ticket Id"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"update_ticket_id_with_jira_id"}
              label={"Update Ticket Id With Jira Id"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_jira_assignee"}
              label={"Show Jira Assignee"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <h5 className="my-3">Ticket Attachments Settings</h5>
            <SingleCheckbox
              name={"show_attachment_page_name"}
              label={"Show Attachment Page Name"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_attachment_platform"}
              label={"Show Attachment Platform"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
            <SingleCheckbox
              name={"show_attachment_summary"}
              label={"Show Attachment_summary"}
              className="accepted-terms mb-1 pb-0 mr-3"
            />
            <br />
          </Form>
        </TabPane>
      </TabContent>
    </>
  );
};

export default TicketTypeDetail;
