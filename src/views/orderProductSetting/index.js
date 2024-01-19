import React, { useState } from "react";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import ObjectName from "../../helpers/ObjectName";
import PageTitle from "../../components/PageTitle";
import { Nav, NavItem, NavLink, TabPane } from "reactstrap";
import classNames from "classnames";
import { Tabs } from "../../helpers/Setting";

const OrderProductSetting = (props) => {
  let { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.STATUS); 
  const[row,setRow] = useState();
  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PageTitle
        label="Order Product"
        buttonHandler={() => {
          _toggle();
          setRow("");
        }}
        buttonLabel="Add"
      />
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.STATUS,
            })}
          >
            {Tabs.STATUS}
          </NavLink>
        </NavItem>
      </Nav>
      {activeTab === Tabs.STATUS && (
        <TabPane>
          <DragAndDropTable
            history={history}
            objectName={ObjectName.ORDER_PRODUCT}
            showUrl
            _toggle={_toggle}
            isOpen={isOpen}
            row={row}
            setRow={setRow}
          />
        </TabPane>
      )}
    </>
  );
};

export default OrderProductSetting;
