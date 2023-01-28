const mongoose = require("mongoose");
var SubscribeSchema = new mongoose.Schema({
    email:{
        type :String,
        unique:true
    }

},
{
    timestamps:true
})


exports.suscribedb = mongoose.model('suscribedb', SubscribeSchema);