import React, { useState, useEffect, useRef } from "react";
import ButtonsSection from "./ButtonsSection";
import ReactPlayer from "react-player";

const RemoteVideo = ({
  myStream,
  remoteStream,
  remoteSocketId,
  handleCall,
}) => {
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [stream, setStream] = useState(null); // Store the video stream
  const videoRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center  w-full h-full  ">
      <div className=" w-[96%] h-[96%] pt-4 rounded-lg  relative flex flex-col items-center bg-gray-400">
        {isVideoVisible ? (
          <ReactPlayer
            playing
            muted
            height="550px"
            width="700px"
            url={myStream}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[85%]  text-gray-900">
            <div className=" bg-purple-400 px-12 py-10 rounded-full">
              <h1 className=" font-bold text-7xl ">D</h1>
            </div>
          </div>
        )}
        <div className=" absolute top-7  right-[2%] border border-purple-800 rounded-lg h-[80%] px-4 ">
          <div className=" grid grid-cols-2 gap-2 ">
            <ReactPlayer
              playing
              muted
              height="150px"
              width="150px"
              url={remoteStream}
            />
            {/* <ReactPlayer
              playing
              muted
              height="150px"
              width="150px"
              url={remoteStream}
            /> */}
          </div>
        </div>

        <ButtonsSection
          isVideoVisible={isVideoVisible}
          toggleVideo={() => setIsVideoVisible((prev) => !prev)}
          remoteSocketId={remoteSocketId}
          handleCall={handleCall}
        />
        {/* <button 
          onClick={toggleVideoVisibility}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          {isVideoVisible ? "Hide Video" : "Show Video"}
        </button> */}
      </div>
    </div>
  );
};

export default RemoteVideo;
