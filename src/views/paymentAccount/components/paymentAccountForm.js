import React, { } from "react";
import Number from "../../../components/Number";
import Select from "../../../components/Select";
import Text from "../../../components/Text";

// Components
import TextArea from "../../../components/TextArea";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Account from "../../../helpers/Account";
import { paymentAccounts } from "../../../helpers/AccountEntry";
const AccountForm = ({ primary, setPrimary }) => {

    const handleEnableFeature = async (value) => {
        const primary =
            value === true
                ? Account.PRIMARY_ENABLED
                : Account.PRIMARY_DISABLED;
        await setPrimary(primary);
    };

    return (
        <>
            {/* Form */}
            <Select
                label="Payment Account Type"
                name="payment_account_type"
                required
                options={paymentAccounts}
            />
            <Text label="Payment Account Name" name="payment_account_name" required />
            <Number label="Payment Account Number" name="payment_account_number" />
            <Text label="IFSC" name="ifsc" />
            <Text label="Bank Name" name="bank_name" />
            <TextArea
                name="description"
                label="Description"
                placeholder="Enter Description..."
            />
            <div className="d-flex justify-content-between">
                <p>Make this as primary</p>
                <ToggleSwitch
                    name="primary"
                    handleChange={(e) => {
                        handleEnableFeature(e.target.checked);
                    }}
                    value={primary == Account.PRIMARY_ENABLED ?
                        true : Account.PRIMARY_DISABLED}
                    outlined
                />
            </div>
        </>
    )
}

export default AccountForm;