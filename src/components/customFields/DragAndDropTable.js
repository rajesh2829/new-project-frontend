import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import InspectionFormFieldService from "../../services/CustomFieldService";
import MoreDropdown from "../authentication/moreDropdown";
import { DropdownItem } from "reactstrap";

const DragAndDropTable = (props) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const draggedRow = props.data[result.source.index];
    const newRows = props.data;
    newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, draggedRow);

    newRows.forEach((item, index) => {
      item.index = index;
    });
    props.setData(newRows);
    InspectionFormFieldService.updateOrder(newRows);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="table-responsive">
          <table className="w-100 table table-hover">
            <thead>
              <tr className="bg-dark text-white text-center">
                <th className="mx-3 p-3">Name</th>
                <th className="mx-3 p-3">Type</th>
                <th className="mx-3 p-3">Action</th>
              </tr>
            </thead>
            <Droppable droppableId="table-rows">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {props.data && props.data.length > 0 ? (
                    props.data.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={`table-row-${item.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <td className="m-2 p-4 text-left fw-bold">
                              {item.name}
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">
                              {item.type}
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">
                              {
                                <div className="text-center">
                                  <MoreDropdown>
                                    <DropdownItem
                                      onClick={() => props.handleEdit(item)}
                                    >
                                      Edit
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => props.handleDelete(item)}
                                      className="text-danger"
                                    >
                                      Delete
                                    </DropdownItem>
                                  </MoreDropdown>
                                </div>
                              }
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <></>
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </div>
      </DragDropContext>
    </>
  );
};

export default DragAndDropTable;
