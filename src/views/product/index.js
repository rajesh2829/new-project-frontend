import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";

// Components
import CsvDownloader from "react-csv-downloader";
import Action from "../../components/Action";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import SelectDropdown from "../../components/SelectDropdown";
import Text from "../../components/Text";
import URL from "../../components/Url";
import BulkUpdateModal from "./components/bulkUpdateModal";
import ProductList from "./components/productList";

// Actions
import { addProduct, updateProductStatus } from "../../actions/storeProduct";
import { fetchList } from "../../actions/table";
import { createVendorProduct } from "../../actions/vendorProduct";

// Constant
import * as tabConstant from "../../helpers/Product";

// Helper
import Cookie from "../../helpers/Cookie";
import Cookies, { isLoggedIn } from "../../lib/Helper";

// Lib
import DateTime from "../../lib/DateTime";
import { setCookie } from "../../lib/Helper";
import Url from "../../lib/Url";

// CSS
import Select from "../../components/Select";
import PurchaseOrder from "../../helpers/PurchaseOrder";
import PurchaseOrderService from "../../services/PurchaseOrderService";
import "./product.scss";

import classNames from "classnames";
import NavTab from "../../components/NavTab";
import PurchaseOrderProductService from "../../services/PurchaseOrderProductService";
import PriceTab from "./components/PriceTab";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoreSelector from "../store/components/storeSelector";
import SaveButton from "../../components/SaveButton";
import StockEntryProductService from "../../services/StockProductEntryService";
import ProductService from "../../services/ProductService";

// Product Status Tab
export const Tab = {
  ACTIVE: "Active",
  INACTIVE: "InActive",
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ALL: "All",
  PRICE: "Price",
};

export const DEFAULT_PAGE = 1;

// Defining the product status as Published, Draft and All.
const publishedProducts = "publishedProducts";
const draftProducts = "draftProducts";
const allProducts = "allProducts";
const archivedProducts = "archivedProducts";

export const sortByOption = [
  {
    value: "product_name:ASC",
    label: "Name",
  },
  {
    value: "mrp:DESC",
    label: "Mrp",
  },
  {
    value: "id:DESC",
    label: "Most Recent",
  },
];

const Product = (props) => {
  // Product Props
  const {
    history,
    DraftProducts,
    PublishedProducts,
    ArchivedProducts,
    AllProducts,
    ActiveProductList,
    DraftProductsList,
    AllProductsList,
    ArchivedProductsList,
  } = props;

  // State values
  const [isOpen, setIsOpen] = useState(false);
  const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [activeTab, setActiveTab] = useState(Url.GetParam("tab") ? Url.GetParam("tab") : Tab.ACTIVE);
  const [brand, setBrand] = useState(Url.GetParam("brand"));
  const [category, setCategory] = useState(Url.GetParam("category"));
  const [isToggle, setIsToggle] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [location, setStore] = useState([]);
  const [tag, setTag] = useState(Url.GetParam("tag"));
  const [slug, setSlug] = useState("");
  const [selectedIds, setSeletedIds] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [arrays, setArray] = useState([]);
  const [arrayList, setArrayList] = useState([]);

  const [status, setStatus] = useState("");
  const [purchaseOrderList, setPurchaseOrderList] = useState([]);
  const [page, setPage] = useState(Url.GetParam("page"));
  const [stockModelOpen, setStockModelOpen] = useState(false);

  const [selectedCheckBox, setSelectedCheckBox] = useState(true);

  //Sort By Option Values
  const sortByOption = [
    {
      value: "product_name:ASC",
      label: "Name",
    },
    {
      value: "mrp:ASC",
      label: "MRP",
    },
    {
      value: "createdAt:DESC",
      label: "Most Recent",
    },
  ];

  const FieldLabel = [
    {
      value: tabConstant.FieldLabel.MRP,
      label: tabConstant.FieldLabel.MRP,
    },
    {
      value: tabConstant.FieldLabel.COST_PRICE,
      label: tabConstant.FieldLabel.COST_PRICE,
    },
    {
      value: tabConstant.FieldLabel.SALE_PRICE,
      label: tabConstant.FieldLabel.SALE_PRICE,
    },
    {
      value: tabConstant.FieldLabel.PROFIT,
      label: tabConstant.FieldLabel.PROFIT,
    },
    {
      value: tabConstant.FieldLabel.BRAND,
      label: tabConstant.FieldLabel.BRAND,
    },
    {
      value: tabConstant.FieldLabel.BAR_CODE,
      label: tabConstant.FieldLabel.BAR_CODE,
    },
    {
      value: tabConstant.FieldLabel.PROFIT_AMOUNT,
      label: tabConstant.FieldLabel.PROFIT_AMOUNT,
    },
    {
      value: tabConstant.FieldLabel.MAX_QUANTITY,
      label: tabConstant.FieldLabel.MAX_QUANTITY,
    },
    {
      value: tabConstant.FieldLabel.MIN_QUANTITY,
      label: tabConstant.FieldLabel.MIN_QUANTITY,
    },
    {
      value: tabConstant.FieldLabel.CATEGORY,
      label: tabConstant.FieldLabel.CATEGORY,
    },
    {
      value: tabConstant.FieldLabel.TAX,
      label: tabConstant.FieldLabel.TAX,
    },
    {
      value: tabConstant.FieldLabel.CGST,
      label: tabConstant.FieldLabel.CGST,
    },
    {
      value: tabConstant.FieldLabel.SGST,
      label: tabConstant.FieldLabel.SGST,
    },
    {
      value: tabConstant.FieldLabel.CGST_AMOUNT,
      label: tabConstant.FieldLabel.CGST_AMOUNT,
    },
    {
      value: tabConstant.FieldLabel.SGST_AMOUNT,
      label: tabConstant.FieldLabel.SGST_AMOUNT,
    },
    {
      value: tabConstant.FieldLabel.MANUFACTURE,
      label: tabConstant.FieldLabel.MANUFACTURE,
    },
    {
      value: tabConstant.FieldLabel.DISCOUNT,
      label: tabConstant.FieldLabel.DISCOUNT,
    },
    {
      value: tabConstant.FieldLabel.MARGIN,
      label: tabConstant.FieldLabel.MARGIN,
    },
    {
      value: tabConstant.FieldLabel.SKU,
      label: tabConstant.FieldLabel.SKU,
    },
    {
      value: tabConstant.FieldLabel.HSN_CODE,
      label: tabConstant.FieldLabel.HSN_CODE,
    },
    {
      value: tabConstant.FieldLabel.PACK_SIZE,
      label: tabConstant.FieldLabel.PACK_SIZE,
    },
    {
      value: tabConstant.FieldLabel.SHELF_LIFE,
      label: tabConstant.FieldLabel.SHELF_LIFE,
    },
    {
      value: tabConstant.FieldLabel.SALES_COIN,
      label: tabConstant.FieldLabel.SALES_COIN,
    },
  ];

  // Handle Column Sort
  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.PRODUCT, arrayList);
    setArray(array);
    setArrayList(array);
  };

  // Defining dispatch from useDispatch
  const dispatch = useDispatch();

  // Toggling the Add Modal
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Toggling the Add Modal
  const _toggle = () => {
    setIsToggle(!isToggle);
  };

  const Toggle = () => {
    setModelOpen(!modelOpen);
  };

  const toggleClose = () => {
    setModelOpen(false);
  };

  const stockToggle = () => {
    setStockModelOpen(!stockModelOpen);
  };

  const stockToggleClose = () => {
    setStockModelOpen(false);
  };

  // Toggling the Bulk Update Modal
  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!openBulkUpdateModal);
  };

  // Use Effect
  useEffect(() => {
    isLoggedIn();
    activeTab && getExportData(activeTab);
    const checkedList = Cookies.get(Cookie.PRODUCT);
    const checkedLists = checkedList ? JSON.parse(checkedList) : checkedList;
    if (checkedLists) {
      setArrayList(checkedLists);
      setArray(checkedLists);
    }
    getPurchaseOrderDetail();
  }, []);

  const params = {
    category: category,
    tag: tag,
    location: location,
    search: Url.GetParam("search") || "",
  };

  // Bulk update handler for Delete button
  const handleBulkUpdate = (ids) => {
    setSeletedIds(ids);
  };

  // Handle form submit
  const handleSubmit = async ({ url }) => {
    try {
      dispatch(createVendorProduct(url, params, _toggle));
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // get export data
  const getExportData = (activeTab) => {
    if (activeTab === Tab.ACTIVE) {
      setExportData(ActiveProductList);
    } else if (activeTab === tabConstant.Status.DRAFT) {
      setExportData(DraftProductsList);
    } else if (activeTab === tabConstant.Status.ARCHIVED_STATUS) {
      setExportData(ArchivedProductsList);
    } else if (activeTab === Tab.ALL) {
      setExportData(AllProductsList);
    }
  };


  /**
   * Add Product
   *
   * @param values
   */
  const productAdd = (values) => {
    const data = new FormData();
    data.append("name", values.name.trim());
    data.append("slug", slug);
    dispatch(addProduct(data, {}, toggle));
  };

  // Handle Change in Add product form
  const handleChange = (e) => {
    const name = e.target.value;
    const slug = name.split(" ").join("-").toLowerCase();
    setSlug(slug);
  };

  // Add Modal Body for product add
  const addProductForm = (
    <>
      <Text
        name="name"
        label="Product Name"
        placeholder="Product Name..."
        onChange={handleChange}
        error=""
        required={true}
      />
    </>
  );

  // Add Modal Body for product add
  const addProductUrlForm = (
    <>
      <URL
        name="url"
        label="Product Url"
        required
        placeholder="Enter Product Url"
      />
    </>
  );

  // Add Modal Footer for product add
  const productFooter = (
    <Button type="submit" label="" className="h6-5-important">
      Add
    </Button>
  );

  const getPurchaseOrderDetail = async () => {
    const data = await PurchaseOrderService.search();
    let list = [];
    data.forEach((value) => {
      if (value.status === PurchaseOrder.STATUS_DRAFT_TEXT)
        list.push({
          id: value.id,
          label: `(${value.purchase_order_number}) ${"   "} ${value.vendor_name}`,
          value: value.vendorId,
          name: value.vendor_name,
          purchase_order_number: value.purchase_order_number,
          status: value.status,
          vendorId: value.vendorId
        });
    });
    setPurchaseOrderList(list);
  };

  const modelBody = (
    <>
      <Select
        name="purchase_order"
        label="Purchase Order"
        options={purchaseOrderList}
      />
    </>
  );

  const modelFooter = (
    <Button type="submit" label="" className="h6-5-important">
      Add
    </Button>
  );

  const stockModelBody = (
    <>
      <StoreSelector
        name="location"
        label="Location"
      />
    </>
  );

  const stockModelFooter = (
    <SaveButton type="submit" label="" className="h6-5-important" />
  );

  const purchaseOrderSubmit = async (values) => {
    const data = new FormData();
    data.append("purchase_order_id", values && values.purchase_order.id);
    data.append("productIds", selectedIds ? selectedIds : "");
    data.append("vendorId", values && values.purchase_order.vendorId)
    dispatch(await PurchaseOrderProductService.create(data, Toggle));
  }

  const stockEntrySubmit = async (values) => {
    let storeIds = []
    let storeData = values && values.location

    if (storeData && storeData.length > 0) {
      for (let index = 0; index < storeData.length; index++) {
        storeIds.push(storeData[index].id)
      }
    }
    const data = new FormData();
    data.append("storeIds", storeIds);
    data.append("selectedIds", selectedIds ? selectedIds : "");
    dispatch(await StockEntryProductService.create(data, stockToggle));
  }

  const handleChanges = (e) => {
    if (e == "Add") {
      setIsOpen(true);
    }
    if (e == "Add Product from URL") {
      setIsToggle(true);
    }
  };

  const handleActionChange = (e) => {
    if (e == "Bulk Update") {
      setOpenBulkUpdateModal(true);
    }
    if (e == "Export") {
      document.getElementById("csvDownload").click();
    }
    if (e == "Add To Purchase Order") {
      setModelOpen(true);
    }
    if (e == "Add To Stock Entry") {
      setStockModelOpen(true);
    }
    if (e === "Reindex") {
      if (selectedIds && selectedIds.length > 0) {
        dispatch(
          ProductService.reIndex({selectedIds})
        );

      }
    }
  };

  const actionsMenuList = [
    {
      value: "Bulk Update",
      label: "Bulk Update",
    },
    {
      value: "Export",
      label: "Export",
    },
    {
      value: "Add To Purchase Order",
      label: "Add To Purchase Order",
    },
    {
      value: "Add To Stock Entry",
      label: "Add To Stock Entry",
    },
    {
      value: "Reindex",
      label: "Reindex",
    },
  ];

  const tabToggle = (tab) => {
    setActiveTab(tab || role);
    getExportData(tab || role);
  };

  const handleStatusChange = (tabStatus) => {
    props.history.push(`/products?&tab=${tabStatus}&search=${Url.GetParam("search")}
    &brand=${Url.GetParam("brand")}&category=${Url.GetParam("category")}&product=${Url.GetParam("product")}&tag=${Url.GetParam("tag")}&manufacture=${Url.GetParam("manufacture")}&show_duplicate=${Url.GetParam("show_duplicate")} 

    `);
    setStatus(tabStatus);
  }

  const _handleStatusChange = (e) => {
    if (e == Tab.ALL) {
      tabToggle(Tab.ALL);
      handleStatusChange(Tab.ALL);
    }

    if (e == Tab.DRAFT) {
      tabToggle(Tab.DRAFT);
      handleStatusChange(Tab.DRAFT);
    }

    if (e == Tab.ARCHIVED) {
      tabToggle(Tab.ARCHIVED);
      handleStatusChange(Tab.ARCHIVED);
    }

    if (e == Tab.ACTIVE) {
      tabToggle(Tab.ACTIVE);
      handleStatusChange(Tab.ACTIVE);
    }
    if (e == Tab.PRICE) {
      tabToggle(Tab.PRICE);
      handleStatusChange(Tab.PRICE);
    }
  };


  const activeTabChange = () => {
    tabToggle(Tab.ACTIVE);
    _handleStatusChange(Tab.ACTIVE);
    updateProductStatus(Tab.ACTIVE)
  };

  const draftTabChange = () => {
    tabToggle(Tab.DRAFT);
    _handleStatusChange(Tab.DRAFT);
  };

  const inActiveTabChange = () => {
    tabToggle(Tab.INACTIVE);
    _handleStatusChange(Tab.INACTIVE);
  }
  const allTabChange = () => {
    tabToggle(Tab.ALL);
    _handleStatusChange(Tab.ALL);
  }
  const priceTabChange = () => {
    tabToggle(Tab.PRICE);
    _handleStatusChange(Tab.PRICE);
  }

  const NavTabList = [
    { label: Tab.ACTIVE, onClick: activeTabChange, count: PublishedProducts, className: classNames({ active: activeTab === Tab.ACTIVE }) },
    { label: Tab.DRAFT, onClick: draftTabChange, count: DraftProducts, className: classNames({ active: activeTab === Tab.DRAFT }) },
    { label: Tab.INACTIVE, onClick: inActiveTabChange, count: ArchivedProducts, className: classNames({ active: activeTab === Tab.INACTIVE }) },
    { label: Tab.ALL, onClick: allTabChange, count: AllProducts, className: classNames({ active: activeTab === Tab.ALL }) },
    { label: Tab.PRICE, onClick: priceTabChange, count: "", className: classNames({ active: activeTab === Tab.PRICE }) }

  ];

  // remove the initial brand and catogery param empty values in url
  const param1 = (category || brand) && {
    category: category == 0 ? "" : category,
    brand: brand == 0 ? "" : brand,
  }

  let param = {
    location: location ? location : "",
    search: Url.GetParam("search"),
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
    page: page ? page : DEFAULT_PAGE,
    tab: Url.GetParam("tab"),
    tag: Url.GetParam("tag"),
    manufacture: Url.GetParam("manufacture"),
    show_duplicate: Url.GetParam("show_duplicate")
  }

  return (
    <>
      {/* Bulk Update Modal */}
      <BulkUpdateModal
        isOpen={openBulkUpdateModal}
        toggle={toggleBulkUpdateModal}
        productIds={selectedIds}
        setSelectedCheckBox={setSelectedCheckBox}
      />

      {/* Add Modal */}
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Product"
        modalBody={addProductForm}
        modalFooter={productFooter}
        initialValues={{
          name: "",
        }}
        onSubmit={(values) => {
          productAdd(values);
        }}
        hideDefaultButtons
      />
      {/* Add Modal */}
      <AddModal
        isOpen={isToggle}
        toggle={_toggle}
        toggleModalClose={_toggle}
        modalTitle="Add Product from URL"
        modalBody={addProductUrlForm}
        modalFooter={productFooter}
        initialValues={{
          name: "",
        }}
        onSubmit={handleSubmit}
        hideDefaultButtons
      />
      <AddModal
        isOpen={modelOpen}
        toggle={Toggle}
        toggleModalClose={toggleClose}
        modalTitle="Add To Purchase Order"
        modalBody={modelBody}
        modalFooter={modelFooter}
        initialValues={{
          purchase_order: "",
        }}
        onSubmit={purchaseOrderSubmit}
        hideDefaultButtons
      />
      <AddModal
        isOpen={stockModelOpen}
        toggle={stockToggle}
        toggleModalClose={stockToggleClose}
        modalTitle="Add To Stock Entry"
        modalBody={stockModelBody}
        modalFooter={stockModelFooter}
        initialValues={{
          location: "",
        }}
        onSubmit={stockEntrySubmit}
        hideDefaultButtons
        showOverFlow={false}
      />
      {/* Page Heading */}
      <div className="d-flex justify-content-between">
        {/* Page Title */}
        <PageTitle label="Products" />

        <div className="d-flex">
          <CsvDownloader
            id="csvDownload"
            className="d-none"
            filename={`products_${DateTime.currentDate()}.csv`}
            extension=".csv"
            datas={exportData}
            text={
              <span className="mx-2" href="#">
                <FontAwesomeIcon icon={faDownload} />
                <span className="ml-1">Export</span>
              </span>
            }
          />

          {/* Add Product and Add Product Url SelectDropDown Button */}
          <div className="pl-2">
            <SelectDropdown
              buttonLabel={"Add New"}
              hideCaret
              dropdownLinks={[
                {
                  value: "Add",
                  label: "Add",
                },
                {
                  value: "Add Product from URL",
                  label: "Add Product from URL",
                },
              ]}
              handleChange={(e) => handleChanges(e)}
            />
          </div>

          {/* Action Menu */}
          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>

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
        </div>
      </div>

      <div className="bg-white mt-3 card-body">
        <NavTab list={NavTabList} />

        {/* Tab Content tab */}
        <TabContent activeTab={activeTab}>
          {/* Comments Tab Start*/}
          <TabPane tabId={Tab.ALL} className="w-100">
            {activeTab == Tab.ALL && (
              <ProductList
                id={allProducts}
                arrays={arrays}
                selectedCheckBox={selectedCheckBox}
                handleBulkDelete={handleBulkUpdate}
                history={history}
                setPage={setPage}
                params={
                  {
                    ...param1,
                    ...param,

                  }

                }
                sortByOption={sortByOption}
                updateProductStatus={updateProductStatus}
                currentAllPage={props.currentAllPage}
                AllCurrentPageSize={props.AllCurrentPageSize}
                showStatus
                brand={brand}
                category={category}
              />
            )}
          </TabPane>
          <TabPane tabId={Tab.ACTIVE} className="w-100">
            {activeTab == Tab.ACTIVE && (
              <ProductList
                id={publishedProducts}
                arrays={arrays}
                handleBulkDelete={handleBulkUpdate}
                selectedCheckBox={selectedCheckBox}
                setPage={setPage}
                params={{
                  ...param1,
                  ...param,
                  status: tabConstant.Product.STATUS_ACTIVE,


                }}
                history={history}
                sortByOption={sortByOption}
                updateProductStatus={updateProductStatus}
                currentPublishedPage={props.currentPublishedPage}
                ActiveCurrentPage={props.ActiveCurrentPage}
                ActiveCurrentPageSize={props.ActiveCurrentPageSize}
                brand={brand}
                category={category}
              />
            )}
          </TabPane>
          <TabPane tabId={Tab.DRAFT} className="w-100">
            {activeTab == Tab.DRAFT && (
              <ProductList
                id={draftProducts}
                arrays={arrays}
                handleBulkDelete={handleBulkUpdate}
                selectedCheckBox={selectedCheckBox}
                setPage={setPage}
                params={
                  {
                    ...param1,
                    ...param,
                    status: tabConstant.Product.STATUS_DRAFT,
                  }
                }
                history={history}
                sortByOption={sortByOption}
                updateProductStatus={updateProductStatus}
                currentDraftPage={props.currentDraftPage}
                draftProducts={draftProducts}
              />
            )}
          </TabPane>
          <TabPane tabId={Tab.INACTIVE} className="w-100">
            {activeTab == Tab.INACTIVE && (
              <ProductList
                id={archivedProducts}
                arrays={arrays}
                handleBulkDelete={handleBulkUpdate}
                setPage={setPage}
                params={
                  {
                    ...param1,
                    ...param,
                    status: tabConstant.Product.STATUS_INACTIVE,
                  }
                }
                history={history}
                sortByOption={sortByOption}
                updateProductStatus={updateProductStatus}
                selectedCheckBox={selectedCheckBox}
                currentPublishedPage={props.currentPublishedPage}
                ActiveCurrentPage={props.ActiveCurrentPage}
                ActiveCurrentPageSize={props.ActiveCurrentPageSize}
                tabName={Tab.ARCHIVED}
                archivedProducts={archivedProducts}
              />
            )}
          </TabPane>
          <TabPane tabId={Tab.PRICE} className="w-100">
            {activeTab == Tab.PRICE && (
              <PriceTab history={history} />
            )}
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

// Map State to props
function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get Published products count
  const PublishedProducts =
    reduxTable[publishedProducts] &&
      reduxTable[publishedProducts].isFetching == false
      ? reduxTable[publishedProducts].totalCount
      : 0;
  // Get Draft Products count
  const DraftProducts =
    reduxTable[draftProducts] && reduxTable[draftProducts].isFetching == false
      ? reduxTable[draftProducts].totalCount
      : 0;

  // Get All Products count
  const AllProducts =
    reduxTable[allProducts] && reduxTable[allProducts].isFetching == false
      ? reduxTable[allProducts].totalCount
      : 0;

  // Get Archived Products count
  const ArchivedProducts =
    reduxTable[archivedProducts] &&
      reduxTable[archivedProducts].isFetching == false
      ? reduxTable[archivedProducts].totalCount
      : 0;

  // Get Published products list
  const ActiveProductList =
    reduxTable[publishedProducts] &&
      reduxTable[publishedProducts].isFetching == false &&
      reduxTable[publishedProducts].totalCount &&
      reduxTable[publishedProducts][1] !== undefined
      ? reduxTable[publishedProducts][1]
      : [];

  // Get Draft Products list
  const DraftProductsList =
    reduxTable[draftProducts] &&
      reduxTable[draftProducts].isFetching == false &&
      reduxTable[draftProducts].totalCount &&
      reduxTable[draftProducts][1] !== undefined
      ? reduxTable[draftProducts][1]
      : [];

  // Get All Products list
  const AllProductsList =
    reduxTable[allProducts] &&
      reduxTable[allProducts].isFetching == false &&
      reduxTable[allProducts].totalCount &&
      reduxTable[allProducts][1] !== undefined
      ? reduxTable[allProducts][1]
      : [];

  // Get Archived Products list
  const ArchivedProductsList =
    reduxTable[archivedProducts] &&
      reduxTable[archivedProducts].isFetching == false &&
      reduxTable[archivedProducts].totalCount &&
      reduxTable[archivedProducts][1] !== undefined
      ? reduxTable[archivedProducts][1]
      : [];

  // Getting the current page for published tab
  const currentPublishedPage =
    reduxTable[publishedProducts] &&
      reduxTable[publishedProducts].isFetching == false
      ? reduxTable[publishedProducts].currentPage
      : 1;

  // Getting the current page for draft tab
  const currentDraftPage =
    reduxTable[draftProducts] && reduxTable[draftProducts].isFetching == false
      ? reduxTable[draftProducts].currentPage
      : 1;

  // Getting the current page for archived tab
  const currentArchivedPage =
    reduxTable[archivedProducts] &&
      reduxTable[archivedProducts].isFetching == false
      ? reduxTable[archivedProducts].currentPage
      : 1;

  // Getting the current page for all tab
  const currentAllPage =
    reduxTable[allProducts] && reduxTable[allProducts].isFetching == false
      ? reduxTable[allProducts].currentPage
      : 1;
  const AllCurrentPageSize =
    reduxTable[allProducts] && !reduxTable[allProducts].isFetching
      ? reduxTable[allProducts].pageSize
      : 25;


  const ActiveCurrentPage =
    reduxTable[publishedProducts] && !reduxTable[publishedProducts].isFetching
      ? reduxTable[publishedProducts].currentPage
      : 1;

  const ActiveCurrentPageSize =
    reduxTable[publishedProducts] && !reduxTable[publishedProducts].isFetching
      ? reduxTable[publishedProducts].pageSize
      : 25;

  return {
    PublishedProducts,
    ActiveCurrentPage,
    ActiveCurrentPageSize,
    DraftProducts,
    AllProducts,
    ArchivedProducts,
    ActiveProductList,
    DraftProductsList,
    AllProductsList,
    ArchivedProductsList,
    currentPublishedPage,
    currentDraftPage,
    currentArchivedPage,
    currentAllPage,
    AllCurrentPageSize
  };
}

// Map Dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
// export default ;
export default connect(mapStateToProps, mapDispatchToProps)(Product);
