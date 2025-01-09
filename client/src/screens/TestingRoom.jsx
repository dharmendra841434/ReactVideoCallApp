import React from "react";

const VideoCallRoom = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Room Page</h1>
        <p className="text-lg font-medium">Connected</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <button className="px-6 py-3 bg-green-500 text-white rounded-md font-semibold shadow-lg hover:bg-green-600 transition">
          Send Stream
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold shadow-lg hover:bg-blue-700 transition">
          Call
        </button>
      </div>

      {/* Streams */}
      <div className="flex flex-col items-center gap-8 w-full max-w-5xl">
        {/* My Stream */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">My Stream</h2>
          <div className="w-64 h-36 bg-gray-800 rounded-md shadow-md overflow-hidden">
            {/* Replace with actual video stream */}
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            ></video>
          </div>
        </div>

        {/* Remote Stream */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Remote Stream</h2>
          <div className="w-64 h-36 bg-gray-800 rounded-md shadow-md overflow-hidden">
            {/* Replace with actual remote stream */}
            <video
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallRoom;
