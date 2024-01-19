import React from "react";

// Constant
import { cartConstants } from "../../../helpers/OrderList";

//components
import QuantityButtons from "../../../components/QuantityButtons";
import ProductCard from "../../product/components/productCard";

const CartItem = ({
  item,
  dispatch,
  cart,
  updateCart,
  deleteOrderProduct,
  outofStockProduct,
  products,
}) => {
  // Change quantity of cart items
  const changeQuantity = (id, qty) => {
    dispatch({
      type: cartConstants.CHANGE_CART_QTY,
      payload: {
        id: id,
        qty: qty,
      },
    });
    updateCart(id);
  };

  const isBrandExist =
    Array.isArray(products) && products.find((data) => data.name === item.name);

  // Remove added item
  const removeItem = (item) => {
    dispatch({
      type: cartConstants.REMOVE_FROM_CART,
      payload: item,
    });
    deleteOrderProduct(item.orderProductId);
  };
  return (
    <div>
      <div className="row">
        {/* Action Buttons */}
        <div className="mx-3">
          <ProductCard
            square
            salePrice={item.amount}
            productName={item.name}
            url={item.image}
            brandName={isBrandExist && isBrandExist.brand}
          />
          {/* Buttons */}
          <div className="ml-5 pl-5 cart-item-button">
            <QuantityButtons
              label={item.qty}
              changeQuantity={changeQuantity}
              productId={item.id}
              quantity={item.qty}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <div
          className="cursor-pointer font-weight-bold"
          onClick={() => removeItem(item)}
        >
          <a className="text-danger">Remove</a>
        </div>
      </div>

      {outofStockProduct && (
        <div className="d-flex justify-content-center">
          <div className="cursor-pointer font-weight-bold">
            <a className="text-danger font-12">{`Out Of Stock ${
              outofStockProduct?.availableQuantity != null
                ? `(${outofStockProduct?.availableQuantity})`
                : ""
            }`}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
