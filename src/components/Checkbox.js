import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormFeedback } from "reactstrap";

class Checkbox extends React.Component {
  // Validate the checkbox field
  validate(value) {
    const { label, placeholder, required, error } = this.props;
    let errorMessage;
    const inputLabel = label || placeholder;
    const errorMessageLabel = error;
    if (!value && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }
    return errorMessage;
  }

  // Render the input checkbox field
  renderInput({
    field: { value, onChange, onBlur },
    form: { touched, errors },
  }) {
    const { name, id, label, className } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    return (
      <label className={className} style={{ fontWeight: 400 }}>
        <input
          name={name || id}
          id={id || name}
          type="checkbox"
          value={value}
          checked={value}
          onChange={onChange}
        />
        <span htmlFor={id}>{label}</span>
        {errorMessage && (
          <FormFeedback style={{ marginTop: 20 }}>{errorMessage}</FormFeedback>
        )}
      </label>
    );
  }

  // Render the checkbox component
  render() {
    const { name, label } = this.props;
    return (
      <Field
        validate={this.validate.bind(this)}
        name={name}
        label={label}
        render={this.renderInput.bind(this)}
      />
    );
  }
}
Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
export default Checkbox;
