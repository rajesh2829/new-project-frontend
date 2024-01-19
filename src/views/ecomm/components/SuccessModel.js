import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "reactstrap";

const SuccessModel = ({ isOpen, toggle, id,name }) => {
  return (
    <>
      <Modal
        id={id}
        isOpen={isOpen}
        toggle={toggle}
        backdrop="static"
        className={"w-100"}
        centered={true}
      >
        <button className="close" onClick={toggle}>
          ×
        </button>
        <div class="modal-dialog modal-confirm">
          <div class="modal-content">
            <div class="modal-header">
              <div class="icon-box">
                <i class="material-icons">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#ffffff", marginBottom: "10px" }}
                  />
                </i>
              </div>
              <h4 class="modal-title">Awesome!</h4>
            </div>
            <div class="modal-body">
              <p class="text-center">
                {name}
              </p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-success btn-block"
                data-dismiss="modal"
                onClick={toggle}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SuccessModel;
