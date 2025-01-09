import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import VideoCallRoom from "./screens/TestingRoom";

function App() {
  return (
    <div className=" bg-sky-900 h-screen">
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/test" element={<VideoCallRoom />} />
      </Routes>
    </div>
  );
}

export default App;
