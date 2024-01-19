import React from "react";
import GracefulImage from 'react-graceful-image';

const OrderProductDownload = ({ locationName, selectedDate, data }) => {
    const styles = {
        page: {
            "page-break-after": "always",
        },
        tableHeading: {
            fontSize: "9px",
            fontWeight: "bold",
        },
        Head: {
            textAlign: "center",
        },
        my_table: {
            marginTop: "22px",
            marginBottom: "5px",
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
            fontSize: "10px",
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
        }
    };
    const rowsPerPage = 18; // set desired number of rows per page
    const totalRows = data?.length || 0; // get the total number of rows or default to zero
    const totalPages = Math.ceil(totalRows / rowsPerPage); // calculate the total number of pages
    const lastPageRows = totalRows % rowsPerPage || rowsPerPage; // calculate the number of rows in the last page
    const itemsPerPage = totalPages === 1 ? totalRows : rowsPerPage; // set the items per page for each page

    return (
        <div style={styles.my_table} >
            {Array.from(Array(totalPages).keys()).map((page) => (
                <table
                    key={`page-${page}`}
                    className="small table table-bordered border-dark "
                    style={styles.page}
                >
                    <thead style={{ ...styles.tableBody, margin: 0, padding: 0 }}>
                        {/* Pdf Title */}
                        <tr>
                            <th style={styles.Head} colSpan={12} className="text-uppercase pt-0">
                                Order Product Report
                            </th>
                        </tr>
                        {locationName && (
                            <tr>
                                <th style={styles.HeadSize} className="pt-0" colSpan={12}>
                                Location Name <span style={styles.location}>:</span> {locationName}
                                </th>
                            </tr>
                        )}
                        {selectedDate && (
                            <tr>
                                <th style={styles.HeadSize} className="leave pt-0" colSpan={12}>
                                    Date <span style={styles.spanName}>:</span> {selectedDate}{" "}
                                </th>
                            </tr>
                        )}
                        <tr className="pt-0" style={styles.color}>
                            <th style={styles.serialNumber}>S.No </th>
                            <th style={styles.productName}>Product Name</th>
                            <th style={styles.quantity}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data
                                .slice(page * itemsPerPage, (page === totalPages - 1) ? page * itemsPerPage + lastPageRows : (page + 1) * itemsPerPage)
                                .map((item, index) => (
                                    <tr key={`item-${index}`}>

                                        <td className="px-2" style={{ ...styles.margin, margin: 0, padding: 0 }}>
                                            {page * itemsPerPage + index + 1}
                                        </td>
                                        <td
                                            className="px-2 pb-1"
                                            style={{ ...styles.margin, margin: 0, padding: 0 }}
                                        ><div style={{ display: "flex", fontSize: "10px" }}>
                                                <div style={{ height: "35px", width: "35px" }}>
                                                    {item.featured_media_url && (
                                                        <GracefulImage src={item.featured_media_url ? item.featured_media_url : ""} alt="Broken Image" />
                                                    )}
                                                </div>
                                                <div style={{ paddingLeft: "10px" }} >
                                                    <b style={{ fontSize: "10px" }}>{item.brand_name}</b> <br />
                                                    <span >
                                                        <span style={{ fontSize: "10px" }}> {item.product_name}</span>
                                                        {item.size}
                                                        {item.unit}
                                                        {item.pack_size}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ ...styles.quantity, margin: 0, padding: 0 }}>
                                            {item.quantity ?? ""}
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
};
export default OrderProductDownload;
