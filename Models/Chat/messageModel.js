const mongoose = require('mongoose');
const db = require('../../config/db');

const { Schema } = mongoose;

const messageSchema = new Schema({
    sender_Id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    reciever_Id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const MessageModel = db.model('message',messageSchema);

module.exports = MessageModel