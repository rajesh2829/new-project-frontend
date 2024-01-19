import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import ReactSelect from "react-select";
import { FormFeedback, FormGroup } from "reactstrap";
import Hint from "./Hint";
import Label from "./Label";

class MultiSelect extends React.Component {
  validate(value) {
    const { label, placeholder, required } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;

    if (!value && required) {
      errorMessage = `${inputLabel} is required`;
    }

    return errorMessage;
  }

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
      closeMenuOnSelect,
      onRender,
      handleOnChangeSubmit,
      isDisabled,
      onKeyDown,
      defaultValue,
      required,
      clearable,
      fontBolded,
      readOnly,
      hintText,
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

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
      <FormGroup className="w-100" style={{ position: "relative" }}>
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
        <ReactSelect
          id={id}
          isMulti
          components={
            readOnly && {
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
              MultiValueRemove: () => null,
            }
          }
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
          isClearable={clearable}
          isSearchable={true}
          options={options}
          isLoading={isLoading}
          closeMenuOnSelect={closeMenuOnSelect}
          onMenuOpen={() => onOpen && onOpen()}
          placeholder={placeholderText}
          onKeyDown={onKeyDown}
          isDisabled={isDisabled}
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
            valueContainer: (provided) => {
              const paddingTop = "4px";
              const paddingBottom = "4px";
              const fontSize = "14px";
              return Object.assign({}, provided, {
                paddingTop,
                paddingBottom,
                fontSize,
              });
            },
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
                borderColor = errorMessage ? borderColor : "white !important";
              }
              return Object.assign({}, provided, {
                borderColor,
                boxShadow,
                background,
              });
            },
          }}
        />

        <span
          className={`d-none form-control ${errorMessage ? "is-invalid" : ""}`}
        />

        {hintText && (
          <div className="position-absolute" style={{ marginTop: "6px" }}>
            <Hint hintText={hintText} />
          </div>
        )}

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
        id={id}
        validate={this.validate.bind(this)}
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
