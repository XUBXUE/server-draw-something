const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send({
    data: "Hello World!",
  });
});
let users = [];
io.on("connection", (socket) => {
  console.log("New WS Connection..." + socket.id);
  // 当用户连接进来时
  socket.on("connected", (user) => {
    user.userId = socket.id;
    users.push(user);
    // 向连接进来的人发送所有玩家的列表
    socket.emit("getUsers", { users });
    // 向除了连接进来的其他的所有人发送新用户信息
    socket.broadcast.emit("newUser", { user });
  });
  socket.on("createGame", () => {
    
  });
  // 当链接用户断开连接后将此人从总人员名单里移除并同步
  socket.on("disconnect", () => {
    users = users.filter((v) => v.userId != socket.id);
    io.emit("getUsers", { users });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
