import React from "react";
import PropTypes from "prop-types";

import { Button, Spinner } from "reactstrap";

class SaveButton extends React.Component {
  state = {
    showLoader: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && this.props.loading) {
      this.setState({ showLoader: true });

      setTimeout(() => {
        this.setState({ showLoader: false });
      }, 2000);
    }
  }
  render() {
    const { onClick, loading, fontSize, className, align, isClicked, id, type, label, minWidth, disabled } =
      this.props;

    const { showLoader } = this.state;

    return (
      <Button
        id={id}
        disabled={disabled || loading}
        onClick={onClick}
        type={type ? type : "submit"}
        className={` float-${align} ${className}`}
        style={{
          borderRadius: "7px",
          minWidth: minWidth ? minWidth : "90px",
          fontSize: fontSize ? fontSize : ".875rem",
          lineHeight: "1.25rem",
          padding: ".5rem 1.25rem",
        }}
      >
        {showLoader ? (
          <span className="spinner">{label}...</span>
        ) : (
          <span style={{ marginBottom: "5px" }}>
            {label ? label : (loading ? "Saving..." : "Save")}
          </span>
        )}
      </Button>
    );
  }
}

SaveButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SaveButton;
