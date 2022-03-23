const user = require('./user');
module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("New WS Connection..." + socket.id);
    user(socket, io);
    socket.on("createGame", () => {});
  });
};
