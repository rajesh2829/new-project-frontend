import classnames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Text from "../../components/Text";
import Url from "../../lib/Url";
import ProjectService from "../../services/ProjectService";
import ProjectTicketTypeService from "../../services/ProjectTicketTypeService";

//Pages
import Action from "../../components/Action";
import General from "./components/general";
import SettingsTab from "./components/settingsTab";
import Drawer from "../../components/Drawer";
import MyContext from "../../context/myContext";
import Cookie from "../../lib/Helper";
import Cookies from "../../lib/Helper";
import Spinner from "../../components/Spinner";
import StatusTab from "./components/statusTab";
import TicketType from "./components/ticketType";
import ProjectUsers from "./components/projectUsers";
import UserSelect from "../../components/UserSelect";
import Select from "../../components/Select";
import ProjectUserService from "../../services/ProjectUserService";
import { hasPermission } from "../../services/UserRolePermissionService";
import Permission from "../../helpers/Permission";
import Button from "../../components/Button";

const Tab = {
  GENERAL: "General",
  TICKET_TYPE: "Ticket Types",
  STATUS: "Status",
  SETTINGS: "Settings",
  USERS: "Users"
};

const ProjectDetail = (props) => {
  const { history, match } = props;
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") ? Url.GetParam("tab") : Tab.GENERAL
  );
  const [projectData, setProjectData] = useState("");
  const [deleteModal, setDeleteModal] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState("");
  const [statusIsOpen, setStatusIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [projectId, projectIdS] = useState(Url.GetParam("projectId"))
  const [editable, setEditable] = useState(true)
  const values = useContext(MyContext);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  let showEditButton = hasPermission(Permission.PROJECT_EDIT);

  const _toggle = () => {
    setStatusIsOpen(!statusIsOpen);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    getData(Cookies.get(Cookie.PROJECT_ID) ? Cookies.get(Cookie.PROJECT_ID) : props.match.params.id);
  }, [Cookies.get(Cookie.PROJECT_ID), Url.GetParam("isLoading")]);


  useEffect(() => {
    getData(Cookies.get(Cookie.PROJECT_ID) ? Cookies.get(Cookie.PROJECT_ID) : Url.GetParam("projectId"));
  }, []);


  const handleAddButtonClick = () => {
    _toggle();
    setRow("");
  };

  const statusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "InActive",
      label: "InActive",
    },
  ];

  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard" },
    {
      label: "Project",
      link: "/project",
    },
    {
      label: "Project Details",
      link: "",
    },
  ];

  const getData = async (id) => {
    const response = await ProjectService.getProject(Url.GetParam("projectId"));
    setProjectData(response);
    if (Url.GetParam("isLoading") === "true") {

      Url.UpdateUrl(
        {
          projectId: Url.GetParam("projectId"),
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
          isLoading: false
        },
        props
      );
    }
  };

  const projectDelete = (id) => {
    dispatch(ProjectService.deleteProject(id));
    history.push("/project");
  };

  const addtoggle = () => {
    setIsOpen(!isOpen);
  };

  const addUsertoggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addProjectTicketTypeForm = (
    <>
      <Text
        name="name"
        label=" Name"
        placeholder=" Name"
        error=""
        required={true}
      />
    </>
  );

  const addProjectUserForm = (
    <>
      <UserSelect
        name="user"
        label="User"
        width="100%"
        required
      />
      <Select
        label="Status"
        name="status"
        placeholder="Select Status"
        options={statusOptions}
      />
    </>
  );

  const projectTicketTypeFooter = <SaveButton label="Add" />;

  const projectTicketTypeCreate = (data) => {
    data.name = data?.name;;
    data.projectId = Url.GetParam("projectId") ? Url.GetParam("projectId") : ""
    dispatch(
      ProjectTicketTypeService.addProjectTicketType(data, {
        sort: Url.GetParam("sort") || "",
        sortDir: Url.GetParam("sortDir") || "",
      })
    );

    addtoggle();
  };

  const projectUserCreate = (data) => {

    setIsLoading(true)
    data.userId = data?.user?.id;
    data.projectId = Url.GetParam("projectId") ? Url.GetParam("projectId") : null;
    data.status = data?.status?.value
    dispatch(
      ProjectUserService.addProjectUser(data, {
        sort: Url.GetParam("sort") || "",
        sortDir: Url.GetParam("sortDir") || "",
      }, addUsertoggle())
    );
    setIsLoading(false)
  };

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

  if (Url.GetParam("isLoading") === "true" || isLoading) {
    return <Spinner />
  }

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Project"
        id={projectData && projectData?.projectData?.id}
        label={projectData && projectData?.projectData?.name}
        deleteFunction={() =>
          projectDelete(projectData && projectData?.projectData?.id)
        }
      />
      <BreadCrumb list={breadcrumbList} />
      <div className="mb-3 d-flex justify-content-between">
        <PageTitle label={projectData && projectData?.projectData?.name} />

        <div className="float-right d-flex">
          {((activeTab == Tab.SETTINGS) || (activeTab == Tab.GENERAL)) && showEditButton && editable && (
            <Button
              label="Edit"
              loadingLabel="Editable"
              className="mr-1"
              disabled={editable == false ? true : false}
              onClick={() => {
                setEditable(false);
              }}
            />
          )}

          {activeTab == Tab.TICKET_TYPE && (
            <AddButton
              label={"Add New"}
              // onClick={() => }
              onClick={addtoggle}
              className="mx-2"
            />
          )}
          {activeTab == Tab.USERS && (
            <AddButton
              label={"Add New"}
              // onClick={() => }
              onClick={addUsertoggle}
              className="mx-2"
            />
          )}
          {activeTab == Tab.STATUS && (
            <AddButton
              label={"Add"}
              onClick={handleAddButtonClick}
              className="mx-2"
            />
          )}
          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>
      </div>
      <Drawer
        hideAddButton
        DrawerBody={addProjectTicketTypeForm}
        DrawerFooter={projectTicketTypeFooter}
        initialValues={{
          name: ""
        }}
        onSubmit={(values) => {
          projectTicketTypeCreate(values);
        }}
        handleOpenModal={addtoggle}
        handleCloseModal={addtoggle}
        handleDrawerClose={addtoggle}
        isModalOpen={isOpen}
        buttonLabel={true}
        showButton={true}
        modelTitle={"New Type"}
      />
      <Drawer
        hideAddButton
        DrawerBody={addProjectUserForm}
        DrawerFooter={projectTicketTypeFooter}
        enableReinitialize={true}
        initialValues={{
          user: "",
          status: {
            value: "Active",

            label: "Active"
          } || ""
        }}
        onSubmit={(values) => {
          projectUserCreate(values);
        }}
        handleOpenModal={addUsertoggle}
        handleCloseModal={addUsertoggle}
        handleDrawerClose={addUsertoggle}
        isModalOpen={isModalOpen}
        buttonLabel={true}
        showButton={true}
        modelTitle={"New User"}
      />

      <Nav tabs className="admin-tabs">
        {/* Detail Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.GENERAL,
            })}
            onClick={() => {
              toggle(Tab.GENERAL);
            }}
          >
            {Tab.GENERAL}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.TICKET_TYPE,
            })}
            onClick={() => {
              toggle(Tab.TICKET_TYPE);
            }}
          >
            {Tab.TICKET_TYPE}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.STATUS,
            })}
            onClick={() => {
              toggle(Tab.STATUS);
            }}
          >
            {Tab.STATUS}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.USERS,
            })}
            onClick={() => {
              toggle(Tab.USERS);
            }}
          >
            {Tab.USERS}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.SETTINGS,
            })}
            onClick={() => {
              toggle(Tab.SETTINGS);
            }}
          >
            {Tab.SETTINGS}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* Detail Tab Start*/}
        {activeTab == Tab.GENERAL && (
          <TabPane tabId={Tab.GENERAL} className="w-100">
            <General
              match={match}
              history={history}
              projectData={projectData}
              editable={editable}
              setEditable={setEditable}
            />
          </TabPane>
        )}
        {activeTab == Tab.TICKET_TYPE && (
          <TabPane tabId={Tab.TICKET_TYPE} className="w-100">
            <TicketType projectId={Url.GetParam("projectId")} history={history} />
          </TabPane>
        )}
        {activeTab == Tab.STATUS && (
          <TabPane tabId={Tab.STATUS} className="w-100">
            <StatusTab
              _toggle={_toggle}
              isOpen={statusIsOpen}
              history={history}
              project_id={Url.GetParam("projectId") ? Url.GetParam("projectId") : ""}
              row={row}
              setRow={setRow}
            />
          </TabPane>
        )}
        {activeTab == Tab.SETTINGS && (
          <TabPane tabId={Tab.SETTINGS} className="w-100">
            <SettingsTab
              history={history}
              projectId={Url.GetParam("projectId") ? Url.GetParam("projectId") : ""}
              editable={editable}
              setEditable={setEditable}
            />
          </TabPane>
        )}
        {activeTab == Tab.USERS && (
          <TabPane tabId={Tab.USERS} className="w-100">
            <ProjectUsers history={history} />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default ProjectDetail;
