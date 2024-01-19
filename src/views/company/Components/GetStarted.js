import React from "react";
import Checkbox from "../../../components/Checkbox";
import Email from "../../../components/Email";
import Password from "../../../components/Password";
import Text from "../../../components/Text";
import { Link } from "react-router-dom";

class GetStarted extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptTerms: false,
      required: false,
    };
  }

  render() {
    const { marketplaceName, encryptedUserId } = this.props;

    const { required } = this.state;

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="content-wrapper">
          <div className="title-wrapper text-center">
            <h3 className="font-weight-bold">
              {/* {partnerSignupWelcomeMessage} */}
              Join {marketplaceName} on Thidiff
            </h3>
          </div>
          <div className="login-form-inline-title">
            <p>or signup with email</p>
          </div>

          <div className="font-weight-bold">
            <Text
              name="firstName"
              label="First Name"
              placeholder="First Name"
              error=""
              {...{ required }}
            />
            <Text
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              error=""
              {...{ required }}
            />
          </div>

          <div className="field-wrapper">
            <Email
              name="email"
              label="Email Address"
              placeholder="Work Email Address"
              {...{ required }}
              disabled={encryptedUserId ? true : false}
            />
          </div>
          <div className="field-wrapper">
            <Password
              name="password"
              label="Password"
              placeholder="Password"
              required={true}
              error={
                this.props.passwordMismatchError
                  ? this.props.passwordMismatchError
                  : ""
              }
              strongPassword={
                this.props.passwordMismatchError ===
                "Please choose stronger password"
              }
              {...{ required }}
            />
          </div>
          <div className="field-wrapper">
            <Password
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              required={true}
              {...{ required }}
            />
          </div>
          <div className="field-wrapper position-relative">
            <Checkbox
              name="acceptTerms"
              label="I have read and accept the"
              required={true}
              error="You must accept the terms and conditions"
              className={"validation accepted-terms mr-3 my-1"}
            />{" "}
            <a
              className="term-and-condition cursor-pointer mx-1"
              href={"http://google.com/terms-of-service"}
              target="_blank"
            >
              terms and conditions
            </a>
          </div>
          <p className="term-and-condition pt-3 mt-2">
            By agreeing to these terms, you agree that Thidiff may share any User
            Content with {marketplaceName}, including your name, location, contact
            information and any other information to permit {marketplaceName}’s
            solicitation of your business.
          </p>
          <div className="btn-wrapper mt-4-5">
            <button
              id="btn-getstarted"
              className="btn btn-login w-100"
              type="submit"
              onClick={() => {
                this.setState({ required: true });
                // return this.props.next();
              }}
            >
              Get Started
            </button>
            <div className="mb-4 mt-2">
              <span>Have an account </span>
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </div>
          {/* /.btn-wrapper */}
        </div>
      </div>
    );
  }
}

export default GetStarted;
