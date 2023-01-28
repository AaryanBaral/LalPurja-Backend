const model= require("../model/TestimonialModel");
const fs = require("fs");
var testimonialdb = model.testimonialdb;
exports.CreateTestimonial = (req,res)=>{
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

    const newuser = new testimonialdb({
        name:req.body.name,
        designation:req.body.designation,
        testimony:req.body.testimony,
        imageURL:imagePath[0]
    })
    // const{name, designation,testimony} = res.data
    newuser.save(newuser).then(data=>{
        res.json("scucessfully").status(200)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err || "error occured while creating the data"})
    })
}
exports.FindTestimonail = (req,res)=>{
    if(req.query.id){
        testimonialdb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        testimonialdb.find().then(function(data){
            res.json(data).status(200)

        }).catch(err=>{
            res.status(500).send(err)
        })

    }
}

exports.DeleteTestimonial = (req,res)=>{
    const id = req.query.id;
 testimonialdb.findByIdAndDelete(id).then(data=>{
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

exports.UpdateTestimonial = async(req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        const testi = await testimonialdb.findById(id);

        imgUrl = testi.imageURL
        if(req.files.image !==undefined){
            if (testi.imageURL && testi.imageURL !== null) {
                const path = "public/" + testi.imageURL.slice(process.env.BASE_URL.length, testi.imageURL.length)
            
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
            imgUrl = testi.imageURL
        }

            
        
        await testimonialdb.findByIdAndUpdate(id,{
            name:req.body.name ? req.body.name:testi.name,
            designation:req.body.designation?req.body.designation:testi.designation,
            testimony:req.body.testimony?req.body.testimony:testi.testimony,
            imageURL:imgUrl
        }).then(data=>{
            res.status(200).json("updated")
        }).catch(err=>{
            res.status(500).send(err)
        })
        

    } catch (err) {
        res.json(err)
        
    }
}