import React from "react";
import DateTime from "../../../lib/DateTime";
import Currency from "../../../lib/Currency";
import "../style.scss"
const PurchaseOrderDownload = (props) => {

    const data = props?.data ? props?.data : "";
    const purchaseNumber = props?.purchaseOrderNumber ? props?.purchaseOrderNumber : "";
    const purchaseDate = props?.purchaseOrderDate ? DateTime.getDate(props?.purchaseOrderDate) : "";

    const styles = {
        page: {
            "page-break-after": "always",
        },
        tableHeading: {
            fontSize: "9px",
            fontWeight: "bold",
        },
        Head: {
            textAlign: "start",
        },
        my_table: {
            marginTop: "20px",
            marginBottom: "0px",
            marginLeft: "12px",
            marginRight: "10px",
            fontSize: "8pt",
            width: "150mm",
            fontFamily: "Helvetica",
            borderCollapse: "collapse",
        },
        HeadSize: {
            fontSize: "12px",
            textAlign: "start"
        },
        tableBody: {
            fontWeight: "normal",
            textAlign: "start",
            fontSize: "9px",
            margin: "0px",
            padding: "5px"
        },
        spanName: {
            marginLeft: "41px",
            marginRight: "2px"
        },
        productName: {
            minWidth: "300px",
            textAlign: "center",
            fontWeight: "bold"
        },
        serialNumber: {
            fontWeight: "bold"
        },
        quantity: {
            textAlign: "center",
            fontWeight: "bold"
        },
        color: {
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold"
        },
        location: {
            marginRight: "2px"
        },
        quantity: {
            fontWeight: "bold",
            textAlign: "center",
        },
        tableSize: {
            fontSize: "8px"
        },

        alignCenter: {
            alignItem: "center"
        }
    };
    const rowsPerPage = 18; // set desired number of rows per page  data?.length ||
    const totalRows = data.length || 0; // get the total number of rows or default to zero
    const totalPages = Math.ceil(totalRows / rowsPerPage); // calculate the total number of pages
    const lastPageRows = totalRows % rowsPerPage || rowsPerPage; // calculate the number of rows in the last page
    const itemsPerPage = totalPages === 1 ? totalRows : rowsPerPage; // set the items per page for each page
    return (
        <div style={styles.my_table} >
            <div className="row m-3">
                <div className="col-6 my-1 ">
                    {props.deliveryAddress && (
                        <>
                            <h3 className="text-dark mb-1">{props.companyName}</h3>
                            <div>{props.billingAddress?.name}</div>
                            <div>
                                {props.billingAddress?.address1}
                                {", "} {props.billingAddress?.address2}
                            </div>
                            <div>
                                {props.billingAddress?.city}
                                {", "}
                                {props.billingAddress?.state && (
                                    <>
                                        {props.billingAddress?.state}
                                        {", "}
                                    </>
                                )}
                                {props.billingAddress?.pin_code}
                            </div>
                            <div>{props.billingAddress?.country}</div>
                        </>
                    )}

                </div>

                <div className="col-6 my-1">
                    <div className="float-right mx-3 mt-3">
                        {" "}
                        <h6 className="my-1 text-danger text-bold ">
                            PURCHASE ORDER # {props.purchaseOrderNumber}
                        </h6>
                        <div>Date:{DateTime.getDate(props.date)}</div>
                        <div> GST:{props.deliveryAddress?.gst_number}</div>
                    </div>
                </div>
            </div>

            <div className="row m-4 justify-content-between">
                <div className="col-5 pt-0 mt-0 ">
                    <div>
                             <p className=" text-center fw-bold mb-2 ">
                                <b className=" margin bg-primary text-white rounded-2">BILL ADDRESS </b>
                            </p>
                        </div>
                    {props.deliveryAddress && (
                        <div className=" mt-4 ">
                            <div className="">{props.billingAddress?.name}</div>
                            <div>
                                {props.billingAddress?.address1}
                                {", "} {props.billingAddress?.address2}
                            </div>
                            <div>
                                {props.billingAddress?.city}
                                {", "}
                                {props.billingAddress?.state && (
                                    <>
                                        {props.billingAddress?.state}
                                        {", "}
                                    </>
                                )}
                                {props.billingAddress?.pin_code}
                            </div>
                            <div>{props.billingAddress?.country}</div>
                        </div>
                    )}
                </div>
                <div className="col-5 pt-0 mt-0">
                    {props.deliveryAddress && (
                        <div>
                            <p className=" text-center fw-bold mb-2 ">
                                <b className=" margin bg-primary text-white rounded-2">SHIP TO</b>
                            </p>
                            <div className="mt-4">
                                <div >{props.deliveryAddress?.title}</div>
                                <div>{props.deliveryAddress?.name}</div>
                                <div>
                                    {props.deliveryAddress?.address1}
                                    {", "} {props.deliveryAddress?.address2}
                                </div>
                                <div>
                                    {props.deliveryAddress?.city}
                                    {", "}
                                    {props.deliveryAddress?.state && (
                                        <>
                                            {props.deliveryAddress?.state}
                                            {", "}
                                        </>
                                    )}
                                    {props.deliveryAddress?.pin_code}
                                </div>
                                <div>{props.deliveryAddress?.country}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div class="table-responsive-sm mt-0 pt-0 px-4 ">
                <table className="small table table-bordered mt-0 pt-0">
                    <thead>
                        <tr className="text-center">
                            <th className="my-0 pt-0"><b>SL.NO#</b> </th>
                            <th className="my-0 pt-0"><b>Item Name</b> </th>
                            <th className="my-0 pt-0"><b>Quantity</b> </th>
                        </tr>
                    </thead>
                    <tbody style={styles.tableSize}>
                        {data && data.map((item) => (
                            <tr className="my-0 pt-0 ">
                                <td className="counterCell text-center "></td>
                                <td className="d-flex m-0 pt-0 my-0">
                                    <img
                                        src={item.productImage}
                                        height="25px"
                                        width="25px"
                                        className="mt-1 mx-3 "
                                    />
                                    {item.product_name && (
                                        <div className="pt-0 my-0">
                                            {item.brandName && (
                                                <>
                                                    {item.brandName && (
                                                        <b className="fw-bold">
                                                            {`${item.brandName ? item.brandName : " "
                                                                }`}
                                                        </b>
                                                    )}
                                                </>
                                            )}
                                            {item.product_name && (
                                                <p className="my-0 pb-0">
                                                    {item.product_name}
                                                    {`${item.size ? "," + " " + item.size : " "
                                                        }`}
                                                    {`${item.unit ? " " + item.unit : " "}`}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="text-center my-0">
                                    {item && (item.quantity ? item.quantity : "")}
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default PurchaseOrderDownload;