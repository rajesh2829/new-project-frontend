import React, { useState } from "react";
import { Row } from "reactstrap";
import { Navlist } from "../../helpers/Nav";
import SideNavBar from "./components/SideNavBar";
import TabContentSection from "./components/TabContentSection";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { history, match, settings } = props;

  const toggle = (tab, subtab = "") => {
    const activeTab = match.params.tab;
    const activeSubTab = match.params.subtab;
    const activeSection = match.params.section;
    if (activeTab !== tab || activeSubTab !== subtab || activeSection) {
      history.push(`/setting/${tab}${subtab ? "/" + subtab : ""}`);
    }
    setIsActive(false);
  };

  const activeTab = match.params.tab;
  const activeSubTab = match.params.subtab;
  const activeSection = match.params.section;

  const sideBarActive = () => {
    // Toggle the mobile menu open/closed
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="mobile-menu">
        <div className="card mb-3">
          <div className="m-2" onClick={() => sideBarActive()}>
            <span className="font-weight-bold">Settings</span>
            <span className="float-right">
              {isActive ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </span>
          </div>
        </div>
        <div className={isActive ? "mobile-wrapper" : "d-none"} onClick={() => sideBarActive()}>
          <SideNavBar activeTab={match.params.tab} handleClick={toggle} />
        </div>
      </div>
      <Row className="mt-n3 mt-md-n4 admin-setting">
        <div className="d-none d-sm-block sidemenu">
          <SideNavBar
            activeTab={activeTab || Navlist.ACCOUNT}
            activeSubTab={activeSubTab}
            toggleTabs={toggle}
            history={history}
            match={match}
          />
        </div>
        <div className="col">
          <TabContentSection
            activeTab={activeTab || Navlist.ACCOUNT}
            activeSubTab={activeSubTab}
            activeSection={activeSection}
            toggleTabs={toggle}
            history={history}
            match={match}
            settings={settings}
          />
        </div>
      </Row>
    </>
  );
};

export default User;
