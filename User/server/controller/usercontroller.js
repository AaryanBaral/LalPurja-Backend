const model= require("../model/UserInfoModel");
const model1= require("../model/loginTempo");
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer")
const axios = require("axios")
var request = require("request");
var userdb = model.userdb;
var tempodb = model1.tempodb;




exports.Create = async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
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
    const newuser = new userdb({
        name:req.body.name,
        contact:req.body.contact,
        imageURL:imagePath[0]?imagePath[0]:null
    })
    // const {name, contact, email, address,booked} = res.data
    newuser.generateAuthToken().then(token=>{
        console.log(token)
        res.cookie("jwt",token,{expires: new Date(Date.now() + 86400000),
            httpOnly: true,
            sameSite: "None",
        })
    }).catch(err=>{
        res.status(400).json(err)
    })
    newuser.save().then(data=>{   
        res.json("scucessful").status(200)
    }).catch(err=>{
            console.log(err);
            res.status(500).json({message:err || "error occured while creating the data"})
    })
}

exports.Update=async(req,res)=>{
    try {
        if(!req.body){
            res.send("Pleease provide some information").status(400)
            return ;
        }
        
        
        const id = req.user._id
        const user = await userdb.findById(id);
        const name = req.body.name
        const email = req.body.email
        const address = req.body.address
        const UserType = req.body.UserType
        tokens = user.tokens
        bookmark = user.bookmarks
        console.log(req.files)
        console.log(req.files.image)
        if(req.files.image !==undefined){
            if (user.imageURL && user.imageURL !== null) {
                const path = "public/" + user.imageURL.slice(process.env.BASE_URL.length, user.imageURL.length)
                
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
            imgUrl = user.imageURL
        }
        userdb.findByIdAndUpdate(id,{
            name:req.body.name?req.body.name:name,
                contact:user.contact,
                email:req.body.email ? req.body.email : email,
                tokens:tokens,
                address:req.body.address ? req.body.address : address,
                UserType:req.body.UserType ? req.body.UserType : UserType,
                imageURL:imgUrl,
        }).then(data=>{
            res.json("done").status(200)
        }).catch(err=>{
            res.status(500).json(err)
        })
        

    } catch (err) {
        res.status(400).json("not updates")
        
    }
}


exports.Login =  (req, res)=>{
    const contact = req.body.contact
    var verify_code = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    console.log("login wala code"+verify_code)
    const newtempo = new tempodb({
        name:req.body.name,
        contact:req.body.contact,
        otp:verify_code,
        createdAt:Date.now()
    }) 
    newtempo.save().then(data=>{
        res.status(200).send(`verificattion code sent to ${contact}`)
        var options = { method: 'POST',
        url: 'https://sms.aakashsms.com/sms/v3/send',
        
        formData: 
         { auth_token: '6fd89af9530f4dfdb923490643da3d04f8adabf1e5fe66044f2bfb91821ab53b',
           text: `Your verification code for Lalpurja Nepal is: ${verify_code}`,
           to: `${contact}` } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });  
    
    }).catch(err=>{
        res.status(400).json(err)
        return;
    })
   
}



exports.Verify = async (req,res)=>{
    try {        
        var contact = parseInt(req.body.contact);
        var user_code = parseInt(req.body.user_code);
        var tempouser = await tempodb.findOne({contact:contact})
        var name = tempouser.name
        if(tempouser.otp!== user_code){            
            return ;
        }
        else{
            const user = await userdb.findOne({contact})
            if(!user){                    
                const newuser = new userdb({
                    name:name,
                    contact:contact
                })
                const token = await newuser.generateAuthToken()
                res.cookie("jwt",token,{expires: new Date(Date.now() + 86400000),
                        httpOnly: true,
                        sameSite: "None",
                })
                newuser.save().then(data=>{   
                }).catch(err=>{
                    res.status(400).send(err)
                })
                tempodb.findOneAndDelete({contact}).then(data=>{
                })
                return res.status(200).json({message:token})
                }
                else{
                    const token = await user.generateAuthToken()
                    res.cookie("jwt",token,{expires: new Date(Date.now() + 86400000),
                            httpOnly: true,
                            sameSite: "None",
                    })
                    user.save()
                tempodb.findOneAndDelete({contact}).then(data=>{
                })
                    return res.status(200).json({message:token})
                    
                }
                
        }
    } catch (error) {
        res.status(401).json(error)
        
    }

    
}


exports.Logout = async(req,res)=>{
     try {
        req.user.tokens = req.user.tokens.filter((currentElement)=>{
            return currentElement.token !== req.token;

        })
        await req.user.save();
        res.status(200).json("cookie cleared scucessfully.");
        
     } catch (err) {
        res.status(400).json(err)
                
     }

}


exports.Find = (req, res)=>{
    if(req.query.id){
        userdb.findOne({_id:req.query.id}).then(function(data){
            res.status(200).send(data)
        }).catch(err=>{
            res.status(400).json(err)
        })
    }
    else{
        userdb.find().then(function(data){
            res.status(200).json(data)
        }).catch(err=>{
            res.status(400).json(err)
        })

    }
}

exports.Delete = (req,res)=>{
    const id = req.query.id;
 userdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).json({message:"invalid user id"})
            return;
        }
        else{
            res.status(200).send({message:"id deleted sucessfuly"})

        }
    }).catch(err=>{
        res.status(500).json({message:"user data cannot be deleted"})

    })
}
exports.FindIndividual = async (req, res)=>{
    try {
        if(req.token === null){
          return  res.status(401).send("You are not authorized!")
        }
        
    } catch (err) {
        res.status(400).json(err)
        
    }
}


exports.FindByContact = (req, res)=>{
    if(req.query.contact){
        userdb.findOne({contact:req.query.contact}).then(function(data){
            res.status(200).send(data)
        }).catch(err=>{
            res.status(400).json(err)
        })
    }
    else{
        return res.status(400).json("contact is needed!")

    }
}