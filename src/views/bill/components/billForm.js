import React, { useEffect, useState } from "react";
// Components
import Currency from "../../../components/Currency.js";
import DateSelector from "../../../components/Date";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
// Services
import addressService from "../../../services/AddressService";
// Helpers
import AccountSelect from "../../../components/AccountSelect";
import DraftEditor from "../../../components/Draft.js";
import Percentage from "../../../components/Percentage.js";
import UserSelect from "../../../components/UserSelect.js";
const billForm = (props) => {
  const [Address, setAddress] = useState(null);
  // Props
  const {
    className,
    onAccountChange,
    onInvoiceNumberChange,
    onNetAmountChange,
    handleInvoiceAmount,
    handleOtherDeductionAmount,
    handleTaxAmount,
    billValue,
    billData,
    handleCashDiscountPerentage,
    values,
    handleReturnedAmount,
    owner_id,
    editable,
    handleExpiryReturnedProductAmount
  } = props;

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    let addressList = [];
    const response = await addressService.list();
    const details = response.data.data;
    if (details) {
      details.forEach((address) => {
        const addressName = address.title + "" + `, (${address.name})`;

        addressList.push({
          label: addressName,
          value: address.id,
        });
      });
    }
    setAddress(addressList);
  };

  return (
    <>
      {/* Form */}
      <div className="row">
        <div className={`${className ? className : "col-sm-12"} "card-body"`}>
          <AccountSelect
            handleVendorChange={onAccountChange}
            name="account"
            label="Account"
            required
            isDisabled={editable}
          />
          <div className="row">
            <div className="col-6">
              <Text
                label="Invoice Number"
                name="invoice_number"
                onChange={onInvoiceNumberChange}
                required
                disabled={editable}
              />
            </div>
            <div className="col-6">
              <DateSelector
                label="Invoice Date"
                required={true}
                name="invoice_date"
                disabled={editable}
                onChange={props.invoiceDateChange}
              />
            </div>
          </div>

          <Select
            label="Billing Name"
            required
            name="billing_name"
            options={Address}
            onInputChange={billValue}
            isDisabled={editable}
          />
          {!props.showBilldetails && (
            <>
              <Currency
                name="invoice_amount"
                label="Invoice Amount"
                onChange={handleInvoiceAmount}
                disabled={editable}
              />
            </>
          )}
          {props.showBilldetails && (
            <>
              <div className="row">
                <div className="col-6">
                  <Currency
                    name="invoice_amount"
                    label="Invoice Amount"
                    onChange={handleInvoiceAmount}
                    disabled={editable}
                  />
                </div>
                <div className="col-6">
                  <Currency
                    label="Tax Amount"
                    name="gstAmount"
                    onChange={handleTaxAmount}
                    disabled={editable}
                  />
                </div>
              </div>
            </>
          )}
          <div className="row">
            <div className="col-6">
              <Currency
                label="Rejected Product Amount "
                name="rejectedProductAmount"
                onChange={handleReturnedAmount}
                disabled={editable}
              />
            </div>
            <div className="col-6">
              <Currency
                label="Expiry Returned Product Amount "
                name="expiryReturnedProductAmount"
                onChange={handleExpiryReturnedProductAmount}
                disabled={editable}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Currency
                label="Other Deduction Amount"
                name="otherDeductionAmount"
                onChange={handleOtherDeductionAmount}
                disabled={editable}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Percentage
                label="Cash Discount %"
                name="cash_discount_percentage"
                onChange={handleCashDiscountPerentage}
                disabled={editable}
              />
            </div>

            <div className="col-6">
              <Currency
                disabled={true}
                label="Cash Discount Amount"
                name="cashDiscountAmount"
              />
            </div>
          </div>

          <div>
            <Currency
              label="Net Amount"
              name="net_amount"
              required={true}
              onChange={onNetAmountChange}
              disabled={true}
            />
          </div>
          {!props.showBilldetails && (
            <DateSelector
              label="Due Date"
              name="due_date"
              onChange={props.handleDueDateChange}
              disabled={editable}
            />
          )}

          {props.showBilldetails && (
            <>
              <div className="row">
                <div className="col-6">
                  <UserSelect
                    name="owner"
                    label="Owner"
                    selectedUserId={owner_id ? owner_id : null}
                    isDisabled={editable}
                  />
                </div>
                <div className="col-6">
                  <DateSelector
                    label="Due Date"
                    name="due_date"
                    onChange={props.handleDueDateChange}
                    disabled={editable}
                  />
                </div>
              </div>
              <DraftEditor
                name="notes"
                label={"Notes"}
                editorState={props.editorState}
                onChange={props.handleEditorChange}
                disabled={editable}
              />
            </>
          )}


        </div>
      </div>
    </>
  );
};
export default billForm;
