import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import Filter from "../../components/Filter";
import { orderPaymentTypeOptions } from "../../helpers/Order";
import { Status } from "../../helpers/Product";
import { OrderProduct } from "../../helpers/orderProduct";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import OrderSummaryReportService from "../../services/OrderSummaryReportService";
import ShiftService from "../../services/ShiftService";
import "./style.scss";
import { Local } from "../../helpers/LocalStorage";
import LocalStorage from "../../lib/LocalStorage";

const OrderReportFilter = ({
  handleFilterChange,
  initialParam,
  getFilterParams,
  history
}) => {
  const [storesList, setStoreList] = useState([]);

  const [shiftList, setShiftList] = useState("");
  const location =
    initialParam && initialParam.location
      ? initialParam.location
      : Url.GetParam("location") || "";
  const startDate =
    initialParam && initialParam.startDate
      ? initialParam.startDate
      : Url.GetParam("startDate") || "";
  const endDate =
    initialParam && initialParam.endDate
      ? initialParam.endDate
      : Url.GetParam("endDate") || "";
  const typeValue =
    initialParam && initialParam.type
      ? initialParam.type
      : Url.GetParam("type") || "";
  const shift =
    initialParam && initialParam.shift
      ? initialParam.shift
      : Url.GetParam("shift") || "";

  const paymentType =
    initialParam && initialParam.paymentType
      ? initialParam.paymentType
      : Url.GetParam("paymentType") || "";
  const sortType =
    initialParam && initialParam.sortType
      ? initialParam.sortType
      : Url.GetParam("sortType") || "";

  const [param, setParam] = useState({
    location: location,
    type: typeValue,
    shift: shift,
    startDate: startDate,
    endDate: endDate,
    paymentType: paymentType,
    sortType: sortType
  });
  const [spinValue, setSpin] = useState(false);

  // TypeOptions
  const typeOptions = [
    {
      label: OrderProduct.REPORT_TYPE_LOCATION_WISE,
      value: OrderProduct.REPORT_TYPE_LOCATION_WISE
    },
    {
      label: OrderProduct.REPORT_TYPE_DATE_WISE,
      value: OrderProduct.REPORT_TYPE_DATE_WISE
    },
    {
      label: OrderProduct.REPORT_TYPE_MONTH_WISE,
      value: OrderProduct.REPORT_TYPE_MONTH_WISE
    }
  ];
  const countSortOption = [
    {
      label: OrderProduct.REPORT_TYPE_QUANTITY_WISE,
      value: OrderProduct.REPORT_TYPE_QUANTITY_WISE
    },
    {
      label: OrderProduct.REPORT_TYPE_AMOUNT_WISE,
      value: OrderProduct.REPORT_TYPE_AMOUNT_WISE
    }
  ];

  useEffect(() => {
    getShift();
    RenderList();
    UpdateUrl(initialParam)
  }, []);

  const RenderList = async () => {
    await LocalStorage.get(
      Local.LOCATION_LIST,
      (value) => {
        setStoreList(value);
      },
      () => {
        getStoreDetail();
      }
    );
  };

  const refreshButtonOnClick = async () => {
    setSpin(true);
    let param = {
      location: Url.GetParam("location"),
      type: Url.GetParam("type")?Url.GetParam("type"):OrderProduct.REPORT_TYPE_LOCATION_WISE,
      shift: Url.GetParam("shift"),
      startDate: Url.GetParam("startDate"),
      endDate: Url.GetParam("endDate"),
      paymentType: Url.GetParam("paymentType"),
      sortType: Url.GetParam("sortType")
    };
    let data = await OrderSummaryReportService.search(param);
    handleFilterChange(data, param);
    setSpin(false);
  };

  // Initial value
  const   initialValues = {
    location: storesList.find((data) => data.value == location) || "",
    type: typeOptions.find((data) => data.value == typeValue) || "",
    shift:
      shiftList && shiftList.length > 0
        ? shiftList.find((data) => data.id == Url.GetParam("shift"))
        : "",

    startDate: startDate
      ? DateTime.getDateTimeByUserProfileTimezone(startDate, "DD-MMM-YYYY")
      : "",
    endDate: endDate
      ? DateTime.getDateTimeByUserProfileTimezone(endDate, "DD-MMM-YYYY")
      : "",
    paymentType:
      orderPaymentTypeOptions.find((data) => data.value == paymentType) || "",
    sortType: countSortOption.find((data) => data.value == sortType),

    pagination: true
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
  // Getting the active location details in the multi select dropdowns.
  const getStoreDetail = async () => {
    const response = await apiClient.get(
      `${endpoints().locationAPI}/search?status=${Status.ACTIVE}`
    );
    const data = response && response.data && response.data.data;

    if (data && data.length > 0) {
      const stores = [];
      data.forEach((location) => {
        stores.push({
          value: location.id,
          label: location.name
        });
      });
      setStoreList(stores);
      const arrayAsString = JSON.stringify(stores);
      localStorage.setItem(Local.LOCATION_LIST, arrayAsString);
    }
  };

  const handleParamsChange = async (updatedParams) => {
    const params = {
      location: location ? location : "",
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      type: typeValue ? typeValue : "",
      paymentType: paymentType ? paymentType : "",
      shift: Url.GetParam("shift"),
      sortType: sortType ? sortType : "",

      ...updatedParams
    };

    UpdateUrl(params);
    setParam(params);
    let data = await OrderSummaryReportService.search(params);
    handleFilterChange(data, params);
  };
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };

  const handleDeleteFilter = (removedFilter) => {
    handleParamsChange(removedFilter);
  };

  const handleFilter=(values)=>{
    handleParamsChange({
      startDate: values?.startDate ? values?.startDate :"",
      endDate: values?.endDate ? values?.endDate :"",
      location: values?.location ? values?.location?.value :"",
      type: values?.type ? values?.type?.value :"",
      shift: values?.shift ? values?.shift?.value :"",
      paymentType: values?.paymentType ? values?.paymentType?.value :"",
      sortType: values?.sortType ? values?.sortType?.value :"",
    });
  }

  return (
    <Filter
      showHeader
      newTableHeading
      showSearch
      sortByDropdown
      initialValues={initialValues}
      showTypeFilter
      typeName="type"
      customTypeOption={typeOptions}
      showStoreFilter
      locationName="location"
      showShiftFilter
      shiftName="shift"
      handleDeleteFilter={handleDeleteFilter}
      showPaymentTypeFilter
      paymentType={orderPaymentTypeOptions}
      showDateFilter
      refreshButtonOnClick={refreshButtonOnClick}
      refreshValue={spinValue}
      countSortOption={countSortOption}
      showCountSortFilter
      StoreList={setStoreList}
      handleFilter={handleFilter}
    />
  );
};

export default OrderReportFilter;
