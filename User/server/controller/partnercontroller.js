const model= require("../model/PartnerModel")
var partnerdb = model.partnerdb;
exports.CreatePartner = (req,res)=>{
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    }
    let imagePath = []
    if(Array.isArray(req.files.image)&& req.files.image.length>0){
        for(let image of req.files.image){
            imagePath.push(process.env.BASE_URL + "images/" + image.filename)
        }
    }
    console.log(imagePath)
    var newsell = new partnerdb({
        name:req.body.name,
        imgUrl : imagePath[0]

    })
    // const {property_type,province,city,address,price,negotiable,owners_name,owners_contact,bedroom,bathroom,floors,parking,property_face,area_covered,carpet_area,access_road,black_topped,description} = res.data
    console.log(newsell)
    newsell.save(newsell).then(data=>{
        res.json("scucessful").status(200)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}
exports.FindPartner = (req,res)=>{
    if(req.query.id){
        partnerdb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        partnerdb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}


exports.DeletePartner = (req,res)=>{
    const id = req.query.id;
     partnerdb.findByIdAndDelete(id).then(data=>{
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

exports.UpdatePartner = async (req,res)=>{
    const id = req.query.id;
    const partner = partnerdb.findOne({_id:id})
    imgUrl = partner.imageURL
        if(req.files.image !==undefined){
            if (partner.imageURL && partner.imageURL !== null) {
                const path = "public/" + partner.imageURL.slice(process.env.BASE_URL.length, partner.imageURL.length)
            
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
            imgUrl = partner.imageURL
        }

        partnerdb.findByIdAndUpdate(id,{
            name:req.body.name,
            imgUrl:imagePath[0]
        }).then(data=>{
            res.json("done")
        }).catch(err=>{
            res.status(500).json(err)
        })
    
}
    

