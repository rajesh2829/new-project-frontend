import React, { useState } from "react";
import SprintService from "../services/SprintService";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";

const SprintSelect = (props) => {
    let { name, handleChange, label, placeholder } = props;

    const [sprintList, setSprintList] = useState([]);

    const getSprintList = async () => {
        const response = await SprintService.getSprintList();
        setSprintList(response);
    };

    const onFocus = () => {
        if (ArrayList.isEmpty(sprintList)) {
            getSprintList();
        }
    }

    return (
        <>
            <Select
                name={name ? name : "sprint"}
                label={label ? label : ""}
                placeholder={placeholder ? placeholder : "Select Sprint"}
                options={sprintList}
                handleChange={handleChange}
                autoFocus={onFocus}
                menuPortal={props.menuPortal}
            />
        </>
    )
}
export default SprintSelect;