import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { addStore, updateStore } from "../../actions/storeList";
import { fetchList } from "../../actions/table";
import Button from "../../components/Button";
import CountBadge from "../../components/CountBadge";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import Text from "../../components/Text";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import StoreProductList from "../storeProduct";
import StoreListPage from "./components/storeList";
import AddButton from "../../components/AddButton";
import Select from "../../components/Select";
import TransferService from "../../services/TransferService";
import { Transfer } from "../../helpers/Transfer";
import TransferProductService from "../../services/TransferProductService";
import Drawer from "../../components/Drawer";
import IPAddress from "../../components/IpAddress";
import CurrencyComponent from "../../components/Currency";
import DateSelector from "../../components/Date";
import SingleCheckbox from "../../components/SingleCheckbox";
import { STATUS_ACTIVE_TEXT, STATUS_INACTIVE_TEXT, Store } from "../../helpers/Store";
import StoreService from "../../services/StoreService";
import SaveButton from "../../components/SaveButton";

export const Tabs = {
  STORE_PRODUCT: "storeProduct",
  LOCATIONS: "Locations",
};

const Stores = (props) => {
  const { history, storeCount, storeProductCount, storeProductDetails } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") ? Url.GetParam("tab") : Tabs.LOCATIONS
  );
  const [openTransferModel, setOpenProductModel] = useState(false);
  const [transferList, setTransferList] = useState([]);
  const [transferData, setTransferData] = useState();
  const [storeProductIds, setProductIds] = useState([]);
  const [rowValue, setRowValue] = useState(null);
  const [storeList, setStoreList] = useState([])
  const [isSubmit, setIsSubmit] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    isLoggedIn();
    // getTransfers();
    getStoreList()
  }, []);


  const getStoreList = async () => {
    await StoreService.list((storeList) => setStoreList(storeList));
  };

  const _toggleClose = (id) => {
    setRowValue("");
    setIsOpen(!isOpen);
  };
  const _toggle = (id) => {
    setIsOpen(!isOpen);
  };
  const toggle = (id) => {
    setIsOpen(!isOpen);
  };

  const params = {
    search: Url.GetParam("search") || "",
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
  };

  /**
   * Add Store
   *
   * @param data
   */
  const storeAdd = (data) => {
    setIsSubmit(false)
    dispatch(
      addStore(data, params, (res) => {
        if (res) {
          _toggle();
        } else {
          return;
        }
      })
    );
    setIsSubmit(true)
  };

  const statusOptions = [
    {
      value: STATUS_ACTIVE_TEXT,
      label: "Active",
    },
    {
      value: STATUS_INACTIVE_TEXT,
      label: "InActive",
    },
  ];

  const storeUpdate = (values) => {
    setIsSubmit(false)
    let data = new FormData();
    data.append(
      "allow_purchase",
      values && values?.allow_purchase ? values?.allow_purchase : ""
    );
    data.append(
      "allow_replenishment",
      values && values?.allow_replenishment ? values?.allow_replenishment : ""
    );
    data.append(
      "allow_sale",
      values && values?.allow_sale ? values?.allow_sale : ""
    );
    data.append("color", values && values?.color ? values?.color : "");
    data.append("end_date", values && values?.end_date ? values?.end_date : "");
    data.append(
      "ip_address",
      values && values?.ip_address ? values?.ip_address : ""
    );
    data.append(
      "minimum_cash_in_store",
      values && values?.minimum_cash_in_store
        ? values?.minimum_cash_in_store
        : ""
    );
    data.append(
      "cash_in_location",
      values && values?.cash_in_location
        ? values?.cash_in_location
        : ""
    );
    data.append("name", values && values?.name ? values?.name : "");
    data.append(
      "printName",
      values && values?.printName ? values?.printName : ""
    );
    data.append(
      "start_date",
      values && values?.start_date ? values?.start_date : ""
    );
    data.append("status", values && values?.status ? values?.status : "");
    data.append("distributionCenter", values && values?.distributionCenter ? values?.distributionCenter?.value : "")
    data.append("location_code", values && values?.location_code ? values?.location_code : "")
    data.append("open_time", values && values?.open_time ? values?.open_time : "")
    data.append("close_time", values && values?.close_time ? values?.close_time : "")
    dispatch(updateStore(rowValue.id, data, {}));
    setIsSubmit(true)
    _toggleClose()
  };

  const addStoreForm = (
    <div className="">
      <div>
        <Text
          name="name"
          label="Name"
          placeholder="Enter Location Name..."
          error=""
          fontBolded
          required={true}
        />
      </div>
      {rowValue && (
        <div>
          <div className="row">
            <div className="col">
              <Text className="w-100" name="printName" label="Print Name" />
            </div>
            <div className="col">
              <Select
                label="Status"
                name="status"
                options={statusOptions}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Text name="location_code" label="Location Code" />
            </div>
            <div className="col">
              <Text name="last_order_number" label="Last Order Number" />
            </div>
          </div>
          <div>
            <IPAddress name="ip_address" label="Ip Address" />
          </div>
          <div className="row">
            <div className="col">
              <DateSelector
                label="Open Time"
                required={true}
                name="open_time"
                isClearable
                showTimeSelect
                showTimeSelectOnly
                format="h:mm aa"
              />
            </div>
            <div className="col">
              <DateSelector
                isClearable
                showTimeSelect
                showTimeSelectOnly
                format="h:mm aa" label="Close Time" name="close_time" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <CurrencyComponent
                name="minimum_cash_in_store"
                label="Minimum Cash In Location"
              />
            </div>
            <div className="col">
              <CurrencyComponent
                name="cash_in_location"
                label="Cash In Location"
              />
            </div>
          </div>
          <div>
            <Select
              label="Distribution Center"
              name="distributionCenter"
              options={storeList}
            />
          </div>
          <div>
            <Text className="w-100" name="color" label="Color" />
          </div>
          <div>
            <div className="row">
              <div className="col">
                <DateSelector
                  label="Start Date"
                  required={true}
                  name="start_date"
                />
              </div>
              <div className="col">
                <DateSelector label="End Date" name="end_date" />
              </div>
            </div>
          </div>
          <div>
            <div className="form-wrapper">
              <div className="field-wrapper">
                <SingleCheckbox
                  name="allow_sale"
                  label="Allow Sale"
                  className="accepted-terms accepted-terms-custom-css"
                />
              </div>
            </div>
          </div>
          <div className="form-wrapper">
            <div className="field-wrapper">
              <SingleCheckbox
                name="allow_replenishment"
                label="Allow Replenishment"
                className="accepted-terms accepted-terms-custom-css"
              />
            </div>
          </div>
          <div className="form-wrapper">
            <div className="field-wrapper">
              <SingleCheckbox
                name="allow_purchase"
                label="Allow Purchase"
                className="accepted-terms accepted-terms-custom-css"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const storeFooter = (
    <>
      <SaveButton
        type="submit"
        loading={isSubmit == false}
        label={rowValue?.id ? "Save" : "Add"}
      />    </>
  );

  const _handleTabChange = (tab) => {
    history.push(`location?tab=${tab}`);
  };

  const addTransferToggle = () => {
    setOpenProductModel(false);
  };

  const getTransfers = async () => {
    let param = {
      pagination: false,
    };
    let response = await TransferService.search(param);
    let data = response?.data?.data;
    let list = [];
    if (data && data.length > 0) {
      data.forEach((values) => {
        if (values.status === Transfer.STATUS_DRAFT_TEXT) {
          list.push({
            label: `${values.transfer_number}  (${values.fromLocationName} --> ${values.toLocationName})`,
            value: values.id,
            id: values.id,
            type_id: values.type_id,
            from_store_id: values.from_store_id,
            to_store_id: values.to_store_id,
          });
        }
      });
    }
    setTransferList(list);
  };

  const onInputChange = (values) => {
    let data = values?.values?.transfer?.id ? values?.values?.transfer : "";
    setTransferData(data);
  };

  const bulkSelectId = (ids) => {
    setProductIds(ids);
  };

  const handleAdd = async () => {
    let transferProducts = new Array();
    if (storeProductIds) {
      if (storeProductIds && storeProductIds.length > 0) {
        for (let i = 0; i < storeProductIds.length; i++) {
          let getStoreProductDetails = storeProductDetails.find(
            (data) => data.store_product_id == storeProductIds[i]
          );
          transferProducts.push({
            transfer_id: transferData?.id,
            quantity: getStoreProductDetails?.quantity,
            product_id: getStoreProductDetails?.productId,
            fromLocationId: transferData?.from_store_id,
            toLocationId: transferData?.to_store_id,
          });
        }
      }
    }
    let data = {
      transferId: transferData?.id,
      transferProducts: transferProducts,
    };
    dispatch(
      await TransferProductService.create(data, setOpenProductModel()),
      setTransferData("")
    );
  };

  const addTransferForm = (
    <Select
      name="transfer"
      options={transferList}
      label="Transfer"
      onInputChange={onInputChange}
    />
  );
  
  // Modal Footer of Add Store
  const productFooter = (
    <Button label="Add" className="h6-5-important" onClick={handleAdd} />
  );

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <PageTitle label="Locations" />
        </div>
        <div>
          {activeTab === Tabs.LOCATIONS && (
            <AddButton
              label={"Add New"}
              className=""
              onClick={() => {
                _toggle();
              }}
            />
          )}
          {activeTab === Tabs.STORE_PRODUCT && (
            <AddButton
              label={"Add Product"}
              onClick={() => {
                setOpenProductModel(true);
              }}
            />
          )}
        </div>
      </div>
      <Drawer
        handleOpenModal={_toggle}
        handleCloseModal={_toggleClose}
        handleDrawerClose={_toggleClose}
        isModalOpen={isOpen}
        enableReinitialize
        initialValues={{
          name: rowValue?.name ? rowValue?.name : "",
          printName: rowValue?.print_name ? rowValue?.print_name : "",
          status: rowValue?.status ? {
            label: rowValue?.status,
            value: rowValue?.status
          } : "",
          ip_address: rowValue?.ip_address ? rowValue?.ip_address : "",
          minimum_cash_in_store: rowValue?.minimum_cash_in_store
            ? rowValue?.minimum_cash_in_store
            : "",
          cash_in_location: rowValue?.cash_in_location
            ? rowValue?.cash_in_location
            : "",
          distributionCenter: rowValue?.distribution_center ? storeList && storeList.length > 0 && storeList.find((data) => data?.value == rowValue?.distribution_center) : "",
          color: rowValue?.color ? rowValue?.color : "",
          start_date: rowValue?.start_date ? rowValue?.start_date : "",
          end_date: rowValue?.end_date ? rowValue?.end_date : "",
          allow_sale: rowValue?.allow_sale ? rowValue?.allow_sale : "",
          allow_replenishment: rowValue?.allow_replenishment
            ? rowValue?.allow_replenishment
            : "",
          allow_purchase: rowValue?.allow_purchase
            ? rowValue?.allow_purchase
            : "",
          location_code: rowValue?.location_code ? rowValue?.location_code : "",
          last_order_number: rowValue?.last_order_number ? rowValue?.last_order_number : "",
          close_time: rowValue?.close_time ? rowValue?.close_time : "",
          open_time: rowValue?.open_time ? rowValue?.open_time : "",
        }}
        DrawerBody={addStoreForm}
        DrawerFooter={storeFooter}
        modelTitle={rowValue?.id ? "Edit Location " : "Add Location"}
        onSubmit={(values) => {
          values.name = values.name.trim();
          values.status = "Active";
          if (rowValue && rowValue.id) {
            storeUpdate(values);
          } else {
            storeAdd(values);
          }
        }}
      />
      <AddModal
        initialValues={{
          transfer: transferData
            ? {
              label: transferData?.label,
              value: transferData?.value,
            }
            : "",
        }}
        isOpen={openTransferModel}
        toggle={toggle}
        toggleModalClose={addTransferToggle}
        modalTitle="Add Transfer"
        modalBody={addTransferForm}
        modalFooter={productFooter}
        hideDefaultButtons
      />

      <div className="bg-white mt-3 card-body">
        <Nav tabs className="admin-tabs">
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tabs.LOCATIONS,
              })}
              onClick={() => {
                toggleTab(Tabs.LOCATIONS);
                _handleTabChange(Tabs.LOCATIONS);
              }}
            >
              {Tabs.LOCATIONS}
              <CountBadge count={storeCount} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tabs.STORE_PRODUCT,
              })}
              onClick={() => {
                toggleTab(Tabs.STORE_PRODUCT);
                _handleTabChange(Tabs.STORE_PRODUCT);
              }}
            >
              Location Products
              <CountBadge count={storeProductCount} />
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          {activeTab == Tabs.LOCATIONS && (
            <TabPane tabId={Tabs.LOCATIONS}>
              <StoreListPage
                id="Location"
                history={history}
                _toggle={_toggle}
                setRowValue={setRowValue}
              />
            </TabPane>
          )}
          {activeTab == Tabs.STORE_PRODUCT && (
            <TabPane tabId={Tabs.STORE_PRODUCT}>
              <StoreProductList history={history} bulkSelectId={bulkSelectId} />
            </TabPane>
          )}
        </TabContent>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  const storeCount =
    reduxTable["Location"] && reduxTable["Location"].isFetching == false
      ? reduxTable["Location"].totalCount
      : 0;
  const storeProductCount =
    reduxTable["storeProduct"] && reduxTable["storeProduct"].isFetching == false
      ? reduxTable["storeProduct"].totalCount
      : 0;
  const storeProductDetails = reduxTable && reduxTable?.storeProduct?.[1];
  return {
    storeCount,
    storeProductCount,
    storeProductDetails,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
