const mongoose = require("mongoose");
const validator = require("validator");
var ScheduleSchema = new mongoose.Schema({
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

    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    agenda:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


exports.scheduledb = mongoose.model('scheduledb', ScheduleSchema)