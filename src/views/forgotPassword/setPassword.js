import React from "react";
import { Card, CardBody } from "reactstrap";
import toast from "../../components/Toast";

// Components
import Form from "../../components/Form";
import Password from "../../components/Password";
import Button from "../../components/Button";

// Helper
import { setCookie } from "../../lib/Helper";

import * as cookieConstant from "../../lib/Cookie";

// API call
import { apiClient } from "../../apiClient";

// Configs
import { endpoints } from "../../api/endPoints";
import { isBadRequest } from "../../lib/Http";

// Helper
import {
  getKeyValueByObject,
  validateStrongPassword,
} from "../../lib/Helper";
import {
  getUrlParameter,
} from "../../lib/Url";

//Constant
import { Setting } from "../../helpers/Setting";

class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      errorMessage: "",
    };
    this._userSetPassword = this._userSetPassword.bind(this);
    this._updateDimensions = this._updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this._updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._updateDimensions);
  }

  // Update the screen height
  _updateDimensions() {
    this.setState({
      height: window.innerHeight,
    });
  }

  // Set password API call
  _userSetPassword(data) {
    const token = getUrlParameter("token");
    apiClient
      .put(`${endpoints().userAPI}/setPassword?token=${token}`, data)
      .then((response) => {
        console.log("errormessage", response);
        let { token, userId, roleId } = response.data;
        setCookie(cookieConstant.COOKIE_SESSION_TOKEN, token);
        window.location = "/dashboard";
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          this.setState({
            errorMessage,
          });
          console.error(errorMessage);
        }
      });
  }

  // Reset the error message
  _hideErrorMessage = () => {
    this.setState({ errorMessage: "" });
  };

  render() {
    const cardCenter = (this.state.height / 100) * 30;
    const { errorMessage, height } = this.state;

    const settingsData =
      this.props && this.props.settings && this.props.settings.settings;

    const portalLogo = settingsData
      ? getKeyValueByObject(
        settingsData,
        Setting.SETTING_PORTAL_LOGO_URL
      )
      : "";

    const renderSetPasswordForm = (
      <div className={`${errorMessage ? "mb-2" : "mb-4"}`}>
        <div className="mb-4">
          <Password
            name="password"
            placeholder="Password"
            onKeyDown={this._hideErrorMessage}
            required
          />
        </div>

        <div className={`${errorMessage ? "mb-n1" : "mb-2"}`}>
          <Password
            name="confirmPassword"
            placeholder="Confirm Password"
            onKeyDown={this._hideErrorMessage}
            required
          />
          <div className={`${errorMessage ? "mt-n3" : "mb-2"}`}>
            <span
              className={` forget-size ${errorMessage ? "text-danger" : ""}`}
            >
              {errorMessage}
            </span>
          </div>
        </div>
      </div>
    );

    const initialValues = {
      password: "",
      confirmPassword: "",
    };

    return (
      <div>
        <div className="container-fluid" style={{ height: height }}>
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-lg-5 col-md-7 col-sm-12"
                style={{ paddingTop: cardCenter }}
              >
                <Card className="w-75 mx-auto rounded">
                  <div className="mx-auto mt-3">
                    {portalLogo && (
                      <img
                        src={portalLogo}
                        className="jss1557 mt-3"
                        height="29"
                        alt="logo"
                      />
                    )}
                  </div>

                  <Form
                    initialValues={initialValues}
                    onSubmit={(values) => {
                      values.password = values.password
                        ? values.password
                        : null;
                      values.confirmPassword = values.confirmPassword
                        ? values.confirmPassword
                        : null;

                      const passwordError = values.password
                        ? validateStrongPassword(values.password)
                        : "";

                      if (passwordError) {
                        this.setState({
                          errorMessage: passwordError,
                        });
                        return false;
                      }
                      if (
                        values.password &&
                        values.confirmPassword &&
                        values.password !== values.confirmPassword
                      ) {
                        this.setState({
                          errorMessage: "Confirm password did not match",
                        });
                        return false;
                      } else if (!values.password || !values.confirmPassword) {
                        this.setState({ errorMessage: "" });
                      }

                      this._userSetPassword(values);
                      return false;
                    }}
                  >
                    <CardBody className="pb-0">
                      <div className="text-center pb-2">
                        <small className="font-weight-bold">
                          Create a new password below.
                        </small>
                      </div>
                      {renderSetPasswordForm}
                    </CardBody>
                    <div className="pr-2">
                      <Button
                        type="submit"
                        color="#E0674C"
                        hoverColor="#ff876c"
                        label="Submit"
                        className="rounded-0 text-white w-100 font-weight-bold"
                      />
                    </div>
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SetPassword;
