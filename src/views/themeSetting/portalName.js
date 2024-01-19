import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Collapse } from "reactstrap";
// Icons

import Text from "../../components/Text";
import "../../scss/_custom.scss";

const PortalName = (props) => {
  const { nameToggle, nameToggles } = props;

  const legalColor = nameToggle ? "#ECF5FF" : "#FFFFFF";

  return (
    <>
      <div
        className="border p-2 cursor-pointer"
        style={{
          backgroundColor: legalColor,
        }}
        onClick={nameToggles}>
        <div className="position-relative">
          <p type="button" className=" btn-input pull-right">
            <>{!nameToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
          </p>
        </div>
        {nameToggle ? (
          <h5 className="text-primary">Portal Name</h5>
        ) : (
          <h5 className="">Portal Name</h5>
        )}
      </div>
      <div className="border border-bottom-0 border-top-0">
        <Collapse className="p-3" isOpen={nameToggle}>
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <Text
                name="portal_name"
                label="Portal Name"
                placeholder="Enter Portal Name..."
                error=""
                required={true}
              />
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};
export default PortalName;
