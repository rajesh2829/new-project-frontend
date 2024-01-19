import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import ColorSelect from "../../components/colorSelect/colorSelect";

// Components
import { Setting } from "../../helpers/Setting";
import "../../scss/_custom.scss";

const LeftNavigation = (props) => {
  const {
    leftNavBackgroundImageRef,
    leftNavToggle,
    onNavBackgroundImageChange,
    onNavBackgroundImageRemove,
    leftNavToggles,
    LeftNavigationBackgroundImageWithBaseUrl,
    toggleColor,
    settingsLeft,
  } = props;

  let {
    portal_left_navigation_text_color,
    portal_left_navigation_text_hover_over_color,
    portal_left_navigation_background_color
  } = settingsLeft;

  const [navigationColor, setNavigationColor] = useState(
    portal_left_navigation_text_color
  );

  const [navigationHoverColor, setNavigationHoverColor] = useState(
    portal_left_navigation_text_hover_over_color
  );

  const [navigationBackgroundColor, setNavigationBackgroundColor] = useState(
    portal_left_navigation_background_color

  );

  const leftNavColor = leftNavToggle ? "#ECF5FF" : "#FFFFFF";

  const onNavigationColourChange = (e) => {
    setNavigationColor(
      e.target.id,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_TEXT_COLOR
    );
    props.leftNavigationColor(e.target.id);
  };

  const onNavigationHoverColorChange = (e) => {
    setNavigationHoverColor(
      e.target.id,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_COLOR
    );
    props.leftNavigationHoverColor(e.target.id);
  };

  const onNavigationBackgroundColorChange = (e) => {
    setNavigationBackgroundColor(
      e.target.id,
      Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_COLOR
    );
    props.leftNavigationBackgroundColor(e.target.id);
  };

  useEffect(() => {
    setNavigationColor(settingsLeft.portal_left_navigation_text_color);
    setNavigationHoverColor(
      settingsLeft.portal_left_navigation_text_hover_over_color
    );
    setNavigationBackgroundColor(
      settingsLeft.portal_left_navigation_background_color
    );
  }, [
    props.settingsLeft.portal_left_navigation_text_color,
    props.settingsLeft.portal_left_navigation_text_hover_over_color,
    props.settingsLeft.portal_left_navigation_background_color,
  ]);

  return (
    <>
      <div
        className="border p-2 cursor-pointer"
        style={{
          backgroundColor: leftNavColor,
        }}
        onClick={leftNavToggles}
      >
        <div className="position-relative">
          <p
            type="button"
            className=" btn-input pull-right"
          >
            <>{!leftNavToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
          </p>
        </div>
        {leftNavToggle ? (
          <h5 className="text-primary">Left Navigation</h5>
        ) : (
          <h5>Left Navigation</h5>
        )}
      </div>

      {/* Left Navigation Text color*/}
      <div className="border border-bottom-0 border-top-0">
        <Collapse className="p-3" isOpen={leftNavToggle}>
          <h5>Text Color</h5>
          <div className="field-wrapper">
            <ColorSelect
              name="portal_left_navigation_text_color"
              defaultValue={portal_left_navigation_text_color}
              setColor={props?.leftNavigationColor}
            />
          </div>

          {/* Left Navigation Text color*/}
          <h5>Text Hover Over Color</h5>
          <div className="field-wrapper">
            <ColorSelect
              name="portal_left_navigation_text_hover_over_color"
              defaultValue={portal_left_navigation_text_hover_over_color}
              setColor={props?.leftNavigationHoverColor}
            />
          </div>
          <h5>Background Color</h5>
          <div className="field-wrapper">
            <ColorSelect
              name="portal_left_navigation_background_color"
              defaultValue={portal_left_navigation_background_color}
              setColor={props?.leftNavigationBackgroundColor}
            />
          </div>
        </Collapse>
      </div>

    </>
  );
};
export default LeftNavigation;
