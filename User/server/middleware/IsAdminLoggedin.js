const jwt = require("jsonwebtoken");
const usermodel= require("../model/AdminModel");
const userdb = usermodel.admindb;
exports.auth = async(req,res,next)=>{
    try {
        const token = req.headers['token'];
        console.log(token)
        const verifyUser= jwt.verify(token,process.env.JWT_SECERATE_KEY);
        const user = await userdb.findOne({_id:verifyUser._id});
        req.token = token;
        req.user = user;
        res.status(200).json("Admin verified.")
        
    } catch (err) {
        return res .status(400).json("Access Denied.")
        
    }
}