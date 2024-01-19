import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import AccountSelect from "../../components/AccountSelect";
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Currency from "../../components/Currency";
import DateSelector from "../../components/Date";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import MediaCarousel from "../../components/MediaCarousel";
import PageTitle from "../../components/PageTitle";
import PaymentAccountSelect from "../../components/PaymentAccountSelect";
import SaveButton from "../../components/SaveButton";
import Status from "../../components/Status";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import UserSelect from "../../components/UserSelect";
import ObjectName from "../../helpers/ObjectName";
import Payment from "../../helpers/Payment";
import Permission from "../../helpers/Permission";
import PaymentService from "../../services/PaymentService";
import { hasPermission } from "../../services/UserRolePermissionService";
import { AccountService } from "../../services/AccountService";
import DateTime from "../../lib/DateTime";
import Spinner from "../../components/Spinner";

const PaymentDetail = (props) => {
  const { history } = props;
  //   constant Name
  const Tab = { SUMMARY: "Summary", PRODUCTS: "Products", HISTORY: "History" };
  const Param = new URLSearchParams(props.history.location.search);
  const [detail, setDetail] = useState();
  const [userValue, setUserValue] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const tab = Param.get("tab");
  const [activeTab, setActiveTab] = useState(getSavedActiveTab());
  const [editable, setEditable] = useState(true);
  const [accountId, setAccountId] = useState();
  const [vendor, setVendor] = useState();
  const [paymentAccountName, setpaymentAccountName] = useState([]);
  const [DateChange, setonDateChange] = useState();
  const [invoiceChange, setInvoiceChange] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let showHistory = hasPermission(Permission.PAYMENT_HISTORY_VIEW);
  useEffect(() => {
    getAccountList();
    getDetails();
  }, []);

  const getAccountList = async () => {
    let vendorLists = new Array();
    const response = await AccountService.list();
    if (response && response.data) {
      response.data.forEach((vendor) => {
        vendorLists.push({
          label: vendor.name,
          value: vendor.id,
          id: vendor.id,
        });
      });
    }
    setAccountList(vendorLists);
  };

  const options = [
    {
      label: Payment.STATUS_NEW_TEXT,
      value: Payment.STATUS_NEW_TEXT,
    },
    {
      label: Payment.STATUS_PAID_TEXT,
      value: Payment.STATUS_PAID_TEXT,
    },
  ];

  const initialValues = {
    date: DateChange
      ? DateChange
      : DateTime.getDateTimeByUserProfileTimezone(detail?.date),
    status: options.find((data) => data.value == detail?.status),
    amount: detail?.amount ? detail?.amount : "",
    payment_account:
      accountId && accountId
        ? paymentAccountName.find((data) => data.value === accountId)
        : paymentAccountName.find(
          (data) => data.value == detail?.paymentAccount
        ),
    account:
      vendor && vendor
        ? vendor
        : accountList.find((data) => data.value == detail?.account),
    owner_id: "",
    notes: detail?.notes ? detail?.notes : "",
    description: detail?.description ? detail?.description : "",
    due_date: detail?.due_date ? detail?.due_date : "",
    invoice_number: invoiceChange
      ? invoiceChange
      : detail?.invoice_number
        ? detail?.invoice_number
        : "",
  };

  const getDetails = async () => {
    const data = await PaymentService.get(id);
    setDetail(data);
  };

  // Toggle change function
  const tabToggle = (tab) => {
    setActiveTab(tab);
  };

  const onStatusChange = (value) => {
    if (value) {
      handleSubmits(value);
    }
  };

  const handleSubmit = async (values) => {
    const data = new FormData();

    data.append("date", values?.date);
    data.append("amount", values && values?.amount);
    data.append(
      "owner_id",
      values && values?.owner_id?.id ? values?.owner_id?.id : ""
    );
    data.append("account", values && values.account.value);
    data.append(
      "payment_account",
      values?.payment_account?.value ? values?.payment_account?.value : ""
    );
    data.append("notes", values.notes ? values.notes : "");

    data.append("due_date", values && values?.due_date ? values?.due_date : "");
    data.append(
      "invoice_number",
      values?.invoice_number ? values?.invoice_number : ""
    );

    await PaymentService.update(id, data, (res) => {
      if (res) {
        setEditable(true);
        setIsLoading(true);
        getDetails();
        setIsLoading(false);
      }
    });
    setEditable(true);

  };

  const handleSubmits = async (values) => {
    const data = new FormData();

    data.append("status", values);

    await PaymentService.update(id, data, (res) => {
      if (res) {
        setIsLoading(true);
        getDetails();
        setIsLoading(false);
      }
    });
  };

  const breadcrumbList = [
    { label: "Home", link: "/accountDashboard" },
    {
      label: "Payments",
      link: "/payment",
    },
    {
      label: "Payment Details",
      link: "",
    },
  ];
  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }
  };
  const paymentsDelete = async () => {
    dispatch(await PaymentService.delete(id, history));
    history.push("/payment");
  };

  const handleVendorChange = (e) => {
    setVendor(e);
    setAccountId(e.paymentAccount);
  };

  const onDateChange = (e) => {
    setonDateChange(e ? e : "");
  };

  const onInvoiceChange = (e) => {
    let value = e?.target?.value;
    setInvoiceChange(value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  function getSavedActiveTab() {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab ? savedTab : "Summary";
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Payment"
        id={id}
        label={id}
        deleteFunction={paymentsDelete}
      />
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        <div>
          <PageTitle label={`Payment #${id}`} />
        </div>
        <div className="d-flex">
          {editable && (
            <Button
              label="Edit"
              loadingLabel="Editable"
              className="mr-1"
              disabled={editable == false ? true : false}
              onClick={() => {
                setEditable(false);
              }}
            />)}
          <Status
            objectName={ObjectName.PAYMENT}
            handleChange={onStatusChange}
            buttonLabel={detail?.statusName}
            currentStatusId={detail?.status}
            disabled={editable}
          />
          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>
      </div>

      <div>
        <Nav tabs className="admin-tabs">
          {/* Detail Tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.SUMMARY,
              })}
              onClick={() => {
                tabToggle(Tab.SUMMARY);
                // _handleTabChange(Tab.DETAIL);
                handleTabChange(Tab.SUMMARY);
              }}
            >
              {Tab.SUMMARY}
            </NavLink>
          </NavItem>
          {/* History Tab */}
          <NavItem>
            {showHistory && (
              <NavLink
                className={classNames({
                  active: activeTab === Tab.HISTORY,
                })}
                onClick={() => {
                  tabToggle(Tab.HISTORY);
                  handleTabChange(Tab.HISTORY);
                }}
              >
                {Tab.HISTORY}
              </NavLink>
            )}
          </NavItem>
        </Nav>
      </div>

      <TabContent activeTab={activeTab}>
        {/* Detail Tab Start*/}
        {activeTab == Tab.SUMMARY && (
          <TabPane tabId={Tab.SUMMARY} className="w-100 card card-body">
            <Form
              enableReinitialize
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-lg-7">
                  <div className="">
                    <DateSelector
                      label="Date"
                      name="date"
                      format="dd-MMM-yyyy"
                      disabled={editable}
                      required
                      onChange={onDateChange}
                    />

                    <AccountSelect
                      name="account"
                      label="Account"
                      placeholder="Select Account"
                      required
                      isDisabled={editable}
                      handleVendorChange={handleVendorChange}
                    />
                    <PaymentAccountSelect
                      isDisabled={editable}
                      setpaymentAccountName={setpaymentAccountName}
                      name={"payment_account"}
                      label={"Payment Account"}
                      required
                    />
                    <Text
                      label="Invoice Number"
                      name="invoice_number"
                      disabled={editable}
                      required
                      onChange={onInvoiceChange}
                    />

                    <Currency
                      label="Amount"
                      name="amount"
                      required
                      disabled={editable}
                    />

                    <div className="row">
                      <div className="col-6">
                        <UserSelect
                          name="owner_id"
                          label="Owner"
                          isDisabled={editable}
                          selectedUserId={
                            detail?.owner_id ? detail?.owner_id : null
                          }
                        />
                      </div>

                      <div className="col-6">
                        <DateSelector
                          label="Due Date"
                          name="due_date"
                          disabled={editable}
                        // isClearable
                        />
                      </div>
                    </div>
                    <TextArea
                      name="notes"
                      label="Notes"
                      placeholder="Enter Notes..."
                      error=""
                      fontBolded
                      disabled={editable}
                    />
                    {!editable && (
                      <>
                        <SaveButton label="Save" />
                        <CancelButton
                          onClick={() => props.history.push("/payment")}
                        />
                      </>)}
                  </div>
                </div>
                <div className="col-lg-5">
                  <MediaCarousel
                    showCarasoul
                    objectName={ObjectName.PAYMENT}
                    objectId={id}
                    history={history}
                    attachmentsList={true}
                    Attachments={"Attachments"}
                    editable={editable}
                  />
                </div>
              </div>
            </Form>
          </TabPane>
        )}
        {/* History Tab Start*/}
        {showHistory && activeTab == Tab.HISTORY && (
          <TabPane tabId={Tab.HISTORY} className="w-100">
            <ActivityList
              id={id}
              objectId={id}
              object_name={ObjectName.PAYMENT}
              history={history}
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

export default PaymentDetail;
