const model= require("../model/AgentModel");
var agentdb = model.agentdb;
exports.CreateAgent = (req,res)=>{
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

    const newuser = new agentdb({
        name:req.body.name,
        contact:req.body.contact,
        designation:req.body.designation,
        imageURL:imagePath[0]?imagePath[0]:null

    })
    // const {name, contact, designation} = res.data
    newuser.save(newuser).then(data=>{
        res.json("scucessful").status(200)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}
exports.FindAgent = (req,res)=>{
    if(req.query.id){
        agentdb.findOne({_id:req.query.id}).then(function(data){
            res.json(data)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        agentdb.find().then(function(data){
            res.json(data)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteAgent = (req,res)=>{
    const id = req.query.id;
 agentdb.findByIdAndDelete(id).then(data=>{
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

exports.UpdateAgent = async (req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        const agent = await agentdb.findById(id)
        imgUrl = agent.imageURL
        if(req.files.image !==undefined){
            if (agent.imageURL && agent.imageURL !== null) {
                const path = "public/" + agent.imageURL.slice(process.env.BASE_URL.length, agent.imageURL.length)
            
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
            imgUrl = agent.imageURL
        }
        
        await agentdb.findByIdAndUpdate(id,{
                name:req.body.name,
                contact:req.body.contact,
                designation:req.body.designation,
                imageURL:imgUrl,
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send(err)
        })
        

    } catch (err) {
        res.json(err)
        
    }
}