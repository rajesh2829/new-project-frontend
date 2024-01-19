import React, { useEffect, useState } from "react";
import UserContext from "../../context/userContext/userContext";
import Form from "../Form";
import Select from "../Select";

const PortalDropdown = (props) => {
  const { headerTextColor, headerColor, portalList, handlePortalChange, id, companyList } =
    props;

  const [currentPortalId, setCurrentPortalId] = useState("");
  const [currentPortalName, setCurrentPortalName] = useState("");
  

  const getPortalNameById = (id) => {
    if (currentPortalId != id) setCurrentPortalId(id);
    if (portalList.length > 0)
      portalList.forEach((portalDetails) => {
        if (portalDetails.value == id) {
          setCurrentPortalName(portalDetails.label);
          return portalDetails.label;
        }
      });
    else return "Portal";
  };

  useEffect(() => {
    getPortalNameById(currentPortalId);
  }, [currentPortalId]);

  return (
    <div
      className="dropdown-wrapper ml-auto mr-2 mt-2 pt-1"
      style={{ zIndex: "4" }}
    >
      <UserContext.Consumer>
        {(context) => (
          <>
            <Form initialValues={{}}>
              {context.userLoggedIn ? (
                <Select
                  name="Portal"
                  placeholder="Portal"
                  options={companyList}
                  isSearchable={true}
                  handleChange={(values) => {
                    handlePortalChange(values.id);
                  }}
                  clearable={false}    // Used clearable as false to hide the clearable option in portal dropdown 
                  width={"200px"}
                  textColor={headerTextColor}
                  color={headerColor}
                  marignBottom
                  isDisabled={true}
                />
              ) : (
                ""
              )}
            </Form>
          </>
        )}
      </UserContext.Consumer>
    </div>
  );
};

export default PortalDropdown;
