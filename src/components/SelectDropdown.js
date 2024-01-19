import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const SelectDropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState({
    selectedValue: props.defaultValue,
  });
  const [dropdownOpen, setOpen] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const dropdownRef = useRef(null);

  const {
    dropdownLabel,
    dropdownLinks,
    menuPosition,
    color,
    textColor,
    width,
    hideCaret,
    hideChevron,
    selectName,
    getSelectedFilters,
    liveFilters,
    nlFormFilter,
    handleChange,
    alignCenter,
    id,
    disabled,
    onFocus,
    colorCode
  } = props;

  useEffect(() => setDidMount(true), []);
  
  useEffect(() => {
    if (didMount && nlFormFilter) {
      getSelectedFilters(selectedValue, selectName);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (didMount && nlFormFilter) {
      if (liveFilters[selectName] !== undefined) {
        setSelectedValue({
          selectedValue: [...liveFilters[selectName].selectedValue],
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (props.defaultValue) {
      handleChange(props.defaultValue);
    }
  }, []);

  const updateLabel = (e) => {
    setSelectedValue({ selectedValue: [e.target.dataset["label"]] });
  };

  const onClick = (e) => {
    e.target.focus();
    disabled ? disabled : toggle();
    onFocus && onFocus();
  }

  let style = {};
  if (textColor) {
    style.color = `${textColor}`;
  }
  if (width) {
    style.width = `${width}`;
  }
  
  return (
    <div
      className={`${alignCenter
          ? "dropdown-wrapper d-inline-flex"
          : "dropdown-wrapper select-dropdown"
        }"select-dropdown align-items-center justify-content-end" ${props.width ? "w-100" : ""}`}
      ref={dropdownRef}
    >
      {dropdownLabel && (
        <p className="font-weight-bold mb-0 mr-2">{dropdownLabel}</p>
      )}
      <ButtonDropdown
        id={id}
        isOpen={dropdownOpen}
        onClick={onClick}
        className={`${props.visible ? props.visible : ""}${props.width ? "w-100" : ""} ${props.pageSize ? "float-left" : "float-right"} `}
      >
        <DropdownToggle
          id={id}
          color={color ? color : "gray"}
          style={{ background: colorCode ? colorCode : "", color: colorCode ? "whitesmoke" : "black" }}
          className={`dropdown-toggle ${hideCaret ? "hide-caret" : ""}`}
        >
          <span
            className={`d-flex justify-content-between align-items-center ${props.width ? "w-100" : ""}`}
            style={style}
          >
            {Object.values(selectedValue)[0] !== undefined &&
              Object.values(selectedValue)[0].length > 0
              ? Object.values(selectedValue)[0]
              : props.buttonLabel}

            {!hideChevron && (
              <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            )}
          </span>
        </DropdownToggle>
        <DropdownMenu right={menuPosition} className={`dropdownwidth ${props.width ? "w-100" : ""}`}>
          {dropdownLinks
            .filter((listItem) => listItem.placeholder === undefined)
            .map((listItem) => (
              <div className={`${listItem.label === "Delete" && "text-danger"}`}>
                <DropdownItem
                  onClick={(e) => {
                    updateLabel(e);

                    handleChange && handleChange(e.target.dataset["value"]);
                  }}
                  data-value={listItem.value}
                  data-label={listItem.label}
                  data-name={selectName}
                  key={listItem.value}
                  id={listItem.value}
                >
                  {listItem.label}
                </DropdownItem></div>
            ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

SelectDropdown.defaultProps = {
  buttonLabel: "Button Label",
  color: "",
  hideCaret: false,
  dropdownLinks: [
    { value: "id:DESC", label: "Most Recent" },
    { value: "date:DESC", label: "Date" },
    // { label: "Link 3", value: "link3" },
  ],
  menuPosition: true,
};

SelectDropdown.propTypes = {
  buttonLabel: PropTypes.string,
  color: PropTypes.string,
  hideCaret: PropTypes.bool,
  dropdownLinks: PropTypes.array,
  menuPosition: PropTypes.bool,
  onClick: PropTypes.func,
  selectName: PropTypes.string.isRequired,
  getSelectedFilters: PropTypes.func,
};

export default SelectDropdown;
