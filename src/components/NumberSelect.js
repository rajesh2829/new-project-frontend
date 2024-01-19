import React, { useState, useEffect } from "react";
import Select from "./Select";

const NumberSelect = ({ label, width, required, onChange, name, isDisabled, defaultValue,limit }) => {
  const [numberList, setNumberList] = useState([]);

  useEffect(() => {
    getNumbers();
  }, []);

  const getNumbers = () => {
    let numberList = new Array();
    for (let i = 0; i <= (limit ? limit : 9999); i++) {
      numberList.push({
        label: i,
        value: i,
      });
    }
    setNumberList(numberList);
  };
 
  return (
    <>
      <Select
        fullWidth={true}
        width="100"
        label={label}
        name={name }
        placeholder={label}
        isClearable
        isSearchable
        required = {required}
        options={numberList}
        isSingleSelect={true}
        onInputChange={onChange}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        showVirtualizedMenu={true}
      />
    </>
  );
};

export default NumberSelect;
