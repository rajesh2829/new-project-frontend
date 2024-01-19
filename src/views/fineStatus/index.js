import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classNames from "classnames";
import AddButton from "../../components/AddButton";
import PageTitle from "../../components/PageTitle";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import ObjectName from "../../helpers/ObjectName";
import { Tabs } from "../../helpers/Setting";
import TagDetail from "../../components/TagList";

const FineStatus = (props) => {
  let { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.TYPES);
  const [isTypeModelOpen, setIsTypeModelOpen] = useState(false)
  const [row, setRow] = useState();
  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const _toggles = () => {
    setIsTypeModelOpen(!isTypeModelOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddButtonClick = () => {
    _toggle();
    setRow("");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle label="Fine" />
        {activeTab === Tabs.STATUS && (
          <AddButton
            className="py- ml-2 mr-1"
            label="Add Status"
            onClick={handleAddButtonClick}
          />
        )}
        {activeTab === Tabs.TYPES && (
          <AddButton
            className="py- ml-2 mr-1"
            label="Add Type"
            onClick={() => _toggles()}
          />
        )}
      </div>
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.TYPES,
            })}
            onClick={() => handleTabClick(Tabs.TYPES)}
          >
            {Tabs.TYPES}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.STATUS,
            })}
            onClick={() => handleTabClick(Tabs.STATUS)}
          >
            {Tabs.STATUS}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {activeTab === Tabs.STATUS && (
          <TabPane tabId={Tabs.STATUS}>
            <DragAndDropTable
              history={history}
              objectName={ObjectName.FINE}
              showUrl
              _toggle={_toggle}
              isOpen={isOpen}
              row={row}
              setRow={setRow}
            />
          </TabPane>
        )}
        {activeTab === Tabs.TYPES && (
          <TabPane tabId={Tabs.TYPES}>
            <TagDetail
              tagType={"FineType"}
              noTagDetail={true}
              history={history}
              showPageTitle={true}
              showEditPopup
              isModel={isTypeModelOpen}
              __toggle={_toggles}

              props={props}

            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default FineStatus;
