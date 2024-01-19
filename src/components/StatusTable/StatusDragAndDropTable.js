import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { groupOption } from "../../helpers/Status";
import Url from "../../lib/Url";
import StatusService from "../../services/StatusService";
import { getUserRole } from "../../services/UserSettingService";
import Drawers from "../Drawer";
import SaveButton from "../SaveButton";
import Spinner from "../Spinner";
import { options as ColorNames } from "../colorSelect/colorSelect";
import "./style.scss";

import DeleteModal from "../DeleteModal";
import MoreDropdown from "../authentication/moreDropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Link from "../../components/Link";
import StatusForm from "../../views/status/statusForm";
import UserCard from "../UserCard";

const DragAndDropTable = (props) => {
  let { _toggle, isOpen, project_id, row, setRow } = props;
  const [name, setName] = useState(Url.GetParam("object_name"));
  const [data, setData] = useState("");
  const [rows, setRows] = useState(props.rows);
  const [userRole, setUserRole] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [detail, setDetail] = useState();
  const [objectName, setObjectName] = useState();
  const [color, setColor] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDetails();
    setName(props.objectName);
  }, [props.rows, project_id]);

  useEffect(() => {
    getDetails();
  }, [project_id]);

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getStatusList();
  }, [objectName]);

  const getUserList = async () => {
    const roleData = await getUserRole();
    setUserRole(roleData);
  };

  const getStatusList = async () => {
    const list = await StatusService.search(
      props.objectName,
      null,
      detail?.project_id ? detail?.project_id : project_id
    );
    let nextStatusValue = [];
    list &&
      list.forEach((value) => {
        nextStatusValue.push({
          label: value.name,
          id: value.id,
          value: value.id,
        });
      });
    setStatusList(nextStatusValue);
  };

  const getStatusDetail = async (id) => {
    setIsLoading(true);

    const data = await StatusService.get(id);
    setDetail(data.data);
    setObjectName(data?.data?.object_name);
    getStatusList(data?.data?.object_name);
    setIsLoading(false);
  };

  const getDetails = async () => {
    setIsLoading(true);
    const response = await StatusService.search(
      props.objectName,
      null,
      project_id
    );
    const data = response || [];
    setRows(data);
    setIsLoading(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const draggedRow = rows[result.source.index];
    const newRows = [...rows];
    newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, draggedRow);

    // update the index property of each item in the newRows array
    newRows.forEach((item, index) => {
      item.index = index;
    });
    setRows(newRows);
    StatusService.updateOrder(newRows);
  };

  let selectedTags = [];

  if (detail?.allowedUser) {
    detail?.allowedUser.forEach((result) => {
      selectedTags.push({
        value: result.id,
        label: result.name,
      });
    });
  }

  let nextStatusValue = [];

  if (detail?.nextStatus) {
    detail?.nextStatus.forEach((result) => {
      nextStatusValue.push({
        value: result.id,
        label: result.name,
      });
    });
  }

  const dueDateOption = [
    {
      label: "Today",
      value: "Today",
    },
    {
      label: "Tomorrow",
      value: "Tomorrow",
    },
  ];

  const addStatus = (
    <StatusForm
      objectName={props.objectName}
      detail={detail}
      defaultOwner={row?.default_owner}
      defaultReviewer={row?.default_reviewer}
      setColor={setColor}
      project_id={detail?.project_id ? detail?.project_id : project_id}
    />
  );

  const addFooter = (
    <div className="d-flex align-items-center">
      <SaveButton type="submit" label={row?.id ? "Save" : "Add"} />{" "}
    </div>
  );

  const statusAdd = async (values) => {
    const data = new FormData();
    const objectName = props.objectName;
    data.append("objectName", objectName ? objectName : "");
    data.append("name", values.status.trim());
    data.append(
      "nextStatus",
      values && values?.nextStatus ? JSON.stringify(values?.nextStatus) : ""
    );
    if (values && values.allowedUser) {
      data.append(
        "allowedUser",
        values && values.allowedUser ? JSON.stringify(values.allowedUser) : ""
      );
    }
    data.append("sortOrder", values.sortOrder);
    data.append("colorCode", values?.colorcode?.value);

    data.append("update_quantity", values.update_quantity);
    data.append("allow_edit", values.allow_edit);

    data.append(
      "send_notification_to_owner",
      values.send_notification_to_owner
    );
    data.append(
      "location_product_last_stock_entry_date_update",
      values.update_location_product_last_stock_entry_date
    );
    data.append("update_product_price", values.update_product_price);

    data.append(
      "group",
      values && values?.group?.value ? values?.group?.value : ""
    );

    data.append("project_id", project_id ? project_id : "");
    data.append(
      "default_due_date",
      values && values?.default_due_date ? values?.default_due_date?.value : ""
    );
    data.append(
      "default_owner",
      values && values?.default_owner ? values?.default_owner?.id : ""
    );
    data.append(
      "default_reviewer",
      values && values?.default_reviewer ? values?.default_reviewer?.id : ""
    );

    data.append(
      "update_distribution_quantity",
      values && values?.update_distribution_quantity
        ? values?.update_distribution_quantity
        : ""
    );

    data.append(
      "allow_cancel",
      values && values?.allow_cancel ? values?.allow_cancel : ""
    );
    data.append("validate_amount", values.validate_amount);
    data.append("allow_to_view", values.allow_to_view);

    data.append("allow_replenishment", values.allow_replenishment);

    data.append("is_active_price", values.is_active_price);

    if (row?.id) {
      data.append("id", row?.id ? row?.id : "");
      await StatusService.update(
        row?.id,
        data,
        {
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
        },
        _toggle,
        setData,
        setRows,
        objectName,
        project_id
      );
    } else {
      await StatusService.add(
        data,
        {
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
        },
        _toggle,
        setData,
        setRows,
        props.objectName,
        project_id
      );
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  
  const deleteStatus = (id) => {
    StatusService.Delete(
      id,
      row?.objectName,
      setData,
      setRows,
      detail?.project_id ? detail?.project_id : project_id,
      (res) => {
        if (res) {
          _toggle();
        }
      }
    );
  };

  return (
    <>
      <DeleteModal
        id={row?.id}
        label={row?.name}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Status"
        deleteFunction={() => deleteStatus(row?.id)}
      />

      <Drawers
        DrawerBody={addStatus}
        DrawerFooter={addFooter}
        modelTitle={row?.id ? "Edit Status" : "Add Status"}
        onSubmit={(values) => {
          statusAdd(values);
        }}
        initialValues={{
          status: row?.id ? detail?.name : "",
          object_name: row?.id
            ? { label: detail?.object_name, value: detail?.object_name }
            : { label: props?.objectName, value: props?.objectName },
          colorcode: row?.id
            ? color &&
            color.find((option) => option.value === detail?.colorCode)
            : "",
          allowedUser: row?.id ? selectedTags : "",
          nextStatus: row?.id ? nextStatusValue : "",
          sortOrder: row?.id ? detail?.sortOrder : "",
          update_quantity: row?.id
            ? detail?.update_quantity == 1
              ? true
              : false
            : "",
          allow_edit: row?.id ? (detail?.allow_edit == 1 ? true : false) : "",
          send_notification_to_owner: row?.id
            ? detail?.notifyToOwner == 1
              ? true
              : false
            : "",
          update_location_product_last_stock_entry_date: row?.id
            ? detail?.location_product_last_stock_entry_date_update
              ? true
              : false
            : "",
          update_product_price: row?.id
            ? detail?.update_product_price == 1
              ? true
              : false
            : "",
          group: row?.id
            ? groupOption.find((data) => data.value == detail?.groupValue)
            : "",
          default_owner: "",
          default_reviewer: "",
          allow_cancel: row?.id
            ? detail?.allowCancel == 1
              ? true
              : false
            : "",
          update_distribution_quantity: row?.id
            ? detail?.updateDistributionQuantity
            : "",
          default_due_date: detail?.default_due_date
            ? dueDateOption.find(
              (data) => data?.value === detail?.default_due_date
            )
            : "",
          validate_amount: row?.id
            ? detail?.validate_amount == 1
              ? true
              : false
            : "",
          allow_to_view: row?.id
            ? detail?.allow_to_view == 1
              ? true
              : false
            : "",
          allow_replenishment: row?.id ? detail?.allowReplenishment : "",
          is_active_price: row?.id ? detail?.isActivePrice : ""
        }}
        handleOpenModal={_toggle}
        handleCloseModal={_toggle}
        handleDrawerClose={_toggle}
        showDeleteButton={row?.id ? true : false}
        handleDelete={() => {
          setDeleteModal(true);
        }}
        isModalOpen={isOpen}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="table-responsive">
          <table className="w-100 table table-hover">
            <thead>
              <tr className="bg-dark text-white text-center">
                <th className="mx-3 p-3">Name</th>
                <th className="mx-3 p-3">Next Statuses</th>
                <th className="mx-3 p-3">Color Code</th>
                <th className="mx-3 p-3">Group</th>
                <th className="mx-3 p-3">Default Owner</th>
                <th className="mx-3 p-3">Default Due Date</th>
                <th className="mx-3 p-3">Action</th>
              </tr>
            </thead>
            <Droppable droppableId="table-rows">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {rows &&
                    rows.map((item, index) => (
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
                              <Link
                                text={item.name}
                                url={`/Status/${item.id
                                  }?object_name=${item.objectName}`}
                              />
                            </td>

                            <td className="m-2 p-4  text-center fw-bold">
                              {item.nextStatus &&
                                item.nextStatus.map((role, index) => (
                                  <span key={index}>
                                    {index > 0 && <br />}
                                    {role}
                                  </span>
                                ))}
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">
                              {" "}
                              <div className="d-flex justify-content-start align-items-start">
                                <h2
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: item.colorCode,
                                  }}
                                ></h2>
                                <h5 className="ml-3">
                                  {
                                    ColorNames.find(
                                      (colorName) =>
                                        colorName?.color === item?.colorCode
                                    )?.label
                                  }
                                </h5>
                              </div>
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">
                              {item.group}
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">
                              <UserCard
                                firstName={item.default_owner_name}
                                lastName={item.default_owner_last_name}
                                url={item.default_owner_media_url}

                              />
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">

                              {item.default_due_date}
                            </td>
                            <td className="m-2 p-4 text-center fw-bold">
                              <MoreDropdown>
                                <DropdownItem
                                  onClick={() => {
                                    setRow(item);
                                    getStatusDetail(item?.id);
                                    _toggle();
                                  }}
                                >
                                  Quick View
                                </DropdownItem>
                              </MoreDropdown>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
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
