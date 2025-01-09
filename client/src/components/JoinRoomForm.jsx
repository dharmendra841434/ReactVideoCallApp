import React, { useState } from "react";

const JoinRoomForm = ({ handleJoin, handleCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [activeTab, setActiveTab] = useState("join"); // 'join' or 'create'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "join") {
      handleJoin({ name, email, room });
    } else {
      handleCreate({ name, email, room });
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              activeTab === "join"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("join")}
          >
            Join Room
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              activeTab === "create"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Room
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {activeTab === "join" ? (
            <div className="mb-6">
              <label
                htmlFor="room"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Room ID
              </label>
              <input
                type="text"
                id="room"
                name="room"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter the room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="mb-6">
              <label
                htmlFor="room"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Room Name
              </label>
              <input
                type="text"
                id="room"
                name="room"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter the room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            {activeTab === "join" ? "Join Room" : "Create Room"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>By joining, you agree to our Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomForm;
