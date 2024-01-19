import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import PropTypes from "prop-types";

export default function DateTime() {
  const [value, onChange, clockIcon, disableClock, isOpen, openClockOnFocus] =
    useState(new Date());
  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        clockIcon={clockIcon}
        disableClock={disableClock}
        isOpen={isOpen}
        openClockOnFocus={false}
      />
    </div>
  );
}
DateTime.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
