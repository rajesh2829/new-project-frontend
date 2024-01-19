import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import Form from "../../../components/Form";
import MultiSelect from "../../../components/MultiselectCreatable";
import { endpoints } from "../../../api/endPoints";
import { apiClient } from "../../../apiClient";
import { isBadRequest } from "../../../lib/Http";

// Constants
import "../product.scss";

import * as Constant from "../../../helpers/Product";
import { fetchList } from "../../../actions/table";
import Url, { UpdateUrl } from "../../../lib/Url";
import { Tab } from "..";
import { Category } from "../../../helpers/Category";
import { Brand } from "../../../helpers/Brand";

export const ProductStatusTab = {
  ACTIVE: "Active",
  ARCHIVED: "Archived",
  PUBLISHED: "Published",
  DRAFT: "Draft",
  ALL: "All",
};

const ProductFilter = (props) => {
  const {
    handleBrandChange,
    handleClose,
    handleCategoryChange,
    handleStoreChange,
    selectedCategory,
    location,
    setStoreData,
    setCategoryData,
    selectedBrand,
    setBrandData,
    setTag,
    activeTab
  } = props;

  const dispatch = useDispatch();
  const [brandsList, setBrandsList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [storesList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const getproductTagDetail = async () => {
    try {
      const response = await apiClient.get(
        `${endpoints().tagApi}/search`
      );
      const data = response && response.data && response.data.data;
      if (data && data.length > 0) {
        const tags = [];
        data.forEach((tag) => {
          if (tag.tagStatus !== Constant.TAG_STATUS_INACTIVE)
            tags.push({
              id: tag.id,
              name: tag.name,
            });
        });
        setTagList(tags);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  // Getting the active brands details in the multi select dropdowns.
  const getBrandDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().brandAPI}/search`);
      const data = response && response.data && response.data.data;

      if (data && data.length > 0) {
        const brands = [];
        data.forEach((brand) => {
          if (brand.status !== Brand.STATUS_INACTIVE_TEXT)
            brands.push({
              id: brand.id,
              name: brand.name,
            });
        });
        setBrandsList(brands);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    getBrandDetail();
    getCategoryDetail();
    getStoreDetail();
    getproductTagDetail();
  }, []);

  // Initial value
  const initialValues = {
    SelectCategories: selectedCategory ? selectedCategory : "",
    SelectLocation: location ? location : "",
    SelectBrands: selectedBrand ? selectedBrand : ""
  };

  // Getting the active location details in the multi select dropdowns.
  const getStoreDetail = async () => {
    const response = await apiClient.get(`${endpoints().locationAPI}/search`);
    const data = response && response.data && response.data.data;

    if (data && data.length > 0) {
      const stores = [];
      data.forEach((location) => {
        stores.push({
          id: location.id,
          name: location.name,
        });
      });
      setStoreList(stores);
    }
  };

  // Getting the category type options
  const getCategoryTypeOptions = () => {
    // To list the categories in multi select dropdown
    let categoryListOptions = [];

    if (!categoryList) return categoryListOptions;

    categoryList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        categoryListOptions.push({ value: type.id, label: type.name });
      });
    return categoryListOptions;
  };

  // Getting the active categories details in the multi select dropdowns.
  const getCategoryDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().categoryAPI}/search`);
      const data = response && response.data && response.data.data;
      if (data && data.length > 0) {
        const categories = [];
        data.forEach((category) => {
          if (category.status !== Category.STATUS_INACTIVE)
            categories.push({
              id: category.id,
              name: category.name,
            });
        });
        setCategoryList(categories);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  // Getting the Brand type options
  const getBrandTypeOptions = () => {
    // To list the brands in multi select dropdown
    let brandListOptions = [];

    if (!brandsList) return brandListOptions;

    brandsList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        brandListOptions.push({ value: type.id, label: type.name });
      });
    return brandListOptions;
  };

  // Getting the Tag Type options
  const getTagTypeOptions = () => {
    // To list the tags in the multi select dropdowns.
    let tagListOptions = [];

    if (!tagList) return tagListOptions;

    tagList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        tagListOptions.push({ value: type.id, label: type.name });
      });
    return tagListOptions;
  };

  // Getting the Store Type options
  const getStoreTypeOptions = () => {
    // To list the stores in the multi select dropdowns.
    let storeListOptions = [];

    if (!storesList) return storeListOptions;

    storesList.forEach((type) => {
      storeListOptions.push({ value: type.id, label: type.name });
    });
    return storeListOptions;
  };

  return (
    <div className={`sidebar-menu  z-index-1`}>
      <div className="pt-3 pl-3 pr-3">
        <Form initialValues={initialValues} enableReinitialize>
          <div className="filter-sidebar align-items-center d-inline-block w-100 pr-2">
            {/* Store Filter */}
            <div className="col-md-4 mt-3">
              <h5 class="text-dark pull-left">Filters </h5>
            </div>
            <button
              type="button"
              class="btn btn-secondary btn-lg pull-right active btn-sm"
              onClick={() => {
                setStoreData("")
                setCategoryData("")
                setBrandData("")
                UpdateUrl({ brand: "" }, props)
                dispatch(
                  fetchList(
                    activeTab == Tab.ACTIVE ? "publishedProducts"
                      : "publishedProducts",
                    `${endpoints().productAPI}/search`,
                    1,
                    25,
                    {
                      brand: "",
                      category: Url.GetParam("category") || "",
                      tag: Url.GetParam("tag") || "",
                      location: Url.GetParam("location") || "",
                      status: Constant.Product.STATUS_ACTIVE,
                      search: Url.GetParam("search") || "",
                    }
                  )
                );
                dispatch(
                  fetchList(
                    activeTab == Tab.DRAFT ? "draftProducts"
                      : "draftProducts",
                    `${endpoints().productAPI}/search`,
                    1,
                    25,
                    {
                      brand: "",
                      category: Url.GetParam("category") || "",
                      tag: Url.GetParam("tag") || "",
                      location: Url.GetParam("location") || "",
                      status: Constant.Product.STATUS_DRAFT,
                      search: Url.GetParam("search") || "",
                    }
                  )
                );
                dispatch(
                  fetchList(
                    activeTab == Tab.ARCHIVED ? "archivedProducts"
                      : "archivedProducts",
                    `${endpoints().productAPI}/search`,
                    1,
                    25,
                    {
                      brand: Url.GetParam("brand") || "",
                      category: Url.GetParam("category") || "",
                      tag: Url.GetParam("tag") || "",
                      location: Url.GetParam("location") || "",
                      status: Constant.Product.STATUS_ARCHIVED,
                      search: Url.GetParam("search") || "",
                    }
                  )
                );
                dispatch(
                  fetchList(
                    activeTab == Tab.ALL ? "allProducts"
                      : "allProducts",
                    `${endpoints().productAPI}/search`,
                    1,
                    25,
                    {
                      brand: Url.GetParam("brand") || "",
                      category: Url.GetParam("category") || "",
                      tag: Url.GetParam("tag") || "",
                      location: Url.GetParam("location") || "",
                      search: Url.GetParam("search") || "",
                    }
                  )
                );
              }}
            >
              Reset
            </button>
            <button
              type="button"
              class="btn btn-danger pull-right btn-lg active btn-sm mr-2"
              id="closeFilter"
              onClick={handleClose}
            >
              Close
            </button>
            <br />
            <br />
            <div className="sidbar-minheight m-2">
              {/* Brand Filter */}
              <div className="m-1 border-dark">
                <MultiSelect
                  name="SelectBrands"
                  placeholder="Select Brands"
                  options={getBrandTypeOptions()}
                  onInputChange={handleBrandChange}
                />
              </div>

              {/* Category Filter */}
              <div className="m-1 border-dark">
                <MultiSelect
                  name="SelectCategories"
                  placeholder="Select Categories"
                  options={getCategoryTypeOptions()}
                  onInputChange={handleCategoryChange}
                />
              </div>

              {/* Store Filter */}
              <div className="m-1 border-dark">
                <MultiSelect
                  name="SelectLocation"
                  placeholder="Select Location"
                  options={getStoreTypeOptions()}
                  onInputChange={handleStoreChange}

                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductFilter;
