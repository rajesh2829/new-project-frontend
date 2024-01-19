import React from "react";
import AddModal from "./Modal";
import CancelButton from "./CancelButton";

const DeleteModal = ({ isOpen, toggle, deleteFunction, title, id, label, imageUrl, text }) => {
  
  const deleteBody = (
    <p className="text-center mb-4">
      {`Are you sure you want to delete ${text ? text : ""}`}<br />
      {label && <b>"{label}" ?</b>}
      <div className="d-flex justify-content-center">{imageUrl && <img src={imageUrl} />}</div>
    </p>
  );
  
  const deleteFooter = (
    <>
      <button
        id={id}
        className="btn btn-danger"
        type="button"
        onClick={() => {
          toggle();
          deleteFunction(id);
        }}
      >
        Delete
      </button>
      <CancelButton onClick={() => toggle()} />
    </>
  );

  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle={title}
        modalBody={deleteBody}
        modalFooter={deleteFooter}
        onSubmit={() => { }}
        hideDefaultButtons
        initialValues={{}}
      />
    </>
  );
};

export default DeleteModal;
