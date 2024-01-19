import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components
import AddModal from "../../../components/Modal";
import Text from "../../../components/Text";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import DeleteButton from "../../../components/DeleteButton";
import CancelButton from "../../../components/CancelButton";
import Button from "../../../components/Button";

// Helpers
import {
  Status,
  weightUnitOptions,
  productStatusOptions,
  taxable,
  allowTransferOutOfStock,
  allowSellOutOfStock,
  Product
} from "../../../helpers/Product";

// Actions
import { fetchList } from "../../../actions/table";
import { isBadRequest } from "../../../lib/Http";

// ApiClient
import { apiClient } from "../../../apiClient";

// Configs
import { endpoints } from "../../../api/endPoints";
import Toast from "../../../components/Toast";
import Number from "../../../components/Number";
import Percentage from "../../../components/Percentage";
import CategorySelect from "../../../components/CategorySelect";
import BrandSelect from "../../../components/BrandSelect";
import TagSelect from "../../../components/TagSelect";
import SelectStore from "../../../components/SelectStore";
import { TagTypeName } from "../../../helpers/Tag";
import Url from "../../../lib/Url";

export default function BulkUpdateModal(props) {
  // Defining dispatch from useDispatch
  const dispatch = useDispatch();

  let params = {
    page: Url.GetParam("page"),
    pageSize: Url.GetParam("pageSize"),
    search: Url.GetParam("search"),
    sort: Url.GetParam("sort"),
    status: Url.GetParam("status"),
    sortDir: Url.GetParam("sortDir"),
    brand: Url.GetParam("brand"),
    category: Url.GetParam("category"),
    manufacture: Url.GetParam("manufacture"),
    productTag: Url.GetParam("productTag"),
    show_duplicate: Url.GetParam("show_duplicate"),
    tab: Url.GetParam("tab"),

  };

  // Product Bulk Delete
  const deleteproducts = (Ids, toggle) => {
    try {
      let ids = { ids: Ids.selectedIds };
      apiClient
        .put(`${endpoints().productAPI}/bulk/delete`, ids)
        .then((response) => {
          if (response) {
            Toast.success(response.data.message);
            props.setSelectedCheckBox(false)
            props.setSelectedCheckBox(true)

          }
        })
        .then(() => {
          dispatch(
            fetchList(
              "allProducts",
              `${endpoints().productAPI}/search`,
              Url.GetParam("tab") == Status.ALL ? params.page : 1,
              Url.GetParam("tab") == Status.ALL ? params.pageSize : 25,
              {...params}            )
          );
          dispatch(
            fetchList(
              "activeProducts",
              `${endpoints().productAPI}/search`,
              Url.GetParam("status") == Product.STATUS_ACTIVE ? params.page : 1,
              Url.GetParam("status") == Product.STATUS_ACTIVE ? params.pageSize : 25,
              {...params}            )
          );
          dispatch(
            fetchList(
              "draftProducts",
              `${endpoints().productAPI}/search`,
              Url.GetParam("status") == Product.STATUS_DRAFT ? params.page : 1,
              Url.GetParam("status") == Product.STATUS_DRAFT ? params.pageSize : 25,
              {...params}            )
          );
          dispatch(
            fetchList(
              "archivedProducts",
              `${endpoints().productAPI}/search`,
              Url.GetParam("status") == Product.STATUS_ARCHIVED ? params.page : 1,
              Url.GetParam("status") == Product.STATUS_ARCHIVED ? params.pageSize : 25,
              {...params}            )
          );
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            toast.error(errorMessage);
            console.error(errorMessage);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Product Bulk Update
  const update = async (data, toggle) => {
    data.mrp = data.mrp ? data.mrp.slice(1) : null;
    data.salePrice = data && data.salePrice ? data.salePrice.slice(1) : null;
    data.cost = data && data.cost ? data.cost.slice(1) : null;
    data.ids = props.productIds;
    data.status = data.status ? data.status.value : "";
    data.category = data.Category ? data.Category.id : null;
    data.brandId = data.Brand ? data.Brand.id : null;
    data.weightUnit = data.weightUnit ? data.weightUnit : "";
    data.allow_transfer_out_of_stock = data.allow_transfer_out_of_stock
      ? data.allow_transfer_out_of_stock
      : "";
    data.allow_sell_out_of_stock = data.allow_sell_out_of_stock
      ? data.allow_sell_out_of_stock
      : "";
    await apiClient
      .put(`${endpoints().productAPI}/bulk/update`, data)
      .then((response) => {
        if (response) {
          toggle();
          props.setSelectedCheckBox(false)
          props.setSelectedCheckBox(true)
          toast.success(response.data.message);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "allProducts",
            `${endpoints().productAPI}/search`,
            Url.GetParam("tab") == Status.ALL ? params.page : 1,
            Url.GetParam("tab") == Status.ALL ? params.pageSize : 25,
            {...params}
          )
        );

        dispatch(
          fetchList(
            "publishedProducts",
            `${endpoints().productAPI}/search`,
            Url.GetParam("status") == Product.STATUS_ACTIVE ? params.page : 1,
            Url.GetParam("status") == Product.STATUS_ACTIVE ? params.pageSize : 25,
            {...params}          )
        );
        dispatch(
          fetchList(
            "draftProducts",
            `${endpoints().productAPI}/search`,
            Url.GetParam("status") == Product.STATUS_DRAFT ? params.page : 1,
            Url.GetParam("status") == Product.STATUS_DRAFT ? params.pageSize : 25,
            {...params}          )
        );
        dispatch(
          fetchList(
            "archivedProducts",
            `${endpoints().productAPI}/search`,
            Url.GetParam("status") == Product.STATUS_ARCHIVED ? params.page : 1,
            Url.GetParam("status") == Product.STATUS_ARCHIVED ? params.pageSize : 25,
            {...params}          )
        );
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };

  // Defining the initial values
  const initialValues = {
    productName: "",
    Category: "",
    Brand: "",
    quantity: "",
    shopifyQuantity: "",
    status: "",
    sellOutOfStock: "",
    description: "",
    cost: "",
    price: "",
  };

  // Bulk Update Form
  const bulkUpdateForm = (
    <div>
      <div className="row">
        <div className="col-6">
          <Text
            name="productName"
            label="Product Name"
            placeholder="Product Name"
          />
        </div>
        <div className="col-6">
          <Select
            name="status"
            label="Status"
            placeholder="Select Status"
            options={productStatusOptions}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <CategorySelect name="Category" label="Category" />
        </div>
        <div className="col-6">
          <BrandSelect name="Brand" label="Brand" />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <Number
            name="min_quantity"
            label="Min Quantity"
            placeholder="Min Quantity"
          />
        </div>
        <div className="col-6">
          <Number
            name="max_quantity"
            label="Max Quantity"
            placeholder="Max Quantity"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Number name="shopify_quantity" label="Shopify Quantity" />
        </div>
        <div className="col-6">
          <Select
            name="taxable"
            label="Taxable"
            placeholder="Select Taxable"
            options={taxable}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Select
            name="allow_sell_out_of_stock"
            label="Allow Sell Out Of Stock"
            placeholder="Allow Sell Out Of Stock"
            options={allowSellOutOfStock}
          />
        </div>
        <div className="col-6">
          <Number name="weight" label="Weight" placeholder=" Weight" />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <TagSelect
            name="addTags"
            placeholder="Select Product Tag"
            label="Add Tags"
            params={{ type: TagTypeName.PRODUCT }}
          />
        </div>
        <div className="col-6">
          <TagSelect
            name="removeTags"
            fullWidth={true}
            label="Remove Tags"
            placeholder="Select Product Tag"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-6">
          <Text
            name="findProductName"
            label="Find Product Name"
            placeholder=" Find Product Name"
          />
        </div>
        <div className="col-6">
          <Text
            name="replaceProductName"
            label="Replace Product Name"
            placeholder=" Replace Product Name"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <Text
            name="findProductSlug"
            label="Find Product Slug"
            placeholder=" Find Product Slug"
          />
        </div>
        <div className="col-6">
          <Text
            name="replaceProductSlug"
            label="Replace Product Slug"
            placeholder=" Replace Product Slug"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Text
            name="findProductDescription"
            label="Find Product Description"
            placeholder=" Find Product Description"
          />
        </div>
        <div className="col-6">
          <Text
            name="replaceProductDescription"
            label="Replace Product Description"
            placeholder=" Replace Product Description"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Percentage name="sgst_percentage" label="SGST%" />
        </div>
        <div className="col-6">
          <Percentage name="cgst_percentage" label="CGST%" />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <Select
            name="weight_unit"
            placeholder="Select Weight Unit"
            label="Weight Unit"
            fullWidth={true}
            isClearable
            options={weightUnitOptions}
          />
        </div>
        <div className="col-6">
          <SelectStore label="Location" />
        </div>

      </div>

      <div className="row">
        <div className="col-6">
          <TextArea
            name="description"
            label="Description"
            placeholder="Description"
          />
        </div>
        <div className="col-6">
          <Select
            name="allow_transfer_out_of_stock"
            label="Allow Transfer When Out Of Stock"
            placeholder="Allow transfer when out of stock"
            options={allowTransferOutOfStock}
          />
        </div>
      </div>
    </div>
  );

  // Bulk Update Modal Footer
  const bulkUpdateFooter = (
    <>
      <div className="pull-left">
        {/* Delete Button */}
        <DeleteButton
          label="Delete"
          onClick={() => deleteproducts(props.productIds, props.toggle())}
        />
      </div>
      <div className=" pull-right  pr-0">
        {/* Button for product Bulk update */}
        <Button type="submit" label="Update" />
        {/* Cancel Button */}
        <CancelButton
          name="Close"
          onClick={() => {
            props.toggle();
          }}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Add Modal */}
      <AddModal
        className="landing-create-popup w-100 expert-modal"
        isOpen={props.isOpen}
        toggle={props.toggle}
        toggleModalClose={props.toggle}
        modalTitle="Bulk Update"
        modalBody={bulkUpdateForm}
        modalFooter={bulkUpdateFooter}
        initialValues={initialValues}
        onSubmit={(values) => {
          if (values) {
            dispatch(update(values, props.toggle));
          }
        }}
        hideDefaultButtons
      />
    </>
  );
}
