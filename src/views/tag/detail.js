import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//Configs
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";

// Components
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { endpoints } from "../../api/endPoints";
import BreadCrumb from "../../components/Breadcrumb";
import Customer from "../../helpers/Customer";
import CancelButton from "../../components/CancelButton";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";

// Action
import {
  deleteProductTag,
  updateProductTag,
} from "../../actions/storeProductTag";

const ProductTagsDetail = (props) => {
  const { history } = props;
  const [productTagData, setproductTagData] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getProductTagDetail();
  }, [props]);

  //Get Product tag Detail
  const getProductTagDetail = () => {
    let id = props.match.params.tab;
    return apiClient
      .get(`${endpoints().tagApi}/${id}`)
      .then((response) => {
        const data = response.data;
        setproductTagData(data);
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  };

  // Status Options
  const statusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "InActive",
      label: "InActive",
    },
  ];

  // type Options
  const typeOptions = [
    {
      value: "Product",
      label: "Product",
    },
    {
      value: "Customer",
      label: "Customer",
    },
    {
      value: "Order",
      label: "Order",
    },
  ];

  // Handle Product Status Change
  const handleStatusChange = (selectStatus) => {
    if (selectStatus && selectStatus.value) {
      setStatus(selectStatus.value);
    }
  };

  const handleTypeChange = (selecttype) => {
    if (selecttype && selecttype.value) {
      setStatus(selecttype.value);
    }
  };

  /**
   * Delete Product
   *
   * @param data
   */
  const productTagDelete = (id) => {
    dispatch(deleteProductTag(id, {}));
    history.push("/tags");
  };

  //Handle Update Product Details
  const handleUpdate = (id, values) => {
    const data = new FormData();
    data.append("name", values && values.name ? values.name : "");
    data.append("status", values && values.status ? values.status.value : "");
    data.append("type", values && values.type ? values.type.value : "");
    dispatch(updateProductTag(id, data, {}));
  };

  const initialValues = {
    name: productTagData?.data?.name,
    status: {
      label: productTagData?.data?.status,
      value: productTagData?.data?.status,
    },
    type: productTagData?.data?.type
      ? {
        label: productTagData?.data?.type,
        value: productTagData?.data?.type,
      }
      : "",
  };

  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard/" },
    {
      label: "Tags",
      link: "/tags",
    },
    {
      label: Customer.GetDisplayName(productTagData?.data?.name),
      link: "",
    },
  ];
  
  return (
    <>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          let id = props.match.params.tab;
          handleUpdate(id, values);
        }}
      >
        <DeleteModal
          id={productTagData?.data?.id}
          label={productTagData?.data?.name}
          isOpen={deleteModal}
          toggle={() => {
            setDeleteModal(false);
          }}
          title="Delete Product "
          deleteFunction={productTagDelete}
        />
        {/* /.page-heading */}
        <BreadCrumb list={breadcrumbList} />
        {/* Page Title */}
        <PageTitle
          label={Customer.GetDisplayName(productTagData?.data?.name)}
          DeleteButtonLabel="Delete"
          deletebuttonHandler={() => {
            setDeleteModal(true);
          }}
        />
        <div className="card bg-white mt-3 col-lg-12">
          <div className="card-body">
            <div className=" field-wrapper row">
              <div className="col-lg-6">
                <Text name="name" label="Name" required={true} />
                <Select
                  fullWidth={true}
                  label="Type"
                  name="type"
                  options={typeOptions}
                  handleChange={(e) => handleTypeChange(e)}
                  required={true}
                />
                <Select
                  label="Status"
                  name="status"
                  options={statusOptions}
                  handleChange={(e) => handleStatusChange(e)}
                  required={true}
                />
              </div>
            </div>
            <SaveButton label="Save" />
            <CancelButton onClick={() => history.push("/tags")} />
          </div>
        </div>
      </Form>
    </>
  );
};
export default ProductTagsDetail;
