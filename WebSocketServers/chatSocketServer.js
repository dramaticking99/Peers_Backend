const { connection } = require('mongoose');
const chatSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const messageModal = require('../Models/Chat/messageModel');
const chatController = require('../Controller/chatController');

//Map to store the WebSocket Connection IDs and corresponding user_Id's
const connectionUserMap = new Map();


function setupWebbSocketServer(server) {
    const wss = new chatSocket.Server({server});

    wss.on('connection', function connection(ws){
        console.log('new chatSocket Client Created');

        // Generate a unique ID for the WebSocket connection
        const connectionId = generateUniqueId();

        // Store connection ID upon connection
        connectionUserMap.set(connectionId, null);

        ws.on('message', function incomming(message){
            console.log('Recieved Message:', message);

            //parse the incoming message
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.action === 'loadMessages') {
                try {
                    // Using the parsed message to get the sender_Id and receiver_Id
                    const user1 = new ObjectId(parsedMessage.sender_Id);
                    const user2 = new ObjectId(parsedMessage.receiver_Id);
        
                    const messages = messageModal.find({
                        $or: [
                            { sender_Id: user1, receiver_Id: user2 },
                            { sender_Id: user2, receiver_Id: user1 }
                        ]
                    })
                    .sort({ timeStamp: 1 })
                    .exec();
        
                    // Send the initial messages to the client
                    ws.send(JSON.stringify(messages));
                } catch (error) {
                    console.log("Error sending the initial batch of messages to the user");
                }
            }


        //handle incomming messages

             // If the message contains user ID, update the connectionUserMap
            const userId = parsedMessage.sender_Id;
            if (userId) {
                connectionUserMap.set(connectionId, userId);
            }

             const sender_Id = parsedMessage.sender_Id;
             const reciever_Id = parsedMessage.reciever_Id;
             const content =  parsedMessage.content;

            chatController.addMessage(content,sender_Id,reciever_Id) 
            .then(()=>{
                console.log('message added to the database');

                // Find the webSocket connection associated with the reciever ID
                wss.clients.forEach(function each(client){
                    if ( client != ws && client.readyState == chatSocket.OPEN){
                        const reciever_Id = parsedMessage.reciever_Id;
                        if (connectionUserMap.get(connectionId) == reciever_Id) {
                            // Send the message to the receiver
                            client.send(JSON.stringify(parsedMessage));
                        }
                    }
                })
            })
            .catch(error => {
                console.error('Error saving message to the database:', error);
            });
        });

        ws.on('close', function close(){
            console.log('chatSocket client disconnected');
            //Handle client disconnected
            //remove the collectionID When the user is disconnected
            connectionUserMap.delete(connectionId);
        });
    });
    console.log('Web server initialised');
}

function generateUniqueId() {
    // unique ID generation logic 
    return uuidv4();
}

module.exports = setupWebbSocketServer;