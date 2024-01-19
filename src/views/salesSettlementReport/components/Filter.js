import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchSalesData } from "../../../actions/report";

// Components
import { endpoints } from "../../../api/endPoints";
import { apiClient } from "../../../apiClient";
import Filter from "../../../components/Filter";
import { paymentTypeOptions } from "../../../helpers/saleReport";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import ShiftService from "../../../services/ShiftService";
import "../style.scss";

const OrderProductFilter = ({
  handleFilterChange,
  initialParam,
  getFilterParams,
  history,
}) => {
  const [storesList, setStoreList] = useState([]);
  const [dateFormat, setDateFormat] = useState("dd-MMM-yyyy");
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [stores, setStore] = useState();
  const [shift, setShift] = useState();
  const [type, setType] = useState([]);
  const [shiftList, setShiftList] = useState("");
  const location = Url.GetParam("location") || "";
  const startDate = Url.GetParam("startDate") || "";
  const endDate = Url.GetParam("endDate") || "";
  const typeValue = Url.GetParam("type") || "";

  const paymentType = Url.GetParam("paymentType") || "";

  const dispatch = useDispatch();
  const [param, setParam] = useState({
    location: "",
    type: "",
    shift: "",
    startDate: "",
    endDate: "",
    paymentType: "",
  });

  // TypeOptions
  const typeOptions = [
    {
      label: "Date Wise",
      value: "date",
    },
    {
      label: "Month Wise",
      value: "month",
    },
  ];
  useEffect(() => {
    setParam({
      location: initialParam && initialParam.location ? initialParam.location : "",
      type: initialParam && initialParam.type ? initialParam.type : "",
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
    getStoreDetail();
    getShift();
  }, []);

  // Getting the Store type options
  const getStoreTypeOptions = () => {
    // To list the stores in the multi select dropdowns.
    let storeListOptions = [];

    if (!storesList) return storeListOptions;

    storesList.forEach((type) => {
      storeListOptions.push({ value: type.id, label: type.name });
    });
    return storeListOptions;
  };
  // Initial value
  // Initial value
  const initialValues = {
    location:
      storesList.find((data) => data.value == initialParam.location) || "",
    type: typeOptions.find((data) => data.value == initialParam.type) || "",
    shift:
      shiftList && shiftList.length > 0
        ? shiftList.find((data) => data.id == Url.GetParam("shift"))
        : "",

    startDate:
      initialParam && initialParam.startDate ? DateTime.getDateTimeByUserProfileTimezone(initialParam.startDate,"DD-MMM-YYYY") : "",
    endDate: initialParam && initialParam.endDate ? DateTime.getDateTimeByUserProfileTimezone(initialParam.endDate,"DD-MMM-YYYY") : "",
    paymentType:
      paymentTypeOptions.find(
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
        if (queryParam[0] !== "searchItem")
          queryString = `${queryString}&${queryParam[0]}=${queryParam[1]}`;
      });
    }
    if (history) {
      history.push(`${currentPage}${queryString}`);
    }
  };
  // Getting the active location details in the multi select dropdowns.
  const getStoreDetail = async () => {
    const response = await apiClient.get(`${endpoints().locationAPI}/search`);
    const data = response && response.data && response.data.data;

    if (data && data.length > 0) {
      const stores = [];
      data.forEach((location) => {
        stores.push({
          value: location.id,
          label: location.name,
        });
      });
      setStoreList(stores);
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

      ...updatedParams,
    };

    UpdateUrl(params);
    setParam(params);
    getFilterParams(params);
    let data = await searchSalesData(params);
    handleFilterChange(data, params);
  };
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };


  const handleFilter=(values)=>{
      handleParamsChange({
        paymentType: values?.paymentType ? values?.paymentType?.value :"",
        shift: values?.shift ? values?.shift?.value : "",
        type: values?.type ? values?.type?.value : "",
        endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) :"",
        startDate: values?.startDate ? DateTime.toISOStringDate(values?.startDate) :"",
        location: values?.location ? values?.location?.value:""
        });
  }

  const handleDeleteFilter=(param)=>{
    handleParamsChange(param)
  }

  return (

    <Filter 
    showHeader
     newTableHeading 
     showSearch
     sortByDropdown
     refreshButton
     initialValues={initialValues}
     showTypeFilter
     typeName="type"
     customTypeOption={typeOptions}
     showStoreFilter
     locationName="location"
     showShiftFilter
     shiftName="shift"
     showDateFilter
     showPaymentTypeFilter
     paymentType={paymentTypeOptions}
     handleFilter={handleFilter}
     handleDeleteFilter={handleDeleteFilter}
      />
  );
};

export default OrderProductFilter;
