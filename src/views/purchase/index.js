import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";

// Components
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import PurchaseForm from "./components/purchaseForm";

//Config
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

// Action
import {
  addPurchase,
  deletePurchase,
  searchPurchaseData,
} from "../../actions/purchase";
import { fetchList } from "../../actions/table";

// Lib
import Currency from "../../lib/Currency";
import { isLoggedIn } from "../../lib/Helper";
import String from "../../lib/String";
import Url from "../../lib/Url";

// Service
import AccountService from "../../services/AccountService";

// Helpers
import classNames from "classnames";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";
import ObjectName from "../../helpers/ObjectName";
import { calculateNetAmount, purchase } from "../../helpers/Purchase";
import { PAGE, PAGESIZE, SORT, SORT_DIR } from "../../helpers/Status";
import DateTime from "../../lib/DateTime";
import StatusService from "../../services/StatusService";
import PurchaseProductList from "./components/PurchaseProductList";
import PurchaseListPage from "./components/purchaseList";
import AddButton from "../../components/AddButton";

export const Tabs = {
  PURCHASE: "Purchase",
  PURCHASE_PRODUCTS: "PurchaseProduct",
};

const Purchase = (props) => {
  const {
    history,
    DraftPurchase,
    ReviewPurchase,
    allPurchase,
    draftCurrentPage,
    draftCurrentPageSize,
    reviewCurrentPage,
    reviewCurrentPageSize,
    allCurrentPage,
    allCurrentPageSize,
  } = props;
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [purchaseId, setPurchaseId] = useState();
  const [purchaseData, setPurchaseData] = useState("");
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [param, setParam] = useState({});
  const [vendorLists, setVendorLists] = useState([]);
  const [currentPage, setCurrentPage] = useState();

  const [amountValue, setAmountValue] = useState();
  const [discountAmountValue, setDiscountAmountValue] = useState();
  const [purchaseValue, setPurchaseValue] = useState();
  const [netAmount, setNetAmount] = useState();
  const [purchaseNumberValue, setPurchaseNumberValue] = useState();
  const [netAmountValue, setNetAmountValue] = useState();
  const [storeValue, setStoreValue] = useState();
  const [vendorValue, setVendorValue] = useState();
  const [descriptionValue, setDescriptionValue] = useState();
  const [discrepancyAmountValue, setDiscrepancyAmountValue] = useState();
  const [taxAmountValue, setTaxAmountValue] = useState();
  const [statusId, setStatusId] = useState(null);
  const [vendorInvoiceDate, setVendorInvoiceDateChange] = useState();
  const [dueDate, setDueDate] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const [rowValue, setRowValue] = useState(null);
  const [paybleAmount, setPaymentAmount] = useState()
  const [returnItemAmount, setReturnItemAmount] = useState("")
  const [cashDiscountAmountUse, setCashDiscountAmountUse] = useState(0)
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [otherDeductionAmount, setOtherDeductionAmount] = useState(0);
  const [discountPercentage, setDicountPercentage] = useState(0);

  const buttonLabel = true;

  const Param = new URLSearchParams(props.history.location.search);
  const role = Param.get("section");
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || Tabs.PURCHASE
  );
  const dispatch = useDispatch();
  useEffect(() => {
    isLoggedIn();
    getVendorsList();
    getAccountList();
    getStatus();

    const { vendor, pageSize, sort, sortDir, search, page } = getParams();

    const data = { vendor, pageSize, sort, sortDir, search, page };

    setParam(data);
  }, []);

  useEffect(() => {
    const invoiceAmountUse = invoiceAmount ? invoiceAmount : rowValue?.invoice_amount
    const returnAmountUse = returnItemAmount ? returnItemAmount : rowValue?.returnedItemsAmount ? rowValue?.returnedItemsAmount : 0
    const otherDeductionAmountUse = otherDeductionAmount ? otherDeductionAmount : rowValue?.other_deduction_amount ? rowValue?.other_deduction_amount : 0
    const paybleAmountuse = invoiceAmountUse - (returnAmountUse + otherDeductionAmountUse)
    setPaymentAmount(paybleAmountuse)
  }, [invoiceAmount, returnItemAmount, otherDeductionAmount, rowValue?.other_deduction_amount, rowValue?.returnedItemsAmount, rowValue?.invoice_amount])

  useEffect(() => {
    const cashDicountAmountUse = paybleAmount * (discountPercentage / 100)
    setCashDiscountAmountUse(cashDicountAmountUse)
  }, [paybleAmount, discountPercentage])

  useEffect(() => {
    const netAmountUse = paybleAmount - cashDiscountAmountUse
    setNetAmount(netAmountUse)
  }, [paybleAmount, cashDiscountAmountUse])

  // Get params
  const getParams = () => {
    const vendor = Url.GetParam("vendor") ? Url.GetParam("vendor") : "";
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : SORT;
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = searchTerm ? searchTerm : "";
    const selectedPage = Url.GetParam("page");
    const page = selectedPage ? selectedPage : PAGE;

    const data = { vendor, pageSize, sort, sortDir, search, page };

    return data;
  };

  // Get Filter params
  const getFilterParams = (data) => {
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : "id";
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = searchTerm ? searchTerm : "";
    const selectedPage = Url.GetParam("page");
    const page = selectedPage ? selectedPage : PAGE;
    data.pageSize = pageSize;
    data.sort = sort;
    data.sortDir = sortDir;
    data.search = search;
    data.page = page;
    setParam(data);
  };

  // Toggle sidebar for filter
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value));

  const StoreSelectModal = () => {
    setStoreModalOpen(!storeModalOpen);
    setAmountValue("");
    setPurchaseValue("");
    setNetAmount("");
    setPurchaseNumberValue("");
    setDiscountAmountValue("");
    setStoreValue("");
    setVendorValue("");
    setDescriptionValue("");
    setNetAmountValue("");
    setVendorInvoiceDateChange("");
    setInvoiceAmount("")
    setReturnItemAmount("")
    setOtherDeductionAmount("")
    setCashDiscountAmountUse("")
    setDicountPercentage("")
    setIsSubmit(true);
  };

  const onDiscrepancyAmountChange = (e) => {
    const discrepancyAmount = e?.values?.discrepancy_amount;
    const netAmount = calculateNetAmount(
      amountValue,
      discountAmountValue,
      discrepancyAmount,
      taxAmountValue
    );
    setNetAmount(netAmount);
    setDiscrepancyAmountValue(discrepancyAmount);
  };

  const onTaxAmountChange = (e) => {
    const taxAmount = e?.values?.tax_amount;
    const netAmount = calculateNetAmount(
      amountValue,
      discountAmountValue,
      discrepancyAmountValue,
      taxAmount
    );
    setNetAmount(netAmount);
    setTaxAmountValue(taxAmount);
  };

  const onPurchaseNumberChange = (x) => {
    const value = x.target.value;
    setPurchaseNumberValue(value);
  };

  const onVendorInvoiceDateChange = (x) => {
    const value = x ? x : "";
    setVendorInvoiceDateChange(value);
  };

  const onDueDateDateChange = (e) => {
    const value = e ? e : "";
    setDueDate(value);
  };


  const onStoreChange = (x) => {
    const value = x ? x : "";
    setStoreValue(value);
  };

  const onVendorChange = (x) => {
    const value = x ? x : "";
    setVendorValue(value);
    setDicountPercentage(x?.cash_discount);
    const data = paybleAmount * (x?.cash_discount / 100)
    setCashDiscountAmountUse(data)
  };

  const onDescriptionChange = (x) => {
    const value = x.target.value;
    setDescriptionValue(value);
  };

  const handleReturnedAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setReturnItemAmount(value)
  };

  const handleOtherDeductionAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setOtherDeductionAmount(value);
  };

  const handleInvoiceAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setInvoiceAmount(value);
  };

  const discountPercetageChange = (e) => {
    let value = parseFloat(e.target.value ? e.target.value : 0);
    setDicountPercentage(value);
  };

  const onDueDateChange = (e) => {
    setDueDate(e)
  }

  const addStoreForm = (
    <PurchaseForm
      history={history}
      accountList={accountList}
      onPurchaseNumberChange={onPurchaseNumberChange}
      onStoreChange={onStoreChange}
      onVendorChange={onVendorChange}
      onDescriptionChange={onDescriptionChange}
      onDiscrepancyAmountChange={onDiscrepancyAmountChange}
      onTaxAmountChange={onTaxAmountChange}
      onVendorInvoiceDateChange={onVendorInvoiceDateChange}
      onDueDateDateChange={onDueDateDateChange}
      handleCashDiscountPerentage={discountPercetageChange}
      handleInvoiceAmount={handleInvoiceAmount}
      handleOtherDeductionAmount={handleOtherDeductionAmount}
      handleReturnedAmount={handleReturnedAmount}
      onDueDateChange={onDueDateChange}
    />
  );

  // Get vendors list
  const getVendorsList = async () => {
    try {
      let vendorLists = [];
      const vendor = await AccountService.searchVendor();
      let vendors = vendor.data;
      if (vendors && vendors.length > 0) {
        for (let i = 0; i < vendors.length; i++) {
          vendorLists.push({
            id: vendors[i].id,
            label: vendors[i].vendorName,
            value: vendors[i].id,
            name: vendors[i].vendorName,
          });
        }
      }
      setVendorLists(vendorLists);
    } catch (err) {
      console.log(err);
    }
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

  const purchaseAdd = (data) => {
    let storeId = data.location;
    dispatch(
      addPurchase(data, {}, history, (response) => {
        if (response && response.purchase) {
          StoreSelectModal();
          //get stock entry details
          let stockEntryDetails = response.purchase;
          //validate stock entry details exist or not
          if (stockEntryDetails) {
            history.push(`
            /purchase/${stockEntryDetails.id}`);
          }
        }
      })
    );
  };

  const getStatus = async () => {
    const status = await StatusService.search(ObjectName.PURCHASE);
    for (let i = 0; i < status.length; i++) {
      const order = status.find(
        (order) => order.sortOrder === status[i]?.sortOrder
      );
      setStatusId(order?.id);
      break;
    }
  };
  const handleSubmit = (values) => {
    try {
      const data = new FormData();
      // const formData = new formData();
      data.append("date", new Date(values.date));

      data.append(
        "vendor_invoice_number",
        values && String.Get(values.vendor_invoice_number)
      );

      // data.append("due_date", values && values.due_date ? values.due_date : "");

      data.append("amount", values && values.amount);
      if (values.description !== undefined) {
        data.append("description", values && String.Get(values.description));
      }
      data.append("location", values && String.Get(values.location.value));
      data.append(
        "vendor_name",
        values && String.Get(values.vendor_name.label)
      );

      data.append(
        "discount_amount",
        values && Currency.Get(values.discount_amount)
      );
      data.append("net_amount", values && values.net_amount);

      data.append(
        "discrepancy_amount",
        values && Currency.Get(values.discrepancy_amount)
      );

      data.append("tax_amount", values && Currency.Get(values.tax_amount));

      data.append("status", statusId);
      data.append(
        "vendor_invoice_date",
        values?.vendor_invoice_date ? values?.vendor_invoice_date : ""
      );
      data.append("due_date", values?.due_date ? values?.due_date : "");
      data.append("owner", values?.owner?.id ? values?.owner?.id : "");
      data.append(
        "invoice_amount",
        values.invoice_amount && parseInt(values?.invoice_amount)
      );
      data.append(
        "otherDeductionAmount",
        values.otherDeductionAmount && parseInt(values?.otherDeductionAmount)
      );
      data.append(
        "cash_discount_percentage",
        values.cash_discount_percentage &&
        parseInt(values.cash_discount_percentage)
      );
      data.append(
        "returnedItemAmount",
        values?.returnedItemAmount && parseInt(values?.returnedItemAmount)
      );

      data.append(
        "cash_discount_amount",
        values?.cashDiscountAmount && parseInt(values?.cashDiscountAmount)
      );

      dispatch(purchaseAdd(data));

      setStoreModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const _handleStatusChange = (tabStatus) => {
    props.history.push(`/purchases?tab=${tabStatus}`);
  };

  const addStoreFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label="Add" />
  );

  const delPurchase = (id) => {
    dispatch(
      deletePurchase(
        id,
        {
          page: currentPage,
        },
        draftCurrentPageSize,
        draftCurrentPage,
        reviewCurrentPage,
        reviewCurrentPageSize,
        allCurrentPageSize,
        allCurrentPage
      )
    );

    setIsDeleteModel(false);
  };

  // Handle Reset
  const handleReset = () => {
    setParam("");
    dispatch(searchPurchaseData());
  };

  const tabToggle = (tab) => {
    setActiveTab(tab);
  };

  const initialValues = {
    date: DateTime.getTodayDateByUserTimeZone(new Date()),
    status: "",
    location: storeValue,
    amount: amountValue,
    vendor_name: vendorValue,
    vendor_invoice_number: purchaseNumberValue,
    discount_amount: discountAmountValue,
    description: descriptionValue,
    discrepancy_amount: discrepancyAmountValue,
    tax_amount: taxAmountValue,
    vendor_invoice_date: vendorInvoiceDate,
    due_date: dueDate ? dueDate : new Date(),
    owner: "",
    cash_discount_percentage: discountPercentage
      ? discountPercentage
      : rowValue?.cash_discount_percentage
        ? rowValue?.cash_discount_percentage
        : "",
    net_amount: netAmount
      ? netAmount
      : netAmount,
    cashDiscountAmount: cashDiscountAmountUse
      ? cashDiscountAmountUse
      : "",
    invoice_amount: invoiceAmount
      ? invoiceAmount
      : "",
    otherDeductionAmount: otherDeductionAmount
      ? otherDeductionAmount
      : "",
    returnedItemAmount: returnItemAmount ? returnItemAmount : ""
  }

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Delete Purchase"
        id={purchaseId}
        label={purchaseData}
        deleteFunction={delPurchase}
      />
      <Drawer
        modelTitle="New Purchase"
        DrawerBody={addStoreForm}
        DrawerFooter={addStoreFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={initialValues}
        handleOpenModal={StoreSelectModal}
        handleCloseModal={StoreSelectModal}
        handleDrawerClose={StoreSelectModal}
        isModalOpen={storeModalOpen}
        buttonLabel={buttonLabel}
        enableReinitialize
      />
      <div className="d-flex justify-content-between">
        <PageTitle label="Purchases" />
        {activeTab === Tabs.PURCHASE && (
          <AddButton
            label="Add New"
            onClick={(_e) => {
              StoreSelectModal();
            }}
          />
        )}
      </div>

      <Nav tabs className="admin-tabs mb-1">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={(e) => e.preventDefault()}
        >
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tabs.PURCHASE,
              })}
              onClick={() => {
                tabToggle(Tabs.PURCHASE);
                _handleStatusChange(Tabs.PURCHASE);
              }}
            >
              Purchases
            </NavLink>
          </NavItem>
        </Link>

        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={(e) => e.preventDefault()}
        >
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tabs.PURCHASE_PRODUCTS,
              })}
              onClick={() => {
                tabToggle(Tabs.PURCHASE_PRODUCTS);
                _handleStatusChange(Tabs.PURCHASE_PRODUCTS);
              }}
            >
              Purchase Products
            </NavLink>
          </NavItem>
        </Link>
      </Nav>

      <TabContent activeTab={activeTab}>
        {activeTab === Tabs.PURCHASE && (
          <TabPane tabId={Tabs.PURCHASE}>
            <PurchaseListPage
              id={purchase.DRAFT_PURCHASE}
              history={history}
              toggleSidebar={toggleSidebar}
              setCurrentData={setCurrentData}
              setPurchaseId={setPurchaseId}
              setPurchaseData={setPurchaseData}
              setIsDeleteModel={setIsDeleteModel}
              draftCurrentPage={draftCurrentPage}
              draftCurrentPageSize={draftCurrentPageSize}
              setCurrentPage={setCurrentPage}
            />
          </TabPane>
        )}

        {activeTab === Tabs.PURCHASE_PRODUCTS && (
          <TabPane tabId={Tabs.PURCHASE_PRODUCTS}>
            <PurchaseProductList
              history={history}
            />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;
  // Get transferExpired count
  const DraftPurchase =
    reduxTable[purchase.DRAFT_PURCHASE] &&
      reduxTable[purchase.DRAFT_PURCHASE].isFetching == false
      ? reduxTable[purchase.DRAFT_PURCHASE].totalCount
      : 0;

  // Get transferReturn count
  const ReviewPurchase =
    reduxTable[purchase.REVIEW_PURCHASE] &&
      reduxTable[purchase.REVIEW_PURCHASE].isFetching == false
      ? reduxTable[purchase.REVIEW_PURCHASE].totalCount
      : 0;

  // Get transferAll count
  const allPurchase =
    reduxTable[purchase.ALL_PURCHASE] &&
      reduxTable[purchase.ALL_PURCHASE].isFetching == false
      ? reduxTable[purchase.ALL_PURCHASE].totalCount
      : 0;

  // Draft
  const draftCurrentPage =
    reduxTable[purchase.DRAFT_PURCHASE] &&
      !reduxTable[purchase.DRAFT_PURCHASE].isFetching
      ? reduxTable[purchase.DRAFT_PURCHASE].currentPage
      : 1;

  const draftCurrentPageSize =
    reduxTable[purchase.DRAFT_PURCHASE] &&
      !reduxTable[purchase.DRAFT_PURCHASE].isFetching
      ? reduxTable[purchase.DRAFT_PURCHASE].pageSize
      : 25;

  // Review
  const reviewCurrentPage =
    reduxTable[purchase.REVIEW_PURCHASE] &&
      !reduxTable[purchase.REVIEW_PURCHASE].isFetching
      ? reduxTable[purchase.REVIEW_PURCHASE].currentPage
      : 1;

  const reviewCurrentPageSize =
    reduxTable[purchase.REVIEW_PURCHASE] &&
      !reduxTable[purchase.REVIEW_PURCHASE].isFetching
      ? reduxTable[purchase.REVIEW_PURCHASE].pageSize
      : 25;

  // All
  const allCurrentPage =
    reduxTable[purchase.ALL_PURCHASE] &&
      !reduxTable[purchase.ALL_PURCHASE].isFetching
      ? reduxTable[purchase.ALL_PURCHASE].currentPage
      : 1;

  const allCurrentPageSize =
    reduxTable[purchase.ALL_PURCHASE] &&
      !reduxTable[purchase.ALL_PURCHASE].isFetching
      ? reduxTable[purchase.ALL_PURCHASE].pageSize
      : 25;

  return {
    DraftPurchase,
    ReviewPurchase,
    allPurchase,
    draftCurrentPage,
    draftCurrentPageSize,
    reviewCurrentPage,
    reviewCurrentPageSize,
    allCurrentPage,
    allCurrentPageSize,
  };
}

// Map Dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
