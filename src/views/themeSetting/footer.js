import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
// Icons
import Text from "../../components/Text";
import SectionTitle from "../../components/SectionTitle";
import Url from "../../components/Url";
import { Setting } from "../../helpers/Setting";
import "../../scss/_custom.scss";
import ColorSelect from "../../components/colorSelect/colorSelect";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = (props) => {
  const { footToggle, footToggles, settingsFooter } = props;
  let {
    portal_footer_color,
    portal_footer_heading_color,
    portal_footer_text_color,
  } = settingsFooter;
  const [footersColors, setFootersColors] = useState(portal_footer_color);
  const [footersTextColor, setFootersTextColor] = useState(
    portal_footer_text_color
  );

  const footColor = footToggle ? "#ECF5FF" : "#FFFFFF";

  useEffect(() => {
    setFootersColors(settingsFooter.portal_footer_color);
    setFootersTextColor(settingsFooter.portal_footer_text_color);
  }, [
    props.settingsFooter.portal_footer_color,
    props.settingsFooter.portal_footer_heading_color,
    props.settingsFooter.portal_footer_text_color,
  ]);

  return (
    <>
      <div
        className="border p-2 cursor-pointer"
        style={{
          backgroundColor: footColor,
        }}
        onClick={footToggles}
      >
        <div className="position-relative">
          <p type="button" className=" btn-input pull-right">
            <>{!footToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
          </p>
        </div>
        {footToggle ? (
          <h5 className="text-primary">Footer </h5>
        ) : (
          <h5 className="">Footer </h5>
        )}
      </div>
      <div className="border border-top-0">
        <Collapse className="p-3" isOpen={footToggle}>
          {/* Footer color */}

          <SectionTitle label="Color" className="font-weight-normal" />

          <div className="field-wrapper">
            <ColorSelect
              name="portal_footer_color"
              defaultValue={portal_footer_color}
              setColor={props?.footerColor}
            />
          </div>

          {/* Footer Text color*/}

          <SectionTitle label="Text Color" className="d-flex" />

          <div className="field-wrapper">
            <ColorSelect
              name="portal_footer_text_color"
              defaultValue={portal_footer_text_color}
              setColor={props?.footerTextColor}
            />
          </div>

          {/* Footer Copyright text */}
          <h5>Copyright Text</h5>
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <Text
                className="border rounded"
                name={Setting.SETTINGS_PORTAL_FOOTER_COPY_RIGHTS_TEXT}
                placeholder="Enter Footer Copyright Text"
              />
            </div>
          </div>

          <h5>URL for Terms of Service</h5>
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <Url
                name={Setting.SETTINGS_TERMS_OF_SERVICE_URL}
                label="Set the path to your terms of service."
                placeholder="Enter the url..."
              />
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};
export default Footer;
