import React from "react";
import { Button as ReactButton } from "reactstrap";

class Button extends React.Component {
  state = {
    color: this.props.color || "",
    minWidth: this.props.minWidth || "",
    maxWidth: this.props.maxWidth || "",
  };

  hoverIn = () => {
    this.setState({ color: this.props.hoverColor || this.props.color });
  };

  hoverOut = () => {
    this.setState({ color: this.props.color });
  };

  render() {
    const {
      id,
      size,
      active,
      disabled,
      outline,
      type,
      className,
      onClick,
      icon,
      hideTextInMobile,
      block,
      label,
      fontSize,
      align,
      ticketCreate,
      loadingLabel
    } = this.props;

    return (
      <ReactButton
        id={id || label}
        size={size}
        active={active}
        disabled={disabled}
        outline={outline}
        onClick={onClick}
        type={type || "button"}
        block={block}
        className={`float-${align} ${className}`}
        style={{
          backgroundColor: this.state.color,
          borderColor: this.state.color,
          minWidth: this.state.minWidth,
          maxWidth: this.state.maxWidth,
        }}
        onMouseEnter={this.hoverIn}
        onMouseLeave={this.hoverOut}
      >
        {hideTextInMobile && (
          <span className={"d-none d-sm-none d-md-inline-block"}>
            {icon && (
              <i style={icon ? { marginRight: 5 } : {}} className={icon} />
            )}
            {hideTextInMobile}
          </span>
        )}
        {label && (
          <span
            className={
              hideTextInMobile
                ? "d-block d-sm-block d-md-none d-lg-none d-lg-none"
                : ""
            }
            style={fontSize}
          >
            {icon ? (
              <i style={icon ? { marginRight: 5 } : {}} className={icon} />
            ) : (
              <i className=" pr-1" />
            )}
            {ticketCreate ? (
              <span className="add-button">{disabled ? loadingLabel : label}</span>
            ) : (
              <span className="add-button">{disabled ? loadingLabel : label}</span>

            )}
          </span>
        )}
      </ReactButton>
    );
  }
}

export default Button;
