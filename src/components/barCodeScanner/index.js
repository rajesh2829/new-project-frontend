import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function BarCodeScanner({getScannedProductCode}) {
  return (
    <>
      <BarcodeScannerComponent
        width={250}
        height={200}
        onUpdate={(err, result) => {
          if (result) getScannedProductCode(result.text);
        }}
      />
    </>
  );
}

export default BarCodeScanner;
