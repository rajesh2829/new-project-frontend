import React from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
import { updateProduct } from "../../../actions/storeProduct";
import { endpoints } from "../../../api/endPoints";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ProductCard from "../../product/components/productCard";

const CategoryProductForm = (props) => {
  
  const { categoryId, categoryName, categoryStatus, excludeIds } = props;
  
  const dispatch = useDispatch();

  return (
    <>
      <div>
        {/* Stock Product Entry List */}
        <div className="mt-4">
          <ReduxTable
            id="categoryProduct"
            showHeader
            searchPlaceholder="Search"
            paramsToUrl={true}
            history={props.history}
            apiURL={`${endpoints().categoryAPI}/productList/search`}
            newTableHeading
            sortByDropdown
            params={{
              categoryId: categoryId,
              categoryName: categoryName,
              categoryStatus: categoryStatus,
            }}
          >
            <ReduxColumn
              field="product_name"
              sortBy="name"
              width="400px"
              className="ellipsis text-wrap"
              type="link"
              isClickable="false"
              renderField={(row) => (
                <>
                  <ProductCard
                    productImageIcon
                    square
                    productName={row.product_name}
                    brandName={row.brand_name}
                    size={row.size != "null" ? row.size : ""}
                    unit={row.unit != "null" ? row.unit : ""}
                    salePrice={row.sale_price != "null" ? row.sale_price : ""}
                    mrp={row.mrp != "null" ? row.mrp : ""}
                    url={row.featured_media_url}
                    id={row.product_id}
                    brand_id={row.brand_id}
                  />
                </>
              )}
            >
              {" "}
              Product
            </ReduxColumn>
            <ReduxColumn
              field="status"
              width={"120px"}
              minWidth="120px"
              maxWidth="120px"
              sortBy="status"
              renderField={(row) => (
                <div
                  className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase mx-auto ${row.status && row.status === "Active"
                      ? "bg-success"
                      : row.status === "Draft"
                        ? "bg-secondary"
                        : row.status === "Archived"
                          ? "bg-primary"
                          : ""
                    }`}
                >
                  <p>{row.status}</p>
                </div>
              )}
            >
              Status
            </ReduxColumn>
            <ReduxColumn
              field="Action"
              disableOnClick
              width="70px"
              renderField={(row) => (
                <>
                  <div className="d-flex justify-content-center align-items-center row">
                    <div className="text-dark landing-group-dropdown">
                      <MoreDropdown>
                        <DropdownItem
                          onClick={() => {

                            dispatch(
                              updateProduct(
                                row?.product_id,
                                {
                                  category_id: null,
                                },
                                { categoryId: categoryId }, props.getProductList
                              )
                            );
                          }}
                        >
                          Remove
                        </DropdownItem>
                      </MoreDropdown>
                    </div>
                  </div>
                </>
              )}
            >
              Action
            </ReduxColumn>
          </ReduxTable>
        </div>
      </div>
    </>
  );
};

export default CategoryProductForm;
