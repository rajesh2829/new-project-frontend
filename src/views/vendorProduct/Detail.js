import React from "react";
import { toast } from "react-toastify";

// Service
import shopifyService, { bulkUpdateCreateInProducts } from "../../services/ShopifyService";

// Components
import DeleteConfirmationModel from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import DeleteButton from "../../components/DeleteButton";
import SupplierProductMediaList from "./components/SupplierProductMediaList"
import Spinner from "../../components/Spinner";
import BreadCrumb from "../../components/Breadcrumb";
import Form from "../../components/Form";
import Submit from "../../components/Submit";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import Number from "../../components/Number";
import Select from "../../components/Select";
import Url from "../../components/Url";

// Helper
import { fromArray } from "../../lib/Helper";

// lib
import Customer from "../../helpers/Customer";

// Constants
import {
  PRODUCT_STATUS_EXCLUDED,
  PRODUCT_STATUS_EXPORTED,
  PRODUCT_STATUS_NEW
} from "../../lib/Products";
import Product from "../../components/Product";
import Vendor from "../../components/Vendor";
import {
  SYNC_NAME_EXPORT_TO_MASTER,
  SYNC_OBJECT_NAME_VENDOR_PRODUCT,
  SYNC_STATUS_IN_PROGRESS,
  SYNC_STATUS_PENDING,
  SYNC_NAME_SYNC_FROM_VENDOR_URL,
} from "../../lib/Sync";
import syncService from "../../services/SyncService";
import Currency from "../../lib/Currency";
import { HttpStatus } from "../../helpers/HttpStatus";
import BrandSelect from "../../components/BrandSelect";
import CategorySelect from "../../components/CategorySelect";

class SupplierProductDetail extends React.Component {
  state = {
    productDetails: {},
    isLoading: false,
    productStatus: [
      {
        value: PRODUCT_STATUS_NEW,
        label: PRODUCT_STATUS_NEW
      },
      {
        value: PRODUCT_STATUS_EXPORTED,
        label: PRODUCT_STATUS_EXPORTED
      },
      {
        value: PRODUCT_STATUS_EXCLUDED,
        label: PRODUCT_STATUS_EXCLUDED
      }
    ],
    addImageModalToggle: false,
    editImageModalToggle: false,
    imageRowDetails: [],
    deleteProductModelToggle: false,
    submitResponse: false,
    productId: ""
  };

  currentProductId = this.props.match.params.id;

  componentDidMount() {
    this.getProductDetails();
  }

  // Get product Details
  getProductDetails = async () => {
    try {

      const productDetails = await service.getVendorProductDetailsById(
        this.currentProductId
      );
      this.setState({ productDetails, editImage: false });
      this.setState({ productId: productDetails.product_id });
    } catch (err) {

      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Handle product form submit
  _handleSubmit = async values => {
    const { submitResponse } = this.state;
    const newValues = Object.assign({}, values);
    newValues.supplier = newValues?.supplier?.value;
    newValues.status =
      typeof newValues.status === "object"
        ? newValues.status.value
        : newValues.status;

    newValues.vendorId =
      typeof newValues.vendor === "object"
        ? newValues.vendor.value
        : newValues.vendor;

    newValues.brandId =
      typeof newValues.brandName === "object"
        ? newValues.brandName.value
        : newValues.brandName;

    newValues.categoryId =
      typeof newValues.category === "object"
        ? newValues.category.value
        : newValues.category;

    newValues.productId =
      typeof newValues.productId === "object"
        ? newValues.productId.value
        : newValues.productId;

    newValues.productTagType = fromArray(values.productTag);

    try {
      const { submitResponse } = this.state;
      this.setState({ submitResponse: !submitResponse });
      const response = await service.updateVendorProductDetailsById(
        this.currentProductId,
        newValues
      );
      this.setState({ submitResponse: false });
      toast.success(response.message);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
      this.setState({ submitResponse: false });
    }
  };

  // Product delete action handler
  handleProductDelete = async () => {
    try {
      const data = await service.deleteVendorProductById(this.currentProductId);
      toast.success(data.message);

      setTimeout(() => (window.location = "/vendor/products"), HttpStatus.BAD_REQUEST);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Add product image modal handler
  _handleDeleteProductModal = () => {
    const { deleteProductModelToggle } = this.state;
    this.setState({ deleteProductModelToggle: !deleteProductModelToggle });
  };

  // Export
  _createInProducts = async ids => {
    try {
      const response = await bulkUpdateCreateInProducts({ ids: [ids] });
      toast.success(response.message);
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  handleExportToProduct = async (id) => {
    let data = {
      status: SYNC_STATUS_IN_PROGRESS,
      objectName: SYNC_OBJECT_NAME_VENDOR_PRODUCT,
      name: SYNC_NAME_EXPORT_TO_MASTER,
      objectIds: [id]
    }
    await syncService.bulkUpdateSync(data);
    toast.success("Exporting Started Successfully")
    shopifyService.bulkUpdateCreateInProducts({ ids: [id] }, this.getProductDetails);
  }

  handleSyncToProduct = async (id) => {
    let data = {
      status: SYNC_STATUS_IN_PROGRESS,
      name: SYNC_NAME_SYNC_FROM_VENDOR_URL,
      objectName: SYNC_OBJECT_NAME_VENDOR_PRODUCT,
      objectIds: [id]
    }
    toast.success("Sync started successfully")
    await syncService.bulkUpdateSync(data);
    await shopifyService.bulkUpdateCreateInProducts({ ids: [id] });
  }

  render() {
    const {
      productDetails,
      isLoading,
      productStatus,
      submitResponse,
      productId
    } = this.state;

    /*eslint-disable */
    const id = productDetails.id;
    const status = productDetails.status;
    const productImage = productDetails.images;
    const masterProductId = productDetails.product_id;
    const ProductName = productDetails.name;

    // Form initial values
    const initialValues = {
      status,
      url: productDetails.vendor_url,
      productName: productDetails.name,
      description: productDetails.description,
      price: Currency.Get(productDetails.price),
      quantity: productDetails.quantity,
      salePrice: Currency.Get(productDetails.sale_price),
      barcode: productDetails.barcode,
    };

    if (isLoading) {
      return <Spinner />;
    }

    // Bread crumb list
    const breadcrumbList = [
      { label: "Home", link: "/locationDashboard" },
      {
        label: "Vendor Products",
        link: "/vendor/products",
      },
      {
        label: Customer.GetDisplayName(productDetails?.name),
        link: "",
      },
    ];


    return (
      <>
        <div>
          {/* Bread Crumb section */}
          <BreadCrumb list={breadcrumbList} />
          <div className="row d-flex">
            <div className="col-6">
              <PageTitle className="text-nowrap" label={productDetails.name} />
            </div>
          </div>
          <Form enableReinitialize initialValues={initialValues} onSubmit={value => this._handleSubmit(value)}>
            <div className="d-flex flex-wrap">
              <div>
                <PageTitle title={productDetails.name} />
              </div>
              <div className="ml-auto mb-2 mr-0">
                <DeleteButton className="mr-2" onClick={this._handleDeleteProductModal} />
                {id ? (
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => this.handleExportToProduct(this.currentProductId)}
                  >
                    Export To Master
                  </button>
                ) : (
                  ""
                )}

                <div className="dropdown-wrapper select-dropdown">
                  {id ? (
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      onClick={() => this.handleSyncToProduct(this.currentProductId)}
                    >
                      Sync From Supplier Url
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* Delete product modal */}
              <DeleteConfirmationModel
                isOpen={this.state.deleteProductModelToggle}
                toggle={this._handleDeleteProductModal}
                deleteFunction={this.handleProductDelete}
                label="product"
              />
            </div>
            {/* Product edit form */}
            <div className="card border-0 p-3">
              {/* Button section */}
              <div className="row">
                {/* Product form fields */}
                <div className="col-lg-6">
                  <Select
                    label="Status"
                    name="status"
                    placeholder="Select Status"
                    defaultValue={
                      status
                        ? {
                          label: status,
                          value: status
                        }
                        : ""
                    }
                    options={productStatus}
                  />
                  <Vendor
                    label="Vendor"
                    selectedVendorId={productDetails.vendor_id}
                  />
                  <div className="row">
                    <div className="col-10 col-lg-11 col-md-11 col-sm-11 pr-md-0">
                      {/* <Text label="Supplier URL" name="url" /> */}
                      <Url
                        name="url"
                        label="Supplier Url"
                      />
                    </div>
                    <div className="col-2 col-lg-1 col-md-1 col-sm-1 my-auto">
                      <a href={productDetails.vendor_url} className="text-dark" target="_blank"><i class="fa fa-lg fa-external-link-alt"></i></a>
                    </div>
                  </div>
                  <div className="row">
                    <div className={`${masterProductId ? 'col-11 pr-md-0' : 'col-12'}`}>
                      <Product label="Master Product" name="productId" placeholder="Select Master Product" selectedProductId={productDetails.product_id} />
                    </div>
                    {masterProductId ? <div className="col-1 my-auto">
                      <a href={`${window.location.origin}/product/${productId}`} className="text-dark" target="_blank"><i class="fa fa-lg fa-external-link-alt"></i></a>
                    </div> : ""}

                  </div>
                  <Text label="Barcode" name="barcode" />
                  <Text label="Name" name="productName" />
                  <BrandSelect label="Brand" name="brandName" />
                  <CategorySelect label="Category" />
                  <Number label="Price" name="price" />
                  <Number label="Sale Price" name="salePrice" />
                  <Number label="Quantity" name="quantity" />
                  <TextArea label="Description" name="description" />

                  {submitResponse ? <Submit label="Saving" disabled="disabled" /> : <Submit label="Save" />}
                </div>
                {/* Image list */}
                <div className="col-lg-6">
                  <SupplierProductMediaList productDetails={productDetails} />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </>
    );
  }
}

export default SupplierProductDetail;
