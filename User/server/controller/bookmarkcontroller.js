const model= require("../model/UserInfoModel");
const {propertydb} = require("../model/PropertyModel")
var userdb = model.userdb;




exports.CreateBookmark = async(req,res)=>{
    try {
        if(!req.token){
            res.json("Not authorized user").status(300)
            return
        }
        const user = await userdb.findOne({_id:req.user._id})
        const property = await propertydb.findOne({_id:req.query.property_id})
        if(!property){
            return res.status(400).json("property not found!")
        }
        const index = user.bookmarks.indexOf(req.query.property_id)
        if(index !== -1){
            return res.status(300).json("already bookmarked.")
        }
        user.bookmarks.push(req.query.property_id)
        const sccucess = await user.save()
        res.json("bookmark added").status(200)
        
    } catch (err) {
        res.status(500).json(err)
        
    }

}

exports.DeleteBookmark =async (req,res)=>{
    try {
        if(!req.token){
            res.status(401).json("Not authorized user")
            return
        }
        user = await userdb.findOne({_id:req.user._id})
        const index = user.bookmarks.indexOf(req.query.property_id)
        console.log(index)
        if(index === -1){
            return res.status(300).json("Invalid property id.")
        }
        user.bookmarks.splice(index,1)
        console.log(user.bookmarks)
        const sccucess = await user.save()
        res.json("bookmark deleted").status(200)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

exports.GetBookmark = async(req,res)=>{
    try {
        if(!req.token){
            res.json("Not authorized user").status(300)
            return
        }
        const user = await userdb.findOne({_id:req.user._id})
        if(!user){
            return res.status(400).json("user not found")
        }
        return res.status(200).send(user.bookmarks)
        
    } catch (err) {
        res.status(500).json(err)
        
    }

}