const express=require('express');
const router=express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:"hello from GET products"
        }
    );
})

router.post('/',(req,res,next)=>{
    const product={
        name:req.body.name,
        price:req.body.price
    }
    res.status(200).json(
        {
            message:"hello from POST products",
            product
        }
    );
})

router.get('/:id',(req,res,next)=>{
    id=req.params.id;
    if(id==="yeah"){
        res.status(200).json(
            {
                message:"hello from yeah product"
            }
        );
    }
    else{
        res.status(200).json(
            {
                message:"hello from other id product"
            }
        );
    }
})

router.patch('/:id',(req,res,next)=>{
    id=req.params.id;
    res.status(200).json(
        {
            message:"hello from PATCH products"
        }
    );
})

router.delete('/:id',(req,res,next)=>{
    id=req.params.id;
    res.status(200).json(
        {
            message:"hello from Delete products"
        }
    );
})

module.exports=router;