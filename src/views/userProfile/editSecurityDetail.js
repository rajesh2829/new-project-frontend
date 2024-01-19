import React, { Component } from "react";

// Components
import Password from "../../components/Password";

class EditSecurityDetail extends Component {
  // Render the form fields
  render() {
    const { errorMessage, isSecurityTab } = this.props;
    const { currentPasswordError, confirmPasswordError } = errorMessage;
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <Password
              name="currentPassword"
              label="Current Password"
              placeholder="Enter Current Password"
              required={isSecurityTab}
              error=""
            />
          </div>
          <div
            className={`${errorMessage ? "col-lg-12 col-sm-12 mt-n3" : "mb-2"}`}
          >
            <span
              style={{ fontSize: "0.75rem" }}
              className={currentPasswordError ? "error-message" : ""}
            >
              {currentPasswordError}
            </span>
          </div>
          <div className="col-lg-12 col-sm-12">
            <Password
              name="newPassword"
              label="New Password"
              placeholder="Enter New Password"
              required={isSecurityTab}
              error=""
            />
          </div>

          <div className="col-lg-12 col-sm-12">
            <Password
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              required={isSecurityTab}
              error=""
              onInputChange={this.props.handlePasswordChange}
            />
          </div>
          <div
            className={`${errorMessage ? "col-lg-12 col-sm-12 mt-n3" : "mb-2"}`}
          >
            <span
              style={{ fontSize: "0.75rem" }}
              className={confirmPasswordError ? "error-message" : ""}
            >
              {confirmPasswordError}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default EditSecurityDetail;
