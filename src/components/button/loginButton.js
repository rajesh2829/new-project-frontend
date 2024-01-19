import PropTypes from "prop-types";
import React from "react";
import { Button } from "reactstrap";

class LoginButton extends React.Component {
  render() {
    const { className, name} = this.props;

    return (
      <Button
        id={name || "Login"}
        type="submit"
        className={`w-100 btn btn-primary  ${className}`}
      >
        <span>{name || "Login"}</span>
      </Button>
    );
  }
}

LoginButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default LoginButton;
