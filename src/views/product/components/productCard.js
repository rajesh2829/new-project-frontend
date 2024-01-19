import PropTypes from "prop-types";
import React from "react";
import Currency from "../../../lib/Currency";
import FeatureImage from "../../../components/Image";
import Number from "../../../lib/Number";
import "../product.scss";
import { Status } from "../../../helpers/Product";
import { Link } from "react-router-dom";

class AvatarCard extends React.Component {
  render() {
    const {
      productName,
      brandName,
      size,
      unit,
      salePrice,
      mrp,
      id,
      url,
      packSize,
      status,
      brand_id,
      disableLink,
      quantity,
      disableLinks,
      showHSNCode,
      hsn_code,
      price
    } = this.props;

    const names = [];

    if (productName) {
      names.push(productName);
    }

    const getMrp = (mrp) => {
      if (mrp) {
        if (Number.Float(mrp) == Number.Float(salePrice)) {
          return "";
        } else return mrp;
      }
    };

    const name = names.join(" ");

    return (
      <div style={{ display: "table" }}>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 25,
            width: "100px",
            height: "80px",
          }}
        >
          <FeatureImage
            size="imageSize"
            src={url}
            className="img-fluid p-1 bg-white border rounded"
            minWidth="70px"
            maxHeight="80px"
          />
        </div>
        {productName && (
          <div className="d-table-cell align-middle text-primary">
            {brandName && (
              <div
                className="d-table-cell align-middle  text-primary"
                style={{ color: "#5A5A5A" }}
              >
                {brandName && (
                  <div className="d-inline-flex">
                    <Link target="_blank" to={`/brands/${brand_id}`} style={{ pointerEvents: disableLink ? 'none' : "" }}>
                      <h6 className="font-weight-bold">
                        {`${brandName ? brandName : " "}`}
                      </h6>
                    </Link>
                    {status === Status.INACTIVE ? (
                      <h6 className="font-weight-bold mx-2 text-danger">
                        {`(${status})`}
                      </h6>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            )}
            <Link to={`/product/${id}`} style={{ pointerEvents: disableLinks ? 'none' : "" }}>
              {productName && (
                <h6 className="p-0 m-0">
                  {productName}
                  <span className="text-primary" style={{ color: "#5A5A5A" }}>
                    {`${size ? "," + " " + size : " "}`}
                    {`${unit ? " " + unit : " "}`}{" "}
                    {packSize
                      ? `(Pack Size: ${packSize ? packSize : " "})`
                      : ""}
                  </span>
                </h6>
              )}
              {showHSNCode && (
                <div className="text-secondary text-dark">
                  {`${hsn_code ? `HSN Code: ${hsn_code}` : ""}`}
                </div>
              )}
              {mrp && getMrp(mrp) && (
                <div
                  className="d-table-cell  text-primary align-middle"
                  style={{ color: "#5A5A5A" }}
                >
                  {mrp && salePrice ? (
                    <h6>
                      <del>
                        {" "}
                        {`${mrp ? Currency.Format(parseFloat(mrp)) + "," : " "
                          }`}
                        &nbsp;
                      </del>
                    </h6>
                  ) : (
                    <h6>
                      {
                        mrp ? Currency.Format(parseFloat(mrp)) + "," : " "
                      }
                      &nbsp;
                    </h6>
                  )}
                </div>
              )}
              {salePrice && (
                <div className="d-table-cell text-primary align-middle  fw-bold">
                  {salePrice && (
                    <h6>
                      {`${salePrice ? Currency.Format(parseFloat(salePrice)) : " "
                        }`}
                    </h6>
                  )}
                </div>
              )}
            </Link>
            {quantity && <h6 style={{ color: "gray" }}>{quantity} x {price}</h6>}
          </div>
        )}
      </div>
    );
  }
}

AvatarCard.propTypes = {
  url: PropTypes.string,
  defaultUrl: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  customSize: PropTypes.number,
};

export default AvatarCard;
