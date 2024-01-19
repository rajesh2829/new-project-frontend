import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    marginTop: 5,
    marginBottom: 5,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    textAlign: "center",
    padding: 5,
    display: "block",
    minWidth: "90px",
  },
  tableProductCell: {
    minWidth: "250px",
    maxWidth: "500px",
  },
  header: {
    backgroundColor: "#3F51B5",
    color: "white",
    fontWeight: "bold",
  },
});

const MyDocument = ({ detail, storeList }) => (
  <Document>
    <Page size="A2" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <Text>Product Details</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.header]}>
            <Text style={[styles.tableProductCell]}>Product</Text>
            <Text style={[styles.tableCell]}>Required Quantity</Text>
            {storeList.map((store) => (
              <Text key={store} style={[styles.tableCell]}>
                {store}
              </Text>
            ))}
          </View>
          {detail.map((product) => (
            <View key={product.id} style={styles.tableRow}>
              <Text style={[styles.tableCell]}>{product.product_name}</Text>

              <Text style={[styles.tableCell]}>
                {product.required_quantity}
              </Text>
              {product?.storeProduct.map((store) => (
                <Text key={store.id} style={[styles.tableCell]}>
                  {store.quantity}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const PdfDownload = (props) => {
  return (
    <PDFDownloadLink
      className="d-none"
      document={
        <MyDocument
          detail={props.detail}
          storeList={props.storeList}
        />
      }
      fileName="product-details.pdf"
    >
    </PDFDownloadLink>
  );
};

export default PdfDownload;
