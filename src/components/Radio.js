import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";

class RadioButton extends React.Component {
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

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, values } }) {
    const {
      name,
      id,
      label,
      required,
      options,
      marignBottom,
      onRender,
      fontBolded,
      className,
      width,
      size,
      display
    } = this.props;

    // Constants for display props
    const displayProps = { HORIZONTAL: "inline", VERTICAL: "" }

    // Defining the value for display style as vertical if props is passed else by default it will display in horizontal. 
    const displayStyle = display ? displayProps.VERTICAL : displayProps.HORIZONTAL;

    const sizeStyle =
      size && size === "large"
        ? {
          height: "25px",
          width: "25px",
          verticalAlign: "middle"
        }
        : {};
    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    const fieldInput = (
      <div className="lineh">
        <FormGroup>
          {label && (
            <Label id={inputId} required={required} className="mt-1">
              <span style={{ fontWeight: "lighter" }}>{label}</span>
            </Label>
          )}

          <div>
            {options.map((option, key) => (
              <FormGroup
                key={key}
                style={{ lineHeight: ".5px", display: displayStyle, paddingLeft: "-1.25em !important" }}
              >

                <Label check className=" mx-3">
                  <Input
                    type="radio"
                    {...field}
                    name={inputId}
                    checked={field.value === option}
                    value={option}
                    style={sizeStyle}
                    className="radio-button mt-1"
                  />
                  <p className="mx-2 mt-3 mb-0" style={{ fontSize: "16px", fontWeight: "500" }}>
                    {option}
                  </p>
                </Label>
              </FormGroup>
            ))}
          </div>


          {errorMessage && (
            <FormFeedback style={{ marginTop: 1, display: "block" }}>
              {errorMessage}
            </FormFeedback>
          )}
        </FormGroup>
      </div>
    );

    if (!onRender) {
      return fieldInput;
    }

    return onRender(values, (err, render) => (render ? fieldInput : null));
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

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  )
};

export default RadioButton;
