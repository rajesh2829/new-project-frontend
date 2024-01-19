
import React, { useRef, useState, useEffect } from "react";
import Button from "../../../components/Button";
import ReactToPrint from "react-to-print";
import "../style.scss";
import Currency from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";

export default function PrintComponent(props) {
  let componentRef = useRef();
  const [firstHalfProduct, setFirstHalfProduct] = useState();
  const [secondHalfProduct, setSecondHalfProduct] = useState();
  const [splitCountArray, setSplitCountArray] = useState([]);

  const { productDetail, fromLocationName, toLocationName, transferDate } = props;

  useEffect(() => {
    getProductList();
  }, []);

  function splitArrayByLength(arr, splitLength) {
    const numSplits = Math.ceil(arr.length / splitLength);
    const result = [];
    for (let i = 0; i < numSplits; i++) {
      result.push(arr.slice(i * splitLength, (i + 1) * splitLength));
    }
    return result;
  }

  const getProductList = () => {
    try {
      let firstHalfProductList = new Array();
      let secondHalfProductList = new Array();
      let splitCountArray = new Array();

      if (productDetail && productDetail.length > 0) {

        let data = splitArrayByLength(productDetail, 17);

        for (let i = 0; i < data.length; i++) {
          splitCountArray.push(i);
          if (firstHalfProductList.length == secondHalfProductList.length) {
            firstHalfProductList.push(data[i]);
          } else if (firstHalfProductList.length != secondHalfProductList.length) {
            secondHalfProductList.push(data[i]);
          }
        }

        setSplitCountArray(splitCountArray);
        setFirstHalfProduct(firstHalfProductList);
        setSecondHalfProduct(secondHalfProductList);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div id="print_component">
        <ReactToPrint
          trigger={() => <Button label="Print" />}
          content={() => componentRef}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={(el) => (componentRef = el)}
            productList={productDetail}
            splitCountArray={splitCountArray}
            firstHalfProductList={firstHalfProduct}
            secondHalfProductList={secondHalfProduct}
            toLocationName={toLocationName}
            fromLocationName={fromLocationName}
            transferDate={transferDate}
          />
        </div>
      </div>
    </>
  );
}

const PrintContent = ({ tranferProduct }) => {
  const getMrp = (mrp, salePrice) => {
    if (mrp) {
      if (mrp == salePrice) {
        return ""
      }
      else
        return mrp;
    }

  }

  return (
    <tr>
      <td className="counterCell text-center"></td>
      <td className="d-flex m-0 p-0" height={"73px"}>
        <img src={tranferProduct.productImage} height="30px" width="30px" className="mt-2 mx-3" />
        {(tranferProduct.product_name) && (
          <div className="d-table-cell align-middle" >
            {(tranferProduct.brandName) && (
              <div className="d-table-cell align-middle" >
                {(tranferProduct.brandName) && (
                  <small className="font-weight-bold">
                    {`${tranferProduct.brandName ? tranferProduct.brandName : " "}`}
                  </small>
                )}
              </div>
            )}
            {(tranferProduct.product_name) && (
              <small>
                {tranferProduct.product_name}{`${tranferProduct.size ? "," + " " + tranferProduct.size : " "}`}{`${tranferProduct.unit ? " " + tranferProduct.unit : " "}`}
              </small>
            )}
            {tranferProduct.mrp && getMrp(tranferProduct.mrp, tranferProduct.salePrice) && (
              <div className="d-table-cell align-middle" >
                {(tranferProduct.mrp) && (
                  <small>
                    <del> {`${tranferProduct.mrp ? Currency.Format(parseFloat(tranferProduct.mrp)) + "," : " "}`}&nbsp;</del>
                  </small>
                )}
              </div>
            )}
            {(tranferProduct.salePrice) && (
              <div className="d-table-cell align-middle" >
                {(tranferProduct.salePrice) && (
                  <small>
                    {`${tranferProduct.salePrice ? Currency.Format(parseFloat(tranferProduct.salePrice)) : " "}`}
                  </small>
                )}
              </div>
            )}
          </div>
        )}
      </td>
      <td className="text-center">{tranferProduct.quantity}</td>
    </tr>
  )
}

class ComponentToPrint extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="m-2">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th className="text-center" colSpan={3}>Inventory Tranfer</th>
            </tr>
            <tr>
              <th>
                <div className="d-flex flex-row justify-content-between">
                  <label> From </label>
                  <label> {this.props.fromLocationName}</label>
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div className="d-flex flex-row justify-content-between">
                  <label> To </label>
                  <label> {this.props.toLocationName}</label>
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div className="d-flex flex-row justify-content-between">
                  <label> Date </label>
                  <label>{DateTime.getDateTimeByUserProfileTimezone(this.props.transferDate)}</label>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.splitCountArray.length > 0 ? this.props.splitCountArray.map((data) =>
              <div className="row">
                <div className="col-6 pr-0">
                  {this.props.firstHalfProductList && this.props.firstHalfProductList[data] && this.props.firstHalfProductList[data].length > 0 && (
                    <thead>
                      <tr className="text-center">
                        <th>S No</th>
                        <th>Products</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                  )}

                  {this.props.firstHalfProductList && this.props.firstHalfProductList[data] && this.props.firstHalfProductList[data].length > 0 ? this.props.firstHalfProductList[data].map(tranferProduct =>
                    <PrintContent tranferProduct={tranferProduct} />
                  ) : ""}
                </div>

                <div className="col-6 pl-0">
                  {this.props.secondHalfProductList && this.props.secondHalfProductList[data] && this.props.secondHalfProductList[data].length > 0 && (
                    <thead>
                      <tr className="text-center">
                        <th>S No</th>
                        <th>Products</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                  )}

                  {this.props.secondHalfProductList && this.props.secondHalfProductList[data] && this.props.secondHalfProductList[data].length > 0 ? this.props.secondHalfProductList[data].map(tranferProduct =>
                    <PrintContent tranferProduct={tranferProduct} />
                  ) : ""}
                </div>
              </div>
            ) : ""
            }
          </tbody>
          <tr>
            <th colSpan={5}>Received By:</th>
          </tr>
        </table>
      </div>
    );
  }
}