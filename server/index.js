'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const { Server } = require("socket.io");
const http = require('http');


const app = express();

app.use(cors());
app.use(express.json()); // This is enough for parsing JSON

app.use('/api', userRoutes.routes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: config.frontendUrl
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(config.port, () => console.log("Server is running on port 3000"));