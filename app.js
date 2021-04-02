const express=require('express');
const app=express();


app.use((req,res,next)=>{
    res.status(200).json({
        title:"hello",
        age:23
    });
})

module.exports=app;