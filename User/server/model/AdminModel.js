const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var AdminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})
AdminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

AdminSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id},process.env.JWT_SECERATE_KEY)
        this.tokens = this.tokens.concat({token}) 
        console.log(token)
        return token        
    } catch (err) {
        res.json("token not generated"+err)        
    }
}


exports.admindb = mongoose.model('admindb', AdminSchema)