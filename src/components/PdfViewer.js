import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Modal from 'react-modal';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer(props) {
  const { isOpen, onClose, pdfUrl } = props;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="pdf-modal"
      contentLabel="PDF Viewer Modal"
    >
      <div className="pdf-viewer">
        <div className="d-flex justify-content-end w-100"> 
      <button className="close-button" onClick={onClose}>
          Close
        </button>
        </div>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="pdf-controls" style={{gap:"10px",placeItems:"baseline"}}>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PdfViewer;
