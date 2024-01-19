import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
//Configs
import { apiClient } from "../../apiClient";
import { endpoints } from "../../api/endPoints";

// Components
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import ActivityList from "../../components/ActivityList";
import Form from "../../components/Form";
import DeleteModal from "../../components/DeleteModal";
import Toast from "../../components/Toast";
import BillForm from "./components/billForm";
import ProductForm from "../../views/bill/components/productForm";
import Action from "../../components/Action";
import Payment from "../payment/list";

// Action
import { deleteBill, updateBill } from "../../actions/bill";

// Lib
import Currency from "../../lib/Currency";
import String from "../../lib/String";
import Number from "../../lib/Number";
import { isBadRequest, SUCCESS_RESPONSE } from "../../lib/Http";

// Helpers
import ObjectName from "../../helpers/ObjectName";
import bill from "../../helpers/Bill";
import Spinner from "../../components/Spinner";
import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import StoreService from "../../services/StoreService";

// Constants//
const Tab = {
  GENERAL: "General",
  PRODUCT: "Products",
  HISTORY: "History",
  PAYMENT: "Payment"
};

const GeneralDetailsTab = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState(Tab.GENERAL);
  const [imageList, setImageList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [status, setStatus] = useState();
  const [accountList, setAccountList] = useState([]);
  const [vendorData, setVendorData] = useState();
  const [netAmount, setNetAmount] = useState();
  const [amountValue, setAmountValue] = useState();
  const [discountAmountValue, setDiscountAmountValue] = useState();
  const [billData, setBillData] = useState("");
  const [productDetail, setProductDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [discrepancyAmountValue, setDiscrepancyAmountValue] = useState();
  const [taxAmountValue, setTaxAmountValue] = useState();

  useEffect(() => {
    getBillDetail();
    getStoreList();
    getAccountList();
    getProductDetail();
  }, [props]);

  const id = props.match.params.tab;

  const getStoreList = async () => {
    try {
      //create new array for location list
      await StoreService.search((response) => {
        setStoreList(response);
      })
      //validate response exist or not
    } catch (err) { }
  };

  // Get Payment Accounts
  const getAccountList = async () => {
    try {
      // Create new array for payment accounts
      let accountList = new Array();

      // get account list response
      let response = await apiClient.get(`${endpoints().accountAPI}/list`);

      // Validate response
      if (response && response.data && response.data.data) {
        // get account list
        let accounts = response.data.data;

        // Validate accounts length exist or not
        if (accounts && accounts.length > 0) {
          for (let i = 0; i < accounts.length; i++) {
            accountList.push({
              label: accounts[i].account_name,
              value: accounts[i].id,
            });
          }
          setAccountList(accountList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Bread Crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    { label: "Bills", link: "/bill" },
    { label: activeTab },
  ];

  //Get Bill Detail
  const getBillDetail = async () => {
    let id = props.match.params.tab;
    try {
      const response = await apiClient.get(
        `${endpoints().billAPI}/detail/${id}`
      );
      const data = response.data ? response.data : null;
      setVendorData(data);
      setBillData(data.data);
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

  // Get totalNetAmount
  const getProductDetail = async () => {
    try {
      const response = await apiClient.get(
        `${endpoints().billAPI}/product/search?billId=${id}`
      );
      const data = response.data.totalNetAmount;
      setProductDetail(data);
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
        Toast.error(errorMessage);
      }
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleChangeStatus = (selectStatus) => {

    if (selectStatus) {
      setStatus(selectStatus);
    }
    updateBill(id, status, {});
  };

  const paymentType = [
    {
      value: "Bill Payment",
      label: "Bill Payment",
    },
    {
      value: "Vendor Advance",
      label: "Vendor Advance",
    },
  ];

  const handleChange = (e) => {
    if (e == "Review") {
      handleStatusChange("Review");
    }
    if (e == "Complete") {
      handleStatusChange("Complete");
    }
    if (e == "Delete") {
      setDeleteModal(true);
    }
  };


  // Handle status change
  const handleStatusChange = (status) => {
    const data = new FormData();
    // status
    data.append("status", status ? status : "");
    try {
      if (billData?.net_amount == productDetail) {

        apiClient
          .put(`${endpoints().billAPI}/status/${id}`, data)
          .then((res) => {
            if (res.status == SUCCESS_RESPONSE) {
              Toast.success(res?.data?.message);
            }
            getBillDetail(id);
            setStatus("");
          })
          .catch((err) => {
            if (isBadRequest(err)) {
              let errorMessage;
              const errorRequest = err.response.request;
              if (errorRequest && errorRequest.response) {
                errorMessage = JSON.parse(errorRequest.response).message;
              }
              Toast.error(errorMessage);
            }
          });
      } else {
        Toast.error("Total did not match");
      }

    } catch (err) {
      console.log(err);
    }

  };

  const paymentTerm = [
    {
      value: "Net 15",
      label: "Net 15",
    },
    {
      value: "Net 30",
      label: "Net 30",
    },
    {
      value: "Net 45",
      label: "Net 45",
    },
    {
      value: "Net 60",
      label: "Net 60",
    },
    {
      value: "Due end of the month",
      label: "Due end of the month",
    },
    {
      value: "Due end of next month",
      label: "Due end of next month",
    },
    {
      value: "Due on receipt",
      label: "Due on receipt",
    },
  ];

  const billStatusOptions = [
    {
      value: "Draft",
      label: "Draft",
    },
    {
      value: "Review",
      label: "Review",
    },
    {
      value: "Complete",
      label: "Complete",
    },
    {
      value: "Reopen",
      label: "Reopen",
    },
  ];

  /**
   * Delete Bill
   *
   * @param data
   */
  const billDelete = () => {
    let id = props.match.params.tab;
    dispatch(deleteBill(id, {}));
    history.push("/bill");
  };

  const actionOptions = [];

  if (billData.status == bill.STATUS_DRAFT) {
    actionOptions.push(
      {
        label: "Complete",
        value: "Complete",
      },
      {
        label: "Review",
        value: "Review",
      },
      {
        label: "Delete",
        value: "Delete",
      }
    );
  }

  if (billData.status == bill.STATUS_COMPLETED) {
    actionOptions.push(
      {
        label: "Review",
        value: "Review",
      },
      {
        label: "Delete",
        value: "Delete",
      }
    );
  }

  if (billData.status == bill.STATUS_REVIEW) {
    actionOptions.push(
      {
        label: "Complete",
        value: "Complete",
      },
      {
        label: "Delete",
        value: "Delete",
      }
    );
  }

  //Handle Update bill Details
  const handleUpdate = (id, values) => {
    const data = new FormData();
    data.append("billNumber", values && Number.Get(values.bill_number));
    data.append("date", values && String.Get(values.date));
    data.append(
      "payment_account",
      values && String.Get(values.payment_account.label)
    );
    data.append("billing_name", values && String.Get(values.billing_name));
    data.append(
      "vendor_bill_number",
      values && Number.Get(values.vendor_bill_number)
    );
    data.append("order_number", values && Number.Get(values.order_number));
    data.append("amount", values && Currency.Get(values.amount));

    if (values.description !== undefined) {
      data.append("description", values && String.Get(values.description));
    }

    data.append("location", values && Number.Get(values.location.value));
    data.append("vendor_id", values && String.Get(values.vendor_name.value));
    data.append("status", values && String.Get(values.status.label));
    let imageNames = [];
    for (let i = 0; i < imageList.length; i++) {
      imageNames.push({ name: imageList[i].file.name });
      data.append("files", imageList[i].file);
    }
    data.append("imageName", JSON.stringify(imageNames));
    data.append(
      "discount_amount",
      values && Currency.Get(values.discount_amount)
    );
    data.append("net_amount", values && Currency.Get(values.net_amount));
    data.append("discrepancy_amount", values && Currency.Get(values.discrepancy_amount));
    data.append("tax_amount", values && Currency.Get(values.tax_amount));

    dispatch(updateBill(id, data, {}));
    setIsLoading(true)
    getBillDetail()
    setIsLoading(false)

  };

  const amountChange = (x) => {
    const amount = x.values.amount ? x.values.amount : " ";
    let net_amount =
      Currency.Get(amount ? amount : null) +
      Currency.Get(discountAmountValue ? discountAmountValue : billData?.discount_amount);
    setNetAmount(net_amount);
    setAmountValue(amount);
  };

  const discountAmountChange = (x) => {
    const discountAmount = x.values.discount_amount
      ? x.values.discount_amount
      : " ";
    let netAmount =
      Currency.Get(amountValue ? amountValue : billData?.amount) +
      Currency.Get(discountAmount ? discountAmount : null);
    setNetAmount(netAmount);
    setDiscountAmountValue(discountAmount);
  };

  const onDiscrepancyAmountChange = (e) => {
    const discrepancyAmount = e.values.discrepancy_amount ? e.values.discrepancy_amount : "";
    let netAmount =
      Currency.Get(amountValue ? amountValue : billData?.amount) +
      Currency.Get(discountAmountValue ? discountAmountValue : billData?.discount_amount) +
      Currency.Get(discrepancyAmount ? discrepancyAmount : null);
    setNetAmount(netAmount);
    setDiscrepancyAmountValue(discrepancyAmount);
  }

  const onTaxAmountChange = (e) => {
    const taxAmount = e.values.tax_amount ? e.values.tax_amount : "";
    let netAmount =
      Currency.Get(amountValue ? amountValue : billData?.amount) +
      Currency.Get(discountAmountValue ? discountAmountValue : billData?.discount_amount) +
      Currency.Get(discrepancyAmountValue ? discrepancyAmountValue : billData?.discrepancy_amount) +
      Currency.Get(taxAmount ? taxAmount : null);
    setNetAmount(netAmount);
    setTaxAmountValue(taxAmount);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DeleteModal
        id={billData?.data?.id}
        label={billData?.bill_number}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Product "
        deleteFunction={billDelete}
      />

      {/* Bread Crumb Section */}
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between">
        <PageTitle
          label={`Bill #${billData.bill_number}`}
        />

        <div className="d-flex justify-content-end mb-3">
          {/* Action Menu */}
          <Action dropdownLinks={actionOptions} handleChange={handleChange} />
        </div>
      </div>

      <Nav tabs className="admin-tabs">
        {/* Detail Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.GENERAL,
            })}
            onClick={() => {
              toggle(Tab.GENERAL);
            }}>
            {Tab.GENERAL}
          </NavLink>
        </NavItem>
        {/* History Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.PRODUCT,
            })}
            onClick={() => {
              toggle(Tab.PRODUCT);
            }}>
            {Tab.PRODUCT}
          </NavLink>
        </NavItem>

        {/* Payment Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.PAYMENT,
            })}
            onClick={() => {
              toggle(Tab.PAYMENT);
            }}>
            {Tab.PAYMENT}
          </NavLink>
        </NavItem>

        {/* History Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.HISTORY,
            })}
            onClick={() => {
              toggle(Tab.HISTORY);
            }}>
            {Tab.HISTORY}
          </NavLink>
        </NavItem>

      </Nav>

      <div className="tabs-and-preview full-width d-flex admin-settings mb-4">
        <div className="card-body card">
          <Form
            enableReinitialize={true}
            initialValues={{
              bill_number: billData.bill_number,
              description: billData.description,
              date: billData.bill_date
                ? new Date(billData.bill_date).toISOString().substr(0, 10)
                : "",
              vendor_name: {
                label: vendorData?.vendor_name,
                value: billData?.vendor_id,
              },
              order_number: billData.order_number,
              payment_type: paymentType.find((option) =>
                option.value == billData.payment_type
                  ? billData.payment_type
                  : ""
              ),
              payment_term: paymentTerm.find((option) =>
                option.value == billData.payment_term
                  ? billData.payment_term
                  : ""
              ),
              amount: amountValue ? amountValue : billData?.amount,
              due_date: billData.due_date
                ? new Date(billData.due_date).toISOString().substr(0, 10)
                : "",
              location: storeList.find((data) => billData.store_id == data.value),
              payment_account: {
                label: billData.payment_account,
                value: billData.payment_account,
              },
              billing_name: billData.billing_name,
              vendor_bill_number: billData.vendor_bill_number,
              net_amount: netAmount ? netAmount : billData?.net_amount,
              discount_amount: discountAmountValue
                ? discountAmountValue
                : billData?.discount_amount,
              status: { label: billData.status },
              discrepancy_amount: discrepancyAmountValue ? discrepancyAmountValue : billData?.discrepancy_amount,
              tax_amount: taxAmountValue ? taxAmountValue : billData?.tax_amount,
            }}
            onSubmit={(values) => {
              let id = props.match.params.tab;
              handleUpdate(id, values);
            }}>

            <TabContent activeTab={activeTab}>
              {/* Detail Tab Start*/}
              {activeTab == Tab.GENERAL &&
                <TabPane tabId={Tab.GENERAL} className="w-100">
                  <div className="row">
                    <div className="col-12">
                      <BillForm
                        className="col-lg-7"
                        storeList={storeList}
                        history={history}
                        imageList={imageList}
                        edit={true}
                        accountList={accountList}
                        billStatusOptions={billStatusOptions}
                        status={true}
                        handleChange={(e) => handleChangeStatus(e)}
                        onAmountChange={amountChange}
                        onDiscountAmountChange={discountAmountChange}
                        onDiscrepancyAmountChange={onDiscrepancyAmountChange}
                        onTaxAmountChange={onTaxAmountChange}
                        billData={billData}
                      />
                    </div>
                  </div>
                  <SaveButton type="submit" label="Save" />
                  <CancelButton
                    onClick={() => {
                      history.push("/bill");
                    }}
                  />
                </TabPane>}

              {/* History Tab Start*/}
              {activeTab == Tab.PRODUCT &&
                <TabPane tabId={Tab.PRODUCT} className="w-100">
                  <div className="mt-2 mb-3 p-3">
                    <ProductForm
                      storeId={
                        billData && billData?.store_id
                          ? billData.store_id
                          : props.match.params.subtab
                      }
                      billId={
                        billData && billData.id
                          ? billData?.id
                          : props.match.params.tab
                      }
                      history={history}
                    />
                  </div>
                </TabPane>}

              {/* Payment Tab */}
              {activeTab == Tab.PAYMENT &&
                <TabPane tabId={Tab.PAYMENT} className="w-100">
                  <Payment
                    objectName="PAYMENT"
                    billId={id}
                  />
                </TabPane>}

              {/* History Tab*/}
              {activeTab == Tab.HISTORY &&
                <TabPane tabId={Tab.HISTORY} className="w-100">
                  <ActivityList
                    id={id}
                    objectId={id}
                    object_name={ObjectName.BILL}
                  />
                </TabPane>}
            </TabContent>
          </Form>
        </div>
      </div>
    </>
  );
};
export default GeneralDetailsTab;
[];
