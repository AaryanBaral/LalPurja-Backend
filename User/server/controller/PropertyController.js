const model= require("../model/PropertyModel")
const nodemailer = require("nodemailer");
const axios = require("axios");
var propertydb = model.propertydb;
var property_id = 100;
exports.CreateProperty = (req,res)=>{
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

    let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"aryanbaral1100@gmail.com",
            pass:"ljufnwaqdztwiuqo"
        }
    })
    let ammenities= []
    if(req.body.ammenities!==undefined){
        req.body.ammenities.map((items,index)=>{
            ammenities.push(items)
        })
    }
    else{
        ammenities = [""]
    }
    property_id = property_id +1;
    const newuser = new propertydb({
        unique_id:property_id,
        property_type:req.body.property_type,
        province:req.body.province,
        city:req.body.city,
        address:req.body.address,
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
        ammenities:ammenities?ammenities:[],
        featured:req.body.featured || "false",
        youtube_link:req.body.youtube_link,
        house_age:req.body.house_age,
        imageURL:imagePath        
    })






    // const {property_type,provience,city,address,price,negotiable,owners_name,owners_contact,bedroom,bathroom,floors,parking,property_face,area_covered,carpet_area,access_road,black_topped,description,ammenities,featured,popular,youtube_link,house_age} = res.data
    
    newuser.save().then(data=>{
        
        axios.get("http://localhost:9001/api/subscription").then(AllEmail=>{
            console.log(AllEmail.data)
            for(userEmail of AllEmail.data){
                let details = {
                    from:"lalpurjanepal@gmail.com",
                    to:`${userEmail.email}`,
                    subject:"New Property available!!",
                    text:"We just added a new property which is in sale. form more details visit our site or mobile application."
                    }
                    mailTransporter.sendMail(details,(err)=>{
                        if(!err){
                            console.log("sent")
                        }
                        else{
                            console.log(err)
                        }
                    })
                    
                }
            })
            res.json("sucessful.")

    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}

exports.FindProperty= async (req, res)=>{
    const search = req.query.search
    sort = req.query.sort || 1
    limit = 10
    const minprice = req.query.minprice || 0
    const maxprice = req.query.maxprice || 10000000000000
    const sortPrice  = req.query.price || 1
    const sortDate = req.query.date || -1

    page = parseInt(req.query.page)-1 || 0;    
    if(req.query.id){
        const id = req.query.id
        propertydb.findOne({_id:req.query.id}).then(function (response){
            res.json(response).status(200)
        }).catch(err=>{
            res.status(500).json("Id not found.")
        })
    }
    else if(req.query.city){
        propertydb.find({city:{$regex:req.query.city,$options:"i"}}).sort({"createdAt":sortDate}).sort({price:sortPrice}).then(data=>{
            if(!data){    
                res.status(500).json({message:"no property"})
            }
            else{
                res.json(data).status(200)
            }
        }).catch(err=>{
            res.status(500).json({message:err||"find property not working"})
        })
    }
    else if (search || minprice || maxprice){
        if(search){
            propertydb.find({$or:[{city:{$regex:search, $options:"i"}},{address:{$regex:search, $options:"i"}}]}).sort({createdAt:sortDate}).sort({price:sortPrice}).then(user=>{
                if(!user){
    
                    res.status(500).json({message:"no property"})
                }
                else{
                    res.json(user).status(200)
                }
            }).catch(err=>{
                res.json({message:err||"find property not working"}).status(400)
            })
        }
        else{
            console.log(sortDate)
            propertydb.find().sort({updatedAt:sortDate}).then(user=>{
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
    else{
        propertydb.find().sort({price:sortPrice}).sort({updatedAt:sortDate}).then(user=>{
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
            res.status("Pleease provide some information").status(400)
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
        if(req.body.ammenities===undefined){
            ammenities = property.ammenities;
        }        
        else{
            let ammenities= []
            req.body.ammenities.map((items,index)=>{
                ammenities.push(items)
            })
        }       
        
        await propertydb.findByIdAndUpdate(id,{
            property_type:req.body.property_type,
                provience:req.body.provience,
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
                ammenities:req.body.ammenities,
                featured:req.body.featured? req.body.featured: "No",
                youtube_link:req.body.youtube_link,
                imageURL:imgUrl,
                date: new Date().getTime()
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send(err)
        })
        

    } catch (err) {
        res.json(err)
        
    }
}

exports.PropertyLocation =async (req,res)=>{

    const property = await propertydb.find()

    let data =[];
    property.map((items)=>{
    return data.push(items.city)
    })
    let array=[]
    data.map((items , index)=>{
    if(data.indexOf(items)===index){
        return array.push(items)
    }
    })
    res.send(array)

} 
