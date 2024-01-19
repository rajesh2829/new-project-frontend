import {
  faEnvelope,
  faPlus,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    const {
      label,
      onClick,
      className,
      targetUrl,
      isDisabled,
      align,
      backgroundColor,
      color,
      BulkUpdateIcon,
    } = this.props;
    let style;
    if (this.state.isHovering) {
      style = {
        backgroundColor: backgroundColor ? backgroundColor : "#037EAE",
        color: color ? color : "white",
        borderRadius: "7px",
        fontSize: "14px",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    } else {
      style = {
        backgroundColor: backgroundColor ? backgroundColor : "#009DDA",
        color: color ? color : "white",
        borderRadius: "7px",
        fontSize: "14px",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    }

    return targetUrl ? (
      <Link
        id={label}
        to={targetUrl}
        className={`${className}h6-5-important`}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={style}
        onClick={onClick}
      >
        {BulkUpdateIcon ? (
          <div
            className="d-flex flex-column float-left"
            style={{ fontSize: "12px" }}
          >
            {" "}
            <FontAwesomeIcon icon={faUpload} />
          </div>
        ) : (
          <FontAwesomeIcon icon={faEnvelope} />
        )}
        <span className="font-weight-bold" style={{ marginLeft: "8px" }}>
          {label}
        </span>
      </Link>
    ) : (
      <Button
        id={label}
        type={"button"}
        className={`${className} ${align ? `float-${align}` : ""} ${
          isDisabled ? "disabled" : ""
        }`}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={style}
        onClick={onClick}
      >
        {BulkUpdateIcon ? (
          <div
            className="d-flex flex-column float-left"
            style={{ fontSize: "12px", marginBottom: "2px" }}
          >
            {" "}
            <FontAwesomeIcon icon={faUpload} />
          </div>
        ) : (
          <FontAwesomeIcon icon={faEnvelope} />
        )}

        <span className="add-button">{label}</span>
      </Button>
    );
  }
}

SendMessage.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  targetUrl: PropTypes.string,
  align: "left" | "right",
};

export default SendMessage;
