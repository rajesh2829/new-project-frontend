import React from "react";
import SVG from "react-inlinesvg";
import Button from "./Button";

const NoRecordsFound = (props) => {
  const {
    topHeight,
    middleHeight,
    hideCard,
    icon,
    iconClass,
    description,
    message,
    buttonLabel,
    buttonLink,
    buttonIcon,
    position,
    showMessage,
    boldMessage,
  } = props;

  const top = topHeight ? topHeight : "9vh";
  const middle = middleHeight ? middleHeight : "30vh";

  const root = {
    minHeight: position === "top" ? top : middle,
  };

  return (
    <div
      className={`${!hideCard ? " mb-5" : ""
        } d-flex align-items-center justify-content-center flex-column`}
      style={root}
    >
      {icon && (
        <div className={`no-records-icon ${iconClass ? iconClass : ""} mb-4`}>
          <SVG src={icon} />
        </div>
      )}
      {!showMessage && !message && <strong>No records found</strong>}
      <strong>{message && message}</strong>
      {boldMessage && <strong>{boldMessage}</strong>}
      {description && (
        <div className="text-center m-1">
          <p>{description}</p>
        </div>
      )}

      {buttonLink && (
        <a href={buttonLink}>
          <Button label={buttonLabel} icon={buttonIcon} />
        </a>
      )}
    </div>
  );
};

export default NoRecordsFound;
