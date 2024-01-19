import React from "react";

/**
 * FormGroup component
 *
 * @param {*} children
 * @param {*} className
 */
const FormGroup = ({ children, className, ...props }) => {
  return (
    <div className={["form-group", className].join(" ")} {...props}>
      {children}
    </div>
  );
};

export default FormGroup;
