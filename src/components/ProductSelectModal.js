import React from "react";
import ProductCard from "../views/product/components/productCard";
import Modal from "./Modal";

// Components
import ReduxTable, { ReduxColumn } from "../components/reduxTable";
import Button from "./Button";
import { endpoints } from "../api/endPoints";

const ProductSelectModal = ({
  modalOpen,
  toggle,
  productList,
  params,
  onProductClick,
  apiURL,
  BulkSelect,
  toggleModalClose,
  initialValues,
  handleSubmit,
  showBrandFilter,
  showCategoryFilter,
  history,
  id,
  footerLabel,
  bulkSelect=true,
  showFooter=true
}) => {
  const modalBody = (
    <ReduxTable
      id={id ? id : "product"}
      showHeader
      newTableHeading
      sortByDropdown
      // showDropdown={true}
      showStatusOptions={false}
      searchPlaceholder="Search"
      // disableHeader
      params={params}
      apiURL={apiURL ? apiURL : `${endpoints().productAPI}/search`}
      onBulkSelect={BulkSelect}
      bulkSelect={bulkSelect}
      history={history}
      paramsToUrl={true}
      showScroll
      showBrandFilter={showBrandFilter}
      showCategoryFilter={showCategoryFilter}
      showFooter={showFooter}
    >
      <ReduxColumn
        // disableOnClick
        type="link"
        isClickable="true"
        sortBy="product_name"
        renderField={(row) => {
          return (
            <div onClick={() => onProductClick(row)}>
              <ProductCard
                id={row.id}
                productImageIcon
                productName={row.name ? row.name: row.productName}
                brandName={row.brand ? row.brand :row.brand_name}
                size={row.size}
                unit={row.unit}
                salePrice={row.sale_price}
                mrp={row.mrp}
                url={row.image}
                status={row.status}
                packSize={row.pack_size}
                brand_id={row.brand_id}
                disableLink
              />
            </div>
          );
        }}
      >
        Product
      </ReduxColumn>
    </ReduxTable>
  );

  const productFooter = (
    <Button
      label={footerLabel ? footerLabel: "Add Products"}
      className="h6-5-important"
      onClick={(values) => {
        handleSubmit(values);
      }}
    />
  );

  return (
    <>
      <Modal
        className="expert-modal maxWidth-100"
        isOpen={modalOpen}
        toggle={toggle}
        toggleModalClose={toggleModalClose}
        modalTitle="Select Product"
        initialValues={initialValues ? initialValues : { product: "" }}
        modalBody={modalBody}
        modalFooter={showFooter ? productFooter : ""}
        hideDefaultButtons
      />
    </>
  );
};

export default ProductSelectModal;
