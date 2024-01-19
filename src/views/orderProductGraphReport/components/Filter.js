import React, { useEffect, useState } from "react";

// Components
import { endpoints } from "../../../api/endPoints";
import { apiClient } from "../../../apiClient";
import Filter from "../../../components/Filter";
import { Status } from "../../../helpers/Product";
import { TagTypeName } from "../../../helpers/Tag";
import { OrderProduct } from "../../../helpers/orderProduct";
import ArrayList from "../../../lib/ArrayList";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import orderProductService from "../../../services/OrderProductService";
import { getStoresList } from "../../../services/StoreListService";
import "../style.scss";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import TagService from "../../../services/TagService";

const OrderReportFilter = (props) => {
  let {
    handleFilterChange,
    initialParam,
    getFilterParams,
    history,
    isModalOpen,
    openModel
  } =props;
  const [brandList, setBrandList] = useState([]);
  const [dateFormat, setDateFormat] = useState("dd-MMM-yyyy");
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: ""
  });
  const [storeList, setStoreList] = useState([]);
  const [storeValue, setStore] = useState(Url.GetParam("location"));
  const [tagOption, setProductTag] = useState([]);
  const [tagValue, setTag] = useState(Url.GetParam("productTag"));
  const [categoryValue, setCategory] = useState(Url.GetParam("category"));
  const [brandValue, setBrand] = useState(Url.GetParam("brand"));
  const [categoryList, setCategoryList] = useState([]);
  const location = Url.GetParam("location") || "";
  const startDate = Url.GetParam("startDate") || "";
  const endDate = Url.GetParam("endDate") || "";
  const [productList, productOption] = useState([]);
  const [productId, setProductId] = useState(Url.GetParam("product"));
  const [productname, setProductName] = useState(Url.GetParam("productName"));
  const [graphType, setGraphType] = useState(Url.GetParam("graphData"));
  const [sortValue, setSortValue] = useState(Url.GetParam("sort"));
  const [sortDirValue, setSortDirValue] = useState(Url.GetParam("sortDir"));
  const typeValue = initialParam.type || "";
  const [param, setParam] = useState({
    location: "",
    product: "",
    brand: "",
    category: "",
    startDate: "",
    endDate: "",
    productTag: "",
    type: "",
    graphData:""
  });
  const [spinValue, setSpin] = useState(false);
  useEffect(() => {
    setParam({
      brand: initialParam && initialParam.brand ? initialParam.brand : "",
      category:
        initialParam && initialParam.category ? initialParam.category : "",
      product: initialParam && initialParam.product ? initialParam.product : "",
      location:
        initialParam && initialParam.location ? initialParam.location : "",
      startDate:
        initialParam && initialParam.startDate
          ? initialParam.startDate
          : "",
      endDate:
        initialParam && initialParam.endDate
          ? initialParam.endDate
          : "",
      productTag:
        initialParam && initialParam.productTag ? initialParam.productTag : "",
      type: initialParam && initialParam.type ? initialParam.type : "",
      graphData: initialParam && initialParam.graphData ? initialParam.graphData : "",
      sort: initialParam && initialParam.sort ? initialParam.sort : "",
      sortDir: initialParam && initialParam.sortDir ? initialParam.sortDir : "",
    });
    setGraphType(initialParam && initialParam.graphData ? initialParam.graphData : "")
    setSortValue(initialParam && initialParam.sort ? initialParam.sort : "")
    setSortDirValue(initialParam && initialParam.sortDir ? initialParam.sortDir : "")
  }, [initialParam]);

  useEffect(() => {
    getBrandDetail(isModalOpen);
    getCategoryDetail(isModalOpen);
    getTagList(isModalOpen);
    getStoreList(isModalOpen);
  }, [isModalOpen]);

  useEffect( () => {
    if (param.type !== "") {
      getGraphData()
    }
  }, [param.type])

  const getGraphData=async ()=>{
    let data = await orderProductService.report(param);
    handleFilterChange(data, param);
  }
  

  // TypeOptions
  const typeOptions = [
    {
      label: "Location Wise",
      value: "Location Wise"
    },
    {
      label: "Date Wise",
      value: "Date Wise"
    },
    {
      label: "Month Wise",
      value: "Month Wise"
    }, 
    {
      label: "Brand Wise",
      value: "Brand Wise"
    },
    {
      label: "Category Wise",
      value: "Category Wise"
    }
  ];

  const sortByOption = [
    {
      value: 'name:DESC',
      label: 'Name',
    },
    {
      value: 'amount:DESC',
      label: 'Amount',
    },
    {
      value: 'quantity:DESC',
      label: 'Quantity',
    },
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
  // Initial value
  const initialValues = {
    brand: brandList.find((data) => data.value == initialParam.brand) || "",
    location:
      storeList.find((data) => data.value == initialParam.location) || "",
    category:
      categoryList.find((data) => data.id == initialParam.category) || "",
    startDate:
      initialParam && initialParam.startDate
        ? DateTime.getDateTimeByUserProfileTimezone(
            initialParam.startDate,
            "DD-MMM-YYYY"
          )
        : "",
    endDate:
      initialParam && initialParam.endDate
        ? DateTime.getDateTimeByUserProfileTimezone(
            initialParam.endDate,
            "DD-MMM-YYYY"
          )
        : "",
    product: productList.find((data) => data.id == initialParam.product) || "",
    productTag:
      tagOption.find((data) => data.value == initialParam.productTag) || "",
    type: typeOptions.find((data) => data.value == initialParam.type),
    graphData: countSortOption.find((data) => data.value == graphType),
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
  const getBrandDetail = async (isModalOpen) => {
    try {
      if (brandList && brandList.length == 0) {
        let response = await BrandService.list({})
        const data = response && response.data ;
        const brands = [];

        if (data && data.length > 0) {
          data.forEach((brand) => {
            brands.push({
              id: brand.id,
              value: brand.id,
              label: brand.name
            });
          });
        }
        setBrandList(brands);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryDetail = async (isModalOpen) => {
    try {
      if (categoryList && categoryList.length == 0) {
        let response = await CategoryService.list({})
        const data = response && response.data;
        const categories = [];

        if (data && data.length > 0) {
          data.forEach((category) => {
            categories.push({
              id: category.id,
              value: category.id,
              label: category.name
            });
          });
        }
        setCategoryList(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStoreList = async (isModalOpen) => {
    if (storeList && storeList.length == 0) {
      let location = await getStoresList();
      setStoreList(location);
    }
  };

  // get all tag report
  const getTagList = async (isModalOpen) => {
    try {
      if (tagOption && tagOption.length == 0) {
        let tagList = [];
        let params = { status: Status.ACTIVE};
        const response = await TagService.list(params);
        const tag = response.data.data;
        if (ArrayList.isNotEmpty(tag)) {
          tag.forEach((tag) => {
            tagList.push({
              id: tag.id,
              value: tag.id,
              label: tag.name,
            });
          });
        }
        setProductTag(tagList);
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };
  const handleParamsChange = async (updatedParams) => {
    const params = {
      location: Url.GetParam("location") ? Url.GetParam("location") : "",
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      productTag: tagValue ? tagValue : "",
      product: productId ? productId : "",
      brand: brandValue ? brandValue : "",
      category: categoryValue ? categoryValue : "",
      type: typeValue ? typeValue : "",
      productName: productname ? productname : "",
      graphData: graphType ? graphType :"",
      sort: sortValue ? sortValue:"",
      sortDir: sortDirValue ? sortDirValue :"",

      ...updatedParams
    };

    UpdateUrl(params);
    setParam(params);
    getFilterParams(params);
    if (params.type !== "") {
      let data = await orderProductService.report(params);

      handleFilterChange(data, params);
    }
  };



  const refreshButtonOnClick = async () => {
    setSpin(true);
    initialValues;
    if (param.type !== "") {
      let data = await orderProductService.report(param);
      handleFilterChange(data, param);
      setSpin(false);
    }
  };
  const handleDeleteFilter = (removedFilter) => {
    handleParamsChange(removedFilter);
  };

  const getSelectedSortLabel=()=> {

    const selectedSortOption = sortByOption.find(
      (option) => option.value.split(":")[0] === Url.GetParam("sort")
    );

    return selectedSortOption?.label
      ? selectedSortOption?.label
      : sortByOption[0].label;
  }


  const handleSortByChange=(sortValue)=>{
    let [sort,sortDir]=sortValue && sortValue.split(":");
    setSortValue(sort)
    setSortDirValue(sortDir)
    handleParamsChange({
      sort:sort,
      sortDir: sortDir
    });
  }
 
  const handleFilter=(values)=>{
    handleParamsChange({ 
      brand: values?.brand ? values?.brand?.id :"",
      category: values?.category ? values?.category?.value :"",
      endDate: values?.endDate ? DateTime.toISOStringDate(values?.endDate) :"",
      startDate: values?.startDate ? DateTime.toISOStringDate(values?.startDate) :"",
      location: values?.location ? values?.location?.value :"",
      product: values?.product ? values?.product?.id :"",
      productName: values?.product ? values?.product?.value :"",
      type: values?.type ? values?.type?.value :"",
      graphData: values?.graphData ? values?.graphData?.value :"",
      sort: sortValue,
      sortDir: sortDirValue
     });

  }
  return (
    <Filter
      showHeader
      newTableHeading
      showSearch
      showTypeFilter
      customTypeOption={typeOptions}
      showBrandFilter
      showCategoryFilter
      showProductFilter
      productOption={productOption}
      showStoreFilter
      showTagFilter
      tagParams={{ type: TagTypeName.PRODUCT }}
      showDateFilter
      initialValues={initialValues}
      refreshButtonOnClick={refreshButtonOnClick}
      refreshValue={spinValue}
      handleDeleteFilter={handleDeleteFilter}
      openModel={openModel}
      modelOpen={isModalOpen}
      showGraphDataFilter
      graphDataTypeOption={countSortOption}
      handleFilter={handleFilter}
      getSelectedSortLabel={getSelectedSortLabel()}
      sortByOptions={sortByOption}
      handleSortByChange={handleSortByChange}
    />
  );
};

export default OrderReportFilter;
