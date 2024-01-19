import React, { useState } from "react";
import StoreService from "../services/StoreService";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";

const SelectStore = (props) => {

    let { name, label, required, handleStoreChange, isDisabled, options, StoreList, placeholder } = props;
    
    const [storeList, setStoreList] = useState([]);

    const getStores = async () => {
        if (ArrayList.isEmpty(storeList)) {
            await StoreService.list((callback) => {
                setStoreList && setStoreList(callback)
                StoreList && StoreList(callback)
            });
        }
    };

    return (
        <>
            <Select
                name={name ? name : "location"}
                placeholder={placeholder ? placeholder : "Select Location" }
                options={storeList}
                handleChange={handleStoreChange}
                label={label}
                required={required}
                isDisabled={isDisabled}
                autoFocus={getStores}
                menuPortal = {props.menuPortal}
            />
        </>
    )
}

export default SelectStore;