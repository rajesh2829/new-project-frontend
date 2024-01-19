//React Package
import React, { useState } from "react";
import ProductCard from "../../product/components/productCard";
import { endpoints } from "../../../api/endPoints";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { fetchList } from "../../../actions/table";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import QuantityModal from "../../../components/modal/QuantityModal";
import TransferService from "../../../services/TransferService";
import Button from "../../../components/Button";

const replenishProduct = "replenishProduct";

const ReplenishList = (props) => {
  const [selectedRow, setSelectedRow] = useState("");

  const [openQuantityModal, setOpenQuantityModal] = useState(false);

  const dispatch = useDispatch();

  const toggleQuantitySelectModal = () => {
    setOpenQuantityModal(false);
    setSelectedRow("");
  };
  const handleReplenish = async (selectedQuantity) => {
    if (selectedQuantity && selectedQuantity.quantity && selectedRow) {
      let bodyData = {
        toLocationId: props.toLocationId,
        quantity: selectedQuantity.quantity.value,
        productId: selectedRow.product_id
      };

      await TransferService.replenish(bodyData, () => {
        toggleQuantitySelectModal();

        dispatch(
          fetchList(
            "replenishProduct",
            `${endpoints().transferApi}/replenishProduct`,
            1,
            25,
            {
              toLocationId: props.toLocationId,
              transferId: props.id
            }
          )
        );
      });
    }
  };
  <QuantityModal
    handleSubmit={handleReplenish}
    toggle={openQuantityModal}
    onModalClose={toggleQuantitySelectModal}
    modalTitle={"Add To Transfer"}
    confirmLabel={"Add"}
  />;
  return (
    <div>
      {" "}
      <QuantityModal
        handleSubmit={handleReplenish}
        toggle={openQuantityModal}
        onModalClose={toggleQuantitySelectModal}
        modalTitle={"Add To Transfer"}
        confirmLabel={"Add"}
        quantity={selectedRow && selectedRow.replenishQuantity}
      />
      <ReduxTable
        id="replenishProduct"
        showHeader
        searchPlaceholder="Search"
        paramsToUrl={true}
        history={props.history}
        apiURL={`${endpoints().transferApi}/replenishProduct`}
        newTableHeading
        sortByDropdown
        params={{
          toLocationId: props.toLocationId,
          transferId: props.id
        }}>
        <ReduxColumn
          field="product_name"
          sortBy="product_name"
          type="link"
          width="250px"
          minWidth="250px"
          maxWidth="250px"
          isClickable="true"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.product_name}
                url={row.image}
                brandName={row.brand_name}
                size={row.size}
                unit={row.unit}
                salePrice={row.sale_price}
                mrp={row.mrp}
                id={row.product_id}
                brand_id={row.brand_id}
              />
            </>
          )}>
          Product
        </ReduxColumn>
        <ReduxColumn
          className="ellipsis text-center"
          disableOnClick
          renderField={(row) => {
            return (
              <>
                <Button
                  label={`Replenish`}
                  onClick={() => {
                    setSelectedRow(row);
                    setOpenQuantityModal(true);
                  }}
                />
              </>
            );
          }}>
          Replenish
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch)
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;

  const pageSize =
    reduxTable[replenishProduct] &&
    reduxTable[replenishProduct].isFetching == false
      ? reduxTable[replenishProduct].pageSize
      : 25;

  const Count =
    reduxTable[replenishProduct] &&
    reduxTable[replenishProduct].isFetching == false
      ? reduxTable[replenishProduct].totalCount
      : 0;
  const currentPage =
    reduxTable[replenishProduct] &&
    reduxTable[replenishProduct].isFetching == false
      ? reduxTable[replenishProduct].currentPage
      : 1;

  return {
    pageSize,
    currentPage,
    Count
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(ReplenishList);
