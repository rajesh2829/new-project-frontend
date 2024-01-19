import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import UserSelect from "../components/UserSelect";
import CommentService from "../services/CommentService";
import DeleteModal from "./DeleteModal";
import DraftEditor from "./Draft";
import Drawer from "./Drawer";
import Link from "./Link";
import NoRecordsFound from "./NoRecordsFound";
import SaveButton from "./SaveButton";
import UserCard from "./UserCard";

const Comment = (props) => {
  let { objectId, objectName, maxHeight } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [comments, setComments] = useState("");
  const [userId, setUserId] = useState();
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const [messageId, setMessageId] = useState(null);
  const [name, setName] = useState(null);
  const [isSubmit, setIsSubmit] = useState(true);
  const [userData, setUserData] = useState()
  const [userList, setUserList] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    getComments();
  }, [objectId]);

  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <UserCard
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
      </div>
    );
  }

  const Toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true);
  };

  const closeToggle = () => {
    setIsOpen(!isOpen);
    setName("");
    setEditorState("");
    setMessageId(null);
    setIsSubmit(true);
  };

  const getComments = async () => {
    let params = {
        objectId: objectId,
        objectName: objectName,
      };
    const response = await CommentService.search(params);
    if (response && response.data) {
      setComments(response.data.data);
      setUserId(response.data.loggedInUserId);
    }
  };

  const AddMessage = async (values) => {
    try {
      setIsSubmit(true);
      let id = objectId;
      let rawComment;
      if (editorState) {
        rawComment = convertToRaw(editorState.getCurrentContent());
      }
      values.message = JSON.stringify(rawComment);
      values.objectName = objectName;
      if (!messageId) {
        await CommentService.add(id, values, (res) => {
          if (res) {
            setEditorState("");
            setMessageId(null);
            getComments();
            closeToggle();
            setName("");
          }
        });
      } else {
        CommentService.update(id, messageId, values);
        getComments();
        closeToggle();
        setName("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (messageId) => {
    let id = props.objectId;
    let data = {
      commentId: messageId,
      objectName: objectName,
    };
    await CommentService.delete(id, JSON.stringify(data));
    getComments();
  };


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleUserChange = (e) => {
    setUserData(e);
  }

  const modelBody = (
    <>
      <UserSelect
        name="user"
        label="User"
        userList={setUserList}
        handleUserChange={handleUserChange}
        isMulti
      />
      <DraftEditor
        List={true}
        placeholder={"Enter Message"}
        name="comment"
        editorState={editorState ? editorState : name}
        onChange={handleEditorChange}
      />
    </>
  );

  const modelFooter = (
    <SaveButton
      type="submit"
      label={messageId ? "Edit" : "Save"}
      className="h6-5-important"
      loading={isSubmit == false}
    />
  );

  let UsersValue = [];

  if (users) {

    users.forEach((result) => {
      UsersValue.push({
        id: result?.id,
        value: result?.first_name + " " + result?.last_name,
        label: getUserName(result?.media_url, result?.first_name, result?.last_name)
      });
    });
  }

  return (
    <>
      <Drawer
        modelTitle={messageId ? "Edit Comment" : "Add Comment"}
        DrawerBody={modelBody}
        DrawerFooter={modelFooter}
        onSubmit={(values) => {
          AddMessage(values);
        }}
        initialValues={{
          comment: "",
          user: (messageId ? UsersValue : props.ticketDetails ? ([userId == props?.assignee_id ? userList && userList.find((data) => data?.id == props?.reviewer_id) : userList && userList.find((data) => data?.id == props?.assignee_id)]) : props?.owner_id ?  [userList && userList.find((data) => data?.id == props?.owner_id)] :  [userList && userList.find((data) => data?.isLogedInUser == true)])
        }}
        handleOpenModal={
          Toggle
        }
        handleCloseModal={closeToggle}
        handleDrawerClose={closeToggle}
        isModalOpen={isOpen}
        enableReinitialize
      />


      <DeleteModal
        isOpen={openDeleteModal}
        toggle={() => {
          setOpenDeleteModal(false);
        }}
        title="Delete Message"
        deleteFunction={() => {
          handleDelete(deleteMessage.id);
        }}
        text="the comment"
        id={deleteMessage.id}
      />
      <div className="d-flex justify-content-end">
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            Toggle();
          }}
          decoration={false}
          text="Add Comment"
        />
      </div>
      <div
        style={{
          maxHeight: maxHeight ? maxHeight : "400px",
          overflowY: "auto",
        }}
      >
        {comments ? (
          comments.length > 0 &&
          comments.map((comment, index) => (
            <div className="card p-2 overFlow-y" key={index}>
              <div>
                <div className="flex-row">
                  <div className="font-weight-bold">
                    <UserCard
                      id="avatar"
                      customSize={parseInt(35, 10)}
                      url={comment?.media_url}
                      firstName={comment?.first_name}
                      lastName={comment?.last_name}
                      timestamp={comment?.timestamp}
                    />
                  </div>
                </div>
                <div
                  className="row d-flex flex-row"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {comment &&
                    comment?.users.length > 0 &&
                    comment?.users.map((user) => (
                      <div className="flex-grow-0 font-weight-bold col" >
                        <UserCard
                          id="avatar"
                          customSize={parseInt(20, 10)}
                          url={user?.media_url}
                          firstName={user?.first_name}
                          lastName={user?.last_name}
                          fontSize="12px"
                          minWidth="max-content"
                        />
                      </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="w-100">
                    <DraftEditor
                      List={true}
                      readOnly
                      hideOutLine
                      placeholder={"Enter Message..."}
                      name="comment"
                      editorState={
                        comment?.comment &&
                        EditorState.createWithContent(
                          convertFromRaw(JSON.parse(comment?.comment))
                        )
                      }
                      height
                    />
                  </div>
                  {comment?.userId == userId && (
                    <div className="d-flex ">
                      <div
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          setMessageId(comment?.id);
                          setUsers(comment?.users)
                          setName(
                            comment?.comment &&
                            EditorState.createWithContent(
                              convertFromRaw(JSON.parse(comment?.comment))
                            )
                          );
                          Toggle();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="sm"
                          color="text-dark"
                        />
                      </div>
                      <div
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setDeleteMessage(comment);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="sm"
                          color="text-dark"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <NoRecordsFound showMessage boldMessage="No comments added yet" />
          </>
        )}
      </div>
    </>
  );
};
export default Comment;
