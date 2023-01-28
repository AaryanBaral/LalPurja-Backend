const model= require("../model/ScheduleModel");
var scheduledb = model.scheduledb




exports.CreateSchedule = (req,res)=>{
    console.log(req.body)
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    }    
    const newuser = new scheduledb({
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        date:req.body.date,
        time:req.body.time,
        agenda:req.body.agenda
    })
    newuser.save().then(data=>{   
        res.status(200).json("saved scucessfully")
    })
}

exports.FindSchedule = (req, res)=>{
    if(req.query.id){
        scheduledb.findOne({_id:req.query.id}).then(function(data){
            res.json(data)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        scheduledb.find().then(function(data){
            res.json(data)
        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}

exports.DeleteSchedule = (req,res)=>{
    const id = req.query.id;
 scheduledb.findByIdAndDelete(id).then(data=>{
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