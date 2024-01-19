import React, { useState } from "react";
import CompanyUserService from "../services/UserService";
import Select from "./Select";
import Spinner from "./Spinner";
import Url from "../lib/Url";
import { User } from "../helpers/User";

const ProjectUserSelect = (props) => {
  let {
    name,
    handleUserChange,
    label,
    required,
    projectId=null,
    customUserOption,
    placeholder,
    isDisabled,
    isMulti,
    defaultValue,
  } = props;
  
  const [userOption, setUserOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
;
  const getUsers = async () => {
    let params = {
      status: User.STATUS_ACTIVE_VALUE,
      projectId: projectId ? projectId : Url.GetParam("projectId"),
    };
    setIsLoading(true);
    const response = await CompanyUserService.projectUserList(params);

    let data = response && response?.data;
    let userList = [];
    if (data && data.length > 0) {
      for (let i in data) {
        let { first_name, last_name, media_url, id } = data[i];

        userList.push({
          label: await CompanyUserService.getUserName(
            media_url,
            first_name,
            last_name
          ),
          id: id,
          value: first_name + "" + last_name,
        });
      }
    }
    setUserOption(userList);
    setIsLoading(false);
  };

  const onFocus = () => {
      getUsers();
  };

  if (isLoading) {
    <Spinner />;
  }
  return (
    <>
      <Select
        name={name ? name : "user"}
        placeholder={placeholder ? placeholder : "Select User"}
        options={customUserOption ? customUserOption : userOption}
        handleChange={handleUserChange}
        required={required}
        label={label}
        width={props?.width}
        isClearable={true}
        autoFocus={onFocus}
        isLoading={isLoading}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isMulti={isMulti}
      />
    </>
  );
};

export default ProjectUserSelect;
