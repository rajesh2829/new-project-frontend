import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

//Action
import { fetchList } from "../../actions/table";

// Helper
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";

// Components
import VendorImportModal from "./components/Import";
import SupplierProductList from "./components/SupplierProductList";
import VendorBulkUpdateModal from "./components/BulkUpdate";
import PageTitle from "../../components/CustomPageTitle";
import ProductFilter from "../../components/filter/productFilter";
import { bindActionCreators } from "redux";
import { filterVendorProductList } from "../../actions/product";
import {
  bulkUpdateVendorProduct,
  exportToMaster,
  syncToVendorProduct,
} from "../../actions/vendorProduct";
import Tab from "../../components/Tab";
import { bulkUpdateSync, updateSync } from "../../actions/sync";
import ArrayList from "../../lib/ArrayList";

// Constants
import {
  PRODUCT_STATUS_EXCLUDED,
  PRODUCT_STATUS_EXPORTED,
  PRODUCT_STATUS_NEW,
  PRODUCT_STATUS_ALL,
  PRODUCT_ID_ALL,
  PRODUCT_ID_EXPORTED,
  PRODUCT_IN_NEW,
} from "../../lib/Products";
import {
  SYNC_STATUS_PENDING,
  SYNC_OBJECT_NAME_VENDOR_PRODUCT,
  SYNC_NAME_EXPORT_TO_MASTER,
  SYNC_STATUS_IN_PROGRESS,
  SYNC_NAME_SYNC_FROM_VENDOR_URL,
} from "../../lib/Sync";
import { PAGESIZE, SORT, SORT_DIR, PAGE } from "../../helpers/Status";
import VendorProductAddModal from "./components/SupplierProductAddModal";
import SelectDropdown from "../../components/SelectDropdown";

class VendorProducts extends React.Component {
  state = {
    selectedProductIds: [],
    vendorImportToggle: false,
    vendorProductAddToggle: false,
    vendorBulkImportToggle: false,
    vendorBulkUpdateToggle: false,
    syncingVendor: false,
    filters: "",
    selectedCategories: [],
    selectedBrands: [],
    status: "",
    page: 1,
    pageSize: 25,
    productStatus: [
      {
        value: PRODUCT_STATUS_NEW,
        label: PRODUCT_STATUS_NEW,
      },
      {
        value: PRODUCT_STATUS_EXPORTED,
        label: PRODUCT_STATUS_EXPORTED,
      },
      {
        value: PRODUCT_STATUS_EXCLUDED,
        label: PRODUCT_STATUS_EXCLUDED,
      },
    ],
  };

  productSortOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "price:ASC",
      label: "Price",
    },
    {
      value: "name:ASC",
      label: "Name",
    },
  ];

  componentDidMount() {
    isLoggedIn();
    const {
      brand_id,
      category_id,
      status,
      pageSize,
      sort,
      sortDir,
      search,
      page,
    } = this.getParams();

    this.setState({
      brand_id,
      category_id,
      status,
      pageSize,
      sort,
      sortDir,
      search,
      page,
    });

    const data = {
      brand_id,
      category_id,
      status,
      pageSize,
      sort,
      sortDir,
      search,
      page,
    };

    this.setUrl(data);
    this.props.actions.filterVendorProductList(
      {
        brand_id,
        category_id,
        status,
        search,
        pagination: true,
      },
      pageSize,
      page
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPageSize = this.props.pageSize;
    const prevPageSize = prevState.pageSize;
    const currentSort = this.props.sort;
    const prevSort = prevState.sort;
    const currentSortDir = this.props.sortDir;
    const prevSortDir = prevState.sortDir;
    const currentSearchTerm = this.props.search;
    const prevSearchTerm = prevState.search;
    const vendorPage = this.props.currentPage;
    const prevPage = prevState.page;
    if (prevPage && vendorPage && prevPage !== vendorPage) {
      this.setState(
        {
          page: this.props.currentPage,
        },
        () => {
          const data = {
            sort: this.state.sort,
            sortDir: this.state.sortDir,
            pageSize: this.state.pageSize,
            brand_id: this.state.brand_id,
            category_id: this.state.category_id,
            status: this.state.status,
            search: this.state.search,
            page: this.state.page,
          };
          this.setUrl(data);
        }
      );
    }
    if (prevPageSize && currentPageSize && prevPageSize !== currentPageSize) {
      this.setState(
        {
          pageSize: this.props.pageSize,
        },
        () => {
          const data = {
            sort: this.state.sort,
            sortDir: this.state.sortDir,
            pageSize: this.state.pageSize,
            brand_id: this.state.brand_id,
            category_id: this.state.category_id,
            status: this.state.status,
            search: this.state.search,
            page: this.state.page,
          };
          this.setUrl(data);
        }
      );
    }
    if (
      (prevSort && currentSort && prevSort !== currentSort) ||
      (prevSortDir && currentSortDir && prevSortDir !== currentSortDir)
    ) {
      this.setState(
        {
          sort: this.props.sort,
          sortDir: this.props.sortDir,
        },
        () => {
          const data = {
            sort: this.state.sort,
            sortDir: this.state.sortDir,
            pageSize: this.state.pageSize,
            brand_id: this.state.brand_id,
            category_id: this.state.category_id,
            status: this.state.status,
            search: this.state.search,
            page: this.state.page,
          };

          this.setUrl(data);
        }
      );
    }
    if (
      (prevSearchTerm || prevSearchTerm === "") &&
      (currentSearchTerm ||
        (prevSearchTerm !== "" && currentSearchTerm === "")) &&
      typeof currentSearchTerm !== "function" &&
      prevSearchTerm !== currentSearchTerm
    ) {
      this.setState(
        {
          search: this.props.search,
        },
        () => {
          const data = {
            sort: this.state.sort,
            sortDir: this.state.sortDir,
            pageSize: this.state.pageSize,
            brand_id: this.state.brand_id,
            category_id: this.state.category_id,
            status: this.state.status,
            search: this.state.search,
            page: this.state.page,
          };
          this.setUrl(data);
        }
      );
    }
  }

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  // get params
  getParams = () => {
    const brand_id = Url.GetParam("brand_id") || "";
    const category_id = Url.GetParam("category_id") || "";
    const status = Url.GetParam("status") || "";
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort
      ? selectedSort
      : this.props.sort
        ? this.props.sort
        : SORT;
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir
      ? selectedSortDir
      : this.props.sortDir
        ? this.props.sortDir
        : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = searchTerm
      ? searchTerm
      : this.props.search && typeof this.props.search !== "function"
        ? this.props.search
        : "";
    const selectedPage = Url.GetParam("page");
    const page = selectedPage
      ? selectedPage
      : this.props.currentPage
        ? this.props.currentPage
        : PAGE;

    const data = {
      brand_id,
      category_id,
      status,
      pageSize,
      sort,
      sortDir,
      search,
      page,
    };
    return data;
  };

  // Push Filters in Url
  setUrl = (data) => {
    const {
      brand_id,
      category_id,
      status,
      pageSize,
      sort,
      sortDir,
      search,
      page,
    } = data;

    var queryParams = new URLSearchParams(window.location.search);

    // Set new or modify existing parameter value.
    if (brand_id) {
      queryParams.set("brand_id", brand_id);
    } else {
      queryParams.delete("brand_id");
    }

    if (category_id) {
      queryParams.set("category_id", category_id);
    } else {
      queryParams.delete("category_id");
    }

    if (status) {
      queryParams.set("status", status);
    } else {
      queryParams.delete("status");
    }

    if (pageSize) {
      queryParams.set("pageSize", pageSize);
    } else {
      queryParams.delete("pageSize");
    }

    if (sort) {
      queryParams.set("sort", sort);
    } else {
      queryParams.delete("sort");
    }

    if (sortDir) {
      queryParams.set("sortDir", sortDir);
    } else {
      queryParams.delete("sortDir");
    }

    if (search) {
      queryParams.set("search", search);
    } else {
      queryParams.delete("search");
    }

    // page query string
    if (page) {
      queryParams.set("page", page);
    } else {
      queryParams.delete("page");
    }

    // Replace current querystring with the new one.
    this.props.history.push("?" + queryParams.toString());
  };

  // Bulk update handler
  handleBulkUpdate = (ids) => {
    this.setState({ selectedProductIds: ids });
  };

  // Export
  _handleExportToProduct = async (ids) => {
    const { exportToMaster, bulkUpdateSync, updateSync } = this.props.actions;
    try {
      await bulkUpdateSync({
        objectIds: ids,
        status: SYNC_STATUS_PENDING,
        name: SYNC_NAME_EXPORT_TO_MASTER,
        objectName: SYNC_OBJECT_NAME_VENDOR_PRODUCT,
      });
      toast.success("Exporting started successfully");

      const {
        brand_id,
        category_id,
        status,
        pageSize,
        sort,
        sortDir,
        search,
        page,
      } = this.getParams();

      let params = {};

      if (brand_id) {
        params.brand_id = brand_id;
      }

      if (category_id) {
        params.category_id = category_id;
      }

      if (status) {
        params.status = status;
      }

      if (sort) {
        params.sort = sort;
      }

      if (sortDir) {
        params.sortDir = sortDir;
      }

      if (search) {
        params.search = search;
      }

      if (page) {
        params.page = page;
      }

      // Sync each product by id
      ids.forEach(async (id) => {
        await updateSync(id, {
          status: SYNC_STATUS_IN_PROGRESS,
          objectName: SYNC_OBJECT_NAME_VENDOR_PRODUCT,
          name: SYNC_NAME_EXPORT_TO_MASTER,
        });
        await exportToMaster({ ids: [id] }, params, pageSize);
      });
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Handle vendor product sync
  _handleVendorSync = async (productIds) => {
    const { syncingVendor } = this.state;
    const { bulkUpdateSync, updateSync, syncToVendorProduct } =
      this.props.actions;

    try {
      this.setState({ syncingVendor: !syncingVendor });

      // Set sync status to Pending
      await bulkUpdateSync({
        objectIds: productIds,
        status: SYNC_STATUS_PENDING,
        name: SYNC_NAME_SYNC_FROM_VENDOR_URL,
        objectName: SYNC_OBJECT_NAME_VENDOR_PRODUCT,
      });
      toast.success("Sync started successfully");

      // Export each product by id
      for (let productId of productIds) {
        await updateSync(productId, {
          status: SYNC_STATUS_IN_PROGRESS,
          objectName: SYNC_OBJECT_NAME_VENDOR_PRODUCT,
          name: SYNC_NAME_SYNC_FROM_VENDOR_URL,
        });

        await syncToVendorProduct([productId]);
      }
      window.location.reload();
      this.setState({ syncingVendor: false });
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);

      this.setState({ syncingVendor: false });
    }
  };

  // Add product modal handler
  _handleVendorImportModal = () => {
    const { vendorImportToggle } = this.state;
    return this.setState({ vendorImportToggle: !vendorImportToggle });
  };

  // Add vednor product modal handler
  _handleVendorProductAddModal = () => {
    const { vendorProductAddToggle } = this.state;
    return this.setState({ vendorProductAddToggle: !vendorProductAddToggle });
  };

  // Vendor bulk update modal handler
  _handleVendorBulkUpdateModal = () => {
    const { vendorBulkUpdateToggle } = this.state;
    return this.setState({
      vendorBulkUpdateToggle: !vendorBulkUpdateToggle,
    });
  };

  // Brand Filter
  onChangeBrand(selectedBrands) {
    const brandValues = [];
    if (selectedBrands && ArrayList.isNotEmpty(selectedBrands)) {
      selectedBrands.forEach((brand) => {
        brandValues.push(parseInt(brand.value, 10));
      });
    }
    const { category_id, sort, sortDir, search, status } = this.state;
    const params = {
      brand_id: brandValues.join(","),
      category_id,
      sort,
      sortDir,
      search,
      status,
    };
    this.setState({ brand_id: brandValues.join(","), selectedBrands, page: 1 });
    const { pageSize } = this.state;
    this.props.actions.filterVendorProductList(params, pageSize);
    this.setUrl({ ...params, pageSize, page: 1 });
  }

  // Category filter section
  onChangeCatageory(selectedCategories) {
    const CategoryValues = [];
    if (selectedCategories && ArrayList.isNotEmpty(selectedCategories)) {
      selectedCategories.forEach((brand) => {
        CategoryValues.push(parseInt(brand.value, 10));
      });
    }
    const { brand_id, sort, sortDir, search, status } = this.state;
    const params = {
      category_id: CategoryValues.join(","),
      brand_id,
      sort,
      sortDir,
      search,
      status,
    };
    this.setState({
      category_id: CategoryValues.join(","),
      selectedCategories,
      page: 1,
    });
    const { pageSize } = this.state;
    this.props.actions.filterVendorProductList(params, pageSize);
    this.setUrl({ ...params, pageSize, page: 1 });
  }

  // Status Filter section
  onChangeStatus = (e) => {
    const { brand_id, category_id, pageSize, sort, sortDir, search, page } =
      this.state;
    if (e.values.status === null) {
      this.setState(
        {
          status: "",
          page: 1,
        },
        () => {
          this.props.actions.filterVendorProductList(
            {
              brand_id,
              category_id,
              sort,
              sortDir,
              search,
            },
            pageSize
          );
          const params = {
            brand_id,
            category_id,
            pageSize,
            sort,
            sortDir,
            search,
            page,
          };
          this.setUrl({ ...params, pageSize, page: 1 });
        }
      );
    } else {
      this.setState(
        {
          status: e.values.status.value,
          page: 1,
        },
        () => {
          const status = this.state.status;
          this.props.actions.filterVendorProductList(
            {
              brand_id,
              category_id,
              status,
              sort,
              sortDir,
              search,
            },
            pageSize
          );
          const params = {
            brand_id,
            category_id,
            status,
            pageSize,
            sort,
            sortDir,
            search,
            page,
          };
          this.setUrl({ ...params, pageSize, page: 1 });
        }
      );
    }
  };

  handleAdminAction = (value) => {
    if (value.trim() == "Export To Master") {
      this._handleExportToProduct(this.state.selectedProductIds);
    } else if (value.trim() == "Bulk Update") {
      this._handleVendorBulkUpdateModal();
    } else if (value.trim() == "Sync From Supplier Url") {
      this._handleVendorSync(this.state.selectedProductIds);
    }
  };

  render() {
    const {
      selectedProductIds,
      syncingVendor,
      selectedBrands,
      selectedCategories,
      activeTab = PRODUCT_STATUS_NEW,
    } = this.state;
    const { allTabCount, exportedTabCount, excludedTabCount, newTabCount } =
      this.props;
    const search = window.location.search;
    const pathParams = new URLSearchParams(search);
    const searchItem = pathParams.get("search");
    const selectedSort = Url.GetParam("sort") || SORT;
    const selectedSortDir = Url.GetParam("sortDir") || SORT_DIR;
    const selectedSortOption = selectedSort + ":" + selectedSortDir;
    const currentPage = Url.GetParam("page") || PAGE;
    const searchTerm = Url.GetParam("search") || "";
    const brand_id = this.state.brand_id;
    const category_id = this.state.category_id;
    const status = Url.GetParam("status") || "";
    const params = {
      brand_id,
      category_id,
      status,
      currentPage,
      search: searchTerm,
      pagination: true,
    };

    const adminActionOptions = [
      {
        value: " Export To Master",
        label: " Export To Master",
      },
      {
        value: "Bulk Update",
        label: "Bulk Update",
      },
      {
        value: " Sync From Supplier Url",
        label: " Sync From Supplier Url",
      },
    ];

    return (
      <>
        <div>
          <div className="row">
            <div className="col">
              <PageTitle title="Vendor Products">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Button group with nested dropdown"
                >
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this._handleVendorImportModal}
                    >
                      Add From URL
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={this._handleVendorProductAddModal}
                >
                  Add
                </button>

                <div className="dropdown-wrapper select-dropdown">
                  <SelectDropdown
                    buttonLabel="Actions"
                    dropdownLinks={adminActionOptions}
                    color={"gray"}
                    visible="visible"
                    hideCaret
                    selectName={"admin_action"}
                    handleChange={this.handleAdminAction}
                    alignCenter
                  />
                </div>
              </PageTitle>

              {/* Vendor Import Modal */}
              <VendorImportModal
                toggle={this.state.vendorImportToggle}
                onModalClose={this._handleVendorImportModal}
              />

              {/* Vendor Product Add Modal */}
              <VendorProductAddModal
                toggle={this.state.vendorProductAddToggle}
                onModalClose={this._handleVendorProductAddModal}
                params={params}
              />

              {/* Vendor Bulk Update Modal */}
              <VendorBulkUpdateModal
                toggle={this.state.vendorBulkUpdateToggle}
                selectedProductIds={selectedProductIds}
                onModalClose={this._handleVendorBulkUpdateModal}
                bulkUpdateReduxAction={
                  this.props.actions.bulkUpdateVendorProduct
                }
              />

              {/* Filter Section*/}
              <div className="row">
                <div className="col-md-6">
                  <ProductFilter
                    selectedBrands={selectedBrands}
                    brandIds={brand_id}
                    onChangeBrand={this.onChangeBrand.bind(this)}
                    selectedCategories={selectedCategories}
                    categoryIds={category_id}
                    onChangeCatageory={this.onChangeCatageory.bind(this)}
                    productStatus={this.state.productStatus}
                    status={this.state.status}
                    onChangeStatus={this.onChangeStatus}
                  />
                </div>
              </div>

              <Nav tabs className="admin-tabs">
                <Tab
                  name={PRODUCT_STATUS_NEW}
                  active={activeTab}
                  count={newTabCount}
                  toggle={() => this.toggle(PRODUCT_STATUS_NEW)}
                />

                <Tab
                  name={PRODUCT_STATUS_EXPORTED}
                  active={activeTab}
                  count={newTabCount}
                  toggle={() => this.toggle(PRODUCT_STATUS_EXPORTED)}
                />
                <Tab
                  name={PRODUCT_STATUS_EXCLUDED}
                  active={activeTab}
                  count={newTabCount}
                  toggle={() => this.toggle(PRODUCT_STATUS_EXCLUDED)}
                />
                <Tab
                  name={PRODUCT_STATUS_ALL}
                  active={activeTab}
                  count={newTabCount}
                  toggle={() => this.toggle(PRODUCT_STATUS_ALL)}
                />
              </Nav>
              {/* Tab contents */}
              <TabContent activeTab={activeTab}>
                {/* All tab */}
                <TabPane tabId={PRODUCT_STATUS_NEW}>
                  <SupplierProductList
                    id={PRODUCT_IN_NEW}
                    onBulkSelect={this.handleBulkUpdate}
                    selectedPageSize={Url.GetParam("pageSize")}
                    sortByOptions={this.productSortOption}
                    selectedSort={selectedSortOption}
                    searchTerm={searchTerm}
                    params={{
                      status: PRODUCT_STATUS_NEW,
                    }}
                    history={this.props.history}
                    currentPage={currentPage}
                  />
                </TabPane>

                <TabPane tabId={PRODUCT_STATUS_EXPORTED}>
                  <SupplierProductList
                    id={PRODUCT_ID_EXPORTED}
                    onBulkSelect={this.handleBulkUpdate}
                    selectedPageSize={Url.GetParam("pageSize")}
                    sortByOptions={this.productSortOption}
                    selectedSort={selectedSortOption}
                    searchTerm={searchTerm}
                    params={{
                      status: PRODUCT_STATUS_EXPORTED,
                    }}
                    history={this.props.history}
                    currentPage={currentPage}
                  />
                </TabPane>

                <TabPane tabId={PRODUCT_STATUS_EXCLUDED}>
                  <SupplierProductList
                    id={PRODUCT_STATUS_EXCLUDED}
                    onBulkSelect={this.handleBulkUpdate}
                    selectedPageSize={Url.GetParam("pageSize")}
                    sortByOptions={this.productSortOption}
                    selectedSort={selectedSortOption}
                    searchTerm={searchTerm}
                    params={{
                      status: PRODUCT_STATUS_EXCLUDED,
                    }}
                    history={this.props.history}
                    currentPage={currentPage}
                  />
                </TabPane>
                <TabPane tabId={PRODUCT_STATUS_ALL}>
                  <SupplierProductList
                    id={PRODUCT_ID_ALL}
                    onBulkSelect={this.handleBulkUpdate}
                    selectedPageSize={Url.GetParam("pageSize")}
                    sortByOptions={this.productSortOption}
                    selectedSort={selectedSortOption}
                    searchTerm={searchTerm}
                    params={params}
                    history={this.props.history}
                    currentPage={currentPage}
                  />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        filterVendorProductList,
        bulkUpdateVendorProduct,
        exportToMaster,
        updateSync,
        bulkUpdateSync,
        syncToVendorProduct,
        fetchList,
      },
      dispatch
    ),
  };
}
const mapStateToProps = (state) => {
  const { VendorProducts } = state.table;
  const sort =
    VendorProducts && !VendorProducts.isFetching
      ? VendorProducts.sort
      : SORT;

  const sortDir =
    VendorProducts && !VendorProducts.isFetching
      ? VendorProducts.sortDir
      : SORT_DIR;

  const pageSize =
    VendorProducts && !VendorProducts.isFetching
      ? VendorProducts.pageSize
      : PAGESIZE;

  const search =
    VendorProducts && !VendorProducts.isFetching
      ? VendorProducts.search
      : "";

  const status =
    VendorProducts && !VendorProducts.isFetching
      ? VendorProducts.status
      : "";

  const currentPage =
    VendorProducts && !VendorProducts.isFetching
      ? VendorProducts.currentPage
      : PAGE;
  const allTabCount =
    state.table[PRODUCT_STATUS_ALL] &&
      !state.table[PRODUCT_STATUS_ALL].isFetching
      ? state.table[PRODUCT_STATUS_ALL].totalCount
      : 0;

  const newTabCount =
    state.table[PRODUCT_STATUS_NEW] &&
      !state.table[PRODUCT_STATUS_NEW].isFetching
      ? state.table[PRODUCT_STATUS_NEW].totalCount
      : 0;

  const excludedTabCount =
    state.table[PRODUCT_STATUS_EXCLUDED] &&
      !state.table[PRODUCT_STATUS_EXCLUDED].isFetching
      ? state.table[PRODUCT_STATUS_EXCLUDED].totalCount
      : 0;

  const exportedTabCount =
    state.table[PRODUCT_STATUS_EXPORTED] &&
      !state.table[PRODUCT_STATUS_EXPORTED].isFetching
      ? state.table[PRODUCT_STATUS_EXPORTED].totalCount
      : 0;
  return {
    sort,
    sortDir,
    pageSize,
    search,
    currentPage,
    status,
    allTabCount,
    newTabCount,
    excludedTabCount,
    exportedTabCount,
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(VendorProducts);
