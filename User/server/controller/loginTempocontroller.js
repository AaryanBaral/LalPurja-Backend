const model= require("../model/loginTempo");
var tempodb = model.tempodb

exports.CreateTempo = (req,res)=>{
    if(!req.body){
        res.status(500).json({message:"data to be updated cannot be empty."})
        return;
    }
    const tempo = new tempodb({
        name: req.body.full_name,
        contact: req.body.contact,
        otp: req.body.otp,
        createdAt:Date.now()

    })
    // const {name, contact, email, message}= res.data
    tempo.save().then(data=>{
        res.json("data saved scucessfully").status(200)
    }).catch(err=>{
        res.status(500).json(err|| "data couldn't be saved scucessfully.")
    })
}

exports.DeleteTempo = (req,res)=>{
tempodb.findOneAndDelete({contact:req.body.contact}).then(data=>{
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
