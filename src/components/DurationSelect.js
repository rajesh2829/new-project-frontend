import React, { useState, useEffect } from "react";
import Select from "./Select";

const DurationSelect = ({ label, required, onChange, name }) => {
  const [durationList, setDurationList] = useState([]);

  useEffect(() => {
    getDurationHours();
  }, []);

  const getDurationHours = () => {
    let durationOption = [];
    const options = Array.from({ length: 11 }, (_, i) =>
      i < 2 ? i * 0.25 + 0.25 : (i - 2) * 0.5 + 1
    );
    for (let i = 0; i < options.length; i++) {
      durationOption.push({ label: options[i], value: options[i] });
    }

    setDurationList(durationOption);
  };

  return (
    <Select
      fullWidth={true}
      width="100"
      label={label || ""}
      name={name || "duration"}
      placeholder={label || ""}
      isClearable
      isSearchable
      required
      options={durationList}
      isSingleSelect={true}
      onInputChange={onChange}
    />
  );
};

export default DurationSelect;
