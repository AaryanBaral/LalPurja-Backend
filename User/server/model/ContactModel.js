const mongoose = require("mongoose");
const validator = require("validator");
var ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
    },
    email:{
        type:String,

    },
    message:{
        type:String,
        required:true
    }
})


exports.contactdb = mongoose.model('contactdb', ContactSchema)