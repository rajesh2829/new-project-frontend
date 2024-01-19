import { Field } from "formik";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTime from "../lib/DateTime";
import FormGroup from "./FormGroup";
import Label from "./Label";

const TimeSelector = (props) => {
  const {
    id,
    name,
    showMonthYearPicker,
    label,
    placeholder,
    required,
    error,
    disabled,
    onChange,
    selected,
    format = "h:mm aa",
    maxDate,
    isClearable,
    showTimeSelect=true,
    position,
    minDate,
    width,
    maxWidth,
    minWidth,
    timeFormat,
  } = props;
  const validate = (value) => {
    let errorMessage;
    const inputLabel = label || placeholder;
    const errorMessageLabel = error;
    if (!value && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }
    return errorMessage;
  };
  const renderInput = ({ field, form: { touched, errors, setFieldValue } }) => {
    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const handleInputFocus = (event) => {
      event.target.blur();
    };
    return (
      <FormGroup
        style={{
          marginBottom: "17px",
          position: position ? position : "relative",
          width: width,
          minWidth: minWidth,
          maxWidth: maxWidth,
        }}
      >
        {label && (
          <Label id={id || name} name={name || id} required={required}>
            {label}
          </Label>
        )}
        <DatePicker
          showTimeSelect={true}
          showTimeSelectOnly={true}
          showMonthYearPicker={showMonthYearPicker}
          id={id || name}
          className={`form-control ${
            errorMessage ? "is-invalid w-100" : "w-100"
          }`}
          format
          timeIntervals={props.timeInterval ? props.timeInterval : 5}
          disabled={disabled}
          maxDate={maxDate}
          minDate={minDate}
          onChange={(value) => {
            onChange && onChange(value);
            value
              ? showTimeSelect
                ? setFieldValue(name, moment(value).toISOString())
                : setFieldValue(
                    name,
                    DateTime.getDateByUserProfileTimezone(value)
                  )
              : setFieldValue(name, null);
          }}
          dateFormat={format}
          selected={
            field.value ? new Date(field.value) : selected ? selected : null
          }
          placeholderText={placeholder || label}
          autoComplete="off"
          isClearable={isClearable}
          timeFormat={timeFormat}
          style={{ width: "330px" }}
          onFocus={handleInputFocus}
        />
        {errorMessage && (
          <span className="small text-danger">{errorMessage}</span>
        )}
      </FormGroup>
    );
  };

  return <Field validate={validate} name={name} component={renderInput} />;
};

TimeSelector.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default TimeSelector;
