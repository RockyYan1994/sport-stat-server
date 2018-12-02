const mongoose = require("mongoose");

var topicSchema = new mongoose.Schema({
    title: String,
    img : String,
    desc : String,
    content: String,
    visited: Number,
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    keyWords: [
        {
            keyWord: String
        }
    ],
    user_like_this_topic: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    user_favorite_this_topic: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

});

var Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
