import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Col, Row, Table } from "reactstrap";
import { bindActionCreators } from "redux";
//Action
import { fetchList, setTablePage } from "../../actions/table";
//Assets
//Helper
import Url from "../../lib/Url";
import NoRecordsFound from "../NoRecordsFound";
//Components
import Pagination from "../Pagination";
import Spinner from "../Spinner";

//Styles
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import ObjectName from "../../helpers/ObjectName";
import { Order } from "../../helpers/Order";
import * as tabConstant from "../../helpers/Product";
import ArrayList from "../../lib/ArrayList";
import Currency from "../../lib/Currency";
import DateTime from "../../lib/DateTime";
import PaymentAccountService from "../../services/PaymentAccountService";
import { getStoresList } from "../../services/StoreListService";
import TranferTypeReasonService from "../../services/TranferTypeReasonService";
import BrandService from "../../services/BrandService";
import UserService from "../../services/UserService";
import { getUserRole } from "../../services/UserService";
import { DEFAULT_PAGE } from "../../views/product";
import Filter from "../Filter";
import "./styles.scss";
import SprintService from "../../services/SprintService";
import { groupOption } from "../../helpers/Status";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";
import  AccountService  from "../../services/AccountService";
import StatusService from "../../services/StatusService";
import ShiftService from "../../services/ShiftService";
import transferTypeService from "../../services/TransferTypeService";
import StoreService from "../../services/StoreService";
import Cookies from "../../lib/Helper";
import Cookie from "../../helpers/Cookie";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../../views/product/components/productCard"


export const ReduxColumn = () => {};

class ReduxTable extends React.Component {
  state = {
    page: 1,
    pageSize: 25,
    id: "",
    apiURL: "",
    selectedAll: false,
    selectedIds: [],
    searchTerm:
      this.props.params && this.props.params.searchItem
        ? this.props.params.searchItem
        : "" || "",
    isSearch: false,
    isActive: "",
    selectedStatusOption: "Active",
    selectedSortOption: "Alphabetical A-Z",
    sortByOptions: [
      {
        value: "a-z",
        label: "Alphabetical A-Z"
      }
    ],
    value: Url.GetParam("search"),
    pageSizeValue: Url.GetParam("pageSize"),
    categoryList: "",
    brandList: "",
    spinning: false,
    autoRefresh: "",
    tab: Url.GetParam("tab"),
    storeData: [],
    vendorData: [],
    refreshValue: "",
    ownerData: [],
    statusList: [],
    gstStatusList: [],
    groupList:[],
    transferTypeList: [],
    userList: [],
    shiftList: [],
    brandOption: [],
    categoryOption: [],
    salesExecutiveOption: [],
    shiftData: [],
    bankOption: [],
    userOption: [],
    tagOption: [],
    sprintOption: [],
    reasonOption: [],
    productOption: [],
    vendor: Url.GetParam("account"),
    brand: Url.GetParam("brand"),
    category: Url.GetParam("category"),
    location: Url.GetParam("location"),
    stockEntryProductType: Url.GetParam("stockEntryProductType"),
    startDate: Url.GetParam("startDate"),
    date: Url.GetParam("date"),
    endDate: Url.GetParam("endDate"),
    status: Url.GetParam("status"),
    selectedSalesExecutive: Url.GetParam("salesExecutive"),
    selectedShift: Url.GetParam("shift"),
    selectedPaymentType: Url.GetParam("paymentType"),
    selectedType: Url.GetParam("type"),
    selectedFromLocation: Url.GetParam("fromLocation"),
    selectedToLocation: Url.GetParam("toLocation"),
    selectedPaymentAccount: Url.GetParam("paymentAccount"),
    selectedUser: Url.GetParam("user"),
    objectName: Url.GetParam("objectName"),
    selectedVisitorType: Url.GetParam("visitorType"),
    selectedProductTag: Url.GetParam("tag"),
    selectedManufacture: Url.GetParam("manufacture"),
    selectedSprintName: Url.GetParam("sprint"),
    selectedSort: Url.GetParam("sort"),
    selectedSortDir: Url.GetParam("sortDir"),
    selectedReason: Url.GetParam("reason"),
    selectedProduct: Url.GetParam("product"),
    stockType: Url.GetParam("stockType"),
    selectedGstStatus: Url.GetParam("gstStatus"),
    selectedReporter: Url.GetParam("reporter"),
    statusGroup: Url.GetParam("group"),
    selectedProjectId: Url.GetParam("project_id"),
    role: Url.GetParam("role"),
    projectId: Cookies.get(Cookie.PROJECT_ID),
    projectList: [],
    show_duplicate:Url.GetParam("show_duplicate"),
    startTime: Url.GetParam("startTime"),
    endTime: Url.GetParam("endTime"),
  };

  componentDidMount() {
    const { apiURL, id, table, sortByOptions, statusOptions, showDropdown } =
      this.props;

    if (showDropdown) {
      this.getCategoryDetail();
      this.getBrandDetail();
    }
    if (
      Url.GetParam("location") ||
      Url.GetParam("fromLocation") ||
      Url.GetParam("toLocation")
    ) {
      this.storeList();
    }

    if (this.props.showSalesExecutiveFilter) {
      this.getSalesExecutiveList();
    }

    if (this.props.showPaymentAccountFilter) {
      this.getBankList();
    }

    if (Url.GetParam("brand")) {
      this.getBrandList();
    }

    if (Url.GetParam("category")) {
      this.getCategoryList();
    }

    if (Url.GetParam("product")) {
      this.getProducts();
    }

    if (Url.GetParam("account")) {
      this.getAccounts();
    }

    if (Url.GetParam("status") || Url.GetParam("gstStatus")) {
      this.getStatus();
    }

    if (Url.GetParam("projectId")) {
      this.getGroupStatus(this.props.objectName,Url.GetParam("projectId")&& Url.GetParam("projectId"));
    }



    if (Url.GetParam("shift")) {
      this.getShiftList();
    }

    if (Url.GetParam("type")) {
      this.getTransferType();
    }

    if (Url.GetParam("user") || Url.GetParam("reporter")) {
      this.getUserList();
    }

    if (this.props.showTagFilter || this.props.showManufactureFilter || this.props.showVisitorTypeFilter) {
      this.getTagList();
    }

    if (this.props.showReasonFilter) {
      this.getTransferTypeReason();
    }
    if (this.props.showSprintFilter) {
      this.getSprintList();
    }
    if (this.props.autoRefresh) {
      this.interval = setInterval(
        () =>
          this.fetchData(
            ...this.getFetchDataParams({
              search: this.state.value ? this.state.value : ""
            })
          ),
        60000
      );
    }

    this.setState(
      {
        id,
        apiURL,
        page:
          table[id] && table[id].currentPage
            ? table[id].currentPage
            : Url.GetParam("page") || 1,
        pageSize: table[id] && table[id].pageSize ? table[id].pageSize : 25,
        selectedStatusOption:
          statusOptions && statusOptions.length
            ? statusOptions[0].value
            : this.state.selectedStatusOption,
            selectedSortOption: this.props.defaultSortOption  ? this.props.defaultSortOption[0].value:
            sortByOptions && sortByOptions.length
              ? sortByOptions[0].value
              : this.state.selectedSortOption
      },
      () => {
        const selectedSortOption = this.getSelectedSortLabel(
          this.state.selectedSortOption
        );
        this.handleSortByChange(selectedSortOption);
      }
    );
    const selectedStatusOption = this.getSelectedStatusLabel(
      this.state.selectedStatusOption
    );
    this.handleStatusByChange(selectedStatusOption);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

   getProductDetails = (
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
        disableLink
        disableLinks
        productName={productName}
        url={productImage}
        brandName={brandName}
        size={size}
        unit={unit}
        salePrice={salePrice}
        mrp={mrp}
      />
    );
  };

  getBrandList = async () => {
    const data = await BrandService.getBrandOption();
    this.setState({ brandOption: data });
  };

  getCategoryList = async () => {
    const data = await CategoryService.getOption();
    this.setState({ categoryOption: data });
  };

  getProducts = async () => {
    let response = await ProductService.getOption();
    let productList = new Array();

    if (response && response.data) {
        let products = response.data;
        if (products && products.length > 0) {
          for (let i = 0; i < products.length; i++) {
            let productDetails = products[i];
           productList.push({
              label: this.getProductDetails(
                productDetails.name,
                products[i].image,
                productDetails.brand,
                productDetails.size,
                productDetails.unit,
                productDetails.sale_price,
                productDetails.mrp,
                productDetails.id
              ),
              value: productDetails.product_display_name + products[i].id,
              id: products[i].id,
            }); 
          }
        }
      }
    this.setState({ productOption: productList });
  };

  getAccounts = async () => {
    let response = await AccountService.getOption();
    this.setState({ vendorData: response });
  };

  getStatus = async () => {
    let response = await StatusService.getOption(this.props.objectName);
    this.setState({ statusList: response, gstStatusList: response });
  };
  
  getGroupStatus = async (objectName,projectId) => {
    let response = await StatusService.getGroupOption(objectName,projectId);
    this.setState({  groupList: response ? response: [] });
  };




  getShiftList = async () => {
    const response = await ShiftService.getShiftList();
    this.setState({ shiftData: response });
  };

  getTransferType = async () => {
    const response = await transferTypeService.getOption();
    this.setState({ transferTypeList: response });
  };

  getUserList = async () => {
    const users = await UserService.getOption();
    this.setState({ userOption: users });
  };

  componentDidUpdate(prevProps) {
    if (this.props.apiURL !== prevProps.apiURL) {
      const { sortByOptions, statusOptions } = this.props;

      this.setState(
        {
          apiURL: this.props.apiURL,
          selectedStatusOption:
            statusOptions && statusOptions.length
              ? statusOptions[0].value
              : this.state.selectedStatusOption,
          selectedSortOption:
            sortByOptions && sortByOptions.length
              ? sortByOptions[0].value
              : this.state.selectedSortOption
        },
        () => {
          const selectedSortOption = this.getSelectedSortLabel(
            this.state.selectedSortOption
          );
          this.handleSortByChange(selectedSortOption);
        },
        () => {
          const selectedStatusOption = this.getSelectedStatusLabel(
            this.state.selectedStatusOption
          );
          this.handleStatusByChange(selectedStatusOption);
        }
      );
    }
  }

  /**
   * Fetch data using API call
   *
   * @param {*} force
   */

  fetchData(
    force,
    sort,
    sortDir,
    status,
    account,
    brand,
    category,
    location,
    startDate,
    endDate,
    startTime,
    endTime,
    statusValue,
    salesExecutive,
    shift,
    paymentType,
    type,
    fromLocation,
    toLocation,
    paymentAccount,
    user,
    objectName,
    productTag,
    visitorType,
    pageValue,

    reason,
    product,
    stockType,
    search,
    manufacture,
    gstStatus,
    reporter,
    sprint,
    statusGroup,
    projectId,
    stockEntryProductType,
    project_id,
    role,
    date,
    show_duplicate
  ) {
    const {
      id,
      apiURL,
      page,
      pageSize,
      searchTerm,
      selectedSortOption,
      value,
      pageSizeValue,
      tab,
      selectedSort,
      selectedSortDir
    } = this.state;
    const {
      table,
      actions: { fetchList, setTablePage },
      sortByOptions,
      statusOptions
    } = this.props;
    const sortAndSortDir = selectedSortOption.split(":");

    const sortBy = sort
      ? sort
      : selectedSort
      ? selectedSort
      : sortAndSortDir[0];
    const sortDirBy = sortDir
      ? sortDir
      : selectedSortDir
      ? selectedSortDir
      : sortAndSortDir[1];
    const selectedstatus = status;

    const listDetails = table[id] || {};

    const params = this.props.params || {};
    params.search = search ? search : value || "";

    if (this.props.showStatusOptions && !params.status) {
      params.status =
        status ||
        (statusOptions && selectedstatus) ||
        this.state.selectedStatusOption ||
        "";
    }
    params.sort = sort ? sort : (sortByOptions && !searchTerm && sortBy) || "";
    params.sortDir =
      sortDir || (sortByOptions && !searchTerm && sortDirBy) || "";
    params.pageSize = pageSize || pageSizeValue || Url.GetParam("pageSize");
    if (pageValue || Url.GetParam("page")) {
      params.page = pageValue ? pageValue : Url.GetParam("page");
    } else {
      params.page = DEFAULT_PAGE;
    }
    params.tab = this?.props?.params?.tab ? this?.props?.params?.tab : tab;
    params.account = account
      ? account
      : account === ""
      ? ""
      : this.props?.params?.account
      ? this.props?.params?.account
      : this.state.vendor;
      params.brand = brand ? brand : brand === "" ? "" : this.state.brand;
      params.category = category
      ? category
      : category === ""
      ? ""
      : this.state.category;
    params.location = location
      ? location
      : location === ""
      ? ""
      : this.state.location;
    params.stockEntryProductType = stockEntryProductType
      ? stockEntryProductType
      : stockEntryProductType === ""
      ? ""
      : this.state.stockEntryProductType;
    if (this.props.showDateFilter) {
      params.startDate = startDate
        ? startDate
        : startDate === ""
        ? ""
        : this.state.startDate;
      params.endDate = endDate
        ? endDate
        : endDate === ""
        ? ""
        : this.state.endDate;
    }
    if(this.props.showTimeFilter){
      params.startTime = startTime
      ? startTime
      : startTime === ""
      ? ""
      : this.state.startTime;
      params.endTime = endTime
      ? endTime
      : endTime === ""
      ? ""
      : this.state.endTime;

    }
    if (this.props.showSingleDateFilter) {
      params.date = date ? date : date === "" ? "" : this.state.date;
    }
    params.status = statusValue
      ? statusValue
      : statusValue === ""
      ? ""
      : this?.props?.params?.status
      ? this?.props?.params?.status
      : this.state.status;
    params.salesExecutive = salesExecutive
      ? salesExecutive
      : salesExecutive === ""
      ? ""
      : this.state.selectedSalesExecutive;
    params.shift = shift ? shift : shift === "" ? "" : this.state.selectedShift;
    params.paymentType = paymentType
      ? paymentType
      : paymentType === ""
      ? ""
      : this.state.selectedPaymentType;
    params.type = type
      ? type
      : type === ""
      ? ""
      : this?.props?.params?.type
      ? this?.props?.params?.type
      : this.state.selectedType;
    params.fromLocation = fromLocation
      ? fromLocation
      : fromLocation === ""
      ? ""
      : this.state.selectedFromLocation;
    params.toLocation = toLocation
      ? toLocation
      : toLocation === ""
      ? ""
      : this.state.selectedToLocation;
    params.paymentAccount = paymentAccount
      ? paymentAccount
      : paymentAccount === ""
      ? ""
      : this.state.selectedPaymentAccount;
    params.user = user
      ? user
      : user === ""
      ? ""
      : this?.props?.params?.user
      ? this?.props?.params?.user
      : this.state.selectedUser;

    if (
      this?.props?.params?.objectName ||
      objectName ||
      objectName === "" ||
      this?.state?.objectName
    ) {
      params.objectName = this?.props?.params?.objectName
        ? this?.props?.params?.objectName
        : objectName
        ? objectName
        : objectName === ""
        ? ""
        : this?.state?.objectName;
    }
    params.sprint = sprint
      ? sprint
      : sprint === ""
      ? ""
      : this.state.selectedSprintName;
    params.tag = productTag
      ? productTag
      : productTag === ""
      ? ""
      : this.state.selectedProductTag;
      params.visitorType = visitorType
      ? visitorType
      : visitorType === ""
      ? ""
      : this.state.selectedVisitorType;
    params.manufacture = manufacture
      ? manufacture
      : manufacture === ""
      ? ""
      : this.state.selectedManufacture;
    if (this.props.customStatus && this.props.customStatus.status) {
      params.status = this.props.customStatus.status;
    }
    params.gstStatus = gstStatus
      ? gstStatus
      : gstStatus === ""
      ? ""
      : this.state.selectedGstStatus;
    params.reporter = reporter
      ? reporter
      : reporter === ""
      ? ""
      : this.state.selectedReporter;
    params.reason = reason
      ? reason
      : reason === ""
      ? ""
      : this.state.selectedReason;

    params.product = product
      ? product
      : product === ""
      ? ""
      : this.state.selectedProduct;

    params.stockType = stockType
      ? stockType
      : stockType === ""
      ? ""
      : this.state.stockType;
    params.role = role
      ? role
      : role === ""
      ? ""
      : this.state.role || this?.props?.params?.role
      ? this?.props?.params?.role
      : "";
    params.group = statusGroup
      ? statusGroup
      : statusGroup === ""
      ? ""
      : this?.props?.params?.group ?this?.props?.params?.group :this.props?.params?.group == "" ? "": this.state.statusGroup;
    params.project_id = project_id
      ? project_id
      : project_id === ""
      ? ""
      : this.state.selectedProjectId;
    if (Cookies.get(Cookie.PROJECT_ID) !== "null" && this.props.projectId) {
      params.projectId =
        Cookies.get(Cookie.PROJECT_ID) == "null"
          ? ""
          : Cookies.get(Cookie.PROJECT_ID)
          ? Cookies.get(Cookie.PROJECT_ID)
          : this.props.projectId
          ? this.props.projectId
          : this.props.projectId === ""
          ? ""
          : "";
        };
        params.show_duplicate = show_duplicate ? show_duplicate : show_duplicate === "" ? "" : this.state.show_duplicate;

    if (this.props.paramsToUrl) {
      const currentPage = window.location.pathname;
      let queryString = "";

      const queryStringArray = Object.entries(params);
      const urlParams = [];
      if (queryStringArray.length > 0) {
        queryString = "?";
        queryStringArray.forEach(([key, value]) => {
          if (this.props.showParamsInUrl) {
            let filteredKey = Object.keys(this.props.showParamsInUrl).find(
              (values) => values === key
            );
            if (filteredKey) {
              urlParams.push(`${key}=${value}`);
            }
          } else {
            if (value !== null && value !== "") {
              urlParams.push(`${key}=${value}`);
            }
          }
        });
      }
      const filteredParams = urlParams.join("&");
      if (this.props.history && this.props.history.push) {
        this.props.history.push(
          `${currentPage}${filteredParams ? `?${filteredParams}` : ""}`,
          {
            data: params
          }
        );
      }
    }
    if (!listDetails.isFetching && apiURL) {
      if (!listDetails) {
        return;
      }
      if (
        !listDetails[page] ||
        (listDetails.sortList[page] !== params.sort &&
          listDetails.sortDirList[page] !== params.sortDir) ||
        force
      ) {
        fetchList(
          id,
          apiURL,
          params.page ? params.page : page,
          pageSize,
          params
        );
      } else {
        setTablePage(id, page);
      }
    }
    this.setState({ pageSize: "" });
  }

  /**
   * Change page
   *
   * @param {*} page
   */
  onPageChange(page) {
    this.props.setPage && this.props.setPage(page);
    const pageSize = Url.GetParam("pageSize");
    this.setState({ pageSize });
    this.fetchData(...this.getFetchDataParams({ page: page ? page : "" }));
  }

  /**
   * Change page size
   *
   * @param {*} e
   */
  onPageSizeChange(e) {
    this.setState({ page: 1, pageSize: e.target.value, isSearch: false }, () =>
      this.fetchData(true)
    );
  }

  /**
   * Select all checkbox
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelectAll(data, e) {
    const selectedIds = this.state.selectedIds;
    let rowIds = [];
    let checkedIds = [];
    data.forEach((row) => {
      if (e.target.checked) {
        if (
          selectedIds.indexOf(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          ) < 0
        ) {
          selectedIds.push(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          );
          rowIds.push(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          );
        }
      } else {
        if (
          selectedIds.indexOf(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          ) >= 0
        ) {
          selectedIds.splice(
            selectedIds.indexOf(
              this.props.customCheckBoxId
                ? row[this.props.customCheckBoxId]
                : row.id
            ),
            1
          );
        }
      }
    });
    for (let i = 0; i < rowIds.length; i++) {
      const validIds = rowIds.find((number) => number == selectedIds[i]);
      if (validIds !== undefined) {
        checkedIds.push(validIds);
      }
    }
    this.setState({
      selectedAll: e.target.checked,
      selectedIds: checkedIds
    });
    this.props.onBulkSelect(checkedIds);

    if (this.props.selectedCheckBox == false) {
      this.setState({
        selectedAll: false,
        selectedIds: ""
      });
      this.props.onBulkSelect(checkedIds);
    }
  }

  /**
   * Single checkbox select
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelect(data, e) {
    const rowIds = [];
    let checkedIds = [];

    data.forEach((row) => {
      rowIds.push(
        parseInt(
          this.props.customCheckBoxId
            ? row[this.props.customCheckBoxId]
            : row.id
        )
      );
    });
    const rowId = parseInt(e.target.value);
    const selectedIds = this.state.selectedIds;

    if (e.target.checked) {
      if (selectedIds.indexOf(rowId) < 0) {
        selectedIds.push(rowId);
      }
    } else {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedIds.splice(selectedIds.indexOf(rowId), 1);
      }
    }

    let selectedLength = 0;
    rowIds.forEach((rowId) => {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedLength++;
      }
    });

    for (let i = 0; i < rowIds.length; i++) {
      const validIds = rowIds.find((number) => number == selectedIds[i]);
      if (validIds !== undefined) {
        checkedIds.push(validIds);
      }
    }

    this.setState(
      {
        selectedAll: rowIds.length === selectedLength,
        selectedIds: selectedIds
      },
      () => {
        this.props.onBulkSelect(checkedIds);
      }
    );
  }

  componentWillReceiveProps(props) {
    const { table, id } = props;
    const listDetails = table[id];
    let data = [];

    if (listDetails) {
      data = listDetails[listDetails.currentPage] || [];
    }

    if (this.props.selectedCheckBox == false) {
      this.setState({ selectedIds: [], selectedAll: false });
    }
    const selectedIds = this.state.selectedIds;
    let selectedLength = 0;
    data.forEach((row) => {
      if (selectedIds.indexOf(row.id) >= 0) {
        selectedLength++;
      }
    });

    this.setState({
      selectedAll: selectedLength > 0 && selectedLength === data.length
    });
  }

  /**
   * Change search term
   *
   * @param {*} event
   */
  onChange(event) {
    this.setState({ value: event.target.value, page: 1 });
    event.persist();
    this.setState({ searchTerm: event.target.value });
    const status = Url.GetParam("status");
    this.setState({ selectedStatusOption: status });
    if (this.props.islandingTable)
      this.props.saveSearchTerm(event.target.value);
  }

  onSearchKeyPress(event) {
    if (event.charCode === 13) {
      this.fetchData(
        ...this.getFetchDataParams({
          search: event?.target?.value ? event?.target?.value : ""
        })
      );
    }
  }
  onSearchClick(event) {
    this.fetchData(
      ...this.getFetchDataParams({
        search: this.state.value ? this.state.value : ""
      })
    );
  }

  doSearch = _.debounce((event) => {
    this.setState(
      {
        isSearch: true,
        searchTerm: encodeURIComponent(event.target.value),
        page: 1,
        pageSize: Url.GetParam("pageSize")
      },
      () => {
        this.fetchData(
          true,
          Url.GetParam("sort"),
          Url.GetParam("sortDir"),
          "",
          Url.GetParam("account"),
          Url.GetParam("brand"),
          Url.GetParam("category"),
          Url.GetParam("location"),
          Url.GetParam("startDate"),
          Url.GetParam("endDate"),
          Url.GetParam("startTime"),
          Url.GetParam("endTime"),
          Url.GetParam("status"),
          Url.GetParam("salesExecutive"),
          Url.GetParam("shift"),
          Url.GetParam("paymentType"),
          Url.GetParam("type"),
          Url.GetParam("fromLocation"),
          Url.GetParam("toLocation"),
          Url.GetParam("paymentAccount"),
          Url.GetParam("user"),
          Url.GetParam("objectName"),
          Url.GetParam("tag"),
          Url.GetParam("manufacture"),
          Url.GetParam("stockEntryProductType"),
          Url.GetParam("date"),
          DEFAULT_PAGE
        );
        this.setState({
          selectedAll: false,
          selectedIds: []
        });
      }
    );
  }, 500);

  columnSortBy(sortBy) {
    this.setState({
      isActive: !this.state.isActive,
      sortBy: sortBy,
      pageSize: this.state.pageSize
    });
    let sortDir = "";
    if (this.state.isActive) {
      sortDir = "DESC";
    } else {
      sortDir = "ASC";
    }
    this.fetchData(true, sortBy, sortDir);
  }

  handleSortByChange = (value) => {
    this.setState({ selectedSortOption: this.getSortValueFromLabel(value) });
    this.getSortByOptions(value);
  };

  getFetchDataParams = (values) => {
    return [
      true,
      Url.GetParam("sort"),
      Url.GetParam("sortDir"),
      "",
      (values && values?.account) || values?.account === ""
        ? values?.account
        : (values && values?.vendor) || values?.vendor === ""
        ? values?.vendor
        : Url.GetParam("account"),
      (values && values?.brand) || values?.brand === ""
        ? values?.brand
        : Url.GetParam("brand"),
      (values && values?.category) || values?.category === ""
        ? values?.category
        : Url.GetParam("category"),
      (values && values?.location) || values?.location === ""
        ? values?.location
        : Url.GetParam("location"),
      (values && values?.startDate) || values?.startDate === ""
        ? values?.startDate
        : Url.GetParam("startDate"),
      (values && values?.endDate) || values?.endDate === ""
        ? values?.endDate
        : Url.GetParam("endDate"),
        (values && values?.startTime) || values?.startTime === ""
        ? values?.startTime
        : Url.GetParam("startTime"),
      (values && values?.endTime) || values?.endTime === ""
        ? values?.endTime
        : Url.GetParam("endTime"),
      (values && values?.status) || values?.status === ""
        ? values?.status
        : Url.GetParam("status"),
      (values && values?.salesExecutive) || values?.salesExecutive === ""
        ? values?.salesExecutive
        : Url.GetParam("salesExecutive"),
      (values && values?.shift) || values?.shift === ""
        ? values?.shift
        : Url.GetParam("shift"),
      (values && values?.paymentType) || values?.paymentType === ""
        ? values?.paymentType
        : Url.GetParam("paymentType"),
      (values && values?.type) || values?.type === ""
        ? values?.type
        : Url.GetParam("type"),
      (values && values?.fromLocation) || values?.fromLocation === ""
        ? values?.fromLocation
        : Url.GetParam("fromLocation"),
      (values && values?.toLocation) || values?.toLocation === ""
        ? values?.toLocation
        : Url.GetParam("toLocation"),
      (values && values?.paymentAccount) || values?.paymentAccount === ""
        ? values?.paymentAccount
        : Url.GetParam("paymentAccount"),
      (values && values?.user) || values?.user === ""
        ? values?.user
        : Url.GetParam("user"),
      (values && values?.objectName) || values?.objectName === ""
        ? values?.objectName
        : Url.GetParam("objectName"),
      (values && values?.productTag) || values?.productTag === ""
        ? values?.productTag
        : Url.GetParam("tag"),
        (values && values?.visitorType) || values?.visitorType === ""
        ? values?.visitorType
        : Url.GetParam("visitorType"),

      values && values?.page ? values?.page : Url.GetParam("page"),
      (values && values?.reason) || values?.reason === ""
        ? values?.reason
        : Url.GetParam("reason"),
      (values && values?.product) || values?.product === ""
        ? values?.product
        : Url.GetParam("product"),
      (values && values?.stockType) || values?.stockType === ""
        ? values?.stockType
        : Url.GetParam("stockType"),
      (values && values?.search) || values?.search === ""
        ? values?.search
        : Url.GetParam("search"),
      (values && values?.manufacture) || values?.manufacture === ""
        ? values?.manufacture
        : Url.GetParam("manufacture"),
      (values && values?.gstStatus) || values?.gstStatus === ""
        ? values?.gstStatus
        : Url.GetParam("gstStatus"),
      (values && values?.reporter) || values?.reporter === ""
        ? values?.reporter
        : Url.GetParam("reporter"),
      (values && values?.sprint) || values?.sprint === ""
        ? values?.sprint
        : Url.GetParam("sprint"),
      (values && values?.statusGroup) || values?.statusGroup === ""
        ? values?.statusGroup
        : (values && values?.status_group) || values?.status_group === ""
        ? values?.status_group
        : Url.GetParam("group"),
      (this.props && this.props?.projectId) || this.props?.projectId === ""
        ? this.props?.projectId
        : Cookies.get(Cookie.PROJECT_ID),
      (values && values?.stockEntryProductType) ||
      values?.stockEntryProductType === ""
        ? values?.stockEntryProductType
        : Url.GetParam("stockEntryProductType"),
      (values && values?.project_id) || values?.project_id === ""
        ? values?.project_id
        : (values && values?.projectName) || values?.projectName === ""
        ? values?.projectName
        : Url.GetParam("project_id"),
      (values && values?.role) || values?.role === ""
        ? values?.role
        : Url.GetParam("role")|| this?.props?.params?.role,
      (values && values?.date) || values?.date === ""
        ? values?.date
        : Url.GetParam("date"),
        (values && values?.show_duplicate) || values?.show_duplicate === ""
        ? values?.show_duplicate
        : Url.GetParam("show_duplicate")
    ];
  };

  getStatusValue=(values)=>{
    let statusValue;
    if (Array.isArray(values?.status)) {
      let arrayValue = [];
      for (let i = 0; i < values?.status.length; i++) {
        if(values?.status[i] !==undefined){
          const { value } = values?.status[i];
          arrayValue.push(value);
        }
      }
      statusValue = arrayValue;
    } else {
      statusValue = values?.status?.value ? values?.status?.value : "";
    }
  
    return statusValue
  }


  getFilterValues = (values) => {
    let statusValue = this.getStatusValue(values);

    if (values?.projectName) {
      this.getGroupStatus(
        this.props.objectName,
        values?.projectName ? values?.projectName?.value : ""
      );
    }

    return {
      account: values?.vendor ? values?.vendor?.value : "",
      brand: values?.brand ? values?.brand?.value : "",
      role: values?.role ? values?.role?.value : "",
      category: values?.category ? values?.category?.value : "",
      location: values?.location ? values?.location?.value : "",
      stockEntryProductType: values?.stockEntryProductType
        ? values?.stockEntryProductType?.value
        : "",
      startDate: values?.startDate
        ? DateTime.toISOStringDate(values?.startDate)
        : "",
      endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) : "",
      date: values?.date
        ? DateTime.toISOStringDate(values?.date)
        : "",
        startTime : values?.startTime ? values?.startTime : "",
      endTime : values?.endTime ? values?.endTime : "",
      status: statusValue ? statusValue : "",
      gstStatus: values?.gstStatus ? values?.gstStatus?.value : "",
      salesExecutive: values?.salesExecutive ? values?.salesExecutive?.id : "",
      shift: values?.shift ? values?.shift?.value : "",
      paymentType: values?.paymentType ? values?.paymentType?.value : "",
      type: values?.type ? values?.type?.value : Url.GetParam("type"),
      fromLocation: values?.fromLocation ? values?.fromLocation?.value : "",
      toLocation: values?.toLocation ? values?.toLocation?.value : "",
      paymentAccount: values?.paymentAccount
        ? values?.paymentAccount?.value
        : "",
      user: values?.user ? values?.user?.id : "",
      reporter: values?.reporter ? values?.reporter?.id : "",
      objectName: values?.objectName ? values?.objectName?.value : "",
      sprint: values?.sprint ? values?.sprint?.value : "",
      productTag: values?.productTag ? values?.productTag?.value : "",
      visitorType: values?.visitorType ? values?.visitorType?.value : "",
      manufacture: values?.manufacture ? values?.manufacture?.value : "",
      reason: values?.reason ? values?.reason?.value : "",
      stockType: values?.stockType ? values?.stockType?.value : "",
      product: values?.product ? values?.product?.id : "",
      statusGroup: values?.status_group ? values?.status_group?.value : "",
      show_duplicate:
        values?.show_duplicate && values?.show_duplicate !== undefined
          ? values?.show_duplicate
          : "",
      project_id: values?.projectName ? values?.projectName?.value : "",
    };
  };



  

  setStateFilterValue=(values)=>{
    let statusValue = this.getStatusValue(values)
    this.setState({ vendor: values?.vendor ? values?.vendor?.value  :"" });
    this.setState({ brand: values?.brand ? values?.brand?.value  :"" });
    this.setState({ selectedRole: values?.role ? values?.role?.value  :"" });
    this.setState({ category: values?.category ? values?.category?.value  :"" });
    this.setState({ location: values?.location ? values?.location?.value  :"" });
    this.setState({ stockEntryProductType: values?.stockEntryProductType ? values?.stockEntryProductType?.value  :"" });
    this.setState({ startDate:  values?.startDate ?  DateTime.toISOStringDate(values?.startDate)  :"" });
    this.setState({ endDate:  values?.endDate ?  DateTime.toISOStringDate(values?.endDate)  :"" });
    this.setState({ date:  values?.date ?  DateTime.toISOStringDate(values?.date)  :"" });
    this.setState({ startTime:  values?.startTime ? values?.startTime : Url.GetParam("startTime") });
    this.setState({ endTime:  values?.endTime ?  values?.endTime : Url.GetParam("endTime")});
    this.setState({ status:  statusValue ?  statusValue  :"" });
    this.setState({ selectedGstStatus:  values?.gstStatus ? values?.gstStatus?.value  :"" });
    this.setState({ selectedSalesExecutive: values?.salesExecutive ? values?.salesExecutive?.id  :"" });
    this.setState({ selectedShift: values?.shift ? values?.shift?.value  :"" });
    this.setState({ selectedPaymentType: values?.paymentType ? values?.paymentType?.value  :"" });
    this.setState({ selectedType: values?.type ? values?.type?.value  : Url.GetParam("type") });
    this.setState({ selectedFromLocation: values?.fromLocation ? values?.fromLocation?.value  :"" });
    this.setState({ selectedToLocation: values?.toLocation ? values?.toLocation?.value  :"" });
    this.setState({ selectedPaymentAccount: values?.paymentAccount ? values?.paymentAccount?.value  :"" });
    this.setState({ selectedUser: values?.user ? values?.user?.id  :"" });
    this.setState({ selectedReporter: values?.reporter ? values?.reporter?.id  :"" });
    this.setState({ objectName: values?.objectName ? values?.objectName?.value  :"" });
    this.setState({ selectedSprintName: values?.sprint ? values?.sprint?.value  :"" });
    this.setState({ selectedProductTag: values?.productTag ? values?.productTag?.value  :"" });
    this.setState({ selectedVisitorType: values?.visitorType ? values?.visitorType?.value  :"" });
    this.setState({ selectedManufacture: values?.manufacture ? values?.manufacture?.value  :"" });
    this.setState({ selectedReason: values?.reason ? values?.reason?.value  :"" });
    this.setState({ selectedReason: values?.stockType ? values?.stockType?.value  :"" });
    this.setState({ product: values?.product ? values?.product?.id  :"" });
    this.setState({ status_group: values?.status_group ? values?.status_group?.value  :"" });
    this.setState({ show_duplicate: values?.show_duplicate &&  values?.show_duplicate !==undefined ? values?.show_duplicate  :"" });
    this.setState({ selectedProjectId: values?.projectName ? values?.projectName?.value : "" });

  }




  handleDeleteFilter = (removedFilter) => {
    this.setState(removedFilter);
    this.fetchData(...this.getFetchDataParams(removedFilter));
  };

  handleFilter=(values)=>{
    let filterValue = this.getFilterValues(values)
    this.setStateFilterValue(values)
    this.fetchData(
      ...this.getFetchDataParams(filterValue)
      );

  };

  refreshButtonOnClick = (e) => {
    let value = e;
    this.setState({ refreshValue: value });
    this.setState({ spinning: true });
    this.fetchData(
      true,
      Url.GetParam("sort"),
      Url.GetParam("sortDir"),
      "",
      Url.GetParam("account"),
      Url.GetParam("brand"),
      Url.GetParam("category"),
      Url.GetParam("location"),
      Url.GetParam("startDate"),
      Url.GetParam("endDate"),
      Url.GetParam("startTime"),
      Url.GetParam("endTime"),
      Url.GetParam("status")||this?.props?.params?.status ? this?.props?.params?.status: "",
      Url.GetParam("salesExecutive"),
      Url.GetParam("shift"),
      Url.GetParam("paymentType"),
      Url.GetParam("type"),
      Url.GetParam("fromLocation"),
      Url.GetParam("toLocation"),
      Url.GetParam("paymentAccount"),
      Url.GetParam("user"),
      Url.GetParam("objectName"),
      Url.GetParam("tag"),

      Url.GetParam("page") ? Url.GetParam("page") : DEFAULT_PAGE,
      Url.GetParam("reason"),
      Url.GetParam("product"),
      Url.GetParam("stockType"),
      Url.GetParam("search"),
      Url.GetParam("manufacture"),
      Url.GetParam("gstStatus"),
      Url.GetParam("reporter"),
      Url.GetParam("sprint"),
      Url.GetParam("group"),
      Url.GetParam("projectId"),
      Url.GetParam("stockEntryProductType"),
      Url.GetParam("project_id"),
      Url.GetParam("role")||this?.props?.params?.role ? this?.props?.params?.role:"",
      Url.GetParam("date"),
      Url.GetParam("show_duplicate"),
    );
    this.setState({ refreshValue: "" });
    this.setState({ spinning: false });
  };

  // Sort by option
  getSortByOptions(value) {
    const valueArray = this.getSortValueFromLabel(value).split(":");
    const sortBy = valueArray[0];
    const sortDir = valueArray[1];
    const status = Url.GetParam("status");
    this.fetchData(true, sortBy, sortDir, status);
  }

  getSelectedSortLabel() {
    const sortByOptions = this.props.sortByOptions
      ? this.props.sortByOptions
      : this.state.sortByOptions;

    const selectedSortOption = sortByOptions.find(
      (option) => option.value.split(":")[0] === Url.GetParam("sort")
    );

    return selectedSortOption?.label
      ? selectedSortOption?.label
      : sortByOptions[0].label;

    return "";
  }

  getSortValueFromLabel(label) {
    const sortByOptions = this.props.sortByOptions
      ? this.props.sortByOptions
      : this.state.sortByOptions;

    const selectedSortOption = sortByOptions.find(
      (option) => option.value === label
    );

    if (selectedSortOption) {
      return selectedSortOption.value;
    }

    return "";
  }

  // handle status
  handleStatusByChange = (value) => {
    const status1 = this.getStatusValueFromLabel(value);
    this.setState({
      selectedStatusOption: status1
    });
    this.getStatusByOptions(value);
  };

  // get seleted status
  getSelectedStatusLabel() {
    const statusOptions = this.props.statusOptions
      ? this.props.statusOptions
      : this.state.sortByOptions;

    let selectedStatusOption;
    if (this.props.selectedStatus && !this.state.status) {
      selectedStatusOption = statusOptions.find(
        (option) => option.value === this.props.selectedStatus
      );
    } else {
      selectedStatusOption = statusOptions.find(
        (option) => option.value === this.state.selectedStatusOption
      );
    }
    if (selectedStatusOption) {
      return selectedStatusOption.label;
    }

    return "";
  }
  // get status value from label
  getStatusValueFromLabel(label) {
    const statusOptions = this.props.statusOptions
      ? this.props.statusOptions
      : this.state.statusOptions;

    const selectedStatusOption =
      statusOptions && statusOptions.find((option) => option.label === label);

    if (selectedStatusOption) {
      return selectedStatusOption.value;
    }

    return "";
  }

  // status by option
  getStatusByOptions(value) {
    const valueArray = this.getStatusValueFromLabel(value).split(":");
    const status = valueArray;
    this.fetchData(...this.getFetchDataParams({ status: value }));
  }

  // Page size by option
  getPageSizeByOptions(value) {
    const sort = Url.GetParam("sort") || "";
    const sortDir = Url.GetParam("sortDir") || "";
    const status = Url.GetParam("status") || "";
    const searchTerm = Url.GetParam("search") || "";
    this.setState(
      {
        page: 1,
        pageSize: value,
        pageSizeValue: value
      },
      () => {
        this.fetchData(true, sort, sortDir, status);
      }
    );
  }

  // Getting the Brand type options
  getBrandTypeOptions = () => {
    // To list the brands in multi select dropdown
    let brandListOptions = [];
    const { brandList } = this.state;
    if (!brandList) return brandListOptions;

    brandList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        brandListOptions.push({ value: type.id, label: type.name });
      });
    return brandListOptions;
  };

  // Getting the active categories details in the multi select dropdowns.
  getCategoryDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().categoryAPI}/search`);
      const data = response && response.data && response.data.data;
      if (data && data.length > 0) {
        const categories = [];

        data.forEach((category) => {
          if (category.status !== tabConstant.CategoryStatus.INACTIVE)
            categories.push({
              id: category.id,
              name: category.name
            });
        });
        this.setState({ categoryList: categories });
      }
    } catch (error) {}
  };

  // Getting the active brands details in the multi select dropdowns.
  getBrandDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().brandAPI}/search`);
      const data = response && response.data && response.data.data;

      if (data && data.length > 0) {
        const brands = [];
        data.forEach((brand) => {
          if (brand.status !== tabConstant.BrandStatus.INACTIVE)
            brands.push({
              id: brand.id,
              name: brand.name
            });
        });
        this.setState({ brandList: brands });
      }
    } catch (error) {}
  };
  // Getting the category type options
  getCategoryTypeOptions = () => {
    // To list the categories in multi select dropdown
    let categoryListOptions = [];
    let { categoryList } = this.state;

    if (!categoryList) return categoryListOptions;

    categoryList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        categoryListOptions.push({ value: type.id, label: type.name });
      });
    return categoryListOptions;
  };
  storeList = async () => {
    StoreService.list((list) => {
      this.setState({ storeData: list });
    });
  };

  getSalesExecutiveList = async () => {
    const roleData = await getUserRole();
    this.setState({ salesExecutiveOption: roleData });
  };

  paymentType = [
    {
      label: Order.PAYMENT_CASH_TEXT,
      value: Order.PAYMENT_CASH_VALUE
    },
    {
      label: Order.PAYMENT_UPI_TEXT,
      value: Order.PAYMENT_UPI_VALUE
    },
    {
      label: Order.PAYMENT_MIXED_TEXT,
      value: Order.PAYMENT_MIXED_VALUE
    }
  ];

  getSprintList = async () => {
    const response = await SprintService.getSprintList();
    this.setState({ sprintOption: response });
  };
  getBankList = async () => {
    await PaymentAccountService.getList((response, err) => {
      const bankDetails = response?.data?.data;
      let bankList = [];
      bankDetails.forEach((bank) => {
        bankList.push({
          label: bank.payment_account_name,
          value: bank.id
        });
      });
      this.setState({ bankOption: bankList });
    });
  };

  getTagList = async () => {
    let tagList = [];
    const response = await apiClient.get(
      `${endpoints().tagApi}/search?status=${tabConstant.Status.ACTIVE}&pagination=false`
    );
    const productTag = response.data.data;
    if (ArrayList.isNotEmpty(productTag)) {
      productTag.forEach((productTag) => {
        tagList.push({
          id: productTag.id,
          value: productTag.id,
          label: productTag.name
        });
      });
    }
    this.setState({ tagOption: tagList });
  };

  getTransferTypeReason = async () => {
    const data = await TranferTypeReasonService.search();
    let list = [];
    if (data && data.length > 0) {
      data.forEach((values) => {
        list.push({
          value: values && values.id,
          label: values && values.name
        });
      });
    }
    this.setState({ reasonOption: list });
  };

  render() {
    const {
      table,
      id,
      children: columns,
      showHeader = true,
      onRowClick,
      bulkSelect,
      headerButton,
      searchPlaceholder,
      showSearch,
      sortByDropdown,
      refreshButton,
      newTableHeading,
      transformData,
      disableColumnSort,
      sortByOptions,
      icon,
      message,
      subtextMessage,
      noPagination,
      searchBarWidth,
      hideMarginBottom,
      showNoRecord = true,
      noRecordFoundHeight,
      noRecordFoundComponent,
      dropdownLabel,
      showStatusOptions,
      statusOptions,
      showPageSize = true,
      buttonClassName,
      buttonOnClick,
      buttonLabel,
      showRoleFilter,
      setPage,
      showScroll,
      disableHeader,
      showSchedulerJobList,
      showAccountFilter,
      ActionMenu,
      dataList,
      vendorPlaceholder
    } = this.props;

    const listDetails = table[id];
    const isLoading = !listDetails || listDetails.isFetching;
    const { selectedAll, selectedIds, vendorData, statusList, gstStatusList } =
      this.state;

    let data = [];
    let totalCount = 0;
    let currentPage = "";
    let pageSize = "";
    let startPage = "";
    let endPage = "";
    let totalAmount = 0;
    let totalHours = 0;
    let totalCash = 0;
    let totalUpi = 0;
    let totalDiscrepancyCash = 0;
    let totalDiscrepancyUpi = 0;
    let totalDiscrepancyAmount = 0;
    let cashInStore = 0;
    let totalReceivedAmount = 0;
    let totalCalculatedAmount = 0;
    let receivedUpi = 0;
    let receivedCash = 0;
    let calculatedUpi = 0;
    let calculatedCash = 0;
    let totalNetAmount = 0;
    let totalProfitAmount = 0;
    let totalMarginAmount = 0;
    let totalDiscountAmount = 0;
    let totalTaxAmount = 0;
    let totalTaxableAmount = 0;
    if (listDetails) {
      setPage && setPage(listDetails.currentPage);
      currentPage = listDetails.currentPage;
      totalCount = listDetails.totalCount;
      pageSize = listDetails.pageSize;
      data = listDetails[currentPage] || [];
      totalAmount = listDetails.totalAmount;
      totalHours = listDetails.totalHours;
      totalCash = listDetails.totalCash;
      totalUpi = listDetails.totalUpi;
      cashInStore = listDetails.cashInStore;
      totalReceivedAmount = listDetails.totalReceivedAmount;
      totalCalculatedAmount = listDetails.totalCalculatedAmount;
      receivedUpi = listDetails.receivedUpi;
      receivedCash = listDetails.receivedCash;
      calculatedUpi = listDetails.calculatedUpi;
      calculatedCash = listDetails.calculatedCash;
      (totalDiscrepancyCash = listDetails.totalDiscrepancyCash),
        (totalDiscrepancyUpi = listDetails.totalDiscrepancyUpi);
      totalDiscrepancyAmount = listDetails.totalDiscrepancyAmount;
      totalTaxAmount = listDetails.totalTaxAmount;
      totalTaxableAmount = listDetails.totalTaxableAmount;
      totalNetAmount = listDetails.totalNetAmount;
      totalProfitAmount = listDetails.totalProfitAmount;
      totalDiscountAmount = listDetails.totalDiscountAmount;
      totalMarginAmount = listDetails.totalMarginAmount;

      startPage = (currentPage - 1) * pageSize + 1;
      startPage = startPage > totalCount ? totalCount : startPage;

      endPage = currentPage * pageSize;
      endPage = endPage > totalCount ? totalCount : endPage;
    }

    const columnLength = columns.length + (bulkSelect ? 1 : 0);

    if (transformData) {
      data = transformData(data);
    }
    if (showSchedulerJobList) {
      if (
        this.props.schedulerJobList &&
        this.props.schedulerJobList.length > 0
      ) {
        data = this.props.schedulerJobList;
      }
    }

    if (this.props.customTagList) {
      if (this.props.customTagList && this.props.customTagList.length > 0) {
        data = this.props.customTagList;
      }
    }

    if (dataList) {
      data = dataList;
    }
    let statusValue;
    if (
      this.state &&
      (typeof this.state.status === "string" ||
        Array.isArray(this.state.status)) && !this.props.customStatusOption
    ) {
      let arrayValue =
        this.state.status && Array.isArray(this.state.status)
          ? this.state.status
          : this.state.status.split(",");
      let value = [];
      for (let i = 0; i < arrayValue.length; i++) {
        const id = arrayValue[i];
        let multiSelect = statusList.find((data) => data.value == id);
        value.push(multiSelect);
      }
      statusValue = value;
    } else {
      statusValue = this.props.customStatusOption ? this.props.customStatusOption.find((data) => data.value == this.state.status) :  statusList.find((data) => data.value == this.state.status);
 }

    let initialValues = {
      vendor:
        (vendorData &&
          vendorData.find((data) => data.value == Url.GetParam("account"))) ||
        "",
      brand:
        this.state &&
        this.state.brandOption.find(
          (data) => data.value == Url.GetParam("brand")
        ),
      category:
        this.props && this.props.customCategoryOption
          ? this.props.customCategoryOption.find(
              (data) => data.value == Url.GetParam("category")
            )
          : this.state &&
            this.state.categoryOption.find(
              (data) => data.value == Url.GetParam("category")
            ),
      location:
        this.state &&
        this.state.storeData.find(
          (data) => data.value == Url.GetParam("location")
        ),
      startDate:
        DateTime.getDateTimeByUserProfileTimezone(
          Url.GetParam("startDate"),
          "DD-MMM-YYYY"
        ) || "",
      endDate:
        DateTime.getDateTimeByUserProfileTimezone(
          Url.GetParam("endDate"),
          "DD-MMM-YYYY"
        ) || "",
        startTime:
        Url.GetParam("startTime") || "",
    endTime:
        Url.GetParam("endTime") || "",
      date:
        DateTime.getDateTimeByUserProfileTimezone(
          Url.GetParam("date"),
          "DD-MMM-YYYY"
        ) || "",
      status: statusValue ? statusValue :  "",
      gstStatus:
        gstStatusList &&
        gstStatusList.find((data) => data.value == Url.GetParam("gstStatus")),
      salesExecutive:
        this.state &&
        this.state.salesExecutiveOption.find(
          (data) => data.value == Url.GetParam("salesExecutive")
        ),
      shift:
        this.state &&
        this.state.shiftData.find(
          (data) => data.value == Url.GetParam("shift")
        ),
      fromLocation:
        this.state &&
        this.state.storeData.find(
          (data) => data.value == Url.GetParam("fromLocation")
        ),
      toLocation:
        this.state &&
        this.state.storeData.find(
          (data) => data.value == Url.GetParam("toLocation")
        ),
      type:
        this.props && this.props.customTypeOption
          ? this.props.customTypeOption.find(
              (data) => data.value == Url.GetParam("type")
            )
          : this.state &&
            this.state.transferTypeList.find(
              (data) => data.value == Url.GetParam("type")
            ),
      stockEntryProductType:
        this.props && this.props.stockProductTypeOption
          ? this.props.stockProductTypeOption.find(
              (data) => data.value == Url.GetParam("stockEntryProductType")
            )
          : null,

      user:
        this.state &&
        this.state.userOption.find((data) => data?.id == Url.GetParam("user")),
      reporter:
        this.state &&
        this.state.userOption.find(
          (data) => data?.id == Url.GetParam("reporter")
        ),
      sprint:
        this.state &&
        this.state.sprintOption.find(
          (data) => data?.value == Url.GetParam("sprint")
        ),
      objectName:
        ObjectName &&
        ObjectName.Options.find(
          (data) => data.value === Url.GetParam("objectName")
        ),
      productTag:
        this.props && this.props.customTagOption
          ? this.props.customTagOption.find(
              (data) => data.value == Url.GetParam("tag")
            )
          : this.state.tagOption.find(
              (data) => data.value == Url.GetParam("tag")
            ),
            visitorType:
            this.props && this.props.customTagOption
              ? this.props.customTagOption.find(
                  (data) => data.value == Url.GetParam("visitorType")
                )
              : this.state.tagOption.find(
                  (data) => data.value == Url.GetParam("visitorType")
                ),
      manufacture: this.state.tagOption.find(
        (data) => data.value == Url.GetParam("manufacture")
      ),
      paymentAccount: this.state.bankOption.find(
        (data) => data.value == Url.GetParam("paymentAccount")
      ),
      reason:
        this.state &&
        this.state.reasonOption.find(
          (data) => data.value == Url.GetParam("reason")
        ),
      product:
        this.state &&
        this.state.productOption &&
        this.state.productOption.find(
          (data) => data.id == Url.GetParam("product")
        ),
      stockType:
        ActionMenu &&
        ActionMenu.find((data) => data.value == this.state.stockType),
      status_group:
        groupOption &&
        groupOption.find((data) => data.value == Url.GetParam("group")),
      paymentType: this.paymentType.find(
        (data) => data.value == Url.GetParam("paymentType")
      ),
      projectName:
        this.state.projectList &&
        this.state.projectList.find(
          (data) => data?.value == Url.GetParam("project_id")
        )
          ? this.state.projectList &&
            this.state.projectList.find(
              (data) => data?.value == Url.GetParam("project_id")
            )
          : this.state.projectList &&
            this.state.projectList.find(
              (data) => data?.value == Url.GetParam("projectId")
            ),
      role:
        this.props.roleList &&
        this.props.roleList.find((data) => data?.value == Url.GetParam("role")),
        show_duplicate:Url.GetParam("show_duplicate")
    };

    return (
      <div className={`redux-table ${this.props.className}`}>
        <div>
          {/* SearchBar and Filter Component */}
          <Filter
            handleFilter={this.handleFilter}
            handleDeleteFilter={this.handleDeleteFilter}
            showHeader={showHeader}
            disableHeader={disableHeader}
            newTableHeading={newTableHeading}
            showSearch={showSearch}
            //pageSize props
            showPageSize={showPageSize}
            getPageSizeByOptions={(e) => this.getPageSizeByOptions(e)}
            //page search props
            searchBarWidth={searchBarWidth}
            pageSearchValue={this.state.value}
            searchPlaceholder={searchPlaceholder}
            pageSearchOnChange={this.onChange.bind(this)}
            onKeyPress={(e) => this.onSearchKeyPress(e)}
            onSearchClick={this.onSearchClick.bind(this)}
            sortByDropdown={sortByDropdown}
            dropdownLabel={dropdownLabel}
            getSelectedSortLabel={this.getSelectedSortLabel()}
            sortByOptions={sortByOptions}
            handleSortByChange={this.handleSortByChange}
            //refresh button
            refreshButton={refreshButton}
            refreshButtonOnClick={this.refreshButtonOnClick}
            refreshValue={this.state.refreshValue}
            spinning={this.state.spinning}
            showRoleFilter={showRoleFilter}
            roleLists={this.props.roleList}
            buttonLabel={buttonLabel}
            buttonOnClick={buttonOnClick}
            buttonClassName={buttonClassName}
            // Filters
            initialValues={initialValues}
            // Date Filter
            showDateFilter={this.props.showDateFilter}
            showTimeFilter = {this.props.showTimeFilter}
            showSingleDateFilter={this.props.showSingleDateFilter}
            //Brand Filter
            showBrandFilter={this.props.showBrandFilter}
            brandOption={(x) => this.setState({ brandOption: x })}
            //Category Filter
            showCategoryFilter={this.props.showCategoryFilter}
            categoryList={(x) => this.setState({ categoryOption: x })}
            //Product Filter
            showProductFilter={this.props.showProductFilter}
            productOption={(x) => this.setState({ productOption: x })}
            brandValue={this.state.brand}
            categoryValue={this.state.category}
            // Vendor Filter props
            vendorPlaceholder={vendorPlaceholder}
            showAccountFilter={showAccountFilter}
            accountCustomOption={this.props.accountCustomOption}
            vendorList={(x) => this.setState({ vendorData: x })}
            //Location Filter Props
            showStoreFilter={this.props.showStoreFilter}
            showStockEntryProductTypeFilter={
              this.props.showStockEntryProductTypeFilter
            }
            stockProductTypeOption={this.props.stockProductTypeOption}
            StoreList={(e) => this.setState({ storeData: e })}
            //Status Filter props
            showStatusFilter={this.props.showStatusFilter}
            customStatusOption={this.props.customStatusOption}
            statusOption={(x) => this.setState({ statusList: x })}
            objectName={this?.props?.params?.objectName}
            isMultiSelect={this.props.isMultiSelect}
            showGstStatusFilter={this.props.showGstStatusFilter}
            gstStatusOption={(x) => this.setState({ gstStatusList: x })}
            showSalesExecutiveFilter={this.props.showSalesExecutiveFilter}
            salesExecutiveOption={this.state.salesExecutiveOption}
            // Shift Filter
            showShiftFilter={this.props.showShiftFilter}
            shiftOption={(x) => this.setState({ shiftData: x })}
            //Payment Filter
            showProjectFilter={this.props.showProjectFilter}
            setProjectList={(e) => this.setState({ projectList: e })}
            showPaymentTypeFilter={this.props.showPaymentTypeFilter}
            paymentType={this.paymentType}
            //Type Filter
            showTypeFilter={this.props.showTypeFilter}
            typeOption={(x) => this.setState({ transferTypeList: x })}
            customTypeOption={this.props.customTypeOption}
            typeIsclearable={this.props.typeIsclearable}             
            // FromToStore Props
            showFromToLocationFilter={this.props.showFromToLocationFilter}
            storeData={this.state.storeData}
            // Payment Account props
            showPaymentAccountFilter={this.props.showPaymentAccountFilter}
            bankOption={this.state.bankOption}
            // User Filter Props
            showUserFilter={this.props.showUserFilter}
            userList={(x) => this.setState({ userOption: x })}
            params={this.props.userType}
            assigneePlaceholder={this.props.assigneePlaceholder}
            showReporterFilter={this.props.showReporterFilter}
            reporterList={(x) => this.setState({ userOption: x })}
            // ObjectName Filter
            ShowObjectNameFilter={this.props.ShowObjectNameFilter}
            objectNameOptions={ObjectName.Options}
            showSprintFilter={this.props.showSprintFilter}
            sprintOptions={this.state.sprintOption}
            //ProductTag Filter
            showTagFilter={this.props.showTagFilter}
            showVisitorTypeFilter={this.props.showVisitorTypeFilter}
            customTagOption={this.props.customTagOption}
            tagParams={this.props.tagFilterType}
            tagPlaceholder={this.props.tagPlaceholder}
            showManufactureFilter={this.props.showManufactureFilter}
            //Status Filter
            showStatusOptions={showStatusOptions}
            getSelectedStatusLabel={this.getSelectedStatusLabel()}
            statusOptions={statusOptions}
            groupOption={this.state.groupList}
            handleStatusByChange={this.handleStatusByChange}
            // Reason Filter
            showReasonFilter={this.props.showReasonFilter}
            reasonOption={this.state.reasonOption}
            // Stock Filter
            showStockFilter={this.props.showStockFilter}
            ActionMenu={ActionMenu}
            //Status Group Select
            showStatusGroupFilter={this.props.showStatusGroupFilter}
            showCheckBox={this.props.showCheckBox}
          />

          <div className={showScroll ? "scroll" : ""}>
            <Table
              hover
              responsive
              className={`table-outline,   ${hideMarginBottom ? "mb-0" : ""}`}>
              <thead className="thead-light">
                <tr>
                  {bulkSelect && (
                    <th
                      style={{ width: 12, paddingLeft: 8 }}
                      className="align-middle">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={this.toggleSelectAll.bind(this, data)}
                      />
                    </th>
                  )}
                  {React.Children.map(columns, (x) => {
                    // TODO: Santhosh, let"s have the "selected" class applied when you click on the TH for the filterings.
                    return (
                      x &&
                      showHeader && (
                        <th
                          style={{
                            minWidth: x.props.minWidth ? x.props.minWidth : "",
                            maxWidth: x.props.maxWidth ? x.props.maxWidth : ""
                          }}
                          className={`${
                            x.props.sortBy !== ""
                              ? "cursor-pointer text-center"
                              : ""
                          } ${x.props.className}`}
                          onClick={() => {
                            return !disableColumnSort && !x.props.disableOnClick
                              ? this.columnSortBy(x.props.sortBy)
                              : false;
                          }}
                          colSpan={x.props.colspan}>
                          {x.props.children}
                          {!disableColumnSort && !x.props.disableOnClick ? (
                            x.props.sortBy === this.state.sortBy ? (
                              this.state.isActive ? (
                              <FontAwesomeIcon  style={{
                                  width: "10px",
                                }} icon={faChevronUp}/>
                              ) : (
                                <FontAwesomeIcon  style={{
                                  width: "10px",
                                }} icon={faChevronDown}/>
                              )
                            ) : (
                              <FontAwesomeIcon  style={{
                                  width: "10px",
                                }} icon={faChevronDown}/>
                            )
                          ) : (
                            ""
                          )}
                        </th>
                      )
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((list, key) => {
                  return (
                    <tr key={key}>
                      {bulkSelect && (
                        <td
                          style={{ paddingRight: 0 }}
                          className="align-middle">
                          <input
                            type="checkbox"
                            value={
                              this.props.customCheckBoxId
                                ? list[this.props.customCheckBoxId]
                                : list.id
                            }
                            onChange={this.toggleSelect.bind(this, data)}
                            checked={
                              selectedIds.indexOf(
                                this.props.customCheckBoxId
                                  ? list[this.props.customCheckBoxId]
                                  : list.id
                              ) >= 0
                            }
                          />
                        </td>
                      )}
                      {React.Children.map(columns, (x) => {
                        return (
                          x && (
                            <td
                              className={`align-middle ${x.props.className} ${
                                onRowClick && !x.props.disableOnClick
                                  ? "cursor-pointer"
                                  : ""
                              } ${
                                x.props.type && x.props.type === "link"
                                  ? "text-primary text-underline cursor-pointer"
                                  : ""
                              }`}
                              onClick={() =>
                                x.props.isClickable === "true" &&
                                onRowClick &&
                                !x.props.disableOnClick
                                  ? x.props.onLinkClick
                                    ? x.props.onLinkClick(list)
                                    : onRowClick(list)
                                  : null
                              }
                              style={{
                                maxWidth: x.props.width ? x.props.width : "",
                                ...(x.props.field &&
                                  x.props.field.toLowerCase() === "action" && {
                                    width: "90px"
                                  })
                              }}>
                              {x.props.field !== "action"
                                ? x.props.renderField
                                  ? x.props.renderField(list)
                                  : list[x.props.field]
                                : x.props.element}
                            </td>
                          )
                        );
                      })}
                    </tr>
                  );
                })}
                {isLoading ? (
                  <Spinner />
                ) : !noRecordFoundComponent ? (
                  data.length === 0 && !icon && showNoRecord ? (
                    <tr>
                      <td
                        className="text-center"
                        colSpan={columnLength >= 2 ? columnLength : 2}>
                        <NoRecordsFound
                          middleHeight={noRecordFoundHeight}
                          showMessage={true}
                          hideCard={true}
                          message="No Records Found"
                        />
                      </td>
                    </tr>
                  ) : data.length === 0 && icon ? (
                    <tr>
                      <td
                        className="align-middle"
                        colSpan={columnLength}
                        height="400px">
                        <div className="d-flex flex-column align-items-center">
                          {icon}
                          <strong>No records found</strong>
                          <span> {message ? message : ""} </span>
                          <span> {subtextMessage ? subtextMessage : ""} </span>
                        </div>
                      </td>
                    </tr>
                  ) : null
                ) : (
                  data.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={columnLength}>
                        {noRecordFoundComponent}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>

          <div className="bg-white ">
            {this.props.totalProductCount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Product Count: {totalCount ? totalCount : 0}
                </div>
              </div>
            )}

            {this.props.orderCashAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Cash Amount:{" "}
                  {Currency.Format(
                    this.props.orderCashAmount ? this.props.orderCashAmount : 0
                  )}
                </div>
              </div>
            )}
            {this.props.orderUpiAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Upi Amount:{" "}
                  {Currency.Format(
                    this.props.orderUpiAmount ? this.props.orderUpiAmount : 0
                  )}
                </div>
              </div>
            )}
            {this.props.OrderTotalAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Amount:{" "}
                  {Currency.Format(
                    this.props.OrderTotalAmount
                      ? this.props.OrderTotalAmount
                      : 0
                  )}
                </div>
              </div>
            )}
            {this.props.totalTaxableAmount && (
                <div className="col d-flex m-2 font-weight-bold justify-content-right">
                  Total Taxable Amount:{" "}
                  {Currency.Format(totalTaxableAmount ? totalTaxableAmount : 0)}
                </div>
            )}
             {this.props.totalTaxAmount && (
             
             <div className="col d-flex m-2 font-weight-bold justify-content-right">
               Total Tax Amount:{" "}
               {Currency.Format(totalTaxAmount ? totalTaxAmount : 0)}
             </div>
         )}
         {this.props.purchaseProducttotalAmount && (
          <div className="col d-flex m-2 font-weight-bold justify-content-right">
                  Total Amount: {Currency.Format(totalAmount ? totalAmount : 0)}
                </div>

         )
}
            {this.props.totalAmount && (
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Amount: {Currency.Format(totalAmount ? totalAmount : 0)}
                </div>
            )}
            {this.props.totalHours && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Hours: {totalHours ? totalHours : 0}
                </div>
              </div>
            )}

            {this.props.cashInStore && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Cash In Location: {Currency.Format(cashInStore)}
                </div>
              </div>
            )}
            {this.props.totalCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Reported Cash: {Currency.Format(totalCash)}
                </div>
              </div>
            )}
            {this.props.totalUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Reported Upi: {Currency.Format(totalUpi)}
                </div>
              </div>
            )}
            {this.props.totalCalculatedAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Calculated Amount:{" "}
                  {Currency.Format(totalCalculatedAmount)}
                </div>
              </div>
            )}
            {this.props.calculatedCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Calculated Cash: {Currency.Format(calculatedCash)}
                </div>
              </div>
            )}
            {this.props.calculatedUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Calculated Upi: {Currency.Format(calculatedUpi)}
                </div>
              </div>
            )}
            {this.props.totalDiscrepancyAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Discrepancy: {Currency.Format(totalDiscrepancyAmount)}
                </div>
              </div>
            )}
            {this.props.totalDiscrepancyCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Discrepancy Cash: {Currency.Format(totalDiscrepancyCash)}
                </div>
              </div>
            )}
            {this.props.totalDiscrepancyUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Discrepancy Upi: {Currency.Format(totalDiscrepancyUpi)}
                </div>
              </div>
            )}
            {this.props.totalReceivedAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Received Amount: {Currency.Format(totalReceivedAmount)}
                </div>
              </div>
            )}
            {this.props.receivedCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Received Cash: {Currency.Format(receivedCash)}
                </div>
              </div>
            )}
            {this.props.receivedUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Received Upi: {Currency.Format(receivedUpi)}
                </div>
              </div>
            )}
            {this.props.totalNetAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Net Amount:{" "}
                  {Currency.Format(totalNetAmount ? totalNetAmount : 0)}
                </div>
              </div>
            )}
            {this.props.totalProfitAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Profit Amount:{" "}
                  {Currency.Format(totalProfitAmount ? totalProfitAmount : 0)}
                </div>
              </div>
            )}
             {this.props.orderProductTotalAmount && (
                <div className="col d-flex m-2 font-weight-bold ">
                  Total Amount: {Currency.Format(totalAmount ? totalAmount : 0)}
                </div>
            )}
            {this.props.orderProductTotalProfitAmount && (
                <div>
                  <div className="col d-flex m-2 font-weight-bold">
                    Total Profit Amount:{" "}
                    {Currency.Format(totalProfitAmount ? totalProfitAmount : 0)}
                  </div>
                </div>

            )}
            {this.props.totalMarginAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold justify-content-end">
                  Total Margin Amount:{" "}
                  {Currency.Format(totalMarginAmount ? totalMarginAmount : 0)}
                </div>
              </div>
            )}
            {this.props.totalDiscountAmount && (
                <div className="col-4 d-flex m-2 font-weight-bold">
                  Total Discount Amount:{" "}
                  {Currency.Format(
                    totalDiscountAmount ? totalDiscountAmount : 0
                  )}
                </div>
            )}
           
             
          </div>
          {totalCount > 0 && !noPagination && (
            <Row>
              <Col>
                Showing {startPage} to {endPage} of {totalCount} entries
              </Col>

              <Col>
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.onPageChange.bind(this)}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    table: state.table
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList, setTablePage }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTable);