const model= require("../model/SubscriptionModel");
var suscribedb = model.suscribedb;




exports.CreateSubscription =(req,res)=>{
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    } 
    const newsuscribe = new suscribedb({
        email:req.body.email
    })
    newsuscribe.save().then(data=>{   
        res.json("scucessful").status(200)
    }).catch(err=>{
            console.log(err);
            res.status(500).json({message:err||"error occured while creating the data"})
    })

}


exports.FindSubscription = (req, res)=>{
    if(req.query.id){
        suscribedb.findOne({_id:req.query.id}).then(function(data){
            res.send(data).status(200)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        suscribedb.find().then(function(data){
            res.json(data).status(200)
        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}


