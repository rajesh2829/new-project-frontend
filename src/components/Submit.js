import React from "react";

/**
 * Submit component
 *
 * @param {*} label
 * @param {*} className
 */
const Submit = ({ label, className, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        "btn",
        "btn-primary",
        "px-4",
        "text-truncate",
        className
      ].join(" ")}
    >
      {label}
    </button>
  );
};

export default Submit;
