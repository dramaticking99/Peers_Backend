const express = require('express');
const cors = require('cors');
const http = require('http');
const body_parser = require('body-parser')
const setupWebbSocketServer = require('./WebSocketServers/chatSocketServer1')
const userRouter = require('./Router/userRouter');
const postRouter = require('./Router/postRouter');
const reelRouter = require('./Router/reelRouter');
const chatRouter = require('./Router/chatRouter');

const app = express();

//enable cors for all routes
app.use(cors());

app.use(body_parser.json());

app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/reels',reelRouter);
app.use('/chat',chatRouter);

// creating a HTTP server using a express application (app) then using the server to initialise a web socket server
//const server = http.createServer(app);
//setupWebbSocketServer( server );

module.exports = app;

