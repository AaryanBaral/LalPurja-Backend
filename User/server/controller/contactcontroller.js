const model= require("../model/ContactModel");
var contactdb = model.contactdb
exports.CreateContact = (req,res)=>{
    if(!req.body){
        res.status(500).json({message:"data to be updated cannot be empty."})
        return;
    }
    const loanuser = new contactdb({
        name: req.body.full_name,
        contact: req.body.contact,
        email: req.body.email_address,
        message:req.body.message
    })
    // const {name, contact, email, message}= res.data
    loanuser.save(loanuser).then(data=>{
        res.json("data saved scucessfully").status(200)
    }).catch(err=>{
        res.status(500).json(err|| "data couldn't be saved scucessfully.")
    })
}
exports.FindContact = (req,res)=>{
    if(req.query.id){
        contactdb.findOne({_id:req.query.id}).then(function(data){
            console.log(data)
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        contactdb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteContact = (req,res)=>{
    const id = req.query.id;
 contactdb.findByIdAndDelete(id).then(data=>{
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