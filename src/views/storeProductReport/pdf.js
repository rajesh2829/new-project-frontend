import React, { useEffect, useState } from 'react'
import StoreProductReportPDFDownload from "./storeProductReportPDFDownload";
import StoreProductReportService from "../../services/StoreProductReportService";
import jsPDF from 'jspdf';
import SelectDropdown from '../../components/SelectDropdown';
import Url from '../../lib/Url';

const pdf = (props) => {
    const actionOptions = props.actionOptions;
    const location = Url.GetParam("location") || "";
    const brand = Url.GetParam("brand") || "";
    const category = Url.GetParam("category") || "";
    const type = Url.GetParam("type") || "";
    const pagination = false;

    useEffect(() => {
        getDetails()
    }, [location, brand, category, type]);

    const [storeDetails, setStoreDetail] = useState();

    // function to handle changes
    const handleChanges = (e) => {
        if (e == "Download As PDF") {
            // call the function to generate the PDF
            generatePDF();
        }
    };

    // function to generate a PDF from the HTML content of a component
    const generatePDF = () => {
        // create a new jsPDF format of A4 and unit of points
        const pdf = new jsPDF({
            format: "a4",
            unit: "pt"
        });

        // get the HTML content of the component with ID "download"
        const element = document.getElementById('download');
        const html = element.innerHTML;

        // generate the PDF from the HTML content
        pdf.html(html, {
            // use a callback function to save the PDF after it has been generated
            callback: function (pdf) {
                // get the current date in a formatted string
                const today = new Date();
                const options = { day: "numeric", month: "short", year: "numeric" };
                const formattedDate = today.toLocaleDateString("en-US", options);

                // save the PDF with a filename that includes the current date
                pdf.save(`Store Product Report ${formattedDate}.pdf`);
            }
        });
    };

    //get list of location report
    const getDetails = async () => {
        const response = await StoreProductReportService.search(location, brand, category, type, pagination);
        // extract data and location name from API response
        let data = response?.data;
        let storeDetails = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            storeDetails.push(element)
        }
        // values stored on state
        setStoreDetail(storeDetails);
    }

    return (
        <>
            <div>
                <SelectDropdown
                    buttonLabel={"Actions"}
                    hideCaret
                    dropdownLinks={actionOptions}
                    handleChange={(e) => handleChanges(e)}
                />
            </div>
            <div className="d-none">
                <div id="download">
                    {/* Report UI Component */}
                    <StoreProductReportPDFDownload
                        storeDetails={storeDetails}
                    />
                </div>
            </div>

        </>
    )
}

export default pdf