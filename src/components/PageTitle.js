import PropTypes from "prop-types";
import React from "react";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import Action from "../components/Action";
import Button from "../components/Button";

class PageTitle extends React.Component {
  render() {
    const {
      title,
      label,
      Alabel,
      id,
      buttonHandler,
      buttonLabel,
      settings,
      isDisabled,
      targetUrl,
      className,
      deletebuttonHandler,
      deletetargetUrl,
      DeleteButtonLabel,
      dropdownLinks,
      handleChange,
      actionLabel,
      loading,
      showDefaultButton,
      defaultButtonHandler,
      defaultButtonLabel
    } = this.props;
    return (
      <div
        className={`${className ? className : ""} d-flex justify-content-between`}
      >
        <div className={`${settings ? `d-flex` : ""}`}>
          <h5 className="text-nowrap mt-1"
            id={id || label}
          >
            {label}
          </h5>
        </div>
        <div>
          {dropdownLinks && (
            <div className="pull-right ml-sm-2 mb-2">
              <Action
                dropdownLinks={dropdownLinks}
                handleChange={handleChange}
                buttonLabel={actionLabel}
              />
            </div>
          )}
          {(deletebuttonHandler || deletetargetUrl) && (
            <DeleteButton
              className="pull-right mb-2"
              label={DeleteButtonLabel}
              onClick={deletebuttonHandler}
              targetUrl={deletetargetUrl}
              type="button"
              loading={loading}
            />
          )}

          {(buttonHandler || targetUrl) && (
            <AddButton
              label={buttonLabel}
              className="pull-right btn btn-secondary h6-5-important font-weight-bold mr-sm-1 mb-2"
              onClick={buttonHandler}
              targetUrl={targetUrl}
              isDisabled={isDisabled}
            />
          )}

          {showDefaultButton && (
            <Button
              className="pull-right btn btn-secondary h6-5-important font-weight-bold mr-1"
              label={defaultButtonLabel}
              onClick={defaultButtonHandler}
            />
          )}
          {title && (
            <span className="pull-right h6-5-important font-weight-bold mr-5 mt-2">{title}</span>
          )}


        </div>
      </div>
    );
  }
}

PageTitle.propTypes = {
  label: PropTypes.string,
};

export default PageTitle;
