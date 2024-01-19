import React from "react";
import Text from "../../../components/Text";
import Url from "../../../components/Url";
import AlphaNumericText from "../../../components/AlphaNumericText";
import Select from "../../../components/Select";
import Percentage from "../../../components/Percentage";
import TextArea from "../../../components/TextArea";
import Account from "../../../helpers/Account";
import PaymentAccountSelect from "../../../components/PaymentAccountSelect";
import DraftEditor from "../../../components/Draft";
import { typeOption, vendorStatusOptions } from "../../../helpers/Vendor";

const AccountForm = (props) => {

  return (
    <>
      <div className="card border-0 p-3">
        <div className="row">
          <div className="col order-2 order-lg-1 d-inline-block">
            <Text
              label="Name"
              name="vendor_name"
              placeholder="Name"
              onChange={props?.vendorChange}
              required
              notify
              disabled={props.editable}
            />
            <Select
              fullWidth={true}
              label="Type"
              name="type"
              options={typeOption}
              onInputChange={props?.handleTypeChange}
              isDisabled={props.editable}
            />
            <Select
              fullWidth={true}
              label="Status"
              name="status"
              isClearable
              options={vendorStatusOptions}
              handleChange={(e) => props?.handleStatusChange(e)}
              isDisabled={props.editable}
            />
            <Url
              label="Website"
              name="vendor_url"
              placeholder="Website"
              disabled={props.editable}
              onChange={props?.handleChange}
            />
            {((props.type ? props.type : props?.row && props?.row?.typeId) === Account.TYPE_CUSTOMER) && (
              <AlphaNumericText
                label="GST Number"
                name="gst_number"
                placeholder="GST Number"
                notify
                disabled={props.editable}
              />
            )}
            {(props?.type ? props?.type : props?.row && props?.row?.typeId) == Account.TYPE_VENDOR && (
              <>
                <PaymentAccountSelect
                  handleChange={props?.handlePaymentAccountChange}
                  setpaymentAccountName={props?.setpaymentAccountName}
                  detail={props?.row?.payment_account
                    ? props?.row?.payment_account
                    : props?.vendorDetails && props?.vendorDetails?.data?.payment_account}
                  name={"payment_account"}
                  label={"Payment Account"}
                  isDisabled={props.editable}
                />
                <Percentage name="cash_discount" label="Cash Discount %" disabled={props.editable} onInputChange={props?.handleCashDiscount} />
                <TextArea
                  name="payment_terms"
                  label="Payment Terms"
                  placeholder="Payment Terms"
                  disabled={props.editable}
                  onChange={props?.handlePaymentTerms}
                />
                <TextArea
                  name="return_terms"
                  label="Return Terms"
                  placeholder="Return Terms"
                  disabled={props.editable}
                  onChange={props?.handleReturnTerms}
                />
              </>
            )}
            <DraftEditor
              name="notes"
              label={"Notes"}
              editorState={props?.editorState}
              onChange={props?.handleEditorChange}
              readOnly={props?.editable}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountForm;
