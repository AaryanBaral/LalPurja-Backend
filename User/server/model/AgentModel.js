const mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true 
    },
    designation:{
        type:String
    },
    imageURL:{
        type:String
    },

})


exports.agentdb = mongoose.model('agentdb', UserSchema)