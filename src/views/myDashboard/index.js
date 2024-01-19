import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import TicketList from "../../components/TicketList";
import DateTime from "../../lib/DateTime";
import AttendanceService from "../../services/AttendanceService";
import CompanyUserService from "../../services/CompanyUserService";
import { hasPermission } from "../../services/UserRolePermissionService";
import Permission from "../../helpers/Permission";
import TicketSummaryList from "./components/TicketSummaryList";
import RefreshButton from "../../components/refreshButton";
import { useDispatch } from "react-redux";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import { User } from "../../helpers/User";
import Url from "../../lib/Url";
import Cookie from "../../helpers/Cookie";
import Cookies from "../../lib/Helper";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classNames from "classnames";
import { Group } from "../../helpers/Status";
import BillList from "../bill/components/billList";
import PurchaseListPage from "../purchase/components/purchaseList"
import PaymentList from "../payment/components/paymentList";
import PaymentService from "../../services/PaymentService";
import DeleteModal from "../../components/DeleteModal";

export const Tab = {
  TICKET_SUMMARY: "Ticket Summary",
  TODAY_TICKETS: "Pending Tickets",
  PENDING_BILLS: "Pending Bills",
  PENDING_PURCHASES: "Pending Purchases",
  PENDING_PAYMENTS: "Pending Payments",
};

const MyDahboard = (props) => {
  const [attendance, setAttendance] = useState("");
  const [userDetail, setUserDetail] = useState("");
  const [checkinPermission, setCheckinPermission] = useState("");
  const [userName, setUserName] = useState("");
  const [rowValue, setRowValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const [activeTab, setActiveTab] = useState(Tab.TICKET_SUMMARY);
  let showTicketSummery = hasPermission(Permission.TICKET_MANAGE_OTHERS);
  const dispatch = useDispatch();
  useEffect(() => {
    getAttendanceList();
    getUserDetail();
  }, []);

  const getAttendanceList = async () => {
    const permission = hasPermission(Permission.USER_WEB_CHECKIN);
    setCheckinPermission(permission);
    let attendance = {
      startDate: DateTime.formatDate(new Date()),
      endDate: DateTime.toISOStrings(new Date()),
    };
    let data = await AttendanceService.getAttendenceByUserId(attendance);
    if (data) {
      setAttendance(data.data);
    }
  };

  const toggle = (tab) => {
    setActiveTab(tab);
    props.history.push("/mydashboard")
  };

  const getUserDetail = async () => {
    let userDetail = await CompanyUserService.getLoggedInUser();
    if (userDetail) {
      let userName = userDetail.name ? userDetail.name + " " + (userDetail.lastName ? userDetail.lastName : "") : "";
      setUserName(userName);
    }
    setUserDetail(userDetail);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsSubmitting(true);
    setRowValue("");
  };

  const toggles = () => {
    setIsOpen(!isOpen);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const paymentsDelete = async () => {
    dispatch(await PaymentService.delete(rowValue?.id, props.history))
    closeDeleteModal()
  };

  const attendanceHandler = async () => {
    if (attendance && attendance.length > 0 && attendance[0].login) {
      let response = await AttendanceService.CheckOutValidation(
        attendance[0].id
      );
      if (response && response.data) {
        await AttendanceService.Checkout({ attendanceId: attendance[0].id });
      }
      getAttendanceList();
    } else {
      const params = {
        shiftId: userDetail?.primary_shift_id,
        store: userDetail?.primary_location_id,
        type: "Working Day",
      };
      await AttendanceService.Checkin(params);

      getAttendanceList();
    }
  };

  const handleRefreshButton = () => {
    let param = {
      sort: Url.GetParam("sort"),
      sortDir: Url.GetParam("sortDir")
    }
    {
      activeTab === Tab.TICKET_SUMMARY &&
        dispatch(
          fetchList("summary", `${endpoints().ticketAPI}/summery`, 1, 25, {
            status: User.STATUS_ACTIVE_VALUE,
            ...param
          })
        );
    }
    {
      activeTab === Tab.TODAY_TICKETS &&
        dispatch(
          fetchList("ticket", `${endpoints().ticketAPI}/pending`, 1, 25, param)
        );
    }
    {
      activeTab === Tab.PENDING_PAYMENTS &&
        dispatch(
          fetchList("payment", `${endpoints().paymentAPI}/pending`, 1, 25, param)
        );
    }
    {
      activeTab === Tab.PENDING_BILLS &&
        dispatch(
          fetchList("bill", `${endpoints().billAPI}/pending`, 1, 25, param)
        );
    }
    {
      activeTab === Tab.PENDING_PURCHASES &&
        dispatch(
          fetchList(
            "pendingPurchases",
            `${endpoints().purchaseAPI}/pending`,
            1,
            25,
            param
          )
        );
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Hello {userName}!</h3>
        {checkinPermission && (
          <div>
            {attendance &&
              attendance.length > 0 &&
              attendance[0].login &&
              attendance[0].logout ? (
              ""
            ) : (
              <Button
                className="btn btn-secondary font-weight-bold "
                label={
                  attendance &&
                    attendance.length > 0 &&
                    attendance[0].login &&
                    !attendance[0].logout
                    ? "Check out"
                    : "Check In"
                }
                onClick={() => attendanceHandler()}
              />
            )}
            {attendance &&
              attendance.length > 0 &&
              attendance[0].login &&
              !attendance[0].logout ? (
              <div className="pull-left h6-5-important font-weight-bold mr-5 mt-2">
                <span>CheckIn: {DateTime.LocalTime(attendance[0].login)}</span>
              </div>
            ) : (
              attendance &&
              attendance.length > 0 &&
              attendance[0].login &&
              attendance[0].logout && (
                <div className="pull-right h6-5-important font-weight-bold mr-5 mt-2">
                  <span>
                    CheckIn: {DateTime.LocalTime(attendance[0].login)}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Checkout:{" "}
                    {DateTime.LocalTime(attendance[0].logout)}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <hr />
      <div className="float-right">
        <RefreshButton onClick={handleRefreshButton} />
      </div>
      <Nav tabs className="admin-tabs">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.TICKET_SUMMARY,
            })}
            onClick={() => {
              toggle(Tab.TICKET_SUMMARY);
            }}
          >
            Ticket Summary
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.TODAY_TICKETS,
            })}
            onClick={() => {
              toggle(Tab.TODAY_TICKETS);
            }}
          >
            {Tab.TODAY_TICKETS}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.PENDING_PAYMENTS,
            })}
            onClick={() => {
              toggle(Tab.PENDING_PAYMENTS);
            }}
          >
            {Tab.PENDING_PAYMENTS}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.PENDING_BILLS,
            })}
            onClick={() => {
              toggle(Tab.PENDING_BILLS);
            }}
          >
            {Tab.PENDING_BILLS}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.PENDING_PURCHASES,
            })}
            onClick={() => {
              toggle(Tab.PENDING_PURCHASES);
            }}
          >
            {Tab.PENDING_PURCHASES}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.TICKET_SUMMARY} className="w-100">
          {activeTab == Tab.TICKET_SUMMARY && (
            <TicketSummaryList {...props} />
          )}
        </TabPane>
        {activeTab === Tab.TODAY_TICKETS && (
          <TabPane tabId={Tab.TODAY_TICKETS} className="w-100">
            <TicketList
              props={props}
              history={props.history}
              showSearch
              apiUrl={`${endpoints().ticketAPI}/pending`}
              projectId={
                Url.GetParam("projectId") !== undefined
                  ? Url.GetParam("projectId")
                  : Cookies.get(Cookie.PROJECT_ID)
              }
            />
          </TabPane>
        )}
        <DeleteModal
          isOpen={openDeleteModal}
          label={rowValue?.id}
          toggle={closeDeleteModal}
          title="Delete Payment"
          deleteFunction={paymentsDelete}
        />
        {activeTab === Tab.PENDING_PAYMENTS && (
          <TabPane tabId={Tab.PENDING_PAYMENTS} className="w-100">
            <PaymentList
              props={props}
              history={props.history}
              apiUrl={`${endpoints().paymentAPI}/pending`}
              setIsSubmitting={setIsSubmitting}
              isSubmitting={isSubmitting}
              params={{
                sort: Url.GetParam("sort"),
                sortDir: Url.GetParam("sortDir"),
              }
              }
              toggles={toggles}
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
              setRowValue={setRowValue}
              rowValue={rowValue}
              setOpenDeleteModal={setOpenDeleteModal}

            />
          </TabPane>
        )}
        {activeTab === Tab.PENDING_BILLS && (
          <TabPane tabId={Tab.PENDING_BILLS} className="w-100">
            <BillList
              history={props.history}
              apiUrl={`${endpoints().billAPI}/pending`}
            />
          </TabPane>
        )}
        {activeTab === Tab.PENDING_PURCHASES && (
          <TabPane tabId={Tab.PENDING_PURCHASES} className="w-100">
            <PurchaseListPage
              id={"pendingPurchases"}
              history={props.history}
              apiUrl={`${endpoints().purchaseAPI}/pending`}
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default MyDahboard;
