const mongoose = require("mongoose");
var TestimonialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true,
    },
    testimony:{
        type:String,
        required:true
    },
    imageURL:{
        type:String
    },
})


exports.testimonialdb = mongoose.model('testimonialdb', TestimonialSchema)