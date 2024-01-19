import React from "react";

// Components
import DateSelector from "../../../components/Date";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import Currency from "../../../components/Currency";
// Helper
import * as Constants from "../../../helpers/SaleSettlement";
import { SaleSettlement } from "../../../helpers/SaleSettlement";
import Text from "../../../components/Text";
import MediaTab from "../../../components/mediaTab";
import ObjectName from "../../../helpers/ObjectName";
import SelectStore from "../../../components/SelectStore";
const SaleSettlementForm = (props) => {
  const {
    showDiscrepancy,
    showCalculatedAmount,
    showReceivedAmount,
    showMediaTab,
    showCashInStore,
    onCashChange,
    onUpiChange,
    onStoreChange,
    onShiftChange,
    onSalesExecutiveChange,
    onCalculatedCashChange,
    onCalculatedUpiChange,
    onReceivedCashChange,
    addSaleSettlementForm,
    onReceivedUpiChange,
    onDateChange,
    onStoreCashChange,
    onNotesChange,
    notes,
    statusOptions,
    shiftList,
    status,
    handleChange,
    PermissionList,
    onCashToOfficeChange,
    showProductCount,
    statusSelected,
    editable,
    id } = props;
  return (
    <>
      {/* Form */}
      <div className="row ">
        <div className={addSaleSettlementForm ? "col-lg-12 col-sm-12 col-md-12 card-body" : "col-lg-8 col-sm-8 col-md-8 card-body"}>
          <div className="row">
            <div className="col-sm-6">
              <DateSelector
                label="Date"
                name="date"
                format="dd-MMM-yyyy"
                required
                onChange={onDateChange}
                disabled={editable}
              />
            </div>

            <div className="col-sm-6">
              <SelectStore
                name="location"
                label="Location"
                handleStoreChange={onStoreChange}
                required
                isDisabled={editable}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Select
                name="salesExecutive"
                label="Sales Executive"
                options={props.salesExecutive}
                required={true}
                onInputChange={onSalesExecutiveChange}
                isDisabled={editable}

              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Select
                name="shift"
                label="Shift"
                options={props.shiftList}
                required
                onInputChange={onShiftChange}
                isDisabled={editable}
              />
            </div>
          </div>


          <div className="row ">
            <div className="col-sm-4">
              <Currency
                label="Amount(Cash)"
                name="amount_cash"
                onInputChange={onCashChange}
                required
                disabled={editable}
              />
            </div>
            <div className="col-sm-4">
              <Currency
                label="Amount(UPI)"
                onInputChange={onUpiChange}
                name="amount_upi"
                required
                disabled={editable}
              />
            </div>
            <div className="col-sm-4">
              <Currency
                label="Total Amount"
                name="total_amount"
                disabled
              />
            </div>
          </div>


          {showCalculatedAmount && (
            <div className="row">
              <div className="col-4">
                <Currency
                  label="Calculated Amount(Cash)"
                  name="calculated_amount_cash"
                  required={statusSelected == SaleSettlement.STATUS_DRAFT ? false : statusSelected == SaleSettlement.STATUS_REVIEW ? true : statusSelected == SaleSettlement.STATUS_COMPLETED ? true : false}
                  onInputChange={onCalculatedCashChange}
                  disabled={editable}
                /></div>
              <div className="col-4">
                <Currency
                  label="Calculated Amount(UPI)"
                  name="calculated_amount_upi"
                  required={statusSelected == SaleSettlement.STATUS_DRAFT ? false : statusSelected == SaleSettlement.STATUS_REVIEW ? true : statusSelected == SaleSettlement.STATUS_COMPLETED ? true : false}
                  onInputChange={onCalculatedUpiChange}
                  disabled={editable}
                />
              </div>
              <div className="col-4">
                <Currency
                  label="Total Calculated Amount"
                  name="total_calculated_amount"
                  disabled
                />
              </div>
            </div>
          )}
          {showReceivedAmount && (
            <div className="row">
              <div className="col-4">
                <Currency
                  label="Received Amount(Cash)"
                  name="received_amount_cash"
                  required={statusSelected == SaleSettlement.STATUS_DRAFT ? false : statusSelected == SaleSettlement.STATUS_REVIEW ? true : statusSelected == SaleSettlement.STATUS_COMPLETED ? true : false}
                  onInputChange={onReceivedCashChange}
                  disabled={editable}
                />
              </div>
              <div className="col-4">
                <Currency
                  label="Received Amount(UPI)"
                  name="received_amount_upi"
                  required={statusSelected == SaleSettlement.STATUS_DRAFT ? false : statusSelected == SaleSettlement.STATUS_REVIEW ? true : statusSelected == SaleSettlement.STATUS_COMPLETED ? true : false}
                  onInputChange={onReceivedUpiChange}
                  disabled={editable}
                />
              </div>
              <div className="col-4">
                <Currency
                  label="Total Received Amount"
                  name="total_received_amount"
                  disabled
                />
              </div>
            </div>
          )}
          {showDiscrepancy && (
            <div className="row">
              <div className="col-4">
                <Currency
                  label="Discrepancy Amount(Cash)"
                  name="discrepancy_amount_cash"
                  disabled
                  allowNegative
                />
              </div>
              <div className="col-4">
                <Currency
                  label="Discrepancy Amount(UPI)"
                  name="discrepancy_amount_upi"
                  disabled
                  allowNegative
                />
              </div>
              <div className="col-4">
                <Currency
                  label="Total Discrepancy Amount"
                  name="total_discrepancy_amount"
                  disabled
                  allowNegative
                />
              </div>
            </div>
          )}
          <div className="row">
            {showCashInStore && (
              <div className="col-sm-6">
                <Currency label="Cash In Location" onInputChange={onStoreCashChange} name="cash_in_store" required disabled={editable} />
              </div>
            )}
            <div className="col-sm-6">
              <Currency label="Cash To Office" onInputChange={onCashToOfficeChange} name="cash_to_office" required disabled={editable}/>
            </div>
          </div>

          {showProductCount && (
            <div>
              <Text
                label="Product Count"
                name="productCount"
                placeholder="Product Count"
                disabled={editable}
              />
            </div>
          )}
          <TextArea className="w-100  pull-left" name="notes" value={notes} onChange={onNotesChange} label="Notes" disabled={editable} />
        </div>
        <div className="col-lg-4 col-sm-4 col-md-4">
          {showMediaTab && (
            <MediaTab Id={id} ObjectName={ObjectName.SALE_SETTLEMENT} />
          )}
        </div>
      </div>

    </>
  );
};

export default SaleSettlementForm;
