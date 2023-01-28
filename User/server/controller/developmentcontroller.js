const model= require("../model/DevelopmentModel")
var developmentdb = model.developmentdb;
exports.CreateDevelopment = (req,res)=>{
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

    const newuser = new developmentdb({
        title:req.body.title,
        shortDescription:req.body.shortDescription,
        longDescription:req.body.longDescription,
        imageURL:imagePath[0]?imagePath[0]:null

    })
    // const {title, shortDescription, longDescription}= res.data
    newuser.save(newuser).then(data=>{
       res.json("scucessful").status(200)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}
exports.FindDevelopment = (req,res)=>{
    if(req.query.id){
        developmentdb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        developmentdb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteDevelopment = (req,res)=>{
    const id = req.query.id;
 developmentdb.findByIdAndDelete(id).then(data=>{
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

exports.UpdateDevelopment = async (req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        const development = await developmentdb.findById(id)
        imgUrl = development.imageURL
        if(req.files.image !==undefined){
            if (development.imageURL && development.imageURL !== null) {
                const path = "public/" + development.imageURL.slice(process.env.BASE_URL.length, development.imageURL.length)
            
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
            imgUrl = development.imageURL
        }

        
        
        await developmentdb.findByIdAndUpdate(id,{
            title:req.body.title,
                shortDescription:req.body.shortDescription,
                longDescription:req.body.longDescription,
                imageURL:imgUrl ,
                date: new Date().getTime()
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send("err")
        })
        

    } catch (err) {
        res.json("error")
        
    }
}