import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { NumericFormat } from "react-number-format";
import { FormFeedback, FormGroup } from "reactstrap";
import Label from "./Label";

// Helper

class Zipcode extends React.Component {
  validate(value) {
    const { label, placeholder, required, locale } = this.props;
    let errorMessage;
    let inputLabel = label || placeholder;

    if ((!value || !value.trim()) && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    }

    // To validate the pincode
    if (value && value.replace(/[^0-9]/g, "").length < 5) {
      errorMessage = "Invalid Pincode";
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
      required,
      onKeyDown,
      maxLength,
      fontBolded,
    } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error) {
      errorMessage = error;
    }

    return (
      <FormGroup
        style={{ position: "relative" }}
        Width={"100%"}
        className={`${errorMessage ? "is-invalid" : ""}`}
      >
        {label && (
          <Label
            id={id || name}
            name={name || id}
            required={required}
            className={`${fontBolded ? "font-weight-bold" : "fs-4"}`}
          >
            {label}
          </Label>
        )}
        <NumericFormat
          defaultValue={field.value}
          allowNegative={false}
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
          maxLength={"6"}
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
    const { name, id } = this.props;

    return (
      <Field
        id={id || name}
        validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

Zipcode.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  locale: PropTypes.string,
};

export default Zipcode;
