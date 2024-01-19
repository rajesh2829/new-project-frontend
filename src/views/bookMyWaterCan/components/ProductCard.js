import React, { useState } from "react";
import AddButton from "../../../components/AddButton";
import NoImage from "../../../assets/img/resize-16926299612021107194imagenotavailable.png";

const ProductCard = (props) => {
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
  } = props;
  const [count, setCount] = useState(0);
  const onChange = () => {
    if(cardValue[index]?.quantity > 0 ){
    let data = {
      product_name: productName ? productName : "",
      price: price ? price : "",
      quantity: count,
      index: index,
    };
    onChangeValue && onChangeValue(data);
  }
  };

  const onChangeCountIncrease = () => {
    let data = {
      product_name: productName ? productName : "",
      price: price ? price : "",
      quantity: count + 1,
      index: index,
    };
    setCount((prviousCountValue) => prviousCountValue + 1);
    onCardChange && onCardChange(count + 1, index, data,"quantity");
  };

  const onChangeCountDecrease = () => {
    let data = {
      product_name: productName ? productName : "",
      price: price ? price : "",
      quantity: count !== 0 ? count - 1 : 0,
      index: index,
    };
    setCount((prviousCountValue) =>
      prviousCountValue !== 0 ? prviousCountValue - 1 : 0
    );
    onCardChange && onCardChange(count !== 0 ? count - 1 : 0, index, data,"quantity");
  };

  let isIndex = cardValue && cardValue.length > 0 && cardValue.findIndex((card) => card.index == index) !== -1;

  return (
    <>
      <div className="col-12  col-sm-6 col-lg-4 col-xl-40 border-5 py-3">
        <div
          className="card shadow"
          style={{ backgroundColor: url ? "" : "#f6f6f6" }}
        >
          <div className="card-img img-fluid mt-3">
            <img src={url ? url : NoImage} alt="NoImage" />
          </div>
          <div className="card-body" style={{ backgroundColor: "#eee" }}>
            <div className="card-title">
              {brand && <h5>{brand}</h5>}
              {productName && <h5>{productName}</h5>}
              {price && <span>Price: ₹{price}</span>}
              <div className="card-text">
                <div class=" mb-3 d-flex justify-content-center mt-2">
                  <span
                    class="input-group-text"
                    onClick={onChangeCountIncrease}
                  >
                    +
                  </span>
                  <input
                    type="text"
                    class="card-form-control text-center"
                    onChange={(e) => {
                      setCount(e?.target?.value);
                    }}
                    value={count}
                    style={{ minWidth: "50%" }}
                  />
                  <span
                    class="input-group-text"
                    onClick={onChangeCountDecrease}
                  >
                    -
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <AddButton
                    label="Add"
                    onClick={onChange}
                    isDisabled={isIndex && cardValue && cardValue.length > 0 && cardValue[index]?.quantity !==0 ? true : false}
                    disableLabel={"Added"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
