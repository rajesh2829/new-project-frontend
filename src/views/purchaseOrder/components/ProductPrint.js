import React, { useRef } from "react";
import Button from "../../../components/Button";
import ReactToPrint from "react-to-print";
import "../style.scss";
import Currency from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";

export default function PrintComponent(props) {
  let componentRef = useRef();

  const {
    productDetail,
    vendorName,
    purchaseOrderDate,
    companyName,
    purchaseOrderNumber,
    companyDetail,
    vendorAddress,
    date,
    deliveryAddress,
    billingAddress,
  } = props;

  return (
    <>
      <div id="print_component">
        <ReactToPrint
          trigger={() => <Button label="Print" />}
          content={() => componentRef}
          documentTitle={`${companyName}-PO# ${purchaseOrderNumber}-${vendorName}`}
        />

        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={(el) => (componentRef = el)}
            productDetail={productDetail}
            vendorName={vendorName}
            purchaseOrderDate={purchaseOrderDate}
            companyName={companyName}
            companyDetail={companyDetail}
            purchaseOrderNumber={purchaseOrderNumber}
            vendorAddress={vendorAddress}
            date={date}
            deliveryAddress={deliveryAddress}
            billingAddress={billingAddress}
          />
        </div>
      </div>
    </>
  );
}

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }

  getMrp = (mrp, salePrice) => {
    if (mrp) {
      if (mrp == salePrice) {
        return "";
      } else return mrp;
    }
  };

  render() {
    return (
      <div className="m-2">
        <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
          <div class="card-body">
            <div class="row mb-4">
              {this.props.deliveryAddress && (
                <div class="col-sm-6">
                  <h3 class="text-dark mb-1">{this.props.companyName}</h3>
                  <div>{this.props.billingAddress?.name}</div>
                  <div>
                    {this.props.billingAddress?.address1}
                    {", "} {this.props.billingAddress?.address2}
                  </div>
                  <div>
                    {this.props.billingAddress?.city}
                    {", "}
                    {this.props.billingAddress?.state && (
                      <>
                        {this.props.billingAddress?.state}
                        {", "}
                      </>
                    )}
                    {this.props.billingAddress?.pin_code}
                  </div>
                  <div>{this.props.billingAddress?.country}</div>
                  <div> GST:{this.props.billingAddress?.gst_number}</div>
                </div>
              )}

              <div class="float-right mx-3">
                {" "}
                <h3 class="mb-0 text-danger text-bold ">
                  PURCHASE ORDER # {this.props.purchaseOrderNumber}
                </h3>
                Date:{DateTime.getDate(this.props.date)}
              </div>
            </div>
            <div class="row mb-4">
              {this.props.vendorAddress
                ? this.props.vendorAddress.map((item) => (
                    <div class="col-sm-6">
                      <h5 class="mb-3  text-center text-white bg-primary">
                        VENDOR
                      </h5>

                      <div>{item?.title}</div>
                      <div>{item?.name}</div>

                      <div>
                        {item?.address1}
                        {", "} {item?.address2}
                      </div>
                      <div>
                        {item?.city}
                        {", "}
                        {item?.state && (
                          <>
                            {item?.state}
                            {", "}
                          </>
                        )}
                        {item?.pin_code}
                      </div>
                      <div>{item?.country}</div>
                      <div> GST:{item?.gst_number}</div>
                    </div>
                  ))
                : ""}
              {this.props.deliveryAddress && (
                <div class="col-sm-6 ">
                  <h5 class="mb-3 text-center text-white bg-primary">
                    SHIP TO
                  </h5>
                  <h3 class="text-dark mb-1"></h3>
                  <div>{this.props.deliveryAddress?.title}</div>
                  <div>{this.props.deliveryAddress?.name}</div>
                  <div>
                    {this.props.deliveryAddress?.address1}
                    {", "} {this.props.deliveryAddress?.address2}
                  </div>
                  <div>
                    {this.props.deliveryAddress?.city}
                    {", "}
                    {this.props.deliveryAddress?.state && (
                      <>
                        {this.props.deliveryAddress?.state}
                        {", "}
                      </>
                    )}
                    {this.props.deliveryAddress?.pin_code}
                  </div>
                  <div>{this.props.deliveryAddress?.country}</div>
                  <div> GST:{this.props.deliveryAddress?.gst_number}</div>
                </div>
              )}
            </div>
            <div class="table-responsive-sm">
              <table className="small table table-bordered ">
                <thead>
                  <tr className="text-center">
                    <th>SL.NO#</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.productDetail
                    ? this.props.productDetail.map((item) => (
                        <tr>
                          <td className="counterCell text-center"></td>
                          <td className="d-flex m-0 pb-1">
                            <img
                              src={item.productImage}
                              height="30px"
                              width="30px"
                              className="mt-2 mx-3"
                            />
                            {item.product_name && (
                              <div className="d-table-cell align-middle">
                                {item.brandName && (
                                  <div className="d-table-cell align-middle">
                                    {item.brandName && (
                                      <small className="font-weight-bold">
                                        {`${
                                          item.brandName ? item.brandName : " "
                                        }`}
                                      </small>
                                    )}
                                  </div>
                                )}
                                {item.product_name && (
                                  <small>
                                    {item.product_name}
                                    {`${
                                      item.size ? "," + " " + item.size : " "
                                    }`}
                                    {`${item.unit ? " " + item.unit : " "}`}
                                  </small>
                                )}
                                <br />
                                {item.mrp && (
                                  <small>
                                    {`${
                                      item.mrp
                                        ? Currency.Format(parseFloat(item.mrp))
                                        : " "
                                    }`}
                                  </small>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="text-center">
                            {item && (item.quantity ? item.quantity : "")}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
