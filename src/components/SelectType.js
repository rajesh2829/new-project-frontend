import React, { useState } from "react";
import transferTypeService from "../services/TransferTypeService";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";

const SelectType = (props) => {
  let { name, handleTypeChange, typeOption, customTypeOption, clearable, label } = props;
  const [transferTypeList, setTransferTypeList] = useState([]);

  const getTypes = async () => {
    if (ArrayList.isEmpty(transferTypeList)) {
      const response = await transferTypeService.getOption();
      setTransferTypeList(response);
      typeOption(response);
    }
  };

  return (
    <>
      <Select
        name={name ? name : "type"}
        placeholder="Select Type"
        options={customTypeOption ? customTypeOption : transferTypeList}
        handleChange={handleTypeChange}
        clearable={clearable}
        label={label}
        autoFocus={getTypes}
        menuPortal = {props.menuPortal}
      />
    </>
  );
};

export default SelectType;
