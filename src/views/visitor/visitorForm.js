import React from "react";
import Phone from "../../components/Phone";
import TagSelect from "../../components/TagSelect";
import TextArea from "../../components/TextArea";
import DragAndDropField from "../../components/FileUpload";
import Text from "../../components/Text";
import DateSelector from "../../components/Date";

const VisitorForm = (props) => {
  const {
    onDrop,
    selectedFile,
    handleDelete,
    name,
    TagList,
    rowValue,
    editable,
  } = props;
  return (
    <>
      <div>
        {rowValue?.id &&
          <DateSelector
            showTimeSelect
            label="Date"
            name="date"
            format="dd-MMM-yyyy hh:mm aa"
            disabled />
        }
        <TagSelect
          name="type"
          label="Visitor Type"
          placeholder="Visitor Type"
          params={{ type: "Visitor Type" }}
          TagList={TagList}
          required={true}
          isDisabled={editable}
        />
        <Text
          name="visitor"
          label="Name"
          placeholder="Visitor"
          required
          disabled={editable}
        />
        <Phone
          name="mobileNumber"
          label="Phone Number"
          placeholder="Phone Number"
          error=""
          disabled={editable}
        />
        <Text
          name="purpose"
          label="Purpose"
          placeholder="Purpose"
          required
          disabled={editable}
        />
        <TextArea
          name="notes"
          label="Notes"
          placeholder="Notes"
          disabled={editable}
        />
        <div className="w-100">
          {!rowValue?.media_url && !name && (
            <DragAndDropField
              onDrop={onDrop}
              selectedFile={selectedFile}
              handleDelete={handleDelete}
              width="100%"
            />
          )}
          {rowValue &&
            rowValue?.id &&
            (console.log(rowValue),
              (
                <div className="w-100 d-flex justify-content-center">
                  <img src={rowValue?.media_url} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default VisitorForm;
