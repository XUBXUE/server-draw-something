const express = require("express");
const http = require("http");
const socket = require("socket.io");
const user = require("./modules/user.js");

const app = express();
const server = http.createServer(app);
const io = socket(server);

user(io);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.io = io;
