import React from "react";
import { IoMic, IoMicOff } from "react-icons/io5";
import {
  HiMiniVideoCamera,
  HiOutlineHandRaised,
  HiMiniVideoCameraSlash,
} from "react-icons/hi2";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineScreenShare, MdOutlineCallEnd } from "react-icons/md";

const ButtonsSection = ({
  toggleVideo,
  isVideoVisible,
  remoteSocketId,
  handleCall,
  isMuteAudio,
  handleMuteAudio,
}) => {
  return (
    <div className="flex justify-center my-2 items-center space-x-4 bg-gray-800 p-4 rounded-lg">
      {/* Buttons */}
      <button
        onClick={handleMuteAudio}
        className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full text-white"
      >
        {isMuteAudio ? (
          <IoMicOff className=" text-3xl" />
        ) : (
          <IoMic className=" text-3xl" />
        )}
      </button>
      <button
        onClick={toggleVideo}
        className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full text-white"
      >
        {isVideoVisible ? (
          <HiMiniVideoCamera className=" text-2xl" />
        ) : (
          <HiMiniVideoCameraSlash className=" text-2xl" />
        )}
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full text-white">
        <BsEmojiSmile className=" text-2xl" />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full text-white">
        <MdOutlineScreenShare className=" text-2xl" />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full text-white">
        <HiOutlineHandRaised className=" text-2xl" />
      </button>
      <button className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full text-white">
        <BsThreeDotsVertical className=" text-2xl" />
      </button>

      {remoteSocketId && (
        <button
          onClick={handleCall}
          className="flex items-center justify-center w-12 h-12 bg-green-400 hover:bg-green-700 rounded-full text-white"
        >
          <MdOutlineCallEnd className=" text-2xl" />
        </button>
      )}
    </div>
  );
};

export default ButtonsSection;
