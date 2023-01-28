const model= require("../model/requirementModel");
var requirementdb = model.requirementdb

exports.CreateReq = (req,res)=>{
    if(!req.body){
        res.status(500).json({message:"data to be updated cannot be empty."})
        return;
    }
    const tempo = new requirementdb({
        number: req.body.number,
        content: req.body.content

    })
    // const {name, contact, email, message}= res.data
    tempo.save().then(data=>{
        res.json("data saved scucessfully").status(200)
    }).catch(err=>{
        res.status(500).json(err|| "data couldn't be saved scucessfully.")
    })
}

exports.DeleteReq = (req,res)=>{
    requirementdb.findOneAndDelete({contact:req.body.contact}).then(data=>{
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

exports.FindReq = (req,res)=>{
    if(req.query.id){
        const id= req.query.id;
        requirementdb.findOne({_id:id}).then(data=>{
            res.send(data).status(200)
    }).catch(err=>{
        res.status(500).send(err)
    })
    }
    else{
        requirementdb.find().then(data=>{
            res.send(data).status(200)
        }).catch(err=>{
            res.status(500).send(err)
        })
    }
}

exports.UpdateReq = async(req,res)=>{
    const id= req.query.id;
    const requirement = await requirementdb.findOne({_id:id})
    requirementdb.findByIdAndUpdate(id,{
        number: req.body.number?req.body.number:requirement.name,
        content: req.body.content?req.body.content:requirement.content
    }).then(data=>{
        res.send("updated!").status(200)
    }).catch(err=>{
        res.status(500).send(err)
    })
}