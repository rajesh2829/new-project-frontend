import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import String from "../../lib/String";
import Url from "../../lib/Url";
import DateTime from "../../lib/DateTime";
import ShiftService from "../../services/ShiftService";
import { typeOptions } from "../../helpers/Attendance";

const attendanceReportFilter = (props) => {
  const { params, setPageSize, setPage, pageSize, getDetails, setParams } =
    props;
  const [searchTerm, setSearchTerm] = useState();
  const [searchItem, setSearch] = useState(Url.GetParam("search"));
  const [shiftValue, setShift] = useState(Url.GetParam("shift"));
  const [spinValue, setSpin] = useState(false);
  const [dateValue, setDate] = useState(Url.GetParam("date"));
  const [shiftList, setShiftList] = useState([]);
  const [type, setType] = useState(Url.GetParam("type"));

  useEffect(() => {
    getShift();
  }, []);


  if (shiftValue) {
    params.shift = shiftValue;
  }

  if (!shiftValue) {
    params.shift = "";
  }

  if (dateValue) {
    params.date = dateValue;
  } else {
    params.date = Url.GetParam("date");
  }
  if (type) {
    params.type = type
  }
  else {
    params.type = Url.GetParam("type")
  }
  const getShift = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };

  const handleParams = async (updatedParams) => {
    const params = {
      shift: Url.GetParam("shift"),
      search: Url.GetParam("search"),
      date: Url.GetParam("date"),
      type: Url.GetParam("type"),
      ...updatedParams
    };
    await getDetails(params);

    Url.UpdateUrl(params, props);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    try {
      let search = String.Get(e.target.value);

      setSearch(search);
      setPage(1);

      handleParams({ search: search });
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    shift: shiftList.find((data) => data.id == Url.GetParam("shift")),
    date:
      DateTime.getDateTimeByUserProfileTimezone(Url.GetParam("date"),
        "DD-MMM-YYYY"
      ) || "",
    type: typeOptions.find((data) => data.value == Url.GetParam("type"))
  };

  // Handle Pagesize
  const handlePageSize = async (value) => {
    setPageSize(value);

    handleParams({ pageSize: value });

    setPage(1);
  };

  const refreshButtonOnClick = async () => {
    setSpin(true);
    await getDetails(params);
    setSpin(false);
  };

  const handleDeleteFilter = (removedFilter) => {

    handleParams(removedFilter);
  };

  const handleFilter = (values) => {
    setType(values?.type ? values?.type?.value : "")
    setDate(values?.date ? DateTime.toISOStringDate(values?.date) : "");
    setShift(values?.shift ? values?.shift?.value : "");
    handleParams({
      type: values?.type ? values?.type?.value : "",
      date: values?.date ? DateTime.toISOStringDate(values?.date) : "",
      shift: values?.shift ? values?.shift?.value : ""
    });
  }

  return (
    <Filter
      showHeader
      newTableHeading
      pageSearchOnChange={(e) => {
        handleSearchTermChange(e);
      }}
      sortByDropdown
      pageSearchValue={searchItem}
      searchPlaceholder="Search"
      getPageSizeByOptions={(e) => handlePageSize(e)}
      selectedPageSize={pageSize && pageSize}
      refreshButtonOnClick={refreshButtonOnClick}
      refreshValue={spinValue}
      showShiftFilter
      showPageSize
      showTypeFilter
      customTypeOption={typeOptions}
      handleDeleteFilter={handleDeleteFilter}
      showSingleDateFilter
      initialValues={initialValues}
      handleFilter={handleFilter}
    />
  );
};
export default attendanceReportFilter;
