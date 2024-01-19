import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import CustomFormField from "../../helpers/CustomForm";
import CustomFieldValueService from "../../services/CustomFieldValueService";
import CustomFormFields from "./CustomFormFields";

const CustomForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [initialValues, setIntialValues] = useState({});

  const [uplodedImages, setUploadedImages] = useState([]);

  const { history, objectId, objectName, tagId } = props;

  useEffect(() => {
    getFormDataDetail();
  }, [objectId]);

  const getFormDataDetail = async () => {
    if (objectId) {
      setIsLoading(true);
      let params = { objectName: objectName, };
      let response = await CustomFieldValueService.get(objectId, params);
      if (response && response.data && response.data.data) {
        let customFieldDataList = response.data.data;

        let uploadedImages = new Array();

        let initialValues = new Object();

        if (customFieldDataList && customFieldDataList.length > 0) {
          for (let i = 0; i < customFieldDataList.length; i++) {
            if (
              customFieldDataList[i].type == CustomFormField.TYPE_FILE_UPLOAD
            ) {
              uploadedImages.push({
                fieldId: customFieldDataList[i].customFieldId,
                value: customFieldDataList[i].value,
                mediaUrl: customFieldDataList[i].mediaUrl,
              });
            }

            if (
              customFieldDataList[i].type == CustomFormField.TYPE_CURRENCY ||
              customFieldDataList[i].type == CustomFormField.TYPE_DATE ||
              customFieldDataList[i].type == CustomFormField.TYPE_TEXT ||
              customFieldDataList[i].type == CustomFormField.TYPE_TEXT_AREA
            ) {
              initialValues[customFieldDataList[i].customFieldId] =
                customFieldDataList[i].value;
            }

            if (
              customFieldDataList[i].type == CustomFormField.TYPE_STORE_SELECT
            ) {
              if (customFieldDataList[i].value) {
                initialValues[customFieldDataList[i].customFieldId] =
                  JSON.parse(customFieldDataList[i].value);
              }
            }
          }
          setUploadedImages(uploadedImages);
          setIntialValues(initialValues);
        }
      }
      setIsLoading(false);
    }
  };

  const handleSubmit = (values) => {
    let bodyData = {
      customFieldValues: values,
      objectId: objectId,
      objectName: objectName,
    };
    CustomFieldValueService.create(bodyData, (response) => { });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="pb-4">
        <CustomFormFields
          initialValues={initialValues}
          uplodedImages={uplodedImages}
          history={history}
          handleSubmit={handleSubmit}
          objectName={objectName}
          objectId={objectId}
          tagId={tagId}
        />
      </div>
    </div>
  );
};

export default CustomForm;
