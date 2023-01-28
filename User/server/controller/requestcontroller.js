const model= require("../model/RequestModel");
var requestdb = model.requestdb;

exports.CreateRequest = (req,res)=>{
    console.log(req.body)
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    }    
    let imagePath = []
    console.log(req.files)
    if(req.files){
        if(Array.isArray(req.files.image)&& req.files.image.length>0){
            for(let image of req.files.image){
                imagePath.push(process.env.BASE_URL + "images/" + image.filename)
            }
        }

    }
    const newuser = new requestdb({
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        purpose:req.body.purpose,
        message:req.body.message,
        imgURL:imagePath[0]?imagePath[0]:null
    })
    newuser.save().then(data=>{   
        res.status(200).json(data.id)
    })
}

exports.FindRequest = (req, res)=>{
    if(req.query.id){
        requestdb.findOne({_id:req.query.id}).then(function(data){
            res.json(data)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        requestdb.find().then(function(data){
            res.json(data)
        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteRequest = (req,res)=>{
    const id = req.query.id;
 requestdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).json({message:"invalid user id"})
            return;
        }
        else{
            res.json({message:"id deleted sucessfuly"})

        }
    }).catch(err=>{
        res.status(500).json({message:"user data cannot be deleted"})

    })
}


exports.UpdateRequest = async (req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        const request = await requestdb.findById(id)
        imgUrl = request.imgURL
        if(req.files.image !==undefined){
            if (request.imgURL && request.imgURL !== null) {
                const path = "public/" + request.imgURL.slice(process.env.BASE_URL.length, request.imgURL.length)
            
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
            imgUrl = request.imgURL
        }

        
        
        await requestdb.findByIdAndUpdate(id,{
            name:req.body.name,
            contact:req.body.contact,
            email:req.body.email,
            purpose:req.body.purpose,
            message:req.body.message,
            imgURL:imgUrl
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send("err")
        })
        

    } catch (err) {
        res.json("error")
        
    }
}