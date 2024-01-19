import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import ProductService from "../../../services/ProductService";
import ProductPurchaseCard from "../../../components/ProductPurchaseCard";
import Spinner from "../../../components/Spinner";

const ProductList = (props) => {

  let { history } = props;

  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardValue, setCardValue] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  
  const onChangeValue = ({},value, index, data, field = "quantity") => {
    const updatedCards = [...cardValue];
    const existingIndex =
      updatedCards &&
      updatedCards.findIndex((card) => card.index == index);
    if (existingIndex !== -1) {
      updatedCards[existingIndex][field] = value;
      setIsLoading(true);
      setCardValue(updatedCards);
      props.contextState && props.contextState({ cardValue: updatedCards });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setCardValue([...cardValue, data]);
      props.contextState && props.contextState({ cardValue: [...cardValue, data] });
      setIsLoading(false);
    }
  };

  const onCardChange = (value, index, data, field = "quantity") => {
    const updatedCards = [...cardValue];
    const existingIndex =
      updatedCards &&
      updatedCards.findIndex((card) => card.index == index);
    if (existingIndex !== -1) {
      updatedCards[existingIndex][field] = value;
      setIsLoading(true);
      setCardValue(updatedCards);
      props.contextState && props.contextState({ cardValue: updatedCards });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setCardValue([...cardValue, data]);
      props.contextState && props.contextState({ cardValue: [...cardValue, data] });
      setIsLoading(false);
    }
  };
  
  const getProducts = async () => {
    let params = {
      baseUrl: window.location.origin,
      category:
        props &&
        props?.match &&
        props?.match?.params &&
        props?.match?.params?.name,
    };
    let data = await ProductService.list(params);
    setCardList(data && data?.data);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="bg-white">
        <PageTitle label="Products" className="ml-3" />
      </div>
      <div className="row">
        {cardList &&
          cardList.map((data, index) => (
            <ProductPurchaseCard
              key={index}
              productName={data?.name}
              price={data?.sale_price}
              url={data?.image}
              brand={data?.brand}
              onChangeValue={onChangeValue}
              index={index}
              cardValue={cardValue}
              onCardChange={onCardChange}
              isLoading={isLoading}
            />
          ))}
      </div>
    </>
  );
};
export default ProductList;
