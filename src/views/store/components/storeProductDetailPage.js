import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/Breadcrumb";
import PageTitle from "../../../components/PageTitle";

// ApiClient
import { apiClient } from "../../../apiClient";

// Configs
import { endpoints } from "../../../api/endPoints";
import "../../../views/product/product.scss";
import "../../../scss/_custom.scss";
import StoreProductForm from "./storeProductForm";

const ProductDetail = (props) => {

  // Product detail props
  const { history } = props;

  // State values

  const [storeProductData, setStoreProductData] = useState("");

  const [initialValues, setInitialValues] = useState([]);

  // Use Effect
  useEffect(() => {
    getProductDetail();
  }, [props]);

  //Get Product Detail
  const getProductDetail = async () => {
    const id = props.match.params.id;

    const initialValues = {};

    try {
      const response = await apiClient.get(`${endpoints().storeProductAPI}/${id}`);

      const data = response.data;

      setStoreProductData(() => data?.data);
      setSelectedStore(data.id);

      setInitialValues(initialValues);
    } catch (error) { }
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Product Detail",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="row col-12">
        <div className="col-6">
          <PageTitle label={storeProductData?.product_display_name}
          />
        </div>
      </div>
      <div>
        <StoreProductForm
          storeProductData={storeProductData}
          initialValues={initialValues}
          history={history}
        />
      </div>

    </>
  );
};
export default ProductDetail;
