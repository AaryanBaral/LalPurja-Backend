const model= require("../model/DealModel")
var propertydb = model.dealdb;
exports.CreateProperty = (req,res)=>{
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    }
    imagePath =[]
    if(Array.isArray(req.files.image) && req.files.image.length>0){
        for(let image of req.files.image){
            imagePath.push(process.env.BASE_URL + "images/" + image.filename)
        }
    }
    const newuser = new propertydb({
        property_type:req.body.property_type,
        address:req.body.address,
        original_price:req.body.original_price,
        discounted_price:req.body.discounted_price,
        owners_contact:req.body.owners_contact,
        imageURL:imagePath[0]        
    })

    // const {property_type,provience,city,address,price,negotiable,owners_name,owners_contact,bedroom,bathroom,floors,parking,property_face,area_covered,carpet_area,access_road,black_topped,description,ammenities,featured,popular,youtube_link,house_age} = res.data
    
    newuser.save(newuser).then(data=>{    
        res.json("sucessful.")

    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}

exports.FindProperty= async (req, res)=>{   
    if(req.query.id){
        const id = req.query.id
        propertydb.findOne({_id:req.query.id}).then(function (response){
            res.json(response).status(200)
        }).catch(err=>{
            res.status(500).json("Id not found.")
        })
    }
    else{
        propertydb.find().then(user=>{
            if(!user){

                res.status(500).json({message:"no property"})
            }
            else{
                res.json(user).status(200)
            }
        }).catch(err=>{
            res.status(500).json({message:err||"find property not working"})
        })
    }

}

exports.DeleteProperty = (req,res)=>{
const id = req.query.id;
 propertydb.findByIdAndDelete(id).then(data=>{
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

exports.UpdateProperty = async(req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        const id = req.query.id       
        let property = await propertydb.findById(id);
        if(req.files.image !==undefined){
            let imagePath = []
            if(Array.isArray(req.files.image)&& req.files.image.length>0){
                for(let image of req.files.image){
                    imagePath.push(process.env.BASE_URL + "images/" + image.filename)
                }
                imgUrl = imagePath
            }
            else{
                imgUrl = null
            }
        }
        else{
            imgUrl = property.imageURL
        }

        
        
        await propertydb.findByIdAndUpdate(id,{
        property_type:req.body.property_type,
        address:req.body.address,
        original_price:req.body.original_price,
        discounted_price:req.body.discounted_price,
        owners_contact:req.body.owners_contact,
        imageURL:imgUrl   
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send(err)
        })
        

    } catch (err) {
        res.status(500).json(err)
        
    }
}