import React, { useEffect, useCallback, useState } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import LocalVideo from "../components/VideoPlayer";
import RemoteVideo from "../components/RemoteVideo";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  // User joined event handler
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  // Call user
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  // Incoming call handler
  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  // Send stream to peer
  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  // Call accepted handler
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  // Negotiation handlers
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  // Set up event listeners
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });

    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
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
    <div className="flex flex-col items-center h-screen  text-white">
      <div className="text-center w-full h-full">
        {/* <h1 className="text-4xl font-bold">Room Page</h1> */}
        {remoteSocketId ? (
          <div className=" h-full w-full">
            <RemoteVideo
              myStream={myStream}
              remoteStream={remoteStream}
              remoteSocketId={remoteSocketId}
              handleCall={handleCallUser}
            />
          </div>
        ) : (
          <LocalVideo />
        )}
      </div>

      {/* <div className="flex flex-wrap gap-8 justify-center">
        {myStream && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">My Stream</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ReactPlayer
                playing
                muted
                height="200px"
                width="300px"
                url={myStream}
              />
            </div>
          </div>
        )}
        {remoteStream && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Remote Stream</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ReactPlayer
                playing
                height="200px"
                width="300px"
                url={remoteStream}
              />
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default RoomPage;
