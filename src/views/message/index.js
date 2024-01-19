import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import Avatar from "../../components/Avatar";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";
import MessagesService from "../../services/MessagesService";
import CompanyUserService, { search } from "../../services/UserService";
import MessageBox from "./components/MessageBox";
import SideBar from "./components/SideBar";
import SideBarMobile from "./components/SideBarMobile";
import MessageDetailMobile from "./components/MessageDetailMobile";
import UserSelectList from "../../components/UserSelectList";
function Message() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [user, setUser] = useState([]);
  const [logUser, setLogUser] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [refresh, setRefresh] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [messageValue, setMessageValue] = useState();
  const [channelValue,setChannelValue]=useState(null)
  useEffect(() => {
    fetchData();
    getMessageList();
  }, [selectedUser]);
  const dispatch = useDispatch();
  const getMessageList = async (e) => {
    let params = {
      id: selectedUser && selectedUser,
    };
    let response = await MessagesService.search(params);
    let responseData = response.data.data;
    if (responseData) {
      setMessageValue(responseData && responseData[0]);
    }
  };

  const fetchData = async () => {
    let response = await MessagesService.getMessages(selectedUser);
    const receiverMessages = response.data.receiverMessages.map(
      (message, index) => ({
        message: message.message,
        isSender: false,
        timestamp: new Date(message.timestamp).getTime(), // Convert timestamp to milliseconds
      })
    );

    const senderMessages = response.data.senderMessages.map(
      (message, index) => ({
        message: message.message,
        isSender: true,
        timestamp: new Date(message.timestamp).getTime(), // Convert timestamp to milliseconds
      })
    );

    const allMessages = [...receiverMessages, ...senderMessages];
    allMessages.sort((a, b) => a.timestamp - b.timestamp); // Sort messages by timestamp
    setMessages(allMessages);
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() !== "") {
      setMessages([...messages, currentMessage]);

      setCurrentMessage("");
      let data = {
        message: currentMessage,
        reciever_user_id: selectedUser,
      };
      let response = await MessagesService.Create(data);
      if (response) {
        fetchData();
        getMessageList();
        dispatch(
          fetchList("navBar", `${endpoints().messageAPI}/search`, 1, 10)
        );
      }
    }
  };

  const handleUserClick = async (user) => {
    setSelectedUser(user && user?.id);
    setMessageValue(user);
    setIsOpen(false);
    setSelectedContact(user);
    setShowListPage(false);
  };
  
  const handleClick = async (user) => {
    getMessageList();
    setSelectedUser(user?.id);
    setIsOpen(false);
    setSelectedContact(user?.id);
    setShowListPage(false);
    if(user){

      dispatch(await MessagesService.update(user?.id,user?.recieverMessageId))
    }
    setChannelValue(null)
  };

  useEffect(() => {
    getUser();
    getLogedInUser();
    getMessageList();
  }, []);
  const getUser = async () => {
    const user = await search();
    setUser(user);
  };

  const getLogedInUser = async () => {
    const user = await CompanyUserService.search();
    setLogUser(user);
  };
  const toggle = (e) => {
    setIsOpen(!isOpen);
  };
  const refreshValue = async (e) => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  const Userlist = (
    <UserSelectList handleUserClick={handleUserClick}/>
  );

  const [selectedContact, setSelectedContact] = useState(null);
  const [showListPage, setShowListPage] = useState(true);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowListPage(false);
  };

  const handleBackClick = () => {
    setSelectedContact(null);
    setShowListPage(true);
  };

  const handleGroupChange =(rowValue)=>{
    setChannelValue(rowValue)
  }

  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle={"New"}
        modalBody={Userlist}
        hideDefaultButtons
      />
      <PageTitle
        label="Messages"
      />
      <div className=" d-none d-sm-flex">
        {/* Sidebar */}
        <SideBar
          userList={userList}
          toggle={toggle}
          handleClick={handleClick}
          handleGroupChange={handleGroupChange}
        />
        {/* Message Box */}
        <MessageBox
          messengerValue={messageValue}
          refreshValue={refreshValue}
          refresh={refresh}
          messages={messages}
          setCurrentMessage={setCurrentMessage}
          currentMessage={currentMessage}
          handleSendMessage={handleSendMessage}
          logUser={logUser}
          channelValue={channelValue}
        />
      </div>

      <div className="d-flex d-sm-none my-2">
        <div className="w-100">
          <div className="w-100">
            {showListPage && (
              <SideBarMobile
                onContactClick={handleContactClick}
                userList={userList}
                toggle={toggle}
                handleClick={handleClick}
                contacts={userList}
              />
            )}

            {!showListPage && (
              <MessageDetailMobile
                contact={selectedContact}
                messengerValue={messageValue}
                refreshValue={refreshValue}
                refresh={refresh}
                messages={messages}
                setCurrentMessage={setCurrentMessage}
                currentMessage={currentMessage}
                handleSendMessage={handleSendMessage}
                logUser={logUser}
                onBackClick={handleBackClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
