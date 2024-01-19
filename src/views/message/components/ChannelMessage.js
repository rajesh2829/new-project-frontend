import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddButton from "../../../components/AddButton";
import Avatar from "../../../components/Avatar";
import AddModal from "../../../components/Modal";
import SaveButton from "../../../components/SaveButton";
import UserSelect from "../../../components/UserSelect";
import ChannelMessagesService from "../../../services/ChannelMessageService";
import MessageChannelUser from "../../../services/MessageChannelUser";

const ChannelMessage=(props)=> {

    let { channelValue } =props;
    const [isOpen, setIsOpen]=useState(false);

const [currentMessage,setCurrentMessage]=useState("")
const [messages, setMessages]= useState([])
    const dispatch = useDispatch()

    useEffect(() => {
      getChannelMessagesList()
    }, [channelValue])

    useEffect(() => {
      getChannelMessagesList()
    }, [])
    

    const toggle =()=>{
        setIsOpen(!isOpen)
    }

    const getChannelMessagesList=async ()=>{
      let params={
      channel_id: channelValue && channelValue?.channel_id
      }
      let response = await ChannelMessagesService.search(params);
      let data = response && response?.data;
      setMessages(data)
    }

    // User Add Section
    let userFormBody = (
      <>
        <UserSelect name="channel_user" label="Channel User" required />
      </>
    );
    let userFormFooter = (
      <>
        <SaveButton type="submit" label={"Add"} />
      </>
    );

    const handleUserAdd = async (values) => {
      let data = new FormData();
      data.append(
        "channel_user",
        values && values?.channel_user && values?.channel_user?.id
      );
      data.append("channel_id", channelValue && channelValue?.channel_id);
      dispatch(await MessageChannelUser.create(data,(res)=>{
        if(res){
          toggle();
        }
      }));
    };


    const handleSendMessage = async () => {
      if(currentMessage && currentMessage !==""){
      let data = new FormData();
      data.append("message", currentMessage);
      data.append("channel_id", channelValue && channelValue?.channel_id);
      let messageResponse = await ChannelMessagesService.Create(data);
      if (messageResponse) {
        getChannelMessagesList()
        setCurrentMessage("")
      }
    }
    };

  return (
    <>
      <AddModal
        toggle={toggle}
        toggleModalClose={toggle}
        isOpen={isOpen}
        modalTitle="Add Group"
        modalBody={userFormBody}
        modalFooter={userFormFooter}
        hideDefaultButtons
        onSubmit={handleUserAdd}
        initialValues={{ channel_user: "" }}
        enableReinitialize
      />
      <div
        className="d-flex justify-content-between p-4"
        style={{ backgroundColor: "#d2d4d2", width: "100%" }}
      >
        <h3>{channelValue?.channel_name}</h3>
        <AddButton
          label="Add User"
          onClick={() => {
            toggle();
          }}
        />
      </div>

      <div
        style={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
          padding: "10px",
          height: "calc(100vh - 80px)",
        }}
        className="tex-wrap mt-1"
      >
        {messages &&
          messages.length > 0 && messages
            .map((messagesValue) =>
                <>
                  <div
                    className="mb-3 d-block text-wrap"
                    style={{ wordWrap: " break-word", marginLeft: "70px" }}
                  >
                    {messagesValue.message}
                  </div>

                  <div className="d-flex ml-3">
                    <Avatar
                      id="avatar"
                      url={messagesValue?.media_url}
                      firstName={messagesValue?.first_name}
                      lastName={messagesValue?.last_name}
                    />
                    <span className="mt-2 mx-2" style={{ fontWeight: "bold" }}>
                      {messagesValue?.first_name
                          ? messagesValue?.first_name
                          : "" + " " + messagesValue?.last_name
                            ? messagesValue?.last_name
                            : ""}
                    </span>
                  </div>
                </>
            )}
      </div>
      <div className="d-flex mb-1">
        <input
          className=" p-3 fs-5"
          type="text"
          style={{ width: "100%" }}
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />

        <button
          style={{
            padding: "20px",
            backgroundColor: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={handleSendMessage}
          >
          <i className="fa fa-paper-plane" />
        </button>
      </div>
    </>
  );
}

export default ChannelMessage
