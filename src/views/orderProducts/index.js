import React, { useEffect, useState, useCallback, useRef } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
//Config
import { endpoints } from "../../api/endPoints";
import ProductCard from "../product/components/productCard";
import { useDispatch } from "react-redux";
import Url from "../../lib/Url";
import { PAGE, PAGESIZE, SORT_DIR } from "../../helpers/Status";
import { getStoresList } from "../../services/StoreListService";
import ArrayList from "../../lib/ArrayList";
import BreadCrumb from "../../components/Breadcrumb";
import DateTime from "../../lib/DateTime";
import SelectDropdown from "../../components/SelectDropdown";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import OrderProductDownload from "./OrderProductDownload";
import OrderProductService from "../../services/OrderProductService";
import { fetchList } from "../../actions/table";
import Currency from "../../lib/Currency";
import { Product, Status } from "../../helpers/Product";
const orderProducts = (props) => {
  const [showOrderFilter, setShowOrderFilter] = useState(false);
  const [resetValue, setResetValue] = useState(false);
  const { history } = props;
  const [storeOpt, setStoreOpt] = useState([]);
  const [purchaseDetail, setPurchaseDetail] = useState();
  const location = Url.GetParam("location") || "";
  const startDate = Url.GetParam("startDate") || "";
  const endDate = Url.GetParam("endDate") || "";
  const [locationName, setName] = useState();
  const [startDateValue, setStartDateValue] = useState();
  const [stores, setStores] = useState(Url.GetParam("location"));
  const [startdate, setStartDate] = useState(Url.GetParam("startDate"));
  const [enddate, setEndDate] = useState(Url.GetParam("endDate"));
  const category = Url.GetParam("category");
  const brand = Url.GetParam("brand");

  const dispatch = useDispatch();


  useEffect(() => {
    getDetails();

  }, [location, startDate, endDate]);


  //Sort By Option Values
  const sortByOption = [
    {
      value: "quantity:DESC",
      label: "Quantity",
    },
    {
      value: "product_name:ASC",
      label: "Name",
    },
    {
      value: "price:DESC",
      label: "Amount",
    },
    {
      value: "mrp:DESC",
      label: "MRP",
    },
    {
      value: "profit_amount:DESC",
      label: "Profit Amount",
    },
  ];

  // Handle Reset
  const handleReset = () => {
    setResetValue(true);
    if (resetValue === true) {
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
      label: "Order Product Report",
      link: "",
    },
  ];

  // function to handle changes
  const handleChanges = (e) => {
    if (e == "Download As PDF") {
      // call the function to generate the PDF
      generatePDF();
    }
  };

  // function to generate a PDF from the HTML content of a component
  const generatePDF = () => {
    // create a new jsPDF format of A4 and unit of points
    const pdf = new jsPDF({
      format: "a4",
      unit: "pt"
    });

    // get the HTML content of the component with ID "download"
    const element = document.getElementById("download");
    const html = element.innerHTML;

    // generate the PDF from the HTML content
    pdf.html(html, {
      // use a callback function to save the PDF after it has been generated
      callback: function (pdf) {
        // get the current date in a formatted string
        const today = new Date();
        const options = { day: "numeric", month: "short", year: "numeric" };
        const formattedDate = today.toLocaleDateString("en-US", options);

        // save the PDF with a filename that includes the current date
        pdf.save(`Order Product Report ${formattedDate}.pdf`);
      }
    });
  };

  const getDetails = async () => {
    const response = await OrderProductService.get(location, startDate, endDate);
    // extract data and location name from API response
    let data = response.data;
    let locationName = response.location_name;
    let purchaseDetail = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      purchaseDetail.push(element)
    }

    // update purchase details, location name, and start date value
    setPurchaseDetail(purchaseDetail);
    setName(locationName)
    setStartDateValue(DateTime.getDate(Url.GetParam("startDate")))
  }





  return (
    <>
      <div id="download" className="d-none">
        <OrderProductDownload
          data={purchaseDetail ? purchaseDetail : ""}
          locationName={locationName}
          location={location}
          selectedDate={
            Url.GetParam("startDate")
              ? DateTime.getDate(Url.GetParam("startDate"))
              : ""
          }
        />
      </div>
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between mb-2">
        <PageTitle label="Order Product Report" />
        <div className="">
          <SelectDropdown
            buttonLabel={"Actions"}
            hideCaret
            dropdownLinks={[
              {
                value: "Download As PDF",
                label: "Download As PDF",
              },
            ]}
            handleChange={(e) => handleChanges(e)}
          />
        </div>

      </div>
      <ReduxTable
        id="orderProducts"
        searchPlaceholder="Search"
        newTableHeading
        showHeader
        apiURL={`${endpoints().orderProductAPI}/list`}
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={history}
        params={{

        }}
        showDateFilter
        showStoreFilter
        showCategoryFilter
        showTimeFilter
        showBrandFilter
        showAccountFilter
        orderProductTotalAmount
        orderProductTotalProfitAmount
        showProductFilter
      >
        <ReduxColumn
          field="product"
          sortBy="product_name"
          renderField={(row) =>

          (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.product_name}
                brandName={row.brand_name}
                size={row.size}
                unit={row.unit}
                salePrice={row.sale_price}
                mrp={row.mrp}
                url={row.featured_media_url}
                id={row.product_id}
                brand_id={row.brand_id}
                packSize={row.pack_size}
                status={row.status == (Status.INACTIVE_VALUE) ? Status.INACTIVE : ""}

              />
            </>
          )}
        >
          Product
        </ReduxColumn>
        <ReduxColumn field="sale_price" sortBy="unit_price" className="text-center" renderField={(row) => (
          <span className="float-right">{row.sale_price ? Currency.Format(row.sale_price) : ""}</span>
        )}>
          Sale Price
        </ReduxColumn>
        <ReduxColumn field="quantity" sortBy="quantity" className="text-center">
          Quantity
        </ReduxColumn>
        <ReduxColumn field="price" sortBy="price" className="text-center" renderField={(row) => (
          <span className="float-right">{Currency.Format(row.price)}</span>
        )} >
          Amount
        </ReduxColumn>
        <ReduxColumn field="profit_amount" sortBy="profit_amount" className="text-center" renderField={(row) => (
          <span className="float-right">{Currency.Format(row.profit_amount)}</span>
        )}>
          Profit Amount
        </ReduxColumn>

      </ReduxTable>
    </>
  );
};

export default orderProducts;
