import React from "react";
import DateSelector from "../../../components/Date";
import Select from "../../../components/Select";
import SelectStore from "../../../components/SelectStore";
import HorizontalSpace from "../../../components/HorizontalSpace";
import SaveButton from "../../../components/SaveButton";
import CancelButton from "../../../components/CancelButton";
import Url from "../../../helpers/Url";
import Currency from "../../../components/Currency";
import UserSelect from "../../../components/UserSelect";

const GeneralTab = (props) => {
  const {
    paymentType,
    selectedDate,
    orderDateFieldOnchange,
    storeFieldOnchange,
    storeOption,
    shiftOption,
    handleShiftChange,
    salesExecutiveOption,
    onChangeSalesExecutive,
    onChangePaymentValue,
    history,
    orderId,
    customerList,
    pathName,
    onChangeSalesCustomer,
    editable,
    onChangeAssignee,
  } = props;

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="d-flex col-6">
          <div className="col pl-0">
            <DateSelector
              name="date"
              maxDate={new Date()}
              label="Date"
              selected={selectedDate}
              onChange={orderDateFieldOnchange}
              position="unset"
              disabled={editable}
            />
          </div>
          <div className="col pr-0">
            <DateSelector
              name="date"
              label="Time"
              showTimeSelectOnly
              selected={selectedDate}
              showTimeSelect={true}
              onChange={orderDateFieldOnchange}
              format="h:mm aa"
              disabled={editable}
            />
          </div>
        </div>
        <div className="col-6">
          <Select
            placeholder=" Select shift"
            name="shift"
            label="Shift"
            options={shiftOption}
            onInputChange={(e) => handleShiftChange(e)}
            required
            isDisabled={editable}
          />
        </div>
      </div>

      <div className="d-flex w-100">
        <div className="col-6 pl-0">
          <SelectStore
            label="Location"
            required
            handleStoreChange={storeFieldOnchange}
            isDisabled={editable}
          />
        </div>
        <div className="col pr-0">
          <Select
            name="payment_type"
            placeholder="Select Payment"
            label="Payment Type"
            options={paymentType}
            onInputChange={(e) => onChangePaymentValue(e)}
            required
            isDisabled={editable}
          />
        </div>
      </div>

      <div className="row">
      {pathName == "/deliveryOrder" ? (
        <div className="col-6">
         <UserSelect
          name="assignee"
          label="Assignee"
          placeholder="Assignee"
          required
          isDisabled={editable}
          handleUserChange = {onChangeAssignee}
        />
      </div>
      ) : (

        <div className="col-6">
          <Select
            name="sales_executive_user_id"
            label="Sales Executive"
            placeholder="Sales Executive"
            options={salesExecutiveOption}
            onInputChange={(e) => onChangeSalesExecutive(e)}
            required
            isDisabled={editable}
          />
        </div>
              )}

        <div className="d-flex col pr-0">
          <div className="col pl-0">
            <Currency
              name="cash_amount"
              label="Cash Amount"
              onInputChange={props.handleCashAmount}
              disabled={editable}
            />
          </div>
          <div className="col">
            <Currency
              name="upi_amount"
              label="Upi Amount"
              onInputChange={props.handleUpiAmount}
              disabled={editable}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          {pathName == "/deliveryOrder" ||
          pathName == "/location/deliveryOrders/details" ? (
            <Select
              name="customer_account"
              placeholder="Select Customer"
              label="Customer"
              options={customerList}
              onInputChange={(e) => onChangeSalesCustomer(e)}
              required
              isDisabled={editable}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {!orderId && (
        <HorizontalSpace>
          <SaveButton label="Save" />
          <CancelButton
            onClick={() => {
              if (pathName == "/location/deliveryOrders/details") {
                history.push(Url.DELIVERY_ORDER_LIST);
              } else if (pathName == "/deliveryOrder") {
                history.push(Url.DELIVERY_ORDER_LIST);
              } else {
                history.push("/orders");
              }
            }}
          />
        </HorizontalSpace>
      )}
    </div>
  );
};

export default GeneralTab;
