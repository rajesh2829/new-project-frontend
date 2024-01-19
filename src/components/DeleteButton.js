import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class DeleteButton extends React.Component {
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
    const { label, onClick, loading, className, type, id } = this.props;
    let style;
    if (this.state.isHovering) {
      style = {
        backgroundColor: "var(--delete-button-bg-color)",
        color: "text-white",
        borderRadius: "7px",
        fontSize: "14px",
        border: "1px solid var(--delete-button-bg-color)",
      };
    } else {
      style = {
        backgroundColor: "transparent",
        color: "var(--delete-button-bg-color)",
        fontSize: "14px",
        borderRadius: "7px",
        border: "1px solid var(--delete-button-bg-color)",
      };
    }
    return (
      <Button
        id={id || label}
        className={className}
        disabled={loading}
        onClick={onClick}
        type={type ? type : "button"}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={style}
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="mr-2"
        />
        <span id={id + "Item"} className="delete-button">
          {loading ? "Delete" : label ? label : "Delete"}
        </span>
      </Button>
    );
  }
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  loading: PropTypes.bool,
};

export default DeleteButton;
