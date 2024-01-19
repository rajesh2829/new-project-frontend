import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import Filter from "../../../components/Filter";
import Account from "../../../helpers/Account";
import { Type } from "../../../helpers/Purchase";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import { AccountService } from "../../../services/AccountService";
import PurchaseService from "../../../services/PurchaseService";
import "../style.scss";

const PurchaseFilter = ({
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
  const [type, setType] = useState(null);
  const [vendorList, setVendorList] = useState("");

  const vendor = Url.GetParam("vendor") || "";
  const startDate = Url.GetParam("startDate") || "";
  const endDate = Url.GetParam("endDate") || "";
  const typeValue = Url.GetParam("type") || Type.DATE_WISE;

  const dispatch = useDispatch();
  const [param, setParam] = useState({
    vendor: Url.GetParam("vendor"),
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
  });

  // TypeOptions
  const typeOptions = [
    {
      label: Type.DATE_WISE,
      value: Type.DATE_WISE,
    },
    {
      label: Type.MONTH_WISE,
      value: Type.MONTH_WISE,
    },
    {
      label: Type.VENDOR_WISE,
      value: Type.VENDOR_WISE,
    },
  ];


  useEffect(() => {
    getVendorList();
    handleParamsChange(param);
  }, []);

  // Initial value
  const initialValues = {
    type: typeOptions.find((data) => data?.value == typeValue),
    vendor:
      vendorList && vendorList.length > 0
        ? vendorList.find((data) => data?.value == Url.GetParam("vendor"))
        : "",

    startDate: Url.GetParam("startDate") ? DateTime.getDateTimeByUserProfileTimezone(Url.GetParam("startDate")) : "",
    endDate: Url.GetParam("endDate") ? DateTime.getDateTimeByUserProfileTimezone(Url.GetParam("endDate")) : "",

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

  // Getting the active store details in the multi select dropdowns.
  const handleParamsChange = async (updatedParams) => {
    const params = {
      vendor: vendor ? vendor : "",
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      type: type ? type : typeValue ? typeValue : "",

      ...updatedParams,
    };

    UpdateUrl(params);
    setParam(params);
    getFilterParams(params);
    let data = await PurchaseService.report(params);
    handleFilterChange(data, params);
  };

  const getVendorList = async () => {
    const list = await AccountService.search();
    const list1 = []
    list?.data.forEach(data =>
      list1.push({
        value: data.id,
        label: data.vendorName
      }))

    setVendorList(list1)
  };

  const handleDeleteFilter = async (removedFilters) => {
    handleParamsChange(removedFilters);
  };

  const handleFilter = (values) => {
    handleParamsChange({
      type: values?.type ? values?.type?.value : Type.DATE_WISE,
      vendor: values?.vendor ? values?.vendor?.value : "",
      startDate: values?.startDate ? DateTime.toISOStringDate(values?.startDate) : "",
      endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) : "",
    });
  }

  return (
    <Filter
      initialValues={initialValues}
      showHeader
      newTableHeading
      showDateFilter
      sortByDropdown
      showSearch
      refreshButton
      showAccountFilter
      handleDeleteFilter={handleDeleteFilter}
      accountType={Account.TYPE_VENDOR}
      showTypeFilter
      typeName="type"
      customTypeOption={typeOptions}
      handleFilter={handleFilter}
    />
  );
};

export default PurchaseFilter;
