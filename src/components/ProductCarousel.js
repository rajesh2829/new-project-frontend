import React, { useState } from "react";
import ProductCard from "./ProductPurchaseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ProductCarousel = (props) => {
  const { onChangeValue, cardList, onCardChange, cardValue } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cardList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="bg-light py-5">
        <h4 className="text-center text-primary font-weight-bold py-5">
          FEATURED PRODUCTS
        </h4>
        <h5 className="text-center text-secondary font-weight-bold mr-5 ml-5">
          Shop for packaged drinking water online with multiple options.
          Bisleri, Filtered water, Dispenser and Dispenser Stand.
        </h5>
        <div className="slider-container">
          {
            <div
              className="ecomm-arrow arrow-left"
              style={{
                zIndex: "1",
                backgroundColor: "var(--page-product-arrow-bg-color)",
                padding: "initial",
              }}
              onClick={prevSlide}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          }
          <div
            className="card-slider"
            style={{
              transform: `translateX(-${currentIndex * 26}%)`,
              marginLeft: "31px",
            }}
          >
            {cardList &&
              cardList.map((data, index) => (
                <ProductCard
                  key={index}
                  productName={data?.name}
                  price={data?.sale_price}
                  url={data?.image}
                  brand={data?.brand}
                  onChangeValue={onChangeValue}
                  index={index}
                  cardValue={cardValue}
                  onCardChange={onCardChange}
                />
              ))}
          </div>
          {
            <div
              className="ecomm-arrow arrow-right"
              style={{ backgroundColor: "var(--page-product-arrow-bg-color)", padding: "initial" }}
              onClick={nextSlide}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
