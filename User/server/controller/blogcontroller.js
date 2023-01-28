const model= require("../model/BlogModel")
var blogdb = model.blogdb;

exports.CreateBlog = (req,res)=>{
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})

        return;
    }
    let imagePath = []
    if(req.files){
        if(Array.isArray(req.files.image)&& req.files.image.length>0){
            for(let image of req.files.image){
                imagePath.push(process.env.BASE_URL + "images/" + image.filename)
            }
        }

    }

    const newuser = new blogdb({
        title:req.body.title,
        shortDescription:req.body.shortDescription,
        longDescription:req.body.longDescription,
        imageURL:imagePath[0]?imagePath[0]:null
    })

    newuser.save(newuser).then(data=>{
        res.json("data scucessfully send").status(200)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}
exports.FindBlog = (req,res)=>{
    console.log(req.query.id)
    if(req.query.id){
        blogdb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        blogdb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteBlog = (req,res)=>{
    const id = req.query.id;
 blogdb.findByIdAndDelete(id).then(data=>{
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

exports.UpdateBlog = async (req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        console.log(id)
        const blog = await blogdb.findOne({_id:id});
        console.log(req.files)
        if(req.files.image !==undefined){
            if (blog.imageURL && blog.imageURL !== null) {
                const path = "public/" + blog.imageURL.slice(process.env.BASE_URL.length, blog.imageURL.length)
            
                //to delete the previously existing image, if exists
                console.log(path)
                try {
                  fs.unlinkSync(path);
                  //file removed
                } catch (err) { }
              }
            let imagePath = []
            if(Array.isArray(req.files.image)&& req.files.image.length>0){
                for(let image of req.files.image){
                    imagePath.push(process.env.BASE_URL + "images/" + image.filename)
                }
                imgUrl = imagePath[0]
            }
            else{
                imgUrl = null
            }
        }
        else{
            console.log("yeta else ma chai aayo laaaa")
            imgUrl = blog.imageURL
        }
        console.log("yeta samma aayo")
        await blogdb.findByIdAndUpdate(id,{
            title:req.body.title,
            shortDescription:req.body.shortDescription,
            longDescription:req.body.longDescription,
            imageURL:imgUrl
            
        }).then(data=>{
            res.status(200).json("updated blog")
        }).catch(err=>{
            res.status(500).send(err)
        })
        

    } catch (err) {
        res.json(err)
        
    }


}