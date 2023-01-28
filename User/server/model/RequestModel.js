const mongoose = require("mongoose");
const validator = require("validator");
var RequestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    purpose:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    imgURL:{
        type:String
    }
})


exports.requestdb = mongoose.model('requestdb', RequestSchema)