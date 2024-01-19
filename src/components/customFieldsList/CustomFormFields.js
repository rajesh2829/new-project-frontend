import React, { useState, useEffect } from "react";
import SaveButton from "../../components/SaveButton";
import DefaultContent from "../../components/content/defaultContent";
import DragAndDropField from "../../components/FileUpload";
import Currency from "../../components/Currency";
import Form from "../../components/Form";
import CancelButton from "../../components/CancelButton";
import DateSelector from "../../components/Date";
import FeatureImage from "../../components/Image";
import DeleteButton from "../../components/DeleteButton";
import Media from "../../helpers/Media";
import MediaService from "../../services/MediaService";
import DeleteModal from "../../components/DeleteModal";
import Label from "../../components/Label";
import NoRecordsFound from "../../components/NoRecordsFound";
import ArrayList from "../../lib/ArrayList";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import SelectStore from "../../components/SelectStore";
import String from "../../lib/String";
import CustomForm from "../../helpers/CustomForm";
import CustomFieldService from "../../services/CustomFieldService";

const CustomFormFields = (props) => {
  const [customFieldList, setCustomFieldList] = useState([]);

  const [uploadedImages, setUploadedImages] = useState(
    props.uplodedImages ? props.uplodedImages : []
  );

  const [openDeleteModal, setDeleteModal] = useState(false);

  const [selectedMediaId, setSelectedMediaId] = useState("");

  const { history, handleSubmit, objectName, tagId } = props;

  useEffect(() => {
    getCustomFormFieldList();
  }, []);

  const getCustomFormFieldList = async () => {
    const params = { objectName: objectName, tagId: tagId ? tagId : "" }
    let response = await CustomFieldService.search(params);

    if (response && response.data && response.data.data) {
      setCustomFieldList(response.data.data);
    }
  };

  const uploadFile = async (selectedFile) => {
    try {
      if (selectedFile) {
        const data = new FormData();

        const mediaFile = selectedFile ? selectedFile : "";

        const media = selectedFile?.name;

        if (mediaFile) {
          data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
        }

        if (media !== undefined) {
          data.append([Media.MEDIA_NAME], media ? media : "");
        }
        data.append("object", objectName);

        data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

        const response = await MediaService.saveImage(data);

        return response;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedFile = (id) => {
    try {
      let images = uploadedImages;

      if (images && images.length > 0) {
        let media = images.find((data) => data.fieldId == id);

        return media ? media : null;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectMediaFile = (id, mediaId, mediaUrl) => {
    try {
      let images = [...uploadedImages];

      if (images && images.length > 0) {
        let index = images.findIndex((data) => data.fieldId == id);

        if (index > -1) {
          images[index].value = mediaId ? mediaId : null;
          images[index].mediaUrl = mediaUrl ? mediaUrl : null;
          setUploadedImages(images);
        } else {
          images.push({
            fieldId: id,
            value: mediaId ? mediaId : null,
            mediaUrl: mediaUrl,
          });
          setUploadedImages(images);
        }
      } else {
        images.push({
          fieldId: id,
          value: mediaId ? mediaId : null,
          mediaUrl: mediaUrl,
        });
        setUploadedImages(images);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = async (id, selectedFile) => {
    let mediaDetail = await uploadFile(selectedFile && selectedFile[0]);
    if (mediaDetail) {
      onSelectMediaFile(id, mediaDetail.id, mediaDetail.mediaUrl);
    }
  };

  const deleteMedia = async () => {
    if (selectedMediaId) {
      MediaService.delete(selectedMediaId, () => {
        setSelectedMediaId("");
        if (uploadedImages && uploadedImages.length > 0) {
          let updatedArray = [...uploadedImages];
          const index = updatedArray.findIndex(
            (element) => element.value == selectedMediaId
          );
          updatedArray[index].value = "";
          updatedArray[index].mediaUrl = "";
          setUploadedImages(updatedArray);
        }
      });
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <DefaultContent>
          <DeleteModal
            id={selectedMediaId}
            label={selectedMediaId}
            isOpen={openDeleteModal}
            toggle={() => {
              setDeleteModal(false);
            }}
            title="Delete Media"
            deleteFunction={() => deleteMedia()}
          />

          <Form
            initialValues={props.initialValues}
            onSubmit={(value) => {
              value = String.convertPropertiesToJSON(value);

              let mediaValue;

              if (uploadedImages && uploadedImages.length > 0) {
                mediaValue = uploadedImages.reduce((acc, value) => {
                  acc[value.fieldId] = value.value;
                  return acc;
                }, {});
              }

              if (mediaValue) {
                Object.assign(value, mediaValue);
              }

              handleSubmit && handleSubmit(value);
            }}
          >
            {ArrayList.isNotEmpty(customFieldList) ? (
              customFieldList.map((data) => {
                let mediaDetail = getSelectedFile(data.id);

                return (
                  <>
                    {data.type == CustomForm.TYPE_FILE_UPLOAD && (
                      <div className="mt-3">
                        {mediaDetail && mediaDetail.mediaUrl ? (
                          <>
                            <div className="d-flex flex-column align-items-start">
                              <Label>{data.name}</Label>
                              <FeatureImage
                                size="large"
                                src={mediaDetail.mediaUrl}
                                alt={"No Image"}
                                className="img-fluid img-thumbnail"
                                maxHeight="200px"
                              />
                              <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                                <DeleteButton
                                  label="Remove"
                                  onClick={() => {
                                    setSelectedMediaId(mediaDetail.value);
                                    setDeleteModal(true);
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <DragAndDropField
                              label={data.name}
                              onDrop={(selectedFile) =>
                                onDrop(data.id, selectedFile)
                              }
                              width="50%"
                              height="80px"
                            />
                          </>
                        )}
                      </div>
                    )}

                    {data.type == CustomForm.TYPE_CURRENCY && (
                      <div className="w-50">
                        <Currency
                          className="w-50"
                          label={data.name}
                          name={data.id}
                        />
                      </div>
                    )}

                    {data.type == CustomForm.TYPE_DATE && (
                      <div className="w-50">
                        <DateSelector
                          label={data.name}
                          name={data.id}
                          isClearable
                        />
                      </div>
                    )}

                    {data.type == CustomForm.TYPE_TEXT && (
                      <div className="w-50">
                        <Text name={data.id} label={data.name} />
                      </div>
                    )}

                    {data.type == CustomForm.TYPE_TEXT_AREA && (
                      <div className="w-50">
                        <TextArea name={data.id} label={data.name} />
                      </div>
                    )}

                    {data.type == CustomForm.TYPE_STORE_SELECT && (
                      <div className="w-50">
                        <SelectStore name={data.id} label={data.name} />
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <>
                <NoRecordsFound
                  showMessage={true}
                  hideCard={true}
                  message="Add Custom Fields"
                />{" "}
              </>
            )}

            {ArrayList.isNotEmpty(customFieldList) && (
              <div className="mt-3">
                <SaveButton label="Save" />

                <CancelButton
                  onClick={() => {
                    history.goBack();
                  }}
                />
              </div>
            )}
          </Form>
        </DefaultContent>
      </div>
    </div>
  );
};

export default CustomFormFields;
