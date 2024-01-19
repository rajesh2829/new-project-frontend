import React from "react";
import Avatar from "../../../components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MessageDetailMobile = (props) => {
    let {
        messengerValue,
        refreshValue,
        refresh,
        messages,
        setCurrentMessage,
        currentMessage,
        handleSendMessage,
        logUser,
        onBackClick
    } = props;

    return (
        <div className="bg-white " style={{ width: "100%" }}>

            <div
                className="d-flex justify-content-between py-4 px-1"
                style={{ backgroundColor: "#d2d4d2", width: "100%" }}>
                <div className="d-flex ml-3"> <button onClick={onBackClick} className="btn btn-primary mr-3">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                    <Avatar
                        id="avatar"
                        url={messengerValue?.media ? messengerValue?.media : messengerValue?.userImage}
                        firstName={messengerValue?.first_name}
                        lastName={messengerValue?.last_name}
                    />
                    <span className="mt-2 mx-2">
                        {messengerValue?.first_name
                            ? messengerValue?.first_name
                            : "" + " " + messengerValue?.last_name
                                ? messengerValue?.last_name
                                : ""}
                    </span>
                </div>
                <div onClick={refreshValue} className="btn btn-primary mx-3">
                    <span className={refresh ? "fa fa-sync fa-spin mt-2" : "fa fa-refresh mt-2"} />
                </div>
            </div>
            <div
                style={{
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column-reverse",
                    padding: "10px",
                    height: "calc(100vh - 80px)",
                }}
                className="tex-wrap mt-1">
                {messages &&
                    messages
                        .slice()
                        .reverse()
                        .map((senderReceiveMessage) =>
                            senderReceiveMessage.isSender ? (
                                <>
                                    <div
                                        className="mb-3 d-block text-wrap"
                                        style={{ wordWrap: " break-word", marginLeft: "70px" }}>
                                        {senderReceiveMessage.message}
                                    </div>

                                    <div className="d-flex ml-3">
                                        <Avatar
                                            id="avatar"
                                            url={logUser?.avatarUrl}
                                            firstName={logUser?.name}
                                            lastName={logUser?.lastName}
                                        />
                                        <span className="mx-2" style={{ fontWeight: "bold" }}>
                                            {logUser && logUser?.name}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="mb-3 d-block text-wrap"
                                        style={{ wordWrap: " break-word", marginLeft: "70px" }}>
                                        {senderReceiveMessage.message}
                                    </div>

                                    <div className="d-flex ml-3">
                                        <Avatar
                                            id="avatar"
                                            url={messengerValue?.media}
                                            firstName={messengerValue?.first_name}
                                            lastName={messengerValue?.last_name}
                                        />
                                        <span className="mt-2 mx-2" style={{ fontWeight: "bold" }}>
                                            {messengerValue?.first_name
                                                ? messengerValue?.first_name
                                                : "" + " " + messengerValue?.last_name
                                                    ? messengerValue?.last_name
                                                    : ""}
                                        </span>
                                    </div>
                                </>
                            )
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
                    disabled={!messengerValue}>
                    <i className="fa fa-paper-plane" />
                </button>
            </div>
        </div>
    );
};

export default MessageDetailMobile;
