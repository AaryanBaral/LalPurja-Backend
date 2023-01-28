const mongoose = require("mongoose");
var Youtubechema = new mongoose.Schema({
    YoutubeUrl:{
        type :String,
        required:true
    }

},
{
    timestamps:true
})


exports.Youtubedb = mongoose.model('Youtubedb', Youtubechema);