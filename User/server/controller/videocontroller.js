const model= require("../model/VideoModel")
const {userdb}= require("../model/UserInfoModel")
const fs = require("fs")
const axios = require("axios")
var videodb = model.videodb;
exports.FindVideo = (req,res)=>{
    if(req.query.id){
        videodb.find({_id:req.query.id}).then(function(data){
            res.send(data)

        }).catch(err=>{
            res.status(400).json(err)
        })
    }
    else{
        videodb.find().then(function(data){
            res.send(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}
exports.DeleteVideo = (req,res)=>{
    const id = req.query.id;
    const video = videodb.findOne({_id:id})
    if (video.VideoUrl &&video.VideoUrl !== null) {
        const path = "public/" + video.VideoUrl.slice(process.env.BASE_URL.length, video.VideoUrl.length)
    
        //to delete the previously existing video, if exists
        console.log(path)
        try {
          fs.unlinkSync(path);
          //file removed
        } catch (err) { }
      }
     videodb.findByIdAndDelete(id).then(data=>{
            if(!data){
                res.status(404).json({message:"invalid user id"})
                return;
            }
            else{
                res.json({message:"id deleted sucessfuly"}).status(200)
    
            }
        }).catch(err=>{
            res.status(500).json({message:"user data cannot be deleted"})
    
        })
}

exports.CreateVideo = (req,res)=>{
    let videoPah = []
    if(!req.body){
        res.status(400).json("please fill some detsils.")
    }
    else{
        if(Array.isArray(req.files.image)&& req.files.image.length>0){
            for(let videos of req.files.image){
                videoPah.push(process.env.BASE_URL + "images/" + videos.filename)
            }
        }
        console.log(videoPah[0])
        const NewVideo = new videodb({
            VideoUrl:videoPah[0],
            CommentCount:0,
            BookmarkCount:0,
            shortDescription:req.body.shortDescription,
            longDescription:req.body.longDescription
        })
        NewVideo.save().then(data=>{   
            res.json("scucessful").status(200)
            
        }).catch(err=>{
                console.log(err);
                res.status(500).json({message:err || "error occured while uploading Video"})
        })
    }
}

exports.AddComment = async (req,res)=>{
    try {
        const user_id = req.user._id
        const  user = await userdb.findOne({_id:user_id});
        console.log(user_id)
        console.log("yeta samma aayo")
        const video_id = req.query.video_id
        const comment = req.body.comment
        const video = await videodb.findOne({_id:video_id})
        const id = Date.now() + "esdk";
        const array = [id,user.name,comment]
        video.comments.push(array)
        video.CommentCount = video.CommentCount+1
        video.save()
        console.log(video.comments)
        res.json("done!").status(200)

        
    } catch (err) {
        
        res.status(500).json(err)
    }
}

exports.AddBookmark = async(req,res)=>{
    if(!req.token){
        res.status(401).json("Not authorized user")
        return
    }
    try {
        const video = await videodb.findOne({_id:req.query.video_id})
        const index = video.bookmarks.indexOf(req.user._id)
        if(index !== -1){
            return res.status(300).json("already bookmarked.")
        }
        video.bookmarks.push(req.user._id)
        video.BookmarkCount = video.BookmarkCount+1
        const sccucess = await video.save()
        res.json("scucessful").status(200)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

exports.DeleteBookmark = async(req,res)=>{
    try {
        if(!req.token){
            res.status(401).json("Not authorized user")
            return
        }
        console.log(req.user._id)
        const video = await videodb.findOne({_id:req.query.video_id})
        const index = video.bookmarks.indexOf(req.user._id)
        console.log(index)
        if(index === -1){
            return res.status(300).json("Invalid User id.")
        }
        video.bookmarks.splice(index,1)
        const scucess = await video.save()
        if(!scucess){
            return res.status(400).json("Coudlnt save data")
        }
        video.BookmarkCount = video.BookmarkCount-1;
        res.status(200).json("scucessful.")
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

exports.UpdateVideo = async(req,res)=>{
    try {
        if(!req.body){
            res.status(400).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        const videos = await videodb.findById(id);

        VideoURL = videos.imageURL
        if(req.files.image !==undefined){
            if (videos.VideoUrl && videos.VideoUrl !== null) {
                const path = "public/" + videos.VideoUrl.slice(process.env.BASE_URL.length, videos.VideoUrl.length)
            
                //to delete the previously existing image, if exists
                console.log(path)
                try {
                  fs.unlinkSync(path);
                  //file removed
                } catch (err) { }
              }
            let VideoPath = []
            if(Array.isArray(req.files.image)&& req.files.image.length>0){
                for(let video of req.files.image){
                    VideoPath.push(process.env.BASE_URL + "images/" + video.filename)
                }
                VideoURL = VideoPath[0]
            }
            else{
                VideoURL = null
            }
        }
        else{
            VideoURL = videos.VideoUrl
        }

            
        
        await testimonialdb.findByIdAndUpdate(id,{
            VideoUrl:videoPah[0],
            CommentCount:videos.CommentCount,
            BookmarkCount:videos.BookmarkCount,
            shortDescription:req.body.shortDescription? req.body.shortDescription: videos.shortDescription,
            longDescription:req.body.longDescription? req.body.longDescription:videos.longDescription
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send(err)
        })
        

    } catch (err) {
        res.status(500).json(err)
        
    }
}

