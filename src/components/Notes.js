import React from "react";
import TextArea from "./TextArea";

const Notes = (props) => {

    const { name, label, onChange, disabled, showEditButton, onBlur } = props;

    return (
        <TextArea
            name={name}
            label={label}
            onChange={onChange}
            disabled={disabled}
            showEditButton={showEditButton}
            onBlur={onBlur}
        />
    )
}

export default Notes;