import React, { useState } from "react";
import AddButton from "./AddButton";
import NoImage from "../../src/views/ecomm/assets/img/resize-16926299612021107194imagenotavailable.png";
import Spinner from "./Spinner";

const ProductPurchaseCard = (props) => {
  let {
    history,
    productName,
    price,
    onChangeValue,
    index,
    onCardChange,
    url,
    brand,
    cardValue,
    isLoading
  } = props;

  const [qty, setQty] = useState(1);
  const [isAdd, setIsAdd] = useState(true);
  
  const onChange = () => {
    let data = {
      product_name: productName ? productName : "",
      price: price ? price : "",
      quantity: qty,
      index: index,
      url:url ? url : "",
      brand_name:brand ? brand : ""
    };
    onChangeValue && onChangeValue(data,qty,index,data,"quantity");
    setIsAdd(false);
  };

  const onChangeCountIncrease = () => {
    let data = {
      product_name: productName ? productName : "",
      price: price ? price : "",
      quantity: qty + 1,
      index: index,
      url:url ? url : "",
      brand_name:brand ? brand : ""
    };
    setQty((prviousQtyValue) => prviousQtyValue + 1);
    onCardChange && onCardChange(qty + 1, index, data, "quantity");
  };

  const onChangeCountDecrease = () => {
    let data = {
      product_name: productName ? productName : "",
      price: price ? price : "",
      quantity: qty !== 1 ? qty - 1 : 1,
      index: index,
      url:url ? url : "",
      brand_name:brand ? brand : ""
    };
    setIsAdd(qty - 1 == 0 ? true : false);
    setQty((prviousQtyValue) =>
      prviousQtyValue !== 1 ? prviousQtyValue - 1 : 1
    );
    onCardChange &&
      onCardChange(qty !== 1 ? qty - 1 : 0, index, data, "quantity");
  };

  const onInputChange = (currentQty) => {
    if (currentQty) {
      let data = {
        product_name: productName ? productName : "",
        price: price ? price : "",
        quantity: currentQty !== 0 ? currentQty : 1,
        index: index,
        url:url ? url : "",
        brand_name:brand ? brand : ""
      };
      setQty(currentQty == 0 ? 1 : currentQty);
      onCardChange && onCardChange(currentQty, index, data, "quantity");
      setIsAdd(currentQty == 0 ? true : false);
    }
  };
  
  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <div className="col-3 col-md-4 col-sm-3 col-lg-3 col-xl-4 border-5 py-3">
        <div
          className="card shadow"
          style={{ backgroundColor: url ? "" : "#f6f6f6" }}
        >
          <div className="card-img img-fluid mt-3">
            <img src={url ? url : NoImage} alt="NoImage" />
          </div>
          <div className="card-body" style={{ backgroundColor: "#eee" }}>
            <div className="card-title">
              {brand && (
                <h5
                  style={{
                    color: "#999999",
                    fontFamily: "ProximaNovaA-Regular",
                  }}
                >
                  {brand}
                </h5>
              )}
              {productName && (
                <h5 style={{ fontFamily: "ProximaNovaA-Regular" }}>
                  {productName}
                </h5>
              )}
              {price && <span>Price: ₹{price}</span>}
              <div className="card-text">
                {!isAdd && (
                  <div class=" mb-3 d-flex justify-content-center mt-2">
                    <span
                      class="input-group-text cursor-pointer"
                      onClick={onChangeCountIncrease}
                    >
                      +
                    </span>
                    <input
                      type="text"
                      class="card-form-control text-center"
                      onChange={(e) => {
                        setQty(e?.target?.value);
                        onInputChange(e?.target?.value);
                      }}
                      value={qty}
                      style={{ minWidth: "50%" }}
                    />
                    <span
                      class="input-group-text cursor-pointer"
                      onClick={onChangeCountDecrease}
                    >
                      -
                    </span>
                  </div>
                )}

                {isAdd && (
                  <div class=" mb-3 d-flex justify-content-center mt-2">
                    <input
                      disabled
                      type="text"
                      class="card-form-control text-center bg-white"
                      onChange={(e) => {
                        setQty(e?.target?.value);
                      }}
                      value={qty}
                      style={{ minWidth: "50%" }}
                    />
                    <div
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        marginLeft: "10px",
                        marginTop: "5px",
                      }}
                    >
                      <AddButton label="Add" onClick={onChange} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPurchaseCard;
