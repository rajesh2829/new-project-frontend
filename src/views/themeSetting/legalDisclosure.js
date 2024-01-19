import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Collapse } from "reactstrap";
// Icons
import TextArea from "../../components/TextArea";
import { Setting } from "../../helpers/Setting";
import "../../scss/_custom.scss";

const LegalDisclosure = (props) => {
  const { toggleColor, legalToggle, legalNavToggles } = props;

  const legalColor = legalToggle ? "#ECF5FF" : "#FFFFFF";

  return (
    <>
      <div
        className="border p-2 cursor-pointer"
        style={{
          backgroundColor: legalColor,
        }}
        onClick={legalNavToggles}
      >
        <div className="position-relative">
          <p
            type="button"
            className=" btn-input pull-right"
          >
            <>{!legalToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
          </p>
        </div>
        {legalToggle ? (
          <h5 className="text-primary">Legal Disclosure</h5>
        ) : (
          <h5 className="">Legal Disclosure</h5>
        )}
      </div>
      <div className="border border-bottom-0 border-top-0">
        <Collapse className="p-3" isOpen={legalToggle}>
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <TextArea
                className="border rounded"
                name={Setting.SETTINGS_LEGAL_DISCLOSURE}
                // label="Legal Disclosure"
                placeholder="Enter the legal disclosure..."
              />
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};
export default LegalDisclosure;
