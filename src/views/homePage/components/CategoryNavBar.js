import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import EcommService from "../../../services/EcommService";

const CategoryNavBar = (props) => {
  let { history } = props;
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategorys();
  }, []);

  const getCategorys = async () => {
    let params = {
      baseUrl: window.location.origin,
    };
    let data = await EcommService.category(params);
    setCategory(data && data?.data);
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="white">
        <Container>
          <Nav className="me-auto catogory-nav-links">
            {category &&
              category.length > 0 &&
              category.map((data) => (
                <Link className="nav-link" to={`/category/${data?.name}`}>
                  {data?.name}
                </Link>
              ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default CategoryNavBar;
