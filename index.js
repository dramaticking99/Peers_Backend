var app = require('./app');
const connection = require('./config/db');
const UserModel = require('./Models/userModel');

const http = require('http');
const WebSocket = require('ws');
//const setupWebbSocketServer = require('./WebSocketServers/chatSocketServer1');

const port = 27017;

app = app.get('/',(req,res)=>{
    res.send("Hello World");
})

app = app.listen(port, ()=>{
    console.log(`Server listening on port https://localhost:${port}`);
}) 

// const server = http.createServer(app)
// setupWebbSocketServer( app );
