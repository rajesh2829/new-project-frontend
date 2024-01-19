import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as BookMyWaterCanMedia from "../ecomm/helper/media";
import Banner1 from "../../components/Banner1";
import Form from "../../components/Form";
import Phone from "../../components/Phone";
import SaveButton from "../../components/SaveButton";
import Spinner from "../../components/Spinner";
import Text from "../../components/Text";
import EcommService from "../../services/EcommService";
import ProductCarousel from "../../components/ProductCarousel";
import SuccessModel from "../ecomm/components/SuccessModel";
import Toast from "../../components/Toast";
import ProductService from "../../services/ProductService";
import CategoryNavBar from "./components/CategoryNavBar";

const EcommHomePage = (props) => {
  let { history } = props;
  const [cardValue, setCardValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardList, setCardList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const initialValues = {
    name: "",
    address: "",
    mobile: "",
  };

  const getProducts = async () => {
    let params = {
      baseUrl: window.location.origin,
    };
    let data = await ProductService.list(params);
    setCardList(data && data?.data);
  };
  const onSubmit = async (values) => {
    let isCard =
      cardValue &&
      cardValue.length > 0 &&
      cardValue.filter((card) => parseInt(card.quantity) !== 0);
    if (isCard && isCard.length > 0) {
      let cardValues = cardValue.filter((card) => card.quantity !== 0);
      let data = new FormData();
      data.append("name", values && values?.name ? values?.name : "");
      data.append("address", values && values?.address ? values?.address : "");
      data.append("mobile", values && values?.mobile ? values?.mobile : "");
      data.append("product", cardValue && JSON.stringify(cardValues));
      dispatch(
        await EcommService.create(data, (res) => {
          if (res) {
            setIsLoading(true);
            setCardValue("");
            setIsLoading(false);
            toggle();
          }
        })
      );
    } else {
      Toast.error("Add product");
    }
  };

  const onChangeValue = (values) => {
    setCardValue([...cardValue, values]);
  };

  const onCardChange = (value, index, data, field = "quantity") => {
    const updatedCards = [...cardValue];
    const existingIndex =
      updatedCards &&
      updatedCards.findIndex((card) => card.index == data.index);
    if (existingIndex !== -1) {
      updatedCards[index][field] = value;
      setIsLoading(true);
      setCardValue(updatedCards);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setCardValue([...cardValue, data]);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <SuccessModel
        toggle={toggle}
        isOpen={isOpen}
        name="Your booking has been confirmed."
      />
      <CategoryNavBar/>
      <Banner1
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        history={history}
        manIcon={BookMyWaterCanMedia.HomeBanner}
      />
      <ProductCarousel
        cardList={cardList}
        onCardChange={onCardChange}
        onChangeValue={onChangeValue}
        cardValue={cardValue}
      />
      <div style={{ minHeight: "65vh" }}>
        <div
          className="card card-body"
          style={{ border: "none", borderRadius: "0" }}
        >
          <Form
            initialValues={initialValues}
            enableReinitialize
            onSubmit={onSubmit}
          >
            <Text label="Name" name="name" placeholder="Enter Name" required />
            <Text
              name="address"
              label="Address"
              placeholder="Enter Address"
              required
            />
            <Phone
              label="Mobile Number"
              name="mobile"
              placeholder="Enter Mobile Number"
              required
            />
            <SaveButton label="Order Now" />
          </Form>
        </div>
      </div>
    </>
  );
};
export default EcommHomePage;
