const mongoose = require("mongoose");
var SellSchema = new mongoose.Schema({
    unique_id:{
        type:Number
    },
    property_type:{
        type:String,

    },
    province:{
        type:Number,

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

    },
    owners_contact:{
        type:Number,

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
    featured:{
        type:String,
    
    },
    youtube_link:{
        type:String,
      
    },
    description:{
        type:String,

    },
    ammenities:[{
        type:String
    }],
    address:
    {
        type:String,

    },
    imageURL:[{
        type:String
    }],
    house_age:{
        type:String
    }
    
},{
    timestamps:true
})

exports.propertydb = mongoose.model('propertydb', SellSchema)
