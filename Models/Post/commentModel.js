const mongoose = require('mongoose');
const db = require('../../config/db');
const { Schema } = mongoose;

const commentSchema = new Schema({
    commentString:{
        type :String,
        required: true
    },
    post_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    
})

const CommentModel = db.model('comment',commentSchema);

module.exports = CommentModel;