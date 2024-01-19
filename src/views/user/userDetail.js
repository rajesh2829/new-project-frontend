import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { apiClient } from "../../apiClient";
import CancelButton from "../../components/CancelButton";
import Email from "../../components/Email";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import Password from "../../components/Password";
import Phone from "../../components/Phone";
import SaveButton from "../../components/SaveButton";
import { SUCCESS_RESPONSE, isBadRequest } from "../../lib/Http";
import { hasPermission } from "../../services/UserRolePermissionService";
import {
  getUserRole,
  getUserRoleList,
} from "../../services/UserSettingService";

// Components
import { useDispatch } from "react-redux";
import { deleteCompanyUser, loginByAdmin } from "../../actions/companyUser";
import { endpoints } from "../../api/endPoints";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import Country from "../../components/Country";
import DeleteModal from "../../components/DeleteModal";
import Select from "../../components/Select";
import SelectDropdown from "../../components/SelectDropdown";
import Spinner from "../../components/Spinner";
import StateDropdown from "../../components/State";
import Text from "../../components/Text";
import toast from "../../components/Toast";
import Zipcode from "../../components/Zipcode";
import { User } from "../../helpers/User";
import { userTypeOption } from "../../helpers/UserType";
import { validateStrongPassword } from "../../lib/Helper";
import String from "../../lib/String";
import Url from "../../lib/Url";
import CompanyUserService from "../../services/CompanyUserService";
import SlackService from "../../services/SlackService";
import ImageList from "../../components/MediaCarousel";
import UploadAvatar from "../userProfile/components/uploadAvatar";
import UserEmployment from "./components/userEmployment";
import UserSalary from "./components/userSalaryList";
import Permission from "../../helpers/Permission";
import UserService from "../../services/UserService";

import "./portalUser.scss";
import DateTime from "../../lib/DateTime";
import TimeZoneSelect from "../../components/TimeZoneSelect";
import ObjectName from "../../helpers/ObjectName";
import ActivityList from "../../components/ActivityList";
import Action from "../../components/Action";
import AttendanceList from "../attendance/list";
import LocationTab from "./components/LocationTab";
import Settings from "./components/Setting";
import AddressService from "../../services/AddressService";

// Tabs Constants
export const Tab = {
  GENERAL: "General",
  SLACK: "Slack",
};

const userDetail = (props) => {
  const [userDetail, setUserDetail] = useState({});
  const [userRole, setUserRole] = useState([]);
  const [userRolePrefill, setUserRolePrefill] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [strongPasswordError, setStrongPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || User.GENERAL_TAB
  );
  const [isLoading, setIsLoading] = useState(false);
  const [UserImageUrl, setUserImageUrl] = useState();

  const [userImageFile, setUserImageFile] = useState();
  const [isNewPassword, setIsNewPassword] = useState();
  const [isConfirmPassword, setIsConfirmPassword] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [status, setImageStatus] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();

  //Country
  const [selectedOption, setSelectedOption] = useState();
  const [selectedCountryName, setSelectedCountryName] = useState();
  const [selectedCountryId, setSeletedCountryId] = useState();
  const [slackUserList, setSlackUserList] = useState([]);
  const [showEditStatusPermision, setShowEditStatusPermision] = useState(false);
  const [timeZones, setTimeZone] = useState([]);
  let showHistory = hasPermission(Permission.USER_HISTORY_VIEW);

  const userImageRef = useRef();

  const { match, history } = props;

  useEffect(() => {
    getSlackUserList();
    getPermisionList();
    getTimeZones();
  }, []);

  const getTimeZones = () => {
    let timeZones = DateTime.getTimeZones();

    let timeZoneList = new Array();

    for (let i = 0; i < timeZones.length; i++) {
      timeZoneList.push({
        label: timeZones[i],
        value: timeZones[i],
      });
    }

    setTimeZone(timeZoneList);
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

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (selectStatus) => {
    if (selectStatus == "Delete") {
      return setDeleteModal(true);
    }
    const data = new FormData();
    // status
    data.append("status", String.Get(selectStatus));

    try {
      apiClient
        .put(`${endpoints().userAPI}/status/${match.params.id}`, data)
        .then((response) => {
          let successMessage;
          if (response && response.data) {
            successMessage = response.data.message;
            toast.success(successMessage);
            getUserDetail();
          }
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            toast.error(error.response.data.message);
            console.error(errorMessage);
          }
        });
    } catch (err) {
      console.log(err);
    }
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
    {
      value: "Delete",
      label: "Delete",
    },
  ];

  // Actions menu list
  const actionOptions = [];

  if (userDetail?.status == User?.STATUS_ACTIVE_VALUE) {
    actionOptions.push(
      {
        label: "InActive",
        value: "InActive",
      },
      {
        label: "Delete",
        value: "Delete",
      }
    );
  }

  if (userDetail?.status == User?.STATUS_INACTIVE_VALUE) {
    actionOptions.push(
      {
        label: "Active",
        value: "Active",
      },
      {
        label: "Delete",
        value: "Delete",
      }
    );
  }

  const getSlackUserList = async () => {
    let { userList } = await SlackService.getUserList();

    let slackUserList = [];
    if (userList && userList.length > 0) {
      for (let i in userList) {
        let { id, name, profile } = userList[i];
        slackUserList.push({
          label: profile?.real_name,
          value: id,
          name: name,
        });
      }
    }
    setSlackUserList(slackUserList);
  };

  // Get Country Details
  const getCountryDetails = async (countryName) => {
    const response = await apiClient.get(
      `${endpoints().countryAPI}/${countryName}`
    );
    const data = response.data;
    setSeletedCountryId(data.id);
  };

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  const dispatch = useDispatch();

  const getUserDetail = async () => {
    const userDetail = await CompanyUserService.get(match.params.id);

    setUserDetail(userDetail);
  };

  useEffect(() => {
    getUserDetail();
    if (activeTab == User.CONTACT_DETAILS) {
      getCountryDetails();
    }
    getUserRoleValue();
    getUserRolePrefill();
    props.history.push(`?tab=${activeTab}`);
  }, []);

  const getUserRoleValue = async () => {
    const roleData = await getUserRole();
    setUserRole(roleData);
  };

  const getUserRolePrefill = async () => {
    const roleData = await getUserRoleList();
    setUserRolePrefill(roleData);
  };

  const updateUser = async (value) => {
    try {
      const response = await apiClient.put(
        `${endpoints().userAPI}/${match.params.id}`,
        value
      );
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
        toast.success(successMessage);
        getUserDetail();
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };

  // Validate Fields
  const _validateFields = async (values) => {
    let success = true;
    const email = values.email;
    const passwordSuccess = await validatePassword(
      values.newPassword,
      values.confirmPassword
    );
    if (!email) {
      success = true;
    }

    if (!passwordSuccess) {
      success = false;
    }
    return success;
  };

  const validatePassword = (newPassword, confirmPassword) => {
    let success = true;
    const strongPassword = validateStrongPassword(newPassword);

    if (strongPassword) {
      setStrongPasswordError(strongPassword);
      success = false;
    } else if (newPassword && !confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      success = false;
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      setConfirmPasswordError("Confirm password did not match");
      success = false;
    }
    return success;
  };

  const handleAdress = async (values) => {
    const data = new FormData();
    data.append("address1", String.Get(values.address1));
    data.append("user_id", match.params.id);

    data.append("address2", String.Get(values.address2));
    data.append("city", String.Get(values.city));
    data.append("state", String.Get(values.state.value));
    data.append("country", String.Get(values.country.value));
    data.append("pin_code", String.Get(values.pin_code));
    data.append("latitude", String.Get(values.latitude));
    data.append("longitude", String.Get(values.longitude))

    let params = {
      object_id: match.params.id,
      objectName: ObjectName.USER
    };
    if (userDetail?.addressId) {
      data.append("id", userDetail?.addressId);

      dispatch(await AddressService.update(userDetail?.addressId, data, params, getUserDetail))
    } else {
      dispatch(AddressService.add(data, params, getUserDetail))
    }
  }

  const handleUser = async (values) => {
    values.newPassword = isNewPassword;
    values.confirmPassword = isConfirmPassword;
    const validator = await _validateFields(values);
    const data = new FormData();
    data.append("first_name", String.Get(values.first_name));
    data.append("last_name", String.Get(values.last_name));
    data.append("roleId", values.roleId && values.roleId.value);
    data.append("newPassword", String.Get(values.newPassword));

    data.append("confirmPassword", String.Get(values.confirmPassword));

    data.append("email", String.Get(values.email));

    data.append("mobileNumber1", String.Get(values.mobileNumber1));
    data.append("mobileNumber2", String.Get(values.mobileNumber2));

    data.append("updatedAt", String.Get(values.updatedAt));
    data.append("createdAt", String.Get(values.createdAt));
    data.append("status", String.Get(values.status));
    data.append("avatarUrl", String.Get(userImageFile));

    if (values.type != undefined) {
      data.append("user_type", values.type && values.type.value);
    }

    if (values.timeZone !== undefined) {
      data.append(
        "timeZone",
        String.Get(values && values.timeZone && values.timeZone.value)
      );
    }

    if (!values.slack_id === null) {
      data.append("slack_id", String.Get(values.slack_id.value));
    }
    if (!values.slack_name === null) {
      data.append("slack_id", String.Get(values.slack_id.value));
    }

    if (validator == true) {
      setConfirmPasswordError("");
      setStrongPasswordError("");
      await updateUser(data);
    }
  };

  const slackHandleSubmit = async (values) => {
    let data = new FormData();

    data.append("slack_id", String.Get(values.slack_id.value));
    data.append("slack_name", String.Get(values.slack_id.name));
    data.append("first_name", String.Get(values.first_name));
    data.append("last_name", String.Get(values.last_name));
    dispatch(await CompanyUserService.slackUpdate(match.params.id, data));
  };

  const handlePasswordChange = (e) => {
    const newPassword = isNewPassword;
    const confirmPassword = e && e.values && e.values.confirmPassword;
    setIsConfirmPassword(confirmPassword);

    const strongPassword = validateStrongPassword(newPassword);
    if (strongPassword) {
      setStrongPasswordError(strongPassword);
    } else if (newPassword && !confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      setConfirmPasswordError("Confirm password did not match");
    }
    if (strongPassword === undefined) {
      setStrongPasswordError("");
    }
    if (newPassword === confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleNewPasswordChange = (e) => {
    const newPassword = e.values.newPassword;
    const confirmPassword = e.values.confirmPassword;
    setIsNewPassword(newPassword);
    const strongPassword = validateStrongPassword(newPassword);
    if (strongPassword) {
      setStrongPasswordError(strongPassword);
    } else if (newPassword && !confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      setConfirmPasswordError("Confirm password did not match");
    }
    if (strongPassword === undefined) {
      setStrongPasswordError("");
    }
    if (newPassword === confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  {
    activeTab === Tab.GENERAL ? (
      <SelectDropdown
        className="px-2"
        visible="visible"
        clearable
        dropdownLinks={statusOptions}
        handleChange={(e) => handleStatusChange(e)}
        buttonLabel={"Status"}
        hideCaret
      />
    ) : (
      ""
    );
  }

  //Hangle Admin Action
  const handleAdminAction = async (value) => {
    switch (value) {
      case "Login As":
        loginByAdmin(userDetail && userDetail.id, history);
        break;
      case "Delete":
        dispatch(deleteCompanyUser(match.params.id, {}, props.history));
        break;
      case "Force Logout":
        let bodyData = { userIds: [match.params.id], forceLogout: true };
        await dispatch(UserService.bulkUpdate(bodyData, {}));

        break;
      case "Force Sync":
        let data = { userIds: [match.params.id], force_sync: true };
        await dispatch(UserService.bulkUpdate(data, {}));

      default:
        break;
    }
  };

  // Portal logo s3 url
  const userImageWithBaseUrl = UserImageUrl
    ? UserImageUrl
    : userDetail?.avatarUrl;

  // user image upload
  const onUserImageChange = (e) => {
    userImageUpload(e);
  };

  // Portal Logo Upload
  const userImageUpload = (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    if (files) {
      const fileUrl = URL.createObjectURL(files);
      setUserImageUrl(fileUrl);
      setBase64Image(files, setUserImageFile);
    }
  };

  // Portal logo image remove
  const userImageRemove = () => {
    userImageRef.current.value = "";
    setUserImageUrl("");
    setUserImageFile("");
  };

  //Country Change
  const handleCountryChange = (values) => {
    const selectedOption = values && values.id;
    const selectedCountryName = values && values.label;
    setSelectedOption(selectedOption);
    setSelectedCountryName(selectedCountryName);
  };

  // Set image preview in state
  const setBase64Image = (file, value) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      value(reader.result);
    };
  };

  if (isLoading) {
    return <Spinner />;
  }

  const breadcrumbList = [
    { label: "Home", link: "/people/dashboard" },
    { label: "User", link: "/users" },
    {
      label: activeTab,
      link: "",
    },
  ];

  const actionsMenuList = [
    {
      value: "Login As",
      label: "Login As",
    },
    {
      value: "Force Logout",
      label: "Force Logout",
    },
    {
      value: "Force Sync",
      label: "Force Sync",
    },
  ];

  const deleteUser = (id) => {
    try {
      apiClient
        .delete(`${endpoints().userAPI}/${id}`)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            toast.success(res?.data?.message);
            props.history.push("/users");
          }
        })
        .catch((err) => {
          if (isBadRequest(err)) {
            let errorMessage;
            const errorRequest = err.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            toast.error(errorMessage);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getPermisionList = async () => {
    const showEditStatusPermision = hasPermission(
      Permission.USER_STATUS_UPDATE
    );
    setShowEditStatusPermision(showEditStatusPermision);
  };

  return (
    <>
      <DeleteModal
        id={userDetail?.id}
        label={userDetail?.first_name}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete User"
        deleteFunction={() => deleteUser(userDetail?.id)}
      />
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        <div>
          <PageTitle
            label={`${userDetail?.first_name + " " + userDetail?.last_name}`}
          />
        </div>
        <div className="d-flex">
          {activeTab == User.SALARY && (
            <AddButton
              className="ml-3 mr-1"
              label="Add"
              onClick={(e) => {
                history.push(`/user/salary/add?user_id=${userDetail?.id}`);
              }}
            />
          )}
          {activeTab == User.FILES && (
            <AddButton
              className="mr-2"
              label="Add File"
              onClick={(e) => {
                imagetoggle();
              }}
            />
          )}
          {showEditStatusPermision && (
            <div className="mx-2">
              <SelectDropdown
                buttonLabel={
                  userDetail?.status == User?.STATUS_ACTIVE_VALUE
                    ? "Active"
                    : userDetail?.status == User?.STATUS_INACTIVE_VALUE
                      ? "InActive"
                      : "Status"
                }
                dropdownLinks={actionOptions}
                hideCaret
                selectName={"admin_action"}
                handleChange={(e) => handleStatusChange(e)}
              />
            </div>
          )}
          <Action
            buttonLabel="Actions"
            hideCaret
            dropdownLinks={actionsMenuList}
            handleChange={handleAdminAction}
          />
        </div>
      </div>
      <Nav tabs className="admin-tabs mb-1">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.GENERAL_TAB,
            })}
            onClick={() => {
              toggle(User.GENERAL_TAB);
              _handleTabChange(User.GENERAL_TAB);
            }}
          >
            General
          </NavLink>
        </NavItem>
        {/* Email Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.ADDRESS,
            })}
            onClick={() => {
              toggle(User.ADDRESS);
              _handleTabChange(User.ADDRESS);
            }}
          >
            Address
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.SECURITY,
            })}
            onClick={() => {
              toggle(User.SECURITY);
              _handleTabChange(User.SECURITY);
            }}
          >
            Password
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.EMPLOYMENT,
            })}
            onClick={() => {
              toggle(User.EMPLOYMENT);
              _handleTabChange(User.EMPLOYMENT);
            }}
          >
            Employment
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.FILES,
            })}
            onClick={() => {
              toggle(User.FILES);
              _handleTabChange(User.FILES);
            }}
          >
            Files
          </NavLink>
        </NavItem>

        {/* slack id Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.SLACK,
            })}
            onClick={() => {
              toggle(User.SLACK);
              _handleTabChange(User.SLACK);
            }}
          >
            Slack
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.SALARY,
            })}
            onClick={() => {
              toggle(User.SALARY);
              _handleTabChange(User.SALARY);
            }}
          >
            Salary
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.ATTENDANCE,
            })}
            onClick={() => {
              toggle(User.ATTENDANCE);
              _handleTabChange(User.ATTENDANCE);
            }}
          >
            Attendance
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.SETTINGS,
            })}
            onClick={() => {
              toggle(User.SETTINGS);
              _handleTabChange(User.SETTINGS);
            }}
          >
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          {showHistory && (
            <NavLink
              className={classnames({
                active: activeTab === User.HISTORY,
              })}
              onClick={() => {
                toggle(User.HISTORY);
                _handleTabChange(User.HISTORY);
              }}
            >
              History
            </NavLink>
          )}
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === User.LOCATION,
            })}
            onClick={() => {
              toggle(User.LOCATION);
              _handleTabChange(User.LOCATION);
            }}
          >
            {User.LOCATION}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {activeTab == User.GENERAL_TAB && (
          <TabPane tabId={User.GENERAL_TAB}>
            <Form
              enableReinitialize={true}
              initialValues={{
                ...userDetail,
                roleId: userDetail
                  ? userRolePrefill.find(
                    (data) => userDetail.roleId == data.value
                  )
                  : "",
                timeZone: userDetail.timeZone
                  ? timeZones.find((data) => data.value == userDetail.timeZone)
                  : null,

                type: {
                  label: userDetail?.user_type,
                  value: userDetail?.user_type ? userDetail?.user_type : "",
                },
              }}
              onSubmit={(values) => {
                handleUser(values);
              }}
            >
              <div className="card bg-white mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="row">
                        <div className="field-wrapper d-flex mt-1 ml-1 mb-3 col-lg-12 col-sm-12"></div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Text
                            name="first_name"
                            label="First Name"
                            placeholder="Enter First Name"
                            required={true}
                            error=""
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Text
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter Last Name"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Email
                            name="email"
                            label="Email"
                            placeholder="Enter Email"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Phone
                            name="mobileNumber1"
                            label="Mobile Number 1"
                            placeholder="Enter Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Phone
                            name="mobileNumber2"
                            label="Mobile Number 2"
                            placeholder="Enter Mobile Number"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Select
                            name="type"
                            label="Type"
                            placeholder="Select User Type"
                            options={userTypeOption}
                            error=""
                            fontBolded
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Select
                            name="roleId"
                            label="Role"
                            placeholder="Select Role..."
                            options={userRole ? userRole : []}
                            error=""
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <TimeZoneSelect name="timeZone" label="Time Zone" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                      <div className="w-100 pl-5 mt-5">
                        <UploadAvatar
                          apiURL={`${endpoints().userAvatarUpdate}`}
                          data={userDetail}
                          getFile={userImageWithBaseUrl}
                          userId={userDetail?.id}
                        />
                      </div>
                    </div>
                  </div>
                  <SaveButton />
                  <CancelButton onClick={() => history.push("/users")} />
                </div>
              </div>
            </Form>
          </TabPane>
        )}
        {activeTab == User.ADDRESS && (
          <TabPane tabId={User.ADDRESS}>
            <Form
              enableReinitialize={true}
              initialValues={{
                ...userDetail,
                roleId: userDetail
                  ? userRole.find((data) => userDetail.roleId == data.value)
                  : "",
                state: {
                  label: userDetail.state,
                  value: userDetail.state,
                },
                country: {
                  label: userDetail.country,
                  value: userDetail.country,
                },

              }}
              onSubmit={(values) => {
                handleAdress(values);
              }}
            >
              <div className="card bg-white mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="col-lg-12 col-sm-12">
                        <Text
                          name="address1"
                          label="Address 1"
                          placeholder="Enter Address"
                          error=""
                          fontBolded
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <Text
                          name="address2"
                          label="Address 2"
                          placeholder="Enter Address"
                          error=""
                          fontBolded
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <Text
                          name="city"
                          label="City"
                          placeholder="Enter City"
                          error=""
                          fontBolded
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <Country
                          name="country"
                          label="Country"
                          error=""
                          onChange={handleCountryChange}
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <StateDropdown
                          name="state"
                          label="State"
                          error=""
                          fontBolded
                          selectedCountry={
                            selectedOption ? selectedOption : selectedCountryId
                          }
                          selectedCountryName={String.Get(selectedCountryName)}
                        />
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <Zipcode
                          label="Pin Code"
                          name="pin_code"
                          placeholder="Enter Pin Code"
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <Text
                          name="longitude"
                          label="Longitude"
                          placeholder="Enter Longitude"
                          error=""
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">

                        <Text
                          name="latitude"
                          label="Latitude"
                          placeholder="Enter Latitude"
                          error=""
                        />
                      </div>
                      <div className="mb-4">
                        <div>
                          <SaveButton />
                          <CancelButton
                            onClick={() => history.push("/users")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
        )}
        {activeTab == User.SECURITY && (
          <TabPane tabId={User.SECURITY}>
            <Form
              enableReinitialize={true}
              initialValues={{
                ...userDetail,
                roleId: userDetail
                  ? userRole.find((data) => userDetail.roleId == data.value)
                  : "",
              }}
              onSubmit={(values) => {
                handleUser(values);
              }}
            >
              <div className="card bg-white mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Password
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter New Password"
                            onInputChange={(e) => {
                              handleNewPasswordChange(e);
                            }}
                            error={strongPasswordError}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <Password
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Enter Confirm Password"
                            onInputChange={(e) => {
                              handlePasswordChange(e);
                            }}
                            error={confirmPasswordError}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <SaveButton />
                  <CancelButton onClick={() => history.push("/users")} />
                </div>
              </div>
            </Form>
          </TabPane>
        )}
        {activeTab == User.SLACK && (
          <TabPane tabId={User.SLACK}>
            <Form
              enableReinitialize={true}
              initialValues={{
                ...userDetail,
                roleId: userDetail
                  ? userRolePrefill.find(
                    (data) => userDetail.roleId == data.value
                  )
                  : "",
                slack_id: slackUserList.find(
                  (data) => data?.value === userDetail?.slack_id
                ),
              }}
              onSubmit={(values) => {
                slackHandleSubmit(values);
              }}
            >
              <div className="card bg-white">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <Select
                        name="slack_id"
                        label="Slack User"
                        placeholder="Select Slack User"
                        options={slackUserList}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>
                      <SaveButton />
                      <CancelButton onClick={() => history.push("/users")} />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
        )}
        {activeTab == User.EMPLOYMENT && (
          <TabPane tabId={User.EMPLOYMENT}>
            <UserEmployment
              initialValues={{
                ...userDetail,
                roleId: userDetail
                  ? userRole.find((data) => userDetail.roleId == data.value)
                  : "",
                location: userDetail?.primary_location_id
                  ? {
                    label: userDetail?.location_name,
                    value: userDetail?.primary_location_id,
                  }
                  : "",
                shift: userDetail?.primary_shift_id
                  ? {
                    label: userDetail?.shift_name,
                    value: userDetail?.primary_shift_id,
                  }
                  : "",
                designation: userDetail?.designationId
                  ? {
                    label: userDetail?.designationName,
                    value: userDetail?.designationId,
                  }
                  : "",
              }}
              id={match.params.id}
              history={history}
            />
          </TabPane>
        )}
        {activeTab == User.FILES && (
          <TabPane tabId={User.FILES}>
            <ImageList
              title="User"
              objectName="USER"
              objectId={props?.match?.params?.id}
              showFeature={true}
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
              userView
              hideAttachments
            />
          </TabPane>
        )}
        {activeTab == User.SALARY && (
          <TabPane tabId={User.SALARY}>
            <UserSalary history={history} user={props?.match?.params?.id} />
          </TabPane>
        )}
        {showHistory && activeTab === User.HISTORY && (
          <TabPane tabId={User.HISTORY}>
            <ActivityList
              id={props?.match?.params?.id}
              objectId={props?.match?.params?.id}
              object_name={ObjectName.USER}
            />
          </TabPane>
        )}
        {activeTab === User.ATTENDANCE && (
          <TabPane tabId={User.ATTENDANCE}>
            <AttendanceList
              userView={"false"}
              showUserFilter={false}
              user={props?.match?.params?.id}
              showSearch
              showPageSize={false}
              sortByDropdown
              refreshButton
              history={history}
            />
          </TabPane>
        )}
        {activeTab == User.SETTINGS && (
          <TabPane tabId={User.SETTINGS}>
            <Settings
              history={history}
              getUserDetail={getUserDetail}
              userDetail={userDetail}
            />
          </TabPane>)}

        {activeTab == User.LOCATION && (
          <TabPane tabId={User.LOCATION}>
            <LocationTab
              history={history}
              user_id={props?.match?.params?.id}
            />
          </TabPane>)}
      </TabContent>
    </>
  );
};

export default userDetail;
