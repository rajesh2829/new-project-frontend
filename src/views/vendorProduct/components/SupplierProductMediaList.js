import React from "react";
import ArrayList from "../../../lib/ArrayList";

/**
 * Vendor product image list component
 *
 * @param {*} productDetails
 */
const SupplierProductMediaList = ({ productDetails }) => {
  let imageList =
    productDetails.images &&
    productDetails.images != "undefined" &&
    productDetails.images;

  return (
    <>
      <h5 className="mb-3">Images</h5>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {imageList &&
            ArrayList.isNotEmpty(imageList) &&
            imageList.map((image, index) => (
              <tr key={index}>
                <td scope="row">{++index}</td>
                <td>
                  <img
                    src={image}
                    alt={productDetails.name}
                    width="50"
                    height="50"
                    className="border-0"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default SupplierProductMediaList;
