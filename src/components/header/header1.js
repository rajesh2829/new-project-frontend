import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Card } from "react-bootstrap";
import MyContext from "../../context/myContext";
import ProductCard from "../../views/product/components/productCard";
import Button from "../Button";

const Header1 = (props) => {
  let { logo, className } = props;

  const [showMessages, setShowMessages] = useState(false);
  const { cardValue } = useContext(MyContext);

  let cartValue =
    cardValue &&
    cardValue.length > 0 &&
    cardValue.filter((card) => parseInt(card.quantity) !== 0) || [];

  const toggleMessages = () => {
    setShowMessages((prevShow) => !prevShow);
  };

  return (
    <Navbar expand="lg" className={className}>
      <Container>
        <Navbar.Brand href="/home">
          <img src={logo} width="50px" alt="Logo" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <div
            className="position-relative"
            onMouseEnter={toggleMessages}
            onMouseLeave={toggleMessages}
            style={{ zIndex: 1000, cursor: "pointer" }}
          >
            <FontAwesomeIcon
              style={{ fontSize: "xx-large" }}
              icon={faCartShopping}
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger">
              {cartValue && cartValue.length > 0 ? cartValue.length : 0}
            </span>
            <div
              className={`position-absolute card end-0 p-2 ${
                showMessages ? "visible" : "invisible"
              }`}
              style={{
                zIndex: 1001,
                transition: "opacity 0.3s, transform 0.3s",
                opacity: showMessages ? 1 : 0,
                transform: showMessages ? "translateY(0)" : "translateY(-10px)",
                right: "50%",
                width: "1500%",
              }}
            >
              <div className="card-body">
                {cartValue &&
                  cartValue.length > 0 &&
                  cartValue.map((data, index) => (
                    <div className="card my-1 p-1">
                      <ProductCard
                        key={index}
                        productImageIcon
                        square
                        productName={data.product_name}
                        brandName={data.brand_name}
                        url={data?.url}
                        quantity={data?.quantity}
                        price={data?.price}
                        disableLink
                      />
                    </div>
                  ))}
                {cartValue && cartValue.length > 0 && (
                  <>
                  <div className="d-flex justify-content-end">
                    <div className="card d-inline-block p-2" style={{minWidth:"205px"}}>
                      <span>Total Amount: Rs </span>
                      <span>
                        {cartValue &&
                          cartValue.length > 0 &&
                          cartValue.reduce(
                            (total, item) =>
                              total + item?.quantity * item?.price,
                            0
                          )}
                      </span>
                    </div>
                  </div>
                    <div className="d-flex justify-content-end">
                      <Button label="View Order & Check out"/>
                  </div>
                  </>
                )}
                {cartValue && !cartValue.length > 0 && (
                  <div>
                    <span>Your Order is empty. Start shopping now!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header1;
