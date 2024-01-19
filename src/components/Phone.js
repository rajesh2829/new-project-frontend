import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { PatternFormat } from "react-number-format";
import { FormFeedback, FormGroup } from "reactstrap";
import Label from "./Label";

class Phone extends React.Component {

  validate(value) {
    const { label, placeholder, required, error } = this.props;

    let errorMessage;
    const inputLabel = label || placeholder;
    const errorMessageLabel = error;

    if ((!value || !value.trim()) && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }

    // To validate the phone number
    if (value && value.replace(/[^0-9]/g, "").length < 10) {
      errorMessage = "Invalid phone number";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors } }) {
    const {
      name,
      id,
      label,
      placeholder,
      error,
      onKeyDown,
      notify,
      required,
      fontBolded,
      disabled
    } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error) {
      errorMessage = error;
    }

    return (
      <FormGroup
        style={{ position: "relative" }}
        className={(!!errorMessage && "is-invalid") || " form-group : input-lg mb-3 "}
      >
        {label && (
          <Label
            id={id || name}
            name={name || id}
            notify={notify}
            className={`${fontBolded ? "font-weight-bold" : "fs-6"}`}
            required={required}
          >
            {label}
          </Label>
        )}
        <PatternFormat
          format="(###) ###-####"
          mask="_"
          defaultValue={field.value && field.value}
          value={field.value}
          id={id || name}
          name={name || id}
          {...field}
          placeholder={placeholder || label}
          className={`form-control ${errorMessage ? "is-invalid" : ""}`}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: "40px",
          }}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />

        {errorMessage && (
          <FormFeedback className="position-absolute" style={{ marginTop: 1 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );
  }

  render() {
    const { name } = this.props;
    return (
      <Field
        validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

Phone.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onKeyDown: PropTypes.func,
};

export default Phone;
