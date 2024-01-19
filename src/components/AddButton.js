import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class AddButton extends React.Component {
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
      toUrl,
      onFocus,
      disableLabel
    } = this.props;
    let style;
    if (this.state.isHovering) {
      style = {
        backgroundColor: backgroundColor ? backgroundColor : "var(--add-button-bg-color)",
        color: color ? color : "var(--add-button-text-color)",
        borderRadius: "7px",
        fontSize: "14px",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    } else {
      style = {
        backgroundColor: backgroundColor ? backgroundColor : "var(--add-button-bg-color)",
        color: color ? color : "var(--add-button-text-color)",
        borderRadius: "7px",
        fontSize: "14px",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    }

    if(!label){
      style.height = "40px";
      style.width = "40px"
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
        onFocus={onFocus}
      >
        {BulkUpdateIcon ? (
          <div>
            {" "}
            <FontAwesomeIcon icon={faUpload} />
          </div>
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
        <span className="font-weight-bold">
          {label}
        </span>
      </Link>
    ) : (
      <Link to={toUrl} target={this.props.target ? this.props.target : ""}>
        <Button
          id={label}
          type={"button"}
          className={`${className} ${align ? `float-${align}` : ""} ${isDisabled ? "disabled" : ""
            } mr-1`}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          style={style}
          onClick={onClick}
          onFocus={onFocus}
        >
          {BulkUpdateIcon ? (
            <div>
              {" "}
              <FontAwesomeIcon icon={faUpload} />
            </div>
          ) : (
            <FontAwesomeIcon
              id={label}
              icon={faPlus}
              style={{ fontSize: label ? "12px" : "14px", marginLeft : label ? "8px" : "" }}
            />
          )}
          {label && (
            <span className="add-button">{isDisabled ? disableLabel:label}</span>
          )}
        </Button>
      </Link>
    );
  }
}

AddButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  targetUrl: PropTypes.string,
  align: "left" | "right",
};

export default AddButton;
