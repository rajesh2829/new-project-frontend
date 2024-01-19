import React, { useEffect, useState } from "react";
import { DropdownItem } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ProductCard from "./productCard";
import MoreDropdown from "../../../components/authentication/moreDropdown";

// Helpers
import * as tabConstant from "../../../helpers/Product";
import { Status } from "../../../helpers/Product";

// Endpoints
import { endpoints } from "../../../api/endPoints";

// Font Awesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// Lib
import Currency, { Percentage } from "../../../lib/Currency";
import Url from "../../../lib/Url";
import ArrayList from "../../../lib/ArrayList";
import { TagTypeName } from "../../../helpers/Tag";

const ProductList = (props) => {
  const {
    id,
    params,
    history,
    sortByOption,
    handleBulkDelete,
    updateProductStatus,
    currentPublishedPage,
    currentDraftPage,
    currentAllPage,
    draftProducts,
    archivedProducts,
    handleBrandChange,
    handleCategoryChange,
    showDropdown,
    showStatus,
    arrays,
    setPage,
  } = props;
  // Defining dispatch from useDispatch,
  const dispatch = useDispatch();

  const ActiveCurrentPage = props.ActiveCurrentPage;

  const ActiveCurrentPageSize = props.ActiveCurrentPageSize;
  const AllCurrentPageSize = props.AllCurrentPageSize;

  function getKeyByValue(object, value) {
    let isSelected = false;
    for (const key in object) {
      if (key == value) {
        isSelected = object[key] == true ? true : false;
      }
    }
    return isSelected;
  }

  const enable_mrp =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.MRP)
      ? true
      : false;
  const enable_cost_price =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.COST_PRICE)
      ? true
      : false;
  const enable_sale_price =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.SALE_PRICE)
      ? true
      : false;
  const enable_profit =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.PROFIT)
      ? true
      : false;
  const enable_profit_amount =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.PROFIT_AMOUNT)
      ? true
      : false;
  const enable_max_quantity =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.MAX_QUANTITY)
      ? true
      : false;
  const enable_min_quantity =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.MIN_QUANTITY)
      ? true
      : false;
  const enable_brand =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.BRAND)
      ? true
      : false;
  const enable_bar_code =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.BAR_CODE)
      ? true
      : false;
  const enable_Category =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.CATEGORY)
      ? true
      : false;
  const enable_tax =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.TAX)
      ? true
      : false;
  const enable_CGST =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.CGST)
      ? true
      : false;
  const enable_SGST =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.SGST)
      ? true
      : false;
  const enable_CGST_AMOUNT =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.CGST_AMOUNT)
      ? true
      : false;
  const enable_SGST_AMOUNT =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.SGST_AMOUNT)
      ? true
      : false;
  const enable_MANUFACTURE =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.MANUFACTURE)
      ? true
      : false;
  const enable_discount =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.DISCOUNT)
      ? true
      : false;
  const enable_margin =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.MARGIN)
      ? true
      : false;
  const enable_sku =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.SKU)
      ? true
      : false;
  const enable_pack_size =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.PACK_SIZE)
      ? true
      : false;
  const enable_hsn_code =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.HSN_CODE)
      ? true
      : false;
  const enable_shelf_life =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.SHELF_LIFE)
      ? true
      : false;
  const enable_sales_coin =
    arrays && ArrayList.getKeyByValue(arrays, tabConstant.FieldLabel.SALES_COIN)
      ? true
      : false;


  return (
    <ReduxTable
      id={id}
      bulkSelect
      showHeader
      onBulkSelect={handleBulkDelete}
      selectedCheckBox={props.selectedCheckBox}
      searchPlaceholder="Search"
      apiURL={`${endpoints().productAPI}/search`}
      newTableHeading
      params={params}
      icon={<FontAwesomeIcon icon={faBoxOpen} />}
      history={history}
      message="You can start by clicking on Add New"
      sortByOptions={sortByOption}
      paramsToUrl={true}
      showBrandFilter
      showCategoryFilter
      showCheckBox
      showProductFilter
      tagFilterType={{
        type: TagTypeName.PRODUCT,
      }}
      showTagFilter
      showManufactureFilter
      setPage={setPage}
    >
      <ReduxColumn
        field="name"
        type="link"
        isClickable="true"
        sortBy="product_name"
        minWidth="650px"
        renderField={(row) => (
          <>
            <ProductCard
              id={row.id}
              productImageIcon
              square
              productName={row.name}
              brandName={row.brand}
              size={row.size != "null" ? row.size : ""}
              unit={row.unit != "null" ? row.unit : ""}
              salePrice={row.sale_price != "null" ? row.sale_price : ""}
              mrp={row.mrp != "null" ? row.mrp : ""}
              url={row.image}
              status={row.status}
              packSize={row.pack_size}
              brand_id={row.brand_id}
            />
          </>
        )}
      >
        Product
      </ReduxColumn>
      {enable_brand && enable_brand == true && (
        <ReduxColumn
          className="text-right"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          field="brand"
          sortBy="brand_name"
        >
          Brand
        </ReduxColumn>
      )}
      {enable_Category && enable_Category == true && (
        <ReduxColumn
          className="text-center"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          field="category"
          sortBy="category_name"
          type="link"
          isClickable="true"
          renderField={(row) => (
            <>
              <Link to={`/category/${row.category_id}`}>
                <span>
                  {row.category}
                </span>
              </Link>
            </>
          )}
        >
          Category
        </ReduxColumn>
      )}
      {enable_mrp && enable_mrp == true && (
        <ReduxColumn
          className="text-right"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          field="mrp"
          renderField={(row) => <span>{Currency.Format(row.mrp)}</span>}
          sortBy="mrp"
        >
          MRP
        </ReduxColumn>
      )}
      {enable_sale_price && enable_sale_price == true && (
        <ReduxColumn
          className="text-right"
          field="sale_price"
          renderField={(row) => <span>{Currency.Format(row.sale_price)}</span>}
          sortBy="sale_price"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
        >
          Sale Price
        </ReduxColumn>
      )}
      {enable_cost_price && enable_cost_price == true && (
        <ReduxColumn
          className="text-right"
          field="cost"
          sortBy="cost"
          renderField={(row) => <span>{Currency.Format(row.cost)}</span>}
          minWidth="110px"
          maxWidth="110px"
          width="110px"
        >
          Cost Price
        </ReduxColumn>
      )}
      {enable_profit && enable_profit == true && (
        <ReduxColumn
          className="text-right"
          field="profit_percentage"
          sortBy="profit_percentage"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Percentage(row.profit_percentage)}</span>}
        >
          Profit %
        </ReduxColumn>
      )}
      {enable_profit_amount && enable_profit_amount == true && (
        <ReduxColumn
          className="text-right"
          field="profit_amount"
          sortBy="profit_amount"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Currency.Format(row.profit_amount)}</span>}
        >
          Profit Amount
        </ReduxColumn>
      )}
      {enable_tax && enable_tax == true && (
        <ReduxColumn
          className="text-right"
          field="tax_percentage"
          sortBy="tax_percentage"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Percentage(row.tax_percentage)}</span>}
        >
          Tax %
        </ReduxColumn>
      )}
      {enable_bar_code && enable_bar_code == true && (
        <ReduxColumn
          className="text-right"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          field="barcode"
          sortBy="barcode"
        >
          Barcode
        </ReduxColumn>
      )}

      {enable_CGST && enable_CGST == true && (
        <ReduxColumn
          className="text-right"
          field="cgst_percentage"
          sortBy="cgst_percentage"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Percentage(row.cgst_percentage)}</span>}
        >
          CGST %
        </ReduxColumn>
      )}
      {enable_CGST_AMOUNT && enable_CGST_AMOUNT == true && (
        <ReduxColumn
          className="text-right"
          field="cgst_amount"
          sortBy="cgst_amount"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Currency.Format(row.cgst_amount)}</span>}
        >
          CGST Amount
        </ReduxColumn>
      )}
      {enable_SGST && enable_SGST == true && (
        <ReduxColumn
          className="text-right"
          field="sgst_percentage"
          sortBy="sgst_percentage"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Percentage(row.sgst_percentage)}</span>}
        >
          SGST %
        </ReduxColumn>
      )}

      {enable_SGST_AMOUNT && enable_SGST_AMOUNT == true && (
        <ReduxColumn
          className="text-right"
          field="sgst_amount"
          sortBy="sgst_amount"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Currency.Format(row.sgst_amount)}</span>}
        >
          SGST Amount
        </ReduxColumn>
      )}
      {enable_discount && enable_discount == true && (
        <ReduxColumn
          className="text-right"
          field="discount_percentage"
          sortBy="discount_percentage"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Percentage(row.discount_percentage)}</span>}
        >
          Discount %
        </ReduxColumn>
      )}
      {enable_margin && enable_margin == true && (
        <ReduxColumn
          className="text-right"
          field="margin_percentage"
          sortBy="margin_percentage"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => <span>{Percentage(row.margin_percentage)}</span>}
        >
          Margin %
        </ReduxColumn>
      )}
      {enable_sku && enable_sku == true && (
        <ReduxColumn
          field="sku"
          className="text-center"
          sortBy="sku"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
        >
          SKU
        </ReduxColumn>
      )}
      {enable_pack_size && enable_pack_size == true && (
        <ReduxColumn
          field="pack_size"
          className="text-center"
          sortBy="pack_size"
          minWidth="150px"
          maxWidth="150px"
          width="150px"
        >
          Pack Size
        </ReduxColumn>
      )}
      {enable_hsn_code && enable_hsn_code == true && (
        <ReduxColumn
          field="hsn_code"
          className="text-center"
          sortBy="hsn_code"
          minWidth="150px"
          maxWidth="150px"
          width="150px"
        >
          HSN Code
        </ReduxColumn>
      )}
      {enable_shelf_life && enable_shelf_life == true && (
        <ReduxColumn
          field="shelf_life"
          className="text-center"
          sortBy="shelf_life"
          minWidth="150px"
          maxWidth="150px"
          width="150px"
        >
          Shelf Life
        </ReduxColumn>
      )}
      {enable_sales_coin && enable_sales_coin == true && (
        <ReduxColumn
          field="sales_coin"
          className="text-center"
          sortBy="sales_coin"
          minWidth="150px"
          maxWidth="150px"
          width="150px"
        >
          Sales Coin
        </ReduxColumn>
      )}
      {enable_min_quantity && enable_min_quantity == true && (
        <ReduxColumn
          field="min_quantity"
          className="text-center"
          sortBy="min_quantity"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
        >
          Min Qty
        </ReduxColumn>
      )}

      {enable_max_quantity && enable_max_quantity == true && (
        <ReduxColumn
          field="max_quantity"
          className="text-center"
          sortBy="max_quantity"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
        >
          Max Qty
        </ReduxColumn>
      )}
      {enable_MANUFACTURE && enable_MANUFACTURE == true && (
        <ReduxColumn
          field="manufacture_name"
          className="text-center"
          sortBy="manufacture_name"
        >
          Manufacture
        </ReduxColumn>
      )}
      {showStatus && (
        <ReduxColumn
          field="status"
          sortBy="status"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          renderField={(row) => (
            <div
              className={`user-list text-white fw-600 text-uppercase text-center bg-primary rounded ${row.status && row.status === Status.ACTIVE
                ? "bg-success"
                : row.status === Status.DRAFT
                  ? "bg-secondary"
                  : row.status === Status.ARCHIVED
                    ? "bg-primary"
                    : ""
                }`}
            >
              {row.status}
            </div>
          )}
        >
          Status
        </ReduxColumn>
      )}
      
      {id !== archivedProducts && id !== draftProducts && (
        <ReduxColumn
          field="Action"
          minWidth="110px"
          maxWidth="110px"
          width="110px"
          disableOnClick
          renderField={(row) => (
            <div className="text-center">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    dispatch(
                      updateProductStatus(row.id,
                        row.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
                        {
                          pagination: true,
                          search: Url.GetParam("search") || "",
                          brand: props.brand || Url.GetParam("brand"),
                          category: props.category || Url.GetParam("category"),
                        },
                        ActiveCurrentPage,
                        ActiveCurrentPageSize,
                        currentAllPage,
                        AllCurrentPageSize

                      )
                    );
                  }}
                >

                  {row.status === Status.ACTIVE
                    ? "Make As Inactive"
                    : "Make As Active"}
                </DropdownItem>
              </MoreDropdown>
            </div>
          )
          }
        >
          Action
        </ReduxColumn >
      )}
    </ReduxTable >
  );
};

export default ProductList;
