import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../../components/button/loginButton";
import Checkbox from "../../components/Checkbox";
import Email from "../../components/Email";
import Password from "../../components/Password";
import Text from "../../components/Text";
class LoginByPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
    this._hideErrorMessage = this._hideErrorMessage.bind(this);
  }

  // Hide Error Message
  _hideErrorMessage = () => {
    this.setState({ errorMessage: "" });
  };

  componentWillReceiveProps(nextProps) {
    // Set Login Error Message
    if (
      nextProps.errorMessage &&
      nextProps.errorMessage !== this.state.errorMessage
    ) {
      this.setState({ errorMessage: nextProps.errorMessage });
    } else {
      this.setState({ errorMessage: "" });
    }
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="mb-3">
        <div className="mb-3">
          <Text
            name="email"
            placeholder="Email Address or Mobile Number"
            required
          />
        </div>
        <div className="mb-3">
          <Password
            name="password"
            placeholder="Password"
            onKeyDown={this._hideErrorMessage}
            required
          />
        </div>
        <span
          id="invalid Email-or-Password"
          className={errorMessage ? "error-message" : ""}
        >
          {errorMessage}
        </span>
        <div className="mb-3 d-flex justify-content-between">
          <Checkbox
            name="rememberPassword"
            label="Remember my username"
            className="accepted-terms mr-3"
          />
          <Link to="/forgot-password" className="accepted-terms">
            <span className="pl-0 text-info">Forgot password?</span>
          </Link>
        </div>
        <div className="text-center">
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default LoginByPasswordForm;
