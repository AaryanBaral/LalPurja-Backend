const mongoose = require("mongoose");
var BlogSchema = new mongoose.Schema({
    // image schema required
    title:{
        type:String,
        required:true
    },
    longDescription:{
        type:String,
        required:true,
    },
    shortDescription:{
        type:String,
        required:true,
    },
    imageURL:{
        type:String
    },
},{
    timestamps:true
})


exports.developmentdb = mongoose.model('developmentdb', BlogSchema)