const {
  getUsers,
  addUser,
  getUserById,
  deleteUserById,
} = require("../model/User");
module.exports = function (socket, io) {
  // 当用户连接进来时
  socket.on("connected", (user) => {
    user.id = socket.id; // 设置用户id
    user.userStatus = '0'; // 0为空闲 1为游戏中

    addUser(user)
      .then(() => {
        // 向除了连接进来的其他的所有人发送新用户信息
        socket.broadcast.emit("newUser", { user });
        getUsers().then((users) => {
          // 向连接进来的人发送所有玩家的列表
          socket.emit("getUsers", { users });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // 当链接用户断开连接后将此人从总人员名单里移除并同步
  socket.on("disconnect", async () => {
    console.log("close-------------------", socket.id);
    getUserById(socket.id)
      .then(async () => {
        await deleteUserById(socket.id);
        getUsers().then((users) => {
          io.emit("getUsers", { users });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
