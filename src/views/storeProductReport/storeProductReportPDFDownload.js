import React from "react";

const StoreProductReportPDFDownload = (data) => {

  const storeDetails = data?.storeDetails ?? "";
  const styles = {
    page: {},
    tableHeading: { fontSize: "8px", fontWeight: "bold" },
    Head: { textAlign: "center" },
    my_table: {
      marginTop: "14px",
      marginBottom: "23px",
      marginLeft: "15px",
      marginRight: "15px",
      width: "110mm",
      fontFamily: "Helvetica",
      borderCollapse: "collapse",
      "page-break-after": "always",
      fontSize: "8px"
    },
    HeadSize: { fontSize: "12px", textAlign: "start" },
    tableBody: { minHeight: "100px" },
    productName: {
      minWidth: "280px",
      maxWidth: "280px",
      textAlign: "center",
      fontWeight: "bold",
      minHeight: "190px !important"
    },
    serialNumber: { fontWeight: "bold" },
    quantity: { textAlign: "center", fontWeight: "bold" },
    color: { backgroundColor: "black", color: "white", fontWeight: "bold", fontSize: "8px" },
    location: { minWidth: "75px", textAlign: "start" },
    mar: {}
  };
  const rowsPerPage = 22;
  const totalRows = storeDetails?.length ?? 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const lastPageRows = totalRows % rowsPerPage || rowsPerPage;
  const itemsPerPage = totalPages === 1 ? totalRows : rowsPerPage;

  return (
    <div>
      {Array.from(Array(totalPages).keys()).map((page) => (
        <table className="small table table-bordered border-dark" style={styles.my_table}>
          <thead style={{ ...styles.tableBody, margin: 0, padding: 0 }}>
            <tr>
              <th style={styles.Head} colSpan={12} className="text-uppercase pt-0">
                Store Product Report
              </th>
            </tr>
            <tr className="pt-0 mt-0" style={styles.color}>
              <th className="mt-0 pt-0" style={styles.serialNumber}>S.No </th>
              <th className="mt-0 pt-0" style={styles.location}>Location Name </th>
              <th className="mt-0 pt-0" style={styles.productName}>Product Name</th>
              <th className="mt-0 pt-0" style={styles.quantity}>Quantity</th>
              <th className="mt-0 pt-0" style={styles.quantity}>Min Quantity</th>
              <th className="mt-0 pt-0" style={styles.quantity}>Max Quantity</th>
            </tr>
          </thead>
          <tbody style={{ ...styles.tableBody, margin: 0, padding: 0 }}>
            {storeDetails &&
              storeDetails
                .slice(page * itemsPerPage, (page === totalPages - 1) ? page * itemsPerPage + lastPageRows : (page + 1) * itemsPerPage)
                .map((item, index) => (
                  <tr key={`item-${index}`}>
                    <td className="text-center fw-bold" style={{ ...styles.margin, margin: 0, padding: 0 }}>
                      {page * itemsPerPage + index + 1}
                    </td>
                    <td style={styles.location} className="mt-0 pt-0">
                      {item?.location ?? ""}
                    </td>
                    <td className="px-2 pb-2" style={{ ...styles.mar, margin: 0, padding: 0, minHeight: '1000px !important' }}>
                      <b className="fw-bold">{item?.brand ?? ""}</b> <br />
                      {item?.product ?? ""}
                    </td>
                    <td style={{ ...styles.quantity, margin: 0, padding: 0 }}>{item?.quantity ?? ""}</td>
                    <td style={{ ...styles.quantity, margin: 0, padding: 0 }}>{item?.min_quantity ?? ""}</td>
                    <td style={{ ...styles.quantity, margin: 0, padding: 0 }}>{item?.max_quantity ?? ""}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};
export default StoreProductReportPDFDownload;
