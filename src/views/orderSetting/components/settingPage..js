import React, { useEffect, useState } from "react";
import Form from "../../../components/Form";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import {
  getCompanySettings,
  saveSetting
} from "../../../services/SettingService";
import { getKeyValueByObject } from "../../../lib/Helper";
import { Setting } from "../../../helpers/Setting";
import ObjectName from "../../../helpers/ObjectName";
import Text from "../../../components/Text";
import Number from "../../../components/Number";
import { Input } from "reactstrap";

const SettingPage = (props) => {
  const [orderGenerationNumber, setOrderGenerationNumber] = useState("");
  const [lastOrderNumber, setLastOrderNumber] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [graceTime, setGraceTime] = useState(null);
  const [allowedDraftOrders, setAllowedDraftOrders] = useState("");


  const [orderGenerationNumberType, setOrderGenerationNumberType] =

    useState(null);

  useEffect(() => {
    getSettings();
  }, []);

  let options = [
    {
      label: "Company Wise",
      value: "Company Wise"
    },
    {
      label: "Location Wise",
      value: "Location Wise"
    }
  ];

  const getSettings = async () => {
    const settingData = await getCompanySettings();
    let value = getKeyValueByObject(
      settingData,
      Setting.SETTING_ORDER_NUMBER_GENERATION
    );
    let lastOrderNumber = getKeyValueByObject(
      settingData,
      Setting.SETTING_LAST_ORDER_NUMBER
    );
    let orderCode = getKeyValueByObject(
      settingData,
      Setting.ORDER_CODE
    );
    let allowedOrder = getKeyValueByObject(
      settingData,
      Setting.SETTING_ALLOWED_DRAFT_ORDERS
    );
    let orderGraceTime = getKeyValueByObject(
      settingData,
      Setting.ORDER_CANCEL_GRACE_TIME
    );
    setOrderCode(orderCode)
    setOrderGenerationNumber(value);
    setLastOrderNumber(lastOrderNumber);
    setGraceTime(orderGraceTime);
    setAllowedDraftOrders(allowedOrder);
  };

  const handleSubmit = (values) => {
    let data = new FormData();
    data.append(
      Setting.SETTING_ORDER_NUMBER_GENERATION,
      values && values?.order_number_generation ? values?.order_number_generation?.value : ""
    );
    data.append(
      Setting.SETTING_LAST_ORDER_NUMBER,
      values && values?.last_order_number ? values?.last_order_number : ""
    );
    data.append(
      Setting.ORDER_CODE,
      values && values?.order_code ? values?.order_code : ""
    );
    data.append(
      Setting.SETTING_ALLOWED_DRAFT_ORDERS,
      values && values?.allowed_draft_orders ? values?.allowed_draft_orders : ""
    );
    data.append(
      Setting.ORDER_CANCEL_GRACE_TIME,
      values.order_cancel_grace_time ? values.order_cancel_grace_time.value : ""
    );
    data.append("objectName", ObjectName.ORDER);
    data.append("objectId", "");
    saveSetting(data, null, (res) => {
      if (res) {
      }
    });
  };
  const generateMinutesOptions = (start, end, interval) => {
    const options = [];
    for (let i = start; i <= end; i += interval) {
      options.push({
        label: `${i} minute${i !== 1 ? 's' : ''}`,
        value: i,
      });
    }
    return options;
  };

  const onChange = (value) => {
    let orderGenerationNumberType = value ? value.value : "";
    setOrderGenerationNumberType(orderGenerationNumberType);
    setOrderGenerationNumber(orderGenerationNumberType)
  };
  const handleGraceTimeChange = (time) => {
    let data = time && time?.value
    setGraceTime(data)
  }
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if the input is a valid integer
    if (/^\d+$/.test(value) || value === "") {
      setAllowedDraftOrders(value);
    }
  };


  return (
    <div className="card card-body">
      <Form
        initialValues={{
          order_number_generation: orderGenerationNumber && options.find(
            (data) => data?.value == orderGenerationNumber
          ),
          allowed_draft_orders : allowedDraftOrders ? allowedDraftOrders : "",
          last_order_number: lastOrderNumber ? lastOrderNumber : "",
          order_code: orderCode ? orderCode : "",
          order_cancel_grace_time: generateMinutesOptions(5, 60, 5).find((data) => data.value == graceTime)

        }}
        enableReinitialize
        onSubmit={handleSubmit}>
        <div>
          <div className="col-6">
            <Select
              name={Setting.SETTING_ORDER_NUMBER_GENERATION}
              label="Order Number Generation"
              options={options}
              handleChange={onChange}
            />
            <Text
              type="text"
              name={Setting.SETTING_ALLOWED_DRAFT_ORDERS}
              value={allowedDraftOrders}
              onChange={handleInputChange}
              label = "Allowed Draft Orders"
            />
            {
              (orderGenerationNumberType === Setting.COMPANY_WISE ||
                (orderGenerationNumber === Setting.COMPANY_WISE && orderGenerationNumberType === null)) && (
                <div>
                  <Text
                    name={Setting.SETTING_LAST_ORDER_NUMBER}
                    label="Last Order Number"
                  />
                  <Text
                    name={Setting.ORDER_CODE}
                    label="Order Code"
                  />
                </div>
              )
            }
          </div>
          <div className="col-6">
            <SaveButton label="Save" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SettingPage;
