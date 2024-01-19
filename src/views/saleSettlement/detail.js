import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// Components
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Spinner from "../../components/Spinner";
import StatusComponent from "../../components/Status";
import Toast from "../../components/Toast";
import Urls from "../../helpers/Url";
import Currency from "../../lib/Currency";
import SaleSettlementForm from "./components/saleSettlementForm";

// Lib
import ArrayList from "../../lib/ArrayList";

// Api
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import { getStoresList } from "../../services/StoreListService";
import CompanyUserService, { Role } from "../../services/UserService";

// Constants
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import { User } from "../../helpers/User";
import { UserType } from "../../helpers/UserType";
import DateTime from "../../lib/DateTime";
import { isBadRequest, SUCCESS_RESPONSE } from "../../lib/Http";
import Number from "../../lib/Number";
import String from "../../lib/String";
import SaleSettlementService from "../../services/SaleSettlementService";
import ShiftService from "../../services/ShiftService";
import StatusService from "../../services/StatusService";
import { hasPermission } from "../../services/UserRolePermissionService";
import Button from "../../components/Button";
//Lib

/* Sale Settlement tabs */
const Tab = { DETAIL: "Detail", PRODUCTS: "Products", HISTORY: "History" };

const Detail = (props) => {
  const { history } = props;
  const [location, setStore] = useState([]);
  const [detail, setDetail] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [salesExecutive, setSalesExecutive] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amountCash, setAmountCash] = useState();
  const [amountUpi, setAmountUpi] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [amount_cash, setCash] = useState();
  const [amount_upi, setUpi] = useState();
  const [location_name, setLocationName] = useState();
  const [shift, setShift] = useState();
  const [sales_executive, setsalesExecutive] = useState("");
  const [totalCaculatedAmount, setCalculatedTotalAmount] = useState();
  const [cashCalculated, setCalculatedAmountCash] = useState();
  const [upiCalculated, setCalculatedAmountUpi] = useState();
  const [cashReceived, setReceivedAmountCash] = useState();
  const [upiReceived, setReceivedAmountUpi] = useState();
  const [totalReceivedAmount, setReceivedTotalAmount] = useState();
  const [date, setDate] = useState();
  const [cashInStore, setCashInStore] = useState();
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState();
  const [PermissionList, setPermissionList] = useState();
  const [productCount, setProductCount] = useState();
  const [shiftList, setShiftList] = useState("");
  const [statusSelected, setStatus] = useState("");
  const [inActiveSaleExecutive, setInActiveSaleExecutive] = useState([]);
  const [cashToOffice, setCashToOffice] = useState();
  const Param = new URLSearchParams(props.history.location.search);
  const tab = Param.get("tab");
  const [activeTab, setActiveTab] = useState(tab ? tab : Tab.DETAIL);
 const [editable,setEditable]= useState(true);

  let showHistory = hasPermission(Permission.SALE_SETTLEMENT_HISTORY_VIEW)

  let showEditButton = hasPermission(Permission.SALE_SETTLEMENT_EDIT)
  const dispatch = useDispatch();
  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    { label: "Sale Settlements", link:Urls.SALES_SETTLEMENT_LIST },
    { label: "Sale Settlement Detail", link: "" },
  ];
  // Sales entry id
  const id = props.match.params.id;

  const storeList = async () => {
    try {
      let storeListArray = [];
      const stores = await getStoresList();
      if (ArrayList.isNotEmpty(stores)) {
        stores.forEach((location) => {
          storeListArray.push({
            id: location.id,
            label: location.label,
            value: location.label,
          });
        });
      }
      setStore(storeListArray);
    } catch (err) {
      console.log(err);
    }
  };

  //   Get Status List
  const getStatusDetail = async (id) => {
    const data = await StatusService.get(id);

    setStatus(data?.data.name);
  }

  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
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

    const lists = await apiClient.get(
      `${endpoints().userAPI}/search?status=${User.STATUS_INACTIVE_VALUE
      }`
    );
    const roleDetails = lists.data.data;
    const roleData = [];
    roleDetails &&
      roleDetails.length > 0 &&
      roleDetails.forEach((list) => {
        if (list.role_name == Role.SALES_EXECUTIVE_ROLE) {
          roleData.push({
            label: list.first_name + " " + list.last_name,
            value: list.id,
          });
        }
      });
    setInActiveSaleExecutive(roleData);
  };
  // Get Sales Details
  const getDetails = async () => {
    const response = await apiClient.get(`${endpoints().saleSettlementAPI}/${id}`);
    setDetail(() => response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDetails();
    storeList();
    getShift();
    getUserRoleValue();
    getRolePermissions();
  }, []);

  const statusOptions = [
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
  ];
  // Actions menu list

  const actionOptions = [
    {
      label: "Delete",
      value: "Delete",
    }

  ];

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };


  const handleChange = (e) => {
    if (e == "Delete") {
      setDeleteModal(true);
    }
  };

  const handleChangeStatus = async (selectStatus) => {
    dispatch(
      await SaleSettlementService.updateStatus(id, selectStatus, {})
    )
  };
  // Toggling the tab
  const tabToggle = (tab) => {
    setActiveTab(tab);
  };

  const deleteSaleSettements = async () => {
    dispatch(await SaleSettlementService.delete(id, {}));
    history.push("/salesettlement");
  };

  //Get Role Permission
  const getRolePermissions = async () => {
    const statusPermission = hasPermission(Permission.SALE_SETTLEMENT_STATUS_UPDATE)
    setPermissionList(statusPermission);
    setIsLoading(false);
  };

  // Handle status change
  const handleStatusChange = (status) => {
    const data = new FormData();
    // status
    data.append("status", status ? status : "");

    try {
      if (
        detail?.calculated_amount_cash !== null &&
        detail?.calculated_amount_upi !== null &&
        detail?.received_amount_cash !== null &&
        detail?.received_amount_upi !== null
      ) {
        apiClient
          .put(`${endpoints().saleSettlementAPI}/status/${id}`, data)
          .then((res) => {
            if (res.status == SUCCESS_RESPONSE) {
              Toast.success(res?.data?.message);
            }
            getDetails(id);
            setSelectedStatus("");
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
        Toast.error("Fill The Required Fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle form Submit
  const handleSubmit = async (values) => {
    try {
      const data = new Object();

      // location id
      data.storeId = values?.location?.id;

      // date
      data.date = DateTime.toISOStringDate(values?.date);

      // Shift
      data.shift = values?.shift.value;

      // Type
      data.type = values && String.Get(values.type);

      // Amount
      data.amount = values.amount ? values.amount : "";

      data.amount_upi = values.amount_upi ? values.amount_upi : "";

      data.amount_cash = values.amount_cash ? values.amount_cash : "";

      data.discrepancy_amount_cash =
        values.discrepancy_amount_cash ? values.discrepancy_amount_cash : ""
        ;

      data.discrepancy_amount_upi = values.discrepancy_amount_upi ? values.discrepancy_amount_upi : "";

      data.calculated_amount_cash = values.calculated_amount_cash ? values.calculated_amount_cash : "";

      data.calculated_amount_upi = values.calculated_amount_upi ? values.calculated_amount_upi : "";

      data.received_amount_upi = values.received_amount_upi ? values.received_amount_upi : "";

      data.cash_in_store =
        cashInStore ? cashInStore : values.cash_in_store ? values.cash_in_store : ""
        ;

      data.cash_to_office =
        cashToOffice ? cashToOffice : values.cash_to_office ? values.cash_to_office : ""
        ;

      data.received_amount_cash = values.received_amount_cash ? values.received_amount_cash : "";

      data.salesExecutive =
        values &&
        values.salesExecutive &&
        Number.Get(values.salesExecutive.value);
      // Notes
      data.notes = String.Get(values.notes);

      data.status = selectedStatus ? selectedStatus : values.status.label;

      data.productCount = values && Number.Get(values.productCount);
      apiClient
        .put(`${endpoints().saleSettlementAPI}/${id}`, data)
        .then((res) => {
          if (res.status == SUCCESS_RESPONSE) {
            Toast.success(res?.data?.message);
          }
          setIsLoading(true);
          getDetails(id);
          setIsLoading(false);
          setEditable(true)
        })
        .catch((err) => {
          if (isBadRequest(err)) {
            let errorMessage;
            const errorRequest = err.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            Toast.error(errorMessage);
            setEditable(true)
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const onCashChange = (e) => {
    const cashAmount = e.values.amount_cash ? e.values.amount_cash : " ";
    let totalAmounts =
      (Currency.Get(cashAmount) ? Currency.Get(cashAmount) : null) +
      Currency.Get(amountUpi ? amountUpi : detail.amount_upi);
    setTotalAmount(totalAmounts);
    setAmountCash(cashAmount);
    setCash(cashAmount);
  };

  const onUpiChange = (e) => {
    const upiAmount = e.values.amount_upi ? e.values.amount_upi : " ";
    let total_amount =
      (Currency.Get(upiAmount) ? Currency.Get(upiAmount) : null) +
      Currency.Get(amountCash ? amountCash : detail.amount_cash);
    setTotalAmount(total_amount);
    setAmountUpi(upiAmount);
    setUpi(upiAmount);
  };

  const onStoreChange = (e) => {
    const locationName = e?.id ? e?.id : "";
    setLocationName(locationName);
  };

  const onShiftChange = (e) => {
    const shiftValue = e.values.shift.value;
    setShift(shiftValue);
  };

  const onSalesExecutiveChange = (e) => {
    const sales_executive = e.values.salesExecutive.value;
    setsalesExecutive(sales_executive);
  };

  const onCalculatedCashChange = (e) => {
    const calculatedCash = e.values.calculated_amount_cash
      ? e.values.calculated_amount_cash
      : " ";
    let total_amount =
      (Currency.Get(calculatedCash) ? Currency.Get(calculatedCash) : null) +
      Currency.Get(
        upiCalculated ? upiCalculated : detail.calculated_amount_upi
      );
    setCalculatedTotalAmount(total_amount);
    setCalculatedAmountCash(calculatedCash);
  };

  const onCalculatedUpiChange = (e) => {
    const calculatedUpi = e.values.calculated_amount_upi
      ? e.values.calculated_amount_upi
      : " ";
    let totalAmounts =
      (Currency.Get(calculatedUpi) ? Currency.Get(calculatedUpi) : null) +
      Currency.Get(
        cashCalculated ? cashCalculated : detail.calculated_amount_cash
      );
    setCalculatedTotalAmount(totalAmounts);
    setCalculatedAmountUpi(calculatedUpi);
  };

  const onReceivedCashChange = (e) => {
    const receivedCash = e.values.received_amount_cash
      ? e.values.received_amount_cash
      : " ";
    let total_amount =
      (Currency.Get(receivedCash) ? Currency.Get(receivedCash) : null) +
      Currency.Get(upiReceived ? upiReceived : detail.received_amount_upi);
    setReceivedTotalAmount(total_amount);
    setReceivedAmountCash(receivedCash);
  };

  const onReceivedUpiChange = (e) => {
    const receivedUpi = e.values.received_amount_upi
      ? e.values.received_amount_upi
      : " ";
    let totalAmounts =
      (Currency.Get(receivedUpi) ? Currency.Get(receivedUpi) : null) +
      Currency.Get(cashReceived ? cashReceived : detail.received_amount_cash);
    setReceivedTotalAmount(totalAmounts);
    setReceivedAmountUpi(receivedUpi);
  };

  const discrepancyAmountCash =
    (amount_cash ? amount_cash : detail?.amount_cash) -
    (cashCalculated ? cashCalculated : detail?.calculated_amount_cash);
  const discrepancyAmountUpi =
    (amount_upi ? amountUpi : detail?.amount_upi) -
    (upiCalculated ? upiCalculated : detail?.calculated_amount_upi);
  const totalDiscrepancy = discrepancyAmountCash + discrepancyAmountUpi;

  const onDateChange = (e) => {
    setDate(e);
  };

  const onStoreCashChange = (e) => {
    const storerCash = e.values.cash_in_store ? e.values.cash_in_store : "";
    setCashInStore(storerCash);
  };

  const onNotesChange = (e) => {
    let note = e.target.value;
    setNotes(note);
  };


  const onCashToOfficeChange = (x) => {
    const data = x.values.cash_to_office;
    setCashToOffice(data)

  }

  let salesExecutiveId = sales_executive
    ? sales_executive
    : detail.sales_executive;

  let salesExecutives = salesExecutive.find(
    (data) => data.value == salesExecutiveId
  )
    ? salesExecutive.find((data) => data.value == salesExecutiveId)
    : inActiveSaleExecutive.find((data) => data.value == salesExecutiveId);

  // Form initial values
  const initialValues = {
    location: location.find((data) => data.id == location_name)
      ? location.find((data) => data.id == location_name)
      : Array.isArray(location) &&
      location.find((data) => data.id == detail?.store_id),
    date: date ? date : DateTime.getDateTimeByUserProfileTimezone(detail?.date),
    shift:
      shiftList && shiftList.find((data) => data.id == shift)
        ? shiftList && shiftList.find((data) => data.id == shift)
        : Array.isArray(shiftList) &&
        shiftList.find((data) => data.id == detail?.shift),
    type: detail?.type,
    amount: detail?.amount,
    amount_cash: amountCash ? amountCash : detail?.amount_cash,
    amount_upi: amountUpi ? amountUpi : detail?.amount_upi,
    discrepancy_amount_cash: discrepancyAmountCash,
    discrepancy_amount_upi: discrepancyAmountUpi,
    calculated_amount_cash: cashCalculated
      ? cashCalculated
      : detail?.calculated_amount_cash,
    calculated_amount_upi: upiCalculated
      ? upiCalculated
      : detail?.calculated_amount_upi,
    received_amount_cash: cashReceived
      ? cashReceived
      : detail?.received_amount_cash,
    received_amount_upi: upiReceived
      ? upiReceived
      : detail?.received_amount_upi,
    cash_in_store: cashInStore === "" ? "" : cashInStore ? cashInStore : detail?.cash_in_store,
    cash_to_office: cashToOffice == "" ? "" : cashToOffice ? cashToOffice : detail?.cash_to_office,
    salesExecutive: salesExecutives,
    notes: notes ? notes : detail?.notes,
    total_amount: totalAmount ? totalAmount : detail?.total_amount,
    total_calculated_amount: totalCaculatedAmount
      ? totalCaculatedAmount
      : detail?.total_calculated_amount,
    total_received_amount: totalReceivedAmount
      ? totalReceivedAmount
      : detail?.total_received_amount,
    total_discrepancy_amount: totalDiscrepancy
      ? totalDiscrepancy
      : detail?.total_discrepancy_amount,
    status: selectedStatus ? selectedStatus : { label: detail?.status },
    productCount: detail.product_count ? detail.product_count : productCount,
  };

  const onStatusChange = (value) => {
    getStatusDetail(value)

    if (value) {
      handleStatusChange(value);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <DeleteModal
        id={detail?.store_id}
        label={detail?.sale_settlement_number}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Product "
        deleteFunction={deleteSaleSettements}
      />

      {/* Breadd Crumb Section */}
      <BreadCrumb list={breadcrumbList} />

      {/* Page title */}

      <div className="d-flex nav justify-content-between">
        <PageTitle label={`Sale Settlement #${detail?.sale_settlement_number}`} />
        <div className="d-flex mr-2  justify-content-between">
        {showEditButton && editable && activeTab !== Tab.HISTORY && (
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
            objectName={ObjectName.SALE_SETTLEMENT}
            handleChange={onStatusChange}
            buttonLabel={detail?.status}
            currentStatusId={detail?.statusId}

          />
          <div className="pl-1">
            <Action dropdownLinks={actionOptions} handleChange={handleChange} />
          </div>
        </div>

      </div>

      <div>
        <Nav tabs className="admin-tabs">
          {/* Detail Tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.DETAIL,
              })}
              onClick={() => {
                tabToggle(Tab.DETAIL);
                _handleTabChange(Tab.DETAIL);
              }}
            >
              {Tab.DETAIL}
            </NavLink>
          </NavItem>

          {/* History Tab */}
          <NavItem>
     {showHistory &&       <NavLink
              className={classNames({
                active: activeTab === Tab.HISTORY,
              })}
              onClick={() => {
                tabToggle(Tab.HISTORY);
                _handleTabChange(Tab.HISTORY);
              }}
            >
              {Tab.HISTORY}
            </NavLink>}
          </NavItem>
        </Nav>
      </div>

      {/* Form */}
      <div className="card mt-3">
        <div className="card-body ">
          <Form
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {/* Tab Content section */}
            <TabContent activeTab={activeTab}>
              {/* Detail Tab Start*/}
              {activeTab == Tab.DETAIL &&
              <TabPane tabId={Tab.DETAIL} className="w-100">
                <SaleSettlementForm
                  location={location}
                  id={id}
                  showDiscrepancy={true}
                  shiftList={shiftList}
                  salesExecutive={salesExecutive}
                  showCalculatedAmount={true}
                  showReceivedAmount={true}
                  showMediaTab={true}
                  showCashInStore={true}
                  onCashChange={onCashChange}
                  onUpiChange={onUpiChange}
                  onStoreChange={onStoreChange}
                  onShiftChange={onShiftChange}
                  onSalesExecutiveChange={onSalesExecutiveChange}
                  onCalculatedCashChange={onCalculatedCashChange}
                  onCalculatedUpiChange={onCalculatedUpiChange}
                  onReceivedCashChange={onReceivedCashChange}
                  onReceivedUpiChange={onReceivedUpiChange}
                  onDateChange={onDateChange}
                  onStoreCashChange={onStoreCashChange}
                  onNotesChange={onNotesChange}
                  notes={notes}
                  statusOptions={statusOptions}
                  status={true}
                  handleChange={(e) => handleChangeStatus(e)}
                  PermissionList={PermissionList}
                  saleStatus={detail?.status}
                  showProductCount={true}
                  statusSelected={statusSelected}
                  onCashToOfficeChange={onCashToOfficeChange}
                  editable={editable}
                />
                <div>
                 {!editable && <><SaveButton label="Save" /><CancelButton onClick={() => props.history.push("/SaleSettlement")} /></>}
                </div>
              </TabPane>}
              {/* History Tab Start*/}
              {showHistory && activeTab == Tab.HISTORY &&
              <TabPane tabId={Tab.HISTORY} className="w-100">
                <ActivityList
                  id={id}
                  objectId={id}
                  object_name={ObjectName.SALE_SETTLEMENT}
                />
              </TabPane>}
            </TabContent>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Detail;
