import React, { useRef, useEffect } from "react";

const VideoCallComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Access the user's webcam
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false, // Set to true if you want audio
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();

    return () => {
      // Stop the video stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex h-screen w-screen bg-gray-800 text-white">
      {/* Video Container */}
      <div className="flex flex-col w-full h-full items-center justify-center bg-gray-900">
        {/* Video Feed */}
        <div className="relative w-[90%] h-[70%] border-4 border-gray-700 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted // Prevent audio feedback
          />
        </div>

        {/* User Name */}
        <p className="mt-4 text-lg font-medium">Dhruv</p>

        {/* Call Details */}
        <p className="mt-1 text-sm">8:14 PM | dta-dqtf-irg</p>

        {/* Controls */}
        <div className="flex mt-6 space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full">
            <i className="fas fa-microphone"></i>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
            <i className="fas fa-video"></i>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full">
            <i className="fas fa-phone-slash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallComponent;
