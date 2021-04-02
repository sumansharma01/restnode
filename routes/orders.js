const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:"hello from GET orders"
        }
    );
})

router.post('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:"hello from POST orders"
        }
    );
})

router.get('/:id',(req,res,next)=>{
    id=req.params.id;
    if(id==="yeah"){
        res.status(200).json(
            {
                message:"hello from yeah order"
            }
        );
    }
    else{
        res.status(200).json(
            {
                message:"hello from other id order"
            }
        );
    }
})

router.patch('/:id',(req,res,next)=>{
    id=req.params.id;
    res.status(200).json(
        {
            message:"hello from PATCH orders"
        }
    );
})

router.delete('/:id',(req,res,next)=>{
    id=req.params.id;
    res.status(200).json(
        {
            message:"hello from Delete orders"
        }
    );
})


module.exports=router;