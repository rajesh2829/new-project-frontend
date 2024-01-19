import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import DateSelector from "../../components/Date";
import PageTitle from "../../components/PageTitle";
import Phone from "../../components/Phone";
import Select from "../../components/Select";
import Text from "../../components/Text";

//Lib
import classNames from "classnames";
import * as API from "../../actions/companyUser";
import AddButton from "../../components/AddButton";
import NavTab from "../../components/NavTab";
import Password from "../../components/Password";
import SelectDropdown from "../../components/SelectDropdown";
import * as statusConstant from "../../components/constants/status";
import { PAGE, PAGESIZE, SORT, SORT_DIR } from "../../helpers/Status";
import { User } from "../../helpers/User";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import CompanyUserService from "../../services/CompanyUserService";
import UserService from "../../services/UserService";
import { getUserRole } from "../../services/UserSettingService";
import "./portalUser.scss";

import UserLists from "../../components/UserList";
import Permission from "../../helpers/Permission";
import { userTypeOption } from "../../helpers/UserType";
import { hasPermission } from "../../services/UserRolePermissionService";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";
import { isBadRequest } from "../../lib/Http";
import Toast from "../../components/Toast";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

export const Tabs = {
  ACTIVE: "Active",
  ALL: "All",
  INACTIVE: "InActive",
};

const UserList = (props) => {
  const { history, AllUsers, InActiveUsers, ActiveUsers } = props;
  const params = new URLSearchParams(props.history.location.search);
  // Defining the clicked tab value from section in url
  const role = params.get("section");
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [currentData, setCurrentData] = useState();
  const [activeTab, setActiveTab] = useState(
    role ? role : User.ACTIVE_USER_TAB
  );
  const [joiningDate, setJoiningDate] = useState(new Date());

  const [showSidebar, setShowSidebar] = useState(false);
  const [param, setParam] = useState({});
  const [Role, setRole] = useState(Url.GetParam("role"));
  const [selectedUserIds, setUserIds] = useState([]);
  const [userPermissionAdd, setUserPermissionAdd] = useState();
  const [rowValue, setRowValue] = useState(null);
  const [detail, setDetail] = useState();
  const [isSubmit, setIsSubmit] = useState(true);

  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value));
  useEffect(() => {
    getUserRoleValue();

  }, []);

  useEffect(() => {
    getDetails();
  }, [rowValue]);

  // Handle Reset
  const handleReset = () => {
    Url.UpdateUrl({ role: "" }, props);
    setParam("");
    dispatch(API.searchUserData());
  };

  const actionsMenuList = [
    {
      value: "Force Logout",
      label: "Force Logout",
    },
    {
      value: "Force Sync",
      label: "Force Sync",
    },
  ];

  if (activeTab == "Active") {
    actionsMenuList.push({
      value: "Make As InActive",
      label: "Make As InActive",
    });
  }

  if (activeTab == "InActive") {
    actionsMenuList.push({
      value: "Make As Active",
      label: "Make As Active",
    });
  }

  if (activeTab == "All") {
    actionsMenuList.push(
      {
        value: "Make As Active",
        label: "Make As Active",
      },
      {
        value: "Make As InActive",
        label: "Make As InActive",
      }
    );
  }

  // Get params
  const getParams = () => {
    const role = Url.GetParam("role") || "";
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : SORT;
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = searchTerm ? searchTerm : "";
    const selectedPage = Url.GetParam("page");
    const page = selectedPage ? selectedPage : PAGE;

    const data = { pageSize, sort, sortDir, search, page, role };

    return data;
  };

  // Get Filter params
  const getFilterParams = (data) => {
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : "id";
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = searchTerm ? searchTerm : "";
    const selectedPage = Url.GetParam("page");
    const page = selectedPage ? selectedPage : PAGE;
    data.pageSize = pageSize;
    data.sort = sort;
    data.sortDir = sortDir;
    data.search = search;
    data.page = page;
    setParam(data);
  };

  const dispatch = useDispatch();

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (tabStatus) => {
    setStatus(tabStatus);
    historyPush(tabStatus);
  };

  const historyPush = (status) => {
    props.history.push(`/users?tab=${status}`);
  };

  const _handleStatusChange = (e) => {
    if (e == User.STATUS_ACTIVE_TEXT) {
      toggleTab(Tabs.ACTIVE);
      handleStatusChange(User.STATUS_ACTIVE_TEXT);
    }

    if (e == User.STATUS_INACTIVE_TEXT) {
      toggleTab(Tabs.INACTIVE);
      handleStatusChange(User.STATUS_INACTIVE_TEXT);
    }

    if (e == Tabs.ALL) {
      toggleTab(Tabs.ALL);
      handleStatusChange(Tabs.ALL);
    }
  };

  const activeTabChange = () => {
    toggleTab(Tabs.ACTIVE);
    _handleStatusChange(User.STATUS_ACTIVE_TEXT);
  };

  const inActiveTabChange = () => {
    toggleTab(Tabs.INACTIVE);
    _handleStatusChange(User.STATUS_INACTIVE_TEXT);
  };

  const allTabChange = () => {
    toggleTab(Tabs.ALL);
    _handleStatusChange(Tabs.ALL);
  };

  const NavTabList = [
    {
      label: Tabs.ACTIVE,
      onClick: activeTabChange,
      count: ActiveUsers,
      className: classNames({ active: activeTab === Tabs.ACTIVE }),
    },
    {
      label: Tabs.INACTIVE,
      onClick: inActiveTabChange,
      count: InActiveUsers,
      className: classNames({ active: activeTab === Tabs.INACTIVE }),
    },
    {
      label: Tabs.ALL,
      onClick: allTabChange,
      count: AllUsers,
      className: classNames({ active: activeTab === Tabs.ALL }),
    },
  ];

  const _toggle = (id) => {
    if (id) {
      setCurrentId(id);
    } else if (!id) {
      setCurrentId("");
      setCurrentData("");
      setDetail("");
    }
    setIsOpen(!isOpen);
    setIsSubmit(true)
  };

  const closeToggle = () => {
    setRowValue("");
    setIsOpen(!isOpen);
    setIsSubmit(true)
  };

  const getUserRoleValue = async () => {
    const roleData = await getUserRole();
    setUserRole(roleData);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  /**
   * Create Portal User
   *
   * @param data
   */

  let values = {
    page: Url.GetParam("page"),
    pageSize: Url.GetParam("pageSize"),
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
    search: Url.GetParam("search"),
  }

  const companyUserCreate = async (value) => {
    if (rowValue && rowValue?.id) {
      try {
        const data = new FormData();
        data.append("first_name", value.first_name);
        data.append("last_name", value.last_name);
        data.append("roleId", value.role && value.role.value);
        data.append("email", value.email);
        data.append("mobileNumber", value.mobileNumber);
        data.append("mobileNumber1", value.mobileNumber1);
        data.append("mobileNumber2", value.mobileNumber2);
        data.append("user_type", value.type && value.type.value);

        const response = await apiClient.put(
          `${endpoints().userAPI}/${rowValue.id}`,
          data
        );

        if (response && response.data) {
          const successMessage = response.data.message;
          Toast.success(successMessage);
          getDetails();
          dispatch(
            fetchList(Tabs.ACTIVE, `${endpoints().userAPI}/search`, values.page ? values.page : 1, values.pageSize ? values.pageSize : 25, {
              status: User.STATUS_ACTIVE_VALUE,
              search: Url.GetParam("search")
            })
          );
          dispatch(
            fetchList(Tabs.INACTIVE, `${endpoints().userAPI}/search`, values.page ? values.page : 1, values.pageSize ? values.pageSize : 25, {
              status: User.STATUS_INACTIVE_VALUE,
              search: Url.GetParam("search")
            })
          );
          dispatch(
            fetchList(Tabs.ALL, `${endpoints().userAPI}/search`, values.page ? values.page : 1, values.pageSize ? values.pageSize : 25, {
              status: "",
              search: Url.GetParam("search")
            })
          );
          _toggle();
          setRowValue("");
        }
      } catch (error) {
        if (isBadRequest(error)) {
          const errorMessage = error.response.data.message;
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
      }
    } else {
      try {
        dispatch(
          await CompanyUserService.create(value, {

            ...values
          })
        );
        _toggle();
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmit(false)
      }
    }
  };

  const actionMenuChange = async (selectedValue) => {
    if (selectedValue == "Make As InActive") {
      if (selectedUserIds && selectedUserIds.length > 0) {
        let bodyData = { userIds: selectedUserIds, status: 2 };
        dispatch(
          await UserService.bulkUpdate(bodyData, {
            tableId: activeTab,
            pagination: true,
          })
        );
      }
    } else if (selectedValue == "Make As Active") {
      if (selectedUserIds && selectedUserIds.length > 0) {
        let bodyData = { userIds: selectedUserIds, status: 1 };
        dispatch(
          await UserService.bulkUpdate(bodyData, {
            tableId: activeTab,
            pagination: true,
          })
        );
      }
    } else if (selectedValue == "Force Logout") {
      if (selectedUserIds && selectedUserIds.length > 0) {
        let bodyData = { userIds: selectedUserIds, forceLogout: true };

        dispatch(
          await UserService.bulkUpdate(bodyData, {
            tableId: activeTab,
            pagination: true,
          })
        );
      }
    } else if (selectedValue == "Force Sync") {
      if (selectedUserIds && selectedUserIds.length > 0) {
        let bodyData = { userIds: selectedUserIds, force_sync: true };

        dispatch(
          await UserService.bulkUpdate(bodyData, {
            tableId: activeTab,
            pagination: true,
          })
        );
      }
    }
  };

  const getDetails = async () => {
    const data = await CompanyUserService.get(rowValue && rowValue?.id);
    if (data) {
      setDetail(data);
    }
  };

  const handleBulkSelect = async (selectedIds) => {
    setUserIds(selectedIds);
  };

  const initialValues = {
    role: rowValue
      ? {
        label: rowValue?.role_name,
        value: rowValue?.role_id,
      }
      : "",
    first_name: rowValue?.first_name ? rowValue?.first_name : "",
    last_name: rowValue?.last_name ? rowValue?.last_name : "",
    email: rowValue?.email
      ? rowValue?.email
      : detail?.email
        ? detail?.email
        : "",
    date_of_joining: joiningDate
      ? DateTime.getTodayDateByUserTimeZone(joiningDate)
      : "",
    newPassword: "",
    type: {
      label: detail?.user_type,
      value: detail?.user_type ? detail?.user_type : "",
    },
    mobileNumber: rowValue?.mobileNumber1 ? rowValue?.mobileNumber1 : "",
    mobileNumber1: detail?.mobileNumber1 ? detail?.mobileNumber1 : "",
    mobileNumber2: "",
  };

  const addUserForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="first_name"
          label="First Name"
          placeholder="Enter First Name..."
          error=""
          fontBolded
          required={true}
        />
      </div>
      <div>
        <Text
          name="last_name"
          label="Last Name"
          placeholder="Enter Last Name..."
          fontBolded
        />
      </div>
      <div>
        <Text
          name="email"
          label="Email"
          placeholder="Enter User email..."
          fontBolded
        />
      </div>
      {!rowValue?.id && (
        <div>
          <Phone
            name="mobileNumber"
            label="Mobile Number"
            placeholder="Enter Mobile Number"
          />
        </div>
      )}
      {rowValue?.id && (
        <div>
          <Phone
            name="mobileNumber1"
            label="Mobile Number 1"
            placeholder="Enter Mobile Number"
          />
        </div>
      )}
      {rowValue?.id && (
        <div>
          <Phone
            name="mobileNumber2"
            label="Mobile Number 2"
            placeholder="Enter Mobile Number"
          />
        </div>
      )}
      {!rowValue?.id && (
        <div>
          <Password
            name="newPassword"
            label="Password"
            placeholder="Enter Password"
            required={true}
          />
        </div>
      )}
      <div>
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
      <div>
        <Select
          name="role"
          label="Role"
          placeholder="Select Role..."
          options={userRole ? userRole : []}
          error=""
          fontBolded
          required={true}
        />
      </div>

      {!rowValue?.id && (
        <div>
          <DateSelector
            label="Date of joining"
            name="date_of_joining"
            maxDate={new Date()}
            selected={joiningDate}
          />
        </div>
      )}
    </div>
  );

  useEffect(() => {
    getRolePermissions();
  }, []);

  const userFooter = (
    <>
      <SaveButton type="submit" loading={isSubmit == false} label={rowValue?.id ? "Save" : "Add"} />
    </>
  );

  const getRolePermissions = async () => {
    const permission = hasPermission(Permission.USER_ADD);
    setUserPermissionAdd(permission);
  };

  let renderUserList = (tableId, params) => {
    let data = params;
    data.page = Url.GetParam("page")
    data.pageSize = Url.GetParam("pageSize")

    const updatedParam = { ...data };
    return (
      <>
        <UserLists
          history={props.history}
          params={updatedParam}
          handleBulkSelect={handleBulkSelect}
          toggleSidebar={toggleSidebar}
          tableId={tableId}
          _toggle={_toggle}
          setRowValue={setRowValue}
          rowValue={rowValue}
          setDetail={setDetail}
          userRoleList={userRole}
          detail={detail}
          isQuickButton
        />
      </>
    );
  };

  return (
    <>
      <div className="row mx-1 justify-content-between">
        <PageTitle label="Users" />
        <div className="d-flex">
          {userPermissionAdd && (
            <AddButton
              className=" ml-3 mr-1"
              label="Add New"
              onClick={(e) => {
                _toggle(e);
              }}
            />
          )}
          <div className="pl-2">
            <SelectDropdown
              buttonLabel={"Actions"}
              hideCaret
              dropdownLinks={actionsMenuList}
              handleChange={actionMenuChange}
            />
          </div>
        </div>
      </div>

      <Drawer
        modelTitle={rowValue?.id ? "Edit User " : "Add User"}
        DrawerBody={addUserForm}
        DrawerFooter={userFooter}
        onSubmit={(values) => {
          companyUserCreate(values);
        }}
        initialValues={initialValues}
        enableReinitialize
        handleOpenModal={_toggle}
        handleCloseModal={closeToggle}
        handleDrawerClose={_toggle}
        isModalOpen={isOpen}
      />

      <NavTab list={NavTabList} />
      <TabContent activeTab={activeTab}>

        {/* activeTab */}
        {activeTab == Tabs.ACTIVE && (
          <TabPane tabId={Tabs.ACTIVE}>
            <div className="tab-content-wrapper">
              {renderUserList(Tabs.ACTIVE, {
                tab: Tabs.ACTIVE,
                role: Role?.value ? Role?.value : Url.GetParam("role"),
                status: User.STATUS_ACTIVE_VALUE,
                search: Url.GetParam("search")
              })}
            </div>
          </TabPane>
        )}

        {/* DraftTab */}
        {activeTab == Tabs.INACTIVE && (
          <TabPane tabId={Tabs.INACTIVE}>
            <div className="tab-content-wrapper">
              {renderUserList(Tabs.INACTIVE, {
                tab: Tabs.INACTIVE,
                status: User.STATUS_INACTIVE_VALUE,
                role: Role?.value ? Role?.value : "",
                search: Url.GetParam("search")
              })}
            </div>
          </TabPane>
        )}

        {/* AllTab */}
        {activeTab == Tabs.ALL && (
          <TabPane tabId={Tabs.ALL}>
            <div className="tab-content-wrapper">
              {renderUserList(Tabs.ALL, {
                tab: Tabs.ALL,
                status: "",
                role: Role?.value ? Role?.value : "",
                search: Url.GetParam("search")
              })}
            </div>
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

const mapStateToProps = (state) => {
  const { users } = state.table;
  const reduxTable = state.table;

  // Get All Users count
  const AllUsers =
    reduxTable[Tabs.ALL] && reduxTable[Tabs.ALL].isFetching == false
      ? reduxTable[Tabs.ALL].totalCount
      : 0;
  // Get Inactive Users count
  const InActiveUsers =
    reduxTable[Tabs.INACTIVE] && reduxTable[Tabs.INACTIVE].isFetching == false
      ? reduxTable[Tabs.INACTIVE].totalCount
      : 0;
  // Get Active Users count
  const ActiveUsers =
    reduxTable[Tabs.ACTIVE] && reduxTable[Tabs.ACTIVE].isFetching == false
      ? reduxTable[Tabs.ACTIVE].totalCount
      : 0;

  const sort = users && !users.isFetching ? users.sort : statusConstant.SORT;

  const sortDir =
    users && !users.isFetching ? users.sortDir : statusConstant.SORT_DIR;

  const pageSize =
    users && !users.isFetching ? users.pageSize : statusConstant.PAGESIZE;

  const currentPage =
    users && !users.isFetching ? users.currentPage : statusConstant.PAGE;

  const search = users && !users.isFetching ? users.search : "";

  const status =
    users && !users.isFetching ? users.status : statusConstant.ACTIVE;

  return {
    sort,
    sortDir,
    pageSize,
    currentPage,
    search,
    status,
    AllUsers,
    ActiveUsers,
    InActiveUsers,
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(UserList);
