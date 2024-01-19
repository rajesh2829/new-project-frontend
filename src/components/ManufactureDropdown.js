import React, { useState } from "react";
import Select from "./Select";
import TagService from "../services/TagService";
import { Tag } from "../helpers/Tag";
import ArrayList from "../lib/ArrayList";

const ManufactureDropdown = (props) => {

    let { name, handleManufactureChange, manufactureOption, isDisabled } = props;
    const [manufactureList, setManufactureList] = useState([]);

    const getManafacture = async () => {

        let param = {
            type: "Manufacture",
            status: Tag.STATUS_ACTIVE,
        }

        const response = await TagService.search(param);
        const data = response.data.data;

        const manufactures = [];
        if (data && data.length > 0) {
            data.forEach((manufacture) => {
                manufactures.push({
                    id: manufacture.id,
                    value: manufacture.id,
                    label: manufacture.name,
                });
            });
        }


        setManufactureList(manufactures)
        manufactureOption(manufactures)
    };

    const onFocus = () => {
        if (ArrayList.isEmpty(manufactureList)) {
            getManafacture();
        }
    }

    return (
        <>
            <h6>Manufacture</h6>
            <Select
                name={name ? name : "Manufacture"}
                placeholder="Select Manufacture"
                options={manufactureList}
                handleChange={handleManufactureChange}
                autoFocus={onFocus}
                isDisabled={isDisabled}
            />
        </>
    )

}

export default ManufactureDropdown;