const mongoose = require("mongoose");
var BlogSchema = new mongoose.Schema({
    title:{
        type:String,

    },
    longDescription:{
        type:String,

    },
    shortDescription:{
        type:String,

    },
    imageURL:{
        type:String
    }
    
},{
    timestamps:true
})


exports.blogdb = mongoose.model('blogdb', BlogSchema)