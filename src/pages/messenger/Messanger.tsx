import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Conversation from "./Conversation";
import { IoIosVideocam } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import Message from "./Message";
import "./Messanger.css";
import {
  getMessagesList,
  listConversation,
  sendMessageBySeperate,
} from "../../apis/chat";
import IMessage from "../../@types/interfaces/chat/message";
import { Socket, io } from "socket.io-client";

interface ConversationType {
  members: any;
  _id: string;
}

interface UserData {
  _id: string;
  username: string;
}

const Messanger: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [conver, setConver] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [online, getonline] = useState([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [companyName, setCompanyName] = useState<UserData>({
    _id: "",
    username: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket>();

  useEffect(() => {
    // socket.current = io("wss://jobpilot.dev");
    socket.current = io("wss://www.recardo.store");
    socket.current.on("connect", () => {
      console.log("Connected to Socket.IO server", socket.current?.id);
    });

    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        conversationId: currentChat?._id,
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Disconnected from Socket.IO server");
      }
    };
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat) {
      const matchingMember = currentChat.members.some(
        (member: { _id: any }) => member._id === arrivalMessage.sender
      );
      if (matchingMember) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (id && socket.current) {
      socket.current.emit("addUser", id);
      socket.current.on("getUsers", (users) => {
        getonline(users);
      });
    }
  }, [id, socket.current]);
  console.log(online);

  useEffect(() => {
    const fetchData = async () => {
      const respo = await listConversation(id!);
      setConver(respo.convo);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const respo = await getMessagesList(currentChat._id);
        setMessages(respo.convo);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSubmitMessage = async (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== "" && socket.current && id) {
      if (!currentChat) {
        return;
      }

      const message: IMessage = {
        sender: id,
        text: newMessage,
        conversationId: currentChat?._id,
      };

      if (currentChat) {
        const receiverId = localStorage.getItem("senderIdforMessage");
        socket.current.emit("sendMessage", {
          senderId: id,
          receiverId: receiverId,
          text: newMessage,
        });
      }

      try {
        const respo = await sendMessageBySeperate(message);
        setMessages([...messages, respo.message]);
        setNewMessage("");
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const frinedId = currentChat?.members.find(
      (m: { _id: string }) => m._id !== id
    );
    setCompanyName(frinedId);
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="Header-part-for-video">
        <h2 className="cursor-pointer text-2xl" onClick={()=>{
          const token = localStorage.getItem("Token");
          const emplo = localStorage.getItem("Emplo");
          if (token) {
            navigate('/');
          } else if(emplo){
            navigate('/employer/emplo-dash');
          }
        }} >JobPilot</h2>
      </div>
      <div className="MessageCenter-messenger">
        <div className="MessageCenter-chatMenu">
          <div className="MessageCenter-chatMenuWrapper">
            <input
              placeholder="Search for friends"
              className="MessageCenter-chatMenuInput"
            />
            <div>
              {conver.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conv={c} currentUser={id!} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="MessageCenter-chatBox">
          <div className="MessageCenter-chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="MessageCenter-chatBoxTop relative capitalize">
                  <div
                    className="text-2xl Show-the-messager-name-vedio-tag bg-blue-600 text-white fixed flex justify-between px-28 py-0"
                    style={{ width: "70%", padding: "15px 50px" }}
                  >
                    <div>
                      <h1>
                        {companyName ? companyName.username : "company Name"}
                      </h1>
                    </div>
                    <div className="flex justify-between">
                      <div className="mr-6">
                        <Link to={`/lobby`}>
                          <IoIosVideocam />
                        </Link>
                      </div>
                      <div>
                        <FaInfoCircle />
                      </div>
                    </div>
                  </div>
                  <div className="mt-20">
                    {messages.map((m) => (
                      <div key={m._id} ref={scrollRef}>
                        <Message
                          key={m._id}
                          own={m.sender === id}
                          message={m}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="MessageCenter-chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="MessageCenter-chatMessageInput"
                    placeholder="write something..."
                  ></textarea>
                  <button
                    onClick={handleSubmitMessage}
                    className="MessageCenter-chatSubmitButton"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span>open a conversation to start</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
