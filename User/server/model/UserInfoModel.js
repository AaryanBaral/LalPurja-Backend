const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator")

var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    contact:{
        type:Number,
        // required:true,
        unique:true 
    },
    email:{
        type:String,
    },
    address:{
        type:String
    },
    bookmarks:[{
        type:String
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    imageURL:{
        type:String
    },
    UserType:{
        type:String
    }
})

UserSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id},process.env.JWT_SECERATE_KEY)
        this.tokens = this.tokens.concat({token}) 
        return token        
    } catch (err) {
        res.status(400)        
    }
}

exports.userdb = mongoose.model('userdb', UserSchema)