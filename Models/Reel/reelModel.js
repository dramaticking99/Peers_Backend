const mongoose = require('mongoose');
const db = require('../../config/db');
const PostModel = require('../Post/postModel');
const { Schema } = mongoose;

const reelSchema = new Schema({
    user_Id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    videoUrl:{
        type: String,
        require: true,
    },
    arrayComment_Id:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    caption:{
        type: String,
    },
    likes:{
        type:Number,
        default: 0,
    },
});

const ReelModel = db.model('reel',reelSchema);

module.exports = ReelModel