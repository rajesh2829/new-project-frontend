import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";
import Form from "./Form";
import SaveButton from "./SaveButton";

/**
 * Render Add modal
 *
 * @param {*} param0
 */
const AddModal = ({
  toggle,
  toggleModalClose,
  isOpen,
  FooterClassName,
  modalTitle,
  modalBody,
  modalFooter,
  primaryBtnClassName,
  primaryColor,
  cancelColor,
  hideFooter,
  showAddButton,
  hideDefaultButtons,
  id,
  onSubmit,
  initialValues,
  className,
  onDelete,
  enableReinitialize,
  maxHeight,
  showOverFlow=true
}) => (
  <>
    <Modal
      id={id}
      isOpen={isOpen}
      toggle={toggle}
      backdrop="static"
      className={className ? className : "w-100"}
      centered={true}
    >
      <ModalHeader
        toggle={toggleModalClose}
        close={
          <button className="close" onClick={toggleModalClose}>
            ×
          </button>
        }
        cssModule={{ "modal-title": "w-100 text-center" }}
      >
        <span className="text-center">{modalTitle}</span>
      </ModalHeader>
      <Form
        enableReinitialize={enableReinitialize != undefined ? enableReinitialize : true}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <div style={{maxHeight: maxHeight ? maxHeight:  "62vh", overflowY: showOverFlow ? "auto" :"", overflowX:showOverFlow ? "hidden" :"" }}>
        <ModalBody className="p-2" >
          <div className="mt-2 mb-3">{modalBody}</div>
        </ModalBody>
        </div>

        {hideFooter ? (
          ""
        ) : (
          <ModalFooter className={FooterClassName}>
            <div className="container-fluid">
              <div className="text-center">{modalFooter}</div>
            </div>
            {!hideDefaultButtons && (
              <>
                {showAddButton ? (
                  <Button
                    id={id}
                    color={primaryColor}
                    className={primaryBtnClassName}
                    onClick={toggle}
                  >
                    ADD
                  </Button>
                ) : (
                  <SaveButton
                    id={id}
                    type="submit"
                    color={primaryColor}
                    className={primaryBtnClassName}
                    onClick={toggle}
                  >
                    Save
                  </SaveButton>
                )}
                <CancelButton id={id} color={cancelColor} onClick={toggle} />
                <DeleteButton id={id} label={"Delete"} onClick={onDelete} />
              </>
            )}
          </ModalFooter>
        )}
      </Form>
    </Modal>
  </>
);
export default AddModal;
