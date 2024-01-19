import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteModal from "../../../components/DeleteModal";
import Form from "../../../components/Form";
import Hint from "../../../components/Hint";
import HorizontalSpace from "../../../components/HorizontalSpace";
import SaveButton from "../../../components/SaveButton";
import TagSelect from "../../../components/TagSelect";
import Text from "../../../components/Text";
import TextArea from "../../../components/TextArea";
import TrainingService from "../../../services/TrainingService";
import DragAndDropField from "../../../components/FileUpload";
import TrainingCard from "./TraniningCard";
import TagService from "../../../services/TagService";

const BasicTab = (props) => {
  let { history, id, openDeleteModal, setOpenDeleteModal } = props;
  const [imageValue, setImageValue] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [imageFile, setImageFile] = useState();
  const [tagList, setTagList] = useState([]);

  const dispatch = useDispatch();

  const [detail, setDetail] = useState([]);

  let removeImageProps = imageValue
    ? true
    : imageValue !== "" && detail?.banner_image
      ? true
      : false;

  useEffect(() => {
    getTrainingDetails();
  }, []);

  useEffect(() => {
    getTagList();
  }, [detail]);

  useEffect(() => {
    if (detail?.category) {
      getTrainingDetails();
    }
  }, [selectedFile]);

  const getTagList = async () => {
    let tagList = await TagService.getOption();
    setTagList(tagList);
  }

  const getTrainingDetails = async () => {
    let { data } = await TrainingService.get(id);
    setDetail(data);
  };

  const onChangeImageHandler = (e) => {
    let file = e?.target?.files ? e?.target?.files[0] : "";
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageValue(reader.result);
    };
  };

  const trainingImageRemove = async () => {
    setImageFile("");
    setImageValue("");
  };

  const onDrop = (acceptedFile) => {
    if (acceptedFile && acceptedFile.length > 0) {
      setSelectedFile(acceptedFile[0]);
    }
  };

  const handleSubmit = async (values) => {
    let data = new FormData();
    data.append("id", id && id);
    data.append(
      "training_name",
      values && values?.training_name ? values?.training_name : ""
    );
    data.append(
      "description",
      values && values?.description ? values?.description : ""
    );
    data.append(
      "category",
      values && values?.category ? values?.category?.value : ""
    );
    data.append("banner_image", imageFile !== undefined ? imageFile : null);
    data.append(
      "course_file",
      selectedFile !== undefined ? selectedFile : null
    );
    await TrainingService.update(id, data);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    if (event) {
      setSelectedFile("");
    }
  };

  const HandleDelete = async () => {
    dispatch(
      await TrainingService.delete(id, (res) => {
        if (res) {
          history.push("/training");
        }
      })
    );
  };

  let cardValue = {
    training_name: detail?.training_name,
    banner_image:
      imageValue !== undefined
        ? imageValue
        : detail
          ? detail?.banner_image
          : "",
    description: detail?.description,
  };

  let initialValues = {
    training_name: detail?.training_name,
    category: detail?.category
      ? tagList.find((data) => data.id == detail?.category)
      : "",
    description: detail?.description,
  };

  return (
    <>
      <DeleteModal
        isOpen={openDeleteModal}
        title="Delete Training"
        toggle={() => {
          setOpenDeleteModal(false);
        }}
        label={id}
        deleteFunction={HandleDelete}
      />
      <div className="card card-body">
        <Form
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}>
          <div className="d-flex w-100">
            <div className="w-100">
              <Text name="training_name" label="Course Title" />
              <TagSelect
                name="category"
                label="Category"
                placeholder="Select Category"
                params={{ type: "Training Category" }}
              />
              <Hint hintText="The type of category you want to add course" />
              <TextArea
                name="description"
                label="Course Description"
                placeholder="Enter Course Description..."
                className="mt-4"
              />

              <div className="d-flex bd-highlight">
                <div className="p-2 w-100 bd-highlight">
                  <div className="d-inline-block mt-3 ml-1">
                    <input
                      name="file"
                      className="form-control d-none"
                      type="file"
                      id="trainingImage"
                      placeholder="Banner Image"
                      accept="image/png,image/gif,image/jpeg"
                      onChange={(e) => onChangeImageHandler(e)}
                    />

                    <span className="d-block ">
                      <label
                        htmlFor="trainingImage"
                        className="profile-img-sm mb-0">
                        <span className="text-decoration-none cursor-pointer text-primary">
                          Upload Card Image
                        </span>
                      </label>
                    </span>
                  </div>
                  {removeImageProps ? (
                    <span
                      className="text-decoration-none cursor-pointer text-primary text-danger ml-md-1"
                      onClick={trainingImageRemove}>
                      (Remove)
                    </span>
                  ) : (
                    ""
                  )}

                  <div className="field-wrapper mb-3 ml-1">
                    <small className={`text-danger mt-3 ${"d-none"}`}>
                      Please select a image file
                    </small>

                    <Hint
                      id="bannerRequirements"
                      hintText="We recommended using 400 x 400 image"
                    />
                  </div>
                  <DragAndDropField
                    onDrop={onDrop}
                    selectedFile={selectedFile}
                    label="Upload Course Syllabus File"
                    handleDelete={handleDelete}
                    initialValue={
                      selectedFile == undefined
                        ? detail && detail?.course_file
                        : ""
                    }
                  />
                  <HorizontalSpace bottom="2">
                    <SaveButton label="Save" />
                  </HorizontalSpace>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <TrainingCard
                list={cardValue}
                className="training-card"
                disableLink
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default BasicTab;
