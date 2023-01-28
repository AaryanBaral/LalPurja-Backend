const mongoose = require("mongoose");
var DealSchema = new mongoose.Schema({
    property_type:{
        type:String,
        required:true
    },
    original_price:{
        type:Number,
        required:true
    },
    discounted_price:{
        type:Number,
        required:true
    },
    owners_contact:{
        type:Number,
        required:true
    },
    address:
    {
        type:String,

    },
    imageURL:[{
        type:String
    }]
    
},{
    timestamps:true
})

exports.dealdb = mongoose.model('dealdb', DealSchema)