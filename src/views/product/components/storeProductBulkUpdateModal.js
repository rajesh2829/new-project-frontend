import React from "react";
import { useDispatch } from 'react-redux';
import AddModal from "../../../components/Modal";
import Quantity from "../../../components/Quantity";
import OutlineButton from "../../../components/OutlineButton";
import Button from "../../../components/Button";
import StoreProductService from "../../../services/StoreProductService";

const storeProductBulkUpdateModal = (props) => {
  const { isOpen, toggle, storeIds, productId, align } = props;
  const dispatch = useDispatch();

  const bulkUpdateBody = (
    <>
      <Quantity
        label="Quantity"
        name="quantity"
        maxQuantity={500}
      />
      <Quantity
        label="Min Quantity"
        name="min_quantity"
        maxQuantity={500}
        required
      />
      <Quantity
        label="Max Quantity"
        name="max_quantity"
        maxQuantity={500}
        required
      />
    </>
  );

  const editModelFooter = (
    <Button type="submit" label="Update" className="h6-5-important" />
  );

  const initialValues = {
    min_quantity: "",
    max_quantity: "",
    quantity: "",
  }

  const handleBulkUpdate = (data) => {
    data.ids = storeIds
    data.min_quantity = data.min_quantity
    data.max_quantity = data.max_quantity
    data.quantity = data.quantity ? data.quantity : ""
    data.productId = productId
    dispatch(StoreProductService.bulkUpdate(data, toggle, productId));
  };

  return (<>
    <OutlineButton
      label="Bulk Update"
      onClick={() => {
        toggle();
      }}
      backgroundColor="var(--bulkUpdate-button-bg-color)"
      borderColor="var(--bulkUpdate-button-border-color)"
      color="var(--bulkUpdate-button-text-color)"
      className="float-right"
      disabled={storeIds && storeIds.selectedIds && storeIds.selectedIds.length > 0 ? false : true}
    />
    <AddModal
      modalTitle="Bulk Update"
      modalBody={bulkUpdateBody}
      isOpen={isOpen}
      initialValues={initialValues}

      toggle={toggle}
      modalFooter={editModelFooter}
      toggleModalClose={toggle}
      hideDefaultButtons
      onSubmit={(values) => {
        handleBulkUpdate(values);
      }}
    />
  </>

  );
};

export default storeProductBulkUpdateModal;
