import { Field } from "formik";
import React from "react";
import InputMask from "react-input-mask";
import { FormGroup } from "reactstrap";
import Label from "./Label";

function IPAddress(props) {
    const {
        id,
        name,
        className,
        placeholder,
        label,
        fontBolded,
        required
    } = props;


    function checkIpValue(value) {
        const ipAddress = value.split('.')
        if (ipAddress.length > 4) {
            return false
        }
        const invalidIpAddress = ipAddress.filter(ip => {
            ip = parseInt(ip)
            return ip < 0 || ip > 255
        })
        if (invalidIpAddress.length !== 0) {
            return false
        }
        let emptyIpCount = 0
        ipAddress.forEach(ip => {
            if (ip === "") {
                emptyIpCount++
            }
        })
        if (emptyIpCount > 1) {
            return false
        }
        return true
    }



    const renderInput = ({ field, form: { touched, errors } }) => {
        const errorMessage = touched[name] && errors[name] ? errors[name] : null;

        return (
            <FormGroup
                style={{ position: "relative", fontSize: "14px" }}
                className={`${className} ${("is-invalid") || ""}`}
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

                <InputMask
                    id={name}
                    name={name || id}
                    formatChars={{
                        '9': '[0-9\.]',
                    }}
                    mask="999999999999999"
                    maskChar={null}
                    alwaysShowMask={false}
                    placeholder={placeholder || label}
                    className={`form-control ${errorMessage ? "is-invalid" : ""}`}
                    value={field.value}
                    {...field}
                    style={{
                        background: "#F3F3F4",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "14px",
                        height: "40px",
                    }}
                    beforeMaskedValueChange={(newState, oldState) => {
                        let value = newState.value;
                        const oldValue = oldState.value;
                        let selection = newState.selection;
                        let cursorPosition = selection ? selection.start : null;
                        const result = checkIpValue(value)
                        if (!result) {
                            value = value.trim()
                            const newValue = value.substring(0, value.length - 1) + "." + value.substring(value.length - 1);
                            if (checkIpValue(newValue)) {
                                cursorPosition++
                                selection = { start: cursorPosition, end: cursorPosition };
                                value = newValue
                            } else {
                                value = oldValue
                            }
                        }

                        return {
                            value,
                            selection
                        };
                    }}
                />
            </FormGroup>
        )
    };
    return <Field id={id || name} name={name} component={renderInput} />;
}

export default IPAddress;