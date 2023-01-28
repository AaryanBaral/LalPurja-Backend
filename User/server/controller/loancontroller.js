const loanmodel= require("../model/LoanModel");
var loandb = loanmodel.loandb
exports.CreateLoan = (req,res)=>{
    if(!req.body){
        res.status(500).json({message:"data to be updated cannot be empty."})
        return;
    }
    const loanuser = new loandb({
        name: req.body.full_name,
        contact: req.body.contact,
        email: req.body.email_address,
        province:req.body.province,
        identified: req.body.identify,
        purpose: req.body.purpose,
        location: req.body.location,
        resident_status: req.body.resident_status,
        employment: req.body.employment,
        income: req.body.income,
        co_borrower: req.body.co_borrower
    })
    // const {name, contact, email, province, identified, purpose, location, resident_status, employment, income, co_borrower}=req.body
    loanuser.save(loanuser).then(data=>{
        res.json("data saved scucessfully").status(200)
    }).catch(err=>{
        res.json(err|| "data couldn't be saved scucessfully.").status(400)
    })
}
exports.FindLoan = (req,res)=>{
    if(req.query.id){
        loandb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        loandb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteLoan = (req,res)=>{
    const id = req.query.id;
 loandb.findByIdAndDelete(id).then(data=>{
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


