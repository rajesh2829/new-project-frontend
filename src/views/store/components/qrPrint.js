import React, { useRef } from "react";

// PDF PRINT
import ReactToPrint from "react-to-print";

const qrCodePrint = (props) => {
    const { image, storeDetail } = props
    let componentRef = useRef();

    return (
        <>
            <div className="d-flex justify-content-center" >
                <div ref={componentRef} className="text-center mt-5" >
                    {image}
                    <h5 className="d-flex justify-content-center" ref={componentRef} >{storeDetail}</h5>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <ReactToPrint
                    trigger={() => <div className="btn btn-primary">Print</div>}
                    content={() => componentRef.current}
                />
            </div>
        </>

    );
}

export default qrCodePrint;

