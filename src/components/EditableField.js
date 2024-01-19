import React from "react";

class EditableField extends React.Component {
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
    const maxLength = 1000;
    const { name, maxlength, isOutSideClick } = this.props;
    if (isOutSideClick == true) {
      this.setState({
        editing: false,
      });
    }
    return (
      <>
        <div className="section-title inline-edit-section">
          <div className="form-inline">
            <input
              className="test-suite-page-name"
              type={this.props.type}
              name={this.props.fieldName ? this.props.fieldName : "title"}
              ref="title"
              defaultValue={name}
              maxLength={maxlength ? maxlength : maxLength}
              onKeyUp={(e) =>
                this.setState({ maxLength: e.target.value.length })
              }
              onBlur={(e) => {
                this.props.handleChange(e);
                this.setState({
                  editing: false,
                });
              }}
            />
          </div>
          {this.props.isSave ? (
            " "
          ) : (
            <div
              className={`test-suite-page-edit ${editing ? "d-block" : "d-none"
                }`}
            >
              <i className="fas fa-check" onClick={this.save}></i>
              <i className="fas fa-times" onClick={this.close}></i>
            </div>
          )}
          <span className="char-count d-block text-inline-grayed h7">
            {`${this.state.maxLength}/${maxLength} Characters`}
          </span>
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
    const title = this.refs.title.value;
    this.setState(
      {
        editing: false,
      },
      () => {
        this.props.EditHandler({ name: title });
        this.setState({
          name: title,
        });
      }
    );
  }
  // Close the page name
  close() {
    this.setState({
      editing: false,
    });
  }

  render() {
    const { editing } = this.state;
    const { name } = this.props;
    return (
      <>
        {/*Render Edit Field*/}
        {editing ? (
          this.renderEditTitle()
        ) : (
          <>
            <div className="cursor-pointer">
              <span
                className="d-block mt-2 mb-2 overflow-hidden"
                style={{
                  textOverflow: "ellipsis",
                  resize: "horizontal",
                }}
                onClick={this.edit}
              >
                {name ? name : "None"}
              </span>
            </div>
            {this.props.icon ? (
              <i className="hide float-lg-right fas fa-pen" />
            ) : (
              ""
            )}
          </>
        )}
      </>
    );
  }
}

export default EditableField;
