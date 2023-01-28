const model= require("../model/AdminModel");
var admindb = model.admindb;
const bcrypt = require("bcryptjs");
exports.CreateAdmin = (req,res)=>{
    console.log(req.body)
    if(!req.body){
        res.status(400).json({message:"content cannot be empty"})
        return;
    }    
    const newuser = new admindb({
        email:req.body.email,
        password:req.body.password
    })
    // const {email, password} = res.data
    newuser.generateAuthToken().then(token=>{
        res.cookie("jwt",token,{expires: new Date(Date.now() + 86400000),
            httpOnly: true,
            sameSite: "None",
        })
        res.status(200).send("admin added scucessfully")
    }).catch(err=>{
        res.json(err)
    })
    newuser.save().then(data=>{   
        res.status(200).json({message:token})
        }).catch(err=>{
            console.log(err);
            res.status(500)
    })
}
exports.FindAdmin = (req, res)=>{
    if(req.query.id){
        admindb.findOne({_id:req.query.id}).then(function(data){
            res.json(data).status(200)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
    else{
        admindb.find().then(function(data){
            res.json(data).status(200)
        }).catch(err=>{
            res.status(500).json(err)
        })

    }
}
exports.DeleteAdmin = (req,res)=>{
    const id = req.query.id;
 admindb.findByIdAndDelete(id).then(data=>{
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
exports.UpdateAdmin = (req,res)=>{
    if(!req.body){
        res.status(500).json({message:"data to be updated cannot be empty."})
        return;
    }
    const id = req.query.id;
    console.log(id)
 admindb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).json({message:`failed to update user of id ${id} maybe user not found `})
        }
        else{
            res.json(data).status(200)
        }
    }).catch(err=>{
        res.status(400).json({message:"no data"|| "error while updating the data"})
    })
}

exports.AdminLogin = async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const admin = await admindb.findOne({email})
        if(!admin){
            res.status(500).json("invalid credentials")
        }
        const ismatching = await bcrypt.compare(password, admin.password);
        if (!ismatching){
            res.status(400).json("Invalid Input")
        }
        else{
            admin.generateAuthToken().then(token=>{
                console.log(token)
                res.cookie("jwt",token,{expires: new Date(Date.now() + 864000000000),
                    httpOnly: true,
                    sameSite: "None",
                })
                admin.save()
                res.status(200).json({message:token})
            }).catch(err=>{
                res.status(500).json(err)
            })
        }        
    } catch (err) {
        res.status(400).json("Invalid credentials")
        
    }
     
    
}

exports.Logout = async(req,res)=>{
    try {
       req.user.tokens = req.user.tokens.filter((currentElement)=>{
           return currentElement.token !== req.token;

       })
       res.clearCookie("jwt");
       await req.user.save();
       res.json("cookie cleared scucessfully.").status(200)
       
    } catch (err) {
       res.status(400).json("err")
               
    }

}