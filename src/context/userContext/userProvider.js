import React, { Component } from "react";
import UserContext from "./userContext";

// API Client
import { apiClient } from "../../apiClient";

// Library
import Cookies from "../../lib/Helper";
import { clearAllCookies, COOKIE_SESSION_TOKEN } from "../../lib/Cookie";

// Configs
import { endpoints } from "../../api/endPoints";

// Constant
import { isBadRequest } from "../../lib/Http";

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.setToken();
    this.state = {
      userLoggedIn: false,
      token: null,
      user: {
        firstName: "",
        lastName: "",
        avatarUrl: "",
        userId: "",
      },
    };
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.setToken();
    this.getToken();
    this.userLoggedIn().then((_) => {
      this.state.userLoggedIn && this.getUserDetails();
    });
  }

  loginUser() {
    this.setState(
      {
        userLoggedIn:
          Cookies.get(COOKIE_SESSION_TOKEN) !== undefined &&
          Cookies.get(COOKIE_SESSION_TOKEN) !== "",
      },
      () => {
        this.getToken();
        this.getUserDetails();
      }
    );
  }

  logoutUser() {
    // Create Logout Activity
    apiClient.defaults.headers.common.Authorization = null;
    clearAllCookies();
    return window.location.replace("/login");
  }

  async userLoggedIn() {
    await this.setState({
      userLoggedIn:
        Cookies.get(COOKIE_SESSION_TOKEN) !== undefined &&
        Cookies.get(COOKIE_SESSION_TOKEN) !== "",
    });
  }

  async getUserDetails() {
    try {
      this.setToken();
      let response = await apiClient.get(`${endpoints().userAPI}/`);
      const { id, name, lastName, avatarUrl, roleText } = response.data;

      this.setState({
        user: {
          firstName: name,
          lastName,
          avatarUrl: avatarUrl,
          userId: id,
          roleText: roleText,
        },
      });
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
          document.getElementById("sign-out").click();
        }
        console.error(errorMessage);
      }
    }
  }

  _getUserDetailsById = (id) => {
    return apiClient
      .get(`${endpoints().userAPI}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          return { error: true };
        }
      });
  };

  setToken() {
    // this hack is required for unknown reasons which was taken over from Thidiff Team.
    // This will be discussed in the upcoming call and we'll have this working properly.
    return (apiClient.defaults.headers.common.Authorization =
      Cookies.get(COOKIE_SESSION_TOKEN));
  }

  getToken() {
    const token = Cookies.get(COOKIE_SESSION_TOKEN);
    this.setState({
      token:
        apiClient.defaults.headers.common.Authorization === token
          ? token
          : apiClient.defaults.headers.common.Authorization,
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logoutUser: this.logoutUser,
          _getUserDetailsById: this._getUserDetailsById,
          loginUser: this.loginUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
