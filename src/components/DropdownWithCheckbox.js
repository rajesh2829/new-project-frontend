import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown,
  Input,
} from "reactstrap";
import PageSearch from "./PageSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

class DropdownWithCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: this.props.checkedItems || {},
      didMount: false,
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    let checkedItems = this.props.checkedItems;
    if (checkedItems) {
      this.setState({ checkedItems });
    }
  }
  componentDidUpdate(prevProps) {
    let checkedItems = this.props.checkedItems;
    if (
      prevProps &&
      prevProps.checkedItems &&
      prevProps.checkedItems !== checkedItems
    ) {
      this.setState({ checkedItems });
    }
  }

  toggle = () =>
    this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen }));

  handleChange = (event) => {
    this.setState(
      {
        checkedItems: {
          ...this.state.checkedItems,
          [event.target.name]: event.target.checked,
        },
      },
      () => {
        if (this.props.handleChange) {
          this.props.handleChange(this.state.checkedItems);
        }
      }
    );
  };

  filterCheckedItems = () =>
    Object.keys(this.state.checkedItems).filter(
      (item) => this.state.checkedItems[item] === true
    );

  render() {
    const {
      buttonLabel,
      dropdownLabel,
      dropdownLinks,
      menuPosition,
      width,
      color,
      hideCaret,
      hideChevron,
      backgroundcolor,
      search,
    } = this.props;

    const { dropdownOpen,checkedItems} = this.state;

    return (
      <div className="dropdown-wrapper drop-down-checkbox select-dropdown align-items-center justify-content-end d-inline">
        {dropdownLabel && (
          <p className="font-weight-bold mb-0 mr-2">{dropdownLabel}</p>
        )}
        <ButtonDropdown
          isOpen={dropdownOpen}
          toggle={this.toggle}
          style={{ backgroundColor: backgroundcolor ? backgroundcolor : "" }}
        >
          <DropdownToggle
            color={color}
            className={`dropdown-toggle  ${hideCaret ? "hide-caret" : ""}`}
          >
            <div
              className="d-flex justify-content-between"
              style={{ width: width ? width : "auto" }}
            >
              <div
                className={`${
                  this.props.className
                    ? this.props.className
                    : "hide-select-dropdown"
                }`}
              >
                {buttonLabel}
              </div>
              <div>{!hideChevron && <FontAwesomeIcon icon={faChevronDown} /> }</div>
            </div>
          </DropdownToggle>
          <DropdownMenu right={menuPosition} className="checkboxmenu">
            {this.props.search ? <PageSearch /> : ""}

            {dropdownLinks.length > 0 &&
              dropdownLinks.map((listItem) => (
                <div className="checkbox-wrapper" key={listItem.value}>
                  <label
                    className="pl-1"
                    style={{ width: width ? width : "auto" }}
                  >
                    <Input
                      type="checkbox"
                      name={listItem.value}
                      id={`${listItem.value}`}
                      onChange={(e) => this.handleChange(e)}
                      checked={checkedItems[listItem.value]}
                      value={checkedItems[listItem.value]}
                    />
                    <span
                      id={`${listItem.value}Checkbox`}
                      className={`checkbox-placeholder ${
                        checkedItems[listItem.value] && "active"
                      }`}
                    />
                    {listItem.label}
                  </label>
                </div>
              ))}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

DropdownWithCheckbox.defaultProps = {
  buttonLabel: "Button Label",
  color: "",
  hideCaret: false,
  dropdownLinks: [
    { label: "Link 1", value: "link1" },
    { label: "Link 2", value: "link2" },
    { label: "Link 3", value: "link3" },
  ],
  menuPosition: true,
};

DropdownWithCheckbox.propTypes = {
  buttonLabel: PropTypes.string,
  color: PropTypes.string,
  hideCaret: PropTypes.bool,
  dropdownLinks: PropTypes.array,
  menuPosition: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DropdownWithCheckbox;
