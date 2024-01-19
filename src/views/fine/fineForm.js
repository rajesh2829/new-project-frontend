import React from "react";
import DateSelector from "../../components/Date";
import UserSelect from "../../components/UserSelect";
import TagSelect from "../../components/TagSelect";
import Currency from "../../components/Currency";
import TextArea from "../../components/TextArea";
import DragAndDropField from "../../components/FileUpload";
import ObjectName from "../../helpers/ObjectName";
import MediaCarousel from "../../components/MediaCarousel";

const FineForm = (props) => {
  let { selectedFile, onDrop, handleDelete, finedata, TagList, rowValue, handleTagChange, editable } =
    props;
  return (
    <div>
      <div>
        <DateSelector
          name="date"
          label="Date"
          placeholder="Date"
          isClearable
          minWidth="160px"
          required
          disabled={editable}
        />
        <UserSelect label="User" required isDisabled={editable} />
        <TagSelect
          name="type"
          label="Type"
          placeholder="Type"
          params={{ type: "FineType" }}
          TagList={TagList}
          handleTagChange={handleTagChange}
          isDisabled={editable}
        />
        <Currency
          name="amount"
          label="Amount"
          placeholder="Amount"
          disabled={editable}
        />
        <DateSelector
          name="due_date"
          label="Due Date"
          placeholder="Date"
          isClearable
          minWidth="160px"
          disabled={editable}
        />
        <UserSelect label="Reviewer" name="reviewer" required isDisabled={editable} />
        <TextArea name="notes" label="Notes" placeholder="Enter Notes..." />
        {!rowValue && !finedata && (
          <DragAndDropField
            width="100%"
            height="100px"
            onDrop={onDrop}
            label="Upload File"
            selectedFile={selectedFile}
            handleDelete={handleDelete}
          />

        )}
        {rowValue && rowValue?.id && (
          <MediaCarousel
            showCarasoul
            objectName={ObjectName.FINE}
            objectId={rowValue && rowValue.id}
            history={props.history}
            attachmentsList={true}
            Attachments={"Attachments"}
          />
        )}
      </div>
    </div>
  );
};

export default FineForm;
