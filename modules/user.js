module.exports = function(io) {
  let users = []; //总人数
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
}
