import React from 'react';
import './style.css';

const ToggleButton = ({ handleToggle, toggleOnLabel, toggleOffLabel, LabelfontSize, toggled }) => {

  return (
    <label className="switchToggle">
      <input type="checkbox" checked={toggled} onClick={(e) => handleToggle(e)} />
      <span className="slider"></span>
      <span
        style={{ fontSize: LabelfontSize ? LabelfontSize : "15px" }}
        className="labels text-center"
        data-on={toggleOnLabel}
        data-off={toggleOffLabel}>
      </span>
    </label>
  );
};

export default ToggleButton;