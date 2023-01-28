const mongoose = require("mongoose");

var TempoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true 
    },
    otp:{
        type:Number
    },
    createdAt:{
        type:Date,
        expires:120
    }
})

exports.tempodb = mongoose.model('tempodb', TempoSchema)