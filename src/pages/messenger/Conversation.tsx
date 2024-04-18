import React, { useEffect, useState } from "react";
import "./conversation.css";

interface ConversationProps {
  conv: any;
  currentUser : string;
}

const HandleSenderId = (c : any) => {
  console.log(c);
  localStorage.setItem("senderIdforMessage",c._id);
}

const Conversation: React.FC<ConversationProps> = ({ conv , currentUser }) => {
  const [user , setuser] = useState<{username : string }>({ username : "" });
  console.log(currentUser);
  console.log(conv);
  
  useEffect(()=>{
    const frinedId = conv.members.find((m: { _id: string }) => m._id !== currentUser);
    console.log(frinedId);
    setuser(frinedId);
  },[conv, currentUser])
  console.log(user);
  
  return (
    <div className="convenCenter-conversation" onClick={() => HandleSenderId(user)}>
      <img
        className="convenCenter-conversationImg"
        src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <span className="convenCenter-conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
