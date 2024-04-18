import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";

const LobbyScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
      socket?.emit("room:join", { email, room });
    console.log(email);
    console.log(room);
    
  }, [email , room , socket]);

  const handleJoinRoom = useCallback(
    (data : any) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="meeting-container">
      <div className="meeting-lobby-form">
        <h1>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
          <label className="meeting-label" htmlFor="email">Email ID</label>
          <input
            className="meeting-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="meeting-label" htmlFor="room">Room Number</label>
          <input
            className="meeting-input"
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button className="meeting-button" type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
