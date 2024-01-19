import React from "react";
// Assets
import { EditIconAlt, TrashIcon } from "../assets/icons/index";
const DragAndDropSort = (props) => {
  let {
    column1,
    column2,
    column3,
    task,
    openEditModal,
    openDeleteModal,
    showEditOption,
    showDeleteOption,
  } = props;
  let { category } = task;
  return (
    <div className="row m-2">
      <div className="col-4 mt-1">
        <div>
          <div>
            {/*Show Name*/}
            <span className="text-decoration-none">{column1}</span>
          </div>
        </div>
      </div>
      <div className="col-4 mt-1">
        <div>
          {/*Show Name*/}
          <span className="text-decoration-none">{column2}</span>
        </div>
        <div
          className="text-center"
        >
          {/*Show Name*/}
          <span className="text-decoration-none">{column3}</span>
        </div>
      </div>
      <div className="col-4">
        {/*Show Actions Based on the Condition*/}
        <div className="task-actions d-flex justify-content-end mb-2">
          <>
            {showEditOption ? (
              <span className={"mt-1 d-flex justify-content-between"}>
                <button
                  type="button"
                  className={["edit-btn", "btn-link", "btn"].join(" ")}
                  onClick={() => {
                    openEditModal(true);
                  }}
                >
                  <EditIconAlt />
                </button>
              </span>
            ) : (
              ""
            )}
            {showDeleteOption ? (
              <button
                type="button"
                className={["delete-btn", "btn-link", "btn"].join(" ")}
                onClick={() => {
                  openDeleteModal(true);
                }}
              >
                <TrashIcon />
              </button>
            ) : (
              ""
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropSort;
