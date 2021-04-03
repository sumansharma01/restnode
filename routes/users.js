const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

const User=require('../models/UsersModel');


const bcrypt=require('bcrypt');

router.post('/signup',(req,res,next)=>{

    User.find({email:req.body.email}).exec()
    .then((user)=>{
        if(user && user.length>=1){
            res.status(500).json({
                message:"User already exists"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        message:"error in hashing",
                        error:err
                    })
                }else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    });
        
                    user.save()
                    .then((data)=>{
                        res.status(200).json({
                            message:"user saved",
                            user:data
                        })
                    })
                    .catch((err)=>{
                        res.status(500).json({
                            message:"error in user saving"
                        })
                    })
        
        
                }
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            message:"user already exists!"
        })
    })




})


//deleting particular user
router.delete('/:id',(req,res,next)=>{
    const id=req.params.id;
    User.findById(id).then((data)=>{
        if(data){
        User.deleteOne({_id:id})
        .then((data)=>{
            res.status(200).json({
                message:"user deleted"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message:"error in deletion of user"
            });
        }
        )}
        else{
            res.status(500).json({
                message:"no user found"
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            message:"no user found"
        })
    })
    
    
    
})






router.post('/login',(req, res,next)=>{
    User.find({email:req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(result){
                const token=jwt.sign({
                        id:user[0]._id,
                        email:user[0].email
                    }
                    ,process.env.JWT_PRIVATE_KEY,
                    {
                        expiresIn:"1h"
                    })
                return res.status(200).json({
                    message:"Auth successful",
                    token:token
                })
            }
        })
    })
    .catch((err)=>{
        res.status(402).json({
            message:"Auth failed"
        })
    })
})

module.exports=router;