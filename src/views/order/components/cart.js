import React, { useEffect, useState } from "react";

// Css
import "../style.scss";
import CartItem from "./cartItem";
import ArrayList from "../../../lib/ArrayList";
import NoRecordsFound from "../../../components/NoRecordsFound";

// Constant
import { cartConstants } from "../../../helpers/OrderList";
import Button from "../../../components/Button";

const Cart = ({
  state,
  dispatch,
  updateCart,
  deleteOrderProduct,
  showCart,
  handleClose,
  total,
  setTotal,
  outofStockProducts
}) => {
  const { cart, cartItem, products
  } = state;

  useEffect(() => {
    findTotal();
  }, [cart, cartItem]);

  useEffect(() => {
    dispatch({
      type: cartConstants.ADD_TOTAL_COST,
      totalCost: total,
    });
  }, [total]);

  const findTotal = () => {
    setTotal(
      cart &&
      cart.reduce(
        (acc, current) => acc + Number(current.amount) * current.qty,
        0
      )
    );
  };

  return (
    <>
      {cart ? (
        <div className={!showCart ? "card" : ""}>
          <div className={"card bg-white cartOrderCard"}>
            <div className="d-flex cart-header justify-content-between m-2">
              <span className="cart-title mt-2">Cart</span>
              {showCart ? <Button onClick={handleClose} label="Close" /> : ""}
            </div>

            <div className="p-2">
              {/* Cart items */}
              {Array.isArray(cart) &&
                cart.map((item) => {
                  let productExist;
                  if (outofStockProducts && outofStockProducts.length > 0) {
                    productExist = outofStockProducts.find((data) => data.product_id == item.id);
                  }
                  return (
                    <CartItem
                      item={item}
                      products={products}
                      dispatch={dispatch}
                      cart={cart}
                      updateCart={updateCart}
                      deleteOrderProduct={deleteOrderProduct}
                      outofStockProduct={productExist}
                    />
                  )
                })}
              {ArrayList.isEmpty(cart) && (
                <NoRecordsFound message="Cart is empty!" />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
