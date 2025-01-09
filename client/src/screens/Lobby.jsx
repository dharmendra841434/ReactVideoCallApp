import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import JoinRoomForm from "../components/JoinRoomForm";

const LobbyScreen = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback((e) => {
    const { name, email, room } = e;
    // console.log(name, email, room);
    socket.emit("room:join", { email, room });
  }, []);

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className=" flex flex-col items-center">
      <div className=" py-10 flex flex-col items-center">
        <h1 className=" text-4xl font-bold  text-yellow-200">RoomTalk</h1>
        <h5 className=" text-sm   text-gray-300">
          Join RoomTalk To Connect with Peoples
        </h5>
      </div>
      <JoinRoomForm handleJoin={handleSubmitForm} handleCreate={() => {}} />
    </div>
  );
};

export default LobbyScreen;
