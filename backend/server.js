const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

app.use(cors());
const server = http.createServer(app);

// socket.io=====
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// connecting backend to frontend
io.on("connection", socket => {
  console.log("succesfully connected", socket.id);

  // for entering
  socket.on("join_room", data => {
    socket.join(data);
    console.log(data);
  });

  // for sending messages
  socket.on("send_message", data => {
    socket.to(data.room).emit("received_msg", data);
    console.log(data.room);
  });

  socket.on("disconnect", () => {
    console.log("successfully disconnect", socket.id);
  });
});

server.listen(5000, err => {
  if (err) throw err;
  console.log("server is running on port 5000");
});
