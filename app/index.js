const express = require("express");
const http = require("http");
const socket = require("socket.io");
const WS = require("./socket");
const router = require('./router');

const app = express();
app.use(express.json());
router(app);

const server = http.createServer(app);
const io = socket(server);

WS(io);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.io = io;
