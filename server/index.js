const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

// Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing; restrict in production
    methods: ["GET", "POST"],
  },
});

// Maps for tracking connections
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// Handle Socket.IO Connections
io.on("connection", (socket) => {
  //console.log(`Socket Connected: ${socket.id}`);

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    //console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    // console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    const email = socketidToEmailMap.get(socket.id);
    emailToSocketIdMap.delete(email);
    socketidToEmailMap.delete(socket.id);
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

// Create a Testing Route
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).send(`Server running healthy`);
});

app.post("/test-emit", (req, res) => {
  const { event, data, room } = req.body;

  if (room) {
    io.to(room).emit(event, data);
    return res.status(200).send(`Event '${event}' emitted to room '${room}'`);
  } else {
    io.emit(event, data);
    return res.status(200).send(`Event '${event}' emitted globally`);
  }
});

// Start the Server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
