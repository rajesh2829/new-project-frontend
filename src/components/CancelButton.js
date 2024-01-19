import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class CancelButton extends React.Component {
  render() {
    const { onClick, className, name, width } = this.props;

    return (
      <Button
        id={name || "Cancel"}
        outline
        onClick={onClick}
        type="button"
        className={`m-1 ${className}`}
        style={{
          borderRadius: "7px",
          width: width ? width : "90px",
          fontSize: ".875rem",
        }}
      >
        <span>{name || "Cancel"}</span>
      </Button>
    );
  }
}

CancelButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default CancelButton;
