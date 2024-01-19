import React from "react";

// Components
import ProductCard from "../../product/components/productCard";

// Constants
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";


const productForm = (props) => {
  const { storeId, brandId } = props;

  let params = {}

  if (brandId) {
    params.brandId = brandId
  }

  if (storeId) {
    params.storeId = storeId
  }

  return (
    <>
      <div>
        {/* Stock Product Entry List */}
        <div className="mt-4">
          <ReduxTable
            id="brandProduct"
            showHeader
            searchPlaceholder="Search"
            paramsToUrl={true}
            history={props.history}
            apiURL={`${endpoints().brandAPI}/productList/search`}
            newTableHeading
            sortByDropdown
            params={params}
          >
            <ReduxColumn
              field="product_name"
              sortBy="product_name"
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
          </ReduxTable>
        </div>
      </div>
    </>
  );
};

export default productForm;
