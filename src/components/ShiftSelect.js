import React, { useState } from "react";
import ShiftService from "../services/ShiftService";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";

const ShiftSelect = (props) => {
  let { name, handleShiftChange, shiftOption, label,isMulti } = props;
  const [shiftList, setShiftList] = useState([]);

  const getShifts = async () => {
    if (ArrayList.isEmpty(shiftList)) {
      const list = await ShiftService.getShiftList();
      if (list.length > 0) {
        setShiftList(list);
        shiftOption(list)
      }
    }
  };

  return (
    <>
      <Select
        name={name ? name : "shift"}
        placeholder="Select Shift"
        options={shiftList}
        handleChange={handleShiftChange}
        label={label}
        autoFocus={getShifts}
        menuPortal = {props.menuPortal}
        isMulti={isMulti}
      />
    </>
  );
};

export default ShiftSelect;
