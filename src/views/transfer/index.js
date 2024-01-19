import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
// Components
import PageTitle from "../../components/PageTitle";
// Configs
import { endpoints } from "../../api/endPoints";
// Helper
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../lib/Helper";
import AddModal from "../../components/Modal";
import { apiClient } from "../../apiClient";
import Select from "../../components/Select";
import SaveButton from "../../components/SaveButton";
import ArrayList from "../../lib/ArrayList";
import { addTransfer } from "../../actions/transfer";
import DeleteModal from "../../components/DeleteModal";
import DateTime from "../../lib/DateTime";
import DateSelector from "../../components/Date";
import Number from "../../lib/Number";
import * as Store from "../../helpers/Store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchList } from "../../actions/table";
import Url from "../../lib/Url";
import CountBadge from "../../components/CountBadge";
import Notes from "../../components/Notes";
import TransferPage from "./Components/transferList";

export const Tab = {
  TRANSFER: "Transfers",
  TRANSFER_PRODUCT: "Transfer Products",
};
import Action from "../../components/Action";
import TransferTypeService from "../../services/TransferTypeService";
import TransferService from "../../services/TransferService";
import TransferProductList from "./Components/transferProductList";
import Spinner from "../../components/Spinner";
import SelectStore from "../../components/SelectStore";
import OutlineButton from "../../components/OutlineButton";
import SelectType from "../../components/SelectType";
import UserSelect from "../../components/UserSelect";
const Transfers = "transfer";

const TransferList = (props) => {
  const [Order, setOrder] = useState();

  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const [currentData, setCurrentData] = useState();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [storeModalOpen, setStoreModalOpen] = useState(false);

  const [storeList, setStoreList] = useState([]);

  const [type, setType] = useState();
  const [transferTypeData, setTransferTypeData] = useState();
  const [transferType, setTransferType] = useState([]);

  const [store, setStore] = useState();
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") ? Url.GetParam("tab") : Tab.TRANSFER
  );
  const [upadatedTransferType, setUpadatedTransferType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [transferIds, setTransferIds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn();
    getStoreList();
    getType();
  }, []);

  const getType = async () => {
    const list = await TransferTypeService.search();
    setTransferType(list);
  };

  const changeType = (type) => {
    const isExist =
      transferType && transferType.find((data) => data.id == type);
    return isExist.value;
  };

  const StoreSelectModal = () => {
    setStoreModalOpen(!storeModalOpen);
    setStore("");
  };

  const getStoreList = async () => {
    try {
      //create new array for store list
      let storeList = new Array();

      //get store list
      let response = await apiClient.get(
        `${endpoints().locationAPI}/search?status=${Store.STATUS_ACTIVE_TEXT
        }&allow_sale=${Store.ALLOW_SALE_ENABLE}`
      );

      //validate response xiist or not
      if (response && response.data && response.data.data) {
        //get store list
        let stores = response.data.data;

        //validate store length exist or not
        if (stores && ArrayList.isNotEmpty(stores)) {
          for (let i = 0; i < stores.length; i++) {
            storeList.push({
              label: stores[i].name,
              value: stores[i].id,
            });
          }
          setStoreList(storeList);
        }
      }
    } catch (err) { }
  };

  const AddTransfer = (values) => {
    try {
      //create Transfer data
      let transferData = {};

      let fromLocationId = values.fromLocation.value;
      let toLocationId = values.toLocation.value;
      transferData.fromLocationId = values && Number.Get(fromLocationId);
      transferData.toLocationId = values && Number.Get(toLocationId);
      transferData.date = values && values.date;
      transferData.notes = values && values.notes;
      transferData.type = type && { label: type, value: changeType(type) };
      //add new Transfer
      dispatch(
        addTransfer(transferData, "", (response) => {
          //validate response exist or not
          if (response && response.transferDetails) {
            //get Transfer details
            let transferDetails = response.transferDetails;

            //validate Transfer details exist or not
            if (transferDetails) {
              history.push(
                `/transfer/add/${fromLocationId}/${toLocationId}/${transferDetails.id}`
              );
            }
          }
        })
      );
    } catch (err) { }
  };

  const handleFromStore = (values) => {
    setStore(values && values.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleToStore = (values) => {
    setStore(values && values.value);
  };

  const handleChanges = (e) => {
    if (e) {
      const TransferTypeDetail = transferType.find((data) => data.id == e);
      setTransferTypeData(TransferTypeDetail);
      setType(e);
      StoreSelectModal(true);
    }
  };

  const handleType = (values) => {
    const TransferTypeDetail = transferType.find(
      (data) => data.id == values.value
    );
    setUpadatedTransferType(TransferTypeDetail);
    setType(values.value);
  };
  
  const addStoreForm = (
    <>
      <DateSelector
        selected={selectedDate}
        name="date"
        fontBolded
        label="Date"
      />
      <SelectStore
        name="fromLocation"
        label="From Location"
        placeholder="Select Location"
        isDisabled={
          upadatedTransferType
            ? upadatedTransferType?.allow_to_change_from_store !== 1
              ? true
              : false
            : transferTypeData?.allow_to_change_from_store !== 1
              ? true
              : false
        }
        options={storeList.filter((data) => {
          return data.value !== store;
        })}
        handleStoreChange={handleFromStore}
      />
      <SelectStore
        name="toLocation"
        label="To Location"
        placeholder="Select Location"
        isDisabled={
          upadatedTransferType
            ? upadatedTransferType?.allow_to_change_to_store !== 1
              ? true
              : false
            : transferTypeData?.allow_to_change_to_store !== 1
              ? true
              : false
        }
        options={storeList.filter((data) => {
          return data.value !== store;
        })}
        handleStoreChange={handleToStore}
        required
      />
      <Select
        name="type"
        fontBolded
        label="Type"
        placeholder="Select Type"
        options={transferType}
        handleChange={handleType}
        required
      />
      <Notes name="notes" label="Notes" />
    </>
  );

  const addStoreFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <SaveButton
          type="submit"
          label="Next"
          className="ml-3 h6-5-important"
        />
      </div>
    </div>
  );

  const transferDelete = async (id) => {
    dispatch(
      await TransferService.delete(
        id,
        {
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          pageSize: Url.GetParam("pageSize") || "",
        },
        props.allCurrentPage,
        props.allCurrentPageSize
      )
    );
    setIsDeleteModel(false);
  };

  const toggle = (tab) => {
    setActiveTab(tab);
    history.push(
      `?tab=${tab}&startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}`
    );
  };

  const _toggle = () => {
    setIsOpen(!isOpen);
  };
  
  const onBulkSelect = (ids) => {
    setTransferIds({ transferIds: ids });
  };

  let bulkUpdateForm = (
    <>
      <DateSelector label="Date" name="date" />
      <SelectStore name="from_location" label="From Location" />
      <SelectStore name="to_location" label="To Location" />
      <SelectType name="type" label="Type" />
      <UserSelect name="owner" label="Owner" />
    </>
  );

  let bulkUpdateFooter = (
    <SaveButton />
  );

  const handleSubmit = async (values) => {
    let data = new FormData();
    data.append("date", values && values?.date ? values?.date : "");
    data.append(
      "from_location",
      values && values?.from_location?.value ? values?.from_location?.value : ""
    );
    data.append(
      "owner",
      values && values?.owner?.id ? values?.owner?.id : ""
    );
    data.append(
      "to_location",
      values && values?.to_location?.value ? values?.to_location?.value : ""
    );
    data.append("date", values && values?.date ? values?.date : "");
    dispatch(
      await TransferService.bulkUpdate(transferIds.transferIds, data, _toggle())
    );
    dispatch(
      fetchList("transfer", `${endpoints().transferApi}/search`, 1, 25, {
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
      })
    );
  };

  return (
    <>
      <AddModal
        modalTitle="Bulk Update"
        modalBody={bulkUpdateForm}
        modalFooter={bulkUpdateFooter}
        isOpen={isOpen}
        toggle={_toggle}
        toggleModalClose={_toggle}
        initialValues={{
          date: new Date(),
          from_location: "",
          to_location: "",
          type: "",
          owner: "",
        }}
        onSubmit={(e) => handleSubmit(e)}
        hideDefaultButtons
      />
      <AddModal
        isOpen={storeModalOpen}
        toggle={StoreSelectModal}
        toggleModalClose={StoreSelectModal}
        modalTitle="Select Location"
        modalBody={addStoreForm}
        modalFooter={addStoreFooter}
        hideDefaultButtons
        onSubmit={(values) => {
          AddTransfer(values);
        }}
        showAddButton={true}
        initialValues={{
          fromLocation: upadatedTransferType
            ? upadatedTransferType?.fromLocation
            : transferTypeData?.fromLocation,
          toLocation: upadatedTransferType
            ? upadatedTransferType?.toLocation
            : transferTypeData?.toLocation,
          type: transferType.find((data) => data?.id == type),
          date: DateTime.getTodayDateByUserTimeZone(new Date()),
        }}
      />
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Transfer"
        id={currentData?.transfer_number}
        label={Order}
        deleteFunction={() => {
          transferDelete(currentData?.id);
        }}
      />
      <div>
        <div className="d-flex justify-content-between">
          <PageTitle className="mb-3" label="Transfers" />
          <div className="d-flex">
            <Action
              dropdownLinks={transferType}
              handleChange={(e) => handleChanges(e)}
              buttonLabel="Add New"
            />
            <OutlineButton
              className="ml-2 "
              label="Bulk Update"
              onClick={() => {
                _toggle();
              }}
              backgroundColor="#FFC105"
              borderColor="#FFC105"
              color="#4D4A4A"
              disabled={
                transferIds &&
                  transferIds.transferIds &&
                  transferIds.transferIds.length > 0
                  ? false
                  : true
              }
            />
          </div>
        </div>
      </div>

      <Nav tabs className="admin-tabs">
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.TRANSFER,
            })}
            onClick={() => {
              toggle(Tab.TRANSFER);
            }}>
            {Tab.TRANSFER}
            <CountBadge count={props.transferCount} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.TRANSFER_PRODUCT,
            })}
            onClick={() => {
              toggle(Tab.TRANSFER_PRODUCT);
            }}>
            {Tab.TRANSFER_PRODUCT}
            <CountBadge count={props.transferProductCount} />
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* Transfer Tab */}
        {activeTab == Tab.TRANSFER && (
          <TabPane tabId={Tab.TRANSFER}>
            <TransferPage
              history={history}
              setCurrentData={setCurrentData}
              setOrder={setOrder}
              setIsDeleteModel={setIsDeleteModel}
              allCurrentPage={props.allCurrentPage}
              allCurrentPageSize={props.allCurrentPageSize}
              onBulkSelect={onBulkSelect}
            />
          </TabPane>
        )}

        {/* Transfer Product Tab */}
        {activeTab == Tab.TRANSFER_PRODUCT && (
          <TabPane tabId={Tab.TRANSFER_PRODUCT}>
            <TransferProductList history={history} />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};
function mapStateToProps(state) {
  const reduxTable = state.table;

  // All CurrentPage and CurrentPageSize
  const allCurrentPage =
    reduxTable["transfer"] && reduxTable["transfer"].isFetching == false
      ? reduxTable["transfer"].currentPage
      : 1;
  const allCurrentPageSize =
    reduxTable["transfer"] && reduxTable["transfer"].isFetching == false
      ? reduxTable["transfer"].pageSize
      : 25;
  const transferCount =
    reduxTable["transfer"] && reduxTable["transfer"].isFetching == false
      ? reduxTable["transfer"].totalCount
      : 25;
  const transferProductCount =
    reduxTable["transferProduct"] &&
      reduxTable["transferProduct"].isFetching == false
      ? reduxTable["transferProduct"].totalCount
      : 25;

  return {
    allCurrentPage,
    allCurrentPageSize,
    transferCount,
    transferProductCount,
  };
}

// Map Dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TransferList);
