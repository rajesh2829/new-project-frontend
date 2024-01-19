import React from "react";

// Components
import Form from "../../components/Form";
import toast from "../../components/Toast";

//Pages
import LoginByPasswordForm from "./loginByPasswordForm";

//Context
import UserContext from "../../context/userContext/userContext";

//API
import { apiClient } from "../../apiClient";

// Configs
import { endpoints } from "../../api/endPoints";
import Cookies, { setCookie } from "../../lib/Helper";
import { getUrlParameter } from "../../lib/Url";

import { isBadRequest } from "../../lib/Http";
import {
  COOKIE_SESSION_TOKEN,
  COOKIE_TIME_ZONE
} from "../../lib/Cookie";
import { getRolePermissionList } from "../../actions/userSetting";
import Permission from "../../lib/Permission";
import { getMenuList, getThemeList } from "../../services/SettingService";
import { Local } from "../../helpers/LocalStorage";
class BasicLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      showSecondaryPortalRedirectModel: false,
      data: {},
      permissionList: ""
    };
  }

  componentDidMount() {
    this.setState({ redirect: typeof this.props.redirect === "function" });
  }

  _handleLogin = (values, redirect, context, forceSecondaryApiLogin) => {
    this._userLogin(values, redirect, context, forceSecondaryApiLogin).then(
      (res) => {
        return (
          res &&
          Object.keys(res).map((key) => {
            // Setting Login Error Message
            if (key === "errorMessage") {
              this.setState({ errorMessage: "Invalid Email or Password" });
            }

            if (key === "successMessage" && this.state.redirect) {
              context.loginUser();
              this.props.redirect();
            }
          })
        );
      }
    );
  };

  setHeaders = () => {
    if (Cookies.get(COOKIE_SESSION_TOKEN)) {
      apiClient.defaults.headers.common.Authorization =
        Cookies.get(COOKIE_SESSION_TOKEN);
    } else {
      apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
    }
  };

  // Login with username and password
  _userLogin(data, redirect = false, context) {
    return apiClient
      .post(`${endpoints().userAPI}/loginByPassword`, data)
      .then(async (response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        const {
          token,
          role,
          id,
          email,
          firstName,
          lastName,
          portal_name,
          time_zone,
          companyId
        } = response?.data?.user;
        const fullName = firstName + " " + lastName;
        setCookie(COOKIE_SESSION_TOKEN, token);
        if (time_zone) {
          setCookie(COOKIE_TIME_ZONE, time_zone);
        }
        this.setHeaders();
        this.setState({ errorMessage: "" });
        if (role) {
          const permissionList = await getRolePermissionList(role);
          var values = permissionList.map((obj) => obj.value);

          // Convert the array to a comma-separated string
          var valuesString = values.join(",");

          localStorage.setItem(Permission.USER_ROLE, valuesString);

          let settingThemeList = await getThemeList();

          const list = [];
          if (settingThemeList && settingThemeList.length > 0) {
            settingThemeList.forEach((data) => {
              list.push({
                value: data.value,
                name: data.name
              });
            });
          }
          const data = JSON.stringify(list);

          localStorage.setItem(Local.THEME, data);
          let settingMenuList = await getMenuList();
          if (settingMenuList && settingMenuList.length > 0) {

            var menuList = settingMenuList.map((obj) => obj.name);

            // Convert the array to a comma-separated string
            var menuData = menuList.join(",");

            localStorage.setItem(Local.MENU, menuData);

          }
          const baseUrl = window.location.origin;

          let response = await apiClient.get(
            `${endpoints().companyAPI}/list?url=${baseUrl}`
          );

          const companyData = [];
          if (response && response.data && response.data.data.length > 0) {
            response.data.data.forEach((data) => {
              companyData.push({
                id: data.id,
                value: data.id,
                portal_url: data.portal_url,
                company_name: data.company_name,
                template: data.template
              });
            });
          }
          const company = JSON.stringify(companyData);

          localStorage.setItem(Local.COMPANY, company);
        }
        const redirectUrl = getUrlParameter("redirect");
        // Resetting Error Message

        if (redirectUrl == "/admin") {
          window.location.replace(`/admin/portal`);
        } else if (redirectUrl) {
          window.location.replace(redirectUrl);
        } else if (!redirect) {
          window.location.replace("/mydashboard");
        }

        return { successMessage, email, firstName, lastName } || {};
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
            toast.error(error.response.data.message);
          }
          return { errorMessage } || {};
        }
      });
  }

  render() {
    const email = getUrlParameter("email");
    const initialValues = {
      email: email || "",
      password: ""
    };
    const { errorMessage } = this.state;

    return (
      <UserContext.Consumer>
        {(context) => (
          <Form
            initialValues={initialValues}
            onSubmit={(values) => {
              values.email = values.email ? values.email : null;
              values.password = values.password ? values.password : null;
              this._handleLogin(values, this.state.redirect, context, false);
              return false;
            }}>
            <LoginByPasswordForm errorMessage={errorMessage} />
          </Form>
        )}
      </UserContext.Consumer>
    );
  }
}

export default BasicLoginForm;
