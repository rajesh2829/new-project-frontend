import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
import Text from "../../components/Text";
import PageTitle from "../../components/PageTitle";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

//Config
import { endpoints } from "../../api/endPoints";

// Action
import DeleteModal from "../../components/DeleteModal";
import SaveButton from "../../components/SaveButton";
import ProjectService from "../../services/ProjectService";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { Projects } from "../../helpers/Project";
import ObjectName from "../../helpers/ObjectName";
import StatusService from "../../services/StatusService";
import Url from "../../lib/Url";
import Drawer from "../../components/Drawer";

const buttonLabel = true;

const Project = (props) => {
  const { history, activeTab, match } = props;
  const TAB_DETAIL = "Detail";

  const TAB_GENERAL = "general";
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTabs, setActiveTab] = useState(TAB_DETAIL);
  const [projectData, setProjectData] = useState("");
  const [projectDeleteModal, setProjectDeleteModal] = useState(false);
  const [projectStatus, setProjectStatus] = useState();
  const selectedId = match && match.params && match.params.id;

  useEffect(() => {
    getStatus();
  }, []);

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

  // Toggling the tabs and modals in respective tab
  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

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
    data.name = data?.name;
    data.slug = data?.name;
    data.code = data?.name;
    data.status = projectStatus;
    dispatch(
      ProjectService.addProject(data, {
        sort: Url.GetParam("sort") || "",
        sortDir: Url.GetParam("sortDir") || "",
      })
    );

    toggle();
  };

  const getStatus = async () => {
    const status = await StatusService.search(
      ObjectName.PROJECT,
      Projects.STATUS_ACTIVE
    );
    for (let i = 0; i < status.length; i++) {
      setProjectStatus(status[i]?.id);
    }
  };

  const addProjectForm = (
    <>
      <Text
        name="name"
        label=" Name"
        placeholder=" Name"
        error=""
        fontBolded
        required={true}
      />
    </>
  );

  const projectFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <SaveButton label="Add" />
      </div>
    </div>
  );

  const handleStatusChange = (id, status) => {
    const data = new FormData();
    data.append("status", status ? status : "");
    dispatch(ProjectService.updateProjectStatus(id, data));
  };

  const projectDelete = (id) => {
    dispatch(ProjectService.deleteProject(id));
  };

  return (
    <>
      <>
        <DeleteModal
          isOpen={projectDeleteModal}
          toggle={() => {
            setProjectDeleteModal(false);
          }}
          title="Delete Location"
          id={projectData.id}
          label={projectData.name}
          deleteFunction={projectDelete}
        />

        <Drawer
          modelTitle={"Add New Project"}
          DrawerBody={addProjectForm}
          DrawerFooter={projectFooter}
          onSubmit={(values) => {
            projectCreate(values);
          }}
          initialValues={{
            name: "",
          }}
          handleOpenModal={toggle}
          handleCloseModal={toggle}
          handleDrawerClose={toggle}
          isModalOpen={isOpen}
          buttonLabel={buttonLabel}
          enableReinitialize
        />
      </>

      <PageTitle
        label="Project"
        buttonHandler={(e) => {
          toggle();
        }}
        buttonLabel="Add New"
        className={"pt-3"}
      />
      <div className="mt-4">
        <ReduxTable
          id="project"
          showHeader
          searchPlaceholder="Search"
          apiURL={`${endpoints().projectAPI}/search`}
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
          >
            Name
          </ReduxColumn>

          <ReduxColumn
            field="status"
            sortBy="status"
            width="120px"
            minWidth="120px"
            maxWidth="120px"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase  my-3 mx-auto ${row.status && row.status == Projects.STATUS_ACTIVE
                  ? "bg-success"
                  : row.status == Projects.STATUS_INACTIVE
                    ? "bg-secondary"
                    : ""
                  }`}
              >
                <p>{row.status}</p>
              </div>
            )}
          >
            Status
          </ReduxColumn>
          <ReduxColumn
            width="70px"
            maxWidth="70px"
            minWidth="70px"
            field="Action"
            disableOnClick
            renderField={(row) => (
              <div className=" text-center action-group-dropdown">
                <MoreDropdown>
                  <DropdownItem
                    className="text-danger"
                    onClick={() => {
                      setProjectDeleteModal(true);
                      setProjectData(row);
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
    </>
  );
};

export default Project;
