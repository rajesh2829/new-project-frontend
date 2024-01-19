import React from "react";

// Components
import Currency from "../../../components/Currency.js";
import DateSelector from "../../../components/Date";
import Text from "../../../components/Text";
import TextArea from "../../../components/TextArea";

// Helpers && Api
import AccountSelect from "../../../components/AccountSelect";
import MediaCarousel from "../../../components/MediaCarousel";
import Notes from "../../../components/Notes.js";
import SelectStore from "../../../components/SelectStore";
import UserSelect from "../../../components/UserSelect.js";
import Account from "../../../helpers/Account.js";
import ObjectName from "../../../helpers/ObjectName";
import Permission from "../../../helpers/Permission.js";
import { hasPermission } from "../../../services/UserRolePermissionService.js";

const purchaseForm = (props) => {
  let enableDueDateEdit = hasPermission(Permission.PURCHASE_DUE_DATE_UPDATE);
  // Props
  const {
    className,
    history,
    onVendorChange,
    onDescriptionChange,
    onStoreChange,
    onPurchaseNumberChange,
    id,
    vendorData,
    handleNotesChange,
    showNotes,
    onVendorInvoiceDateChange,
    onDueDateChange,
    owner_id,
    handleInvoiceAmount,
    handleReturnedAmount,
    handleOtherDeductionAmount,
    handlePurchaseChange,
    handleUserChange,
    editable,
  } = props;

  return (
    <>
      {/* Form */}
      <div className="row">
        <div className={`${className ? className : "col-sm-12"} "card-body"`}>
          <div className="row d-flex">
            <div className="col">
              <DateSelector
                label="Purchase Date"
                required={true}
                disabled={editable}
                name="date"
                onChange={handlePurchaseChange}
              />
            </div>
          </div>
          <AccountSelect
            name="vendor_name"
            handleVendorChange={onVendorChange}
            label="Vendor"
            required
            isDisabled={editable}
            type={Account.TYPE_VENDOR}
          />
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-md">
              <Text
                label="Vendor Invoice Number"
                name="vendor_invoice_number"
                onChange={onPurchaseNumberChange}
                disabled={editable}
                required
              />
            </div>
            <div className="col-lg-6 col-sm-6 col-md-6">
              <DateSelector
                label="Vendor Invoice Date"
                name="vendor_invoice_date"
                onChange={onVendorInvoiceDateChange}
                isClearable
                disabled={editable}

              />
            </div>
          </div>
          <Currency
            name="invoice_amount"
            label="Invoice Amount"
            onChange={handleInvoiceAmount}
          />
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-md-6">
              <Currency
                label="Returned Items Amount "
                name="returnedItemAmount"
                onChange={handleReturnedAmount}
                disabled={editable}

              />
            </div>
            <div className="col-lg-6 col-sm-6 col-md-6">
              <Currency
                label="Other Deduction Amount"
                name="otherDeductionAmount"
                onChange={handleOtherDeductionAmount}
                disabled={editable}

              />
            </div>
          </div>
          <Currency
            label="Net Amount"
            name="net_amount"
            required={true}
            disabled={true}
          />
          <div>
            <SelectStore
              name="location"
              label="Location"
              handleStoreChange={onStoreChange}
              required
              isDisabled={editable}

            />
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-md-6">
              <UserSelect
                name="owner"
                label="Owner"
                selectedUserId={owner_id ? owner_id : null}
                showLoggedInUser={owner_id ? false : true}
                handleUserChange={handleUserChange}
                isDisabled={editable}

              />
            </div>
            <div className="col-lg-6 col-sm-6 col-md-6">
              <DateSelector
                label="Due Date"
                name="due_date"
                onChange={onDueDateChange}
                isClearable={enableDueDateEdit ? true : false}
                disabled={enableDueDateEdit ? false : true}
              />
            </div>
          </div>
          <TextArea
            name="description"
            label="Description"
            onChange={onDescriptionChange}
            placeholder="Enter Description..."
            disabled={editable}

          />
          {showNotes && (
            <Notes name="notes" label="Notes" disabled={editable} onChange={handleNotesChange} />
          )}
        </div>

        {vendorData?.vendor_name && (
          <div className="col-lg-5">
            <MediaCarousel
              showCarasoul
              objectName={ObjectName.PURCHASE}
              objectId={vendorData?.data?.id}
              history={history}
              attachmentsList={true}
              Attachments={"Attachments"}
              editable={editable}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default purchaseForm;
