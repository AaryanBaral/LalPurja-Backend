const mongoose = require("mongoose");
var SellSchema = new mongoose.Schema({
    property_type:{
        type:String,
    },
    province:{
        type:String,

    },
    city:{
        type:String,

    },
    price:{
        type:Number,
    },
    negotiable:{
        type:String,

    },
    owners_name:{
        type:String,
        required:true
    },
    owners_contact:{
        type:Number,
        required:true
    },
    bedroom:{
        type:Number,
    },
    bathroom:{
        type:Number,

    },
    floors:{
        type:Number,

    },
    parking:{
        type:String,

    },
    property_face:{
        type:String,

    },
    area_covered:{
        type:String,
    },
    carpet_area:{
        type:String,

    },
    access_road:{
        type:String,

    },
    black_topped:{
        type:String,
      
    },
    description:{
        type:String,

    },
    advertise:{
        type:String,

    },
    imageURL:{
        type:String
    },
    address:{
        type:String
    },
    already_sell:{
        type:Boolean
    }

    
})

exports.selldb = mongoose.model('selldb', SellSchema)