import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import PageTitle from "../../components/PageTitle";
import AddModal from "../../components/Modal";
import Button from "../../components/Button";
import DeleteModal from "../../components/DeleteModal";
import SaleSettlementForm from "./components/saleSettlementForm";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import AddButton from "../../components/AddButton";
import { fetchList } from "../../actions/table";
// Config
import { getStoresList } from "../../services/StoreListService";

// Helpers
import { PAGESIZE, SORT_DIR, PAGE } from "../../helpers/Status";
import * as Constants from "../../helpers/SaleSettlement";
import Cookie from "../../helpers/Cookie";

// Lib
import Url, { UpdateUrl } from "../../lib/Url";
import Cookies, { setCookie } from "../../lib/Helper";
import Currency from "../../lib/Currency";
import Number from "../../lib/Number";
import ArrayList from "../../lib/ArrayList";
import String from "../../lib/String";
import SaleSettlementList from "./components/saleSettlementList";
import ShiftService from "../../services/ShiftService";
import CompanyUserService, {
  Role,
  getUserRoleDetails,
} from "../../services/UserService";
import ObjectName from "../../helpers/ObjectName";
import SaleSettlementService from "../../services/SaleSettlementService";
import { UserType } from "../../helpers/UserType";
import DateTime from "../../lib/DateTime";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";

const Tab = {
  DRAFT: "Draft",
  REVIEW: "Review",
  ALL: "All",
};

const draftSaleSettlement = "draftSaleSettlement";
const reviewSaleSettlement = "reviewSaleSettlement";
const allSaleSettlement = "allSaleSettlement";

const index = (props) => {
  const {
    history,
    draftCurrentPage,
    draftCurrentPageSize,
    reviewCurrentPage,
    reviewCurrentPageSize,
    allCurrentPageSize,
    allCurrentPage,
  } = props;
  // Defining the param based on url search values
  const Param = new URLSearchParams(props.history.location.search);
  // Defining the clicked tab value from section in url
  const role = Param.get("section");
  const [isOpen, setIsOpen] = useState(false);
  const [storeOpt, setStoreOpt] = useState([]);
  const [saleSettlementId, setSaleSettlementId] = useState();
  const [salesExecutive, setSalesExecutive] = useState([]);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [param, setParam] = useState({});
  const [currentPage, setCurrentPage] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [resetValue, setResetValue] = useState(false);
  const [arrays, setArray] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [amountCash, setAmountCash] = useState(null);
  const [amountUpi, setAmountUpi] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const [amount_cash, setCash] = useState();
  const [amount_upi, setUpi] = useState();
  const [location, setName] = useState();
  const [shift, setShift] = useState();
  const [sales_executive, setsalesExecutive] = useState([]);
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const [saleSettlementData, setSaleSettlementData] = useState("");
  const [currentData, setCurrentData] = useState();
  const [activeTab, setActiveTab] = useState(role ? role : Tab.ALL);
  const [status, setStatus] = useState("");
  const [officeData, setOfficeData] = useState();

  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value));
  const [cashInStore, setCashInStore] = useState();
  const [shiftList, setShiftList] = useState("");
  const [rowValue, setRowValue] = useState();
  const [isSubmit, setIsSubmit] = useState();
  //Sort By Option Values
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "date:ASC",
      label: "Date",
    },
  ];

  // Toggle model
  const toggle = (Tab) => {
    setIsOpen(!isOpen);
    setAmountCash("");
    setAmountUpi("");
    setTotalAmount("");
    setCashInStore("");
    setShift("");
    setsalesExecutive("");
    setCashInStore("");
    setName("");
    setOfficeData("");
  };

  const getShift = async () => {
    const list = await ShiftService.getShiftLists();
    setShiftList(list);
  };

  const getParamsStatus = () => {
    const status = Url.GetParam("section");
    setStatus({ status });
  };

  const onCashChange = (e) => {
    const cashAmount = e.values.amount_cash ? e.values.amount_cash : " ";
    let totalAmounts =
      (Currency.Get(cashAmount) ? Currency.Get(cashAmount) : null) +
      Currency.Get(amountUpi ? amountUpi : rowValue.amount_upi);
      setTotalAmount(totalAmounts);
    
    setAmountCash(cashAmount);
    setCash(cashAmount);
  };

  const onUpiChange = (e) => {
    const upiAmount = e.values.amount_upi ? e.values.amount_upi : " ";
    let total_amount =
      (Currency.Get(upiAmount) ? Currency.Get(upiAmount) : null) +
      Currency.Get(amountCash ? amountCash : rowValue.amount_cash);
    setTotalAmount(total_amount);
    setAmountUpi(upiAmount);
    setUpi(upiAmount);
  };

  const onStoreChange = (e) => {
    const locationName = e?.id ? e?.id : "";
    setName(locationName);
  };

  const onShiftChange = (e) => {
    const shiftValue = e.values.shift.id;
    setShift(shiftValue);
  };

  const onSalesExecutiveChange = (e) => {
    const sales_executive = e.values.salesExecutive.value;
    setsalesExecutive(sales_executive);
  };

  const onStoreCashChange = (e) => {
    const storeCash = e.values.cash_in_store ? e.values.cash_in_store : " ";
    setCashInStore(storeCash);
  };

  const onDateChange = (e) => {
    setDate(e);
  };

  const onCashToOfficeChange = (x) => {
    const data = x.values.cash_to_office;
    setOfficeData(data);
  };
 

  // Initial values
  const initialValues = {
    location:
    location ? storeOpt.find((data) => data.id == location ):storeOpt.find((data) => data.id ==  rowValue?.storeId ),
    date: date
      ? date
      : rowValue?.date
      ? rowValue?.date
      : Cookies.get(Cookie.SALE_DATE) ||
        DateTime.getTodayDateByUserTimeZone(new Date()),
    shift:
      shiftList && shiftList.length > 0
        ? shiftList.find((data) => data.id == shift|| rowValue?.shiftId 
        )
        : shiftList &&
          shiftList.find(
            (data) => data.value == Cookies.get(Cookie.SALE_SHIFT)
          ),
          amount_cash: amountCash ? amountCash : rowValue?.amount_cash,
    amount_upi: amountUpi ? amountUpi : rowValue?.amount_upi,
    salesExecutive: sales_executive
      ? salesExecutive && salesExecutive.find(
          (data) => data.value ==  sales_executive
        )
      : salesExecutive && salesExecutive.find(
        (data) => data.value ==   rowValue?.sales_executive
      ),
    notes: "",
    total_amount: totalAmount ? totalAmount : rowValue?.total_amount,
    cash_in_store:
       cashInStore ? cashInStore :  rowValue?.cash_in_store,
    cash_to_office: officeData ?officeData:rowValue?.cash_to_office,
    notes: rowValue?.notes ? rowValue?.notes : "",
  };

  // Get location list
  const storeList = async () => {
    try {
      let storeLists = [];
      const stores = await getStoresList();
      if (ArrayList.isNotEmpty(stores)) {
        stores.forEach((location) => {
          storeLists.push({
            id: location.id,
            label: location.label,
            value: location.label,
            name: location.label,
          });
        });
      }
      setStoreOpt(storeLists);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserRoleValue = async () => {
    let userType=UserType.SALES_EXECUTIVE
    const response = await CompanyUserService.list({userType})
    const roleDetail = response.data;

    const data = [];
    roleDetail &&
      roleDetail.length > 0 &&
      roleDetail.forEach((list) => {
        data.push({
          label: list.first_name + " " + list.last_name,
          value: list.id,
        });
      });
    setSalesExecutive(data);
  };

  // Handle Column Sort
  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.SALE_SETTLEMENT, arrayList);
    setArray(array);
    setArrayList(array);
  };

  // Status Options
  const FieldLabel = [
    {
      value: Constants.FieldLabel.CALCULATED_AMOUNT_CASH,
      label: Constants.FieldLabel.CALCULATED_AMOUNT_CASH,
    },
    {
      value: Constants.FieldLabel.CALCULATED_AMOUNT_UPI,
      label: Constants.FieldLabel.CALCULATED_AMOUNT_UPI,
    },
    {
      value: Constants.FieldLabel.RECEIVED_AMOUNT_CASH,
      label: Constants.FieldLabel.RECEIVED_AMOUNT_CASH,
    },
    {
      value: Constants.FieldLabel.RECEIVED_AMOUNT_UPI,
      label: Constants.FieldLabel.RECEIVED_AMOUNT_UPI,
    },

    {
      value: Constants.FieldLabel.DISCREPANCY_AMOUNT_CASH,
      label: Constants.FieldLabel.DISCREPANCY_AMOUNT_CASH,
    },
    {
      value: Constants.FieldLabel.DISCREPANCY_AMOUNT_UPI,
      label: Constants.FieldLabel.DISCREPANCY_AMOUNT_UPI,
    },
    {
      value: Constants.FieldLabel.AMOUNT_CASH,
      label: Constants.FieldLabel.AMOUNT_CASH,
    },
    {
      value: Constants.FieldLabel.AMOUNT_UPI,
      label: Constants.FieldLabel.AMOUNT_UPI,
    },
    {
      value: Constants.FieldLabel.TOTAL_CALCULATED_AMOUNT,
      label: Constants.FieldLabel.TOTAL_CALCULATED_AMOUNT,
    },
    {
      value: Constants.FieldLabel.TOTAL_RECEIVED_AMOUNT,
      label: Constants.FieldLabel.TOTAL_RECEIVED_AMOUNT,
    },
    {
      value: Constants.FieldLabel.CASH_IN_LOCATION,
      label: Constants.FieldLabel.CASH_IN_LOCATION,
    },
    {
      value: Constants.FieldLabel.CASH_TO_OFFICE,
      label: Constants.FieldLabel.CASH_TO_OFFICE,
    },
  ];

  useEffect(() => {
    storeList();
    getShift();
    getUserRoleValue();
    getParamsStatus();
    const checkedList = Cookies.get(Cookie.SALE_SETTLEMENT);
    const checkedLists = checkedList ? JSON.parse(checkedList) : checkedList;
    if (checkedLists) {
      setArrayList(checkedLists);
      setArray(checkedLists);
    }

    const { page, pageSize, sort, sortDir } = getParams();

    const data = {
      page,
      pageSize,
      sort,
      sortDir,
    };

    setParam(data);
  }, []);

  // get params
  const getParams = () => {
    const selectedPageSize = Url.GetParam("pageSize");
    const pageSize = selectedPageSize ? selectedPageSize : PAGESIZE;
    const selectedSort = Url.GetParam("sort");
    const sort = selectedSort ? selectedSort : "id";
    const selectedSortDir = Url.GetParam("sortDir");
    const sortDir = selectedSortDir ? selectedSortDir : SORT_DIR;
    const searchTerm = Url.GetParam("search");
    const search = String.Get(searchTerm);
    const selectedPage = Url.GetParam("page");
    const page = selectedPage ? selectedPage : "";
    const data = {
      pageSize,
      sort,
      sortDir,
      search,
      page,
      objectName: ObjectName.SALE_SETTLEMENT,
    };

    return data;
  };

  const saleSettlementForm = (
    <SaleSettlementForm
      location={storeOpt}
      salesExecutive={salesExecutive}
      shiftList={shiftList}
      showDiscrepancy={false}
      showCalculatedAmount={false}
      showReceivedAmount={false}
      showMediaTab={false}
      onCashChange={onCashChange}
      onUpiChange={onUpiChange}
      addSaleSettlementForm={true}
      showCashInStore={true}
      onStoreCashChange={onStoreCashChange}
      onStoreChange={onStoreChange}
      onShiftChange={onShiftChange}
      onSalesExecutiveChange={onSalesExecutiveChange}
      onDateChange={onDateChange}
      onCashToOfficeChange={onCashToOfficeChange}
    />
  );

  const addSaleSettlementFooter = (
    <SaveButton
      type="submit"
      label={rowValue && rowValue?.id ? "Save" : "Add"}
      className="h6-5-important"
      loading={isSubmit == false}
    />
  );

  // Function to handle form submit
  const handleSubmit = async (values) => {
    setIsSubmit(false);
    // Form data
    const data = new FormData();
    // location id
    data.append("storeId", values?.location?.id);

    // date
    data.append("date", values?.date);

    // Shift
    data.append("shift", values?.shift.id);

    // Amount_cash
    data.append("amount_cash", Currency.Get(values.amount_cash));

    //Amount_upi
    data.append("amount_upi", Currency.Get(values.amount_upi));

    // SalesExecutive
    data.append(
      "salesExecutive",
      values &&
        values.salesExecutive.value &&
        Number.Get(values.salesExecutive.value)
    );

    // Notes
    data.append("notes", values.notes);

    data.append("total_amount", Currency.Get(values.total_amount));

    data.append(
      "cash_in_store",
      Currency.Get(cashInStore ? cashInStore : values.cash_in_store)
    );
    data.append(
      "cash_to_office",
      Currency.Get(officeData ? officeData : values.cash_to_office)
    );

    if (rowValue.id) {
      dispatch(
        await SaleSettlementService.update(
          rowValue?.id,
          data,
          { pagination: true, sort: "id", sortDir: "DESC" },
          toggle,setIsSubmit
        )
      );
    } else {
      dispatch(
        await SaleSettlementService.create(
          data,
          { pagination: true, sort: "id", sortDir: "DESC" },
          (res) => {
            if (res) {
              toggle();
            }
          }
        )
      );
    }
    setIsSubmit(true);
    setCookie(Cookie.SALE_SHIFT, values?.shift?.value);
    setCookie(Cookie.SALE_DATE, values?.date);
    setCookie(Cookie.SALE_TYPE, values?.type);
    setCookie(Cookie.SALE_STORE, values?.location?.value);
  };
  const handleDelete = async (id) => {
    dispatch(
      await SaleSettlementService.delete(
        id,
        {
          pagination: true,
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          page: currentPage,
          pageSize: Url.GetParam("pageSize") || "",
        },
        draftCurrentPageSize,
        draftCurrentPage,
        reviewCurrentPageSize,
        reviewCurrentPage,
        allCurrentPage,
        allCurrentPageSize
      )
    );
    setIsDeleteModel(false);
  };

  // Handle Reset
  const handleReset = async () => {
    setResetValue(true);
    setParam("");
    dispatch(await SaleSettlementService.search());
    Url.UpdateUrl({ location: "", shift: "", salesExecutive: "" }, props);
  };

  // Handle Close
  const handleClose = () => {
    toggleSidebar();
    setParam("");
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Delete Sales"
        id={saleSettlementId}
        label={saleSettlementData}
        deleteFunction={handleDelete}
      />

      {/* <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Sale Settlement"
        modalBody={saleSettlementForm}
        modalFooter={addSaleSettlementFooter}
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        hideDefaultButtons
      /> */}
      <Drawer
        modelTitle={
          rowValue?.id ? "Edit Sale Settlement" : "Add Sale Settlement"
        }
        DrawerBody={saleSettlementForm}
        DrawerFooter={addSaleSettlementFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={initialValues}
        handleOpenModal={toggle}
        handleCloseModal={toggle}
        handleDrawerClose={toggle}
        isModalOpen={isOpen}
        enableReinitialize
      />
      <div className="row mx-1 justify-content-between">
        <PageTitle label="Sale Settlements" />
        <div className="d-flex">
          <AddButton
            className=" ml-3 mr-1"
            label="Add New"
            onClick={(e) => {
              setRowValue("");
              toggle();
            }}
          />
          {/* Column Sort Option */}
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
        <SaleSettlementList
          id="SaleSettlement"
          arrays={arrays}
          sortByOption={sortByOption}
          history={history}
          objectName={ObjectName.SALE_SETTLEMENT}
          setIsDeleteModel={setIsDeleteModel}
          setCurrentPage={setCurrentPage}
          setCurrentData={setCurrentData}
          setSaleSettlementId={setSaleSettlementId}
          setSaleSettlementData={setSaleSettlementData}
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          allCurrentPage={allCurrentPage}
          allCurrentPageSize={allCurrentPageSize}
          setRowValue={setRowValue}
          toggle={toggle}
        />
      </div>
    </>
  );
};
function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get active brands count
  const DraftSaleSettlement =
    reduxTable[draftSaleSettlement] &&
    reduxTable[draftSaleSettlement].isFetching == false
      ? reduxTable[draftSaleSettlement].totalCount
      : 0;

  // Get inactive brans count
  const ReviewSaleSettlement =
    reduxTable[reviewSaleSettlement] &&
    reduxTable[reviewSaleSettlement].isFetching == false
      ? reduxTable[reviewSaleSettlement].totalCount
      : 0;

  // Get AllBrand count
  const AllSaleSettlement =
    reduxTable[allSaleSettlement] &&
    reduxTable[allSaleSettlement].isFetching == false
      ? reduxTable[allSaleSettlement].totalCount
      : 0;

  // Draft
  const draftCurrentPage =
    reduxTable["draftSaleSettlement"] &&
    !reduxTable["draftSaleSettlement"].isFetching
      ? reduxTable["draftSaleSettlement"].currentPage
      : 1;

  const draftCurrentPageSize =
    reduxTable["draftSaleSettlement"] &&
    !reduxTable["draftSaleSettlement"].isFetching
      ? reduxTable["draftSaleSettlement"].pageSize
      : 25;

  // Draft
  const reviewCurrentPage =
    reduxTable["reviewSaleSettlement"] &&
    !reduxTable["reviewSaleSettlement"].isFetching
      ? reduxTable["reviewSaleSettlement"].currentPage
      : 1;

  const reviewCurrentPageSize =
    reduxTable["reviewSaleSettlement"] &&
    !reduxTable["reviewSaleSettlement"].isFetching
      ? reduxTable["reviewSaleSettlement"].pageSize
      : 25;

  // Draft
  const allCurrentPage =
    reduxTable["allSaleSettlement"] &&
    !reduxTable["allSaleSettlement"].isFetching
      ? reduxTable["allSaleSettlement"].currentPage
      : 1;

  const allCurrentPageSize =
    reduxTable["allSaleSettlement"] &&
    !reduxTable["allSaleSettlement"].isFetching
      ? reduxTable["allSaleSettlement"].pageSize
      : 25;

  return {
    DraftSaleSettlement,
    ReviewSaleSettlement,
    AllSaleSettlement,
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
export default connect(mapStateToProps, mapDispatchToProps)(index);
