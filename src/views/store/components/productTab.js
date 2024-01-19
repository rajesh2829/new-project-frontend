import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import DeleteModal from "../../../components/DeleteModal";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ProductCard from "../../product/components/productCard";
import Button from "../../../components/Button";
import Quantity from "../../../components/Quantity";
import AddModal from "../../../components/Modal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// API
import { endpoints } from "../../../api/endPoints";

// Lib
import Url from "../../../lib/Url";

// Actions
import { fetchList } from "../../../actions/table";
import { deleteStoreProduct } from "../../../actions/storeProductDetail";

// Services
import StoreProductService from "../../../services/StoreProductService";
import TransferService from "../../../services/TransferService";

import QuantityModal from "../../../components/modal/QuantityModal";

import Form from "../../../components/Form";
import Text from "../../../components/Text";

const storeProduct = "storeProduct"

const ProductTab = (props) => {
  const { storeId, history, CurrentPage, CurrentPageSize } = props;
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState();
  const [productName, setProductName] = useState();
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [brand, setBrand] = useState(Url.GetParam('brand'));
  const [category, setCategory] = useState(Url.GetParam("category"));
  const [openModal, setOpenModel] = useState();
  const [isOpen, setIsOpen] = useState();
  const [rowValues, setRowValues] = useState();
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const sortByOption = [
    {
      value: "product_name:ASC",
      label: "Name",
    },
    {
      value: "order_quantity:DESC",
      label: "Order Quantity",
    },

  ];

  const ActionMenu = [
    { label: "All", value: "All" },
    { label: "No Stock", value: "NoStock" },
    { label: "Excess", value: "Excess" },
    { label: "Shortage", value: "Shortage" }
  ]

  const storeProductDelete = (id) => {
    dispatch(deleteStoreProduct(id, {
      store_id: storeId, sort: Url.GetParam("sort")
        ? Url.GetParam("sort")
        : "product_name", sortDir: Url.GetParam("sortDir")
          ? Url.GetParam("sortDir")
          : "ASC"
    }, "storeProduct", props.CurrentPage, props.CurrentPageSize));
  };

  const pageSize = Url.GetParam("pageSize");

  const editToggle = () => {
    setOpenModel(false);
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const handleReplenish = async (selectedQuantity) => {

    if (selectedQuantity && selectedQuantity.quantity && selectedRow) {

      let bodyData = { toLocationId: selectedRow?.store_id, quantity: selectedQuantity.quantity.value, productId: selectedRow.productId };

      await TransferService.replenish(bodyData, () => {

        toggleQuantitySelectModal();

        dispatch(fetchList("storeProduct", `${endpoints().storeProductAPI}/search`, 1, 25, {
          store_id: storeId,
          pageSize: Url.GetParam("pageSize"),
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir")
        }));
      });
    }
  }

  const toggleQuantitySelectModal = () => {
    setOpenQuantityModal(false);
    setSelectedRow("");
  }

  const handleChange = async (selectedQuantity, rowData) => {

    if (selectedQuantity && selectedQuantity.values && selectedQuantity.values.quantity && rowData) {

      let bodyData = { toLocationId: rowData?.store_id, quantity: selectedQuantity.values.quantity.value, productId: rowData.productId };

      await TransferService.replenish(bodyData, () => {

        dispatch(fetchList("storeProduct", `${endpoints().storeProductAPI}/search`, 1, 25, {
          store_id: storeId,
          pageSize: Url.GetParam("pageSize"),
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir")
        }));
      });
    }
  }

  const bodyForm = (
    <>
      <ProductCard
        productImageIcon
        square
        productName={rowValues?.productName}
        url={rowValues?.image}
        brandName={rowValues?.brand_name}
        salePrice={rowValues?.sale_price}
      />

      <Quantity
        label="Quantity"
        maxQuantity={500}
        required
      />
      <Quantity
        label="Min Quantity"
        name="min_quantity"
        maxQuantity={500}
        required
      />
      <Quantity
        label="Max Quantity"
        name="max_quantity"
        maxQuantity={500}
        required
      />
      <Text label="Rack Number" name="rack_number" />

    </>
  )

  const Footer = (
    <>
      <Button
        type="submit"
        label="Update"
        className="h6-5-important mr-3"
      />
    </>
  )

  const initialValues = {
    quantity: rowValues?.quantity ? {
      value: rowValues?.quantity ? rowValues?.quantity : "",
      label: rowValues?.quantity ? rowValues?.quantity : ""
    } : "",
    min_quantity: rowValues?.min_quantity ? {
      value: rowValues?.min_quantity ? rowValues?.min_quantity : "",
      label: rowValues?.min_quantity ? rowValues?.min_quantity : ""
    } : "",
    max_quantity: rowValues?.max_quantity ? {
      value: rowValues?.max_quantity ? rowValues?.max_quantity : "",
      label: rowValues?.max_quantity ? rowValues?.max_quantity : ""
    } : "",
    rack_number: rowValues?.rack_number ? rowValues?.rack_number : "",
  }

  const handleUpdate = (values) => {
    const id = rowValues.store_product_id;
    const data = new FormData()
    data.append("quantity", values?.quantity.value);
    data.append("max_quantity", values?.max_quantity.value);
    data.append("min_quantity", values?.min_quantity.value);
    data.append("rack_number", values?.rack_number)
    data.append("store_id", rowValues?.store_id);
    data.append("product_id", rowValues?.productId);
    const params = {
      store_id: storeId, search: Url.GetParam("search"), brand: Url.GetParam("brand"), sort: Url.GetParam("sort")
        ? Url.GetParam("sort")
        : "product_name", sortDir: Url.GetParam("sortDir")
          ? Url.GetParam("sortDir")
          : "ASC",
      CurrentPage: CurrentPage, pageSize: Url.GetParam("pageSize"), CurrentPageSize: CurrentPageSize
    }
    dispatch(StoreProductService.update(id, data, params, editToggle))
  }

  return (
    <>
      <div>
        <AddModal
          isOpen={openModal}
          toggle={toggle}
          toggleModalClose={editToggle}
          modalTitle="Edit Store Product"
          modalBody={bodyForm}
          modalFooter={Footer}
          initialValues={initialValues}
          onSubmit={handleUpdate}
          hideDefaultButtons
        />

        <QuantityModal
          handleSubmit={handleReplenish}
          toggle={openQuantityModal}
          onModalClose={toggleQuantitySelectModal}
          modalTitle={"Add To Transfer"}
          confirmLabel={"Add"}
          quantity={selectedRow && selectedRow.requiredQuantity}
        />

        <DeleteModal
          isOpen={isDeleteModel}
          toggle={() => {
            setIsDeleteModel(false);
          }}
          title="Product"
          id={currentData?.store_product_id}
          label={productName}
          deleteFunction={storeProductDelete}
        />
        <ReduxTable
          id="storeProduct"
          showHeader
          newTableHeading
          showBrandFilter
          showCategoryFilter
          history={history}
          showStockFilter

          apiURL={`${endpoints().storeProductAPI}/search`}
          params={{
            store_id: storeId,
            pageSize: Url.GetParam("pageSize"),
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir")
          }}
          searchPlaceholder="Search..."
          sortByOptions={sortByOption}
          paramsToUrl={true}
          ActionMenu={ActionMenu}
        >
          <ReduxColumn
            field="name"
            minWidth="250px"
            sortBy="product_id"
            isClickable="true"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  productName={row?.productName}
                  url={row.image}
                  brandName={row.brand_name}
                  salePrice={row.sale_price}
                  size={row.size}
                  unit={row.unit}
                  id={row.id}
                  brand_id={row.brand_id}
                />
              </>
            )}
          >
            Product
          </ReduxColumn>
          <ReduxColumn field="quantity" sortBy="quantity" className="ellipsis text-center">Quantity</ReduxColumn>

          <ReduxColumn field="order_quantity" sortBy="order_quantity" className="ellipsis text-center" width="150px">
            Order Quantity
          </ReduxColumn>
          <ReduxColumn field="min_quantity" sortBy="min_quantity" className="ellipsis text-center" width="150px">
            Min Quantity
          </ReduxColumn>
          <ReduxColumn field="max_quantity" sortBy="max_quantity" className="ellipsis text-center" width="150px">
            Max Quantity
          </ReduxColumn>
          <ReduxColumn field="rack_number" sortBy="rack_number" className="ellipsis text-center" width="150px">
            Rack Number
          </ReduxColumn>
          <ReduxColumn field="last_stock_entry_date" sortBy="last_stock_entry_date" className="ellipsis text-center" width="150px">
            Last Stock Entry Date
          </ReduxColumn>
          <ReduxColumn field="last_order_date" sortBy="last_order_date" className="ellipsis text-center" width="150px">
            Last Order Date
          </ReduxColumn>
          <ReduxColumn
            disableOnClick
            className="ellipsis text-center"
            field="requiredQuantity"
          >
            Required Quantity
          </ReduxColumn>
          <ReduxColumn
            disableOnClick
            minWidth="180px"
            field="replenishQuantity"
            renderField={(row) => {
              return (
                <div className="text-center col-12">
                  <Form
                    enableReinitialize={true}
                    initialValues={{
                      quantity: {
                        value: row.replenishQuantity,
                        label: row.replenishQuantity,
                      },
                    }}
                  >
                    {row.replenishQuantity > 0 && (
                      <Quantity
                        onChange={(e) => {
                          handleChange(e, row);
                        }}
                      />
                    )}
                  </Form>
                </div>
              )
            }}
          >
            Replenished Quantity
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-center"
            disableOnClick
            renderField={(row) => {
              return (
                <>
                  {row.min_quantity > row.updatedQuantity && (
                    <Button
                      label={"Replenish"}
                      onClick={() => {
                        setSelectedRow(row);
                        setOpenQuantityModal(true);
                      }}
                    />
                  )}
                </>
              )
            }}
          >
            Replenish
          </ReduxColumn>
          <ReduxColumn
            field="Action"
            width="100px"
            disableOnClick
            renderField={(row) => (
              <div className="text-center action-group-dropdown">
                <MoreDropdown>
                  <DropdownItem
                    onClick={() => {
                      setOpenModel(true)
                      setRowValues(row)
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setSelectedRow(row);
                      setOpenQuantityModal(true);
                    }}
                  >
                    Force Replenish
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    onClick={() => {
                      setCurrentData(row);
                      setProductName(row?.productName);
                      setIsDeleteModel(true);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;

  const pageSize =
    reduxTable[storeProduct] && reduxTable[storeProduct].isFetching == false
      ? reduxTable[storeProduct].pageSize
      : 25;

  const currentPage =
    reduxTable[storeProduct] && reduxTable[storeProduct].isFetching == false
      ? reduxTable[storeProduct].currentPage
      : 1;

  return {
    pageSize,
    currentPage,
  };
};

// export default ProductTab;

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(ProductTab);



