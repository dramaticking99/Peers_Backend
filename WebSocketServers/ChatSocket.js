const ChatSocket = require("ws");

console.log("the code is reaching here")
const wss = new ChatSocket.Server( { port : 4000} , () => {
    console.log("Server is running")
});

wss.on('connection', ws => {
    console.log("New Client connected");

    ws.on('open', () => {
        ws.send('Hello From the server side');
    })

    ws.on('message', (data) => {
        
        console.log(data.toString())
    })

    ws.on('close', () => {
        console.log("Client has Disconnected");
    })
})

