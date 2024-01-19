import React, { useEffect, useState } from "react";

// Components
import PageTitle from "../../components/PageTitle";
import OrderReportChart from "./components/OrderReportChart";

//css
import BreadCrumb from "../../components/Breadcrumb";
import { OrderProduct } from "../../helpers/orderProduct";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import "../../scss/_custom.scss";
import OrderReportService from "../../services/OrderSummaryReportService";
import Filter from "./orderReportFilter";
import Spinner from "../../components/Spinner";
import DateTime from "../../lib/DateTime";

const Report = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(true);

  //Filter
  const [paramm, setParam] = useState({
    location: Url.GetParam("location") && Url.GetParam("location"),
    type: Url.GetParam("type")
      ? Url.GetParam("type")
      : OrderProduct.REPORT_TYPE_LOCATION_WISE,
    shift: Url.GetParam("shift") && Url.GetParam("shift"),
    startDate:Url.GetParam("startDate") ? Url.GetParam("startDate") : DateTime.getToday() ?  DateTime.getToday() : "" ,
    endDate:Url.GetParam("endDate")?Url.GetParam("endDate") : DateTime.getToday() ?  DateTime.getToday() : ""  ,
    paymentType: Url.GetParam("paymentType") && Url.GetParam("paymentType"),
    sortType: Url.GetParam("sortType") && Url.GetParam("sortType")
  });

  const [graphData, setGraphData] = useState();
  const [defaultGraph, setDefaultGraph] = useState(true);
  useEffect(() => {
    getOrderInitialData();
  }, []);

  const getOrderInitialData = async () => {

    let params = new Object();

    let location = Url.GetParam("location") && Url.GetParam("location");

    let type = Url.GetParam("type")
      ? Url.GetParam("type")
      : OrderProduct.REPORT_TYPE_LOCATION_WISE;

    let shift = Url.GetParam("shift") && Url.GetParam("shift");

    let startDate = Url.GetParam("startDate")? Url.GetParam("startDate") : DateTime.getToday() ? DateTime.getToday():"";

    let endDate = Url.GetParam("endDate") ? Url.GetParam("endDate") : DateTime.getToday() ? DateTime.getToday():"";

    let paymentType =
      Url.GetParam("paymentType") && Url.GetParam("paymentType");

    if (location) {
      params.location = location;
    }
    let sortType = Url.GetParam("sortType") && Url.GetParam("sortType");

    if (type) {
      params.type = type;
    }

    if (shift) {
      params.shift = shift;
    }

    if (startDate) {
      params.startDate = startDate;
    }

    if (endDate) {
      params.endDate = endDate;
    }

    if (paymentType) {
      params.paymentType = paymentType;
    }

    if (sortType) {
      params.sortType = sortType;
    }

    getFilterParams(params);

    let response = await OrderReportService.search(params);

    handleChange(response, params);
    setIsLoading(false);

  };

  // // get filter params
  const getFilterParams = (data) => {
    const location = data.location ? data.location : "";
    const type = data.type ? data.type : OrderProduct.REPORT_TYPE_LOCATION_WISE;
    const startDate = data.startDate ? data.startDate : DateTime.getToday() ? DateTime.getToday():"";
    const endDate = data.endDate ? data.endDate :DateTime.getToday() ?DateTime.getToday():"";
    const shift = data.shift ? data.shift : "";
    const paymentType = data.paymentType ? data.paymentType : "";
    const sortType = data.sortType ? data.sortType : "";

    if (startDate) {
      data.startDate = startDate;
    }

    if (endDate) {
      data.endDate = endDate;
    }

    if (location) {
      data.location = location;
    }

    if (type) {
      data.type = type;
    }

    if (shift) {
      data.shift = shift;
    }

    if (paymentType) {
      data.paymentType = paymentType;
    }

    if (sortType) {
      data.sortType = sortType;
    }
    // saleUrlPush(data);
    setParam(data);
  };

  // Use Effect
  useEffect(() => {
    isLoggedIn();
    const { startDate, endDate, location, type, shift, paymentType, sortType } =
      getParams();

    const data = {
      startDate,
      endDate,
      location,
      type,
      shift,
      paymentType,
      sortType
    };

    setParam(data);
  }, []);

  const getParams = () => {
    const location = Url.GetParam("location") || "";
    const startDate = Url.GetParam("startDate") || DateTime.getToday();
    const shift = Url.GetParam("shift") || "";
    const endDate = Url.GetParam("endDate") ||DateTime.getToday();
    const type = Url.GetParam("type")
      ? Url.GetParam("type")
      : OrderProduct.REPORT_TYPE_LOCATION_WISE;
    const paymentType = Url.GetParam("paymentType") || "";
    const sortType = Url.GetParam("sortType") || "";

    const data = {
      startDate,
      location,
      endDate,
      type,
      shift,
      paymentType,
      sortType
    };
    return data;
  };
  const handleFilterChange = async (data, params) => {
    setParam(params);
    if (!params.location && params.type) {
      setDefaultGraph(false);
      setGraphData(data);
    } else if (!params.location && !params.type) {
      setDefaultGraph(true);
      setGraphData(data);
    } else {
      setDefaultGraph(false);
      setGraphData(data);
    }
  };

  const handleChange = async (data, params) => {
    if (params.location && params.type) {
      setDefaultGraph(false);
      setGraphData(data);
    } else if (!params.location && !params.type) {
      setDefaultGraph(true);
      setGraphData(data);
    } else {
      setDefaultGraph(false);
      setGraphData(data);
    }
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report"
    },
    {
      label: "Order Summary Report ",
      link: ""
    }
  ];

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Order Summary Report " />
      </div>
      <Filter
        initialParam={paramm}
        getFilterParams={(e) => {
          getFilterParams(e);
        }}
        handleFilterChange={handleFilterChange}
        history={history}
      />
      {/* Graph Table Start */}
      <OrderReportChart
        defaultGraph={defaultGraph}
        graphData={graphData}
        history={history}
        params={paramm}
      />
    </>
  );
};

export default Report;
