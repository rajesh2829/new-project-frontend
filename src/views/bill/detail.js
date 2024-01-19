import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import MediaCarousel from "../../components/MediaCarousel";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import StatusComponent from "../../components/Status";
import Media from "../../helpers/Media";
import MediaUpload from "../../helpers/MediaUpload";
import ObjectName from "../../helpers/ObjectName";
import Currency from "../../lib/Currency";
import DateTime from "../../lib/DateTime";
import { isBadRequest } from "../../lib/Http";
import Number from "../../lib/Number";
import String from "../../lib/String";
import BillService from "../../services/BillService";
import PaymentService from "../../services/PaymentService";
import StatusService from "../../services/StatusService";
import PaymentList from "../payment/components/paymentList";
import BillForm from "./components/billForm";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import Permission from "../../helpers/Permission";
import { hasPermission } from "../../services/UserRolePermissionService";
import TaxList from "./TaxList";
import Spinner from "../../components/Spinner";
import Comment from "../../components/comment";
import PurchaseList from "../purchase/components/purchaseList";
import AccountService from "../../services/AccountService";
import Button from "../../components/Button";
import StatusSelect from "../../components/SelectStatus";
import ProductForm from "../purchase/components/productForm"

const BillDetail = (props) => {
  const { history } = props;
  //   constant Name
  const Tab = {
    SUMMARY: "Summary",
    PAYMENT: "Payments",
    HISTORY: "History",
    TAX: "Tax",
    ATTACHMENTS: "Attachments",
    COMMENTS: "Comments",
    PURCHASE: "Purchases",
    PRODUCT: "Products"
  };

  let showEditButton = hasPermission(Permission.BILL_EDIT);

  const Param = new URLSearchParams(props.history.location.search);
  const [deleteModal, setDeleteModal] = useState(false);
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const tab = Param.get("tab");
  const [activeTab, setActiveTab] = useState(tab ? tab : Tab.SUMMARY);
  const [billValue, setBillValue] = useState();
  const [billData, setBillData] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [accountValue, setAccountValue] = useState();
  const [accountData, setAccountData] = useState();
  const [netAmount, setNetAmount] = useState("");
  const [invoiceDate, SetInvoiceDate] = useState();
  const [gstStatus, setGstStatus] = useState();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ownerValue, setOwnerValue] = useState();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [rowValue, setRowValue] = useState(null);
  let showHistory = hasPermission(Permission.BILL_HISTORY_VIEW);

  const [otherDeductionAmount, setOtherDeductionAmount] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [cashDiscountPercentage, setCashDiscountPercentage] = useState("");
  const [cashDiscountAmount, setCashDiscountAmount] = useState("");
  const [returnedAmount, setReturnedItemsAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vendorList, setVendorList] = useState();
  const [editable, setEditable] = useState(true);
  const [expiryReturnProductAmount, setExpiryReturnProductAmount] = useState("")
  useEffect(() => {
    const searchParams = new URLSearchParams(props.history.location.search);
    searchParams.set("tab", activeTab);
    props.history.replace({
      ...props.history.location,
      search: searchParams.toString(),
    });
  }, [activeTab, props.history]);

  useEffect(() => {
    getStatus();
    getBillDetail();
    getPaymentDetail();
  }, [props]);

  useEffect(() => {
    getVendorList(billData?.account?.id || accountData?.account?.id);
  }, [billData?.account?.id, accountData?.account?.id]);

  const handleInvoiceAmount = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    setInvoiceAmount(newValue);
  };

  const handleCashDiscountPerentage = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    setCashDiscountPercentage(newValue);
  };

  const handleOtherDeductionAmount = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    setOtherDeductionAmount(newValue);
  };
  const handleReturnedAmount = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    setReturnedItemsAmount(newValue);
  };

  const handleExpiryReturnedProductAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setExpiryReturnProductAmount(value)
  }

  // calculte payble amount
  useEffect(() => {
    const invoiceAmountUse = invoiceAmount
      ? invoiceAmount
      : billData.invoice_amount;
    const returnsAmountuse =
      returnedAmount === 0
        ? 0
        : returnedAmount
          ? returnedAmount
          : billData?.rejectedProductAmount;
    const otherDeductionAmountUse =
      otherDeductionAmount === 0
        ? 0
        : otherDeductionAmount
          ? otherDeductionAmount
          : billData.otherDeductionAmount;
    const calculatedpaymentAmount =
      invoiceAmountUse - returnsAmountuse - otherDeductionAmountUse;
    setPaymentAmount(calculatedpaymentAmount);
  }, [
    invoiceAmount,
    billData?.rejectedProductAmount,
    otherDeductionAmount,
    returnedAmount,
    billData?.invoice_amount,
    billData?.otherDeductionAmount,
  ]);

  useEffect(() => {
    const paybleAmountUse = paymentAmount
      ? paymentAmount
      : invoiceAmount
        ? invoiceAmount
        : billData?.invoice_amount;
    const cashDiscountPercentageUse =
      cashDiscountPercentage === 0
        ? 0
        : cashDiscountPercentage
          ? cashDiscountPercentage
          : billData.cash_discount_percentage;
    const calculatedCashDiscountAmount =
      paybleAmountUse * (cashDiscountPercentageUse / 100);
    setCashDiscountAmount(calculatedCashDiscountAmount);
  }, [
    invoiceAmount,
    cashDiscountPercentage,
    billData.invoice_amount,
    billData.rejectedProductAmount,
    returnedAmount,
    otherDeductionAmount,
    paymentAmount,
  ]);

  useEffect(() => {
    let netAmount = (paymentAmount - cashDiscountAmount - (expiryReturnProductAmount || billData.expiryReturnedProductAmount));
    setNetAmount(netAmount);
  }, [paymentAmount, cashDiscountAmount, expiryReturnProductAmount]);

  const tabToggle = (tab) => {
    if (Tab.PAYMENT) {
      getBillDetail();
    }
    history.push(`/bill/detail/${id}`)
    setActiveTab(tab);
  };
  const onStatusChange = (value) => {
    let data = {};
    data.status = value;
    dispatch(
      BillService.updateStatus(id, data, {}, (res) => {
        if (res) {
          setIsLoading(true);
          getBillDetail();
          setIsLoading(false);
        }
      })
    );
  };
  const billName = (values) => {
    const value = values?.values?.billing_name?.label;
    setBillValue(value);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsSubmitting(true);
    setRowValue("");
  };

  const onInvoiceNumberChange = (e) => {
    const value = e.target.value;
    setInvoiceNumber(value);
  };
  const onAccountChange = (e) => {
    setAccountValue(e);
  };
  const onNetAmountChange = (e) => {
    const value = e?.values?.net_amount;
    setNetAmount(value);
  };

  const invoiceDateChange = (e) => {
    SetInvoiceDate(e);
  };
  //Get Bill Detail
  const getBillDetail = async () => {
    let id = props.match.params.id;
    try {
      const response = await apiClient.get(
        `${endpoints().billAPI}/detail/${id}`
      );
      const data = response?.data?.data ? response?.data?.data : "";
      setBillData(data);
      setAccountData(data);
      setInvoiceAmount(data?.invoice_amount);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(response?.data?.data?.notes))
        )
      );
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  const getPaymentDetail = async () => {
    let param = {
      bill_id: id,
    };
    let response = await PaymentService.search(param);
    let data = response && response.data && response.data.data;
    setPaymentId(data && data[0]?.id);
  };

  const getStatus = async () => {
    const value = await StatusService.search(ObjectName.BILL_GST_STATUS, "");
    const status = [];
    value.forEach((statusValue) => {
      status.push({
        value: statusValue.id,
        label: statusValue.name,
      });
    });
    setGstStatus(status);
  };

  const getVendorList = async (id) => {
    if (id) {
      const vendor = await AccountService.getVendor(id);
      let vendors = vendor?.data?.payment_terms
        ? vendor?.data?.payment_terms
        : null;
      setVendorList(vendors);
    }
  };

  //Handle Update purchase Details
  const handleUpdate = async (id, values) => {
    let rawComment;
    if (editorState) {
      rawComment = convertToRaw(editorState.getCurrentContent());
    }
    const data = new FormData();
    data.append(
      "date",
      values && DateTime.toISOStringDate(values.invoice_date)
    );
    data.append(
      "due_date",
      values && values?.due_date ? DateTime.formatDate(values?.due_date) : ""
    );
    data.append(
      "billing_name",
      values && String.Get(values.billing_name.label)
    );
    data.append("invoice_number", values && String.Get(values.invoice_number));
    data.append(
      "account_id",
      values ? String.Get(values.account.value) : accountData?.account?.id
    );
    data.append("gst_status", values && Number.Get(values?.gst_status?.value));
    data.append("net_amount", values && Currency.Get(values?.net_amount));
    data.append(
      "gstAmount",
      values && values?.gstAmount ? values?.gstAmount : ""
    );
    data.append(
      "cashDiscountAmount",
      values && values?.cashDiscountAmount
        ? Currency.Get(values?.cashDiscountAmount)
        : ""
    );
    data.append(
      "otherDeductionAmount",
      values && values?.otherDeductionAmount
        ? Currency.Get(values?.otherDeductionAmount)
        : ""
    );
    data.append(
      "cash_discount_percentage",
      values && values?.cash_discount_percentage
        ? Currency.Get(values?.cash_discount_percentage)
        : ""
    );
    data.append(
      "notes",
      JSON.stringify(rawComment) ? JSON.stringify(rawComment) : ""
    );
    data.append(
      "invoice_amount",
      values && values?.invoice_amount
        ? Currency.Get(values?.invoice_amount)
        : ""
    );
    data.append(
      "rejectedProductAmount",
      values && values?.rejectedProductAmount
        ? Currency.Get(values?.rejectedProductAmount)
        : ""
    );
    data.append(
      "expiryReturnedProductAmount",
      values && values?.expiryReturnedProductAmount
        ? Currency.Get(values?.expiryReturnedProductAmount)
        : ""
    );

    data.append(
      "owner",
      values?.owner?.id
        ? values?.owner?.id
        : billData?.owner_id
          ? billData?.owner_id
          : ""
    );

    await dispatch(BillService.update(id, data, {}));
    setEditable(true);
  };
  const breadcrumbList = [
    { label: "Home", link: "/accountDashboard" },
    {
      label: "Bills",
      link: "/bill",
    },
    {
      label: "Bill Details",
      link: "",
    },
  ];

  const actionsMenuList = [
    {
      value: "Delete",
      label: "Delete",
    },
  ];

  const billDelete = async () => {
    dispatch(await BillService.delete(id, history));
    history.push("/bill");
  };

  const handleActionChange = (e) => {
    if (e == "Delete") {
      setDeleteModal(true);
    }
  };

  const handleTaxAmount = (e) => {
    setTaxAmount(e.target.value);
  };
  const initialValues = {
    bill_number: billData.bill_number,
    invoice_date: invoiceDate
      ? DateTime.getDateTimeByUserProfileTimezone(invoiceDate)
      : DateTime.getDateTimeByUserProfileTimezone(billData.bill_date),
    due_date: dueDate
      ? dueDate
      : billData?.due_date
        ? DateTime.getDateTimeByUserProfileTimezone(billData?.due_date)
        : "",
    account: {
      label: accountValue?.label
        ? accountValue?.label
        : accountData?.account?.name,
      value: accountValue?.value
        ? accountValue?.value
        : accountData?.account?.id,
    },

    billing_name:
      billValue || billData?.billing_name
        ? {
          label: billValue ? billValue : billData?.billing_name,
          value: billValue ? billValue : billData?.billing_name,
        }
        : "",
    invoice_number:
      invoiceNumber == ""
        ? 0
        : invoiceNumber
          ? invoiceNumber
          : billData.invoice_number,
    net_amount: netAmount ? Currency.Get(netAmount) : "",
    gstAmount: taxAmount
      ? taxAmount
      : billData?.gstAmount
        ? billData?.gstAmount
        : "",
    otherDeductionAmount:
      otherDeductionAmount === 0
        ? ""
        : otherDeductionAmount
          ? otherDeductionAmount
          : billData?.otherDeductionAmount,
    invoice_amount:
      invoiceAmount === 0
        ? ""
        : invoiceAmount
          ? Currency.Get(invoiceAmount)
          : "",
    cashDiscountAmount:
      cashDiscountPercentage === 0
        ? ""
        : cashDiscountAmount
          ? cashDiscountAmount
          : billData?.cashDiscountAmount,
    cash_discount_percentage:
      cashDiscountPercentage === 0
        ? ""
        : cashDiscountPercentage
          ? cashDiscountPercentage
          : billData?.cash_discount_percentage,
    rejectedProductAmount:
      returnedAmount === 0
        ? ""
        : returnedAmount
          ? returnedAmount
          : billData?.rejectedProductAmount,
    expiryReturnedProductAmount: expiryReturnProductAmount === 0 ? "" : expiryReturnProductAmount ? expiryReturnProductAmount : billData?.expiryReturnedProductAmount,
    owner: "",
  };
  const toggles = () => {
    setIsOpen(!isOpen);
  };
  const toggle = () => {
    setIsModelOpen(!isModelOpen);
  };
  const handleImageUpload = async (values) => {
    if (paymentId) {
      await MediaUpload.uploadFile(
        selectedFile,
        paymentId,
        ObjectName.PAYMENT,
        values,
        Media.VISIBILITY_PRIVATE,
        ""
      );
      setEditable(true);
    }
  };

  const handleImageBillTaxUpload = async (values) => {
    if (id) {
      await MediaUpload.uploadFile(
        selectedFile,
        id,
        ObjectName.BILL_TAX,
        values,
        Media.VISIBILITY_PRIVATE,
        ""
      );
      setEditable(true);
    }
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  if (isLoading) {
    return <Spinner />;
  }
  const handleDueDateChange = (e) => {
    setDueDate(e);
  };

  const handleStatusChange = async (values) => {
    let data = new FormData()
    data.append("gst_status", values && Number.Get(values?.value));
    dispatch(await BillService.updateGstStatus(id, data, {}));
    setEditable(true);
  }

  let gstStatusValue = gstStatus &&
    gstStatus.find((data) => data.value === billData?.gst_status)

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Bill"
        id={id}
        label={id}
        deleteFunction={billDelete}
      />

      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between">
        <div>
          <PageTitle label={`Bill #${billData.bill_number}`} />
        </div>

        <div className="d-flex align-items-center">
          {(activeTab === Tab.PAYMENT || activeTab === Tab.TAX) && (
            <AddButton
              label={activeTab === Tab.PAYMENT ? "Add Payment" : "Add Tax"}
              onClick={(e) => {
                toggles();
              }}
            />
          )}

          <div className="ml-2 d-flex">
            {showEditButton && editable && (
              <Button
                label="Edit"
                loadingLabel="Editable"
                className="mr-1"
                disabled={editable == false ? true : false}
                onClick={() => {
                  setEditable(false);
                }}
              />
            )}

            <StatusComponent
              objectName={ObjectName.BILL}
              handleChange={onStatusChange}
              buttonLabel={billData?.status_name}
              currentStatusId={billData?.status_id}
              color={billData?.colorCode}
            />
            <div className="ml-2">
              <Action
                buttonLabel="Actions"
                hideCaret
                dropdownLinks={actionsMenuList}
                handleChange={handleActionChange}
              />
            </div>
          </div>
        </div>
      </div>

      {vendorList && (
        <div
          className="shadow mx-0 my-3 bg-danger"
          style={{ borderRadius: "10px" }}
        >
          <pre className="py-2 px-2 text-white">{vendorList}</pre>
        </div>
      )}

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
                // _handleTabChange(Tab.SUMMARY);
              }}
            >
              {Tab.SUMMARY}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.TAX,
              })}
              onClick={() => {
                tabToggle(Tab.TAX);
              }}
            >
              {Tab.TAX}
            </NavLink>
          </NavItem>

          <div className="bill-mobile-view">
            <NavItem>
              <NavLink
                className={classNames({
                  active: activeTab === Tab.ATTACHMENTS,
                })}
                onClick={() => {
                  tabToggle(Tab.ATTACHMENTS);
                }}
              >
                {Tab.ATTACHMENTS}
              </NavLink>
            </NavItem>
          </div>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.PAYMENT,
              })}
              onClick={() => {
                tabToggle(Tab.PAYMENT);
                // _handleTabChange(Tab.PAYMENT);
              }}
            >
              {Tab.PAYMENT}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.PRODUCT,
              })}
              onClick={() => {
                tabToggle(Tab.PRODUCT);
              }}
            >
              {Tab.PRODUCT}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.PURCHASE,
              })}
              onClick={() => {
                tabToggle(Tab.PURCHASE);
              }}
            >
              {Tab.PURCHASE}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.COMMENTS,
              })}
              onClick={() => {
                tabToggle(Tab.COMMENTS);
              }}
            >
              {Tab.COMMENTS}
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
                  // _handleTabChange(Tab.HISTORY);
                }}
              >
                {Tab.HISTORY}
              </NavLink>
            )}
          </NavItem>
        </Nav>
      </div>
      <div className="card-body card">
        
          <TabContent activeTab={activeTab}>
            {/* Detail Tab Start*/}
            {activeTab == Tab.SUMMARY && (
              <TabPane tabId={Tab.SUMMARY} className="w-100">
                <Form
                 enableReinitialize={true}
                 initialValues={initialValues}
                 onSubmit={(values) => {
                 let id = props.match.params.id;
                 handleUpdate(id, values);
                }}
              >
                <div className="row">
                  <div className="col-sm-7">
                    <BillForm
                      history={history}
                      billValue={billName}
                      onInvoiceNumberChange={onInvoiceNumberChange}
                      onAccountChange={onAccountChange}
                      onNetAmountChange={onNetAmountChange}
                      invoiceDateChange={invoiceDateChange}
                      billData={billData?.account?.name}
                      editorState={editorState}
                      handleEditorChange={handleEditorChange}
                      showBilldetails
                      handleTaxAmount={handleTaxAmount}
                      handleOtherDeductionAmount={handleOtherDeductionAmount}
                      handleInvoiceAmount={handleInvoiceAmount}
                      handleCashDiscountPerentage={handleCashDiscountPerentage}
                      values={setOwnerValue}
                      handleReturnedAmount={handleReturnedAmount}
                      handleDueDateChange={handleDueDateChange}
                      owner_id={billData?.owner_id ? billData?.owner_id : null}
                      editable={editable}
                      handleExpiryReturnedProductAmount={handleExpiryReturnedProductAmount}
                    />
                    {!editable && (
                      <div className="mt-2">
                        <SaveButton type="submit" label="Save" />
                        <CancelButton
                          onClick={() => {
                            history.push("/bill");
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-sm-5 bill-web-view ">
                    <MediaCarousel
                      showCarasoul
                      modalTitle="Upload File"
                      title="Bill"
                      objectName={ObjectName.BILL}
                      objectId={id}
                      history={history}
                      billView={true}
                      attachmentsList={true}
                      modalOpen={isModelOpen}
                      toggle={toggle}
                      setIsModelOpen={setIsModelOpen}
                      Attachments={"Attachments"}
                      handleImageUpload={handleImageUpload}
                      selectedFileValue={setSelectedFile}
                      editable={editable}
                    />
                  </div>
                </div>
                </Form>
              </TabPane>
            )}
            {activeTab == Tab.TAX && (
              <TabPane tabId={Tab.TAX} className="w-100">
                <div className="row">
                  <div className="col-sm-7">
                    <StatusSelect
                      name={"gst_status"}
                      label="GST Status"
                      placeholder="Select GST Status"
                      objectName={ObjectName.BILL_GST_STATUS}
                      isDisabled={editable}
                      defaultValue={gstStatusValue ? gstStatusValue : ""}
                      handleStatusChange={handleStatusChange}
                    />
                    <TaxList
                      toggles={toggles}
                      isOpen={isOpen}
                      id={props.match.params.id}
                      history={history}
                    />
                  </div>
                  <div className="col-sm-5">
                    <MediaCarousel
                      showCarasoul
                      modalTitle="Upload File"
                      title="Tax"
                      objectName={ObjectName.BILL_TAX}
                      objectId={id}
                      history={history}
                      billView={true}
                      attachmentsList={true}
                      modalOpen={isModelOpen}
                      toggle={toggle}
                      setIsModelOpen={setIsModelOpen}
                      Attachments={"Attachments"}
                      handleImageUpload={handleImageBillTaxUpload}
                      selectedFileValue={setSelectedFile}
                      editable={editable}
                    />
                  </div>
                </div>
              </TabPane>
            )}
            {activeTab == Tab.ATTACHMENTS && (
              <TabPane tabId={Tab.ATTACHMENTS}>
                <MediaCarousel
                  showCarasoul
                  modalTitle="Upload File"
                  title="Bill"
                  objectName={ObjectName.BILL}
                  objectId={id}
                  history={history}
                  billView={true}
                  attachmentsList={true}
                  modalOpen={isModelOpen}
                  toggle={toggle}
                  setIsModelOpen={setIsModelOpen}
                  Attachments={"Attachments"}
                  handleImageUpload={handleImageUpload}
                  selectedFileValue={setSelectedFile}
                />
              </TabPane>
            )}
            {activeTab == Tab.PAYMENT && (
              <TabPane tabId={Tab.PAYMENT}>
                {/* Image List Table Component */}
                <PaymentList
                  setIsSubmitting={setIsSubmitting}
                  isSubmitting={isSubmitting}
                  paymentTab
                  toggles={toggles}
                  isOpen={isOpen}
                  handleCloseModal={handleCloseModal}
                  params={{
                    bill_id: props?.match?.params?.id,
                  }}
                  billData={billData}
                  setRowValue={setRowValue}
                  rowValue={rowValue}
                  detail={billData}
                  showLoggedInUser
                  history={history}
                />
              </TabPane>
            )}
            {activeTab == Tab.PURCHASE && (
              <TabPane tabId={Tab.PURCHASE}>
                <PurchaseList
                  id="purchaseList"
                  billId={
                    props?.match?.params?.id ? props?.match?.params?.id : ""
                  }
                  disableHeader={true}
                  history={history}
                />
              </TabPane>
            )}

            {activeTab == Tab.PRODUCT && (
              <TabPane tabId={Tab.PRODUCT}>
                <ProductForm
                  vendorId={billData?.account?.id}
                  purchaseId={billData?.purchase_id}
                  history={history}
                />
              </TabPane>
            )}
            {/* History Tab Start*/}
            {showHistory && activeTab == Tab.HISTORY && (
              <TabPane tabId={Tab.HISTORY} className="w-100">
                <ActivityList
                  id={id}
                  objectId={id}
                  object_name={ObjectName.BILL}
                  history={history}
                />
              </TabPane>
            )}

            <TabPane tabId={Tab.COMMENTS} className="w-100">
              <Comment
                objectId={id}
                objectName={ObjectName.BILL}
                maxHeight="100vh"
                owner_id={billData?.owner_id ? billData?.owner_id : null}
              />
            </TabPane>
          </TabContent>
      </div>
    </>
  );
};
export default BillDetail;
