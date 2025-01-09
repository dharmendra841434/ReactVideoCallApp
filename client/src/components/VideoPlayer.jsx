import React, { useState, useEffect, useRef } from "react";
import ButtonsSection from "./ButtonsSection";

const LocalVideo = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [stream, setStream] = useState(null); // Store the video stream
  const videoRef = useRef(null);
  const [isMuteAudio, setIsMuteAudio] = useState(false);

  useEffect(() => {
    // Get the local video stream when the component mounts
    const getLocalStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setStream(localStream); // Save the stream in state
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
      } catch (error) {
        console.error("Error accessing local video stream:", error);
      }
    };

    getLocalStream();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Re-attach the stream when the video becomes visible again
    if (isVideoVisible && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isVideoVisible, stream]);

  // Toggle the visibility of the video
  const toggleVideoVisibility = () => {
    setIsVideoVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full h-full  ">
      <div className=" w-[96%] h-[96%] pt-4 rounded-lg  relative flex flex-col items-center bg-gray-400">
        {isVideoVisible ? (
          <video
            ref={videoRef}
            autoPlay
            muted={isMuteAudio}
            className=" w-full h-[85%] "
          ></video>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[85%]  text-gray-900">
            <div className=" bg-purple-400 px-12 py-10 rounded-full">
              <h1 className=" font-bold text-7xl ">D</h1>
            </div>
          </div>
        )}

        <ButtonsSection
          isVideoVisible={isVideoVisible}
          toggleVideo={toggleVideoVisibility}
          isMuteAudio={isMuteAudio}
          handleMuteAudio={() => setIsMuteAudio((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default LocalVideo;
