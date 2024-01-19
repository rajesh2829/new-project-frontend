import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class Hint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };

  render() {
    const { tooltipOpen } = this.state;
    const { id, hintText, tooltipText } = this.props;

    return (
      <div className="inline-tooltip-wrapper">
        <span
          id={`${id}-tooltip`}
          className="text-primary d-flex align-items-start text-sm"
        >
          <FontAwesomeIcon icon={faCircleInfo} /> {hintText}
        </span>
        {tooltipText ? (
          <Tooltip
            id={id || tooltipText}
            placement="left"
            isOpen={tooltipOpen}
            target={`${id}-tooltip`}
            toggle={this.toggleTooltip}
          >
            {tooltipText}
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Hint;
