import classNames from "classnames";
import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import RecurringListPage from "./components/RecurringListPage";
import PageTitle from "../../components/PageTitle";
import ObjectName from "../../helpers/ObjectName";
import CountBadge from "../../components/CountBadge";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";

const Tab = {
  RECURRING_TASK: "Recurring Task",
  RECURRING_BILL: "Recurring Bill",
  RECURRING_PAYMENT: "Recurring Payment"
};

const RecurringTask = (props) => {

  let { taskCount, billCount,paymentCount} = props;
  const [activeTab, setActiveTab] = useState(Tab.RECURRING_TASK);
  const [row, setRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <PageTitle
        label="Recurring"
        buttonLabel="Add New"
        buttonHandler={() => {
          setRow("");
          setIsOpen(!isOpen);
        }}
      />
      <Nav tabs className="admin-tabs">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.RECURRING_TASK,
            })}
            onClick={() => {
              handleTabChange(Tab.RECURRING_TASK);
            }}
          >
            {Tab.RECURRING_TASK}
            <CountBadge
              count={taskCount}
              isActive={classNames({
                active: activeTab === Tab.RECURRING_TASK,
              })}
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.RECURRING_BILL,
            })}
            onClick={() => {
              handleTabChange(Tab.RECURRING_BILL);
            }}
          >
            {Tab.RECURRING_BILL}
            <CountBadge
              count={billCount}
              isActive={classNames({
                active: activeTab === Tab.RECURRING_BILL,
              })}
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.RECURRING_PAYMENT,
            })}
            onClick={() => {
              handleTabChange(Tab.RECURRING_PAYMENT);
            }}
          >
            {Tab.RECURRING_PAYMENT}
            <CountBadge
              count={paymentCount}
              isActive={classNames({
                active: activeTab === Tab.RECURRING_PAYMENT,
              })}
            />
          </NavLink>
        </NavItem>
      </Nav>

      {activeTab === Tab.RECURRING_TASK && (
        <RecurringListPage
          id="recurringTask"
          setRow={setRow}
          row={row}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          objectName={ObjectName.RECURRING_TASK}
          tab={activeTab}
          history={props.history}
        />
      )}

    {activeTab === Tab.RECURRING_BILL && (
        <RecurringListPage
          id="recurringBill"
          setRow={setRow}
          row={row}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          objectName={ObjectName.RECURRING_BILL}
          tab={activeTab}
          history={props.history}
        />
      )}

        {activeTab === Tab.RECURRING_PAYMENT && (
        <RecurringListPage
          id="recurringPayment"
          setRow={setRow}
          row={row}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          objectName={ObjectName.RECURRING_PAYMENT}
          tab={activeTab}
          history={props.history}
        />
      )}
    </>
  );
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;
  const taskCount =
    reduxTable["recurringTask"] &&
      reduxTable["recurringTask"].isFetching == false
      ? reduxTable["recurringTask"].totalCount
      : 0;
  // Get Accepted Users count
  const billCount =
    reduxTable["recurringBill"] &&
      reduxTable["recurringBill"].isFetching == false
      ? reduxTable["recurringBill"].totalCount
      : 0;
  // Get Accepted Users count
  const paymentCount =
    reduxTable["recurringPayment"] && reduxTable["recurringPayment"].isFetching == false
      ? reduxTable["recurringPayment"].totalCount
      : 0;
  return {
    taskCount,
    billCount,
    paymentCount,
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(RecurringTask);
