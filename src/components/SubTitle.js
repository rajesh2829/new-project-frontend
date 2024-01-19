import PropTypes from "prop-types";
import React from "react";

class SubTitle extends React.Component {
  render() {
    const { label, id } = this.props;

    return (
      <div className={"d-flex"}>
        <h5
          id={id || label}
          className="mt-4 mb-4 font-weight-bold"
          style={{ display: "inline-block" }}
        >
          {label}
        </h5>
      </div>
    );
  }
}

SubTitle.propTypes = {
  label: PropTypes.string,
};

export default SubTitle;
