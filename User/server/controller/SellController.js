const model= require("../model/SellModel")
var selldb = model.selldb;
exports.CreateSell = (req,res)=>{
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    }
    console.log(req.body)
    var newsell = new selldb({
        property_type:req.body.property_type,
        province:req.body.province,
        city:req.body.city,
        price:req.body.price,
        negotiable:req.body.negotiable,
        owners_name:req.body.owners_name,
        owners_contact:req.body.owners_contact,
        bedroom:req.body.bedroom,
        bathroom:req.body.bathroom,
        floors:req.body.floors,
        parking:req.body.parking,
        property_face:req.body.property_face,
        area_covered:req.body.area_covered,
        carpet_area:req.body.carpet_area,
        access_road:req.body.access_road,
        black_topped:req.body.black_topped,
        description:req.body.description,
        address:req.body.address,
        already_sell:false,

    })
    // const {property_type,province,city,address,price,negotiable,owners_name,owners_contact,bedroom,bathroom,floors,parking,property_face,area_covered,carpet_area,access_road,black_topped,description} = res.data
    
    newsell.save(newsell).then(data=>{
        res.json(data._id).status(200)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}
exports.FindSell = (req,res)=>{
    if(req.query.id){
        selldb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        selldb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}
exports.DeleteSell = (req,res)=>{
    const id = req.query.id;
     selldb.findByIdAndDelete(id).then(data=>{
            if(!data){
                res.status(400).json({message:"invalid user id"})
                return;
            }
            else{
                res.json({message:"id deleted sucessfuly"}).status(200)
    
            }
        }).catch(err=>{
            res.status(500).json({message:"user data cannot be deleted"})
    
        })
    }


exports.UpdateSell = async(req,res)=>{
        try {
            if(!req.body){
                res.status("Pleease provide some information").status(400)
                return ;
            }
            const id = req.query.id       
            let sell = await selldb.findById(id); 
            
            
            await selldb.findByIdAndUpdate(id,{
                property_type:req.body.property_type ? req.body.property_type: sell.property_type,
                province: req.body.province ? req.body.province : sell.province,
                city:req.body.city ? req.body.city : sell.city,
                price:req.body.price ? req.body.price : sell.price,
                negotiable:req.body.negotiable ? req.body.negotiable : sell.negotiable,
                owners_name:req.body.owners_name ? req.body.owners_name : sell.owners_name,
                owners_contact:req.body.owners_contact ? req.body.owners_contact :sell.owners_contact ,
                bedroom:req.body.bedroom ? req.body.bedroom : sell.bedroom,
                bathroom:req.body.bathroom ? req.body.bathroom : sell.bathroom,
                floors:req.body.floors ? req.body.floors : sell.floors,
                parking:req.body.parking ? req.body.parking : sell.property_type,
                property_face:req.body.property_face ? req.body.property_face :sell.property_face ,
                area_covered:req.body.area_covered ? req.body.area_covered :sell.area_covered ,
                carpet_area:req.body.carpet_area ? req.body.carpet_area :sell.carpet_area ,
                access_road:req.body.access_road ? req.body.access_road : sell.access_road,
                black_topped:req.body.black_topped ? req.body.black_topped : sell.black_topped,
                description:req.body.description ? req.body.description : sell.description,
                address:req.body.address ? req.body.address :sell.address ,
                already_sell:req.body.already_sell ? req.body.already_sell:sell.already_sell ,
            }).then(data=>{
                res.status(200).json("updated")
            }).catch(err=>{
                res.status(500).send(err)
            })
            
    
        } catch (err) {
            res.json(err)
            
        }
    }


