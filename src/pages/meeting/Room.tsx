import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/meetings/peer";
import { useSocket } from "../../context/SocketProvider";

const RoomPage: React.FC = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();

  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: string }) => {
      console.log(`Email ${email} joined room`);
      setRemoteSocketId(id);
    },
    []
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket?.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: { from: string; offer: any }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer.peer?.addTrack(track, myStream);
      }
    }
  }, [myStream, peer]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: any; ans: any }) => {
      console.log("incoming call", from, ans)
      peer.setLocalDescription(ans);
      sendStreams();
    },
    []
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer?.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer?.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: { from: any; offer: any }) => {
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: any }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    if (peer.peer) {
      peer.peer.addEventListener("track", async (ev: { streams: any }) => {
        const remoteStream = ev.streams;
        setRemoteStream(remoteStream[0]);
      });
    }
  }, []);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div style={{ backgroundColor: "#535353" }}>
      <h1 className="roompart-status">Room Page</h1>
      <h4 className="roompart-status">
        {remoteSocketId ? "Connected" : "No one in room"}
      </h4>

      <div className="roompart-video-container">
        {myStream && (
          <div className="roompart-video">
            <h1>My Stream</h1>
            <ReactPlayer
              style={{ padding: "40px", backgroundColor: "#414141" }}
              playing
              muted
              height="100%"
              width="100%"
              url={myStream}
            />
          </div>
        )}
        {remoteStream && (
          <div className="roompart-video">
            <h1>Remote Stream</h1>
            <ReactPlayer
              style={{ padding: "40px", backgroundColor: "#414141" }}
              playing
              muted
              height="100%"
              width="100%"
              url={remoteStream}
            />
          </div>
        )}
      </div>
      <div className="text-center">
        {remoteSocketId && (
          <button className="roompart-button" onClick={handleCallUser}>
            CALL
          </button>
        )}
        {myStream && (
          <button
            style={{
              backgroundColor: "#6e6ef3",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
            onClick={sendStreams}
          >
            Send Stream
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
