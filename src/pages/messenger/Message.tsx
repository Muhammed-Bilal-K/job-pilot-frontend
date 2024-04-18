import React from "react";
import "./Message.css";
import { formatDistanceToNow } from "date-fns";


interface MessageProps {
  own: any;
  message: any;
}

const Message: React.FC<MessageProps> = ({ own, message }) => {
  console.log(message);
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
  });

  return (
    <>
      <div
        className={own ? "messageCenter-message own" : "messageCenter-message"}
      >
        <div className="messageCenter-messageTop">
          <img
            className="messageCenter-messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <p className="messageCenter-messageText">{message.text}</p>
        </div>
        <div className="messageCenter-messageBottom">{timeAgo}</div>
      </div>
    </>
  );
};

export default Message;
