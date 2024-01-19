import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import Filter from "../../components/Filter";
import { orderPaymentTypeOptions } from "../../helpers/Order";
import { OrderProduct } from "../../helpers/orderProduct";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import OrderReportUserWiseService from "../../services/OrderReportUserWiseService";
import ShiftService from "../../services/ShiftService";

const OrderReportUserWiseFilter = ({
  handleFilterChange,
  initialParam,
  getFilterParams,
  history,
}) => {
  const [dateFormat, setDateFormat] = useState("dd-MMM-yyyy");
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [shift, setShift] = useState();
  const [type, setType] = useState([]);
  const [shiftList, setShiftList] = useState("");
  const [userList, setUserList] = useState([]);
  const user = Url.GetParam("user") || "";
  const startDate = Url.GetParam("startDate") || "";
  const endDate = Url.GetParam("endDate") || "";
  const typeValue = initialParam.type || "";

  const paymentType = Url.GetParam("paymentType") || "";

  const dispatch = useDispatch();
  const [param, setParam] = useState({
    user: "",
    type: "",
    shift: "",
    startDate: "",
    endDate: "",
    paymentType: "",
  });
  const [spinValue, setSpin] = useState(false);

  // TypeOptions
  const typeOptions = [
    {
      label: "User Wise",
      value: "User Wise",
    },
    {
      label: "Date Wise",
      value: "Date Wise",
    },
    {
      label: "Month Wise",
      value: "Month Wise",
    },
  ];
  useEffect(() => {
    setParam({
      user: initialParam && initialParam.user ? initialParam.user : "",
      type:
        initialParam && initialParam.type
          ? initialParam.type
          : OrderProduct.REPORT_TYPE_USER_WISE,
      shift: initialParam && initialParam.shift ? initialParam.shift : "",
      startDate:
        initialParam && initialParam.startDate ? initialParam.startDate : "",
      endDate: initialParam && initialParam.endDate ? initialParam.endDate : "",
      paymentType:
        initialParam && initialParam.paymentType
          ? initialParam.paymentType
          : "",
    });
  }, [initialParam]);

  useEffect(() => {
    getShift();
  }, []);

  const refreshButtonOnClick = async () => {
    setSpin(true);
    let data = await OrderReportUserWiseService.search(param);
    handleFilterChange(data, param);
    setSpin(false);
  };
  // Initial value
  const initialValues = {
    user: userList.find((data) => data.id == initialParam.user),
    Type: typeOptions.find((data) => data.value == initialParam.type),
    Shift:
      shiftList && shiftList.length > 0
        ? shiftList.find((data) => data.id == Url.GetParam("shift"))
        : "",

    startDate:
      initialParam && initialParam.startDate ? DateTime.getDateTimeByUserProfileTimezone(initialParam.startDate) : "",
    endDate: initialParam && initialParam.endDate ? DateTime.getDateTimeByUserProfileTimezone(initialParam.endDate) : "",
    paymentType:
      orderPaymentTypeOptions.find(
        (data) => data.value == initialParam.paymentType
      ) || "",
    pagination: true,
  };

  const UpdateUrl = (params) => {
    const currentPage = window.location.pathname;
    let queryString = "";
    const queryStringArray = Object.entries(params);

    if (queryStringArray.length > 0) {
      queryString = "?";
      queryStringArray.forEach(async (queryParam) => {
        if (queryParam[1] !== "")
          queryString = `${queryString}&${queryParam[0]}=${queryParam[1]}`;
      });
    }
    if (history) {
      history.push(`${currentPage}${queryString}`);
    }
  };

  const handleParamsChange = async (updatedParams) => {
    const params = {
      user: user ? user : "",
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      type: typeValue ? typeValue : "",
      paymentType: paymentType ? paymentType : "",
      shift: Url.GetParam("shift"),

      ...updatedParams,
    };

    UpdateUrl(params);
    setParam(params);
    getFilterParams(params);
    let data = await OrderReportUserWiseService.search(params);
    handleFilterChange(data, params);
  };
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };
  const handleFilter =(values)=>{
    handleParamsChange({
      startDate: values?.startDate ? DateTime.toISOStringDate(values?.startDate) : "",
      endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) : "",
      type : values?.Type ? values?.Type?.value :"",
      shift : values?.Shift ? values?.Shift?.value :"",
      user : values?.user ? values?.user?.id :"",
      paymentType : values?.paymentType ? values?.paymentType?.value :"",
    });
  };

  return (
    <Filter
      showHeader
      newTableHeading
      showSearch
      sortByDropdown
      initialValues={initialValues}
      showTypeFilter
      typeName="Type"
      customTypeOption={typeOptions}
      showUserFilter
      userList={setUserList}
      showShiftFilter
      shiftName="Shift"
      showPaymentTypeFilter
      paymentType={orderPaymentTypeOptions}
      showDateFilter
      refreshButtonOnClick={refreshButtonOnClick}
      refreshValue={spinValue}
      handleFilter={handleFilter}
    />
  );
};

export default OrderReportUserWiseFilter;
