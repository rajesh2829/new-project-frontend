import React from "react";
import ChannelMessage from "./ChannelMessage";
import DirectMessage from "./DirectMessage";

const MessageBox = (props) => {
  let {
    channelValue
  } = props;
  


  return (
    <div className='bg-white ' style={{ width: '100%' }}>
      {/* Group chat */}
      {channelValue && (
        <ChannelMessage {...props}/>
      )}

      {/* Direct Chat */}
      {!channelValue && <DirectMessage {...props} />}
    </div>
  );
};

export default MessageBox;
