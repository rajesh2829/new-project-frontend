import React, { useEffect, useState } from "react";

//components
import Form from "../../components/Form";

import SingleCheckbox from "../../components/SingleCheckbox";

import { getSetings, saveSetting } from "../../services/SettingService";

import { Setting } from "../../helpers/Setting";

import { getKeyValueByObject } from "../../lib/Helper";

import ArrayList from "../../lib/ArrayList";

import CancelButton from "../../components/CancelButton";
import DateSelector from "../../components/Date";
import MultiSelect from "../../components/Multiselect";
import MultiselectCreatable from "../../components/MultiselectCreatable";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import StoryPointSelect from "../../components/StoryPointSelect";
import ObjectName from "../../helpers/ObjectName";
import DateTime from "../../lib/DateTime";
import Number from "../../lib/Number";
import ShiftService from "../../services/ShiftService";
import StoreSelector from "../store/components/storeSelector";
import Numbers from "../../components/Number";


function Checkbox({ day, checked, onChange }) {
  return (
    <label>
      <input
        className="mr-2"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(day, e.target.checked)}
      />
      {day}
    </label>
  );
}

const RoleSetting = (props) => {
  const [settings, setSettings] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [minWorkHours, setMinWorkHours] = useState(null);
  const [minStoryPoints, setMinStoryPoints] = useState(null);
  const [shift, setShift] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const [shiftList, setShiftList] = useState([]);
  const [graceTime, setGraceTime]=useState(null)
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    getSettings();
    getShift();
  }, [props]);

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

  // Get Shift List
  const getShift = async () => {
    const list = await ShiftService.getShiftLists();
    setShiftList(list);
  };
  const getSettings = async () => {
    //get company id from cookie
    let params = { object_id: Number.Get(props?.roleId) };
    //get company setting
    const settingData = await getSetings(params);

    //set setting in state
    setSettings(settingData);
    setSelectedDays(
      getKeyValueByObject(settingData, Setting.USER_WORKING_DAYS).split(",")
    );
  };

  const convertTimeStringToDate = (timeString) => {
    const [hours, minutes] = timeString && timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };


  const minimumStoryPoints = minStoryPoints
    ? minStoryPoints
    : settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(settings, Setting.SETTING_MINIMUM_STORY_POINTS)
    ? getKeyValueByObject(settings, Setting.SETTING_MINIMUM_STORY_POINTS)
    : null;

    let allowedShifts = getKeyValueByObject(settings, Setting.ROLE_ALLOWED_SHIFT);
    let shiftValue = [];
    if (allowedShifts) {
      let shidtData = allowedShifts && allowedShifts.split(',');
      shidtData.forEach((value) => {
        let data = shiftList && shiftList.find((data) => data?.value == value);
        shiftValue.push(data);
      });
    }
    let allowedLocation = getKeyValueByObject(settings, Setting.ROLE_ALLOWED_LOCATIONS);
    let locationValue = [];
    if (allowedLocation) {
      let locationData = allowedLocation && allowedLocation.split(',');
      locationData.forEach((value) => {
        let data = storeList && storeList.find((data) => data?.id == value);
        locationValue.push(data);
      });
    }
    let allowedIpAddress = getKeyValueByObject(settings, Setting.ROLE_ALLOWED_IP_ADDRESS);
    let ipAddressValue = [];
    if (allowedIpAddress) {
      let ipData = allowedIpAddress && allowedIpAddress.split(',');
      ipData.forEach((value) => {
        ipAddressValue.push({
          label: value,
          value: value,
        });
      });
    }

  // Initial values
  const initialValues = {
    validate_sales_settlement_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.SETTING_VALIDATE_SALES_SETTLEMENT_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_ticket_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.SETTING_VALIDATE_PENDING_TICKET_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    force_check_in_after_login:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(settings, Setting.FORCE_CHECK_IN_AFTER_LOGIN) ==
        'true'
        ? true
        : false,
    force_logout_after_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(settings, Setting.FORCE_LOGOUT_AFTER_CHECKOUT) ==
        'true'
        ? true
        : false,
    validate_timesheet_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.SETTING_VALIDATE_TIMESHEET_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_checkout_on_attendance_checkin:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.SETTING_VALIDATE_PENDING_CHECKOUT_ON_ATTENDANCE_CHECKIN
      ) == 'true'
        ? true
        : false,
    validate_pending_fines_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.VALIDATE_PENDING_FINES_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_orders_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.VALIDATE_PENDING_ORDERS_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_transfer_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.VALIDATE_PENDING_TRANSFER_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_payments_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.VALIDATE_PENDING_PAYMENTS_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_purchases_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.VALIDATE_PENDING_PURCHASES_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_pending_bills_on_attendance_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(
        settings,
        Setting.VALIDATE_PENDING_BILLS_ON_ATTENDANCE_CHECKOUT
      ) == 'true'
        ? true
        : false,
    validate_stock_entry:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(settings, Setting.VALIDATE_STOCK_ENTRY) == 'true'
        ? true
        : false,
    validate_shift_time_on_checkout:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(settings, Setting.VALIDATE_SHIFT_TIME_ON_CHECKOUT) ==
        'true'
        ? true
        : false,
    validate_replenishment:
      settings &&
      ArrayList.isNotEmpty(settings) &&
      getKeyValueByObject(settings, Setting.VALIDATE_REPLENISHMENT) == 'true'
        ? true
        : false,
        validate_shift_hours_on_checkout:
        settings &&
        ArrayList.isNotEmpty(settings) &&
        getKeyValueByObject(settings, Setting.VALIDATE_SHIFT_HOURS_ON_CHECKOUT) == 'true'
          ? true
          : false,
    minimum_replenish_products: settings &&  ArrayList.isNotEmpty(settings) && getKeyValueByObject(settings, 'minimum_replenish_products') ? getKeyValueByObject(settings, 'minimum_replenish_products'):"",
    minimum_story_points: minimumStoryPoints
      ? {
          label: minimumStoryPoints,
          value: minimumStoryPoints,
        }
      : '',
    checkin_grace_time: graceTime
      ? generateMinutesOptions(5, 60,5).find((data) => data.value == graceTime)
      : generateMinutesOptions(5, 60,5).find(
          (data) =>
            data.value == getKeyValueByObject(settings, Setting.CHECKIN_GRACE_TIME)
        ),
      role_allowed_shift: shiftValue,
      role_allowed_locations: locationValue,
        role_allowed_ip_address: ipAddressValue,
        enable_otp_login:
        settings &&
        ArrayList.isNotEmpty(settings) &&
        getKeyValueByObject(
          settings,
          Setting.ENABLE_OTP_LOGIN
        ) == 'true'
          ? true
          : false,
  };

  const handleCheckBoxValue = (values) => {
    //create new form data
    const data = new FormData();

    //validate value exist or not
    if (
      values &&
      values.validate_sales_settlement_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.SETTING_VALIDATE_SALES_SETTLEMENT_ON_ATTENDANCE_CHECKOUT,
        values.validate_sales_settlement_on_attendance_checkout
      );
    }

    if (
      values &&
      values.validate_pending_ticket_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.SETTING_VALIDATE_PENDING_TICKET_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_ticket_on_attendance_checkout
      );
    }
    if (values && values.force_check_in_after_login !== undefined) {
      //append the value
      data.append(
        Setting.FORCE_CHECK_IN_AFTER_LOGIN,
        values.force_check_in_after_login
      );
    }

    if (values && values.force_logout_after_checkout !== undefined) {
      //append the value
      data.append(
        Setting.FORCE_LOGOUT_AFTER_CHECKOUT,
        values.force_logout_after_checkout
      );
    }

    if (
      values &&
      values.validate_timesheet_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.SETTING_VALIDATE_TIMESHEET_ON_ATTENDANCE_CHECKOUT,
        values.validate_timesheet_on_attendance_checkout
      );
    }
    if (
      values &&
      values.validate_pending_fines_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_PENDING_FINES_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_fines_on_attendance_checkout
      );
    }

    if (
      values &&
      values.validate_pending_orders_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_PENDING_ORDERS_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_orders_on_attendance_checkout
      );
    }
    if (
      values &&
      values.validate_pending_transfer_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_PENDING_TRANSFER_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_transfer_on_attendance_checkout
      );
    }
    if (
      values &&
      values.validate_pending_payments_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_PENDING_PAYMENTS_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_payments_on_attendance_checkout
      );
    }
    if (
      values &&
      values.validate_pending_purchases_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_PENDING_PURCHASES_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_purchases_on_attendance_checkout
      );
    }
    if (
      values &&
      values.validate_pending_bills_on_attendance_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_PENDING_BILLS_ON_ATTENDANCE_CHECKOUT,
        values.validate_pending_bills_on_attendance_checkout
      );
    }
    if (
      values &&
      values.validate_pending_checkout_on_attendance_checkin !== undefined
    ) {
      //append the value
      data.append(
        Setting.SETTING_VALIDATE_PENDING_CHECKOUT_ON_ATTENDANCE_CHECKIN,
        values.validate_pending_checkout_on_attendance_checkin
      );
    }
    if (
      values &&
      values.validate_stock_entry !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_STOCK_ENTRY,
        values.validate_stock_entry
      );
    }
    if (
      values &&
      values.validate_replenishment !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_REPLENISHMENT,
        values.validate_replenishment
      );
    }
    if (
      values &&
      values.validate_shift_hours_on_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_SHIFT_HOURS_ON_CHECKOUT,
        values.validate_shift_hours_on_checkout
      );
    }
    if (
      values &&
      values.enable_otp_login !== undefined
    ) {
      //append the value
      data.append(
        Setting.ENABLE_OTP_LOGIN,
        values.enable_otp_login
      );
    }
    if (
      values &&
      values.validate_shift_time_on_checkout !== undefined
    ) {
      //append the value
      data.append(
        Setting.VALIDATE_SHIFT_TIME_ON_CHECKOUT,
        values.validate_shift_time_on_checkout
      );
    }
 
    data.append("objectId", props.roleId);

    data.append("objectName", ObjectName.ROLE);

    // Save settings
    saveSetting(data, null, () => {
      getSettings();
    });
  };

  const handleUpdate = (value) => {

    let allowedShift=[]
    for (let i = 0; i < value.role_allowed_shift.length; i++) {
      const data = value.role_allowed_shift[i];
      allowedShift.push(data?.value)
    }
    let allowedLocation=[]
    for (let i = 0; i < value.role_allowed_locations.length; i++) {
      const data = value.role_allowed_locations[i];
      allowedLocation.push(data?.id)
    }
    let allowedIpAddress=[]
    for (let i = 0; i < value.role_allowed_ip_address.length; i++) {
      const data = value.role_allowed_ip_address[i];
      allowedIpAddress.push(data?.value)
    }

    let data = new FormData();

    data.append(Setting.USER_WORKING_DAYS, selectedDays ? selectedDays : "");
    data.append(
      "minimum_story_points",
      value.minimum_story_points ? value.minimum_story_points.value : ""
    );
    data.append(
      "minimum_replenish_products",
      value?.minimum_replenish_products ? value?.minimum_replenish_products : ""
    );
    data.append(
      "checkin_grace_time",
      value.checkin_grace_time ? value.checkin_grace_time.value : ""
    );
    data.append(Setting.ROLE_ALLOWED_SHIFT, allowedShift && allowedShift.length > 0 ? allowedShift.join(","):"");
    data.append(Setting.ROLE_ALLOWED_LOCATIONS, allowedLocation && allowedLocation.length > 0 ? allowedLocation.join(","):"");
    data.append(Setting.ROLE_ALLOWED_IP_ADDRESS, allowedIpAddress && allowedIpAddress.length > 0 ? allowedIpAddress.join(","):"");
    data.append("objectId", props.roleId);
    data.append("objectName", ObjectName.ROLE);

    saveSetting(data, null, () => {
      getSettings();
    });
  };

  const handleCheckboxChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };

  const handleChange = (values) => {
    let dataValue = values && values?.values;
    if (dataValue?.minimum_story_points !== null) {
      let data =
        dataValue && dataValue?.minimum_story_points
          ? dataValue?.minimum_story_points.value
          : null;
      setMinStoryPoints(data);
    } else {
      setMinStoryPoints(null);
    }
  };
  const handleShiftChange = (values) => {
    let dataValue = values && values?.values;
    if (dataValue?.shift !== null) {
      let data = dataValue && dataValue?.shift ? dataValue?.shift.value : null;
      setShift(data);
    } else {
      setShift(null);
    }
  };

  const handleLoginTimeChange = (selectedTime) => {
    let date = selectedTime ? DateTime.getTime(selectedTime):"";
    const data = date ?  convertTimeStringToDate(date) :"";
    setLoginTime(data);
  };

  const handleGraceTimeChange=(time)=>{
    let data = time && time?.value
   setGraceTime(data)
  }

  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleUpdate}>
        <div className="card bg-white">
          <div className="card-body">
            <h5>Attendance</h5>
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={
                  Setting.SETTING_VALIDATE_SALES_SETTLEMENT_ON_ATTENDANCE_CHECKOUT
                }
                label={"Validate Sales Settlement On Attendance CheckOut"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>

            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={
                  Setting.SETTING_VALIDATE_PENDING_TICKET_ON_ATTENDANCE_CHECKOUT
                }
                label={"Validate Pending Ticket On Attendance CheckOut"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.FORCE_CHECK_IN_AFTER_LOGIN}
                label={"Force CheckIn After Login"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>

            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.SETTING_VALIDATE_TIMESHEET_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Timesheet on Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={
                  Setting.SETTING_VALIDATE_PENDING_CHECKOUT_ON_ATTENDANCE_CHECKIN
                }
                label={"Validate Pending Checkout on Attendance CheckIn"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_PENDING_FINES_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Pending Fines On Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_PENDING_ORDERS_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Pending Orders On Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_PENDING_TRANSFER_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Pending Transfer On Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_PENDING_PAYMENTS_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Pending Payments On Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_PENDING_PURCHASES_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Pending Purchases On Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_SHIFT_TIME_ON_CHECKOUT}
                label={"Validate Shift Time On Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_PENDING_BILLS_ON_ATTENDANCE_CHECKOUT}
                label={"Validate Pending Bills On Attendance Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.FORCE_LOGOUT_AFTER_CHECKOUT}
                label={"Force Logout After Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br/>
            <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_STOCK_ENTRY}
                label={"Validate Stock Entry"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br/>
              <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_REPLENISHMENT}
                label={"Validate Replenishment"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br/>
              <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.VALIDATE_SHIFT_HOURS_ON_CHECKOUT}
                label={"Validate Shift Hours On Checkout"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br/>
              <div className="field-wrapper mt-4">
              <SingleCheckbox
                name={Setting.ENABLE_OTP_LOGIN}
                label={"Enable OTP Login"}
                handleOnChangeSubmit={(value, name) =>
                  handleCheckBoxValue(value, name)
                }
              />
            </div>
            <br />
            <div className="mt-4">
              <div className="col">
                <StoryPointSelect
                  name="minimum_story_points"
                  label="Minimum Story Points"
                  placeholder="Select Minimum Story Points"
                  onChange={handleChange}
                />
              </div>
              <div className="col">
              <Numbers label="Minimum Replenish Products" name="minimum_replenish_products" />
              </div>
              <div className="col">
                <Select
                  name={Setting.CHECKIN_GRACE_TIME}
                  label="CheckIn Grace Time"
                  options={generateMinutesOptions(5,60,5)}
                  handleChange={handleGraceTimeChange}
                />
              <MultiSelect
                label="Allowed Shifts"
                name={Setting.ROLE_ALLOWED_SHIFT}
                options={shiftList ? shiftList : []}
              />
              </div>
              <div className="col">
              <StoreSelector label="Allowed Location" name={Setting.ROLE_ALLOWED_LOCATIONS} setStoreList={setStoreList}/>
              </div>
              <div className="col">
              <MultiselectCreatable
                name={Setting.ROLE_ALLOWED_IP_ADDRESS}
                placeholder="Allowed IP addresses"
                label="Allowed IP addresses"
              />
              </div>
            </div>
            <label>Working Days</label>
            <br />
            <div className="d-flex justify-content-between">
              <Checkbox
                day="Monday"
                checked={selectedDays.includes("Monday")}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                day="Tuesday"
                checked={selectedDays.includes("Tuesday")}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                day="Wednesday"
                checked={selectedDays.includes("Wednesday")}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                day="Thursday"
                checked={selectedDays.includes("Thursday")}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                day="Friday"
                checked={selectedDays.includes("Friday")}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                day="Saturday"
                checked={selectedDays.includes("Saturday")}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                day="Sunday"
                checked={selectedDays.includes("Sunday")}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="mb-4">
              <div>
                <SaveButton />
                <CancelButton onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RoleSetting;
