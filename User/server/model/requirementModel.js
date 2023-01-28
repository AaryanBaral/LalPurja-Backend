const mongoose = require("mongoose");

var TempoSchema = new mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    content:{
        type:String
    }
})

exports.requirementdb = mongoose.model('requirementdb', TempoSchema)