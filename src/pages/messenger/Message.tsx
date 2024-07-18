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

  console.log(message);
  

  return (
    <>
      <div
        className={own ? "messageCenter-message own" : "messageCenter-message"}
      >
        <div className="messageCenter-messageTop">
          <img
            className="messageCenter-messageImg"
            src="https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
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
