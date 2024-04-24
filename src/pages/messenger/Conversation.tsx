import React, { useEffect, useState } from "react";
import "./conversation.css";
import { formatDistanceToNow } from "date-fns";

interface ConversationProps {
  conv: any;
  currentUser: string;
}

const HandleSenderId = (c: any) => {
  localStorage.setItem("senderIdforMessage", c._id);
};

const Conversation: React.FC<ConversationProps> = ({ conv, currentUser }) => {
  const [user, setuser] = useState<{ username: string }>({ username: "" });
  console.log(currentUser);
  console.log(conv);

  useEffect(() => {
    const frinedId = conv.members.find(
      (m: { _id: string }) => m._id !== currentUser
    );
    console.log(frinedId);
    setuser(frinedId);
  }, [conv, currentUser]);
  console.log(user);

  const timeAgo = formatDistanceToNow(new Date(conv.updatedAt), {
    addSuffix: true,
  });

  return (
    <div
      className="convenCenter-conversation"
      onClick={() => HandleSenderId(user)}
    >
      <img
        className="convenCenter-conversationImg"
        src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <div style={{width:"75%"}}>
        <span className="convenCenter-conversationName">{user?.username}</span>
        <div className="flex justify-between">
          <p style={{fontSize:"12px", fontWeight:"500"}}>{conv.latestMessage.split(' ').slice(0, 4).join(' ')}....</p>
          <p style={{fontSize:"12px"}}>{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
