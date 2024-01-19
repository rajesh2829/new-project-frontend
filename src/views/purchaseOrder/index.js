import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import "../../scss/_custom.scss";

// Components

import DeleteModal from "../../components/DeleteModal";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import AccountSelect from "../../components/AccountSelect";
import ObjectName from "../../helpers/ObjectName";
import { isLoggedIn } from "../../lib/Helper";
import PurchaseOrderService from "../../services/PurchaseOrderService";
import PurchaseOrdersList from "./components/PurchaseOrderList";

let purchaseOrders = "purchaseOrder";

const PurchaseOrderList = (props) => {
  const {
    history,
    AllProducts,
    CompletedPurchaseOrder,
    needPurchaseOrder,
    draftPurchaseOrder,
    ApprovedPurchaseOrder,
  } = props;

  const Tab = {
    DRAFT: "Draft",
    NEED_APPROVAL: "Need Approval",
    APPROVED: "Approved",
    COMPLETED: "Completed",
    ALL: "All",
  };
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentData, setCurrentData] = useState();
  const [currentPage, setCurrentPage] = useState();
  const Param = new URLSearchParams(props.history.location.search);

  const role = Param.get("section");
  const [activeTab, setActiveTab] = useState(role ? role : Tab.ALL);

  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn();
  }, []);

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

  const AccountSelectModal = () => {
    setModalOpen(!modalOpen);
  };


  const AddPurchaseOrder = (values) => {
    try {
      let data = new Object();

      let vendor_id = values.vendor.value;

      data.vendor_id = values && values.vendor && values.vendor.value;
      data.date = values.date;
      let params = { pagination: true };

      dispatch(
        PurchaseOrderService.addPurchaseOrder(data, params, (response) => {
          //validate response exist or not
          if (response && response.purchaseOrderDetails) {
            let data = response.purchaseOrderDetails;

            if (data) {
              history.push(`/purchaseOrder/detail/${data.id}`);
            }
          }
        })
      );
    } catch (err) {}
  };

  const addVendorForm = (
    <>
      <AccountSelect name={"vendor"} label="Vendor" required />
    </>
  );

  const addVendorFooter = (
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

  const hanldeDelete = (id) => {
    dispatch(
      PurchaseOrderService.delete(
        id,
        {
          pagination: true,
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          page: Url.GetParam("page") || "",
          pageSize: Url.GetParam("pageSize") || "",
        },
        props.purchaseOrderCurrentpage,
        props.purchaseOrderPageSize
      )
    );
    setIsDeleteModel(false);
  };

  // Toggling the tab
  const tabToggle = (tab) => {
    setActiveTab(tab);
  };
  //handlestatus change
  const handleStatusChange = (tabStatus) => {
    props.history.push(`/purchaseOrder?tab=${tabStatus}`);
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Purchase Order"
        label={currentData?.purchase_order_number}
        deleteFunction={() => hanldeDelete(currentData?.id)}
      />

      <AddModal
        isOpen={modalOpen}
        toggle={AccountSelectModal}
        toggleModalClose={AccountSelectModal}
        modalTitle="Add Purchase Order"
        modalBody={addVendorForm}
        modalFooter={addVendorFooter}
        hideDefaultButtons
        buttonLobel={"Add"}
        onSubmit={AddPurchaseOrder}
        showAddButton={true}
        initialValues={{
          vendor: "",
          date: new Date(),
        }}
      />

      <PageTitle
        label="Purchase Orders"
        buttonHandler={(_e) => {
          AccountSelectModal();
        }}
        buttonLabel="Add New"
      />
      <div>
        <PurchaseOrdersList
          id="allpurchaseOrder"
          sortByOption={sortByOption}
          history={history}
          setIsDeleteModel={setIsDeleteModel}
          setCurrentPage={setCurrentPage}
          setCurrentData={setCurrentData}
          showStatus
          objectName={ObjectName.PURCHASE_ORDER}
        />
      </div>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;
  // Get Published products count
  const purchaseOrderCurrentpage =
    reduxTable[purchaseOrders] && reduxTable[purchaseOrders].isFetching == false
      ? reduxTable[purchaseOrders].currentPage
      : 1;
  const purchaseOrderPageSize =
    reduxTable[purchaseOrders] && reduxTable[purchaseOrders].isFetching == false
      ? reduxTable[purchaseOrders].pageSize
      : 25;

  return {
    purchaseOrderCurrentpage,
    purchaseOrderPageSize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderList);
