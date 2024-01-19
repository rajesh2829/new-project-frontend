import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import Url from "../../lib/Url";
import DateTime from "../../lib/DateTime";

const GstReportFilter = (props) => {
  const { params, getDetails } = props;

  const [spinValue, setSpin] = useState(false);

  const handleChange = async (updatedParams) => {
    const productparam = {
      startDate: updatedParams.startDate
        ? updatedParams.startDate
        : Url.GetParam("startDate"),
      endDate: updatedParams.endDate
        ? updatedParams.endDate
        : Url.GetParam("endDate"),

      ...updatedParams
    };

    Url.UpdateUrl(productparam, props);
    await getDetails(productparam);
  };


  const initialValues = {
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate")
  };

  const refreshButtonOnClick = async () => {
    setSpin(true);
    await getDetails(params);
    setSpin(false);
  };

  const handleFilter = (values) => {

    let data = {
      endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) : "",
      startDate: values?.startDate ? DateTime.toISOStringDate(values?.startDate) : "",
    };
    Url.UpdateUrl(
      {
        endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) : "",
        startDate: values?.startDate ? DateTime.toISOStringDate(values?.startDate) : "",
      },
      props
    );
    handleChange(data);

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
      handleFilter={handleFilter}
    />
  );
};
export default GstReportFilter;
