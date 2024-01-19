import React, { useRef } from "react";
import { Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import Currency from "../../../lib/Currency";

const PrintPriceTag = ({ productData }) => {

  let componentRef = useRef();

  return (
    <>
      <div className="d-none">
        <ReactToPrint
          trigger={() => <Button id="print-price-tag" />}
          content={() => componentRef}
        />
        <ComponentToPrint
          ref={(el) => (componentRef = el)}
          productData={productData}
        />
      </div>
    </>
  );
};

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }

  getMrp = (mrp, salePrice) => {
    if (mrp) {
      if (mrp == salePrice) {
        return ""
      }
      else
        return mrp;
    }

  }

  render() {
    const { productData } = this.props;
    return (
      <div className="w-100 h-50 p-4 fs-3 d-flex flex-column justify-content-center">

        <div class="row">
          <div class="col-1">
            <span className="font-weight-bold">Name:</span>
          </div>

          <div class="col-11">
            <span className="font-weight-bold">{productData.product_display_name}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-1">
            <span className="font-weight-bold">Price:</span>
          </div>

          <div class="col-11">
            <span className="font-weight-bold">
              {productData.mrp && (
                <del>
                  {`${productData.mrp ? Currency.Format(parseFloat(productData.mrp)) + "," : " "}`}
                  &nbsp;
                </del>
              )}

              {productData.sale_price && (
                <span className="font-weight-bold">
                  {`${productData.sale_price ? Currency.Format(parseFloat(productData.sale_price)) : " "
                    }`}
                </span>
              )}
            </span>
          </div>
        </div>

        {productData?.barcode && (
          <div class="row">
            <div class="col-12 text-center">
              <QRCode
                id="qr-gen"
                value={productData?.barcode}
                size={70}
                level={"H"}
                includeMargin={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PrintPriceTag;
