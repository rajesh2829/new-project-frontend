import React, { useEffect, useRef, useState } from "react";

// Components
import Spinner from "../../components/Spinner";
import PageTitle from "../../components/PageTitle";

// End Points
import { endpoints } from "../../api/endPoints";

// API client
import { apiClient } from "../../apiClient";

import ReportTable from "./ReportTable";
import BreadCrumb from "../../components/Breadcrumb";
import Url from "../../lib/Url";
import StockReportFilter from "./StockReportFilter";
import PdfDownload from "./Pdf";
import Action from "../../components/Action";
import ProductWiseStockReport from "./ProductWiseStockReport";
import { Product, Status } from "../../helpers/Product";
import ArrayList from "../../lib/ArrayList";
import DateTime from "../../lib/DateTime";

const stockReport = (props) => {
  const [detail, setDetail] = useState([]);
  const [detailValue, setDetailValue] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(Url.GetParam("pageSize"));
  const [storeList, setStoreList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Over All");
  const [detailData, setDetailData] = useState([]);

  const [productParams, setProductParams] = useState({});

  const [storeData, setStoreData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModel = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getDetails(productParams);
  }, [page]);

  useEffect(() => {
    getFilterData(productParams);
  }, [detailData, storeData]);

  // Actions menu list
  const actionOptions = [
    {
      label: "Over All",
      value: "Over All"
    },
    {
      label: "Product Wise",
      value: "Product Wise"
    },
    {
      label: "Location Wise",
      value: "Location Wise"
    }
  ];

  const handleChange = (e) => {
    setSelectedOption(e);
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report"
    },
    {
      label: "Stock Report",
      link: ""
    }
  ];

  const getDetails = async (productParams) => {
    const queryString = [];
    let response;
    if (productParams) {
      Object.keys(productParams).forEach((param) => {
        queryString.push(`${param}=${productParams[param]}`);
      });
    }
    if (queryString && queryString.length > 0) {
      if (
        productParams.brand !== "" ||
        productParams.category !== "" ||
        productParams.tag !== "" ||
        productParams.search !== "" ||
        productParams.location !== ""
      ) {
        response = await apiClient.get(
          `${endpoints().stockReportAPI}/search?${queryString.join("&")}`
        );
      } else {
        response = "";
      }
    }

    setDetailData(
      response && response.data && response.data.data && response.data.data.data
    );

    let stores =
      response &&
      response.data &&
      response.data.data &&
      response.data.data.storeData;

    let locationName = [];
    setStoreData(stores);
    if (stores && stores.length > 0) {
      for (let i = 0; i < stores.length; i++) {
        let store = stores[i];
        locationName.push(store.name);
      }
      setStoreList(locationName);
    }
  };

  const getFilterData = async (productParams) => {
    try {
      let productList = [];

      const queryString = [];
      productParams.page = page;
      productParams.pagination = false;
      if (productParams.sort !== "") {
        productParams.sort = "";
      }

      if (productParams.sortDirection !== "") {
        productParams.sortDirection = "";
      }
      let response;

      if (productParams) {
        Object.keys(productParams).forEach((param) => {
          queryString.push(`${param}=${productParams[param]}`);
        });
      }
      if (queryString && queryString.length > 0) {
        if (
          productParams.brand !== "" ||
          productParams.category !== "" ||
          productParams.tag !== "" ||
          productParams.search !== "" ||
          productParams.location !== ""
        ) {
          response = await apiClient.get(
            `${endpoints().productAPI}/search?${queryString.join("&")}`
          );
        } else {
          response = "";
        }
      }

      setDetailValue(response?.data);
      const MainProductIndexData = response?.data?.data;

      if (MainProductIndexData && MainProductIndexData.length > 0) {
        for (let index = 0; index < MainProductIndexData.length; index++) {
          const product_index = MainProductIndexData[index];

          const allStoreProductList = new Array();

          if (detailData && detailData.length > 0) {
            for (let i = 0; i < detailData.length; i++) {
              if (detailData[i].product_id == product_index.id) {
                allStoreProductList.push(detailData[i]);
              }
            }
          }

          let maxQuantity = 0;
          let quantity = 0;
          let total_order_quantity = 0;

          if (allStoreProductList && allStoreProductList.length > 0) {
            for (
              let storeProductIndex = 0;
              storeProductIndex < allStoreProductList.length;
              storeProductIndex++
            ) {
              const storeValues = allStoreProductList[storeProductIndex];

              maxQuantity += storeValues.max_quantity;
              quantity += storeValues.quantity;
              total_order_quantity += Number(storeValues.order_quantity);
            }
          }

          let required_quantity = Number(maxQuantity - quantity);

          let storeProductArray = [];

          for (let i = 0; i < storeData.length; i++) {
            let store = storeData[i];

            const storeProductData = allStoreProductList.find(
              (data) => data.store_id == store.id
            );

            storeProductArray.push({
              quantity: storeProductData?.quantity
                ? storeProductData?.quantity
                : "",
              min_quantity: storeProductData?.min_quantity
                ? storeProductData?.min_quantity
                : "",
              max_quantity: storeProductData?.max_quantity
                ? storeProductData?.max_quantity
                : "",
              last_order_date:
                storeProductData?.last_order_date !== null
                  ? DateTime.getDate(storeProductData?.last_order_date)
                  : "",
              last_stock_entry_date:
                storeProductData?.last_stock_entry_date !== null
                  ? DateTime.getDate(storeProductData?.last_stock_entry_date)
                  : "",
              order_quantity: storeProductData?.order_quantity
                ? storeProductData?.order_quantity
                : ""
            });

            if (storeProductArray.length == 0) {
              storeProductArray.push({
                quantity: "",
                min_quantity: "",
                max_quantity: "",
                last_order_date: "",
                last_stock_entry_date: ""
              });
            }
          }

          productList.push({
            product_id: product_index?.id,
            product_name: product_index?.name ? product_index?.name : "",
            brand: product_index?.brand ? product_index?.brand : "",
            brand_id: product_index?.brand_id ? product_index?.brand_id : "",
            image: product_index?.image ? product_index?.image : "",
            amount: product_index?.price ? product_index.price : "",
            mrp: product_index?.mrp ? product_index?.mrp : "",
            size: product_index?.size ? product_index?.size : "",
            unit: product_index?.unit ? product_index.unit : "",
            amount: product_index?.price ? product_index.price : "",
            unit_price: product_index?.sale_price
              ? product_index?.sale_price
              : "",
            price: product_index?.sale_price * product_index?.quantity,
            packSize: product_index?.pack_size ? product_index?.pack_size : "",
            sale_price: product_index?.sale_price
              ? product_index?.sale_price
              : "",
            required_quantity: required_quantity ? required_quantity : 0,
            available_quantity: quantity ? quantity : 0,
            storeProduct: storeProductArray,
            total_order_quantity: total_order_quantity,
            status: product_index?.status
          });
        }
      }

      let data = [];

      if (productParams.sort !== "product_name") {
        data = ArrayList.sort(productList, productParams.sort);
      } else if (productParams.sort == "product_name") {
        data = ArrayList.sort(
          productList,
          productParams.sort,
          productParams.sortDirection
        );
      }

      let pageSizeValue = pageSize ? pageSize : 25;

      const offset = (page - 1) * pageSizeValue;

      let offsetValue = parseInt(offset) + parseInt(pageSizeValue)

      const productData = data.slice(offset, offsetValue);

      setDetail(productData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label="Stock Report" />
        <Action dropdownLinks={actionOptions} handleChange={handleChange} />
      </div>

      <div id="download-as-pdf">
        <PdfDownload detail={detail} storeList={storeList} />
      </div>

      <div className="card card-body">
        <StockReportFilter
          getDetails={getDetails}
          setPage={setPage}
          setPageSize={setPageSize}
          getFilterData={getFilterData}
          pageSize={pageSize}
          productParams={productParams}
          setProductParams={setProductParams}
          history={props.history}
          openModel={openModel}
          isModalOpen={isModalOpen}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {selectedOption == "Over All" ? (
            <ReportTable
              detail={detail}
              detailValue={detailValue}
              storeList={storeList}
              setPage={setPage}
              page={page}
            />
          ) : (
            <ProductWiseStockReport
              detail={detail}
              detailValue={detailValue}
              storeList={storeList}
              setPage={setPage}
              page={page}
            />
          )}
        </div>
      )}
    </>
  );
};

export default stockReport;
