const mongoose = require("mongoose");
var PartnerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    imgUrl:{
        type:String,
        required:true
    }
})


exports.partnerdb = mongoose.model('partnerdb', PartnerSchema)