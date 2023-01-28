const jwt = require("jsonwebtoken");
const usermodel= require("../model/UserInfoModel");
const userdb = usermodel.userdb;

exports.auth = async(req,res,next)=>{
    try {
        const token = req.headers['token'];
        console.log("type of")
        console.log(typeof(token))
        console.log(token)
        if(!token){
            res.status(401).json("Not logged in.")
            return 
        }
        else{
            const verifyUser= jwt.verify(token,process.env.JWT_SECERATE_KEY);
            console.log(verifyUser._id)
            userdb.findOne({_id:verifyUser._id}).then(data=>{
                console.log(data)
                if(!data){
                    
                }
                else{
                    res.send(data)
                }
            })
}        
        
    } catch (err) {
        res.status(300).json(err)
        
    }
}