import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TabPane } from "reactstrap";
import Button from "../../../components/Button";
import AddModal from "../../../components/Modal";
import Number from "../../../components/Number";

//Helper
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import Currency from "../../../lib/Currency";

// Helper
import { deleteVendorProduct, updateVendorProduct } from "../../../services/VendorProductService";

const SupplierList = (props) => {
  const [rowValue, setRowValue] = useState();
  const [openVendorModal, setOpenVendorModal] = useState(false);

  const {
    id,
    tabName,
    activeTab,
    history,
    sortByOption,
    statusOptions,
    icon,
    apiURL,
    productId,
    toggle,
    vendorList
  } = props;
  const dispatch = useDispatch();


  const addVendorToggle = () => {
    setOpenVendorModal(false);
  };

  const vendorId = rowValue?.id;
  const addVendorForm = (
    <div>
      <Select
        name="vendor_name"
        label="Vendor"
        options={vendorList}
      />
      <Text
        name="vendor_url"
        label="Vendor Product Url"
      />
      <Number label="Price" name="price" />

    </div>
  );
  const vendorFooter = (
    <div>
      <Button
        type="submit"
        label="Update"
        className="h6-5-important mr-3"
      />
      <Button
        id={vendorId}
        label="Delete"
        className="h6-5-important bg-danger"
        onClick={() => {
          dispatch(deleteVendorProduct(vendorId, { product_id: productId, pagination: true }, addVendorToggle));
        }}
      />
    </div>
  );

  const initialValues = {
    vendor_name: {
      label: rowValue?.name ? rowValue?.name : "",
      value: rowValue?.vendor_id ? rowValue?.vendor_id : "",
    },
    vendor_url: rowValue?.vendor_url ? rowValue?.vendor_url : "",
    price: rowValue?.price ? rowValue?.price : ""
  };

  const editVendor = (values) => {
    const id = rowValue?.id;
    const data = new FormData();
    data.append("url", values?.vendor_url);
    data.append("product_id", rowValue?.product_id);
    data.append("vendor_id", values?.vendor_name.id ? values?.vendor_name.id : values?.vendor_name.value);
    data.append("price", Currency.Get(values.price));
    dispatch(
      updateVendorProduct(
        id,
        data,
        { product_id: productId, pagination: true },
        addVendorToggle
      )
    );
  };

  return (
    <>
      <AddModal
        isOpen={openVendorModal}
        toggle={toggle}
        toggleModalClose={addVendorToggle}
        modalTitle="Edit Vendor Product"
        modalBody={addVendorForm}
        modalFooter={vendorFooter}
        initialValues={initialValues}
        onSubmit={editVendor}
        hideDefaultButtons
      />

      <TabPane tabId={tabName} className="w-100">
        <div className="tab-content-wrapper">
          <div className="mt-4">
            <ReduxTable
              id={id}
              showHeader
              newTableHeading
              searchPlaceholder="Search Vendor"
              icon={icon}
              statusOptions={statusOptions}
              showStatusOptions={true}
              message="You can start by clicking on Add New"
              apiURL={apiURL}
              sortByOptions={sortByOption}
              params={{
                product_id: productId,
                tab: activeTab,
              }}

              history={history}
              paramsToUrl={true}>

              <ReduxColumn
                field="vendor_name"
                type="link"
                width="300px"
                className="text-left"
                renderField={(row) => (
                  <span>{row.vendorName}</span>
                )}
              >
                Vendor
              </ReduxColumn>
              <ReduxColumn
                field="cost_price"
                sortBy="cost_price"
                className="text-center"
                renderField={(row) => (
                  <span>{Currency.Format(row.cost_price)}</span>
                )}
              >
                Cost Price
              </ReduxColumn>
            </ReduxTable>
          </div>
        </div>
      </TabPane>
    </>
  );
};

export default SupplierList;
