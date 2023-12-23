const mongoose = require('mongoose');
const db = require('../../config/db');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const postSchema = new Schema({
    user_Id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    arrayPost_Id:{
        type: [String],
        required:true,
    },
    arrayComment_Id:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    caption:{
        type: String,
    },
    likes:{
        type: Number,
        default: 0,
    },
    
    
});

const PostModel = db.model('post',postSchema);

module.exports = PostModel;