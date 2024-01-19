import React from "react";
import Pagination from "../../components/Pagination";
import ProductCard from "../product/components/productCard";
import "./styles.scss";
import NoRecordsFound from "../../components/NoRecordsFound";

function ReportTable(props) {
  const { detail, storeList, detailValue, setPage, page, pageSize, params, productParams } = props;

  const currentPage = page;
  const totalCounts = detailValue?.totalCount;
  const pageSizes = detailValue?.pageSize;
  const startPage = (currentPage - 1) * detailValue?.pageSize + 1;
  const firstPage =
    startPage > detailValue?.totalCount ? detailValue?.totalCount : startPage;
  const endPage = currentPage * detailValue?.pageSize;
  const lastPage =
    endPage > detailValue?.totalCount ? detailValue?.totalCount : endPage;

  return (
    <div style={{ overflowX: "auto" }}>
      {detail && detail.length > 0 ? (
        <table className=" table  table-bordered ">
          <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <thead
              className="bg-dark  text-white"
              style={{ position: "sticky", top: 0 }}>
              <tr className="text-center">
                <th className="align-middle">Product</th>
                <th className="align-middle store-name ">
                  Total Available Quantity
                </th>
                <th className="align-middle store-name ">
                  Total Required Quantity
                </th>
                <th className="align-middle store-name ">
                  Total Order Quantity
                </th>
                {storeList.map((store) => (
                  <th className="store-name align-middle" key={store}>
                    {store}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detail.map((product) => (
                <tr className="border-bottom">
                  <td
                    key={product}
                    className="d-flex align-middle text-primary pt-3 pb-0 product-name">
                    <>
                      <ProductCard
                        square
                        productName={product.product_name}
                        brandName={product.brand}
                        size={product.size}
                        unit={product.unit}
                        salePrice={product.sale_price}
                        mrp={product.mrp}
                        url={product.image}
                        status={product.status}
                        packSize={product.pack_size}
                        id={product.product_id}
                        brand_id={product.brand_id}
                      />
                    </>
                  </td>

                  <td key={product} className="align-middle text-center">
                    <div>{product && product.available_quantity}</div>
                  </td>

                  <td key={product} className="align-middle text-center">
                    <div>{product && product.required_quantity}</div>
                  </td>
                  <td key={product} className="align-middle text-center">
                    <div>{product && product.total_order_quantity}</div>
                  </td>
                  {product?.storeProduct.map((store) => {
                    return (
                      <td
                        className="align-middle text-center"
                        style={{ width: "10px" }}
                        key={store}>
                        {store && store?.quantity > store?.max_quantity && (
                          <span className="text-primary font-weight-bold ">
                            {store ? store?.quantity : "-"}{" "}
                          </span>
                        )}
                        {store?.quantity < store?.min_quantity && (
                          <span className="text-danger font-weight-bold ">
                            {store ? store?.quantity : "-"}
                          </span>
                        )}
                        {store?.quantity >= store?.min_quantity &&
                          store?.quantity <= store?.max_quantity && (
                            <span className="text-success font-weight-bold">
                              {store ? store?.quantity : "-"}
                            </span>
                          )}
                        {store?.order_quantity > 0 && (
                          <span className="text-dark font-weight-light ">
                            ({store ? store?.order_quantity : "-"})
                          </span>
                        )}
                        <br></br>
                        <span
                          className="text-secondary"
                          style={{ fontSize: "10px" }}>
                          Min/Max:
                          {store?.quantity >= 0 && (
                            <span>
                              {store ? store?.min_quantity : "-"}
                              {"/"}
                              {store ? store?.max_quantity : "-"}
                            </span>
                          )}
                        </span>

                        <br></br>
                        <span
                          className="text-secondary d-block
                      "
                          style={{ fontSize: "10px" }}>
                          LS: {store ? store?.last_stock_entry_date : "-"}
                          <br></br> LO: {store ? store?.last_order_date : "-"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      ) : (
        <div className="mt-5 pt-5">
          <NoRecordsFound
            showMessage
            boldMessage="No Records Found"
            description="You can start by apply filter"
          />
        </div>
      )}
      {totalCounts > 0 && (
        <div className="d-flex justify-content-between">
          <div>
            Showing {firstPage} to {lastPage} of {totalCounts} entries
          </div>

          <Pagination
            currentPage={page}
            totalCount={totalCounts}
            pageSize={pageSizes}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ReportTable;
