import React from "react";
import AvatarCard from "./AvatarCard";
import DateSelector from "./Date";
// Components
import MultiSelect from "./Multiselect";
import Select from "./Select";
import UserSelect from "./UserSelect";

class EditableDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: "",
      maxLength: 0,
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
  }
  // Render the edit Page Title
  renderEditTitle() {
    const { editing } = this.state;
    const {
      name,
      className,
      options,
      onInputChange,
      clearable,
      multiSelect,
      fullWidth,
      isDateSelector,
      onChange,
      singleSelect,
      isOutSideClick,
      showAssignToMeOption,
      userSelect,
      handleUserChange,
    } = this.props;

    if (isOutSideClick == true) {
      this.setState({
        editing: false,
      });
    }

    return (
      <>
        <div className="section-title inline-edit-section">
          <div className="form-inline">
            {multiSelect && (
              <MultiSelect
                marignBottom
                className={className}
                name={name}
                options={options}
                handleOnChangeSubmit={onInputChange}
                clearable
                fullWidth={fullWidth}
              />
            )}
            {singleSelect && (
              <Select
                marignBottom
                className={className}
                name={name}
                isSearchable
                options={options}
                onInputChange={onInputChange}
                clearable
                fullWidth={fullWidth}
              />
            )}
            {userSelect && (
              <UserSelect
                className={className}
                name={name}
                showAssignToMeOption={showAssignToMeOption}
                handleUserChange={handleUserChange}
                clearable
                fullWidth={fullWidth}
                menuPortal=""
              />
            )}
            {isDateSelector && (
              <DateSelector
                name={name}
                onChange={onChange}
                showTimeSelect
                width="330px"
              />
            )}
          </div>
          {this.props.showEditButton && (
            <div
              className={`test-suite-page-edit ${editing ? "d-block float-right" : "d-none"
                }`}
            >
              <i className="fas fa-check mr-2" onClick={this.save}></i>
              <i className="fas fa-times" onClick={this.close}></i>
            </div>
          )}
        </div>
      </>
    );
  }

  // Edit  page Title
  edit() {
    this.setState({
      editing: true,
    });
  }

  // Save the Name
  save() {
    this.setState({
      editing: false,
    });
  }

  // Close the page name
  close() {
    this.setState({
      editing: false,
    });
  }

  render() {
    const { editing } = this.state;
    const { fieldName, disabled, avatarUrl, userField, editIcon, hideAvatar } =
      this.props;

    return (
      <>
        {/*Render Edit Field*/}
        {editing ? (
          this.renderEditTitle()
        ) : (
          <>
            <div className={`${disabled ? "disabled" : "cursor-pointer"} `}>
              <span
                className="d-block mt-2 mb-2 overflow-hidden"
                style={{
                  textOverflow: "ellipsis",
                  resize: "horizontal",
                }}
                onClick={disabled ? null : this.edit}
              >
                {userField && !hideAvatar ? (
                  <AvatarCard size="xs" firstName={fieldName} url={avatarUrl} />
                ) : fieldName ? (
                  fieldName
                ) : (
                  "None"
                )}
              </span>
            </div>
            {editIcon ? <i className="hide float-lg-right fas fa-pen" /> : ""}
          </>
        )}
      </>
    );
  }
}

export default EditableDropdown;
