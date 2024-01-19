import React, { useState, useEffect } from "react";
import Select from "./Select";

const StoryPointSelect = ({ label, required, onChange, name, value }) => {
  const [storyPointList, setStoryPointList] = useState([]);

  useEffect(() => {
    getStoryPoint();
  }, []);

  const getStoryPoint = () => {
    let storyPointOption = [];
    const options = Array.from({ length: 17 }, (_, i) =>
      i < 2 ? i * 0.25 + 0.25 : (i - 2) * 0.5 + 1
    );
    for (let i = 0; i < options.length; i++) {
      storyPointOption.push({ label: options[i], value: options[i] });
    }

    setStoryPointList(storyPointOption);
  };

  return (
    <Select
      fullWidth={true}
      label={label || ""}
      name={name}
      placeholder={label || ""}
      value={value}
      required={required}
      options={storyPointList}
      onInputChange={onChange}
    />
  );
};

export default StoryPointSelect;
