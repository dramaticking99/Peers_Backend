const { createDiffieHellmanGroup } = require('crypto');
const messageModel = require('../Models/Chat/messageModel');
const { ObjectId } = require('mongoose').Types;
const fs = require('fs')

class MessageServices{
    static async addMessage(sender_Id,reciever_Id,content,timeStamp){
        try{
            const addMessage = new messageModel({sender_Id,reciever_Id,content,timeStamp})
            return await addMessage.save();

        } catch(error){
            throw(error);
        }
    }

    static async getChat(senderId, receiverId) {
        try {
            const user1 = new ObjectId(senderId);
            const user2 = new ObjectId(receiverId);
        
            const chat = await messageModel.find({
                $or: [
                    { sender_Id: user1, reciever_Id: user2 },
                    { sender_Id: user2, reciever_Id: user1 }
                ]
            })
            .sort({ timeStamp: 1 })
            .exec();
        
            return chat;
        } catch (error) {
            console.error("Error getting the chat history of the users", error);
            throw error;
        }
    }

    static async getChats(sender_Id) {
        try {
            //Getting the chats from a dummyData Dir. Implement properly in future
            let filePath = "/Users/chetansanwariya/Desktop/Peers_Backend.project/DummyData/Chat/ChatsList.json";
            let jsonData = fs.readFileSync(filePath, 'utf-8');
            return JSON.stringify(JSON.parse(jsonData),null,2)
        } catch (error) {
            console.error('Error reading the ChatsList.json from DummyData/Chat:', error);
            return null;
        }
    }
}

module.exports = MessageServices;