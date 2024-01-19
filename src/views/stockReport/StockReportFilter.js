import React, { useEffect, useState } from "react";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import Filter from "../../components/Filter";
import { Status } from "../../helpers/Product";
import ArrayList from "../../lib/ArrayList";
import String from "../../lib/String";
import Url from "../../lib/Url";
import StoreService from "../../services/StoreService";
import { TagTypeName } from "../../helpers/Tag";

const StockReportFilter = (props) => {
  const {
    setPageSize,
    setPage,
    pageSize,
    getDetails,
    productParams,
    getFilterData,
    setProductParams,
    isModalOpen,
    openModel
  } = props;
  const [brandList, setBrandList] = useState([]);

  const [categoryValue, setCategory] = useState(Url.GetParam("category"));
  const [brandValue, setBrand] = useState(Url.GetParam("brand"));
  const [tagValue, setTag] = useState(Url.GetParam("tag"));
  const [categoryList, setCategoryList] = useState([]);

  const [searchTerm, setSearchTerm] = useState();
  const [searchItem, setSearch] = useState(Url.GetParam("search"));
  const [currentParams, setCurrentParams] = useState({});
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [pageSizeValue, setPageSizeValue] = useState(Url.GetParam("pageSize"));
  const [tagOption, setProductTag] = useState([]);

  const [sortValue, setSortValue] = useState(Url.GetParam("sort"));
  const [sortByValue, setSortBy] = useState("total_order_quantity");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [storeList, setStoreList] = useState([]);
  const [storeValue, setStore] = useState(Url.GetParam("location"));

  const [selectedSortValue, setSelectedSort] = useState(
    Url.GetParam("sortValues")
  );
  const [spinValue, setSpin] = useState(false);

  //Sort By Option Values
  const sortByOption = [
    {
      value: "total_order_quantity:DESC",
      label: "Order Quantity"
    },
    {
      value: "available_quantity:DESC",
      label: "Available Quantity"
    },
    {
      value: "required_quantity:DESC",
      label: "Required Quantity"
    },
    {
      value: "product_name:ASC",
      label: "Name"
    }
  ];

  useEffect(() => {
    getBrandDetail(isModalOpen);
    getCategoryDetail(isModalOpen);
    getTagList(isModalOpen);
    getStoreList(isModalOpen);
  }, [isModalOpen]);

  if (categoryValue) {
    productParams.category = categoryValue ? categoryValue : Url.GetParam("category");
  }

  if (brandValue) {
    productParams.brand = brandValue ? brandValue : Url.GetParam("brand");
  }

  if (!brandValue) {
    productParams.brand = "";
  }

  if (!categoryValue) {
    productParams.category = "";
  }

  if (tagValue) {
    productParams.tag = tagValue ? tagValue : Url.GetParam("tag");
  }
  if (sortDirection) {
    productParams.sortDirection = sortDirection;
  }
  if (sortValue) {
    productParams.sort = sortValue;
  }
  if (sortByValue) {
    productParams.sort = sortByValue;
  }
  if (!tagValue) {
    productParams.tag = "";
  }

  if (searchItem) {
    productParams.search = searchItem;
  }

  if (!searchItem) {
    productParams.search = "";
  }

  if (storeValue) {
    productParams.location = storeValue ? storeValue : Url.GetParam("location");
  }

  if (!storeValue) {
    productParams.location = "";
  }
  if (pageSizeValue) {
    productParams.pageSize = pageSizeValue;
  }

  const getBrandDetail = async (isModalOpen) => {
    try {
      if (isModalOpen && brandList && brandList.length == 0) {
        const response = await apiClient.get(`${endpoints().brandAPI}/search`);
        const data = response && response.data && response.data.data;
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

  // get all tag list
  const getTagList = async (isModalOpen) => {
    try {
      if (isModalOpen && tagOption && tagOption.length == 0) {
        let tagList = [];
        const response = await apiClient.get(
          `${endpoints().tagApi}/search?status=${Status.ACTIVE}`
        );
        const productTag = response.data.data;
        if (ArrayList.isNotEmpty(productTag)) {
          productTag.forEach((tag) => {
            tagList.push({
              id: tag.id,
              value: tag.id,
              label: tag.name
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

  const getCategoryDetail = async (isModalOpen) => {
    try {
      if (isModalOpen && categoryList && categoryList.length == 0) {
        const response = await apiClient.get(
          `${endpoints().categoryAPI}/search`
        );
        const data = response && response.data && response.data.data;

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
    if (isModalOpen && storeList && storeList.length == 0) {
      await StoreService.search((callback) => setStoreList(callback));
    }
  };

  const handleParamsChange = async (updatedParams) => {
    const productparam = {
      ...updatedParams,
      brand: Url.GetParam("brand") ? Url.GetParam("brand") : updatedParams?.brand,
      category: Url.GetParam("category") ? Url.GetParam("category") : updatedParams?.category,
      tag: Url.GetParam("tag") ? Url.GetParam("tag") : updatedParams?.tag,
      pageSize: pageSizeValue ? pageSizeValue : "",
      search: searchTerm ? searchTerm : "",
      location: Url.GetParam("location") ? Url.GetParam("location") : updatedParams?.location,
      sort: sortValue ? sortValue : sortByValue,
      sortDirection: sortDirection
        ? sortDirection
        : Url.GetParam("sortDirection"),
      pageSize: pageSizeValue ? pageSizeValue : "",

    };

    setProductParams(productparam);

    Url.UpdateUrl(productparam, props);
    await getFilterData(productparam);
    await getDetails(productparam);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    try {
      let search = String.Get(e.target.value);

      setSearch(search);
      setPage(1);

      handleParamsChange({ search: search });
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedSortLabel = () => {
    const selectedSortOption = sortByOption.find(
      (option) => option.value === selectedSortValue
    );

    return selectedSortOption?.label
      ? selectedSortOption?.label
      : sortByOption[0].label;
  };

  // Handle category change
  const handleSortChange = async (values) => {
    const sortAndSortDir = values.split(":");
    setSelectedSort(values);

    const sortBy = sortAndSortDir[0];
    const sortDirection = sortAndSortDir[1];

    setSortValue(sortBy);
    setSortBy(sortBy);

    setSortDirection(sortDirection);
    handleParamsChange({
      sort: sortBy,
      sortDirection: sortDirection,
      sortValues: values
    });
    setPage(1);
  };

  const initialValues = {
    brand: brandList.find((data) => data?.id == Url.GetParam("brand")),
    category: categoryList.find((data) => data?.id == Url.GetParam("category")),
    productTag: tagOption.find((data) => data?.id == Url.GetParam("tag")),
    location: storeList.find((data) => data?.value == Url.GetParam("location"))
  };

  // Handle Pagesize
  const handlePageSize = async (value) => {
    setPageSize(value);
    setPageSizeValue(value);

    handleParamsChange({ pageSize: value });

    setCurrentParams(productParams);
    setPage(1);
  };

  const refreshButtonOnClick = async () => {
    setSpin(true);
    await getDetails(productParams);
    setSpin(false);
  };

  const handleDeleteFilter = (removedFilter) => {
    handleParamsChange(removedFilter);
  };

  const handleFilter = (values) => {
    setCategory(values?.category ? values?.category?.value : "");
    setTag(values?.productTag ? values?.productTag?.value : "");
    setStore(values?.location ? values?.location?.value : "");
    setBrand(values?.brand ? values?.brand?.value : "")
    handleParamsChange({
      location: values?.location ? values?.location?.value : "",
      tag: values?.productTag ? values?.productTag?.value : "",
      category: values?.category ? values?.category?.value : "",
      brand: values?.brand ? values?.brand?.value : "",
    });
  }

  return (
    <Filter
      showHeader
      newTableHeading
      pageSearchOnChange={(e) => {
        handleSearchTermChange(e);
      }}
      pageSearchValue={searchItem}
      searchPlaceholder="Search Product"
      getPageSizeByOptions={(e) => handlePageSize(e)}
      selectedPageSize={pageSize && pageSize}
      getSelectedSortLabel={getSelectedSortLabel()}
      sortByOptions={sortByOption}
      handleSortByChange={handleSortChange}
      refreshButtonOnClick={refreshButtonOnClick}
      refreshValue={spinValue}
      showBrandFilter
      showPageSize
      showCategoryFilter
      showTagFilter
      tagParams={{
        type: TagTypeName.PRODUCT
      }}
      showStoreFilter
      initialValues={initialValues}
      handleDeleteFilter={handleDeleteFilter}
      openModel={openModel}
      modelOpen={isModalOpen}
      handleFilter={handleFilter}
    />
  );
};
export default StockReportFilter;
