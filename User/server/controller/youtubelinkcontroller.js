const model= require("../model/YoutubeLinkModel")
var youtubedb = model.Youtubedb;
exports.FindVideo = (req,res)=>{
    if(req.query.id){
        youtubedb.find({_id:req.query.id}).then(function(data){
            res.send(data)

        }).catch(err=>{
            res.json(err).status(200)
        })
    }
    else{
        youtubedb.find().then(function(data){
            res.status(200).send(data)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}
exports.DeleteVideo = (req,res)=>{
    const id = req.query.id;
     youtubedb.findByIdAndDelete(id).then(data=>{
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
    if(!req.body){
        res.json("please fill some detsils.").status(300)
    }
    else{
        const Newlink = new youtubedb({
            YoutubeUrl:req.body.YoutubeUrl,
        })
        Newlink.save().then(data=>{   
            res.json("scucessful").status(200)
        }).catch(err=>{
                console.log(err);
                res.status(500).json({message:err || "error occured while uploading Video"})
        })
    }
}

