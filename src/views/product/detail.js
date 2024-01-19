import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  TabContent,
  TabPane
} from "reactstrap";

// Components
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Currency from "../../components/Currency";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import FeatureImage from "../../components/Image";
import ImageList from "../../components/MediaCarousel";
import AddModal from "../../components/Modal";
import NumberComponent from "../../components/Number";
import PageTitle from "../../components/PageTitle";
import Percentage from "../../components/Percentage";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import SingleCheckbox from "../../components/SingleCheckbox";
import Spinner from "../../components/Spinner";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import URL from "../../components/Url";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import ObjectName from "../../helpers/ObjectName";
import * as Product from "../../helpers/Product";
import CurrencyFormat from "../../lib/Currency";
import PrintPriceTag from "./components/printPriceTag";
import StoreList from "./components/storeList";

// Selectors
import ProductTagSelector from "../tag/components/TagSelector";

// Actions
import { deleteProduct, updateProduct } from "../../actions/storeProduct";
import { addStore, updateStore } from "../../actions/storeProductDetail";

// Constant
import * as tabConstant from "../../helpers/Product";

// ApiClient
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";

// Configs
import { endpoints } from "../../api/endPoints";
import "../../scss/_custom.scss";
import "./product.scss";

// Assets
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Barcode from "react-barcode";
import { fetchList } from "../../actions/table";
import BrandSelect from "../../components/BrandSelect";
import CategorySelect from "../../components/CategorySelect";
import Quantity from "../../components/Quantity";
import Toast from "../../components/Toast";
import QuantityModal from "../../components/modal/QuantityModal";
import Permission from "../../helpers/Permission";
import { Store } from "../../helpers/Store";
import Boolean from "../../lib/Boolean";
import DateTime from "../../lib/DateTime";
import String from "../../lib/String";
import Url from "../../lib/Url";
import ProductPriceService from "../../services/ProductPriceService";
import productService from "../../services/ProductService";
import StoreProductService from "../../services/StoreProductService";
import TransferService from "../../services/TransferService";
import { hasPermission } from "../../services/UserRolePermissionService";
import { VendorProductService } from "../../services/VendorProductService";
import AccountService from "../../services/AccountService";
import ProductCard from "../product/components/productCard";
import ProductPriceEditModal from "./components/ProductPriceEditModal";
import PurchaseList from "./components/purchaseList";
import StoreBulkUpdateModal from "./components/storeProductBulkUpdateModal";

import classNames from "classnames";
import NavTab from "../../components/NavTab";
import ProductSelectModal from "../../components/ProductSelectModal";
import StatusText from "../../components/StatusText";
import ProductPriceStatus from "../../helpers/ProductPriceStatus";
import StatusService from "../../services/StatusService";
import VendorList from "../product/components/VendorList";
import StockEntryDetailPage from "../stockEntry/stockEntryDetailPage";
import TransferProductList from "../transfer/Components/transferProductList";
import LocationProduct from "../../helpers/LocationProduct";
import Cookies, { setCookie } from "../../lib/Helper";
import Cookie from "../../helpers/Cookie";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import NumberSelect from "../../components/NumberSelect";
import Number from "../../lib/Number";
import ProductService from "../../services/ProductService";

// Tab Constants
export const tab = {
  ACTIVE: "Active",
  ARCHIVED: "Archived",
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ALL: "All",
};

// Product Detail Tabs
export const ProductDetailTab = {
  GENERAL: "General",
  INVENTORY: "Inventory",
  PRICE: "Prices",
  MEDIA: "Media",
  SHOPIFY: "Shopify",
  SEO: "SEO",
  TAGS: "Tags",
  LOCATION: "Locations",
  VENDOR: "Vendors",
  HISTORY: "History",
  PURCHASE: "Purchases",
  ORDERS: "Orders",
  TAX: "Tax",
  TRANSFER: "Transfers",
  STOCK_ENTRY_PRODUCT: "Stock Entries",
};

const ProductDetail = (props) => {
  // Product detail props
  const { history } = props;
  // Defining the param based on url search values
  // const param = new URLSearchParams(props.history.location.search);
  // Defining the clicked tab value from section in url
  const role = Url.GetParam("tab");
  let showHistory = hasPermission(Permission.PRODUCT_HISTORY_VIEW);
  let showEditButton = hasPermission(Permission.PRODUCT_EDIT);
  let showProductPriceEdit = hasPermission(Permission.PRODUCT_PRICE_EDIT);
  let showProductPriceDelete = hasPermission(Permission.PRODUCT_PRICE_DELETE);

  // State values
  const [isOpen, setIsOpen] = useState(false);
  const [productData, setProductData] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addStoreModal, setAddStoreModal] = useState(false);
  const [openVendorModal, setOpenVendorModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [weightUnit, setSelectedWeight] = useState("");
  const [allow_sell_out_of_stock, setSelectedOutOfStock] = useState("");
  const [initialValues, setInitialValues] = useState([]);
  const [storesList, setStoreList] = useState([]);
  const [locationName, setLocation] = useState([]);
  const [activeTab, setActiveTab] = useState(
    role ? role : ProductDetailTab.GENERAL
  );
  const [selectedStore, setSelectedStore] = useState([]);
  const [storeData, setStoreData] = useState("");
  const [storeDeleteModal, setStoreDeleteModal] = useState(false);
  const [vendorList, setVendorList] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const [storeIds, setStoreIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addCloneModal, setAddCloneModal] = useState(false);
  const [mergeModal, setMergeModal] = useState(false);
  const [confirmMergeModal, setconfirmMergeModal] = useState(false);
  const [sgstPercentageValue, setSgstPercentageValue] = useState(null);
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [cgstPercentageValue, setCgstPercentageValue] = useState(null);
  const [igstPercentageValue, setIgstPercentageValue] = useState(null);
  const [startDate, setStartDate] = useState(Url.GetParam("startDate"));
  const [endDate, setEndDate] = useState(Url.GetParam("endDate"));
  const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([0]);
  const [schedularId, setSchedularId] = useState();
  const [priceEditModal, setPriceEditModal] = useState(false);
  const [selectedPriceData, setSelectedPriceData] = useState("");
  const [openPriceDeleteModal, setPriceDeletModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [imagestatus, setImageStatus] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();
  const [priviousBarCode, setPriviousBarCode] = useState(null);
  const [productList, setProductList] = useState([]);
  const [selectedProductId, setProductId] = useState("");
  const [productname, setProductName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProductData, setSelectedProductData] = useState("");

  const [editable, setEditable] = useState(true);
  const [rowEdit, setRowEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [selectedProduct, setSelectProduct] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [isClone, setIsClone] = useState(false)
  const [arrays, setArray] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [mrpValue, setMrp] = useState("");
  const [salePriceValue, setSalePrice] = useState("");

  const [discountValue, setDiscount] = useState("");
  const [defaultValue, setIsDefault] = useState(false);
  const [costPriceValue, setCostPrice] = useState("");
  const [barCodeValue, setBarcode] = useState("");
  const [dateValue, setDate] = useState("");

  let selectedProductid = selectedProduct.join(",");

  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!openBulkUpdateModal);
  };

  const handleBulkSelect = (ids) => {
    setSelectedIds({ selectedIds: ids });
  };

  // Product id
  let productId = props.match.params.tab || productData.id;

  let params = {
    productId: productId,
    sort: Url.GetParam('sort'),
    sortDir: Url.GetParam('sortDir'),
    status: Store.STATUS_ACTIVE,
    tab: Url.GetParam('tab')
  }

  const ActionMenu = [
    { label: "All", value: "All" },
    { label: "No Stock", value: "NoStock" },
    { label: "Excess", value: "Excess" },
    { label: "Shortage", value: "Shortage" },
  ];

  const onCGSTPercentageChange = async (e) => {
    const values = e?.target?.value ? e?.target?.value : "";
    let data = {
      cgst_percentage: values ? values : "",
    };

    await ProductPriceService.updatePrice(id, data);
  };

  const onSGSTPercentageChange = async (e) => {
    const values = e?.target?.value ? e?.target?.value : "";
    let data = {
      sgst_percentage: values ? values : "",
    };

    await ProductPriceService.updatePrice(id, data);
  };

  // Defining dispatch from useDispatch
  const dispatch = useDispatch();

  // Use Effect
  useEffect(() => {
    getProductDetail();
    if (activeTab == ProductDetailTab.LOCATION) {
      getStoreId();
    }
    getSelectedProductDetail(selectedProductid);
    if (activeTab == ProductDetailTab.VENDOR) {
      getVendorDetails();
    }
    const checkedList = Cookies.get(Cookie.LOCATION_PRODUCT_LIST_COLUMNS);
    const checkedLists = checkedList ? JSON.parse(checkedList) : checkedList;
    if (checkedLists) {
      setArrayList(checkedLists);
      setArray(checkedLists);
    }
  }, []);

  useEffect(() => {
    getSelectedProductDetail(selectedProductid);
  }, [selectedProductid]);

  let id = props.match.params.tab;

  //Get Product Detail
  const getProductDetail = async () => {
    let id = props.match.params.tab;
    const status = [];
    const initialValues = {};
    const selectedWeight = [];
    const selectedOutOfStock = [];
    const selectedTags = [];
    const productBrand = [];
    const productCategory = [];

    try {
      const response = await apiClient.get(`${endpoints().productAPI}/${id}`);
      const data = response.data;

      // Product tag Initail value
      if (data.tag) {
        data.tag.forEach((result) => {
          selectedTags.push({
            id: result.id,
            value: result.name,
            label: result.name,
          });
        });
        initialValues["tags"] = selectedTags;
      }

      setProductData(data);
      setSelectedStore(data.selectedStoreId);
      setInitialValues(initialValues);
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

  const LocationSortByOption = [
    {
      value: "name:ASC",
      label: "Location",
    },
    {
      value: "quantity:ASC",
      label: "Quantity",
    },

    {
      value: "last_order_date:ASC",
      label: "Order Date",
    },
    {
      value: "last_stock_entry_date:ASC",
      label: "Stock Entry Date",
    },
  ];

  const getStatusList = async (currentStatusId, allowed_statuses) => {
    if (currentStatusId) {
      const data = await StatusService.nextStatusSearch(
        ObjectName.PRODUCT_PRICE,
        currentStatusId,
        "",
        "",
        allowed_statuses
      );

      if (data && data.length > 0) {
        setStatusList(data);
      }
    }
  }

  const getSelectedProductDetail = async (selectedProductid) => {
    try {
      if (selectedProductid !== "") {
        const response = await apiClient.get(
          `${endpoints().productAPI}/${selectedProductid}`
        );
        const data = response.data;

        setSelectedProductData(data);
      }
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


  // Toggling the tabs and modals in respective tab
  const toggle = async (tab) => {
    if (tab == ProductDetailTab.LOCATION) {
      await getStoreId();
    }
    setIsOpen(!isOpen);
    setActiveTab(tab || role);
    setIsSubmit(true);
  };

  const editToggle = () => {
    setIsOpen(!isOpen);
  };

  const mergeModelToggle = () => {
    setIsOpen(!isOpen);
  };

  // Product Status Options
  const productStatusOptions = [
    {
      value: "Draft",
      label: "Draft",
    },
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "InActive",
      label: "InActive",
    },
  ];

  const FieldLabel = [
    {
      value: LocationProduct.TRANSFER_QUANTITY,
      label: LocationProduct.TRANSFER_QUANTITY,
    },
    {
      value: LocationProduct.SYSTEM_QUANTITY,
      label: LocationProduct.SYSTEM_QUANTITY,
    },
    {
      value: LocationProduct.RETURN_QUANTITY,
      label: LocationProduct.RETURN_QUANTITY,
    },
    {
      value: LocationProduct.ORDER_QUANTITY,
      label: LocationProduct.ORDER_QUANTITY,
    },
    {
      value: LocationProduct.MIN_QUANTITY,
      label: LocationProduct.MIN_QUANTITY,
    },
    {
      value: LocationProduct.MAX_QUANTITY,
      label: LocationProduct.MAX_QUANTITY,
    },
    {
      value: LocationProduct.MIN_ORDER_QUANTITY,
      label: LocationProduct.MIN_ORDER_QUANTITY,
    },
    {
      value: LocationProduct.MAX_ORDER_QUANTITY,
      label: LocationProduct.MAX_ORDER_QUANTITY,
    },
    {
      value: LocationProduct.REQUIRED_QUANTITY,
      label: LocationProduct.REQUIRED_QUANTITY,
    },
  ];

  // Supplier sort by Option
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  //Store Name and MostRecent
  const sortByOptions = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "order_date:ASC",
      label: "Date",
    },
  ];

  // Supplier status options
  const statusOptions = [
    {
      value: tabConstant.SUPPLIER_STATUS_ACTIVE,
      label: tabConstant.SUPPLIER_STATUS_ACTIVE,
    },
    {
      value: tabConstant.SUPPLIER_STATUS_INACTIVE,
      label: tabConstant.SUPPLIER_STATUS_INACTIVE,
    },
    {
      value: "",
      label: tabConstant.SUPPLIER_STATUS_ALL,
    },
  ];

  // order filters
  const handleParamsChange = async (updatedParams) => {
    const params = {
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      productId: productId,
      tab: Url.GetParam("tab"),
      ...updatedParams,
    };
    setStartDate(params.startDate);
    setEndDate(params.endDate);
    Url.UpdateUrl(params, props);
    dispatch(
      fetchList(
        "orderProduct",
        `${endpoints().orderProductAPI}/search`,
        1,
        25,
        params
      )
    );
  };

  const handleStartDate = async (startDate) => {
    const value = startDate ? DateTime.toISOStringDate(startDate) : "";
    handleParamsChange({ startDate: value });
  };

  const handleEndDate = async (endDate) => {
    const value = endDate ? DateTime.toISOStringDate(endDate) : "";
    handleParamsChange({ endDate: value });
  };

  const onStatusChange = async (value) => {
    const data = new FormData();

    data.append("status", value);

    dispatch(
      await productService.updateStatus(id, data))
  };

  // Handle Weight Unit Change
  const handleWeightUnitChange = (selectWeight) => {
    if (selectWeight && selectWeight.value) {
      setSelectedWeight(selectWeight.value);
    }
  };

  // Handle Sell Out Of Stock Change
  const handleOutOfStockChange = (selectOutOfStock) => {
    if (selectOutOfStock && selectOutOfStock.value) {
      setSelectedOutOfStock(selectOutOfStock.value);
    }
  };

  /**
   * Delete Product
   *
   * @param data
   */
  const productDelete = (id) => {
    dispatch(deleteProduct(id, {}, history));
  };

  // Handling on changing the detail tab
  const _handleStatusChange = (tabStatus) => {
    props.history.push(`/product/${productData.id}?tab=${tabStatus}`);
  };

  // Getting the Store Type options
  const getStoreTypeOptions = () => {
    // To list the stores in select dropdown.
    let storeListOptions = [];

    if (!storesList) return storeListOptions;

    storesList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        storeListOptions.push({ value: type.id, label: type.name });
      });
    return storeListOptions;
  };

  // Handle location change
  const handleStoreChange = (e) => {
    let array = [];
    const a = e.location;
    a.forEach((location) => {
      array.push(location.value);
    });
    setLocation(array);
  };

  // Add location modal toggling
  const addStoreToggle = () => {
    setAddStoreModal(false);
    setLocation("");
  };

  // Add location modal toggling
  const addVendorToggle = () => {
    setOpenVendorModal(false);
  };

  const addPriceToggle = () => {
    setOpenModal(false);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  // Add clone modal toggling
  const addCloneToggle = () => {
    setAddCloneModal(false);
  };

  // Add clone modal toggling
  const mergeToggle = () => {
    setMergeModal(false);
    setProductName("");
    setProductId("");
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
    let productValue = values && values?.values?.storeProduct?.label.props;
    setSelectedProductData(productValue);
  };

  // Handle location Add
  const handleStoreAdd = async () => {
    const data = new FormData();
    data.append("productId", productData.id);
    data.append("storeIds", locationName && locationName ? locationName : "");
    dispatch(
      addStore(
        data,
        {
          productId: productId,
          pagination: true,
          excludeIds: storeIds,
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
          status: Store.STATUS_ACTIVE,
        },
        addStoreToggle,
        getProductDetail
      )
    );
    setIsLoading(true);
    getStoreTypeOptions();
    setLocation("");
    getStoreId();
    setIsLoading(false);
  };

  const addVendor = (values) => {
    const data = new FormData();
    data.append("name", productData.name);
    data.append("url", values.vendor_url);
    data.append("vendor_id", values.vendor_name.id);
    data.append("product_id", id);
    dispatch(
      VendorProductService.create(
        data,
        { product_id: id, pagination: true },
        addVendorToggle
      )
    );
  };

  const EditStore = async (values) => {
    const data = new FormData();
    data.append("quantity", values && values.quantity && values.quantity.value);
    data.append("min_quantity", values && values.min_quantity && values.min_quantity.value);
    data.append("max_quantity", values && values.max_quantity && values.max_quantity.value);
    data.append("product_id", storeData?.productId);
    data.append("store_id", storeData?.store_id);
    dispatch(
      await StoreProductService.update(
        storeData?.store_product_id,
        data,
        params,
        closeModel,
        true
      )
    );
    setEditable(true);
  };

  // Handle location update
  const handleStoreUpdate = () => {
    const location = locationName;
    const data = new FormData();
    let id = props.match.params.tab;
    const storeModal = () => setAddStoreModal(false);
    data.append("location", location && location ? location : "");
    dispatch(updateStore(id, data, {}, storeModal));
    setLocation("");
  };

  // Store Delete
  const storeDelete = (id) => {
    let productId = props.match.params.tab;
    dispatch(
      StoreProductService.deleteReplenishStoreProduct(
        id,
        params,
        "storeProductReplenish"
      )
    );
    setIsLoading(true);
    getStoreId();
    setIsLoading(false);
    setEditable(true);
  };

  const handleTaxUpdate = (id, values) => {
    let bodyData = new Object();
    if (values.cess_percentage !== undefined) {
      bodyData.cess_percentage = values && values.cess_percentage;
    }

    if (values.cgst_percentage !== undefined) {
      bodyData.cgst_percentage = values && values.cgst_percentage;
    }

    if (values.sgst_percentage !== undefined) {
      bodyData.sgst_percentage = values && values.sgst_percentage;
    }

    if (values.igst_percentage !== undefined) {
      bodyData.igst_percentage = values && values.igst_percentage;
    }
    dispatch(updateProduct(id, bodyData, {}, getProductDetail));
    setEditable(true);
  };

  //Handle Update Product Details
  const handleGeneralUpdate = (id, values) => {
    let bodyData = new Object();

    if (values.name !== undefined) {
      bodyData.name = values && values.name && values.name.trim();
    }

    if (values.slug !== undefined) {
      bodyData.slug = values && values.slug;
    }

    if (values && values.brand_id !== undefined) {
      bodyData.brand_id = values && values.brand_id && values.brand_id.id;
    }

    if (values && values.brand_id && values.brand_id.__isNew__ == true) {
      bodyData.brand = values && values.brand_id && values.brand_id.value;
    }

    if (values && values.category_id !== undefined) {
      bodyData.category_id =
        values && values.category_id && values.category_id.id;
    }

    if (values && values.category_id && values.category_id.__isNew__ == true) {
      bodyData.category =
        values && values.category_id && values.category_id.value;
    }

    if (values.Unit !== undefined) {
      bodyData.Unit = values && values.Unit && values.Unit.value;
    }

    if (values.Size !== undefined) {
      bodyData.Size = values && values.Size;
    }
    if (values.discount_percentage !== undefined) {
      bodyData.discount_percentage = values && values.discount_percentage;
    }
    if (values.margin_percentage !== undefined) {
      bodyData.margin_percentage = values && values.margin_percentage;
    }

    if (values.print_name !== undefined) {
      bodyData.print_name = values && values.print_name;
    }

    if (values.description !== undefined) {
      bodyData.description = values && values.description;
    }

    if (values.vendor_url !== undefined) {
      bodyData.bigbasketUrl = values && values.vendor_url;
    }

    if (values && values.tags !== undefined) {
      bodyData.tags = values && values.tags && JSON.stringify(values.tags);
    }
    if (values?.manufacture !== undefined) {
      bodyData.manufacture_id =
        values && values?.manufacture?.value ? values?.manufacture?.value : "";
    }
    if (values?.manufacture !== undefined) {
      bodyData.manufacture_name =
        values && values?.manufacture?.label ? values?.manufacture?.label : "";
    }

    bodyData.sales_coin = values && values?.sales_coin ? values?.sales_coin?.value : ""

    dispatch(updateProduct(id, bodyData, {}, getProductDetail));
    setEditable(true);
  };

  const handlePriceUpdate = async (id, values) => {
    let bodyData = new Object();

    if (values.sale_price !== undefined) {
      bodyData.sale_price = values && values.sale_price && values.sale_price;
    }

    if (values.mrp !== undefined) {
      bodyData.mrp = values && values.mrp;
    }

    if (values.cost !== undefined) {
      bodyData.cost = values && values.cost;
    }

    dispatch(updateProduct(id, bodyData, {}, getProductDetail));
  };

  const handleInventorySubmit = async (id, values) => {
    let bodyData = new Object();
    if (Number.isNotNull(values.sku)) {
      bodyData.sku = values && values.sku;
    }
    if (Number.isNotNull(values.min_stock_days)) {
      bodyData.min_stock_days = values && values.min_stock_days;
    }
    if (Number.isNotNull(values.max_stock_days)) {
      bodyData.max_stock_days = values && values.max_stock_days;
    }

    if (String.isNotNull(values.barcode)) {
      bodyData.barcode = values && values.barcode;
    }

    if (Number.isNotNull(values.min_quantity)) {
      bodyData.min_quantity = values && values.min_quantity;
    }

    if (Number.isNotNull(values.max_quantity)) {
      bodyData.max_quantity = values && values.max_quantity;
    }

    if (Number.isNotNull(values.pack_size)) {
      bodyData.pack_size = values?.pack_size && values?.pack_size?.value;
    }

    if (Number.isNotNull(values.shelf_life)) {
      bodyData.shelf_life = values?.shelf_life && values?.shelf_life?.value;
    }


    if (String.isNotNull(values.hsn_code)) {
      bodyData.hsn_code = values.hsn_code && values.hsn_code;
    }

    if (Number.isNotNull(values.allow_sell_out_of_stock)) {
      bodyData.allow_sell_out_of_stock =
        values && values.allow_sell_out_of_stock;
    }

    if (Number.isNotNull(values.allow_transfer_out_of_stock)) {
      bodyData.allow_transfer_out_of_stock =
        values && values.allow_transfer_out_of_stock;
    }

    if (Number.isNotNull(values.track_quantity)) {
      bodyData.track_quantity = values && values.track_quantity;
    }

    dispatch(updateProduct(id, bodyData, {}, getProductDetail));
    setEditable(true);
  };

  const handleSEOUpdate = (id, values) => {
    let bodyData = new Object();

    if (values.seo_title != undefined) {
      bodyData.seo_title = values && values.seo_title ? values.seo_title : "";
    }
    if (values.seo_keyword != undefined) {
      bodyData.seo_keyword =
        values && values.seo_keyword ? values.seo_keyword : "";
    }

    if (values.seo_description != undefined) {
      bodyData.seo_description =
        values && values.seo_description ? values.seo_description : "";
    }

    dispatch(updateProduct(id, bodyData, {}, getProductDetail));
    setEditable(true);
  };

  const handleUpdateShopify = (id, values) => {
    let bodyData = new Object();

    if (values && values.shopify_quantity != undefined) {
      bodyData.shopify_quantity = values && values.shopify_quantity;
    }
    if (values && values.shopifyOutOfStock != undefined) {
      bodyData.shopifyOutOfStock = values && values.shopifyOutOfStock;
    }

    if (values && values.shopify_price != undefined) {
      bodyData.shopify_price = values && values.shopify_price;
    }

    dispatch(updateProduct(id, bodyData, {}, getProductDetail));
    setEditable(true);
  };

  // Bulk update handler
  const handleUpdateStore = (ids) => {
    setLocation(ids);
  };

  function getKeyByValue(object, value) {
    let isSelected = false;
    for (const key in object) {
      if (key == value) {
        isSelected = object[key] == true ? true : false;
      }
    }
    return isSelected;
  }

  const enable_system_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.SYSTEM_QUANTITY)
      ? true
      : false;
  const enable_return_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.RETURN_QUANTITY)
      ? true
      : false;
  const enable_transfer_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.TRANSFER_QUANTITY)
      ? true
      : false;

  const enable_order_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.ORDER_QUANTITY)
      ? true
      : false;
  const enable_min_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.MIN_QUANTITY)
      ? true
      : false;
  const enable_max_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.MAX_QUANTITY)
      ? true
      : false;

  const enable_min_order_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.MIN_ORDER_QUANTITY)
      ? true
      : false;
  const enable_max_order_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.MAX_ORDER_QUANTITY)
      ? true
      : false;
  const enable_required_quantity =
    arrays && getKeyByValue(arrays, LocationProduct.REQUIRED_QUANTITY)
      ? true
      : false;

  // Modal Body of Add Store
  const addStoreForm = (
    <Form initialValues={{}}>
      <StoreList
        id="activeStore"
        name={"location"}
        excludeIds={storeIds}
        onBulkSelect={handleUpdateStore}
      />
    </Form>
  );

  // Modal Footer of Add Store
  const storeFooter = (
    <Button
      type="button"
      label="Add Location"
      className="h6-5-important"
      onClick={() => {
        handleStoreAdd();
      }}
    />
  );

  const addClone = async (values) => {
    const data = new FormData();
    data.append("mrp", values.mrp);
    data.append("cost_price", values.cost_price);
    data.append("sale_price", values.sale_price);
    data.append("product_id", id);
    data.append("barcode", String.Get(values.barcode));
    dispatch(
      await productService.clone(id, data, (res) => {
        if (res.data) {
          Toast.success(res.data.message);
          addCloneToggle();
          props.history.push(`/products?&tab=Draft`);
        }
      })
    );
  };

  const handleMergeFunction = async (values) => {
    if (values) {
      setMergeModal(false);
      setconfirmMergeModal(true);
    }
  };

  const handleMerge = async () => {
    const data = new FormData();
    data.append("selectedProductId", selectedProduct);
    dispatch(
      await productService.merge(productData.id, data, (res) => {
        if (res) {
          setconfirmMergeModal(false);
          setMergeModal(false);
        }
      })
    );
  };

  const UpdateOrderQuantity = async () => {
    dispatch(
      await StoreProductService.updateOrderQuantity(id, (res) => {
        if (res) {
          dispatch(
            fetchList(
              'storeProductReplenish',
              `${endpoints().storeProductAPI}/replenish/search`,
              1,
              25,
              params
            )
          );
        }
      })
    );
  };

  const UpdateTransferQuantity = async () => {
    dispatch(
      await StoreProductService.updateTransferQuantity(id, (res) => {
        if (res) {
          dispatch(
            fetchList(
              'storeProductReplenish',
              `${endpoints().storeProductAPI}/replenish/search`,
              1,
              25,
              params
            )
          );
        }
      })
    );
  };

  const handleReIndex = async () => {
    dispatch(
      await StoreProductService.reIndex(id, (res) => {
        if (res) {
          dispatch(
            fetchList(
              'storeProductReplenish',
              `${endpoints().storeProductAPI}/replenish/search`,
              1,
              25,
              params
            )
          );
        }
      })
    );
  };

  const handleAddToStockEntry = async () => {
    let data = {
      locationIds: selectedIds
    }
    dispatch(
      await StoreProductService.addToStockEntry(id, data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              'storeProductReplenish',
              `${endpoints().storeProductAPI}/replenish/search`,
              1,
              25,
              params
            )
          );
        }
      })
    );
  }

  const addCloneForm = (
    <div>
      <Currency name="mrp" label="Mrp" required={true} />
      <Currency name="cost_price" label="Cost Price" />
      <Currency name="sale_price" label="Sale Price" required={true} />
      <Text name="barcode" label="Barcode" />
    </div>
  );

  const cloneFooter = (
    <Button type="submit" label="Add Clone" className="h6-5-important" />
  );

  const mergeConfirmationModel = (
    <div>
      <h4>From:</h4>
      <ProductCard
        productImageIcon
        square
        productName={productData?.name}
        url={productData?.url}
        brandName={productData?.brandName}
        size={productData?.size}
        unit={productData?.unit}
        salePrice={productData?.sale_price}
        mrp={productData?.mrp}
        packSize={productData?.pack_size}
        disableLink
      />
      <h4 className="mt-2">To:</h4>
      <ProductCard
        productImageIcon
        square
        productName={selectedProductData?.name}
        url={selectedProductData?.url}
        brandName={selectedProductData?.brandName}
        size={selectedProductData?.size}
        unit={selectedProductData?.unit}
        salePrice={selectedProductData?.sale_price}
        mrp={selectedProductData?.mrp}
        packSize={selectedProductData?.pack_size}
        disableLink
      />
    </div>
  );

  const mergeCOnfirmationModelFooter = (
    <>
      <SaveButton type="submit" label="Yes" className="h6-5-important" />
      <CancelButton
        onClick={() => {
          setconfirmMergeModal(false);
        }}
      />
    </>
  );

  const getVendorDetails = async () => {
    const { data } = await AccountService.searchVendor();
    let vendorList = [];
    data.forEach((values) => {
      vendorList.push({
        id: values.id,
        label: values.vendorName,
        value: values.vendorName,
      });
    });
    setVendorList(vendorList);
  };

  const addVendorForm = (
    <div>
      <Select name="vendor_name" label="Vendor" options={vendorList} />
      <Text name="vendor_url" label="Vendor Product Url" />
    </div>
  );

  const vendorFooter = (
    <Button type="submit" label="Add Vendor" className="h6-5-important" />
  );

  const editModelBody = (
    <>
      <Quantity name="quantity" label="Quantity" />
      <Quantity name="min_quantity" label="Min Quantity" />
      <Quantity name="max_quantity" label="Max Quantity" />
    </>
  );

  const editModelFooter = (
    <Button type="submit" label="Update" className="h6-5-important" />
  );

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Products",
      link: "/products",
    },
    {
      label: activeTab,
      link: "",
    },
  ];

  // Actions menu list
  const actionsMenuList = [];

  if (activeTab === ProductDetailTab.LOCATION) {
    actionsMenuList.push(
      { label: LocationProduct.ADD_TO_STOCK_ENTRY, value: LocationProduct.ADD_TO_STOCK_ENTRY },
      { label: LocationProduct.LOCATION_PRODUCT_REINDEX, value: LocationProduct.LOCATION_PRODUCT_REINDEX },
      { label: LocationProduct.UPDATE_MIN_MAX_ORDER_QUANTITY, value: LocationProduct.UPDATE_MIN_MAX_ORDER_QUANTITY }

    );
  }

  if (activeTab === ProductDetailTab.GENERAL) {
    actionsMenuList.push(
      { label: "Clone", value: "Clone" },
      { label: "Merge To", value: "Merge To" },

      { label: "Print Price Tag", value: "Print Price Tag" },
      { label: "Reindex", value: "Reindex" },

      { label: "Delete", value: "Delete" }

    );
  }

  if (activeTab === ProductDetailTab.PRICE) {
    actionsMenuList.push(
      { label: "Reindex", value: "Reindex" },
    );
  }

  const handleChange = async (e) => {
    if (e == "Delete") {
      setDeleteModal(true);
    }

    if (e == "Clone") {
      setAddCloneModal(true);
    }
    if (e == LocationProduct.UPDATE_MIN_MAX_ORDER_QUANTITY) {
      StoreProductService.updateMinMaxQuantity(
        props.match.params.tab,
        () => { }
      );
    }
    if (e == "Print Price Tag") {
      document.getElementById("print-price-tag").click();
    }
    if (e == "Merge To") {
      setMergeModal(true);
    }
    if (e === "Reindex") {
      if (productId) {
        dispatch(
          ProductService.reIndex([productId])
        );

      }
    }

    if (e == LocationProduct.LOCATION_PRODUCT_REINDEX) {
      handleReIndex()
    }

    if (e == LocationProduct.ADD_TO_STOCK_ENTRY) {
      handleAddToStockEntry()
    }
  };

  const editInitialValue = {
    quantity: {
      label: storeData?.quantity == 0 ? storeData?.quantity : storeData?.quantity ? storeData?.quantity : "",
      value: storeData?.quantity == 0 ? storeData?.quantity : storeData?.quantity ? storeData?.quantity : "",
    },
    min_quantity: {
      label: storeData?.min_quantity == 0 ? storeData?.min_quantity : storeData?.min_quantity ? storeData?.min_quantity : "",
      value: storeData?.min_quantity == 0 ? storeData?.min_quantity : storeData?.min_quantity ? storeData?.min_quantity : "",
    },
    max_quantity: {
      label: storeData?.max_quantity == 0 ? storeData?.max_quantity : storeData?.max_quantity ? storeData?.max_quantity : "",
      value: storeData?.max_quantity == 0 ? storeData?.max_quantity : storeData?.max_quantity ? storeData?.max_quantity : "",
    },
  };

  const imagetoggle = (id) => {
    if (id) {
      setModalOpen(!modalOpen);
    } else {
      setModalOpen(!modalOpen);
      setCurrentData("");
      setImageStatus("");
      setSelectedFile("");
      setErrorMessage("");
      setSelectedFile("");
      setFile("");
    }
  };

  const getStoreId = async () => {
    // setIsLoading(true);
    const responce = await apiClient.get(
      `${endpoints().storeProductAPI}/replenish/search?productId=${productId}`
    );
    const data = responce?.data?.data;
    setIsLoading(false);
    let id = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        id.push(data[i].store_id);
      }
    }
    setStoreIds(id);
  };

  const getProductPriceValue = async () => {
    let params = {
      product_id: props?.match?.params?.tab,
    };
    let response = await ProductPriceService.search(params);
    let data = response && response?.data && response?.data?.data;
    if (data && data.length > 0) {
      data.map((data) => {
        if (data?.type == "Default") setPriviousBarCode(data?.barCode);
        return;
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleReplenish = async (selectedQuantity) => {
    if (selectedQuantity && selectedQuantity.quantity && selectedRow) {
      let bodyData = {
        toLocationId: selectedRow?.store_id,
        quantity: selectedQuantity.quantity.value,
        productId: selectedRow.productId,
      };

      await TransferService.replenish(bodyData, () => {
        toggleQuantitySelectModal();

        dispatch(
          fetchList(
            "storeProductReplenish",
            `${endpoints().storeProductAPI}/replenish/search`,
            1,
            25,
            params
          )
        );
      });
      setEditable(true);
    }
  };

  const generalTabChange = () => {
    toggle(ProductDetailTab.GENERAL);
    _handleStatusChange(ProductDetailTab.GENERAL);
  };

  const inventoryTabChange = () => {
    toggle(ProductDetailTab.INVENTORY);
    _handleStatusChange(ProductDetailTab.INVENTORY);
  };

  const priceTabChange = () => {
    toggle(ProductDetailTab.PRICE);
    _handleStatusChange(ProductDetailTab.PRICE);
  };

  const taxTabChange = () => {
    toggle(ProductDetailTab.TAX);
    _handleStatusChange(ProductDetailTab.TAX);
  };

  const mediaTabChange = () => {
    toggle(ProductDetailTab.MEDIA);
    _handleStatusChange(ProductDetailTab.MEDIA);
  };

  const seoTabChange = () => {
    toggle(ProductDetailTab.SEO);
    _handleStatusChange(ProductDetailTab.SEO);
  };

  const locationTabChange = () => {
    toggle(ProductDetailTab.LOCATION);
    _handleStatusChange(ProductDetailTab.LOCATION);
  };

  const shopifyTabChange = () => {
    toggle(ProductDetailTab.SHOPIFY);
    _handleStatusChange(ProductDetailTab.SHOPIFY);
  };

  const purchaseTabChange = () => {
    toggle(ProductDetailTab.PURCHASE);
    _handleStatusChange(ProductDetailTab.PURCHASE);
  };

  const orderTabChange = () => {
    toggle(ProductDetailTab.ORDERS);
    _handleStatusChange(ProductDetailTab.ORDERS);
  };

  const vendorTabChange = () => {
    toggle(ProductDetailTab.VENDOR);
    _handleStatusChange(ProductDetailTab.VENDOR);
  };

  const historyTabChange = () => {
    toggle(ProductDetailTab.HISTORY);
    _handleStatusChange(ProductDetailTab.HISTORY);
  };

  const stockEntryTabChange = () => {
    toggle(ProductDetailTab.STOCK_ENTRY_PRODUCT);
    _handleStatusChange(ProductDetailTab.STOCK_ENTRY_PRODUCT);
  };

  const transferTabChange = () => {
    toggle(ProductDetailTab.TRANSFER);
    _handleStatusChange(ProductDetailTab.TRANSFER);
  };

  const toggleQuantitySelectModal = () => {
    setOpenQuantityModal(false);
    setSelectedRow("");
  };

  const NavTabList = [
    {
      label: ProductDetailTab.GENERAL,
      onClick: generalTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.GENERAL }),
    },
    {
      label: ProductDetailTab.INVENTORY,
      onClick: inventoryTabChange,
      className: classNames({
        active: activeTab === ProductDetailTab.INVENTORY,
      }),
    },
    {
      label: ProductDetailTab.PRICE,
      onClick: priceTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.PRICE }),
    },
    {
      label: ProductDetailTab.TAX,
      onClick: taxTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.TAX }),
    },
    {
      label: ProductDetailTab.MEDIA,
      onClick: mediaTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.MEDIA }),
    },
    {
      label: ProductDetailTab.SEO,
      onClick: seoTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.SEO }),
    },
    {
      label: ProductDetailTab.SHOPIFY,
      onClick: shopifyTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.SHOPIFY }),
    },
    {
      label: ProductDetailTab.LOCATION,
      onClick: locationTabChange,
      className: classNames({
        active: activeTab === ProductDetailTab.LOCATION,
      }),
    },
    {
      label: ProductDetailTab.PURCHASE,
      onClick: purchaseTabChange,
      className: classNames({
        active: activeTab === ProductDetailTab.PURCHASE,
      }),
    },
    {
      label: ProductDetailTab.ORDERS,
      onClick: orderTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.ORDERS }),
    },

    {
      label: ProductDetailTab.TRANSFER,
      onClick: transferTabChange,
      className: classNames({
        active: activeTab === ProductDetailTab.TRANSFER,
      }),
    },

    {
      label: ProductDetailTab.STOCK_ENTRY_PRODUCT,
      onClick: stockEntryTabChange,
      className: classNames({
        active: activeTab === ProductDetailTab.STOCK_ENTRY_PRODUCT,
      }),
    },
    {
      label: ProductDetailTab.VENDOR,
      onClick: vendorTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.VENDOR }),
    },

    {
      label: ProductDetailTab.HISTORY,
      onClick: historyTabChange,
      className: classNames({ active: activeTab === ProductDetailTab.HISTORY }),
    },
  ];

  const updateStatus = async (selectedRow, status) => {
    dispatch(
      await ProductPriceService.updateStatus(
        selectedRow.id,
        { status: status },
        {
          product_id: productId,
          sort: "id",
          sortDir: "DESC",
        }
      )
    );
  };

  const togglePriceModal = () => {
    setPriceEditModal(false);
    setIsSubmit(true);
    setSelectedDate(new Date());
    setSelectedPriceData("");
    setPriceDeletModal(false);
    getProductDetail();
    setPriviousBarCode(null);
    setRowEdit(false);
    setIsClone(false)
    setMrp("")
    setBarcode("")
    setCostPrice("")
    setIsDefault(false)
    setSalePrice("")
    setDiscount("")
  };

  const deleteProductPrice = async () => {
    if (selectedPriceData) {
      dispatch(
        await ProductPriceService.delete(
          selectedPriceData.id,
          {
            product_id: props?.match?.params?.tab,
            sort: "id",
            sortDir: "DESC",
          },
          togglePriceModal
        )
      );
    }
  };

  const updatePriceStatus = async (priceId, statusId, params) => {
    dispatch(await ProductPriceService.updateStatus(priceId, { status: statusId }, params));
  }

  const getProductDetails = (
    productName,
    productImage,
    brandName,
    size,
    unit,
    salePrice,
    mrp,
    brand_id,
    status,
    packSize,
  ) => {
    return (
      <ProductCard
        productImageIcon
        square
        productName={productName}
        url={productImage}
        brandName={brandName}
        size={size}
        unit={unit}
        salePrice={salePrice}
        mrp={mrp}
        status={status}
        packSize={packSize}
        brand_id={brand_id}
        disableLinks
      />
    );
  };

  const multiselect = (values) => {
    if (values.length == 1) {
      setSelectProduct(values);
    }
  };

  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.LOCATION_PRODUCT_LIST_COLUMNS, arrayList);
    setArray(array);
    setArrayList(array);
  };

  const calculateSalePrice = (mrp, discount) => {

    let mrpValue = mrp ? mrp : selectedPriceData.mrp
    let discountValue = discount ? discount : selectedPriceData.discount_percentage
    if (!isNaN(mrpValue) || !isNaN(discountValue)) {
      const salePrice = discountValue ? mrpValue - (mrpValue * discountValue / 100) : mrpValue;
      setSalePrice(salePrice)
    }
  }

  const handleSalePrice = (data) => {
    let value = data && data.values && data.values.salePrice || " "
    setSalePrice(value)
  }

  const handleMrpChange = (data) => {
    let value = data && data.values && data.values.mrp || " "
    setMrp(value)
    calculateSalePrice(value, discountValue);
  }

  const handleDiscountPercentChange = (data) => {
    let value = data && data.values && data.values.discount_percentage || " "
    setDiscount(value)
    calculateSalePrice(mrpValue, value);
  }

  const handleCostPrice = (data) => {
    let value = data && data.values && data.values.costPrice || ""
    setCostPrice(value);
  }

  const handleBarCode = (data) => {
    let value = data && data.target && data.target.value
    setBarcode(value)
  }

  const handleDate = (data) => {
    const dateValue = data ? DateTime.toISOStringDate(data) : "";
    setDate(dateValue)
  }

  const handleIsDefault = (data) => {
    let value = data && data.isDefault
    setIsDefault(value)
  }

  return (
    <>
      {/* Bread crumb section */}
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        {/* Page Title */}
        <PageTitle
          label={getProductDetails(
            productData?.name,
            productData?.url,
            productData?.brandName,
            productData?.size,
            productData?.unit,
            productData?.sale_price,
            productData?.mrp,
            productData?.brand_id,
            productData?.status,
            productData?.pack_size

          )}
        />

        <QuantityModal
          handleSubmit={handleReplenish}
          toggle={openQuantityModal}
          onModalClose={toggleQuantitySelectModal}
          modalTitle={"Add To Transfer"}
          confirmLabel={"Add"}
          quantity={selectedRow && selectedRow.replenishQuantity}
        />

        {/* Action Menu */}
        <div className="d-flex justify-content-between">
          {(activeTab === ProductDetailTab.GENERAL ||
            activeTab === ProductDetailTab.INVENTORY ||
            activeTab === ProductDetailTab.TAX ||
            activeTab === ProductDetailTab.SEO ||
            activeTab === ProductDetailTab.SHOPIFY) &&
            showEditButton &&
            editable && (
              <div>
                <Button
                  label="Edit"
                  loadingLabel="Editable"
                  className="my-1 mr-2 h-0"
                  disabled={editable == false ? true : false}
                  onClick={() => {
                    setEditable(false);
                  }}
                />
              </div>
            )}
          {activeTab == "Vendor" && (
            <AddButton
              // align="right"
              label="Add"
              onClick={(e) => {
                setOpenVendorModal(true);
              }}
            />
          )}
          {activeTab == ProductDetailTab.PRICE && (
            <AddButton
              label="Add Price"
              className="my-1 mr-2"
              onClick={() => {
                getProductPriceValue();
                setPriceEditModal(true);
              }}
              onFocus={() => getProductPriceValue()}
            />
          )}
          {activeTab == ProductDetailTab.MEDIA && (
            <AddButton
              className="py- ml-3 mr-1"
              label="Add"
              onClick={(e) => {
                imagetoggle();
              }}
            />
          )}
          {activeTab == ProductDetailTab.LOCATION && (
            <div className="d-flex  d-flex">
              {/* Add Button */}
              <div className="d-flex">
                <div className="mr-2">
                  <StoreBulkUpdateModal
                    isOpen={openBulkUpdateModal}
                    toggle={toggleBulkUpdateModal}
                    storeIds={selectedIds}
                    productId={productId}
                  />
                </div>
                <AddButton
                  label="Add"
                  className="my-1 mr-2"
                  onClick={(e) => {
                    setAddStoreModal(true);
                  }}
                />
              </div>
            </div>
          )}

          <div className="mr-2">
            <Action
              buttonLabel={productData.status}
              dropdownLinks={productStatusOptions}
              handleChange={onStatusChange}
            />
          </div>
          <div>
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleChange}
            />
          </div>
          {activeTab == ProductDetailTab.LOCATION &&
            <div className="pl-1">
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
          }
        </div>
      </div>

      {/* Product delete modal */}
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Product"
        id={productData.id}
        label={productData.name}
        deleteFunction={productDelete}
      />

      {/* Store Delete Modal */}
      {storeDeleteModal && (
        <DeleteModal
          isOpen={storeDeleteModal}
          toggle={() => {
            setStoreDeleteModal(false);
          }}
          title="Delete Location"
          id={storeData.store_product_id}
          label={storeData.locationName}
          deleteFunction={storeDelete}
        />
      )}

      {/* Store Add Modal */}
      {addStoreModal && (
        <AddModal
          isOpen={addStoreModal}
          toggle={toggle}
          toggleModalClose={addStoreToggle}
          modalTitle="Add"
          modalBody={addStoreForm}
          modalFooter={storeFooter}
          hideDefaultButtons
        />
      )}

      {openVendorModal && (
        <AddModal
          isOpen={openVendorModal}
          toggle={toggle}
          toggleModalClose={addVendorToggle}
          modalTitle="Add"
          modalBody={addVendorForm}
          modalFooter={vendorFooter}
          initialValues={{ vendor_name: "", vendor_url: "" }}
          onSubmit={addVendor}
          hideDefaultButtons
        />
      )}

      <AddModal
        isOpen={modelOpen}
        toggle={editToggle}
        toggleModalClose={closeModel}
        modalTitle="Edit Location"
        modalBody={editModelBody}
        modalFooter={editModelFooter}
        initialValues={editInitialValue}
        onSubmit={EditStore}
        hideDefaultButtons
        enableReinitialize
      />

      <AddModal
        isOpen={addCloneModal}
        toggle={toggle}
        toggleModalClose={addCloneToggle}
        modalTitle="Add"
        modalBody={addCloneForm}
        modalFooter={cloneFooter}
        initialValues={{ mrp: "", cost_price: "", sale_price: "" }}
        hideDefaultButtons
        onSubmit={addClone}
      />

      <ProductSelectModal
        modalOpen={mergeModal}
        toggle={mergeModelToggle}
        toggleModalClose={mergeToggle}
        handleSubmit={handleMergeFunction}
        BulkSelect={multiselect}
        history={history}
        footerLabel="Select Product"
        showBrandFilter
        showCategoryFilter
      />

      <AddModal
        isOpen={confirmMergeModal}
        toggle={setconfirmMergeModal}
        toggleModalClose={() => {
          setconfirmMergeModal(false);
        }}
        initialValues={{ storeProduct: "" }}
        modalTitle="Are You Sure Want To Merge"
        modalBody={mergeConfirmationModel}
        hideDefaultButtons
        modalFooter={mergeCOnfirmationModelFooter}
        onSubmit={handleMerge}
      />

      <PrintPriceTag productData={productData} />

      {/* Nav Section for product detail tabs navigation */}
      <NavTab list={NavTabList} />

      {/* Form Section */}
      <div className="mb-5 w-100">
        {/* Tab Content starts */}
        <TabContent activeTab={activeTab}>
          <Form
            enableReinitialize={true}
            initialValues={{
              vendor_url: productData.vendor_url,
              Size: productData.size,
              discount_percentage:
                productData && productData.discount_percentage,
              margin_percentage:
                productData && productData.margin_percentage,
              name: productData.name,
              slug: productData.slug,
              Unit:
                productData.unit == null
                  ? []
                  : {
                    label: productData.unit,
                    value: productData.unit,
                  },
              description: productData.description,
              notes: productData.notes,
              print_name: productData.print_name ? productData.print_name : "",

              category_id: productData.category_id
                ? [
                  {
                    value: productData.category_id,
                    label: productData.categoryName,
                    id: productData.category_id,
                  },
                ]
                : [],

              manufacture:
                productData.manufacture_id == null
                  ? []
                  : {
                    label: productData.manufacture_name,
                    value: productData.manufacture_id,
                  },

              brand_id: productData.brand_id
                ? [
                  {
                    value: productData.brand_id,
                    label: productData.brandName,
                    id: productData.brand_id,
                  },
                ]
                : [],
              // tags initialValues
              ...initialValues,
              sales_coin: productData?.sales_coin ? {
                label: productData?.sales_coin,
                value: productData?.sales_coin
              } : ""
            }}
            onSubmit={(values) => {
              let id = props.match.params.tab;
              handleGeneralUpdate(id, values);
            }}
          >

            {/* General Tab */}
            {activeTab == ProductDetailTab.GENERAL && (
              <TabPane tabId={ProductDetailTab.GENERAL}>
                <div className="card bg-white mt-3 col-lg-12">
                  <div className="card-body">
                    <div className=" field-wrapper row">
                      <div className="col-sm-6">
                        <Text name="name" label="Name" disabled={editable} />

                        <Text
                          name="print_name"
                          label="Print Name"
                          disabled={editable}
                        />

                        <Text name="slug" label="Slug" disabled={editable} />

                        <TextArea
                          className="w-100 mt-2 pull-left"
                          name="description"
                          label="Description"
                          disabled={editable}
                        />
                        <div className="row">
                          <div className="col-6">
                            <NumberComponent
                              name="Size"
                              label="Size"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-6">
                            <Select
                              name="Unit"
                              placeholder="Select Unit"
                              label="Unit"
                              options={Product.weightUnitOptions}
                              handleChange={(e) => handleWeightUnitChange(e)}
                              isDisabled={editable}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 mt-0">
                            <Percentage
                              name="discount_percentage"
                              label="Discount%"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-6 mt-0">
                            <Percentage
                              name="margin_percentage"
                              label="Margin%"
                              disabled={editable}
                            />
                          </div>
                        </div>
                        <div>
                          <NumberSelect name="sales_coin" label="Sales Coin" limit={100} isDisabled={editable} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <FeatureImage
                          src={productData?.url}
                          alt="Feature product image"
                          size={"large"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Organization section */}
                <div className="mt-3 card card-body">
                  <h4>Product Organization</h4>
                  <h6>Brand</h6>
                  <BrandSelect name="brand_id" isDisabled={editable} />
                  <div className="mt-3">
                    <h6>Category</h6>
                    <CategorySelect name="category_id" isDisabled={editable} />
                  </div>
                  <div class="d-flex bd-highlight">
                    <div class="w-100 bd-highlight mt-3">
                      <URL
                        label="Vendor Url"
                        name="vendor_url"
                        disabled={editable}
                      />
                    </div>
                    <div class="p-2 flex-shrink-1 bd-highlight mt-5">
                      <a
                        href={productData.vendor_url}
                        className="text-dark"
                        target="_blank"
                      >
                        <i class="fa fa-lg fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                  <div className="my-2 mb-3">
                    <ProductTagSelector
                      id="tags"
                      name="tags"
                      placeholder="Select Product Tag"
                      label="Tag"
                      selectedTagId={productData.tag_id}
                      disabled={editable}
                    />
                  </div>
                </div>

                {/* Save and Cancel Button Section */}
                {!editable && (
                  <div className="mt-3 card card-body">
                    <HorizontalSpace>
                      <SaveButton label="Save" />
                      <CancelButton
                        onClick={(e) => {
                          history.push("/products");
                        }}
                      />
                    </HorizontalSpace>
                  </div>
                )}
              </TabPane>
            )}
          </Form>

          {/* Inventory Tab */}
          {activeTab == ProductDetailTab.INVENTORY && (
            <TabPane tabId={ProductDetailTab.INVENTORY}>
              <>
                <Form
                  enableReinitialize={true}
                  initialValues={{
                    sku: productData.sku,
                    max_quantity: productData.max_quantity,
                    min_quantity: productData.min_quantity,
                    pack_size:
                      productData.pack_size == null
                        ? null
                        : {
                          label: productData.pack_size,
                          value: productData.pack_size,
                        },
                    shelf_life: productData?.shelf_life ? {
                      label: productData?.shelf_life,
                      value: productData?.shelf_life
                    } : "",
                    hsn_code: productData.hsn_code,
                    allow_sell_out_of_stock: Boolean.Get(
                      productData.allow_sell_out_of_stock
                    ),
                    allow_transfer_out_of_stock:
                      productData.allow_transfer_out_of_stock,
                    track_quantity: Boolean.Get(productData.track_quantity),
                    min_stock_days: productData.min_stock_days,
                    max_stock_days: productData.max_stock_days,
                  }}
                  onSubmit={(values) => {
                    let id = props.match.params.tab;
                    handleInventorySubmit(id, values);
                  }}
                >
                  {/* Inventory Section */}
                  <div className="mt-3 card card-body">
                    <div className="row">
                      {/* Fields */}
                      <div className="col-lg-6 col-sm-6">
                        <div className="row">
                          <div className="col-6">
                            <Text name="sku" label="SKU" disabled={editable} />
                          </div>
                          <div className="col-6">
                            <NumberComponent
                              label="HSN Code"
                              name="hsn_code"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-12">
                            <Quantity
                              name="pack_size"
                              placeholder="Select Pack Size"
                              label="Pack Size"
                              maxQuantity={100}
                              isDisabled={editable}
                            />
                          </div>
                          <div className="col-12">
                            <NumberSelect name="shelf_life" label="Shelf Life" isDisabled={editable} />

                          </div>
                          <div className="col-6">
                            <NumberComponent
                              name="min_quantity"
                              label="Min Quantity"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-6">
                            <NumberComponent
                              name="max_quantity"
                              label="Max Quantity"
                              disabled={editable}
                            />
                          </div>


                          <div className="col-6">
                            <Text
                              name="min_stock_days"
                              label="Min Stock Days"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-6">
                            <Text
                              name="max_stock_days"
                              label="Max Stock Days"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-12">
                            <SingleCheckbox
                              name="allow_sell_out_of_stock"
                              label="Continue selling when out of stock"
                              className="py-1"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-12">
                            <SingleCheckbox
                              name="allow_transfer_out_of_stock"
                              label="Allow transfer when out of stock"
                              className="py-1"
                              disabled={editable}
                            />
                          </div>
                          <div className="col-12">
                            <SingleCheckbox
                              name="track_quantity"
                              label="Track quantity"
                              className="py-1"
                              disabled={editable}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Barcode */}
                      <div className="col-lg-6 col-sm-6 d-flex align-items-center justify-content-center">
                        <Barcode
                          value={productData.barcode ? productData.barcode : ""}
                        />
                      </div>
                    </div>

                    {/* Save and Cancel Button Section */}
                    {!editable && (
                      <div className="mt-3">
                        <div>
                          <HorizontalSpace>
                            <SaveButton label="Save" />
                            <CancelButton
                              onClick={(e) => {
                                history.push("/products");
                              }}
                            />
                          </HorizontalSpace>
                        </div>
                      </div>
                    )}
                  </div>
                </Form>
              </>
            </TabPane>
          )}

          {/* price Tab */}
          {activeTab == ProductDetailTab.PRICE && (
            <TabPane tabId={ProductDetailTab.PRICE}>
              <>
                <ProductPriceEditModal
                  isOpen={priceEditModal}
                  toggle={togglePriceModal}
                  productId={props?.match?.params?.tab}
                  priceData={selectedPriceData}
                  selectedDate={selectedDate}
                  priviousBarCode={priviousBarCode}
                  setIsSubmit={setIsSubmit}
                  isSubmit={isSubmit}
                  showProductPriceEdit={showProductPriceEdit}
                  isClone={isClone}
                  handleMrpChange={handleMrpChange}
                  handleDiscountPercentChange={handleDiscountPercentChange}
                  salePriceValue={salePriceValue}
                  mrpValue={mrpValue}
                  discountValue={discountValue}
                  handleBarCode={handleBarCode}
                  handleCostPrice={handleCostPrice}
                  handleIsDefault={handleIsDefault}
                  defaultValue={defaultValue}
                  costPriceValue={costPriceValue}
                  barCodeValue={barCodeValue}
                  handleDate={handleDate}
                  dateValue={dateValue}
                  handleSalePrice={handleSalePrice}
                />

                <DeleteModal
                  isOpen={openPriceDeleteModal}
                  toggle={() => {
                    setPriceDeletModal(false);
                  }}
                  title="Delete Price"
                  id={productData.id}
                  label={selectedPriceData?.salePrice}
                  deleteFunction={deleteProductPrice}
                />

                <div className="mt-2">
                  <ReduxTable
                    id="productPrice"
                    newTableHeading
                    noRecordFoundHeight={"7vh"}
                    searchPlaceholder="Search"
                    params={{
                      product_id: props?.match?.params?.tab,
                      sort: "id",
                      sortDir: "DESC",
                      objectName: ObjectName.PRODUCT_PRICE
                    }}
                    apiURL={`${endpoints().productPrice}/search`}
                    paramsToUrl={true}
                    history={history}
                    showStatusFilter
                    sortByDropdown
                  >
                    <ReduxColumn
                      sortBy="date"
                      minWidth="200px"
                      className="text-center"
                      renderField={(row) => (
                        <span>
                          {DateTime.getDateByUserProfileTimeZoneFrontEndFormat(
                            row?.date
                          )}
                        </span>
                      )}
                    >
                      Date
                    </ReduxColumn>
                    <ReduxColumn
                      field="costPrice"
                      sortBy="cost_price"
                      className="text-center"
                      renderField={(row) => (
                        <span>{CurrencyFormat.Format(row?.costPrice)}</span>
                      )}
                    >
                      Cost Price
                    </ReduxColumn>

                    <ReduxColumn
                      field="mrp"
                      sortBy="mrp"
                      className="text-center"
                      renderField={(row) => (
                        <span>{CurrencyFormat.Format(row?.mrp)}</span>
                      )}
                    >
                      MRP
                    </ReduxColumn>
                    <ReduxColumn
                      field="salePrice"
                      sortBy="sale_price"
                      className="text-center"
                      renderField={(row) => (
                        <span>{CurrencyFormat.Format(row?.salePrice)}</span>
                      )}
                    >
                      Sale Price
                    </ReduxColumn>
                    <ReduxColumn
                      field="barCode"
                      sortBy="barcode"
                      className="text-center"
                    >
                      BarCode
                    </ReduxColumn>
                    <ReduxColumn
                      field="statusText"
                      sortBy="status"
                      renderField={(row) => (
                        <StatusText
                          backgroundColor={
                            row?.statusText == ProductPriceStatus?.ACTIVE_TEXT
                              ? "green"
                              : row?.statusText ==
                                ProductPriceStatus?.INACTIVE_TEXT
                                ? "red"
                                : ""
                          }
                          status={row?.statusText}
                        />
                      )}
                    >
                      Status
                    </ReduxColumn>
                    <ReduxColumn
                      field="type"
                      sortBy="is_default"
                      className="text-center"
                    >
                      Type
                    </ReduxColumn>

                    <ReduxColumn
                      className="text-center"
                      field="status"
                      isClickable="true"
                      renderField={(row) => (
                        <div className="action-group-dropdown">
                          <MoreDropdown
                            onClick={() => {
                              setStatusList([]);
                              getStatusList(row.status);
                            }}
                          >
                            <DropdownItem
                              onClick={() => {
                                setPriceEditModal(true);
                                setSelectedPriceData(row);
                              }}
                            >
                              Quick View
                            </DropdownItem>
                            {statusList &&
                              statusList.length > 0 &&
                              statusList.map((data) => {
                                return (
                                  <DropdownItem
                                    onClick={() => {
                                      updatePriceStatus(
                                        row.id,
                                        data.value,
                                        {
                                          search: Url.GetParam("search") || "",
                                          page: Url.GetParam("page") || props.currentPage,
                                          product_id: productId,
                                          pageSize:
                                            Url.GetParam("pageSize") ||
                                            props.currentPageSize,
                                        },
                                      )
                                    }}>
                                    {data.label}
                                  </DropdownItem>
                                );
                              })}
                            <DropdownItem
                              onClick={() => {
                                setPriceEditModal(true);
                                setSelectedPriceData(row);
                                setIsClone(true)
                              }}
                            >
                              Clone
                            </DropdownItem>
                            {showProductPriceDelete && (
                              <DropdownItem
                                className="text-danger"
                                onClick={() => {
                                  setPriceDeletModal(true);
                                  setSelectedPriceData(row);
                                }}
                              >
                                Delete
                              </DropdownItem>
                            )}
                          </MoreDropdown>
                        </div>
                      )}
                    >
                      Actions
                    </ReduxColumn>
                  </ReduxTable>
                </div>
              </>
            </TabPane>
          )}

          {/* Tax tab */}
          {activeTab == ProductDetailTab.TAX && (
            <TabPane tabId={ProductDetailTab.TAX}>
              <Form
                enableReinitialize={true}
                initialValues={{
                  cess_percentage: productData.tax_percentage,
                  cgst_percentage:
                    cgstPercentageValue == ""
                      ? ""
                      : cgstPercentageValue
                        ? cgstPercentageValue
                        : productData.cgst_percentage,
                  sgst_percentage:
                    sgstPercentageValue == ""
                      ? ""
                      : sgstPercentageValue
                        ? sgstPercentageValue
                        : productData.sgst_percentage,
                  igst_percentage:
                    igstPercentageValue == ""
                      ? ""
                      : igstPercentageValue
                        ? igstPercentageValue
                        : productData.igst_percentage,
                }}
                onSubmit={(values) => {
                  let id = props.match.params.tab;
                  handleTaxUpdate(id, values);
                }}
              >
                {/* Image List Table Component */}
                <div className="mt-3 card card-body">
                  <div className="row mt-0">
                    <div className="col-6">
                      <Percentage
                        name="cgst_percentage"
                        label="CGST%"
                        disabled={editable}
                      />
                    </div>
                    <div className="col-6">
                      <Percentage
                        name="sgst_percentage"
                        label="SGST%"
                        disabled={editable}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 mt-0">
                      <Percentage
                        name="cess_percentage"
                        label="CESS%"
                        disabled={editable}
                      />
                    </div>
                    <div className="col-6 mt-0">
                      <Percentage
                        name="igst_percentage"
                        label="IGST%"
                        disabled={editable}
                      />
                    </div>
                  </div>
                  {!editable && (
                    <div>
                      <HorizontalSpace>
                        <SaveButton label="Save" />
                        <CancelButton
                          onClick={(e) => {
                            history.push("/products");
                          }}
                        />
                      </HorizontalSpace>
                    </div>
                  )}
                </div>
              </Form>
            </TabPane>
          )}

          {/* Media Tab */}
          {activeTab == ProductDetailTab.MEDIA && (
            <TabPane tabId={ProductDetailTab.MEDIA}>
              {/* Image List Table Component */}
              <ImageList
                title="Product"
                objectName="PRODUCT"
                objectId={props.match.params.tab}
                showFeature={true}
                history={props.history}
                getDetails={getProductDetail}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                selectedFile={selectedFile}
                setSelectedFile={selectedFile}
                file={file}
                currentData={currentData}
                setCurrentData={setCurrentData}
                status={imagestatus}
                setImageStatus={setImageStatus}
                setFile={setFile}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                toggle={imagetoggle}
                userView
                hideAttachments
              />
            </TabPane>
          )}

          {/* SEO Tab */}
          {activeTab == ProductDetailTab.SEO && (
            <TabPane tabId={ProductDetailTab.SEO}>
              <Form
                enableReinitialize={true}
                initialValues={{
                  seo_title: productData.seo_title,
                  seo_keyword: productData.seo_keyword,
                  seo_description: productData.seo_description,
                }}
                onSubmit={(values) => {
                  let id = props.match.params.tab;
                  handleSEOUpdate(id, values);
                }}
              >
                <div className="card bg-white mt-3 col-lg-12">
                  <div className="card-body">
                    <div className=" field-wrapper row">
                      <div className="col-sm-6">
                        <Text
                          name="seo_title"
                          label="SEO Title"
                          disabled={editable}
                        />
                        <Text
                          name="seo_keyword"
                          label="SEO Keyword"
                          disabled={editable}
                        />
                        <TextArea
                          name="seo_description"
                          label="SEO Description"
                          disabled={editable}
                        />
                        {!editable && (
                          <HorizontalSpace top="5">
                            <SaveButton label="Save" />
                            <CancelButton
                              onClick={(e) => {
                                history.push("/products");
                              }}
                            />
                          </HorizontalSpace>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </TabPane>
          )}

          {/* Stores Tab */}
          {activeTab == ProductDetailTab.LOCATION && (
            <TabPane tabId={ProductDetailTab.LOCATION}>
              <div className="mt-2">
                <ReduxTable
                  id="storeProductReplenish"
                  name="storeProduct"
                  searchPlaceholder="Search"
                  newTableHeading
                  noRecordFoundHeight={"7vh"}
                  bulkSelect
                  sortByOptions={LocationSortByOption}
                  defaultSortOption={[
                    {
                      value: "name:ASC",
                      label: "Location",
                    },

                  ]}
                  onBulkSelect={handleBulkSelect}
                  params={{
                    productId: productId,
                    sort: "order_quantity",
                    sortDir: "DESC",
                    status: Store.STATUS_ACTIVE,
                    tab: Url.GetParam("tab"),
                  }}
                  apiURL={`${endpoints().storeProductAPI}/replenish/search`}
                  paramsToUrl={true}
                  history={history}
                  ActionMenu={ActionMenu}
                >
                  <ReduxColumn
                    field="locationName"
                    type="link"
                    isClickable="true"
                    sortBy="store_id"
                    renderField={(row) => (
                      <Link to={`/location/${row.store_id}`}>
                        {row.locationName}
                      </Link>
                    )}
                  >
                    Location
                  </ReduxColumn>
                  <ReduxColumn
                    field="quantity"
                    sortBy="quantity"
                    className="ellipsis text-center"
                    renderField={(row) => (
                      <div className="text-dark">
                        {row.quantity}
                        <small>
                          <div className="text-secondary">
                            {" "}
                            {row.last_stock_entry_date ? (
                              row.last_stock_entry_date
                            ) : (
                              <span className="text-danger">No Stock Info</span>
                            )}
                          </div>
                        </small>
                      </div>
                    )}
                  >
                    Quantity
                  </ReduxColumn>

                  {enable_system_quantity && enable_system_quantity == true && (
                    <ReduxColumn
                      disableOnClick
                      className="ellipsis text-center"
                      field="system_quantity"
                    >
                      System Quantity
                    </ReduxColumn>
                  )}
                  {enable_transfer_quantity && enable_transfer_quantity == true && (
                    <ReduxColumn
                      disableOnClick
                      className="ellipsis text-center"
                      field="transfer_quantity"
                    >
                      Transfer Quantity
                    </ReduxColumn>
                  )}
                  {enable_order_quantity && enable_order_quantity == true && (
                    <ReduxColumn
                      field="order_quantity"
                      sortBy="order_quantity"
                      className="ellipsis text-center"
                      renderField={(row) => (
                        <div className="text-dark">
                          {row.order_quantity}
                          <small>
                            <div className="text-secondary">
                              {" "}
                              {row.last_order_date ? (
                                row.last_order_date
                              ) : (
                                <span className="text-danger">No Order Info</span>
                              )}
                            </div>
                          </small>
                        </div>
                      )}
                    >
                      Order Quantity
                    </ReduxColumn>
                  )}
                  {enable_return_quantity && enable_return_quantity == true && (

                    <ReduxColumn
                      disableOnClick
                      className="ellipsis text-center"
                      field="return_quantity"
                    >
                      Return Quantity
                    </ReduxColumn>
                  )}
                  {enable_min_quantity && enable_min_quantity == true && (

                    <ReduxColumn
                      field="min_quantity"
                      sortBy="min_quantity"
                      className="text-center"
                    >
                      Min Quantity
                    </ReduxColumn>
                  )}
                  {enable_max_quantity && enable_max_quantity == true && (

                    <ReduxColumn
                      field="max_quantity"
                      sortBy="max_quantity"
                      className="text-center"
                    >
                      Max Quantity
                    </ReduxColumn>
                  )}
                  {enable_min_order_quantity && enable_min_order_quantity == true && (

                    <ReduxColumn
                      field="minOrderQuantity"
                      disableOnClick
                      className="text-center"
                    >
                      Min Order Quantity
                    </ReduxColumn>
                  )}
                  {enable_max_order_quantity && enable_max_order_quantity == true && (

                    <ReduxColumn
                      field="maxOrderQuantity"
                      disableOnClick
                      className="text-center"
                    >
                      Max Order Quantity
                    </ReduxColumn>
                  )}
                  {enable_required_quantity && enable_required_quantity == true && (

                    <ReduxColumn
                      disableOnClick
                      className="ellipsis text-center"
                      field="requiredQuantity"
                    >
                      Required Quantity
                    </ReduxColumn>
                  )}
                  <ReduxColumn
                    disableOnClick
                    minWidth="180px"
                    field="replenishedQuantity"
                    className="text-center"

                  >
                    Replenished Quantity
                  </ReduxColumn>
                  <ReduxColumn
                    disableOnClick
                    className="ellipsis text-center"
                    field="distributionQuantity"
                  >
                    Distribution Quantity
                  </ReduxColumn>
                  <ReduxColumn
                    className="ellipsis text-center"
                    disableOnClick
                    renderField={(row) => {
                      return (
                        <>
                          {row.replenishQuantity > 0 && (
                            <Button
                              label={`Replenish (${row.replenishQuantity})`}
                              onClick={() => {
                                setSelectedRow(row);
                                setOpenQuantityModal(true);
                              }}
                            />
                          )}
                        </>
                      );
                    }}
                  >
                    Replenish
                  </ReduxColumn>
                  <ReduxColumn
                    className="text-center"
                    field="status"
                    isClickable="true"
                    renderField={(row) => (
                      <div className="action-group-dropdown">
                        <MoreDropdown>
                          <DropdownItem
                            onClick={() => {
                              setSelectedRow(row);
                              setOpenQuantityModal(true);
                            }}
                          >
                            Force Replenish
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              setModelOpen(true);
                              setStoreData(row);
                            }}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            className="text-danger"
                            onClick={() => {
                              setStoreDeleteModal(true);
                              setStoreData(row);
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </MoreDropdown>
                      </div>
                    )}
                  >
                    Actions
                  </ReduxColumn>
                </ReduxTable>
              </div>
            </TabPane>
          )}

          {/* Shopify Tab */}
          {activeTab == ProductDetailTab.SHOPIFY && (
            <TabPane tabId={ProductDetailTab.SHOPIFY}>
              <Form
                enableReinitialize={true}
                initialValues={{
                  shopify_quantity: productData.shopify_quantity,
                  shopify_price: productData.shopify_price,
                  shopifyOutOfStock:
                    productData.shopify_out_of_stock == 1 ? true : false,
                }}
                onSubmit={(values) => {
                  let id = props.match.params.tab;
                  handleUpdateShopify(id, values);
                }}
              >
                <div className="card bg-white mt-3 col-lg-12">
                  <div className="card-body">
                    <div className="field-wrapper row">
                      <div className="col-sm-12">
                        <NumberComponent
                          name="shopify_quantity"
                          label="Shopify Quantity"
                          disabled={editable}
                        />
                        <SingleCheckbox
                          name="shopifyOutOfStock"
                          label="Continue selling when out of stock"
                          className="accepted-terms  mb-2 pb-0 mr-3"
                          disabled={editable}
                        />
                        <div className="mt-5 row col-sm-6">
                          <Currency
                            name="shopify_price"
                            label="Price"
                            disabled={editable}
                          />
                        </div>
                        {!editable && (
                          <HorizontalSpace top="5">
                            <SaveButton label="Save" />
                            <CancelButton
                              onClick={(e) => {
                                history.push("/products");
                              }}
                            />
                          </HorizontalSpace>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </TabPane>
          )}

          {/* Vendor Tab */}
          {activeTab == ProductDetailTab.VENDOR && (
            <TabPane tabId={ProductDetailTab.VENDOR}>
              <VendorList
                id="allvendors"
                tabName={ProductDetailTab.VENDOR}
                activeTab={activeTab}
                history={props.history}
                statusOptions={statusOptions}
                sortByOption={sortByOption}
                icon={<FontAwesomeIcon icon={faTruck} />}
                apiURL={`${endpoints().accountProductAPI}/search`}
                productId={id}
                vendorList={vendorList}
                toggle={toggle}
              />
            </TabPane>
          )}

          {/* Purchase Tab */}
          {activeTab == ProductDetailTab.PURCHASE && (
            <TabPane tabId={ProductDetailTab.PURCHASE} className="w-100">
              <PurchaseList product_id={productId} />
            </TabPane>
          )}
          {activeTab == ProductDetailTab.STOCK_ENTRY_PRODUCT && (
            <TabPane
              tabId={ProductDetailTab.STOCK_ENTRY_PRODUCT}
              className="w-100"
            >
              <StockEntryDetailPage product_id={productId} />
            </TabPane>
          )}

          {activeTab == ProductDetailTab.TRANSFER && (
            <TabPane tabId={ProductDetailTab.TRANSFER} className="w-100">
              <TransferProductList product_id={productId} />
            </TabPane>
          )}

          {/* History Tab */}
          {showHistory && activeTab == ProductDetailTab.HISTORY && (
            <TabPane tabId={ProductDetailTab.HISTORY} className="w-100">
              <ActivityList
                id={id}
                objectId={id}
                object_name={ObjectName.PRODUCT}
                history={history}
              />
            </TabPane>
          )}

          {/* Orders Tab */}
          {activeTab == ProductDetailTab.ORDERS && (
            <TabPane tabId={ProductDetailTab.ORDERS}>
              <div className="mt-2">
                <ReduxTable
                  id="orderProduct"
                  newTableHeading
                  noRecordFoundHeight={"7vh"}
                  searchPlaceholder="Search"
                  params={{
                    productId: productId,
                    isWeb: true,
                    startDate: Url.GetParam("startDate"),
                    endDate: Url.GetParam("endDate"),
                    tab: Url.GetParam("tab"),
                    sort: Url.GetParam("sort") ? Url.GetParam("sort") : "id",
                    sortDir: Url.GetParam("sortDir")
                      ? Url.GetParam("sortDir")
                      : "DESC",
                  }}
                  apiURL={`${endpoints().orderProductAPI}/search`}
                  paramsToUrl={true}
                  sortByOptions={sortByOptions}
                  history={history}
                  showDateFilter
                  showStoreFilter
                >
                  <ReduxColumn
                    sortBy="order_id"
                    className="text-center"
                    type="link"
                    renderField={(row) => (
                      <Link to={`/order/${row.order_id}`}>
                        {row?.order_number}
                      </Link>
                    )}
                  >
                    Order#
                  </ReduxColumn>
                  <ReduxColumn
                    field="orderDate"
                    sortBy="order_date"
                    className="text-center"
                    renderField={(row) => (
                      <span>
                        {row.orderDate &&
                          DateTime.getDateTimeByUserProfileTimezone(
                            row.orderDate
                          )}
                      </span>
                    )}
                  >
                    Date
                  </ReduxColumn>
                  <ReduxColumn field="locationName" sortBy="location">
                    Location
                  </ReduxColumn>
                  <ReduxColumn
                    field="quantity"
                    sortBy="quantity"
                    className="text-center"
                  >
                    Quantity
                  </ReduxColumn>
                </ReduxTable>
              </div>
            </TabPane>
          )}
        </TabContent>
      </div>
    </>
  );
};
export default ProductDetail;
