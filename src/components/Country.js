import React, { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import { endpoints } from "../api/endPoints";

// Components
import Select from "./Select";

const Country = (props) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const {
    name,
    label,
    placeholder,
    error,
    required,
    fontBolded,
    defaultValue,
    selectCountry,
    countryOptionsFromProps,
    onChange,
    id,
  } = props;

  // Get country option list
  const getCountryOptions = () => {
    apiClient.get(`${endpoints().countryAPI}/list`).then((response) => {
      const countries = response.data.data;
      countries.forEach((country) => {
        countryOptions.push({
          value: country.name,
          label: country.name,
          id: country.id,
        });
        setCountryOptions(countryOptions);
      });
    });
  };

  //fetch the api list when the the component rendered
  useEffect(() => {
    getCountryOptions();
  }, []);

  return (
    <Select
      name={name}
      label={label}
      options={countryOptions}
      placeholder={placeholder}
      error={error}
      defaultValue={
        selectCountry
          ? {
            label: selectCountry.label,
            value: selectCountry.id
          }
          : ""
      }
      required={required}
      handleChange={onChange}
      isSearchable={true}
    />
  );
};

export default Country;
