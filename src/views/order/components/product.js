import React from "react";

// Components
import Image from "../../../components/Image";
import NoRecordsFound from "../../../components/NoRecordsFound";
import QuantityButtons from "../../../components/QuantityButtons";

// Constant
import { cartConstants } from "../../../helpers/OrderList";
import ArrayList from "../../../lib/ArrayList";

const Product = ({
  state,
  dispatch,
  addToCart,
  searchTerm,
  brand,
  category,
}) => {
  const { products, cart } = state;

  // Check if the product is in the cart
  const getProduct = (productId) => {
    if (ArrayList.isEmpty(cart)) return null;

    let product = cart.find((data) => data.id === productId);

    return product;
  };

  // Change quantity of cart items
  const changeQuantity = (id, qty) => {
    dispatch({
      type: cartConstants.CHANGE_CART_QTY,
      payload: {
        id: id,
        qty: qty,
      },
    });
    addToCart(id);
  };

  const handleQuantityChange = (e, product) => {
    let qty = Number(e.value);
    let productId = Number(e.id);

    // Update quantity
    changeQuantity(productId, qty);
  };

  return (
    <div className="card m-0 p-0 ml-3">
      {searchTerm || brand || category ? (
        <div className="row  mx-0 overflow-auto my-0">
          {Array.isArray(products) &&
            products.map((product) => (
              <div className="card mx-1 order-product-card m-1">
                <div>
                  <Image
                    src={product?.image}
                    className="p-2 order-product-card-image mx-auto"
                  />

                  <span className="px-1 order-product-brand-name">
                    {product?.brand}
                  </span>

                  <div
                    className="px-1 text-truncate font-12"
                    title={product?.name}
                  >
                    {product?.name}
                  </div>
                  <div className="d-flex ">
                    <div className="px-1 font-12" title={product?.size}>
                      {product?.size}
                    </div>
                    <div className=" font-12" title={product?.unit}>
                      {product?.unit}
                    </div>
                  </div>
                  {product?.sale_price ? (
                    <div className="px-1 font-12">
                      <strong>₹{product?.sale_price}</strong>
                    </div>
                  ) : (
                    <div className="px-1 font-12">
                      <br />
                    </div>
                  )}

                  <div className=" bg-white">
                    {!getProduct(product.id) ? (
                      <button
                        className=" btn btn-outline-dark w-75 ml-4"
                        style={{ fontSize: 10 }}
                        onClick={() => {
                          dispatch({
                            type: cartConstants.ADD_TO_CART,
                            payload: {
                              id: product.id,
                              name: product.name,
                              image: product.image,
                              amount: product.sale_price,
                              size: product.size,
                              unit: product.unit,
                              qty: 1,
                            },
                          });
                          addToCart(product.id);
                        }}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="cart-item-button justify-content-center">
                        <QuantityButtons
                          handleQuantityChange={handleQuantityChange}
                          changeQuantity={changeQuantity}
                          productId={product.id}
                          quantity={getProduct(product.id)?.qty}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center">
          <NoRecordsFound
            showMessage={true}
            hideCard={true}
            message="Search to view the products "
          />{" "}
        </div>
      )}
    </div>
  );
};

export default Product;
