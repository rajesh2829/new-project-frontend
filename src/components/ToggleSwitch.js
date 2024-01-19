import React from "react";

const ToggleSwitch = (props) => {
  const {
    id,
    label,
    label1,
    label2,
    name,
    title,
    handleChange,
    value,
    theme,
    size,
    outlined,
    className,
    togglePosition,
    fontBolded,
  } = props;

  let defaultTheme = theme ? theme : "primary";
  let defaultSize = size ? size : " small";

  const switchOutlined = () => outlined && "outlined";
  const activeClass = () => (value ? "active" : "");
  const componentClass = [
    defaultTheme,
    defaultSize,
    switchOutlined(),
    activeClass(),
  ];
  return (
    <div className="row">
      {(
        <div>
          <span className={`${fontBolded ? "font-weight-bold" : ""}`}>
            {label}
          </span>
        </div>
      )}
      <div className="col-2">
        <div
          className={[
            ...componentClass,
            "switch-wrapper",
            className ? className : ["flex-row"].join(" "),
          ].join(" ")}
        >
          {title && <p className="font-weight-bold mb-2">{title}</p>}

          <div className="switch-wrapper">
            <label className="switch">
              <input
                id={id}
                name={name}
                type="checkbox"
                value={value}
                onChange={handleChange}
                checked={value}
              />
              <div className="slider" />
            </label>
            {togglePosition && (
              <h6>{value ? label2 : label1 ? label1 : label}</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
