import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Email from "../../../components/Email";
import Form from "../../../components/Form";
import Password from "../../../components/Password";
import Phone from "../../../components/Phone";
import SaveButton from "../../../components/SaveButton";
import Spinner from "../../../components/Spinner";
import Text from "../../../components/Text";
import { validateStrongPassword } from "../../../lib/Helper";
import CompanyUserService from "../../../services/UserService";
import SuccessModel from "../components/SuccessModel";

const EcommSignUpPage = (props) => {
  let { history } = props;

  const [isNewPassword, setIsNewPassword] = useState();
  const [strongPasswordError, setStrongPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isConfirmPassword, setIsConfirmPassword] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let dispatch = useDispatch();
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

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    values.newPassword = isNewPassword;
    values.confirmPassword = isConfirmPassword;
    let data = new FormData();
    data.append("name", values && values?.name);
    data.append("mobile", values && values?.mobile);
    data.append("email", values && values?.email);
    data.append("newPassword", values && values?.newPassword);
    data.append("confirmPassword", values && values?.confirmPassword);
    data.append("baseUrl", window.location.origin);
    dispatch(
      await CompanyUserService.signUp(data, (res) => {
        if (res) {
          setIsLoading(true);
          toggle();
          setIsLoading(false);
        }
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <SuccessModel
        isOpen={isOpen}
        toggle={toggle}
        name="Your Account Register Successfully"
      />
      <div
        className="container divMiddle  d-flex justify-content-center"
        style={{ height: "100vh", alignItems: "center" }}
      >
        <div className="col-sm-6">
          <h1
            className="justify-content-center d-flex text-white"
            style={{ fontSize: "-webkit-xxx-large" }}
          >
            Sign Up
          </h1>
          <Form
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            <div className="form-wrapper justify-content-center d-flex flex-column card card-body">
              <Text
                name="name"
                label="Name"
                placeholder="Enter name"
                required={true}
                error=""
                className="mb-4"
              />
              <div className="mb-3">
                <Phone
                  name="mobile"
                  label="Mobile Number"
                  placeholder="Enter Mobile Number"
                  error=""
                  required={true}
                />
              </div>
              <Email
                name="email"
                label="Email Address"
                placeholder="Enter email"
              />

              <Password
                name="newPassword"
                label="New Password"
                placeholder="Enter New Password"
                onInputChange={(e) => {
                  handleNewPasswordChange(e);
                }}
                error={strongPasswordError}
                required
              />
              <Password
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter Confirm Password"
                onInputChange={(e) => {
                  handlePasswordChange(e);
                }}
                error={confirmPasswordError}
                required
              />
              <SaveButton label="Sign Up" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default EcommSignUpPage;
