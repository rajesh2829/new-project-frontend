import React, { useEffect, useState } from "react";
import Form from "../../../components/Form";
import Select from "../../../components/Select";
import Cookie from "../../../helpers/Cookie";
import Cookies from "../../../lib/Helper";
import Url from "../../../lib/Url";
import ProjectService from "../../../services/ProjectService";

const ProjectSelector = (props) => {
  const { onInputChange, initialValues, defaultId, clearable } = props;
  const [projectsList, setProjectList] = useState([]);
  const [defaultProject, setDefaultProject] = useState();

  // Set Default ProjectId
  defaultId(defaultProject);

  useEffect(() => {
    getProjectList();
  }, []);

  //Get Project Details
  const getProjectList = async () => {


    const data = await ProjectService.getProjectList();
    setProjectList(data);

    return data;
  };

  return (
    <div style={{ maxWidth: "205px" }}>
      <Form
        enableReinitialize={true}
        initialValues={{
          projectName: projectsList.find(
            (projectData) => projectData.value == (Cookies.get(Cookie.PROJECT_ID) ? Cookies.get(Cookie.PROJECT_ID) : Url.GetParam("projectId")),
          ),
        }}
      >
        <div className="field-wrapper text-dark ml-2 mr-2 mt-3">
          <Select
            color="text-dark"
            fullWidth={true}
            className="w-100"
            name="projectName"
            options={projectsList}
            onInputChange={onInputChange}
            clearable={clearable}
          />
        </div>
      </Form>
    </div>
  );
};
export default ProjectSelector;