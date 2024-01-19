import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// API
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

// Components
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import Toast from "../../components/Toast";
import ProductForm from "./components/productForm";
import BillForm from "./components/purchaseForm";
import CancelButton from "../../components/CancelButton";
import HorizontalSpace from "../../components/HorizontalSpace";
import AddButton from "../../components/AddButton";
import Comment from "../../components/comment";
import DateSelector from "../../components/Date";
import Drawer from "../../components/Drawer";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox.js";
import ProductSearch from "../../components/productSearch";
import Quantity from "../../components/Quantity";
import SaveButton from "../../components/SaveButton";
import Spinner from "../../components/Spinner";
import StatusComponent from "../../components/Status";
import ProductCard from "../product/components/productCard";
import Banner from "../../components/Banner.js";
import PaymentList from "../payment/components/paymentList.js";
import Button from "../../components/Button";
import BillTab from "./components/BillTab";

// Action
import { deletePurchase, updatePurchase } from "../../actions/purchase";
import { addPurchaseProduct } from "../../actions/purchase";
import { fetchList } from "../../actions/table";

// Lib
import Currency from "../../lib/Currency";
import { isBadRequest, SUCCESS_RESPONSE } from "../../lib/Http";
import Number from "../../lib/Number";
import String from "../../lib/String";

// Helpers
import Cookie from "../../helpers/Cookie.js";
import { HttpStatus } from "../../helpers/HttpStatus";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import { calculateNetAmount } from "../../helpers/Purchase";
import * as Constants from "../../helpers/Purchase.js";
import Url from "../../helpers/Url";

// Lib
import DateTime from "../../lib/DateTime";
import Cookies, { setCookie } from "../../lib/Helper.js";
import Urls from "../../lib/Url";

// Services
import BillService from "../../services/BillService";
import PurchaseProductService from "../../services/PurchaseProductService";
import StoreService from "../../services/StoreService.js";
import { hasPermission } from "../../services/UserRolePermissionService";
import AccountProductService from "../../services/AccountProductService.js";
import PaymentService from "../../services/PaymentService.js";
import AccountService from "../../services/AccountService.js";

// Constants//
const Tab = {
  SUMMARY: "Summary",
  PRODUCT: "Products",
  HISTORY: "History",
  PAYMENT: "Payments",
  BILL: "Bills",
  COMMENTS: "Comments",
};

const GeneralDetailsTab = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState(Urls.GetParam("tab") || Tab.SUMMARY);
  const [imageList, setImageList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [status, setStatus] = useState();
  const [accountList, setAccountList] = useState([]);
  const [vendorData, setVendorData] = useState();
  const [PermissionList, setPermissionList] = useState();
  const [netAmount, setNetAmount] = useState("");
  const [amountValue, setAmountValue] = useState();
  const [discountAmountValue, setDiscountAmountValue] = useState();
  const [purchaseData, setBillData] = useState("");
  const [productDetail, setProductDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [discrepancyAmountValue, setDiscrepancyAmountValue] = useState();
  const [taxAmountValue, setTaxAmountValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [storeProductList, setStoreProductList] = useState([]);
  const [productId, setProductId] = useState();
  const [product, setProduct] = useState();
  const [productname, setProductName] = useState();
  const [vendorName, setVendorName] = useState();
  const [vendorInvoiceNumber, setVendorInvoiceNumber] = useState();
  const [location, setStore] = useState(null);
  const [descriptionChange, setDescriptionChange] = useState();
  const [values, setValues] = useState();
  const [productdata, setProductData] = useState("");
  const [netamount, setNetamount] = useState("");
  const [cgstAmount, setCgstAmount] = useState("");
  const [cgstPercentageValue, setCgstPecentageValue] = useState("");

  const [sgstAmount, setSgstAmount] = useState("");
  const [sgstPercentageValue, setSgstPecentageValue] = useState("");

  const [cessAmount, setCessAmount] = useState("");
  const [cessPercentageValue, setCessPecentageValue] = useState("");
  const [discountAmountValues, setDiscountAmount] = useState("");
  const [quantity, setQantity] = useState();
  const [manufactureDate, setmanufactureDate] = useState();
  const [accountLists, setAccountLists] = useState([]);
  const [amountValues, setAmountValues] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountValue, setAccountValue] = useState();
  const [onNetAmount, setOnNetAmount] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [unitAmount, setUnitAmount] = useState();
  const [notes, setNotes] = useState();
  const [vendorInvoiceDate, setVensorInvoiceDate] = useState();
  const [dueDate, setDueDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [otherDeductionAmount, setOtherDeductionAmount] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [cashDiscountPercentage, setCashDiscountPercentage] = useState("");
  const [cashDiscountAmount, setCashDiscountAmount] = useState("");
  const [returnedAmount, setReturnedItemsAmount] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState();
  const [statusValue, setStatusValue] = useState(null)
  const [productIds, setProductIds] = useState([])
  const [arrayList, setArrayList] = useState([]);
  const [arrays, setArray] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [isEditable, setIsEditable] = useState(true)
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [rowValue, setRowValue] = useState(null);
  const [detail, setDetail] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vendor, setVendor] = useState();

  let storeId = purchaseData && purchaseData?.store_id;
  let purchaseId = purchaseData && purchaseData?.id;
  let billId = purchaseData && purchaseData?.bill_id;
  const buttonLabel = true;

  useEffect(() => {
    getBillDetail();
    getRolePermissions();
    getStoreProducts();
  }, [props, storeId]);

  useEffect(() => {
    getVendor(purchaseData?.vendor_id);
  }, [purchaseData?.vendor_id]);

  useEffect(() => {
    getStoreList();
  }, []);

  useEffect(() => {
    getBillDetail();
  }, []);

  useEffect(() => {
    const checkedList = Cookies.get(Cookie.PURCHASE_PRODUCT_LIST_COLUMNS);
    const checkedLists = checkedList ? JSON.parse(checkedList) : checkedList;
    if (checkedLists) {
      setArrayList(checkedLists);
      setArray(checkedLists);
    }
  }, []);

  const id = props.match.params.tab;

  const getStoreList = async () => {
    await StoreService.list((storeList) => {
      setStoreList(storeList);
    })
  };

  const getVendor = async (id) => {
    if (id) {
      const vendor = await AccountService.getVendor(id);
      let vendors = vendor?.data ? vendor?.data : null;
      setVendor(vendors);
    }
  };


  //Get Role Permission
  const getRolePermissions = async () => {
    const statusPermission = hasPermission(Permission.PURCHASE_STATUS_UPDATE);
    setPermissionList(statusPermission);
  };

  // Bread Crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    { label: "Purchases", link: Url.PURCHASE_LIST },
    { label: activeTab }
  ];

  //Get Bill Detail
  const getBillDetail = async () => {
    let id = props?.match?.params?.tab;
    try {
      const response = await apiClient.get(
        `${endpoints().purchaseAPI}/detail/${id}`
      );
      const data = response.data ? response.data : "";
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

  const handleUpdateFromProduct = async () => {
    let data = new FormData();
    data.append("purchase_id", id);
    data.append("productIds", productIds.productIds)

    dispatch(
      await PurchaseProductService.bulkUpdate(
        data,
        (res) => {
          if (res) {
            dispatch(
              fetchList(
                "purchaseProduct",
                `${endpoints().purchaseProductAPI}/search`,
                Urls.GetParam("page") ? Urls.GetParam("page") : 1,
                Urls.GetParam("pageSize") ? Urls.GetParam("pageSize") : 25,
                {
                  purchaseId: id,
                  storeId: storeId,
                }
              )
            );
          }
        }
      )
    );
  };


  const closeDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
    setRowValue("")
  };

  const toggle = (tab) => {

    setActiveTab(tab);

    props.history.push(`?tab=${tab}`)
  };

  const handleChangeStatus = (selectStatus) => {
    if (selectStatus) {
      setStatus(selectStatus);
    }
    updateBill(id, status, {});
  };

  const paymentType = [
    {
      value: "purchase Payment",
      label: "Purchase Payment"
    },
    {
      value: "Vendor Advance",
      label: "Vendor Advance"
    }
  ];

  const handleChange = (e) => {
    if (e == "Delete") {
      setDeleteModal(true);
    }

    if (e == "Update From Product") {
      handleUpdateFromProduct();
    }
  };

  const paymentTerm = [
    {
      value: "Net 15",
      label: "Net 15"
    },
    {
      value: "Net 30",
      label: "Net 30"
    },
    {
      value: "Net 45",
      label: "Net 45"
    },
    {
      value: "Net 60",
      label: "Net 60"
    },
    {
      value: "Due end of the month",
      label: "Due end of the month"
    },
    {
      value: "Due end of next month",
      label: "Due end of next month"
    },
    {
      value: "Due on receipt",
      label: "Due on receipt"
    }
  ];

  // Handle Column Sort
  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.PURCHASE_PRODUCT_LIST_COLUMNS, arrayList);
    setArray(array);
    setArrayList(array);
  };

  // Status Options
  const FieldLabel = [
    {
      value: Constants.FieldLabel.DISCOUNT_AMOUNT,
      label: Constants.FieldLabel.DISCOUNT_AMOUNT,
    },
    {
      value: Constants.FieldLabel.UNIT_MARGIN_AMOUNT,
      label: Constants.FieldLabel.UNIT_MARGIN_AMOUNT,
    },
    {
      value: Constants.FieldLabel.MANUFACTURED_DATE,
      label: Constants.FieldLabel.MANUFACTURED_DATE,
    },
    {
      value: Constants.FieldLabel.STATUS,
      label: Constants.FieldLabel.STATUS,

    },
    {
      value: Constants.FieldLabel.TAX_AMOUNT,
      label: Constants.FieldLabel.TAX_AMOUNT,
    },
    {
      value: Constants.FieldLabel.TAXABLE_AMOUNT,
      label: Constants.FieldLabel.TAXABLE_AMOUNT,
    }
  ];

  function storeID() {
    return location ? location : storeId;
  }

  /**
   * Delete Bill
   *
   * @param data
   */
  const purchaseDelete = () => {
    let id = props.match.params.tab;
    dispatch(deletePurchase(id, {}));
    history.push("/purchases");
  };

  const paymentsDelete = async () => {
    let params = {
      tabId: Tab.PAYMENT,
      purchaseId: purchaseId
    }
    dispatch(await PaymentService.delete(rowValue?.id, history, params));
    closeDeleteModal()
  };

  const handleProductChange = (values) => {
    setProductId(
      values?.values?.storeProduct?.id ? values?.values?.storeProduct?.id : ""
    );
    setProductName(
      values?.values?.storeProduct?.value
        ? values?.values?.storeProduct?.value
        : ""
    );
    setProductData(values?.values?.storeProduct);
  };

  const addProduct = (
    <>
      <ProductSearch
        storeProductList={storeProductList}
        onInputChange={handleProductChange}
      />
      <Quantity label="Quantity" required />
      <DateSelector
        label="Manufactured Date"
        name="manufactured_date"
      />
    </>
  );

  const actionOptions = activeTab == Tab.PRODUCT ? [
    {
      label: "Update From Product",
      value: "Update From Product"
    },


    {
      label: "Delete",
      value: "Delete"
    },

  ] :
    [

      {
        label: "Delete",
        value: "Delete"
      },

    ];

  const getProductDetails = (
    productName,
    productImage,
    brandName,
    size,
    unit,
    salePrice,
    mrp
  ) => {
    return (
      <ProductCard
        productImageIcon
        square
        productName={productName}
        url={productImage}
        brandName={brandName}
        size={size != "null" ? size : ""}
        unit={unit != "null" ? unit : ""}
        salePrice={salePrice != "null" ? salePrice : ""}
        mrp={mrp != "null" ? mrp : ""}
        disableLink
      />
    );
  };

  const getStoreProducts = async () => {
    try {
      //get location product list
      let storeProductList = new Array();

      //validate location Id exist or not
      if (storeId) {
        let params = {
          pagination: false,
          accountId: purchaseData?.vendor_id
        }
        let response = await AccountProductService.search(params);

        //validate response exist or not
        if (response && response.data && response.data.data) {
          //get location products
          let storeProducts = response.data.data;
          //validate location products
          if (storeProducts && storeProducts.length > 0) {
            //loop the location rpdocuts
            for (let i = 0; i < storeProducts.length; i++) {
              let productDetails = storeProducts[i];
              //push the location prroducts
              storeProductList.push({
                label: getProductDetails(
                  productDetails?.name,
                  storeProducts[i]?.image,
                  productDetails?.brand_name,
                  productDetails?.size,
                  productDetails?.unit,
                  productDetails?.sale_price,
                  productDetails?.mrp
                ),
                value:
                  productDetails?.name +
                  productDetails?.brand_name +
                  productDetails?.barcode,
                id: storeProducts[i]?.product_id
              });
            }
          }
          //set value in state
          setStoreProductList(storeProductList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  let showHistory = hasPermission(Permission.PURCHASE_HISTORY_VIEW);

  const AddPurchaseProduct = (values) => {
    setIsLoading(true);
    try {
      //create stock entry data
      let purchaseProductData = new Object();

      purchaseProductData.manufactured_date =
        values && values?.manufactured_date ? values?.manufactured_date : null;
      purchaseProductData.purchaseId = purchaseData && purchaseData?.id;
      purchaseProductData.productId = productId;
      purchaseProductData.quantity =
        values && values.quantity && values.quantity.value;


      //validate stock entry Id exist or not
      if (purchaseId) {
        //cretae parms
        let params = { storeId: storeId, purchaseId: purchaseId };
        // add stock product entry data
        dispatch(
          addPurchaseProduct(purchaseProductData, params, {
            pagination: true,
            sort: "updatedAt",
            sortDir: "DESC"
          })
        );

        getStoreProducts();
        setIsLoading(false);
        _toggle(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Handle Update purchase Details
  const handleUpdate = (id, values) => {
    const data = new FormData();
    if (values && values.purchase_number) {
      data.append(
        "purchaseNumber",
        values && Number.Get(values?.purchase_number)
      );
    }
    if (values && values.date) {
      data.append("date", values && DateTime.toISOStringDate(values.date));
    }
    if (values && values.vendor_invoice_number) {
      data.append(
        "vendor_invoice_number",
        values && String.Get(values.vendor_invoice_number)
      );
    }
    if (values && values.order_number) {
      data.append("order_number", values && Number.Get(values.order_number));
    }

    if (values && values.description !== undefined) {
      data.append("description", values && String.Get(values.description));
    }
    if (values && values.location) {
      data.append("location", values && Number.Get(values.location.value));
    }
    if (values && values.vendor_name) {
      data.append("vendor_id", values && String.Get(values.vendor_name.value));
    }
    let imageNames = [];
    for (let i = 0; i < imageList.length; i++) {
      imageNames.push({ name: imageList[i].file.name });
      data.append("files", imageList[i].file);
    }
    data.append("imageName", JSON.stringify(imageNames));
    if (values && values.discount_amount) {
      data.append(
        "discount_amount",
        values && Currency.Get(values.discount_amount)
      );
    }

    if (values && values.discrepancy_amount) {
      data.append(
        "discrepancy_amount",
        values && Currency.Get(values.discrepancy_amount)
      );
    }
    if (values && values.tax_amount) {
      data.append("tax_amount", values && Currency.Get(values.tax_amount));
    }
    if (values && values?.owner && values?.owner?.id) {
      data.append("owner", values?.owner?.id ? values?.owner?.id : "");
    }
    if (values && values?.notes) {
      data.append("notes", values?.notes ? values?.notes : "");
    }
    if (values && values.vendor_invoice_date) {
      data.append(
        "vendor_invoice_date",
        values.vendor_invoice_date ? DateTime.toISOStringDate(values.vendor_invoice_date) : ""
      );
    }
    if (values && values?.due_date) {
      data.append("due_date", values?.due_date ? values?.due_date : "");
    }
    if (values && values?.otherDeductionAmount) {
      data.append(
        "otherDeductionAmount",
        values && values?.otherDeductionAmount
          ? values?.otherDeductionAmount
          : ""
      );
    }
    if (values && values?.invoice_amount) {
      data.append(
        "invoice_amount",
        values && values?.invoice_amount ? parseFloat(values.invoice_amount) : ""
      );
    }
    if (values && values?.returnedItemAmount) {
      data.append(
        "returnedItemAmount",
        values && values?.returnedItemAmount
          ? values?.returnedItemAmount
          : ""
      );
    }
    dispatch(
      updatePurchase(id, data, {}, (response) => {
        if (response.status == HttpStatus.OK) {
          setIsLoading(true);
          getBillDetail();
          setIsEditable(true)
          setIsLoading(false);
        }
      })
    );
  };

  const _toggle = () => {
    setIsOpen(!isOpen);
    setProductId("");
    setProductName("");
    setNetamount("");
    setProductData("");
    setCgstPecentageValue("");
    setSgstPecentageValue("");
    setCessPecentageValue("");
    setQantity("");
    setmanufactureDate("");
    setSgstAmount("");
    setCessAmount("");
    setCgstAmount("");
    setDiscountPercentage("");
    setDiscountAmount("");
    setUnitAmount("");
    setPrice("")
    setAmount("")
    setStatusValue("")
  };

  const handleOpenModal = () => {
    setIsModelOpen(true);
  };

  const handleCloseModal = () => {
    setIsModelOpen(false);
    setIsSubmitting(true)
    setRowValue("")
  };

  const toggles = () => {
    setIsModelOpen(!isOpen);
    setDueDate("")
  };

  const handleInvoiceAmount = (e) => {
    const value = parseFloat(e.target.value);
    setInvoiceAmount(value);
  };

  const handleCashDiscountPerentage = (e) => {
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

  useEffect(() => {
    let netAmount = paymentAmount - cashDiscountAmount;
    setNetAmount(netAmount);
  }, [paymentAmount, cashDiscountAmount]);

  useEffect(() => {
    const invoiceAmountUse = invoiceAmount
      ? invoiceAmount
      : purchaseData.invoice_amount;
    const returnsAmountuse =
      returnedAmount === 0
        ? 0
        : returnedAmount
          ? returnedAmount
          : purchaseData?.returned_items_amount;
    const otherDeductionAmountUse =
      otherDeductionAmount === 0
        ? 0
        : otherDeductionAmount
          ? otherDeductionAmount
          : purchaseData.other_deduction_amount;
    const calculatedpaymentAmount =
      invoiceAmountUse - returnsAmountuse - otherDeductionAmountUse;
    setPaymentAmount(calculatedpaymentAmount);
  }, [
    invoiceAmount,
    purchaseData?.returned_items_amount,
    otherDeductionAmount,
    returnedAmount,
    purchaseData?.invoice_amount,
    purchaseData?.other_deduction_amount
  ]);

  useEffect(() => {
    const paybleAmountUse = paymentAmount
      ? paymentAmount
      : invoiceAmount
        ? invoiceAmount
        : purchaseData?.invoice_amount;
    const cashDiscountPercentageUse =
      cashDiscountPercentage === 0
        ? 0
        : cashDiscountPercentage
          ? cashDiscountPercentage
          : purchaseData.cash_discount_percentage;
    const calculatedCashDiscountAmount =
      paybleAmountUse * (cashDiscountPercentageUse / 100);
    setCashDiscountAmount(calculatedCashDiscountAmount);
  }, [
    invoiceAmount,
    cashDiscountPercentage,
    purchaseData.invoice_amount,
    purchaseData.returned_items_amount,
    returnedAmount,
    otherDeductionAmount,
    paymentAmount
  ]);

  const onNetAmountChange = (values) => {
    let value = values.target.value;
    setOnNetAmount(value);
  };

  const amountChange = (x) => {
    const amount = x?.values?.amount;
    const netAmount = calculateNetAmount(
      amount,
      discountAmountValue,
      discrepancyAmountValue,
      taxAmountValue,
      purchaseData
    );
    setNetAmount(netAmount);
    setAmountValue(amount);
  };

  const discountAmountChange = (x) => {
    const discountAmount = x.values.discount_amount;
    const netAmount = calculateNetAmount(
      amountValue,
      discountAmount,
      discrepancyAmountValue,
      taxAmountValue,
      purchaseData
    );
    setNetAmount(netAmount);
    setDiscountAmountValue(discountAmount);
  };

  const onDiscrepancyAmountChange = (e) => {
    const discrepancyAmount = e?.values?.discrepancy_amount;
    const netAmount = calculateNetAmount(
      amountValue,
      discountAmountValue,
      discrepancyAmount,
      taxAmountValue,
      purchaseData
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
      taxAmount,
      purchaseData
    );
    setNetAmount(netAmount);
    setTaxAmountValue(taxAmount);
  };

  const onVendorChange = (vendor_name) => {
    const value = vendor_name ? vendor_name : "";
    setVendorName(value);
  };

  const onPurchaseNumberChange = (e) => {
    const value = e.target.value
    setVendorInvoiceNumber(value);
  };

  const onStoreChange = (x) => {
    const value = parseFloat(x.target.value ? x.target.value : 0);
    setStore(value);
  };

  const onDescriptionChange = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setDescriptionChange(value);
  };

  const addFooter = (
    <div>
      <SaveButton type="submit" label="Add" />
    </div>
  );

  const initialValues = {
    storeProduct: productname
      ? {
        label: productname ? productname : "",
        value: productId ? productId : "",
      }
      : "",
    quantity: quantity,

    manufactured_date: manufactureDate ? manufactureDate : "",
  };

  if (isLoading) {
    return <Spinner />;
  }

  const initialValue = {
    purchase_number: purchaseData.purchase_number,
    description:
      descriptionChange == 0
        ? ""
        : descriptionChange
          ? descriptionChange
          : purchaseData.description,
    date: purchaseDate ? purchaseDate : purchaseData.purchase_date
      ? DateTime.getDateTimeByUserProfileTimezone(purchaseData.purchase_date)
      : "",
    vendor_invoice_date: vendorInvoiceDate
      ? vendorInvoiceDate
      : purchaseData?.vendor_invoice_date
        ? DateTime.getDateTimeByUserProfileTimezone(purchaseData?.vendor_invoice_date)
        : "",
    due_date: dueDate ? dueDate : purchaseData?.due_date,
    vendor_name: {
      label: vendorName?.label ? vendorName?.label : vendorData?.vendor_name,
      value: vendorName?.value ? vendorName?.value : purchaseData?.vendor_id
    },
    order_number: purchaseData.order_number,
    payment_type: paymentType.find((option) =>
      option.value == purchaseData.payment_type ? purchaseData.payment_type : ""
    ),
    payment_term: paymentTerm.find((option) =>
      option.value == purchaseData.payment_term ? purchaseData.payment_term : ""
    ),
    amount:
      amountValue === "" ? 0 : amountValue ? amountValue : purchaseData?.amount,
    location: location ? storeList.find((data) => data.value == location) : storeList.find((data) => data.value === storeId),
    vendor_invoice_number:
      vendorInvoiceNumber == ""
        ? 0
        : vendorInvoiceNumber
          ? vendorInvoiceNumber
          : purchaseData.vendor_invoice_number,
    net_amount: Currency.Get(purchaseData?.net_amount) || "",
    discount_amount:
      discountAmountValue === ""
        ? 0
        : discountAmountValue
          ? discountAmountValue
          : purchaseData?.discount_amount,
    status: { label: purchaseData.status },
    discrepancy_amount:
      discrepancyAmountValue === ""
        ? 0
        : discrepancyAmountValue
          ? discrepancyAmountValue
          : purchaseData?.discrepancy_amount,
    tax_amount:
      taxAmountValue === ""
        ? 0
        : taxAmountValue
          ? taxAmountValue
          : purchaseData?.tax_amount,
    owner: "",
    notes:
      notes === ""
        ? ""
        : notes
          ? notes
          : purchaseData?.notes
            ? purchaseData?.notes
            : "",
    otherDeductionAmount:
      otherDeductionAmount === 0
        ? ""
        : otherDeductionAmount
          ? otherDeductionAmount
          : purchaseData?.other_deduction_amount,
    invoice_amount:
      invoiceAmount === 0
        ? ""
        : invoiceAmount
          ? invoiceAmount
          : purchaseData?.invoice_amount,
    cashDiscountAmount:
      cashDiscountPercentage === 0
        ? ""
        : cashDiscountAmount
          ? cashDiscountAmount
          : purchaseData?.cashDiscountAmount,
    cash_discount_percentage:
      cashDiscountPercentage === 0
        ? ""
        : cashDiscountPercentage
          ? cashDiscountPercentage
          : purchaseData?.cash_discount_percentage,
    returnedItemAmount:
      returnedAmount === 0
        ? ""
        : returnedAmount
          ? returnedAmount
          : purchaseData?.returned_items_amount
  };

  const onStatusChange = (value) => {
    if (value) {
      handleStatusChange(value);
    }
  };

  const handleStatusChange = (status) => {
    const data = new FormData();
    data.append("status", status ? status : "");
    try {
      if (
        Currency.Math(purchaseData?.net_amount) == Currency.Math(vendorData?.totalAmount)
      ) {
        apiClient
          .put(`${endpoints().purchaseAPI}/status/${id}`, data)
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

  // payment section

  const __toggle = () => {
    setIsModalOpen(!isModalOpen);
    setAmountValues("");
    setAccountValue("");
  };

  const handleNotesChange = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);

    setNotes(value);
  };

  const onVendorInvoiceDateChange = (x) => {
    const value = x ? x : "";
    setVensorInvoiceDate(value);
  };

  const handlePurchaseChange = (date) => {
    const value = date ? date : "";
    setPurchaseDate(value)
  }

  const onDueDateChange = (e) => {
    setDueDate(e);
  };


  const onClick = async (values) => {
    const data = new FormData();
    data.append("purchaseId", purchaseData?.id);
    data.append("account_id", purchaseData?.vendor_id);
    data.append("date", new Date());
    data.append("invoice_number", purchaseData.vendor_invoice_number);
    data.append("vendor_name", vendorData?.vendor_name);
    data.append("net_amount", purchaseData?.net_amount);
    data.append("owner_id", purchaseData?.owner_id);
    data.append(
      "returnedItemAmount",
      purchaseData?.returned_items_amount
        ? purchaseData?.returned_items_amount
        : ""
    );
    data.append(
      "invoice_amount",
      purchaseData?.invoice_amount ? purchaseData?.invoice_amount : ""
    );
    data.append(
      "cash_discount_percentage",
      purchaseData?.cash_discount_percentage
        ? purchaseData?.cash_discount_percentage
        : ""
    );

    data.append(
      "otherDeductionAmount",
      purchaseData?.other_deduction_amount
        ? purchaseData?.other_deduction_amount
        : ""
    );
    data.append(
      "cashDiscountAmount",
      purchaseData?.cashDiscountAmount ? purchaseData?.cashDiscountAmount : ""
    );
    if (activeTab === Tab.BILL) {

      dispatch(await BillService.create(data, { purchase_id: id }, "", () => { }));
      setIsLoading(true);
      getBillDetail();
      setIsLoading(false);
    }
    if (activeTab === Tab.PAYMENT) {

      dispatch(await PaymentService.create(data, { purchase_id: id }, "", () => { }));
      setIsLoading(true);
      getBillDetail();
      setIsLoading(false);
    }
  };

  const onBulkSelect = (ids) => {
    setProductIds({ productIds: ids });
  };

  let params = { objectName: ObjectName.PAYMENT }
  if (purchaseId) {
    params.purchaseId = purchaseId

  }

  return (
    <>

      <DeleteModal
        isOpen={openDeleteModal}
        label={rowValue?.id}
        toggle={closeDeleteModal}
        title="Delete Payment"
        deleteFunction={paymentsDelete}
      />

      <DeleteModal
        id={purchaseData?.data?.id}
        label={purchaseData?.purchase_number}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Product "
        deleteFunction={purchaseDelete}
      />

      {activeTab == Tab.PRODUCT && <Drawer
        modelTitle="Add Purchase Product"
        DrawerBody={addProduct}
        DrawerFooter={addFooter}
        onSubmit={(values) => {
          AddPurchaseProduct(values);
        }}
        initialValues={initialValues}
        handleOpenModal={_toggle}
        handleCloseModal={_toggle}
        handleDrawerClose={_toggle}
        isModalOpen={isOpen}
        buttonLabel={buttonLabel}
        enableReinitialize={true}
      />}

      {/* Bread Crumb Section */}
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between" target="_blank">
        <PageTitle label={`Purchase #${purchaseData.purchase_number}`} />

        <div className="d-flex justify-content-end mb-3">
          {activeTab === Tab.BILL && (
            <React.Fragment>
              <AddButton
                label="Create Bill"
                className="mx-2 my-1"
                onClick={onClick}
                toUrl="#"
              />
            </React.Fragment>
          )}
          {activeTab === Tab.PRODUCT && (
            <AddButton
              label="Add Product"
              onClick={() => {
                _toggle();
              }}
              className="mx-2 my-1"
            />
          )}
          {activeTab === Tab.PAYMENT && (
            <AddButton
              label="Add Payment"
              onClick={onClick}
              className="mx-2 my-1"
            />
          )}
          <>
            <div className="d-flex justify-content-around">
              {activeTab === Tab.SUMMARY && isEditable && (
                <Button
                  label="Edit"
                  className="mr-2"
                  onClick={() => {
                    setIsEditable(false)
                  }} />
              )}

              <div className="mr-2">
                <StatusComponent
                  objectName={ObjectName.PURCHASE}
                  handleChange={onStatusChange}
                  buttonLabel={vendorData?.statusName}
                  currentStatusId={vendorData?.statusValue} />
              </div>
            </div>
          </>

          {/* Action Menu */}
          <Action dropdownLinks={actionOptions} handleChange={handleChange} />
          {activeTab === Tab.PRODUCT && (
            <div className="pl-2">
              <DropdownWithCheckbox
                className="overflow-visible d-flex justify-content-between"
                buttonLabel=""
                dropdownLinks={FieldLabel}
                handleChange={(e) => {
                  handleColumnChange(e);
                }}
                color="gray"
                hideCaret
                checkedItems={arrayList}
              />
            </div>
          )}
        </div>
      </div>

      {/* showing the vendor Payment terms and Return terms */}
      {vendor && (
        <div
          className="shadow mx-0 my-3 bg-danger"
          style={{ borderRadius: "10px" }}
        >
          {vendor?.payment_terms &&
            <pre className="py-2 px-2 text-white">{vendor?.payment_terms ? vendor?.payment_terms : null}</pre>
          }
          {vendor?.return_terms &&
            <pre className="py-2 px-2 text-white">{vendor?.return_terms ? vendor?.return_terms : null}</pre>
          }
        </div>
      )}

      {vendorData && vendorData.marginMismatchedCount > 0 &&
        <Banner className="bg-red" text={vendorData.marginMistachedText} />
      }
      {vendorData && vendorData.marginMismatchedCount == 0 &&
        <Banner text={vendorData.marginMistachedText} />
      }
      <Nav tabs className="admin-tabs">
        {/* Detail Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.SUMMARY
            })}
            onClick={() => {
              toggle(Tab.SUMMARY);
            }}>
            {Tab.SUMMARY}
          </NavLink>
        </NavItem>
        {/* History Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.PRODUCT
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
              active: activeTab === Tab.BILL
            })}
            onClick={() => {
              toggle(Tab.BILL);
            }}>
            {Tab.BILL}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.PAYMENT
            })}
            onClick={() => {
              toggle(Tab.PAYMENT);
            }}>
            {Tab.PAYMENT}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.COMMENTS
            })}
            onClick={() => {
              toggle(Tab.COMMENTS);
            }}>
            {Tab.COMMENTS}
          </NavLink>
        </NavItem>

        {/* History Tab */}
        {showHistory && (
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === Tab.HISTORY
              })}
              onClick={() => {
                toggle(Tab.HISTORY);
              }}>
              {Tab.HISTORY}
            </NavLink>
          </NavItem>
        )}
      </Nav>

      <div className="tabs-and-preview full-width d-flex admin-settings mb-4">
        <div className="card-body card">
          <Form
            enableReinitialize={true}
            initialValues={initialValue}
            onSubmit={(values) => {
              let id = props.match.params.tab;
              handleUpdate(id, values);
            }}>
            <TabContent activeTab={activeTab}>
              {/* Detail Tab Start*/}
              {activeTab === Tab.SUMMARY && (
                <TabPane tabId={Tab.SUMMARY} className="w-100">
                  <div className="row">
                    <div className="col-12">
                      <BillForm
                        className="col-lg-7"
                        storeList={storeList}
                        history={history}
                        imageList={imageList}
                        edit={true}
                        status={true}
                        handleChange={(e) => handleChangeStatus(e)}
                        PermissionList={PermissionList}
                        onAmountChange={amountChange}
                        onDiscountAmountChange={discountAmountChange}
                        onDiscrepancyAmountChange={onDiscrepancyAmountChange}
                        onTaxAmountChange={onTaxAmountChange}
                        onVendorChange={onVendorChange}
                        onPurchaseNumberChange={(e) => onPurchaseNumberChange(e)}
                        onStoreChange={onStoreChange}
                        onDescriptionChange={onDescriptionChange}
                        editable={isEditable}
                        id={purchaseId}
                        showOwner={true}
                        Values={setValues}
                        getBillDetail={getBillDetail}
                        vendorData={vendorData}
                        onNetAmountChange={onNetAmountChange}
                        handleNotesChange={handleNotesChange}
                        onVendorInvoiceDateChange={onVendorInvoiceDateChange}
                        onDueDateChange={onDueDateChange}
                        showNotes
                        handleInvoiceAmount={handleInvoiceAmount}
                        handleReturnedAmount={handleReturnedAmount}
                        handleOtherDeductionAmount={handleOtherDeductionAmount}
                        handleCashDiscountPerentage={
                          handleCashDiscountPerentage
                        }
                        owner_id={
                          purchaseData?.owner_id ? purchaseData?.owner_id : null
                        }
                        handlePurchaseChange={handlePurchaseChange}

                      />
                    </div>
                  </div>
                </TabPane>
              )}

              {/* History Tab Start*/}
              {activeTab === Tab.PRODUCT && (
                <TabPane tabId={Tab.PRODUCT} className="w-100">
                  <div >
                    <ProductForm
                      storeId={
                        purchaseData && purchaseData?.store_id
                          ? purchaseData.store_id
                          : props.match.params.subtab
                      }
                      purchaseId={
                        purchaseData && purchaseData.id
                          ? purchaseData?.id
                          : props.match.params.tab
                      }
                      showActionButton
                      arrays={arrays}
                      history={history}
                      statusValue={setStatusList}
                      onBulkSelect={onBulkSelect}
                    />
                  </div>
                </TabPane>
              )}

              {/* Bill Tab */}
              {activeTab === Tab.BILL && (
                <TabPane tabId={Tab.BILL} className="w-100">
                  <BillTab history={history} purchase_id={id} />
                </TabPane>
              )}
              {activeTab == Tab.PAYMENT && <TabPane tabId={Tab.PAYMENT} className="w-100">
                <PaymentList
                  history={history}
                  isOpen={isModelOpen}
                  toggles={toggles}
                  setIsSubmitting={setIsSubmitting}
                  isSubmitting={isSubmitting}
                  handleCloseModal={handleCloseModal}
                  assigneePlaceholder="Select Owner"
                  params={params}
                  setRowValue={setRowValue}
                  rowValue={rowValue}
                  setDueDate={setDueDate}
                  dueDate={dueDate}
                  setDetail={setDetail}
                  detail={detail}
                  notesValue={detail?.notes}
                  showLoggedInUser
                  setOpenDeleteModal={setOpenDeleteModal}
                  purchaseAcountId={purchaseData && purchaseData?.vendor_id}
                  purchaseOwnerId={purchaseData && purchaseData?.owner_id}

                />
              </TabPane>}
              {/* History Tab*/}
              {showHistory && activeTab === Tab.HISTORY && (
                <TabPane tabId={Tab.HISTORY} className="w-100">
                  <ActivityList
                    id={id}
                    objectId={id}
                    object_name={ObjectName.PURCHASE}
                    history={history}
                  />
                </TabPane>
              )}
              {activeTab == Tab.COMMENTS && <TabPane tabId={Tab.COMMENTS} className="w-100">
                <Comment
                  objectId={id}
                  objectName={ObjectName.PURCHASE}
                  maxHeight="100vh"
                />
              </TabPane>}
            </TabContent>
            {activeTab == Tab.SUMMARY && <HorizontalSpace>
              {!isEditable &&
                <>
                  <SaveButton label="Save" />
                  <CancelButton
                    onClick={() => {
                      props.history.goBack();
                    }}
                  />
                </>
              }
            </HorizontalSpace>}
          </Form>
        </div>
      </div>
    </>
  );
};
export default GeneralDetailsTab;
[];
