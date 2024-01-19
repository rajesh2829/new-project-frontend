import React, { useState } from "react";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";
import AccountService from "../services/AccountService";


const AccountSelect = (props) => {
    let { name, handleVendorChange, vendorList, required, label, placeholder, isDisabled, type, customOption } = props;

    const [vendorOption, setVendorOption] = useState([]);

    const getVendor = async () => {
        if (ArrayList.isEmpty(vendorOption)) {
            let params
            if (type) {
                params = { type: type }
            }
            const list = await AccountService.getOption(params);
            setVendorOption(list);
            vendorList && vendorList(list);
        }
    };

    return (
        <>
            <Select
                name={name ? name : "vendor"}
                placeholder={placeholder ? placeholder : "Select Account"}
                options={customOption ? customOption : vendorOption}
                handleChange={handleVendorChange}
                required={required}
                label={label}
                isDisabled={isDisabled}
                autoFocus={getVendor}
                menuPortal={props.menuPortal}
            />
        </>
    )
}

export default AccountSelect;