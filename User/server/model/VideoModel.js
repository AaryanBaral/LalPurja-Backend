const mongoose = require("mongoose");
var videoSchema = new mongoose.Schema({
    VideoUrl:{
        type :String,
        required:true
    },
    CommentCount:{
        type :Number,
        required:true
    },
    BookmarkCount:{
        type :Number,
        required:true
    },
    shortDescription:
    {
        type:String,
        required:true
    },
    longDescription:{
        type:String,
        required:true
    },
    comments:[{
        type:Array
    }],
    bookmarks:[{
        type: String
    }]

},
{
    timestamps:true
})


exports.videodb = mongoose.model('videodb', videoSchema);