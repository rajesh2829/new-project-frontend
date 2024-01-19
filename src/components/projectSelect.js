import React from "react";
import { useEffect } from "react";
import Select from "./Select";
import ProjectService from "../services/ProjectService";
import { useState } from "react";
import Url from "../lib/Url";
import Form from "./Form";
import Cookies from "../helpers/Cookie";
import Cookie from "../lib/Helper";

const ProjectSelect = ({ label, onInputChange, projectList, oninputProjectChange }) => {
  const [projectsList, setProjectList] = useState([]);
  const [pojectID, setProjectId] = useState("");
  const [defaultId, setDefaultId] = useState(true);

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    const data = await ProjectService.getProjectList();
    setProjectList(data);
    projectList && projectList(data);

    return data;
  };

  const projectChange = (e) => {
    setDefaultId(false);
    let data = e?.values?.projectName;
    setProjectId(data);
    oninputProjectChange && oninputProjectChange(e?.values?.projectName)
  };

  return (
    <div>
      <Select
        name="projectName"
        options={projectsList}
        onInputChange={onInputChange ? onInputChange : projectChange}
        label={label}
        menuPortal=""
      />
    </div>
  );
};

export default ProjectSelect;
