import React from "react";
import PropTypes from "prop-types";
import { Label } from "reactstrap";

class LabelComponent extends React.Component {
  render() {
    const { id, children, required, className, fontSize } = this.props;

    return (
      <Label id={id || children} for={id} className={className} style={{ fontSize: fontSize }}>
        {children}
        {required && <span className="text-danger ml-1">*</span>}
      </Label>
    );
  }
}

LabelComponent.propTypes = {
  id: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default LabelComponent;
