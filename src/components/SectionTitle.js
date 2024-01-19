import PropTypes from "prop-types";
import React from "react";
import Paragraph from "./paragraph";

class SectionTitle extends React.Component {
  render() {
    const { label, id, description, className} = this.props;

    return (
      <div className={className ? className : "text-center font-weight-bold mb-3"}>
        <h5 id={id || label} >
          {label}
        </h5>
        <Paragraph  text={description} />
      </div>           
    );
  }
}

SectionTitle.propTypes = {
  label: PropTypes.string,
};

export default SectionTitle;
