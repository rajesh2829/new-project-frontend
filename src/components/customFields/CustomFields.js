import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Text from "../../components/Text";
import CustomFieldService from "../../services/CustomFieldService";
import DeleteModal from "../DeleteModal";
import Drawer from "../Drawer";
import DragAndDropTable from "./DragAndDropTable";
import TagSelect from "../TagSelect";

const CustomFields = (props) => {
  let { history, _toggle, isOpen, objectName, setIsOpen ,tagId} = props;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [rowValue, setRowValue] = useState("");
  const dispatch = useDispatch();

  let id = props?.match?.params?.id;
  useEffect(() => {
    getDetails();
  }, []);

  const deleteModelToggle = () => {
    setOpenDeleteModal(false);
    setRowValue("");
  };
  const getDetails = async () => {
    let params = {
      objectName: objectName,
      tagId:tagId?tagId:""
    };
    let response = await CustomFieldService.search(params);
    let data = response && response?.data && response?.data?.data;
    setData(data);
  };

  const typeOption = [
    {
      label: "Currency",
      value: "Currency",
    },
    {
      label: "Date",
      value: "Date",
    },
    {
      label: "File Upload",
      value: "FileUpload",
    },
    {
      label: "Text",
      value: "Text",
    },
    {
      label: "Location Select",
      value: "StoreSelect",
    },
    {
      label: "Text Area",
      value: "TextArea",
    },
  ];

  const modelBody = (
    <>
      <Text name="name" label="Name" />
      <Select name="type" label="Type" options={typeOption} />
    </>
  );

  const modelFooter = (
    <Button type="submit" label={rowValue && rowValue?.id ? "Save" : "Add"} />
  );

  const handleSubmit = async (values) => {

    let data = new FormData();
    data.append("name", values && values?.name ? values?.name : "");
    data.append("type", values && values?.type ? values?.type?.value : "");
    data.append("objectName", objectName);
    data.append("tagId",tagId?tagId:"")

    if (rowValue && rowValue?.id) {
      CustomFieldService.update(rowValue && rowValue?.id, data, (res) => {
        if (res) {
          _toggle();
          getDetails();
          setRowValue("");
        }
      });
    } else {
      await CustomFieldService.create(data, (res) => {
        if (res) {
          let params = {
            custom_form_id: id,
          };
          dispatch(
            fetchList(
              "customFormField",
              `${endpoints().customFieldAPI}/search`,
              1,
              25,
              params
            )
          );
          _toggle();
          getDetails();
          setRowValue("");
        }
      });
    }
  };

  const handleEdit = (row) => {
    _toggle();
    setRowValue(row);
  };

  const handleDelete = (row) => {
    setOpenDeleteModal(true);
    setRowValue(row);
  };

  const handleDeleteFunction = async (id) => {
    dispatch(
      await CustomFieldService.delete(id, (res) => {
        if (res) {
          deleteModelToggle();
          getDetails();
          setRowValue("");
        }
      })
    );
  };

  const initialValues = {
    name: rowValue && rowValue?.name ? rowValue?.name : "",
    type:
      rowValue && rowValue?.type
        ? typeOption.find((data) => data?.value === rowValue?.type)
        : "",
  };
  const toggle = () => {
    setRowValue("");
    setIsOpen(false);
  };

  return (
    <>
      <Drawer
        isModalOpen={isOpen}
        handleOpenModal={_toggle}
        handleDrawerClose={toggle}
        modelTitle={
          rowValue && rowValue?.id ? "Edit Custom Fields" : "Add Custom Fields"
        }
        DrawerBody={modelBody}
        DrawerFooter={modelFooter}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        hideDefaultButtons
      />

      <DeleteModal
        isOpen={openDeleteModal}
        toggle={deleteModelToggle}
        title="Delete Custom Form Field"
        deleteFunction={() => {
          handleDeleteFunction(rowValue && rowValue?.id);
        }}
        label={rowValue && rowValue?.name}
        id={rowValue && rowValue?.id}
      />

      <DragAndDropTable
        history={history}
        setData={setData}
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default CustomFields;
