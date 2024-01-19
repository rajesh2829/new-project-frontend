import React, { useState } from "react";
import Drawers from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Select from "./Select";
import Form from "./Form";
import AddButton from "./AddButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";

const Drawer = (props) => {
  let {
    DrawerBody,
    DrawerFooter,
    initialValues,
    enableReinitialize,
    onSubmit,
    handleOpenModal,
    handleCloseModal,
    handleDrawerClose,
    isModalOpen,
    buttonLabel,
    showButton,
    hideAddButton,
    modelTitle,
    showDeleteButton,
    handleDelete,
    showAddButton,
    className,
    showFooter = true
  } = props;

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <>
      {showAddButton && (
        <AddButton
          label={buttonLabel}
          onClick={handleOpenModal}
          variant="contained"
          color="var(--drawer-add-button-text-color)"
        />
      )}
      {showButton && !hideAddButton && (
        <div className="">
          <div
            onClick={handleOpenModal}
            className="d-flex justify-content-center align-items-center mr-1"
            style={{ width: "35px", height: "35px" }}
          >
            <button
              style={{
                border: "none",
                width: "35px",
                height: "35px",
                borderRadius: "5px",
              }}
              className="bg-primary"
            >
              <FontAwesomeIcon icon={faPlus} color="var(--drawer-FontAwesomeIcon-color)" />
            </button>
          </div>
        </div>
      )}
      <Drawers
        className="MuiDrawer-paper"
        anchor="right"
        open={isModalOpen}
        style={{
          width: "100%",
        }}
        PaperProps={{
          className: className ? className : ""
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 10px",
              borderBottom: "1px solid var(--drawer-header-border-bottom-color)",
              position: "sticky",
              top: 0,
              backgroundColor: "bg-white",
              zIndex: 2,
            }}
          >
            <h2>{modelTitle ? modelTitle : "Create Ticket"}</h2>
            <div className="d-flex">

              {showDeleteButton && (
                <div
                  className="mt-2"
                  style={{
                    marginLeft: "15px",
                  }}
                >
                  <DeleteButton onClick={() => handleDelete()} />
                </div>

              )}
              <Button
                onClick={handleDrawerClose}
                color="var(--drawer-cancel-button-bg-color)"
                style={{ fontSize: "24px" }}
              >
                ×
              </Button>
            </div>
          </div>
          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "16px 16px 0px 16px",
              overflowY: "auto",
            }}
          >
            <Form
              initialValues={initialValues}
              enableReinitialize={enableReinitialize}
              onSubmit={onSubmit}
              className="w-100"
              width="100%"
            >
              <>
                <div style={{ minHeight: "80vh" }}> {DrawerBody} </div>
                {showFooter &&
                  <div
                    style={{
                      display: "flex",
                      marginTop: "60px",
                      justifyContent: "center",
                      padding: "0px 16px 16px 16px",
                      borderTop: "1px solid var(--drawer-footer-border-tap-color)",
                      textAlign: "center",
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "var(--drawer-footer-bg-color)",
                      zIndex: 2,
                      // marginTop:"4px"
                    }}
                  >
                    <div className="mt-4">{DrawerFooter}</div>


                    <div className="mt-4">
                      <Button
                        onClick={handleCancel}
                        style={{
                          border: "1px solid var(--drawer-cancel-button-border-color)",
                          marginLeft: "15px",
                          borderRadius: "7px",
                          textTransform: "none"
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>}
              </>
            </Form>
          </div>
        </div>
      </Drawers>
    </>
  );
};

export default Drawer;
