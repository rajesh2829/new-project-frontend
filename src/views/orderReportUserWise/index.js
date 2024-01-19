import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import { OrderProduct } from "../../helpers/orderProduct";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import OrderReportUserWiseService from "../../services/OrderReportUserWiseService";
import OrderReportUserWiseChart from "./OrderReportUserWiseChart";
import OrderReportUserWiseFilter from "./OrderReportUserWiseFilter";

const orderReportUserWise = (props) => {
  const { history } = props;

  //Filter
  const [paramm, setParam] = useState({
    type: Url.GetParam("type")
      ? Url.GetParam("type")
      : OrderProduct.REPORT_TYPE_USER_WISE,
    shift: Url.GetParam("shift") && Url.GetParam("shift"),
    startDate: Url.GetParam("startDate") && Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate") && Url.GetParam("endDate"),
    paymentType: Url.GetParam("paymentType") && Url.GetParam("paymentType"),
    user: Url.GetParam("user") && Url.GetParam("user"),
  });

  const [graphData, setGraphData] = useState();
  const [defaultGraph, setDefaultGraph] = useState(true);

  useEffect(() => {
    getOrderInitialData();
  }, []);

  const getOrderInitialData = async () => {
    let params = new Object();

    let user = Url.GetParam("user") && Url.GetParam("user");

    let type = Url.GetParam("type")
      ? Url.GetParam("type")
      : OrderProduct.REPORT_TYPE_USER_WISE;

    let shift = Url.GetParam("shift") && Url.GetParam("shift");

    let startDate = Url.GetParam("startDate") ? Url.GetParam("startDate") : "";

    let endDate = Url.GetParam("endDate") ? Url.GetParam("endDate") : "";

    let paymentType =
      Url.GetParam("paymentType") && Url.GetParam("paymentType");

    if (user) {
      params.user = user;
    }

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

    getFilterParams(params);

    let response = await OrderReportUserWiseService.search(params);

    handleChange(response, params);
  };

  // // get filter params
  const getFilterParams = (data) => {
    const user = data.user ? data.user : "";
    const type = data.type ? data.type : OrderProduct.REPORT_TYPE_USER_WISE;
    const startDate = data.startDate ? data.startDate : "";
    const endDate = data.endDate ? data.endDate : "";
    const shift = data.shift ? data.shift : "";
    const paymentType = data.paymentType ? data.paymentType : "";

    if (startDate) {
      data.startDate = startDate;
    }

    if (endDate) {
      data.endDate = endDate;
    }

    if (user) {
      data.user = user;
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

    // saleUrlPush(data);
    setParam(data);
  };

  // Use Effect
  useEffect(() => {
    isLoggedIn();
    const { startDate, endDate, user, type, shift, paymentType } = getParams();

    const data = {
      startDate,
      endDate,
      user,
      type,
      shift,
      paymentType,
    };

    setParam(data);
  }, []);

  const getParams = () => {
    const user = Url.GetParam("user") || "";
    const startDate = Url.GetParam("startDate") || "";
    const shift = Url.GetParam("shift") || "";
    const endDate = Url.GetParam("endDate") || "";
    const type = Url.GetParam("type")
      ? Url.GetParam("type")
      : OrderProduct.REPORT_TYPE_USER_WISE;
    const paymentType = Url.GetParam("paymentType") || "";

    const data = {
      startDate,
      user,
      endDate,
      type,
      shift,
      paymentType,
    };
    return data;
  };
  const handleFilterChange = async (data, params) => {
    setParam(params);
    if (!params.user && params.type) {
      setDefaultGraph(false);
      setGraphData(data);
    } else if (!params.user && !params.type) {
      setDefaultGraph(true);
      setGraphData(data);
    } else {
      setDefaultGraph(false);
      setGraphData(data);
    }
  };

  const handleChange = async (data, params) => {
    if (params.user && params.type) {
      setDefaultGraph(false);
      setGraphData(data);
    } else if (!params.user && !params.type) {
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
      link: "/report",
    },
    {
      label: "Order Sales Executive Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Order Sales Executive Report" />
      </div>
      <OrderReportUserWiseFilter
        initialParam={paramm}
        getFilterParams={(e) => {
          getFilterParams(e);
        }}
        handleFilterChange={handleFilterChange}
        history={history}
      />
      {/* Graph Table Start */}
      <OrderReportUserWiseChart
        defaultGraph={defaultGraph}
        graphData={graphData}
        history={history}
        params={paramm}
      />
    </>
  );
};

export default orderReportUserWise;
