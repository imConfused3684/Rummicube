import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import config from "./config.js";
import userRoutes from "./routes/user-routes.js";
import Game from "./models/Game.js";

// const express = require('express');
// const cors = require('cors');
// const config = require('./config');
// const userRoutes = require('./routes/user-routes');
// const { Server } = require("socket.io");
// const http = require('http');

let game;


const app = express();

app.use(cors());
app.use(express.json()); // This is enough for parsing JSON

app.use('/api', userRoutes.routes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: config.frontendUrl,
      methods: ["GET", "POST"],
      credentials: true,
      optionsSuccessStatus: 204
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);

  game = new Game(io, socket);

  game.initializeGame();

});

server.listen(config.port, () => console.log(`Server is running on port ${config.port}`));