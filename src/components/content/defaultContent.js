import React from "react";

const DefaultContent = (props) => {
  const {
    children,
    title,
    titleHint,
    className,
    enableButton,
    buttonLabel,
    onButtonClick,
    id,
  } = props;

  return (
    <div className={`bg-white shadow-sm p-4 w-100 mb-4 z-index-1 default-section-content ${className}`}>
      <div className="content">
        {title && (
          <h4>
            <div className="d-flex justify-content-between">
              <b>{title}</b>
              {enableButton && (
                <button
                  id={id}
                  type="button"
                  className="btn btn-primary"
                  onClick={onButtonClick ? onButtonClick : null}
                >
                  {buttonLabel}
                </button>
              )}
            </div>
            {titleHint && (
              <span className="text-inline-grayed" style={{ fontSize: "16px" }}>
                {" "}
                {titleHint}
              </span>
            )}
          </h4>
        )}
        {children}
      </div>
    </div>
  );
};

export default DefaultContent;
