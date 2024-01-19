import React from "react";
import EditableDropdown from "./EditableDropdown";
import EditableField from "./EditableField";

const DropdownField = (props) => {
  const {
    fieldTitle,
    field,
    options,
    onInputChange,
    fieldName,
    disabled,
    editableFieldName,
    isTextField,
    isDropdown,
    isDateField,
    dateFieldName,
    singleSelect,
    multiSelect,
    fullwidth,
    avatarUrl,
    userField,
    onChange,
    isOutSideClick,
    className,
    textFieldName,
    EditHandler,
    hideAvatar,
    userSelect,
    showAssignToMeOption,
    titleClassName,
    handleUserChange
  } = props;

  return (
    <>
      <div className={`${className ? className : "row"}`}>
        <div className={`${fullwidth ? "col-md-2 mt-2" : "col-5 mt-2"}`}>
          <p className={titleClassName}>{fieldTitle}</p>
        </div>
        <div className={`${fullwidth ? "col-md-10" : "col-7"}`}>
          {isDropdown && (
            <EditableDropdown
              avatarUrl={avatarUrl}
              showEditButton={props.showEditButton}
              userField={userField}
              isOutSideClick={isOutSideClick}
              singleSelect={singleSelect}
              multiSelect={multiSelect}
              disabled={disabled}
              fullWidth={true}
              userSelect={userSelect}
              className="w-100"
              name={field}
              showAssignToMeOption={showAssignToMeOption}
              handleUserChange={handleUserChange}
              hideAvatar={hideAvatar}
              clearable
              options={options}
              onInputChange={onInputChange}
              fieldName={fieldName}
            />
          )}
          {isTextField && (
            <EditableField
              isOutSideClick={isOutSideClick}
              name={editableFieldName}
              EditHandler={EditHandler}
              fieldName={textFieldName}
            />
          )}
          {isDateField && (
            <EditableDropdown
              isOutSideClick={isOutSideClick}
              onChange={onChange}
              disabled={disabled}
              isDateSelector
              name={dateFieldName}
              fieldName={fieldName}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default DropdownField;
