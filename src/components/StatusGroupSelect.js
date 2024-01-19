import React from 'react';
import Select from './Select';
import { groupOption } from '../helpers/Status';
import Url from '../lib/Url';

const StatusGroupSelect = (props) => {
  let {
    name,
    label,
    onInputChange,
    placeholder,
    required,
    isDisabled,
  } = props;

  return (
    <>
      <Select
        name={name ? name : 'status_group'}
        label={label}
        placeholder={placeholder ? placeholder : 'Select Group'}
        options={Url.GetParam("projectId") ? (props?.groupOption) : groupOption} 
        onInputChange={onInputChange}
        required={required}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default StatusGroupSelect;
