import React from "react";
import Url from "../lib/Url";
import SelectDropdown from "./SelectDropdown";

//Page size filter options
const options = [
 
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "100",
    label: "100",
  },
];

class PageSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPageSizeOption: Url.GetParam("pageSize") ? Url.GetParam("pageSize"):"25",
    };
  }

  componentDidMount() {
    this.setState(
      {
        selectedPageSizeOption:
          this.state.selectedPageSizeOption ? this.state.selectedPageSizeOption : "25",
      });
  }

  // handle Page Size
  handlePageSizeByChange = (value) => {
    this.setState({
      selectedPageSizeOption: this.getPageSizeValueFromLabel(value),
    });
    this.getPageSizeByOptions(value);
  };

  // get page size value from label
  getPageSizeValueFromLabel(label) {
    const pageSizeOptions = options
      ? options
      : this.state.selectedPageSizeOption;

    const selectedPageSizeOption = pageSizeOptions.find(
      (option) => option.label === label
    );

    if (selectedPageSizeOption) {
      return selectedPageSizeOption.value;
    }

    return "";
  }

  // get seleted page size
  getSelectedPageSizeLabel() {
    const pageSizeOptions = options
      ? options
      : this.state.selectedPageSizeOption;

    let selectedPageSizeOptions;
    selectedPageSizeOptions = pageSizeOptions.find(
      (option) => option.value === this.state.selectedPageSizeOption
    );

    if (selectedPageSizeOptions) {
      return selectedPageSizeOptions.label;
    }

    return "";
  }

  // handle on change
  getPageSizeByOptions = (value) => {
    const valueArray = this.getPageSizeValueFromLabel(value).split(":");
    const PageSize = valueArray[0];
    this.props.onChange(PageSize);
  };

  render() {
    return (
      <SelectDropdown
        name="pageSize"
        buttonLabel={this.getSelectedPageSizeLabel()}
        dropdownLinks={options}
        color={"gray"}
        pageSize
        hideCaret
        handleChange={this.handlePageSizeByChange}
      />
    );
  }
}

export default PageSize;
