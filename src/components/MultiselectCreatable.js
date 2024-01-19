import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import CreatableSelect from "react-select/creatable";
import Label from "./Label";

class MultiSelect extends React.Component {
  validate(value) {
    const { label, placeholder, required, error } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;
    const errorMessageLabel = error;

    if (!value && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }

    return errorMessage;
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.defaultValue &&
  //     prevProps.defaultValue !== this.props.defaultValue &&
  //     this.props.defaultValue !== this.fieldValue
  //   ) {
  //     this.setFieldValue(this.props.name, this.props.defaultValue);
  //   }
  // }

  renderInput({ field, form: { touched, errors, setFieldValue, values } }) {
    const {
      name,
      id,
      label,
      placeholder,
      options,
      isLoading,
      onOpen,
      onSearch,
      onInputChange,
      required,
      closeMenuOnSelect,
      onRender,
      handleOnChangeSubmit,
      isSingleSelect,
      disabled,
      onKeyDown,
      defaultValue,
      fontBolded,
      minWidth
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    if (defaultValue && field && field.value) {
      this.fieldValue = field.value;
    }

    let placeholderText;
    if (placeholder) {
      placeholderText = placeholder;
    } else if (label) {
      placeholderText = `Select ${label}`;
    }

    const fieldSelect = (
      <FormGroup className="w-100" style={{ position: "relative", minWidth: minWidth ? minWidth : "100px" }}>
        {label && (
          <Label
            id={inputId}
            required={required}
            className={`${fontBolded ? "font-weight-bold" : ""}`}
          >
            {label}
          </Label>
        )}
        <CreatableSelect
          id={id}
          onKeyDown={onKeyDown}
          isMulti={isSingleSelect ? false : true}
          classNamePrefix="select"
          defaultValue={
            field.value && field.value.value !== null ? field.value : null
          }
          value={
            field.value && field.value.value !== null
              ? field.value
              : defaultValue
                ? defaultValue
                : null
          }
          formatCreateLabel={(e) => e}
          isClearable={true}
          isSearchable={true}
          options={options}
          isLoading={isLoading}
          closeMenuOnSelect={closeMenuOnSelect}
          onMenuOpen={() => onOpen && onOpen()}
          placeholder={<div className="text-nowrap">{placeholderText}</div>}
          onChange={(value) => {
            setFieldValue(name, value);
            if (onInputChange) {
              values[name] = value;
              onInputChange({ setFieldValue, values });
            }
            if (handleOnChangeSubmit) {
              values[name] = value;
              handleOnChangeSubmit(values);
            }
          }}
          onBlur={() => field.onBlur({ target: { name } })}
          onInputChange={(value) => onSearch && onSearch(value)}
          styles={{
            control: (provided, state) => {
              let boxShadow;
              let background;
              let borderColor = errorMessage
                ? "#f86c6b !important"
                : provided.borderColor;
              if (state.isFocused) {
                boxShadow = errorMessage
                  ? "0 0 0 0.2rem rgba(248, 108, 107, 0.25)"
                  : "0 0 0 0.2rem rgba(32, 168, 216, 0.25)";
                borderColor = errorMessage ? borderColor : "#8ad4ee !important";
              } else {
                background = errorMessage ? background : "#f3f3f4 !important";
              }
              return Object.assign({}, provided, {
                borderColor,
                boxShadow,
                background,
              });
            },
          }}
          isDisabled={disabled}
        />

        <span
          className={`d-none form-control ${errorMessage ? "is-invalid" : ""}`}
        />

        {errorMessage && (
          <FormFeedback className="position-absolute" style={{ marginTop: 1 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );

    if (!onRender) {
      return fieldSelect;
    }

    return onRender(values, (err, render) => (render ? fieldSelect : null));
  }

  render() {
    const { name, id } = this.props;

    return (
      <Field
        id={id || name}
        // validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  onOpen: PropTypes.func,
  onSearch: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default MultiSelect;
