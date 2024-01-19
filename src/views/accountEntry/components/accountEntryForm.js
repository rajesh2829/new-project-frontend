import React from "react";
import Select from "../../../components/Select";
import Text from "../../../components/Text";

// Components
import TextArea from "../../../components/TextArea";

// Constants
import DateSelector from "../../../components/Date";
import Currency from "../../../components/Currency";
import TagSelect from "../../../components/TagSelect";
import { TagTypeName } from "../../../helpers/Tag";
import AccountSelect from "../../../components/AccountSelect";

const AccountForm = (props) => {

  //Account Type
  const type = [
    {
      value: "Credit",
      label: "Credit",
    },
    {
      value: "Debit",
      label: "Debit",
    },
  ];

  return (
    <>
      <div className="card-body">
        <DateSelector
          label="Date"
          name="date"
          required />

        <Select
          label="Type"
          name="type"
          required={true}
          options={type} />

        <Currency
          label="Amount"
          name="amount"
          required={true} />

        <Select
          name="payment_account"
          label="Payment Account"
          placeholder="Select Account Name"
          options={props.bankList}
          required
        />

        <Text
          className="w-100"
          name="bank_reference_number"
          label="Bank Reference Number"
        />

        <TagSelect
          name="account_entry_category"
          label="Category"
          placeholder="Select Category"
          params={{ type: TagTypeName.ACCOUNT_ENTRY_CATEGORY }}
        />

        <AccountSelect
          name="account"
          label="Account"
          placeholder="Select Account"

        />

        <TextArea
          name="description"
          label="Description"
          placeholder="Enter Description..."
        />

        <TextArea
          name="bank_description"
          label="Bank Description"
          placeholder="Enter Bank Description..."
        />

        <TextArea name="notes" label="Notes" placeholder="Enter Notes..." />
      </div>
    </>
  );
};

export default AccountForm;
