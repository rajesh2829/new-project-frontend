import React from "react";
import TextArea from "../../components/TextArea";
import DragAndDropField from "../../components/FileUpload";
import UserSelect from "../../components/UserSelect";
import ObjectName from "../../helpers/ObjectName";
import MediaCarousel from "../../components/MediaCarousel";

const GatePassForm = (props) => {
  const {
    onDrop,
    selectedFile,
    handleDelete,
    name,
    rowValue,
    editable,
    handleUserChange,
    user,
    setLogedInUser
  } = props;

  return (
    <>
      <div>
        <TextArea
          name="notes"
          label="Notes"
          placeholder="Notes"
          disabled={editable}
        />
        <UserSelect
          name="owner_id"
          label="Owner"
          showLoggedInUser
          setLogedInUser={setLogedInUser}
          handleUserChange={handleUserChange}
          selectedUserId={user ? user : rowValue?.owner_id}
        />
        <div className="w-100">
          {!rowValue && !rowValue?.id && (
            <DragAndDropField
              onDrop={onDrop}
              selectedFile={selectedFile}
              handleDelete={handleDelete}
              width="100%"
            />
          )}
          {rowValue && rowValue?.id && (
            <MediaCarousel
              showCarasoul
              objectName={ObjectName.GATE_PASS}
              objectId={rowValue && rowValue.id}
              history={props.history}
              attachmentsList={true}
              Attachments={"Attachments"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GatePassForm;
