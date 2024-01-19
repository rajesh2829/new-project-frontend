import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";
import SampleTooltip from "./SampleTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class Password extends React.Component {
  validate(value) {
    const { label, placeholder, required } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;

    if (!value && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue, values } }) {
    const {
      name,
      id,
      label,
      placeholder,
      error,
      onKeyDown,
      onClick,
      required,
      strongPassword,
      onInputChange,
    } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error) {
      errorMessage = error;
    }

    return (
      <FormGroup
        style={{ position: "relative" }}
        className={
          `${!!errorMessage && "is-invalid"}` ? "form-group input-lg" : ""
        }
      >
        {label && (
          <Label id={id || name} name={name || id} required={required}>
            {label}
          </Label>
        )}

        <Input
          id={id || name}
          name={name || id}
          {...field}
          type="password"
          placeholder={placeholder || label}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: "40px",
          }}
          invalid={!!errorMessage}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            if (onInputChange) {
              values[name] = e.target.value;
              onInputChange({ setFieldValue, values });
            }
          }}
          onKeyDown={onKeyDown}
          onClick={onClick}
          maxLength="25"
        />

        {errorMessage && (
          <FormFeedback
            id={id || name + "Error"}
            name={name || id + "Error"}
            style={{ position: "relative", marginTop: 1 }}
            className={[`${strongPassword && "strong-password"}`].join(" ")}
          >
            {errorMessage}
            {strongPassword && (
              <span id={"password-tooltip"}>
                <FontAwesomeIcon icon={faCircleInfo} />
                <SampleTooltip tooltipId={"password-tooltip"} placement={"top"}>
                  <p>
                    A strong password should consist of: <br />
                    - Minimum 8 characters; <br />
                    - One uppercase letter; <br />
                    - One special character; <br />- One number;
                  </p>
                </SampleTooltip>
              </span>
            )}
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

Password.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
};

export default Password;
