import React, { useEffect, useState } from 'react';
import ArrayList from '../lib/ArrayList';
import CompanyUserService from '../services/UserService';
import Select from './Select';
import Spinner from './Spinner';

const UserSelect = (props) => {
  let {
    name,
    handleUserChange,
    label,
    required,
    userList,
    params,
    customUserOption,
    placeholder,
    selectedUserId,
    showLoggedInUser = null,
    isDisabled,
    isMulti,
    setLogedInUser,
    labelName
  } = props;

  const [userOption, setUserOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDefaultOwner, setIsDefaultOwner] = useState(true)
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    {
      selectedUserId || showLoggedInUser &&
        setIsLoading(true)
      getUser();
      setIsLoading(false)
    }
  }, []);

  const getUser = async (params) => {
    const users = await CompanyUserService.getOption(
      params,
      props.showAssignToMeOption,
      labelName
    );
    setUserOption(users);
    userList && userList(users);
  };

  const getUsers = async (params) => {
    setIsLoading(true);
    const users = await CompanyUserService.getOption(
      params,
      props.showAssignToMeOption,
      labelName
    );
    setUserOption(users);
    userList && userList(users);
    setIsLoading(false);
  };

  let getDefaultValue = null;

  if (isDefaultOwner && selectedUserId) {
    getDefaultValue =
      userOption &&
      userOption.length > 0 &&
      userOption.find((data) => data?.id == selectedUserId);
  }

  if (isDefaultOwner && showLoggedInUser && !selectedUserId) {
    getDefaultValue =
      userOption &&
      userOption.length > 0 &&
      userOption.find((data) => data?.isLogedInUser == true);
    setLogedInUser && setLogedInUser(getDefaultValue)
  }

  const handleUserChanges = (e) => {
    setSelectedUser(e)
    handleUserChange && handleUserChange(e)
    setIsDefaultOwner(false)
  }

  const onFocus = () => {
    if (ArrayList.isEmpty(userOption)) {
      getUsers(params);
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <Select
        name={name ? name : 'user'}
        placeholder={placeholder ? placeholder : 'Select User'}
        options={customUserOption ? customUserOption : userOption}
        handleChange={handleUserChanges}
        required={required}
        label={label}
        width={props?.width}
        isClearable={true}
        autoFocus={onFocus}
        isLoading={isLoading}
        defaultValue={getDefaultValue ? getDefaultValue : selectedUser}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPortal={props.menuPortal}
      />
    </>
  );
};
export default UserSelect;