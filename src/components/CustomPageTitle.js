import React from "react";
/**
 * Page title component
 *
 * @param {*} title
 * @param {*} buttonLabel
 * @param {*} onButtonClick
 * @param {*} children
 */
const CustomPageTitle = ({
  title,
  buttonLabel,
  onButtonClick,
  children,
  disableButton
}) => {
  return (
    <div className="page-title-wrapper">
      <h5>{title}</h5>
      <div>
        {children}
        {buttonLabel && (
          <button
            className="btn btn-theme-default px-4 ml-2"
            onClick={onButtonClick}
            disabled={disableButton}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomPageTitle;
