
// Components
import Text from "../../../components/Text";
import Number from "../../../components/Number";
import Form from "../../../components/Form";
import FeatureImage from "../../../components/Image";
import CancelButton from "../../../components/CancelButton";
import HorizontalSpace from "../../../components/HorizontalSpace";

const StoreProductForm = ({ storeProductData, initialValues, history }) => {

  return (
    <>
      <div clsssName="card-body w-100">
        {/* Form Section */}
        <>
          <Form
            enableReinitialize={true}
            initialValues={{
              ...initialValues,
              name: storeProductData.productName,
              quantity: storeProductData.quantity,
              max_quantity: storeProductData.max_quantity,
              min_quantity: storeProductData.min_quantity,
              sale_price: storeProductData?.productDetail?.sale_price,
              price: storeProductData.price,
            }}
          >
            <div className="card bg-white mt-3">
              <div className="card-body">
                <div className=" justify-content-between row">
                  <div className="col-sm-6">
                    <Text disabled={true} name="name" label="Name" />
                    <Number disabled={true} name="quantity" label="Quantity" />
                    <Number
                      disabled={true}
                      name="min_quantity"
                      label="Min Quantity"
                    />
                    <Number
                      disabled={true}
                      name="max_quantity"
                      label="Max Quantity"
                    />
                    <Number
                      disabled={true}
                      name="sale_price"
                      label="Selling Price"
                    />

                    <HorizontalSpace>
                      <CancelButton
                        onClick={(e) => {
                          history.goBack();
                        }}
                      />
                    </HorizontalSpace>
                  </div>
                  <div className="col-lg-4 ">
                    <FeatureImage
                      src={storeProductData?.image}
                      alt="Feature product image"
                      size={"large"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </>
      </div>
    </>
  );
};
export default StoreProductForm;
