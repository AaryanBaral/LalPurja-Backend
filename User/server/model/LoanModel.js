const mongoose = require("mongoose");
const validator = require("validator");
var LoanSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
    },
    province:{
        type:String,
        required:true
    },
    identified:{
        type:String,
    },
    purpose:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    resident_status:{
        type:String,
        required:true
    },
    employment:{
        type:String,
        required:true
    },
    income:{
        type:Number,
        required:true
    },
    co_borrower:{
        type:String,
        required:true
    }

})


exports.loandb = mongoose.model('loandb', LoanSchema)