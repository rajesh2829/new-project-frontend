import React from "react";

/**
 * Cancel button component
 *
 * @param {*} onClick
 * @param {*} className
 */
const CloseButton = ({ onClick, className, label }) => {
  return (
    <button
      type="button"
      className={["btn", "btn-secondary", className].join(" ")}
      onClick={onClick}
    >
      {label ? label : "Close"}
    </button>
  );
};

export default CloseButton;
