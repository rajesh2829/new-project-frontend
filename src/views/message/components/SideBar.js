import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import AddButton from "../../../components/AddButton";
import HorizontalSpace from "../../../components/HorizontalSpace";
import MessageCard from "../../../components/MessageCard";
import AddModal from "../../../components/Modal";
import SaveButton from "../../../components/SaveButton";
import Text from "../../../components/Text";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import MessageChannelService from "../../../services/MessageChannelService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import MessagesService from "../../../services/MessagesService";

const SideBar = (props) => {
  let { handleClick, handleGroupChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [userList, setUserList] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    getChannelList();
    getUserList();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let groupBody = <Text name="channel_name" label="Group Name" required />;

  let groupFooter = (
    <>
      <SaveButton type="submit" label={"Add"} />
    </>
  );

  const getChannelList = async () => {
    let response = await MessageChannelService.search();
    let data = response && response?.data && response?.data?.data;
    setChannelList(data);
  };

  const getUserList = async () => {
    let response = await MessagesService.search();
    let data = response && response?.data && response?.data?.data;
    setUserList(data);
  };

  const handleGroupAdd = async (values) => {
    let data = new FormData();
    data.append("channel_name", values && values?.channel_name);
    dispatch(
      await MessageChannelService.create(data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "groupList",
              `${endpoints().MessageChannelApi}/search`,
              1,
              10,
              {}
            )
          );
          getChannelList();
          toggle();
        }
      })
    );
  };

  return (
    <div className="mr-2">
      <AddModal
        toggle={toggle}
        toggleModalClose={toggle}
        isOpen={isOpen}
        modalTitle="Add Group"
        modalBody={groupBody}
        modalFooter={groupFooter}
        hideDefaultButtons
        onSubmit={handleGroupAdd}
        initialValues={{ channel_name: "" }}
        enableReinitialize
      />
      <div className="d-flex justify-content-between">
        <h3>Channels</h3>
        <FontAwesomeIcon
          size="2x"
          className="icon-pointer"
          color="#009dda"
          icon={faSquarePlus}
          onClick={() => {
            toggle();
          }}
        />
      </div>
      <div
        className="list-group"
        style={{
          overflow: channelList && channelList.length > 7 ? "scroll" : "",
          maxHeight: channelList && channelList.length > 7 ? "34.7%" : "",
        }}
      >
        {channelList &&
          channelList.length > 0 &&
          channelList.map((row) => (
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleGroupChange(row)}
            >
              <span>{row?.channel_name}</span>
            </Link>
          ))}
      </div>
      <HorizontalSpace bottom="2" />
      <hr></hr>
      <div className="d-flex justify-content-between">
        <h3>Direct Messages</h3>
        <FontAwesomeIcon
          size="2x"
          className="icon-pointer"
          color="#009dda"
          icon={faSquarePlus}
          onClick={() => {
            props.toggle && props.toggle();
          }}
        />
      </div>
      <div
        className="list-group"
        style={{
          overflow: userList && userList.length > 2 ? "scroll" : "",
          maxHeight: userList && userList.length > 2 ? "24.7%" : "",
        }}
      >
        {userList &&
          userList.length > 0 &&
          userList.map((row) => (
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleClick(row)}
            >
              <MessageCard
                first_name={row.first_name}
                last_name={row.last_name}
                url={row.media}
                last_message_time={row.recent_message_timestamp}
                recent_last_message={row.recent_last_message}
                read_at={row.read_at}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SideBar;
