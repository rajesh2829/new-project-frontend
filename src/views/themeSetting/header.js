import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Collapse } from "reactstrap";

// Icons
import ColorSelect from "../../components/colorSelect/colorSelect";

const Header = (props) => {
  const { toggleColor, headerToggle, headerToggles, settings } = props;
  let { portal_header_color, portal_header_text_color } = settings;
  const [color, setColor] = useState(portal_header_color);
  const [textColor, setTextColor] = useState(portal_header_text_color);

  const headerColor = headerToggle ? "#ECF5FF" : "#FFFFFF";

  return (
    <>
      <div
        className="border p-2 cursor-pointer"
        style={{
          backgroundColor: headerColor,
        }}
        onClick={headerToggles}
      >
        <div className="position-relative">
          <p
            type="button"
            className="pull-right h-50 position-relative"
          >
            <>{!headerToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
          </p>
        </div>
        {headerToggle ? (
          <h5 className="text-primary">Header</h5>
        ) : (
          <h5>Header</h5>
        )}
      </div >
      <div className="border border-bottom-0 border-top-0">
        <Collapse className="p-3" isOpen={headerToggle}>
          {/* Header color */}
          <h5>Color</h5>
          <div className="field-wrapper">
            <ColorSelect
              name="portal_header_color"
              defaultValue={settings.portal_header_color}
              setColor={props.setHeaderColor}
            />
          </div>

          {/* Header Text color*/}
          <h5>Text Color</h5>
          <div className="field-wrapper">
            <ColorSelect
              name="portal_header_text_color"
              defaultValue={settings.portal_header_text_color}
              setColor={props.setHeaderTextColor}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Header;
