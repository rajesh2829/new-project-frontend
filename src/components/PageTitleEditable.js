import React from "react";

class PageTitleEditable extends React.Component {
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
    const maxLength = 255;
    const { name } = this.props;
    return (
      <div className="section-title inline-edit-section col-md-9">
        <div className="form-inline">
          <input
            className="test-suite-page-name"
            name="title"
            ref="title"
            defaultValue={name}
            maxLength={maxLength}
            onKeyUp={(e) => this.setState({ maxLength: e.target.value.length })}
          />
        </div>
        <div
          className={`test-suite-page-edit ${editing ? "d-block" : "d-none"}`}
        >
          <i className="fas fa-check" onClick={this.save}></i>
          <i className="fas fa-times" onClick={this.close}></i>
        </div>
        <span className="char-count d-block text-inline-grayed h7">
          {`${this.state.maxLength}/${maxLength} Characters`}
        </span>
      </div>
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
        {/*Render Edit Page Title name*/}
        {editing ? (
          this.renderEditTitle()
        ) : (
          <div className="section-title col-md-9">
            <div className="form-inline">
              <span
                className="h3 d-block"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "550px",
                  minWidth: "auto",
                  resize: "horizontal",
                }}
              >
                {name}
              </span>
              <span
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                }}
                className="ml-2 mt-n5 cursor-pointer"
                onClick={this.edit}
              >
                <i className="fas fa-pen" />
              </span>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PageTitleEditable;
