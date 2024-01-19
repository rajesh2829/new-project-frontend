import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import Media from "../helpers/Media";
import ObjectName from "../helpers/ObjectName";
import DateTime from "../lib/DateTime";
import Url from "../lib/Url";
import MediaService from "../services/MediaService";
import TicketService from "../services/TicketService";
import DateSelector from "./Date";
import DraftEditor from "./Draft";
import Drawer from "./Drawer";
import MediaCarousel from "./MediaCarousel";
import ProjectUserSelect from "./ProjectUserSelect";
import SaveButton from "./SaveButton";
import StoryPointSelect from "./StoryPointSelect";
import Text from "./Text";
import TicketType from "./TicketType";
import Toast from "./Toast";
import UserCard from "./UserCard";
import ProjectSelect from "./projectSelect";

const CreateTicketModel = (props) => {
  let {
    rowValue = null,
    name,
    setRowValue,
    handleCloseModal,
    buttonLabel,
    isModalOpen,
    setModalOpen,
    cloneValue = null,
    isEtaDisabled,
    recurring_task_id,
  } = props;

  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eta, setEtaChange] = useState(null);
  const [ticketType, setTicketType] = useState("");
  const [projectValue, setProjectValue] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageurl, setImageUrl] = useState([]);
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const [summaryValue, setSummaryValue] = useState("");
  const [assignee, setAssignee] = useState("");
  const [storyPoints, setStoryPoints] = useState();
  const [isSubmit, setIsSubmit] = useState(true);

  useEffect(() => {
    if (selectedFile) {
      getUrl();
    }
  }, [isLoading, selectedFile]);

  const getUserName = (avatarUrl, firstName, lastName) => {
    return (
      <div className="d-flex">
        <UserCard
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={avatarUrl}
        />
      </div>
    );
  };

  const toggle = () => {
    setProjectValue("");
    setTicketType("");
    setSelectedFile("");
    handleCloseModal();
    setImageUrl("");
    setEditorState("");
    setSummaryValue("");
    setAssignee("");
    setStoryPoints("");
    setIsSubmit(true);
    setModalOpen(!isModalOpen);
  };

  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
    setIsSubmit(true);
  };

  const getUrl = () => {
    let url = [];
    if (selectedFile && selectedFile.length > 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        const file = selectedFile[i];
        const imageUrl = URL.createObjectURL(file && file[0]);
        url.push({ url: imageUrl, image_id: file.id });
      }
      setImageUrl && setImageUrl(url);
    }
  };

  const handleImageRemove = async (deletedvalue) => {
    if (deletedvalue) {
      const updatedImageUrlArray = selectedFile.filter(
        (item) => item.id !== deletedvalue.image_id
      );
      await setIsLoading(true);
      setSelectedFile(updatedImageUrlArray);
      setImageUrl(updatedImageUrlArray)
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch();

  const initialValues = {
    summary: summaryValue
      ? summaryValue
      : rowValue?.summary
        ? rowValue?.summary
        : cloneValue?.summary
          ? cloneValue?.summary
          : "",
    description: "",
    type_id: ticketType
      ? {
        label: ticketType?.label,
        value: ticketType?.value,
      }
      : rowValue
        ? {
          label: rowValue?.ticketType,
          value: rowValue?.ticketTypeId,
        }
        : cloneValue
          ? {
            label: cloneValue?.type_name,
            value: cloneValue?.type_id,
          }
          : "",
    eta: eta
      ? eta
      : rowValue?.eta
        ? rowValue?.eta
        : DateTime.getDateTimeByUserProfileTimezone(new Date()),

    projectName: projectValue
      ? {
        label: projectValue?.label,
        value: projectValue?.value,
      }
      : rowValue
        ? {
          label: rowValue?.project,
          value: rowValue?.projectId,
        }
        : cloneValue
          ? {
            label: cloneValue?.projectName,
            value: cloneValue?.project,
          }
          : projectList && projectList?.find(
            (data) => data?.value == Url.GetParam("projectId")
          ),
    assignee_id: assignee
      ? {
        label: assignee?.label,
        value: assignee?.id,
      }
      : ticketType && ticketType?.assigneeName
        ? {
          label: ticketType?.assigneeName,
          value: ticketType?.assigneeId,
        }
        : rowValue
          ? {
            label: getUserName(
              rowValue?.avatarUrl,
              rowValue?.firstName,
              rowValue?.lastName
            ),
            value: rowValue?.assignee_id,
          }
          : cloneValue
            ? {
              label: getUserName(
                cloneValue?.assignee_url,
                cloneValue?.assignee,
                cloneValue?.lastName
              ),
              value: cloneValue?.assignee_id,
            }
            : "",
    story_points: storyPoints
      ? {
        label: storyPoints.label,
        value: storyPoints.value,
      }
      : ticketType && ticketType?.default_story_point
        ? {
          label: ticketType?.default_story_point,
          value: ticketType?.default_story_point,
        }
        : rowValue?.story_points
          ? {
            label: rowValue?.story_points,
            value: rowValue?.story_points,
          }
          : cloneValue?.story_points
            ? {
              label: cloneValue?.story_points,
              value: cloneValue?.story_points,
            }
            : "",
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const summaryChange = (x) => {
    let data = x?.target?.value;
    setSummaryValue(data);
  };

  const handleUserChange = (values) => {
    setAssignee(values);
  };

  const oninputProjectChange = (value) => {
    setProjectValue(value);
  };

  const uploadFile = async (objectId, showToastMessage = false) => {
    try {
      if (selectedFile && selectedFile.length > 0 && objectId) {
        for (let i = 0; i < selectedFile.length; i++) {
          const File = selectedFile[i];
          const mediaFile = File ? File[0] : "";
          const media = File[0]?.name;

          const data = new FormData();

          if (mediaFile) {
            data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
          }
          if (media !== undefined) {
            data.append([Media.MEDIA_NAME], media ? media : "");
          }
          data.append("object", ObjectName.TICKET);

          data.append("object_id", objectId);

          data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

          await MediaService.saveImage(data, showToastMessage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  let param = {
    pagination: true,
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
    sort: Url.GetParam("sort"),
    sortDir: Url.GetParam("sortDir"),
    user: Url.GetParam("user"),
    reporter: Url.GetParam("reporter"),
    sprint: Url.GetParam("sprint"),
    status: Url.GetParam("status"),
    group: Url.GetParam("group"),
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
    search: Url.GetParam("search"),
    page: Url.GetParam("page"),
    pageSize: Url.GetParam("pageSize"),
    recurring_task_id: recurring_task_id,
    projectId: Url.GetParam("projectId") !== undefined
      ? Url.GetParam("projectId")
      : Cookies.get(Cookie.PROJECT_ID)
  }

  const createTicket = async (value) => {
    setIsSubmit(false);
    try {
      const data = new FormData();
      data.append(
        rowValue && rowValue?.id ? "assignee" : "assignee_id",
        value && value?.assignee_id?.id
          ? value?.assignee_id?.id
          : value?.assignee_id?.value ? value?.assignee_id?.value : ""
      );
      data.append("eta", value.eta);
      data.append(
        "story_points",
        value && value?.story_points ? value?.story_points?.value : ""
      );

      let rawComment;
      if (editorState) {
        rawComment = JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        );
      }

      data.append("description", rawComment || "");
      data.append(
        "projectName",
        value?.projectName?.value ? value?.projectName?.value : ""
      );
      data.append(
        "projectId",
        projectValue && projectValue?.value
          ? projectValue?.value
          : cloneValue?.project
            ? cloneValue?.project
            : Url.GetParam("projectId")
      );
      data.append(
        "project",
        value && value?.projectName?.value ? value?.projectName?.value : ""
      );
      data.append("summary", value.summary);
      data.append(
        "type_id",
        value && value?.type_id?.value ? value?.type_id?.value : ""
      );
      if (value.etaTime) {
        const [date, time] = value.etaTime.split("T");

        const concatenatedDateTime = `${DateTime.formatDate(
          value.eta
        )}${""}T${""}${time}`;

        data.append("eta", concatenatedDateTime);
      }
      if (rowValue && rowValue?.id) {

        dispatch(
          TicketService.update(rowValue && rowValue?.id,
            data,
            {

            },
            (response) => {

              if (response) {

                dispatch(
                  fetchList("ticket", `${endpoints().ticketAPI}/search`, param.page ? param.page : 1, param.pageSize ? param.pageSize : 25, {
                    ...param
                  })
                );
                toggle();
                setRowValue && setRowValue("")
                setIsSubmit(true)
              }
            }
          )
        );
      } else {
        setIsSubmit(true);

        dispatch(
          TicketService.createTicket(
            data,
            {
              ...param
            },
            (response) => {
              if (response && response.data && response.data.ticketDetails) {
                uploadFile(response?.data?.ticketDetails?.id);
                toggle();
                setIsSubmit(true);
              }
              handleCloseModal();
            }
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageValue = (images) => {
    setIsLoading(true);
    setSelectedFile([...selectedFile, { ...images }]);
    setIsLoading(false);
  };

  const onDropImage = (images) => {
    handleImageValue({
      ...images,
      id: selectedFile.length + 1,
    });
  };

  const handleTicketTypeChange = (e) => {
    setTicketType(e.values.type_id);
  };

  const handleChange = ({ values }) => {
    setStoryPoints(values && values?.story_points);
  };

  const handleEtaChange = (e) => {
    setEtaChange(e);
  };

  // Add Ticket Form
  const DrawerBody = (
    <>
      <div className="row">
        <div className="col-12">
          <ProjectSelect
            label="Project"
            oninputProjectChange={oninputProjectChange}
            projectList={setProjectList}
          />
        </div>
        <div className="col-12">
          <TicketType
            name="type_id"
            handleTicketTypeChange={(e) => handleTicketTypeChange(e)}
            projectId={projectValue?.value || rowValue?.projectId}
            required
          />
        </div>
        <div className="col-12">
          <ProjectUserSelect
            label="Assignee"
            name="assignee_id"
            placeholder={"Select Assignee"}
            handleUserChange={handleUserChange}
            projectId={
              (projectValue && projectValue.value) || (rowValue?.projectId) ||
              (cloneValue && cloneValue?.project)
            }
            isDisabled={rowValue?.allow_for_assignee_change_permission == false ? true : false}
          />
        </div>
        <div className="d-flex col-12 p-0">
          <div className="col-6 pr-1">
            <DateSelector
              name="eta"
              label={"ETA"}
              placeholder="Select ETA"
              isClearable={!isEtaDisabled}
              disabled={isEtaDisabled}
              onChange={handleEtaChange}
            />
          </div>
          <div className="col-6 pl-1">
            <StoryPointSelect
              name="story_points"
              label="Story Points"
              placeholder="Select Story Points"
              onChange={(values) => {
                handleChange(values);
              }}
            />
          </div>
        </div>
        <div className="col-12">
          <Text
            name="summary"
            label="Summary"
            placeholder="Summary"
            onChange={summaryChange}
            required
          />
        </div>
        <div className="col-12">
          <div className="custom-description-container">
            <DraftEditor
              name="description"
              label={"Description"}
              editorState={
                editorState
                  ? editorState
                  : cloneValue?.description
                    ? EditorState.createWithContent(
                      convertFromRaw(JSON.parse(cloneValue?.description))
                    )
                    : name
              }
              onChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="col-12">
          {!rowValue && (
            <div className="col-12">
              <MediaCarousel
                showCarasoul
                Attachments
                onDropImage={onDropImage}
                imageUrl={imageurl}
                handleImageRemove={handleImageRemove}
                isLoading={isLoading}
              />
            </div>
          )}

          {rowValue && rowValue?.id && (
            <MediaCarousel
              showCarasoul
              objectName={ObjectName.TICKET}
              objectId={rowValue && rowValue.id}
              history={history}
              attachmentsList={true}
              Attachments={"Attachments"}
            />
          )}
        </div>
      </div>
    </>
  );

  // Ticket Footer
  const DrawerFooter = (
    <>
      <SaveButton
        type="submit"
        loading={isSubmit == false}
        label={rowValue?.id ? "Save" : "Create"}
      />
    </>
  );
  
  return (
    <>
      <Drawer
        modelTitle={
          rowValue?.id
            ? "Edit Ticket "
            : cloneValue
              ? "Clone Ticket"
              : "Create Ticket"
        }
        DrawerBody={DrawerBody}
        DrawerFooter={DrawerFooter}
        onSubmit={(values) => {
          createTicket(values);
        }}
        initialValues={initialValues}
        handleOpenModal={handleOpenModal}
        handleCloseModal={toggle}
        handleDrawerClose={toggle}
        isModalOpen={isModalOpen}
        buttonLabel={buttonLabel}
        showAddButton={props.showAddButton}
        enableReinitialize
      />
    </>
  );
};
export default CreateTicketModel;
