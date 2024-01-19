import { render } from "@testing-library/react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { FormFeedback, FormGroup } from "reactstrap";
import Number from "./Number";
import PropTypes from "prop-types";
import { Field } from "formik";
import Label from "./Label";

class Currency extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      editValue: ""
    };
  }

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
      currencySymbol,
      fontSize
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    return (
      <FormGroup
        style={
          style || { marginBottom: 22, position: "relative", fontSize: 16 }
        }
      >
        {label && (
          <Label id={id || name} name={name || id} required={required} fontSize="15px">
            {label}
          </Label>
        )}

        <div class="input-group w-100">
          <div class="input-group-prepend border border-light">
            <span class="input-group-text ">{currencySymbol ? currencySymbol : "₹"}</span>
          </div>
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
              border: this.props.showEditButton && this.state.editable ? "" : "none",
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
            onKeyUp={!this.props.showEditButton ? onChange : ""}
            maxLength={maxLength}
            disabled={disabled}
            decimalScale={2}
            onFocus={() => {
              this.setState({ editable: true })
            }}
          />
          {errorMessage && (
            <FormFeedback >
              {errorMessage}
            </FormFeedback>
          )}
        </div>
        {this.props.showEditButton && (
          this.state.editable && <div className="section-title inline-edit-section">
            <div
              className={`test-suite-page-edit ${this.state.editable ? "d-block float-right" : "d-none"
                }`}
            >
              <i className="fas fa-check mr-2" onClick={() => {
                this.props.onChange(field?.value)
                this.setState({ editable: false })
              }}></i>
              <i
                className="fas fa-times"
                onClick={() => {
                  this.setState({ editable: false })
                }}
              ></i>
            </div>
          </div>
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

Number.PropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onInputChange: PropTypes.func,
};

export default Currency;
