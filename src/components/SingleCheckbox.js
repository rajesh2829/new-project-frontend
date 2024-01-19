import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormFeedback } from "reactstrap";

class SingleCheckbox extends React.Component {
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
  checkboxstyle = { marginLeft: "2px", marginRight: "2px", fontWeight: "400" };

  // Render the input checkbox field
  renderInput({
    field: { value, onChange, onBlur },
    form: { touched, errors, values },
  }) {
    const {
      name,
      id,
      label,
      className,
      assignedPartnerValue,
      handleOnChangeSubmit,
      handleFeatureChange,
      disabled,
      fontBolded,
      enabled,
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    return (
      <div className={`${className} accepted-terms`} style={{ fontWeight: "400", position: "relative" }}>
        <div className="d-flex" key={name}>
          <input
            id={id || name}
            name={name || id}
            type="checkbox"
            value={value || assignedPartnerValue}
            checked={value || assignedPartnerValue}
            onChange={(e) => {
              onChange(e);
              if (handleOnChangeSubmit) {
                values[name] = e.target.value !== "true";
                handleOnChangeSubmit(values, name, {
                  label,
                  value: e.target.value !== "true",
                });
              }
              if (handleFeatureChange) {
                handleFeatureChange(e);
              }
            }}
            disabled={enabled ? enabled : false}
            style={this.checkboxstyle}
          />
          <span
            className={`${fontBolded ? "font-weight-bold" : ""}`}
            htmlFor={id}
          >
            {label}
          </span>
        </div>
        {errorMessage && (
          <FormFeedback className="position-absolute" style={{ marginTop: 20 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </div>
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
SingleCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
export default SingleCheckbox;
