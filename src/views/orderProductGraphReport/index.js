import React, { useEffect, useState } from "react";

// Components
import PageTitle from "../../components/PageTitle";
import ReportChart from "./components/ReportCharts";

//css
import BreadCrumb from "../../components/Breadcrumb";
import NoRecordsFound from "../../components/NoRecordsFound";
import DateTime from "../../lib/DateTime";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import "../../scss/_custom.scss";
import Filter from "./components/Filter";

const Report = (props) => {
  const { history } = props;

  //Filter
  const [paramm, setParam] = useState({
    location: Url.GetParam("location"),
    brand: Url.GetParam("brand") ? Url.GetParam("brand"):"",
    category: Url.GetParam("category") ? Url.GetParam("category") :"",
    startDate: Url.GetParam("startDate")
      ? Url.GetParam("startDate")
      : DateTime.toISOStringDate(new Date()),
    endDate: Url.GetParam("endDate")
      ? Url.GetParam("endDate")
      : DateTime.toISOStringDate(new Date()),
    product: Url.GetParam("product"),
    productTag: Url.GetParam("productTag"),
    type: Url.GetParam("type") ? Url.GetParam("type") : "",
    graphData: Url.GetParam("graphData") ? Url.GetParam("graphData"):"",
    sort: Url.GetParam("sort") ? Url.GetParam("sort"):"",
    sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir"):"",
  });

  const [graphData, setGraphData] = useState();
  const [defaultGraph, setDefaultGraph] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModel = () => {
    setIsModalOpen(!isModalOpen);
  };

  // // get filter params
  const getFilterParams = (data) => {
    const location = data.location ? data.location : "";
    const product = data.product ? data.product : "";
    const startDate = data.startDate
      ? data.startDate
      : "";
    const endDate = data.endDate
      ? data.endDate
      : "";
    const productTag = data.productTag ? data.productTag : "";
    const brand = data.brand ? data.brand : "";
    const category = data.category ? data.category : "";
    const type = data.type ? data.type : "";
    const graphData = data.graphData ? data.graphData : "";

    if (startDate) {
      data.startDate = startDate;
    }

    if (endDate) {
      data.endDate = endDate;
    }

    if (location) {
      data.location = location;
    }

    if (product) {
      data.product = product;
    }
    if (!product) {
      data.product = "";
    }

    if (productTag) {
      data.productTag = productTag;
    }

    if (type) {
      data.type = type;
    }
    if (brand) {
      data.brand = brand;
    }
    if (category) {
      data.category = category;
    }
    if (!category) {
      data.category = "";
    }
    if (graphData) {
      data.graphData = graphData;
    }
    // saleUrlPush(data);
    setParam(data);
  };

  // Use Effect
  useEffect(() => {
    isLoggedIn();
    const {
      startDate,
      endDate,
      location,
      product,
      type,
      brand,
      category,
      productTag,
      graphData,
      sort,
      sortDir
    } = getParams();

    const data = {
      startDate,
      endDate,
      location,
      product,
      brand,
      category,
      productTag,
      type,
      graphData,
      sort,
      sortDir
    };

    setParam(data);
  }, []);

  const getParams = () => {
    const location = Url.GetParam("location") || "";
    const startDate = Url.GetParam("startDate")
      ? Url.GetParam("startDate")
      : "";
    const brand = Url.GetParam("brand") || "";
    const endDate = Url.GetParam("endDate")
      ? Url.GetParam("endDate")
      : "";
    const product = Url.GetParam("product") || "";
    const productTag = Url.GetParam("productTag") || "";
    const category = Url.GetParam("category") || "";
    const graphData = Url.GetParam("graphData") || "";
    const type = Url.GetParam("type") ? Url.GetParam("type") : "";
    const sort = Url.GetParam("sort") ? Url.GetParam("sort") : "name";
    const sortDir = Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "ASC";
    const data = {
      startDate,
      location,
      endDate,
      product,
      brand,
      type,
      productTag,
      category,
      type,
      graphData,
      sort,
      sortDir
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
      label: "Order Product Graph Report",
      link: ""
    }
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Order Product Graph Report" />
      </div>
      <Filter
        initialParam={paramm}
        getFilterParams={(e) => {
          getFilterParams(e);
        }}
        handleFilterChange={handleFilterChange}
        history={history}
        openModel={openModel}
        isModalOpen={isModalOpen}
      />
      {/* Graph Table Start */}
      <div className="mt-4">
        {paramm.type !== "" ? (
          <ReportChart
            defaultGraph={defaultGraph}
            graphData={graphData}
            history={history}
            params={paramm}
          />
        ) : (
          <div className="mt-5 pt-5">
            <NoRecordsFound
              showMessage
              boldMessage="No Records Found"
              description="You can start by apply filter"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Report;
