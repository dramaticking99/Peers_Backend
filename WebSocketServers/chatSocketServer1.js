const ChatSocket = require('ws');
const chatController = require('../Controller/chatController')

const clients = new Set();

function setupWebbSocketServer(server) {
    console.log("the setupWebSocketServer function is called");
    const wss = new ChatSocket.Server({ port: 3001 }, () => {
        console.log("the ChatSocket Server is running")

        //way to implement the mapping of user_ID With the connection ID in the Notes

        // for now, for testing purposes brodcasting the message to everybody 

        wss.on('connection', function connection(ws) {

            clients.add(ws);

            console.log("New Client Connected")

            ws.on('error', console.error);

            ws.on('message', function message(data) {
                const parsedMessage = JSON.parse(data);

                let content = parsedMessage.content;
                let sender_Id = parsedMessage.sender_Id;
                let receiver_Id = parsedMessage.receiver_Id;

                console.log(sender_Id)

                // Create a fake req object with a body property
                const fakeReq = {
                    body: {
                        sender_Id,
                        receiver_Id,
                        content
                    }
                };

                // Define a fake res object with dummy methods
                const fakeRes = {
                    json: function (data) {
                        console.log('Fake response json:', data);
                    },
                    send: function (data) {
                        console.log('Fake response send:', data);
                    },
                };

                // Pass the fake req and res objects along with the message data to the addMessage function
                chatController.addMessage(fakeReq, fakeRes, null);

                const jsonString = `{
                    "content" : "${content}",
                    "sender_Id" : "${sender_Id}",
                    "reciever_Id" : "${receiver_Id}"
                }`
                
                console.log(jsonString);
                
                broadcast(jsonString)
                
            });

            ws.send("the connection is now open");
        });
    });
}

// Function to broadcast a message to all connected clients
function broadcast(message) {
    clients.forEach(function(client) {
        // Check if the client is still open
        if (client.readyState === ChatSocket.OPEN) {
            // Send the message to the client
            client.send(message);
        }
    });
}

module.exports = setupWebbSocketServer;