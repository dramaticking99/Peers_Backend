const messageModel = require('../Models/Chat/messageModel');
const { ObjectId } = require('mongoose').Types;

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
}

module.exports = MessageServices;