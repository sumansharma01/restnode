const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

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

module.exports=router;