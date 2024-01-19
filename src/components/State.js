import React from "react";

// API Client
import { apiClient } from "../apiClient";

// Configs
import { DEFAULT_API_KEY } from "../configs";
import { endpoints } from "../api/endPoints";

// Cookie
import { COOKIE_SESSION_TOKEN } from "../lib/Cookie";
import Cookie from "../lib/Helper";

// Components
import Select from "./Select";

class StateDropdown extends React.Component {
  // Show State options
  stateDropdownOptions = () => {
    const { selectedCountry } = this.props;

    if (Cookie.get(COOKIE_SESSION_TOKEN)) {
      apiClient.defaults.headers.common.Authorization =
        Cookie.get(COOKIE_SESSION_TOKEN);
    } else {
      apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
    }

    let params = "";
    if (selectedCountry) {
      params += "?stateList=true";
    }

    let options = [];
    apiClient
      .get(`${endpoints().countryAPI}/${selectedCountry}${params}`)
      .then((response) => {
        const states = response.data && response.data.data;
        if (states.length > 0) {
          states.forEach((state) => {
            options.push({
              value: state.name,
              label: state.name,
            });
          });
        }
      });
    return options;
  };

  componentDidMount() {
    this.stateDropdownOptions();
  }

  render() {
    const {
      name,
      label,
      placeholder,
      error,
      required,
      defaultValue,
      selectedCountryName,
      fontBolded,
      notRequired,
      id,
    } = this.props;

    // let isRequired = selectedCountryName === UNITED_STATES ? true : false;
    // isRequired = notRequired ? false : isRequired;

    return (
      <Select
        name={name}
        label={label}
        options={selectedCountryName ? this.stateDropdownOptions() : []}
        placeholder={placeholder}
        error={error}
        defaultValue={defaultValue || ""}
        isSearchable={true}
        required={required}
      />
    );
  }
}

export default StateDropdown;
