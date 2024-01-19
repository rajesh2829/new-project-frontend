import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import isEmail from "validator/lib/isEmail";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";
import Hint from "./Hint";

class Email extends React.Component {
  validate(value) {
    const { label, placeholder, required, error, validationMessage } =
      this.props;

    let errorMessage;
    const inputLabel = validationMessage || label || placeholder;
    const errorMessageLabel = error;

    if ((!value || !value.trim()) && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    } else if (value && !isEmail(value.trim())) {
      errorMessage = inputLabel ? `Invalid ${inputLabel}` : "Invalid";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue } }) {
    const {
      name,
      id,
      label,
      placeholder,
      error,
      onKeyDown,
      onClick,
      required,
      defaultValue,
      className,
      disabled,
      onChange,
      fontBolded,
      hintText,
    } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error) {
      errorMessage = error;
    }

    return (
      <FormGroup
        style={{ position: "relative" }}
        className={
          `${className} ${!!errorMessage && "is-invalid"}`
            ? "form-group input-lg"
            : ""
        }
      >
        {label && (
          <Label
            className={`${fontBolded ? "font-weight-bold" : ""}`}
            id={id || name}
            name={name || id}
            required={required}
          >
            {label}
          </Label>
        )}
        <Input
          id={id || name}
          name={name || id}
          {...field}
          type="text"
          placeholder={placeholder || label}
          invalid={!!errorMessage}
          defaultValue={defaultValue}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: "40px",
          }}
          onKeyDown={onKeyDown}
          onClick={onClick}
          maxLength={"50"}
          disabled={disabled}
          onChange={(e) => {
            onChange && onChange(e);
            setFieldValue(name, e.target.value);
          }}
        />
        {hintText && (
          <div className="position-absolute" style={{ marginTop: "6px" }}>
            <Hint hintText={hintText} />
          </div>
        )}

        {errorMessage && (
          <FormFeedback
            id={errorMessage}
            className="position-absolute"
            style={{ marginTop: 1 }}
          >
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

Email.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
};

export default Email;
