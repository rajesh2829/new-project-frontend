import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import { NumericFormat } from 'react-number-format';
import Label from "./Label";

class Number extends React.Component {
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
      style,
      textAlign,
      onInputChange,
      required,
      onChange,
      defaultValue,
      className,
      fontBolded,
      maxLength,
      allowNegative,
      disabled,
      prefix,
      suffix,
      decimalScale
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    return (
      <FormGroup style={style || { marginBottom: 22, position: "relative", fontSize: 14 }}>
        {label && (
          <Label
            id={id || name}
            name={name || id}
            required={required}
            className={`${fontBolded ? "font-weight-bold" : ""}`}
          >
            {label}
          </Label>
        )}

        <NumericFormat
          allowNegative={allowNegative ? true : false}
          defaultValue={defaultValue || field.value}
          value={field.value}
          id={id || name}
          name={name || id}
          {...field}
          placeholder={placeholder || label}
          className={`${className} form-control ${errorMessage ? "is-invalid" : ""
            }`}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: "40px",
            textAlign: textAlign ? textAlign : "left",
          }}
          onValueChange={(value) => {
            setFieldValue(name, value.value);
            if (onInputChange) {
              values[name] = value.value;
              onInputChange({ setFieldValue, values });
            }
          }}
          onKeyUp={onChange}
          maxLength={maxLength}
          disabled={disabled}
          prefix={prefix}
          suffix={suffix}
          decimalScale={decimalScale}
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

Number.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onInputChange: PropTypes.func,
};

export default Number;
