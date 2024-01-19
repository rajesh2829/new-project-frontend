import classnames from "classnames";
import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";

//ASction
import { fetchUserDetail } from "../../actions/user";

// API call
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";

// Components
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import toast from "../../components/Toast";

// Configs
import { endpoints } from "../../api/endPoints";
import {
  COOKIE_SESSION_TOKEN,
} from "../../lib/Cookie";

// Helper
import {
  setCookie,
  toString,
} from "../../lib/Helper";

import Url from "../../lib/Url";
import UploadAvatar from "./components/uploadAvatar";
import EditGeneralDetail from "./editGeneralDetail";

//Pages
import EditSecurityDetail from "./editSecurityDetail";

export const Tab = {
  PROFILE_GENERAL_TAB: "General",
  PROFILE_SECURITY_TAB: "Password",
};

class editMyGeneralProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      userId: "",
      isLoading: false,
      activeTab: Tab.PROFILE_GENERAL_TAB,
      file: "",
      email: "",
      passwordErrors: {
        confirmPasswordError: "",
        currentPasswordError: "",
      },
    };
  }

  componentDidMount = () => {
    this.setActiveTab();
    this._getUserDetails();
  };

  componentDidUpdate(prevProps) {
    const { search } = prevProps.history.location;
    const params = new URLSearchParams(search);
    const section = params.get("section");
    // Set current active tab
    if (this.state.currentSection !== section) {
      this.setState({
        currentSection: section,
        activeTab: section,
      });
    }
  }

  _submitGenral = (values) => {
    if (this._validateFields(values) === false) {
      return;
    }
    this._updateProfile(this._toArray(values));
  };
  _submitSecurity = (values) => {
    values.newPassword = values.newPassword ? values.newPassword : null;
    values.confirmPassword = values.confirmPassword
      ? values.confirmPassword
      : null;

    if (
      values.currentPassword &&
      values.newPassword &&
      values.confirmPassword &&
      values.newPassword !== values.confirmPassword
    ) {
      this.setState({
        passwordErrors: {
          confirmPasswordError: "Confirm password did not match",
        },
      });
      return false;
    } else if (!values.newPassword || !values.confirmPassword) {
      this.setState({
        passwordErrors: {
          confirmPasswordError: "",
        },
      });
    }

    this.setState({
      passwordErrors: {},
    });

    this._updateProfile(this._toArray(values));
  };

  // delete user profile avatar
  _deleteUserProfile() {
    let id = this.state.userId;
    return apiClient
      .delete(`${endpoints().userAPI}/avatar/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
        toast.success(successMessage);

        this.props.actions.fetchUserDetail();
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  }

  // Validate Fields
  _validateFields(values) {
    let success = true;

    // define user constants
    const email = values.email;
    const name = values.name;
    const lastName = values.lastName;

    if (!email || !name || !lastName) {
      success = false;
    }

    return success;
  }

  // To Array
  _toArray(values) {
    const name = toString(values.name);
    const lastName = toString(values.lastName);
    const email = toString(values.email);
    const avatarUrl = toString(values.avatarUrl);
    const avatar = toString(values.avatar);

    values.name = name;
    values.lastName = lastName;
    values.email = email;
    values.currentPassword = toString(values.currentPassword);
    values.newPassword = toString(values.newPassword);
    const data = {
      name: name,
      lastName: lastName,
      email: email,
      avatar: avatar,
      avatarUrl: avatarUrl,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      roleId: values.roleId,
    };
    return data;
  }

  // User update API Call
  _updateProfile(data) {
    return apiClient
      .put(`${endpoints().userAPI}`, data)
      .then((response) => {
        let successMessage;
        let token;
        let userId;
        let role;
        if (response && response.data) {
          successMessage = response.data.message;
          token = response.data.token;
          userId = response.data.userId;
          role = response.data.role;
          toast.success(successMessage);
        }
        if (data.newPassword) {
          setCookie(COOKIE_SESSION_TOKEN, token);
          // return this.props.history.push("/dashboard");
        }

        this.props.actions.fetchUserDetail();
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          this.setState({
            passwordErrors: {
              currentPasswordError: error.response.data.message,
            },
          });
          console.error(errorMessage);
        }
      });
  }

  // User details api call by id
  _getUserDetails = () => {
    return apiClient
      .get(`${endpoints().userAPI}/`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
        this.setState({
          userDetails: response.data,
          isLoading: true,
          userId: response.data.id,
        });
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  };

  // Toggle Tab
  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  _handleTabChange(tab) {
    this.props.history.push(`?tab=${tab}`);
  }

  setActiveTab = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const status = params.get("section");
    if (status === null) {
      this._handleTabChange(Tab.PROFILE_GENERAL_TAB);
    } else {
      this.toggle(status);
    }
  };

  handlePasswordChange = (e) => {
    if (e.values && !e.values.confirmPassword) {
      this.setState({
        passwordErrors: {
          confirmPasswordError: "",
        },
      });
    }
  };

  // Handle Image
  handleImage = (file) => {
    this.setState({ file });
  };

  render() {
    if (!this.state.isLoading) {
      return "";
    }

    const { history } = this.props;
    const { userDetails, activeTab, passwordErrors } = this.state;

    const { name, lastName, email, mobile, avatarUrl, avatar, id } = userDetails;

    const initialValues = {
      name,
      lastName,
      email,
      mobile,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    const searchStatus = Url.GetParam("tab");
    const isGeneral = searchStatus === Tab.PROFILE_GENERAL_TAB;
    const isSecurity = searchStatus === Tab.PROFILE_SECURITY_TAB;

    return (
      <div>
        <PageTitle label="Edit Profile" />
        <div className="row links text-center table-filter ml-1 mt-3 mr-3">
          {!activeTab && (
            <Redirect
              to={`/edit/profile?tab=${Tab.PROFILE_GENERAL_TAB}`}
            />
          )}
          <Nav tabs className="admin-tabs">
            {/* General Tab */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: isGeneral,
                })}
                onClick={() => {
                  this.toggle(Tab.PROFILE_GENERAL_TAB);
                  this._handleTabChange(Tab.PROFILE_GENERAL_TAB);
                }}
              >
                {Tab.PROFILE_GENERAL_TAB}
              </NavLink>
            </NavItem>
            {/* Email Tab */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: isSecurity,
                })}
                onClick={() => {
                  this.toggle(Tab.PROFILE_SECURITY_TAB);
                  this._handleTabChange(Tab.PROFILE_SECURITY_TAB);
                }}
              >
                {Tab.PROFILE_SECURITY_TAB}
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={Tab.PROFILE_GENERAL_TAB}>
            <Form
              initialValues={initialValues}
              onSubmit={(values) => {
                this._submitGenral(values);
              }}
            >
              <div className="card bg-white mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <EditGeneralDetail />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3 center-block text-center">
                      <UploadAvatar
                        apiURL={`${endpoints().userAvatarUpdate}`}
                        data={userDetails}
                        getFile={this.handleImage}
                        userId={id}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <SaveButton />

              <CancelButton onClick={() => history.push("/dashboard")} />

            </Form>
          </TabPane>

          <TabPane tabId={Tab.PROFILE_SECURITY_TAB}>
            <Form
              initialValues={initialValues}
              onSubmit={(values) => {
                this._submitSecurity(values);
              }}
            >
              <div className="card bg-white mb-3">
                <div className="card-body">
                  <EditSecurityDetail
                    isSecurity={
                      isSecurity == Tab.PROFILE_SECURITY_TAB
                    }
                    handlePasswordChange={(e) => {
                      this.handlePasswordChange(e);
                    }}
                    errorMessage={passwordErrors}
                  />
                </div>
              </div>

              <SaveButton />

              <CancelButton onClick={() => history.push("/dashboard")} />

            </Form>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const avatar = user && !user.isFetching ? user.avatar : "";
  const avatarUrl = user && !user.isFetching ? user.avatarUrl : "";
  return { state, avatar, avatarUrl };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ fetchUserDetail }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editMyGeneralProfile);
