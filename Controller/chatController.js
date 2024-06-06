const ChatServices = require("../Services/chatServices")

exports.addMessage = async(req,res,next)=>{
    try{
        const{sender_Id,reciever_Id,content,timeStamp} = req.body;

        const successRes = await ChatServices.addMessage(sender_Id,reciever_Id,content,timeStamp);

        console.log("message Saved successfully");

        res.json({status:true,success:"message Added Succesfully"})
    } catch (error){
        throw(error);
    }
}
exports.getChat = async(req,res,next)=>{
    try{
        const{sender_Id,reciever_Id} = req.body

        const chat = await ChatServices.getChat(sender_Id,reciever_Id);

        res.json({ chat });
    } catch(error){
        throw(error)
    }
}
exports.getChats = async(req,res,next)=>{
    try {
        const{sender_Id} = req.body

        const chats = await ChatServices.getChats(sender_Id);

        res.json({ chats });
    } catch(error) {
        throw(error)
    }
}