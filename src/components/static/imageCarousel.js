import { faAngleLeft, faAngleRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pdfImage from "../../assets/img/pdfImage.png";
import DeleteModal from "../DeleteModal";
import PdfViewer from "../PdfViewer";
import Spinner from "../Spinner";
import "./imageCarasoul.scss";

const ImageCarousel = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPdfModel, setIsOpenPdfModel] = useState(false);

  const { photos, handlePhotoDelete, showRemove, showRemoveTop } = props;
  const [photoIndex, setPhotoIndex] = useState(1);
  const [statusFormatter, setStatusFormatter] = useState(1);

  const imageRemoveHandler = (photo) => {
    handlePhotoDelete(photos[photoIndex]);
  };

  const openLightbox = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openPdf = () => {
    setIsOpenPdfModel(!isOpenPdfModel);
  };

  const isPdfURL = (url) => {
    const pdfExtensions = ['.pdf'];
    const fileExtension = url && url.slice(url.lastIndexOf('.')).toLowerCase();
    return fileExtension && pdfExtensions.includes(fileExtension);
  };

  if (props.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={photos[photoIndex]?.url}
          onCloseRequest={closeLightbox}
          nextSrc={photos[(photoIndex + 1) % photos.length]?.url}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]?.url}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % photos.length)
          }
        />
      )}
      <PdfViewer pdfUrl={photos[photoIndex]?.url} isOpen={isOpenPdfModel} onClose={openPdf} />
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        deleteFunction={imageRemoveHandler}
        title="Delete Image"
        imageUrl={photos[photoIndex]?.url}
        label={photos[photoIndex]?.name}
      />

      <div className="carousel-container">
        <Carousel
          showThumbs={true}
          infiniteLoop={true}
          statusFormatter={(e) => setStatusFormatter(e)}
          renderIndicator={(clickHandler, isSelected, index, label) => {
            return (
              <button
                type="button"
                className={`custom-dot ${isSelected ? 'selected' : ''}`}
                onClick={clickHandler}
                onKeyDown={clickHandler}
                value={index}
                key={index}
                tabIndex={0}
                aria-label={`${label} dot`}
              >
                {index + 1}
              </button>
            );
          }
        }
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                className="custom-arrow prev"
                style={{
                  left: '0',
                  position: 'absolute',
                  zIndex: 100,
                  backgroundColor: 'transparent',
                  color: 'var(--imageCarousel-button-color)',
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                className="custom-arrow next"
                style={{
                  right: '0',
                  backgroundColor: 'transparent',
                  color: 'var(--imageCarousel-button-color)',
                }}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            )
          }
        >
          {photos &&
            photos.map((photo, index) => (
              <>
                <div
                  key={photo.id}
                  style={{
                    height: '400px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: '85px',
                  }}
                >
                  <div
                    onClick={() => {
                      {
                        isPdfURL(photo?.name) ? openPdf() : openLightbox();
                      }
                      setPhotoIndex(index);
                    }}
                  >
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={isPdfURL(photo?.name) ? pdfImage : photo.url}
                        height="400px"
                        alt={photo.title}
                        style={{
                          display: 'block',
                          objectFit: 'contain',
                          maxWidth: '100%',
                          maxHeight: '400px',
                          cursor: 'pointer',
                        }}
                      />
                      {!props.editable && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: '8px',
                            zIndex: 1,
                          }}
                          onClick={(e) => {
                            setDeleteModal(true);
                            setPhotoIndex(index);
                            e.stopPropagation();
                          }}
                        >
                          <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
                        </div>
                      )}
                    </div>
                    {photo.title && photo.description && (
                      <div className="card" style={{ height: '6rem' }}>
                        <span className="mx-2">{photo.title}</span>
                        <br />
                        <span
                          className="mx-2 text-truncate"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            whiteSpace: 'break-spaces',
                          }}
                        >
                          {photo.description}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                 {/* {showRemove && !showRemoveTop && (
                  <div style={{ marginTop: "20px" }}>
                    <DeleteButton
                      label="Delete"
                      onClick={() => {
                        setDeleteModal(true);
                        setPhotoIndex(index);
                      }}
                    />
                  </div>
                )} */}
              </>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
