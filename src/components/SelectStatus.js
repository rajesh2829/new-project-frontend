import React, { useState } from "react";
import StatusService from "../services/StatusService";
import Select from "./Select";

const StatusSelect = (props) => {

    let {
        name,
        handleStatusChange,
        statusOption,
        customStatusOption,
        objectName,
        label,
        placeholder,
        isMulti,
        isDisabled,
        defaultValue
    } = props;

    const [statusList, setStatusList] = useState([]);

    const getStatus = async () => {
        const response = await StatusService.getOption(objectName, "");
        setStatusList(response)
        statusOption && statusOption(response)
    };

    return (
        <>
            <Select
                name={name ? name : "status"}
                label={label ? label : ""}
                placeholder={placeholder ? placeholder : "Select Status"}
                options={
                    customStatusOption
                        ? customStatusOption
                        : statusList
                }
                handleChange={handleStatusChange}
                autoFocus={getStatus}
                isMulti={isMulti}
                menuPortal={props.menuPortal}
                isDisabled={isDisabled}
                defaultValue={defaultValue}
            />
        </>
    )

}

export default StatusSelect;